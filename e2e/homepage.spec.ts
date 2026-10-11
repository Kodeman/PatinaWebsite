import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route("**/api/**", (route) => route.request().method() === "GET" ? route.continue() : route.abort());
    await page.goto("/");
    const consent = page.getByRole("dialog", { name: "Cookie consent" });
    if (await consent.isVisible()) await consent.getByRole("button", { name: "Decline", exact: true }).click();
  });

  test("opens with the Founding Circle, with the designer door second", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("On the same page");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("as your designer.");
    const hero = page.getByRole("region", { name: "Explore one home, from table to install" });
    const join = hero.getByRole("button", { name: "Join the Founding Circle", exact: true });
    const designers = hero.getByRole("link", { name: "For designers", exact: true });
    await expect(join).toBeVisible();
    await expect(designers).toHaveAttribute("href", "/designers");
    await expect(hero.getByRole("link", { name: "Bring one live project", exact: true })).toHaveCount(0);
    // The nav door follows the homepage ruling too; other pages keep the studio door.
    const nav = page.locator("header.studio-nav");
    await expect(nav.getByRole("link", { name: /^Join the Founding Circle/ })).toHaveAttribute("href", "/founding");
    await expect(nav.getByRole("link", { name: /Bring one live project/ })).toHaveCount(0);
    // The Founding Circle button leads; the designer link follows it and stays a quiet text link.
    const order = await join.evaluate((button, link) => button.compareDocumentPosition(link!), await designers.elementHandle());
    expect(order & 4 /* Node.DOCUMENT_POSITION_FOLLOWING */).toBeTruthy();
    await expect(designers).not.toHaveClass(/studio-button/);
    // The pre-launch line stays visible beside the first button.
    await expect(page.locator(".studio-launch-line")).toContainText("The app and marketplace are pre-launch.");
    // The held tagline appears at most once in the page body, as a quiet brand moment.
    await expect(page.locator("main").getByText(/Where Time Adds Value/)).toHaveCount(1);
  });

  test("ends with a quiet designer band after the Founding Circle and no makers door", async ({ page }) => {
    const doors = page.getByRole("region", { name: "For designers", exact: true });
    await expect(doors.getByRole("heading", { level: 3 })).toHaveText("Your judgmentbelongs here.");
    await expect(doors.getByRole("heading", { level: 2 })).toHaveCount(0);
    await expect(doors.getByRole("link", { name: "Apply to the Founding 50", exact: true })).toHaveAttribute("href", "/designers");
    await expect(doors.locator('a[href="/makers"]')).toHaveCount(0);
    const afterInvitation = await page.locator("#founding-circle").evaluate((invitation, band) => invitation.compareDocumentPosition(band!), await doors.elementHandle());
    expect(afterInvitation & 4 /* Node.DOCUMENT_POSITION_FOLLOWING */).toBeTruthy();
  });

  test("lets a visitor inspect the material palette", async ({ page }) => {
    await page.getByRole("button", { name: "Look closer at the materials", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Hold it in");
    const materials = page.getByRole("group", { name: "Explore the study materials", exact: true });
    await materials.getByRole("button", { name: "Linen", exact: true }).click();
    await expect(materials.getByRole("button", { name: "Linen", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[aria-live="polite"]').filter({ hasText: "Soft and a little uneven. It relaxes as you live with it." })).toBeVisible();
  });

  test("connects the making view to real maker information", async ({ page }) => {
    await page.getByRole("group", { name: "Moments in one home", exact: true }).getByRole("button", { name: "The install", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Fewer surprises");
    await page.getByRole("link", { name: "Meet the makers", exact: true }).click();
    await expect(page).toHaveURL(/\/makers$/);
  });

  test("weaves in both founders without presenting a product catalog", async ({ page }) => {
    await expect(page.getByRole("region", { name: "Why we’re building Patina" })).toBeVisible();
    await expect(page.locator("#beginnings")).toContainText("two people.");
    // Leah's line runs as an unattributed pull line, never as a quotation.
    const founders = page.getByRole("region", { name: "Why we’re building Patina" });
    await expect(founders.getByText("Your taste, written down where your designer can see it.", { exact: true })).toBeVisible();
    await expect(founders.locator("blockquote")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Shop this Room|Browse Collection/ })).toHaveCount(0);
  });

  test("keeps the full Founding Circle offer as the main door", async ({ page }) => {
    await expect(page.locator(".studio-launch-line").getByRole("link", { name: /^A place at the beginning/ })).toHaveAttribute("href", "/founding");
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
