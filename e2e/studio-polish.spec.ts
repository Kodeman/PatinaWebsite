import { test, expect } from "@playwright/test";

const routes = [
  "/designers",
  "/makers",
  "/makers/apply",
  "/about",
  "/services",
  "/contact",
  "/app",
  "/journal",
  "/careers",
  "/press",
  "/founding",
  "/privacy",
  "/terms",
];
const preview = process.env.PATINA_PREVIEW_URL || "";

test.beforeEach(async ({ page }) => {
  // These are presentation checks; never send lead or newsletter submissions.
  await page.route("**/api/**", (route) =>
    route.request().method() === "GET" ? route.continue() : route.abort(),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`${route} keeps reading text legible against its surface`, async ({
    page,
  }) => {
    await page.goto(`${preview}${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toHaveAttribute(
      "data-studio-motion",
      "off",
    );
    await expect(page.locator("main")).toHaveCount(1);
    const result = await page.locator("main").evaluate((main) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d")!;
      const rgba = (color: string): number[] => {
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        return [...context.getImageData(0, 0, 1, 1).data];
      };
      const over = (front: number[], back: number[]) =>
        front
          .slice(0, 3)
          .map(
            (channel, index) =>
              (channel * front[3]) / 255 + back[index] * (1 - front[3] / 255),
          );
      const luminance = (color: number[]) =>
        color
          .slice(0, 3)
          .map((channel) => {
            const value = channel / 255;
            return value <= 0.04045
              ? value / 12.92
              : ((value + 0.055) / 1.055) ** 2.4;
          })
          .reduce(
            (sum, value, index) =>
              sum + value * [0.2126, 0.7152, 0.0722][index],
            0,
          );
      const failures: { text: string; ratio: number; required: number }[] = [];
      let checked = 0;
      for (const element of main.querySelectorAll<HTMLElement>(
        "p, blockquote, dt, dd, label, legend, h1, h2, h3, figcaption, a, button, small, span",
      )) {
        const text = [...element.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent)
          .join(" ")
          .trim();
        if (
          !text ||
          element.closest('[aria-hidden="true"]') ||
          !element.checkVisibility({
            checkOpacity: true,
            checkVisibilityCSS: true,
          })
        )
          continue;
        const ancestors: HTMLElement[] = [];
        for (
          let current: HTMLElement | null = element;
          current;
          current = current.parentElement
        )
          ancestors.unshift(current);
        let background = [255, 255, 255];
        for (const ancestor of ancestors)
          background = over(
            rgba(getComputedStyle(ancestor).backgroundColor),
            background,
          );
        const style = getComputedStyle(element);
        const foreground = over(rgba(style.color), background);
        const levels = [luminance(foreground), luminance(background)].sort(
          (a, b) => b - a,
        );
        const ratio = (levels[0] + 0.05) / (levels[1] + 0.05);
        const large =
          parseFloat(style.fontSize) >= 24 ||
          (parseFloat(style.fontSize) >= 18.66 &&
            parseInt(style.fontWeight) >= 700);
        const required = large ? 3 : 4.5;
        checked++;
        if (ratio + 0.02 < required)
          failures.push({
            text: text.slice(0, 100),
            ratio: Math.round(ratio * 100) / 100,
            required,
          });
      }
      return { checked, failures };
    });
    expect(result.checked).toBeGreaterThan(10);
    expect(result.failures).toEqual([]);
  });
}

test("pages hydrate and load their hero images without runtime errors", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (error) =>
    errors.push(`${page.url()}: ${error.message}`),
  );
  for (const route of routes) {
    await page.goto(`${preview}${route}`);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("body")).toHaveAttribute(
      "data-studio-motion",
      "off",
    );
    const heroImages = page.locator(
      "main img:not([loading=lazy])",
    );
    if (["/about", "/makers", "/designers"].includes(route)) {
      await expect(heroImages.first()).toBeVisible();
    }
    for (const image of await heroImages.all()) {
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate(
          (element) => (element as HTMLImageElement).naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }
  }
  expect(errors).toEqual([]);
});

test("designers can explore the study with a keyboard", async ({ page }) => {
  await page.goto(`${preview}/designers`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveAttribute("data-studio-motion", "off");
  const choices = page.getByRole("group", {
    name: "Explore a designer’s perspective",
  });
  await choices
    .getByRole("button", { name: "Proportion", exact: true })
    .focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(
    choices.getByRole("button", { name: "Material", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "What you want to reach for." }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(
    choices.getByRole("button", { name: "Character", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", {
      name: "Illustrative timber and leather lounge chair, isolated to show its form",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What makes it worth keeping." }),
  ).toBeVisible();
});

for (const width of [320, 390, 768]) {
  test(`supporting pages fit a ${width}px screen while scrolling`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const route of routes) {
      await page.goto(`${preview}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      for (const target of ["main h1", "main > :last-child"]) {
        await page.locator(target).first().scrollIntoViewIfNeeded();
        await expect
          .poll(
            () =>
              page.evaluate(
                () =>
                  document.documentElement.scrollWidth -
                  document.documentElement.clientWidth,
              ),
            { message: `${route} at ${width}px, near ${target}` },
          )
          .toBeLessThanOrEqual(1);
      }
    }
  });
}
