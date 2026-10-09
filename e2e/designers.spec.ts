import { test, expect } from "@playwright/test";

test.describe("Founding Designers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/designers");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("introduces the Founding 50 invitation", async ({ page }) => {
    await expect(page).toHaveTitle(/Founding 50.*For Designers.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your eye belongs");
    await expect(page.getByText(/The app and marketplace are pre-launch/).first()).toBeVisible();
  });

  test("explains the five founding benefits", async ({ page }) => {
    const benefits = ["Your vocabulary, in the tools", "A voice in what gets built", "A community of peers", "A running start with clients", "Your contribution, recognized"];
    for (const benefit of benefits) await expect(page.locator("dt").filter({ hasText: benefit })).toBeVisible();
    await expect(page.locator("dd").filter({ hasText: /no fee to join/ })).toBeVisible();
  });

  test("provides a direct application anchor", async ({ page }) => {
    const apply = page.getByRole("link", { name: "Apply to the Founding 50", exact: true });
    await expect(apply).toHaveAttribute("href", "#apply");
    await apply.click();
    await expect(page.locator("#apply")).toBeInViewport();
    await expect(page.locator("#apply form")).toBeVisible();
  });

  test("includes practice and contact fields", async ({ page }) => {
    const form = page.locator("#apply form");
    for (const label of ["First Name", "Last Name", "Email", "Company / Studio Name", "Location", "Portfolio or Website"]) {
      await expect(form.getByLabel(label, { exact: true })).toBeVisible();
    }
    await expect(form.getByRole("button", { name: "Apply to the Founding 50", exact: true })).toBeVisible();
  });

  test("allows applicants to enter their practice details", async ({ page }) => {
    const form = page.locator("#apply form");
    await form.getByLabel("First Name", { exact: true }).fill("Jane");
    await form.getByLabel("Last Name", { exact: true }).fill("Smith");
    await form.getByLabel("Email", { exact: true }).fill("jane@example.com");
    await form.getByLabel("Company / Studio Name", { exact: true }).fill("Example Studio");
    await expect(form.getByLabel("First Name", { exact: true })).toHaveValue("Jane");
    await expect(form.getByLabel("Company / Studio Name", { exact: true })).toHaveValue("Example Studio");
  });

  test("sets personal review expectations and offers contact", async ({ page }) => {
    await expect(page.getByText(/personally review every application/)).toContainText("within 7 days");
    await expect(page.getByRole("link", { name: "Talk to us first", exact: true })).toHaveAttribute("href", "/contact");
    await expect(page.getByRole("link", { name: "The story behind Patina", exact: true })).toHaveAttribute("href", "/about");
  });

  test("retains navigation and footer without catalog calls to action", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse Collection|Apply for Trade Access/ })).toHaveCount(0);
    await expect(page.locator("footer")).toBeVisible();
  });
});
