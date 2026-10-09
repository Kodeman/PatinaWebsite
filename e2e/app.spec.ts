import { test, expect } from "@playwright/test";

test.describe("Pre-launch App Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/app");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("explains the app’s pre-launch state", async ({ page }) => {
    await expect(page).toHaveTitle(/The App We’re Building.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your room.");
    await expect(page.getByText(/The app and marketplace are pre-launch/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Download|App Store|Google Play/i })).toHaveCount(0);
  });

  test("sets out the planned discovery and handoff journey", async ({ page }) => {
    for (const name of ["Begin with your space.", "Find what belongs.", "Continue with a person."]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
    await expect(page.getByText(/we’re building a handoff that carries your discoveries/)).toBeVisible();
  });

  test("shows a material study without pretending it is a live product", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Illustrative isolated timber and leather lounge chair" })).toBeVisible();
    await expect(page.locator("main figcaption").filter({ hasText: "Illustrative imagery — awaiting partner photography." })).toHaveCount(2);
    await expect(page.getByText(/Not a product for sale/)).toBeVisible();
    await expect(page.getByText(/Not an app screen or available product listing/)).toBeVisible();
  });

  test("offers membership instead of a download", async ({ page }) => {
    await page.locator("main").getByRole("button", { name: "Join the Founding Circle", exact: true }).first().click();
    await expect(page.getByRole("dialog", { name: /Founding Circle/ })).toBeVisible();
  });

  test("connects the product direction to the founder story", async ({ page }) => {
    await page.locator("main").getByRole("link", { name: "Read our story", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("links to membership details and the designer invitation", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Explore membership", exact: true })).toHaveAttribute("href", "/founding");
    await expect(page.getByRole("link", { name: "Building with designers", exact: true })).toHaveAttribute("href", "/designers");
  });

  test("retains shared navigation and footer", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
