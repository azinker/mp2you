import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  email: z.string().email().max(180),
  projectType: z.string().min(2).max(120),
  industry: z.string().min(2).max(120),
  occasion: z.string().min(2).max(120),
  scale: z.string().min(1).max(120),
  timeline: z.string().min(1).max(160),
  customization: z.string().min(1).max(300),
  destinations: z.string().min(1).max(300),
  message: z.string().min(10).max(2500),
  consent: z.literal("accepted"),
  "cf-turnstile-response": z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = inquirySchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Please complete all required fields." }, { status: 400 });
    }

    const data = parsed.data;
    const turnstileResult = await verifyTurnstile(data["cf-turnstile-response"]);
    if (!turnstileResult.ok) {
      return NextResponse.json({ ok: false, message: "Spam protection could not be verified." }, { status: 400 });
    }

    await sendEmails(data);
    await storeSubmission(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "The request could not be processed.",
      },
      { status: 500 },
    );
  }
}

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false };

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return { ok: Boolean(result.success) };
}

async function sendEmails(data: z.infer<typeof inquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FORM_FROM_EMAIL || "MorePower2You <onboarding@resend.dev>";
  const bcc = process.env.CONTACT_FORM_BCC_EMAIL;
  const subject = `New gifting project inquiry from ${data.company}`;
  const summary = `
    <h1>New gifting project inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(data.projectType)}</p>
    <p><strong>Industry:</strong> ${escapeHtml(data.industry)}</p>
    <p><strong>Occasion:</strong> ${escapeHtml(data.occasion)}</p>
    <p><strong>Scale:</strong> ${escapeHtml(data.scale)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
    <p><strong>Customization:</strong> ${escapeHtml(data.customization)}</p>
    <p><strong>Destinations:</strong> ${escapeHtml(data.destinations)}</p>
    <p><strong>Message:</strong><br />${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
  `;

  const internalEmail = await resend.emails.send({
    from,
    to,
    ...(bcc ? { bcc } : {}),
    replyTo: data.email,
    subject,
    html: summary,
  });

  if (internalEmail.error) {
    throw new Error(`Internal email failed: ${internalEmail.error.message}`);
  }

  const autoresponder = await resend.emails.send({
    from,
    to: data.email,
    subject: "Your MorePower2You project inquiry was received",
    html: `
      <p>Your gifting project request has been received. We’ll review the details and follow up with next steps.</p>
      <p>Thank you,<br />MorePower2You</p>
    `,
  });

  if (autoresponder.error) {
    throw new Error(`Autoresponder failed: ${autoresponder.error.message}`);
  }
}

async function storeSubmission(data: z.infer<typeof inquirySchema>) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) return;

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2025-01-01",
    useCdn: false,
  });

  await client.create({
    _type: "inquirySubmission",
    status: "new",
    submittedAt: new Date().toISOString(),
    name: data.name,
    company: data.company,
    email: data.email,
    projectType: data.projectType,
    industry: data.industry,
    occasion: data.occasion,
    scale: data.scale,
    timeline: data.timeline,
    customization: data.customization,
    destinations: data.destinations,
    message: data.message,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
