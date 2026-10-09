import { test, expect } from "@playwright/test";

test("the paused Materials page sends existing visitors to makers", async ({
  page,
}) => {
  await page.route("**/api/**", (route) =>
    route.request().method() === "GET" ? route.continue() : route.abort(),
  );
  await page.goto("/materials");
  await expect(page).toHaveURL(/\/makers$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('a[href="/materials"]')).toHaveCount(0);
});

test("the launch sitemap excludes the paused Materials page", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).not.toMatch(/<loc>[^<]*\/materials<\/loc>/);
});

test("retired furniture routes lead directly to the maker invitation", async ({
  request,
}) => {
  for (const [path, status] of [
    ["/materials", 307],
    ["/furniture", 308],
    ["/furniture/archived-piece", 308],
  ] as const) {
    const response = await request.get(path + "?utm_source=studio-letter", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(status);
    expect(response.headers().location).toBe(
      "/makers?utm_source=studio-letter",
    );
  }
});
