import { test, expect } from "@playwright/test";

test.describe("Terms of Service Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/terms");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Terms.*Service.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("Terms of Service");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display last updated date", async ({ page }) => {
    await expect(page.getByText("Last updated:")).toBeVisible();
  });

  test("should display terms sections", async ({ page }) => {
    await expect(page.getByText("1. Acceptance of Terms")).toBeVisible();
    await expect(page.getByText("2. Products and Services")).toBeVisible();
    await expect(page.getByText("3. Ordering and Payment")).toBeVisible();
    await expect(page.getByText("4. Shipping and Delivery")).toBeVisible();
    await expect(page.getByText("5. Returns and Refunds")).toBeVisible();
    await expect(page.getByText("6. Warranty")).toBeVisible();
  });

  test("should display warranty information", async ({ page }) => {
    await expect(page.getByText("10 years")).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await expect(page.getByText("legal@patina.com")).toBeVisible();
    await expect(page.getByText("123 Craft District")).toBeVisible();
  });

  test("should have link to Privacy Policy", async ({ page }) => {
    const privacyLink = page.getByRole("link", { name: "Privacy Policy" });
    await expect(privacyLink).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
