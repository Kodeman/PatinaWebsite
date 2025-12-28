import { test, expect } from "@playwright/test";

test.describe("App Download Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/app");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Get the App.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    await expect(page.getByText("Patina App")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Furniture shopping");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("reimagined");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should have Download for iOS button", async ({ page }) => {
    const downloadButton = page.getByRole("link", { name: /Download for iOS/i });
    await expect(downloadButton).toBeVisible();
  });

  test("should display Android coming soon message", async ({ page }) => {
    await expect(page.getByText(/Android coming soon/i)).toBeVisible();
  });

  test("should display app mockup placeholder", async ({ page }) => {
    await expect(page.getByText("App Screenshot")).toBeVisible();
  });

  test("should display Features section", async ({ page }) => {
    await expect(page.getByText("Features")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Everything you need to/i })).toBeVisible();
  });

  test("should display all 4 app features", async ({ page }) => {
    const features = [
      "AR Visualization",
      "Maker Stories",
      "Save Favorites",
      "Designer Connect",
    ];

    for (const feature of features) {
      await expect(page.getByRole("heading", { name: feature })).toBeVisible();
    }
  });

  test("should display feature descriptions", async ({ page }) => {
    await expect(page.getByText(/See how furniture looks in your actual space/)).toBeVisible();
    await expect(page.getByText(/Explore the craftspeople behind each piece/)).toBeVisible();
    await expect(page.getByText(/Create collections of pieces you love/)).toBeVisible();
    await expect(page.getByText(/Work with expert designers directly/)).toBeVisible();
  });

  test("should display final CTA section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Ready to discover furniture with/i })).toBeVisible();
  });

  test("should have App Store download button in CTA", async ({ page }) => {
    const downloadButtons = page.getByRole("link", { name: /Download on the App Store/i });
    await expect(downloadButtons.first()).toBeVisible();
  });

  test("should have browse collection link in CTA", async ({ page }) => {
    await expect(page.getByRole("link", { name: /browse our collection/i })).toBeVisible();
  });

  test("should navigate to furniture when clicking browse collection", async ({ page }) => {
    const browseLink = page.getByRole("link", { name: /browse our collection/i });
    await browseLink.click();
    await expect(page).toHaveURL(/\/furniture/);
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
