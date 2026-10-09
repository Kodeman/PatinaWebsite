import { test, expect } from "@playwright/test";

test.describe("Careers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/careers");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("introduces the work without invented employment benefits", async ({ page }) => {
    await expect(page).toHaveTitle(/Careers.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Make something");
    await expect(page.getByText("Unlimited PTO", { exact: true })).toHaveCount(0);
  });

  test("explains the principles behind the work", async ({ page }) => {
    for (const name of ["Respect the judgment.", "Make room for the process.", "Tell the truth."]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
  });

  test("provides an honest openings state and a route to contact", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Open roles.", exact: true })).toBeVisible();
    const emptyState = page.getByRole("heading", { name: /No open roles/ });
    if (await emptyState.count()) {
      await expect(emptyState).toBeVisible();
      await page.getByRole("link", { name: "Introduce yourself", exact: true }).click();
      await expect(page).toHaveURL(/\/contact$/);
    } else {
      const role = page.getByRole("link", { name: "Ask about this role", exact: true }).first();
      await expect(role).toBeVisible();
      await expect(role).toHaveAttribute("href", /^\/contact\?subject=/);
    }
  });

  test("keeps partnership paths distinct from employment", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Partner as a designer", exact: true })).toHaveAttribute("href", "/designers");
    await expect(page.getByRole("link", { name: "Partner as a maker", exact: true })).toHaveAttribute("href", "/makers");
    await expect(page.getByRole("link", { name: "Meet the founders", exact: true })).toHaveAttribute("href", "/about");
  });

  test("retains shared navigation and footer", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
