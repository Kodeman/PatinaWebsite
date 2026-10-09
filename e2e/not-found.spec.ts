import { test, expect } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/this-page-does-not-exist-12345");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("explains that the page was not found", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
    await expect(page.getByText(/This piece seems to have moved/)).toBeVisible();
  });

  test("provides a home route", async ({ page }) => {
    const home = page.getByRole("link", { name: "Go Home", exact: true });
    await expect(home).toHaveAttribute("href", "/");
    await home.click();
    await expect(page).toHaveURL("/");
  });

  test("provides a useful maker route instead of a retired catalog", async ({ page }) => {
    const makers = page.getByRole("link", { name: "Meet Our Makers", exact: true });
    await expect(makers).toHaveAttribute("href", "/makers");
    await makers.click();
    await expect(page).toHaveURL(/\/makers$/);
  });

  test("retains navigation, the Strata and footer", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.locator("main").getByRole("img", { name: "Patina strata mark" }).first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("returns a real 404 for unknown routes", async ({ page }) => {
    for (const route of ["/random-page", "/foo/bar/baz", "/products/invalid-product"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
    }
  });
});
