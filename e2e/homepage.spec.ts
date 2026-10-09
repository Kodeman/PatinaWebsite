import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("opens with the protected tagline and membership invitation", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Where Time");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Adds Value.");
    await expect(page.getByRole("region", { name: "Explore the living study" }).getByRole("button", { name: "Join the Founding Circle", exact: true })).toBeVisible();
  });

  test("lets a visitor inspect the chair and material palette", async ({ page }) => {
    await page.getByRole("button", { name: "Look closer at the chair", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("An eye for");
    const materials = page.getByRole("group", { name: "Explore the study materials", exact: true });
    await materials.getByRole("button", { name: "Linen", exact: true }).click();
    await expect(materials.getByRole("button", { name: "Linen", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[aria-live="polite"]').filter({ hasText: "An easy texture. A little irregularity. Room to settle in." })).toBeVisible();
  });

  test("connects the making view to real maker information", async ({ page }) => {
    await page.getByRole("group", { name: "Studio views", exact: true }).getByRole("button", { name: "In the making", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Care is in");
    await page.getByRole("link", { name: "Meet the making", exact: true }).click();
    await expect(page).toHaveURL(/\/makers$/);
  });

  test("weaves in both founders without presenting a product catalog", async ({ page }) => {
    await expect(page.getByRole("region", { name: "Why we’re building Patina" })).toBeVisible();
    await expect(page.locator("#beginnings")).toContainText("two people.");
    await expect(page.getByRole("link", { name: /Shop this Room|Browse Collection/ })).toHaveCount(0);
  });

  test("makes the full Founding Circle offer first class", async ({ page }) => {
    const invitation = page.locator("#founding-circle");
    await expect(invitation.getByRole("heading", { name: "More than early access.", exact: true })).toBeVisible();
    await expect(invitation.locator("dt")).toHaveCount(5);
    await expect(invitation).toContainText("Limited to 200 founding members.");
    await expect(invitation).toContainText("Open wherever you call home.");
    await expect(invitation).toContainText("The app and marketplace are pre-launch.");
    await expect(invitation.getByRole("button", { name: "Join the Founding Circle", exact: true }).first()).toBeVisible();
  });

  test("offers clear consumer, designer and maker navigation", async ({ page }) => {
    const footer = page.getByRole("navigation", { name: "Footer navigation", exact: true });
    await expect(footer.getByRole("link", { name: "Founding Circle", exact: true })).toHaveAttribute("href", "/founding");
    await expect(footer.getByRole("link", { name: "For designers", exact: true })).toHaveAttribute("href", "/designers");
    await expect(footer.getByRole("link", { name: "For makers", exact: true })).toHaveAttribute("href", "/makers");
  });

  test("keeps the original Strata and newsletter in the footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("img", { name: "Patina strata mark" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "The Designer’s Eye.", exact: true })).toBeVisible();
    await expect(footer.getByRole("button", { name: "Subscribe", exact: true })).toBeVisible();
  });
});
