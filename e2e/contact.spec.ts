import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/contact");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("welcomes a note to the studio", async ({ page }) => {
    await expect(page).toHaveTitle(/Contact.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Good things start");
  });

  test("provides the required contact fields", async ({ page }) => {
    for (const label of ["Your Name", "Email Address", "Your Message"]) {
      await expect(page.getByLabel(label, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Send Message", exact: true })).toBeVisible();
  });

  test("routes questions, partnerships and press", async ({ page }) => {
    const reasons = page.getByLabel(/What's this about/);
    await expect(reasons).toBeVisible();
    expect(await reasons.locator("option").allTextContents()).toEqual(["A question or idea", "Designer partnership", "Maker partnership", "Press & media"]);
    await reasons.selectOption("press");
    await expect(reasons).toHaveValue("press");
  });

  test("uses the real Patina contact details", async ({ page }) => {
    await expect(page.locator("main").getByRole("link", { name: "hello@patina.cloud", exact: true })).toHaveAttribute("href", "mailto:hello@patina.cloud");
    await expect(page.locator("main").getByText("Kody & Leah / Madison, Wisconsin", { exact: true })).toBeVisible();
    await expect(page.getByText(/123 Craft District|1-800-555-1234|hello@patina.com/)).toHaveCount(0);
  });

  test("retains entered details before submission", async ({ page }) => {
    await page.getByLabel("Your Name", { exact: true }).fill("Test User");
    await page.getByLabel("Email Address", { exact: true }).fill("test@example.com");
    await page.getByLabel("Your Message", { exact: true }).fill("A question about the Founding Circle.");
    await expect(page.getByLabel("Your Name", { exact: true })).toHaveValue("Test User");
    await expect(page.getByLabel("Your Message", { exact: true })).toHaveValue("A question about the Founding Circle.");
  });

  test("provides founding and partnership paths", async ({ page }) => {
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "Join the Founding Circle", exact: true })).toHaveAttribute("href", "/founding");
    await expect(main.getByRole("link", { name: "For designers", exact: true })).toHaveAttribute("href", "/designers");
    await expect(main.getByRole("link", { name: "For makers", exact: true })).toHaveAttribute("href", "/makers");
  });

  test("retains shared navigation and footer", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
