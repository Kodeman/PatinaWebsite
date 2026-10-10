import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", (route) =>
    route.request().method() === "GET" ? route.continue() : route.abort(),
  );
  await page.addInitScript(() =>
    localStorage.setItem("patina_analytics_consent", "denied"),
  );
});

test.describe("Our Story", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    await expect(page.locator("body")).toHaveAttribute(
      "data-studio-motion",
      "off",
    );
  });

  test("introduces the founders’ reason for building", async ({ page }) => {
    await expect(page).toHaveTitle(/Our Story.*Patina/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "A designer’s eye.A builder’s instinct.",
    );
    await expect(page.getByText(/Too many tools feel sterile/)).toBeVisible();
  });

  test("connects each founder’s background to their role", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "A home begins with a person." }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Make room for the work." }),
    ).toBeVisible();
    await expect(
      page.getByText(/She came home to Wisconsin in 2018/),
    ).toBeVisible();
    await expect(page.locator("main")).not.toContainText("Seattle");
    await expect(page.locator("main")).not.toContainText(/co-?founder/i);
    await expect(
      page.getByText(
        /His work has taken him through Jydo, Blacktee, and Avidex/,
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Visit Middle West Studio" }),
    ).toHaveAttribute("href", "https://middlewest.studio");
    await expect(
      page.getByRole("link", { name: "Read Kody’s approach" }),
    ).toHaveAttribute("href", "https://www.kochaver.com/");
    await expect(
      page.getByRole("link", { name: "More about Kody" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/kkochaver/");
  });

  test("grounds the name and origin in verified facts", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Patina.", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/The surface that develops through age and exposure/),
    ).toBeVisible();
    await expect(
      page.getByText(/Founded in Madison, Wisconsin, in 2023/),
    ).toBeVisible();
  });

  test("credits real work and founder photography", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Hiawatha / Middle West Studio" }),
    ).toHaveAttribute("href", "https://www.middlewest.studio/saraha-circle-1");
    await expect(
      page.getByRole("img", {
        name: /Leah Kochaver of Middle West Studio/,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/Portrait courtesy of Middle West Studio/),
    ).toBeVisible();
    await expect(
      page.getByRole("figure", { name: /Hiawatha/ }).locator("figcaption"),
    ).toContainText(
      "Interior design by Leah Kochaver. Photography by Ashley Hicks.",
    );
    await expect(
      page.getByText(
        /Design by Leah Kochaver. Photography by Middle West Studio/,
      ),
    ).toBeVisible();
  });

  test("chapter links bring the reader to each founder and the invitation", async ({
    page,
  }) => {
    const chapters = page.getByRole("navigation", {
      name: "Our story chapters",
    });
    for (const [name, id] of [
      ["Kody", "kody"],
      ["Patina", "together"],
      ["You", "next"],
      ["Leah", "leah"],
    ]) {
      const link = chapters.getByRole("link", { name: new RegExp(name) });
      await link.click();
      await expect(page).toHaveURL(new RegExp("#" + id + "$"));
      await expect(link).toHaveAttribute("aria-current", "location");
      await expect(page.locator("#" + id + " h2")).toBeInViewport();
    }
  });

  test("the room study remains usable by keyboard with motion reduced", async ({
    page,
  }) => {
    const controls = page.getByRole("group", { name: "Explore Leah’s work" });
    await controls
      .getByRole("button", { name: "The room", exact: true })
      .focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(
      controls.getByRole("button", { name: "The details", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("heading", { name: "Then, what you notice." }),
    ).toBeVisible();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await expect(
      page.getByRole("heading", { name: "And room for real life." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Sahara Circle / Middle West Studio" }),
    ).toBeVisible();
  });

  test("opens the founding invitation from the story", async ({ page }) => {
    await page
      .locator("main")
      .getByRole("button", { name: "Join the Founding Circle", exact: true })
      .click();
    await expect(
      page.getByRole("dialog", { name: /Founding Circle/ }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: /Founding Circle/ }),
    ).not.toBeVisible();
  });

  test("provides designer and maker paths with the original Strata", async ({
    page,
  }) => {
    const main = page.locator("main");
    await expect(
      main.getByRole("link", { name: "For designers", exact: true }),
    ).toHaveAttribute("href", "/designers");
    await expect(
      main.getByRole("link", { name: "For makers", exact: true }),
    ).toHaveAttribute("href", "/makers");
    await expect(
      page.getByRole("navigation", { name: "Main navigation", exact: true }),
    ).toBeVisible();
    await expect(
      main.getByRole("img", { name: "Patina strata mark" }).first(),
    ).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test("the desktop room journey advances and reverses with scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/about");
  await expect(page.locator("body")).toHaveAttribute(
    "data-studio-motion",
    "on",
  );
  const region = page.getByRole("region", { name: "Inside Leah’s work" });
  const controls = page.getByRole("group", { name: "Explore Leah’s work" });
  for (const [progress, name] of [
    [0.05, "The room"],
    [0.5, "The details"],
    [0.9, "Living with it"],
    [0.05, "The room"],
  ] as const) {
    await region.evaluate((element, fraction) => {
      const rect = element.getBoundingClientRect();
      window.scrollTo({
        top:
          window.scrollY +
          rect.top +
          (rect.height - window.innerHeight) * fraction,
        behavior: "instant",
      });
    }, progress);
    await expect(
      controls.getByRole("button", { name, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  await controls
    .getByRole("button", { name: "Living with it", exact: true })
    .click();
  await page.evaluate(() => window.scrollBy({ top: 5, behavior: "instant" }));
  await expect(
    controls.getByRole("button", { name: "Living with it", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("the phone room study keeps the chosen scene while the reader scrolls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/about");
  await expect(page.locator("body")).toHaveAttribute(
    "data-studio-motion",
    "on",
  );
  const controls = page.getByRole("group", { name: "Explore Leah’s work" });
  await controls
    .getByRole("button", { name: "The details", exact: true })
    .click();
  await page.locator("#kody").scrollIntoViewIfNeeded();
  await expect(
    controls.getByRole("button", { name: "The details", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
