import "server-only";

import { Resend } from "resend";

function resendClient() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

function fromEmail() {
  return process.env.RESEND_FROM_EMAIL || "inventory@morepower2you.com";
}

function replyToEmail() {
  return process.env.RESEND_REPLY_TO_EMAIL || "eli@morepower2you.com";
}

export async function sendInventoryEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const resend = resendClient();
  if (!resend) {
    console.warn(`[inventory-email-skipped] ${subject}`);
    return { skipped: true };
  }

  return resend.emails.send({
    from: fromEmail(),
    replyTo: replyToEmail(),
    to,
    subject,
    html,
  });
}

export function appUrl(path: string) {
  const base = process.env.APP_URL || "https://www.morepower2you.com";
  return `${base.replace(/\/$/, "")}${path}`;
}

export function brandedEmailShell(title: string, body: string) {
  return `
  <div style="margin:0;background:#f7f4ef;padding:32px;font-family:Arial,sans-serif;color:#1f2933">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5ddd1;border-radius:14px;overflow:hidden">
      <div style="background:#22352f;color:#fff;padding:24px 28px">
        <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#e6c978">MorePower2You Inventory</div>
        <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25">${title}</h1>
      </div>
      <div style="padding:28px">${body}</div>
    </div>
  </div>`;
}
