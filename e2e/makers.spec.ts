import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", (route) =>
    route.request().method() === "GET" ? route.continue() : route.abort(),
  );
  await page.addInitScript(() =>
    localStorage.setItem("patina_analytics_consent", "denied"),
  );
});

test("the workshop invitation leads to the existing application", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/makers");
  await expect(page.locator("body")).toHaveAttribute(
    "data-studio-motion",
    "off",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good work",
  );
  await expect(
    page.getByText("The first 15 founding makers", { exact: true }).first(),
  ).toBeVisible();
  await page.locator("main summary").filter({ hasText: "Who reads the applications?" }).click();
  await expect(
    page.locator("main").getByText(/Kody and Leah personally review every maker application/),
  ).toBeVisible();
  await page
    .locator("main")
    .getByRole("link", { name: "Apply to Partner" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/makers\/apply$/);
  await expect(
    page.getByLabel("Workshop Name *", { exact: true }),
  ).toBeVisible();
});

test("the making study works by keyboard with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/makers");
  await expect(page.locator("body")).toHaveAttribute(
    "data-studio-motion",
    "off",
  );
  const choices = page.getByRole("group", { name: "Explore the making" });
  await choices
    .getByRole("button", { name: "The material", exact: true })
    .focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "What did you refuse to rush?" }),
  ).toBeVisible();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("heading", { name: "What should people know?" }),
  ).toBeVisible();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("heading", { name: "What did you choose?" }),
  ).toBeVisible();
});

test("the making study follows scrolling in both directions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/makers");
  await expect(page.locator("body")).toHaveAttribute(
    "data-studio-motion",
    "on",
  );
  const stage = page.getByRole("region", {
    name: "There’s more to every piece.",
  });
  const choices = page.getByRole("group", { name: "Explore the making" });
  for (const [fraction, name] of [
    [0.05, "The material"],
    [0.5, "The construction"],
    [0.9, "The maker’s words"],
    [0.05, "The material"],
  ] as const) {
    await stage.evaluate((element, progress) => {
      const track = element.parentElement!;
      const distance =
        track.offsetHeight - (element as HTMLElement).offsetHeight;
      const top = parseFloat(getComputedStyle(element).top);
      window.scrollTo({
        top:
          window.scrollY +
          track.getBoundingClientRect().top -
          top +
          distance * progress,
        behavior: "instant",
      });
    }, fraction);
    await expect(
      choices.getByRole("button", { name, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
});
