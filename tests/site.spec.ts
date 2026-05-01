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
  "/v2",
  "/v2/gaming-vip-player-gifting",
  "/he/v2",
  "/he/v2/gaming-vip-player-gifting",
  "/v3",
  "/v3/gaming-vip-player-gifting",
  "/he/v3",
  "/he/v3/gaming-vip-player-gifting",
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

test("version 2 keeps internal navigation in version 2", async ({ page }) => {
  await page.goto("/v2/gaming-vip-player-gifting");
  await expect(page.locator(".theme-v2")).toBeVisible();
  const desktopServices = page.locator("header nav[aria-label='Main navigation']").getByRole("link", { name: "Services" });
  if (await desktopServices.isVisible()) {
    await desktopServices.click();
  } else {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.locator("nav[aria-label='Mobile navigation']").getByRole("link", { name: "Services" }).click();
  }
  await expect(page).toHaveURL(/\/v2\/services$/);
});

test("version 2 language switcher preserves preview path", async ({ page }) => {
  await page.goto("/v2/gaming-vip-player-gifting");
  if (!(await page.getByRole("link", { name: "HE" }).isVisible())) {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page.getByRole("link", { name: "HE" }).click();
  await expect(page).toHaveURL(/\/he\/v2\/gaming-vip-player-gifting$/);
  await expect(page.locator(".theme-v2[dir='rtl']")).toBeVisible();
});

test("version 3 keeps internal navigation in version 3", async ({ page }) => {
  await page.goto("/v3/gaming-vip-player-gifting");
  await expect(page.locator(".theme-v3")).toBeVisible();
  const desktopServices = page.locator("header nav[aria-label='Main navigation']").getByRole("link", { name: "Services" });
  if (await desktopServices.isVisible()) {
    await desktopServices.click();
  } else {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.locator("nav[aria-label='Mobile navigation']").getByRole("link", { name: "Services" }).click();
  }
  await expect(page).toHaveURL(/\/v3\/services$/);
});

test("version 3 language switcher preserves preview path", async ({ page }) => {
  await page.goto("/v3/gaming-vip-player-gifting");
  if (!(await page.getByRole("link", { name: "HE" }).isVisible())) {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page.getByRole("link", { name: "HE" }).click();
  await expect(page).toHaveURL(/\/he\/v3\/gaming-vip-player-gifting$/);
  await expect(page.locator(".theme-v3[dir='rtl']")).toBeVisible();
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
