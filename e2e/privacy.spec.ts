import { test, expect } from "@playwright/test";

test.describe("Privacy Policy Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/privacy");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Privacy.*Policy.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("Privacy Policy");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display last updated date", async ({ page }) => {
    await expect(page.getByText("Last updated:")).toBeVisible();
  });

  test("should display privacy sections", async ({ page }) => {
    await expect(page.getByText("1. Information We Collect")).toBeVisible();
    await expect(page.getByText("2. How We Use Your Information")).toBeVisible();
    await expect(page.getByText("3. Information Sharing")).toBeVisible();
    await expect(page.getByText("4. Cookies and Tracking")).toBeVisible();
    await expect(page.getByText("5. Data Security")).toBeVisible();
    await expect(page.getByText("6. Your Rights")).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await expect(page.getByText("privacy@patina.com").first()).toBeVisible();
    await expect(page.getByText("123 Craft District").first()).toBeVisible();
  });

  test("should have link to Terms of Service", async ({ page }) => {
    const termsLink = page.getByRole("link", { name: "Terms of Service" });
    await expect(termsLink).toBeVisible();
  });

  test("should have link to Contact page", async ({ page }) => {
    const contactLink = page.getByRole("link", { name: "Contact Us" });
    await expect(contactLink).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
