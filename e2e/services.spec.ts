import { test, expect } from "@playwright/test";

test.describe("Design Services Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/services");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("introduces the designer handoff honestly", async ({ page }) => {
    await expect(page).toHaveTitle(/Design Services.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Room for your ideas.");
    await expect(page.getByText(/Patina’s planned handoff/)).toContainText("pre-launch");
  });

  test("offers a real contact path for a project", async ({ page }) => {
    const contact = page.locator("main").getByRole("link", { name: "Talk to Us", exact: true }).first();
    await expect(contact).toHaveAttribute("href", "/contact");
    await contact.click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("describes the context a future brief would carry", async ({ page }) => {
    for (const name of ["Your point of view", "The room as it is", "What matters most"]) {
      await expect(page.locator("dt").filter({ hasText: name })).toBeVisible();
    }
    await expect(page.getByText("An illustration of the handoff we’re developing.", { exact: true })).toBeVisible();
  });

  test("explains scope without invented packages or prices", async ({ page }) => {
    for (const name of ["A single room", "Connected spaces", "A whole home"]) {
      await expect(page.locator("dt").filter({ hasText: name })).toBeVisible();
    }
    await expect(page.getByText(/Scope, timing, and deliverables belong in a proposal/)).toBeVisible();
    await expect(page.locator("main")).not.toContainText(/\bfees?\b/i);
    await expect(page.getByText("$450", { exact: true })).toHaveCount(0);
  });

  test("offers membership without fake matches or downloads", async ({ page }) => {
    await expect(page.locator("main").getByRole("button", { name: "Join the Founding Circle", exact: true })).toBeVisible();
    await expect(page.getByText("94%", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Download the App/i })).toHaveCount(0);
  });

  test("retains shared navigation and footer", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
