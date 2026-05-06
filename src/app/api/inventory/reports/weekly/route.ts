import { NextRequest } from "next/server";
import { sendWeeklyReport } from "@/lib/inventory/reports";

export const dynamic = "force-dynamic";

function isFridayFiveEastern(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = parts.find((part) => part.type === "hour")?.value;
  return weekday === "Fri" && hour === "17";
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || request.nextUrl.searchParams.get("secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFridayFiveEastern() && request.nextUrl.searchParams.get("force") !== "true") {
    return Response.json({ skipped: true, reason: "Not Friday 5 PM Eastern." });
  }

  const run = await sendWeeklyReport("SCHEDULED");
  return Response.json({ ok: true, runId: run.id });
}
