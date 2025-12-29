import { test, expect } from "@playwright/test";

test.describe("Materials Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/materials");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Materials.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("quality");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display sustainability stats", async ({ page }) => {
    await expect(page.getByText("100%").first()).toBeVisible();
    await expect(page.getByText("FSC Certified Wood").first()).toBeVisible();
  });

  test("should display material cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "American Black Walnut" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "White Oak" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Japanese Hinoki" })).toBeVisible();
  });

  test("should display material categories", async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState("networkidle");
    // Categories are shown as badges on material cards
    const hardwoodBadge = page.locator("text=Hardwood").first();
    await expect(hardwoodBadge).toBeVisible();
    await expect(page.getByText("Leather").first()).toBeVisible();
    await expect(page.getByText("Natural Fiber")).toBeVisible();
  });

  test("should display sourcing philosophy section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our sourcing philosophy" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Traceability" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Longevity" })).toBeVisible();
  });

  test("should have CTA link to furniture", async ({ page }) => {
    // Scroll to bottom to ensure CTA is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const cta = page.getByRole("link", { name: /Explore the Collection/i });
    await expect(cta).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    // Scroll to bottom to ensure footer is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
  });
});
