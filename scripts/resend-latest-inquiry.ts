import { createClient } from "@sanity/client";
import { Resend } from "resend";
import { loadLocalEnv } from "./cms-utils";

type InquirySubmission = {
  _id: string;
  submittedAt?: string;
  name?: string;
  company?: string;
  email?: string;
  projectType?: string;
  industry?: string;
  occasion?: string;
  scale?: string;
  timeline?: string;
  customization?: string;
  destinations?: string;
  message?: string;
};

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function main() {
  loadLocalEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const sanityToken = process.env.SANITY_API_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  const bcc = process.env.CONTACT_FORM_BCC_EMAIL;
  const from = process.env.CONTACT_FORM_FROM_EMAIL || "MorePower2You <contact@morepower2you.com>";

  if (!projectId || !sanityToken) throw new Error("Missing Sanity project ID or token.");
  if (!resendKey) throw new Error("Missing RESEND_API_KEY.");
  if (!to) throw new Error("Missing CONTACT_FORM_TO_EMAIL.");

  const client = createClient({
    projectId,
    dataset,
    token: sanityToken,
    apiVersion: "2025-01-01",
    useCdn: false,
  });

  const [data] = await client.fetch<InquirySubmission[]>(
    `*[_type == "inquirySubmission"] | order(submittedAt desc)[0...1]{
      _id,
      submittedAt,
      name,
      company,
      email,
      projectType,
      industry,
      occasion,
      scale,
      timeline,
      customization,
      destinations,
      message
    }`,
  );

  if (!data) {
    throw new Error("No contact inquiry submissions were found in Sanity.");
  }

  if (!data.email) {
    throw new Error(`Latest submission ${data._id} does not have a visitor email.`);
  }

  const resend = new Resend(resendKey);
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
    <hr />
    <p><em>Resent from stored Sanity submission ${escapeHtml(data._id)} submitted at ${escapeHtml(data.submittedAt)}.</em></p>
  `;

  const internalEmail = await resend.emails.send({
    from,
    to,
    ...(bcc ? { bcc } : {}),
    replyTo: data.email,
    subject: `New gifting project inquiry from ${data.company || data.name || "website visitor"} (resent)`,
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
      <p>Your gifting project request has been received. We'll review the details and follow up with next steps.</p>
      <p>Thank you,<br />MorePower2You</p>
    `,
  });

  if (autoresponder.error) {
    throw new Error(`Autoresponder failed: ${autoresponder.error.message}`);
  }

  console.log(`Resent latest inquiry successfully.`);
  console.log(`Internal email ID: ${internalEmail.data?.id}`);
  console.log(`Autoresponder ID: ${autoresponder.data?.id}`);
  console.log(`Submission ID: ${data._id}`);
  console.log(`To: ${to}`);
  console.log(`BCC: ${bcc || "none"}`);
  console.log(`Visitor: ${data.email}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
