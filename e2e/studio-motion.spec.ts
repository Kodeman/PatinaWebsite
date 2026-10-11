import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", route => route.request().method() === "GET"
    ? route.continue() : route.abort());
});

test("scrolling walks through the studio in both directions, and pausing keeps the selected view", async ({ page }) => {
  await page.goto("/");
  const consent = page.getByRole("button", { name: "Decline", exact: true });
  if (await consent.isVisible()) await consent.click();
  const studio = page.getByRole("region", { name: "Explore one home, from table to install" });
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("On the same pageas your designer.");
  await page.mouse.wheel(0, 700);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Hold it inyour own light.");
  await page.mouse.wheel(0, -700);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("On the same pageas your designer.");
  await page.mouse.wheel(0, 1400);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Fewer surpriseson install day.");
  await studio.getByRole("button", { name: "Motion on", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect(studio.getByRole("button", { name: "The install", exact: true })).toHaveAttribute("aria-pressed", "true");
  await studio.getByRole("button", { name: "Up close", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Hold it inyour own light.");
  await studio.getByRole("button", { name: "Linen", exact: true }).click();
  await expect(studio.getByText("Soft and a little uneven. It relaxes as you live with it.", { exact: false })).toBeVisible();
  // The paused opening still belongs to this view when the visitor scrolls
  // down to its controls. Resuming must not jump past it into the last scene.
  await page.evaluate(() => window.scrollTo({ top: 200, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await studio.getByRole("button", { name: "Motion off", exact: true }).click();
  await expect.poll(() => studio.evaluate(panel => {
    const track = panel.parentElement!;
    return -track.getBoundingClientRect().top / (track.offsetHeight - panel.clientHeight);
  })).toBeCloseTo(0.42, 2);
  await page.mouse.wheel(0, 20);
  await expect(studio.getByRole("button", { name: "Up close", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("reduced motion gives phone visitors all three views without a pinned scroll journey", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const consent = page.getByRole("button", { name: "Decline", exact: true });
  if (await consent.isVisible()) await consent.click();
  const studio = page.getByRole("region", { name: "Explore one home, from table to install" });
  await expect(studio.getByRole("button", { name: "Motion off, following your device setting" })).toBeDisabled();
  await studio.getByRole("button", { name: "Up close", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
  await studio.getByRole("button", { name: "The install", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Fewer surpriseson install day.");
  await studio.getByRole("link", { name: "Meet Kody and Leah ↓", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Behind Patina, two people. One house at a time." })).toBeInViewport();
});

test("the studio story remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("On the same pageas your designer.");
  await page.getByRole("link", { name: "Meet Kody and Leah ↓" }).click();
  await expect(page.getByRole("heading", { name: "Behind Patina, two people. One house at a time." })).toBeInViewport();
  await expect(page.getByRole("link", { name: "hello@patina.cloud", exact: true })).toHaveAttribute("href", "mailto:hello@patina.cloud");
  await context.close();
});
