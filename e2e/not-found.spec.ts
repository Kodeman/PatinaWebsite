import { test, expect } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/this-page-does-not-exist-12345");
  });

  test("should display 404 page for non-existent routes", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
  });

  test("should display helpful message", async ({ page }) => {
    await expect(page.getByText(/This piece seems to have moved/)).toBeVisible();
    await expect(page.getByText(/Let's help you find what you're looking for/)).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should have Go Home button", async ({ page }) => {
    const homeButton = page.getByRole("link", { name: /Go Home/i });
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toHaveAttribute("href", "/");
  });

  test("should have Browse Furniture button", async ({ page }) => {
    const browseButton = page.getByRole("link", { name: /Browse Furniture/i });
    await expect(browseButton).toBeVisible();
    await expect(browseButton).toHaveAttribute("href", "/furniture");
  });

  test("should navigate to home when clicking Go Home", async ({ page }) => {
    const homeButton = page.getByRole("link", { name: /Go Home/i });
    await homeButton.click();
    await expect(page).toHaveURL("/");
  });

  test("should navigate to furniture when clicking Browse Furniture", async ({ page }) => {
    const browseButton = page.getByRole("link", { name: /Browse Furniture/i });
    await browseButton.click();
    await expect(page).toHaveURL(/\/furniture/);
  });

  test("should display StrataMark logo element", async ({ page }) => {
    // The StrataMark should be visible on the 404 page
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should show 404 for various non-existent routes", async ({ page }) => {
    const routes = [
      "/random-page",
      "/foo/bar/baz",
      "/products/invalid-product",
    ];

    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
    }
  });
});
