import { test, expect } from "@playwright/test";

test.describe("Design Services Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Design Services.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    await expect(page.getByText("Design Services").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Let us help you find");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("the perfect pieces");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should display all 3 service packages", async ({ page }) => {
    const packages = ["Consultation", "Room Design", "Full Home"];

    for (const pkg of packages) {
      await expect(page.getByRole("heading", { name: pkg })).toBeVisible();
    }
  });

  test("should display Consultation package as free", async ({ page }) => {
    await expect(page.getByText("Free", { exact: true })).toBeVisible();
    await expect(page.getByText("30-minute video call")).toBeVisible();
  });

  test("should display Room Design package with price", async ({ page }) => {
    await expect(page.getByText("$450")).toBeVisible();
    await expect(page.getByText("2-hour in-depth consultation")).toBeVisible();
  });

  test("should display Full Home package as custom pricing", async ({ page }) => {
    await expect(page.getByText("Custom")).toBeVisible();
    await expect(page.getByText("On-site consultation available")).toBeVisible();
  });

  test("should highlight Room Design as Most Popular", async ({ page }) => {
    await expect(page.getByText("Most Popular")).toBeVisible();
  });

  test("should display CTA buttons for each package", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Book Free Call/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Get Started/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Contact Us/i })).toBeVisible();
  });

  test("should display process steps section", async ({ page }) => {
    await expect(page.getByText("How It Works")).toBeVisible();

    const steps = ["Discovery", "Curation", "Visualization", "Delivery"];
    for (const step of steps) {
      await expect(page.getByRole("heading", { name: step })).toBeVisible();
    }
  });

  test("should display step numbers", async ({ page }) => {
    await expect(page.getByText("01", { exact: true })).toBeVisible();
    await expect(page.getByText("02", { exact: true })).toBeVisible();
    await expect(page.getByText("03", { exact: true })).toBeVisible();
    await expect(page.getByText("04", { exact: true })).toBeVisible();
  });

  test("should display booking CTA section", async ({ page }) => {
    await expect(page.locator("#book").getByText("Get Started")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ready to begin/i })).toBeVisible();
  });

  test("should have Email Us link", async ({ page }) => {
    const emailLink = page.getByRole("link", { name: /Email Us/i });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", "mailto:design@patina.com");
  });

  test("should have Browse Collection link in CTA", async ({ page }) => {
    const browseLinks = page.getByRole("link", { name: /Browse Collection/i });
    await expect(browseLinks.first()).toBeVisible();
  });

  test("should display all package features with checkmarks", async ({ page }) => {
    // Room Design features
    const roomDesignFeatures = [
      "Personalized mood board",
      "5-7 furniture recommendations",
      "AR visualization for each piece",
      "Trade pricing on purchases",
      "3 revision rounds",
    ];

    for (const feature of roomDesignFeatures) {
      await expect(page.getByText(feature)).toBeVisible();
    }
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should navigate to furniture when clicking Browse Collection", async ({ page }) => {
    const browseLink = page.getByRole("link", { name: /Browse Collection/i }).first();
    await browseLink.click();
    await expect(page).toHaveURL(/\/furniture/);
  });
});
