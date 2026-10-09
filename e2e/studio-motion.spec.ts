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
  const studio = page.getByRole("region", { name: "Explore the living study" });
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Where TimeAdds Value.");
  await page.mouse.wheel(0, 700);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("An eye forwhat belongs.");
  await page.mouse.wheel(0, -700);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Where TimeAdds Value.");
  await page.mouse.wheel(0, 1400);
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Care is inthe details.");
  await studio.getByRole("button", { name: "Motion on", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect(studio.getByRole("button", { name: "In the making", exact: true })).toHaveAttribute("aria-pressed", "true");
  await studio.getByRole("button", { name: "As a study", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("An eye forwhat belongs.");
  await studio.getByRole("button", { name: "Linen", exact: true }).click();
  await expect(studio.getByText("An easy texture. A little irregularity. Room to settle in.", { exact: false })).toBeVisible();
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
  await expect(studio.getByRole("button", { name: "As a study", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("reduced motion gives phone visitors all three views without a pinned scroll journey", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const consent = page.getByRole("button", { name: "Decline", exact: true });
  if (await consent.isVisible()) await consent.click();
  const studio = page.getByRole("region", { name: "Explore the living study" });
  await expect(studio.getByRole("button", { name: "Motion off, following your device setting" })).toBeDisabled();
  await studio.getByRole("button", { name: "As a study", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toBeInViewport();
  await studio.getByRole("button", { name: "In the making", exact: true }).click();
  await expect(studio.getByRole("heading", { level: 1 })).toHaveText("Care is inthe details.");
  await studio.getByRole("link", { name: "Continue to our story ↓", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Behind the study, two people. One shared instinct." })).toBeInViewport();
});

test("the studio story remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Where TimeAdds Value.");
  await page.getByRole("link", { name: "Continue to our story ↓" }).click();
  await expect(page.getByRole("heading", { name: "Behind the study, two people. One shared instinct." })).toBeInViewport();
  await expect(page.getByRole("link", { name: "hello@patina.cloud", exact: true })).toHaveAttribute("href", "mailto:hello@patina.cloud");
  await context.close();
});
