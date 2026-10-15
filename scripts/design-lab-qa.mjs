// Dev-only QA harness for the Design Lab concepts.
// Loads each page at several widths, scrolls through to trigger animations,
// captures console errors and screenshots into .qa-design-lab/.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT = ".qa-design-lab";
mkdirSync(OUT, { recursive: true });

const pages = [
  { path: "/design-lab", name: "lab" },
  { path: "/design-lab/concept-1", name: "c1" },
  { path: "/design-lab/concept-2", name: "c2" },
  { path: "/design-lab/concept-3", name: "c3" },
];

const widths = [
  { w: 1600, h: 900, tag: "desktop" },
  { w: 768, h: 1024, tag: "tablet" },
  { w: 390, h: 844, tag: "mobile" },
];

const scrollStops = [0, 0.2, 0.4, 0.6, 0.8, 0.98];

const browser = await chromium.launch();
const issues = [];

for (const pg of pages) {
  for (const vp of widths) {
    const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(String(err)));

    try {
      await page.goto(BASE + pg.path, { waitUntil: "networkidle", timeout: 60000 });
    } catch (e) {
      issues.push(`${pg.name}@${vp.tag}: NAVIGATION FAILED ${e.message}`);
      await context.close();
      continue;
    }
    await page.waitForTimeout(1600);

    const total = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    for (let i = 0; i < scrollStops.length; i++) {
      const y = Math.round(total * scrollStops[i]);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(900);
      // Only screenshot a representative subset to keep output manageable
      const wantShot =
        vp.tag === "desktop" || (vp.tag === "mobile" && (i === 0 || i === 2 || i === 5)) || (vp.tag === "tablet" && i === 0);
      if (wantShot) {
        await page.screenshot({ path: join(OUT, `${pg.name}-${vp.tag}-s${i}.png`) });
      }
    }

    // horizontal overflow check
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 2 ? `${doc.scrollWidth} > ${doc.clientWidth}` : null;
    });
    if (overflow) issues.push(`${pg.name}@${vp.tag}: HORIZONTAL OVERFLOW ${overflow}`);
    if (errors.length) issues.push(`${pg.name}@${vp.tag}: CONSOLE ${[...new Set(errors)].slice(0, 4).join(" | ")}`);

    await context.close();
  }
}

await browser.close();
console.log(issues.length ? "ISSUES:\n" + issues.join("\n") : "NO ISSUES DETECTED");
