import { expect, test } from "@playwright/test";

test.describe("inventory portal access", () => {
  test("redirects logged-out users from /inventory to login", async ({ page }) => {
    await page.goto("/inventory");
    await expect(page).toHaveURL(/\/inventory\/login$/);
    await expect(page.getByRole("heading", { name: "Inventory Portal" })).toBeVisible();
  });

  test("shows private login without public site chrome", async ({ page }) => {
    await page.goto("/inventory/login");
    await expect(page.getByRole("heading", { name: "Inventory Portal" })).toBeVisible();
    await expect(page.locator("header")).toHaveCount(0);
    await expect(page.locator("footer")).toHaveCount(0);
  });
});
