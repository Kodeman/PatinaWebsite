import { test, expect } from "@playwright/test";

test.describe("Founding Designers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/designers");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("introduces the studio door from verified claims", async ({ page }) => {
    await expect(page).toHaveTitle(/Founding 50.*For Designers.*Patina/);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText("Built for your");
    await expect(h1).toContainText("first hire.");
    await expect(h1).not.toContainText(/Where Time Adds Value/i);
    await expect(page.getByText(/its first designer and the workload doubles/)).toBeVisible();
    await expect(page.getByText("Patina is pre-launch.").first()).toBeVisible();
  });

  test("explains what the studio gets", async ({ page }) => {
    const benefits = ["One living document per client", "One agreed direction", "A quiet desk", "Read by Kody and Leah"];
    for (const benefit of benefits) await expect(page.locator("dt").filter({ hasText: benefit })).toBeVisible();
    await expect(page.locator("dd").filter({ hasText: "No dashboards, no task manager, no tab bars." })).toBeVisible();
    await expect(page.getByText("Your client sees the same page you do: one agreed direction.")).toBeVisible();
  });

  test("keeps held and retired language off the page", async ({ page }) => {
    const main = page.locator("main");
    await expect(main).not.toContainText(/\bfees?\b|Co-Founder|Middlewest|consumer app|\bAI\b|algorithm|curated|platform/i);
    await expect(page.getByText(/Where Time Adds Value/i)).toHaveCount(1);
    await expect(main.getByText("Middle West Studio / Madison, Wisconsin")).toBeVisible();
    await expect(main.getByText("Kody and Leah", { exact: true })).toBeVisible();
  });

  test("provides a direct application anchor", async ({ page }) => {
    const apply = page.getByRole("link", { name: "Bring one live project.", exact: true });
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
    await expect(page.locator("#apply").getByText(/Kody and Leah read every application/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Talk to us first", exact: true })).toHaveAttribute("href", "/contact");
    await expect(page.getByRole("link", { name: "The story behind Patina", exact: true })).toHaveAttribute("href", "/about");
  });

  test("offers homeowners a quiet letter signup below the application", async ({ page }) => {
    const homeowners = page.getByRole("region", { name: "For homeowners" });
    await expect(homeowners).toContainText("Not a studio? Homeowners can get The Designer’s Eye, our letter on rooms that last.");
    await expect(homeowners.getByRole("textbox", { name: "Email for The Designer’s Eye" })).toBeVisible();
    const below = await page.evaluate(() => {
      const apply = document.querySelector("#apply");
      const quiet = document.querySelector('section[aria-label="For homeowners"]');
      return !!apply && !!quiet && !!(apply.compareDocumentPosition(quiet) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(below).toBe(true);

    let body: Record<string, unknown> | null = null;
    await page.route("**/api/newsletter", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await homeowners.getByRole("textbox").fill("home@example.com");
    await homeowners.getByRole("button", { name: "Subscribe" }).click();
    await expect(homeowners).toContainText("check your inbox");
    expect(body?.source).toBe("designers_homeowner");
  });

  test("retains navigation and footer without catalog calls to action", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse Collection|Apply for Trade Access/ })).toHaveCount(0);
    await expect(page.locator("footer")).toBeVisible();
  });
});
