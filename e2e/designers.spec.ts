import { test, expect } from "@playwright/test";

test.describe("Designer Portal Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/designers");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/For Designers.*Patina/);
  });

  test("should display dark-themed hero section", async ({ page }) => {
    // Check hero content
    await expect(page.getByText("For Designers").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Elevate your practice");
  });

  test("should display navigation with dark variant", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should have Apply for Trade Access CTA button", async ({ page }) => {
    const applyButton = page.getByRole("link", { name: /Apply for Trade Access/i });
    await expect(applyButton).toBeVisible();
    await expect(applyButton).toHaveAttribute("href", "#apply");
  });

  test("should have Browse Collection link", async ({ page }) => {
    const browseLink = page.getByRole("link", { name: /Browse Collection/i }).first();
    await expect(browseLink).toBeVisible();
    await expect(browseLink).toHaveAttribute("href", "/furniture");
  });

  test("should display all 6 trade benefits", async ({ page }) => {
    const benefitsSection = page.locator("section").filter({ hasText: "Trade Benefits" });
    await expect(benefitsSection).toBeVisible();

    const benefits = [
      "Trade Pricing",
      "AR Client Presentations",
      "Curated Collections",
      "Dedicated Support",
      "White Glove Delivery",
      "Maker Introductions",
    ];

    for (const benefit of benefits) {
      await expect(page.getByRole("heading", { name: benefit })).toBeVisible();
    }
  });

  test("should display designer testimonials", async ({ page }) => {
    await expect(page.getByText("Designer Stories")).toBeVisible();
    await expect(page.getByText("Sarah Chen")).toBeVisible();
    await expect(page.getByText("Marcus Webb")).toBeVisible();
  });

  test("should have application form with all fields", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Check form fields
    await expect(page.locator("#firstName")).toBeVisible();
    await expect(page.locator("#lastName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#company")).toBeVisible();
    await expect(page.locator("#website")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("should be able to fill out application form", async ({ page }) => {
    await page.locator("#firstName").fill("Jane");
    await page.locator("#lastName").fill("Smith");
    await page.locator("#email").fill("jane@design.com");
    await page.locator("#company").fill("Smith Design");
    await page.locator("#website").fill("https://smithdesign.com");
    await page.locator("#message").fill("I specialize in residential projects.");

    // Verify values
    await expect(page.locator("#firstName")).toHaveValue("Jane");
    await expect(page.locator("#email")).toHaveValue("jane@design.com");
  });

  test("should have submit button in form", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /Submit Application/i });
    await expect(submitButton).toBeVisible();
  });

  test("should navigate to apply section when clicking CTA", async ({ page }) => {
    const applyButton = page.getByRole("link", { name: /Apply for Trade Access/i });
    await applyButton.click();

    // Should scroll to form section
    await expect(page.locator("#apply")).toBeInViewport();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.getByText("© 2025 Patina")).toBeVisible();
  });
});
