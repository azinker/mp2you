import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/services",
  "/corporate-gifting",
  "/custom-gift-boxes",
  "/concierge-services",
  "/fulfillment-warehousing-distribution",
  "/gaming-vip-player-gifting",
  "/who-we-serve",
  "/process",
  "/gallery",
  "/case-studies",
  "/testimonials",
  "/faqs",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/data-cookies-notice",
  "/he",
  "/he/gaming-vip-player-gifting",
  "/he/contact",
];

test.describe("primary pages", () => {
  for (const route of routes) {
    test(`loads ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }
});

test("Hebrew pages render RTL content", async ({ page }) => {
  await page.goto("/he/gaming-vip-player-gifting");
  await expect(page.locator("[dir='rtl']").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /גיימינג/ })).toBeVisible();
});

test("language switcher preserves matching page", async ({ page }) => {
  await page.goto("/gaming-vip-player-gifting");
  if (!(await page.getByRole("link", { name: "HE" }).isVisible())) {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page.getByRole("link", { name: "HE" }).click();
  await expect(page).toHaveURL(/\/he\/gaming-vip-player-gifting$/);
});

test("retired preview routes redirect to V1 equivalents", async ({ page }) => {
  const redirects = [
    { from: "/v2", to: "/" },
    { from: "/v2/gaming-vip-player-gifting", to: "/gaming-vip-player-gifting" },
    { from: "/v3/contact", to: "/contact" },
    { from: "/he/v2", to: "/he" },
    { from: "/he/v3/gaming-vip-player-gifting", to: "/he/gaming-vip-player-gifting" },
  ];

  for (const { from, to } of redirects) {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to === "/" ? "/$" : `${to}$`}`));
    await expect(page.locator(".theme-v1")).toBeVisible();
  }
});

test("contact form validates required fields", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send Project Inquiry/ }).click();
  await expect(page.locator("input:invalid, textarea:invalid, select:invalid").first()).toBeVisible();
});

test("sitemap and robots are available", async ({ page }) => {
  await page.goto("/sitemap.xml");
  await expect(page.locator("body")).toContainText("gaming-vip-player-gifting");
  await page.goto("/robots.txt");
  await expect(page.locator("body")).toContainText("sitemap");
});
