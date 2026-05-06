import "server-only";

import { ReportRunType } from "@prisma/client";
import { db } from "@/lib/inventory/db";
import { brandedEmailShell, sendInventoryEmail } from "@/lib/inventory/email";
import { formatCurrency, formatEastern, formatNumber } from "@/lib/inventory/format";
import { getDashboardData } from "@/lib/inventory/queries";

function reportSubject(date = new Date(), manual = false) {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return `MorePower2You Weekly Inventory Report - ${manual ? "Manual Snapshot - " : ""}${label}`;
}

function weekStart(date = new Date()) {
  const start = new Date(date);
  start.setUTCDate(start.getUTCDate() - 7);
  return start;
}

export async function buildWeeklyReportHtml(manual = false) {
  const data = await getDashboardData();
  const lowStock = data.products.filter((product) => !product.archivedAt && product.computedStatus === "LOW_STOCK");
  const outOfStock = data.products.filter((product) => !product.archivedAt && product.computedStatus === "OUT_OF_STOCK");

  const studioSections = data.studios
    .map((studio) => {
      const products = data.products.filter((product) =>
        studio.id === "unassigned" ? !product.studioId : product.studioId === studio.id,
      );
      const rows = products
        .map(
          (product) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee">${product.name}</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${formatNumber(product.totalPiecesOnHand)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${formatCurrency(product.costValue)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${formatCurrency(product.saleValue)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee">${product.computedStatus.replaceAll("_", " ")}</td>
          </tr>`,
        )
        .join("");
      return `
        <h3 style="margin:28px 0 8px">${studio.name}</h3>
        <p style="margin:0 0 10px;color:#5b6570">${formatNumber(studio.totalPieces)} pieces - ${formatCurrency(studio.costValue)} cost - ${formatCurrency(studio.saleValue)} sale value</p>
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px">${rows || "<tr><td style='padding:8px'>No products yet.</td></tr>"}</table>
      `;
    })
    .join("");

  const changes = data.activity
    .map((item) => `<li>${item.summary} <span style="color:#69737d">(${formatEastern(item.createdAt)})</span></li>`)
    .join("");

  const body = `
    ${manual ? "<p style='font-weight:700;color:#7a4d00'>Manual Snapshot Report</p>" : ""}
    <h2 style="margin:0 0 12px">Executive summary</h2>
    <p>Total pieces: <strong>${formatNumber(data.metrics.totalPieces)}</strong></p>
    <p>Cost value on hand: <strong>${formatCurrency(data.metrics.costValue)}</strong></p>
    <p>Sale value on hand: <strong>${formatCurrency(data.metrics.saleValue)}</strong></p>
    <p>Estimated gross profit: <strong>${formatCurrency(data.metrics.profitValue)}</strong></p>
    <h2>Low stock</h2>
    <ul>${lowStock.map((product) => `<li>${product.name}: ${product.totalPiecesOnHand} pieces</li>`).join("") || "<li>No low-stock products.</li>"}</ul>
    <h2>Out of stock</h2>
    <ul>${outOfStock.map((product) => `<li>${product.name}: flagged Out of Stock</li>`).join("") || "<li>No out-of-stock products.</li>"}</ul>
    <h2>Studio-by-Studio inventory</h2>
    ${studioSections}
    <h2>Detailed weekly change log</h2>
    <ul>${changes || "<li>No activity recorded this week.</li>"}</ul>
  `;

  return brandedEmailShell("Weekly Inventory Report", body);
}

export async function sendWeeklyReport(runType: ReportRunType, triggeredById?: string, onlyEmail?: string) {
  const now = new Date();
  const manual = runType !== "SCHEDULED";
  const subject = reportSubject(now, manual);
  const recipients = onlyEmail
    ? [{ email: onlyEmail }]
    : await db.user.findMany({
        where: { status: "ACTIVE", reportOptIn: true },
        select: { email: true },
      });
  const emails = recipients.map((recipient) => recipient.email);
  const html = await buildWeeklyReportHtml(manual);

  try {
    if (emails.length) {
      await sendInventoryEmail({ to: emails, subject, html });
    }
    const run = await db.weeklyReportRun.create({
      data: {
        runType,
        status: "SUCCESS",
        subject,
        periodStart: weekStart(now),
        periodEnd: now,
        recipientEmails: emails,
        triggeredById,
        snapshot: { generatedAt: now.toISOString(), recipientCount: emails.length },
      },
    });
    await db.activityLog.create({
      data: {
        userId: triggeredById,
        action: "REPORT_SENT",
        entityType: "REPORT",
        entityId: run.id,
        entityName: subject,
        summary: `${manual ? "Manual snapshot" : "Scheduled weekly"} inventory report sent to ${emails.length} recipient(s).`,
      },
    });
    return run;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown report send error";
    const run = await db.weeklyReportRun.create({
      data: {
        runType,
        status: "FAILED",
        subject,
        periodStart: weekStart(now),
        periodEnd: now,
        recipientEmails: emails,
        errorMessage: message,
        triggeredById,
      },
    });
    await db.activityLog.create({
      data: {
        userId: triggeredById,
        action: "REPORT_FAILED",
        entityType: "REPORT",
        entityId: run.id,
        entityName: subject,
        summary: `Inventory report failed: ${message}`,
      },
    });
    throw error;
  }
}
