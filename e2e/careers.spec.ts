import { test, expect } from "@playwright/test";

test.describe("Careers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/careers");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Careers.*Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("lasting");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display company values", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our values" })).toBeVisible();
    await expect(page.getByText("Craft Over Speed")).toBeVisible();
    await expect(page.getByText("Transparency First")).toBeVisible();
    await expect(page.getByText("Sustainable Thinking")).toBeVisible();
    await expect(page.getByText("Maker Mindset")).toBeVisible();
  });

  test("should display benefits section", async ({ page }) => {
    await expect(page.getByText("Benefits & Perks")).toBeVisible();
    await expect(page.getByText("Competitive salary + equity")).toBeVisible();
    await expect(page.getByText("Unlimited PTO")).toBeVisible();
    await expect(page.getByText("Furniture discount")).toBeVisible();
  });

  test("should display open positions", async ({ page }) => {
    await expect(page.getByText("Open positions")).toBeVisible();
    await expect(page.getByText("Senior Product Designer")).toBeVisible();
    await expect(page.getByText("Full-Stack Engineer")).toBeVisible();
    await expect(page.getByText("Design Services Lead")).toBeVisible();
    await expect(page.getByText("Maker Relations Manager")).toBeVisible();
    await expect(page.getByText("Content Producer")).toBeVisible();
  });

  test("should display job departments", async ({ page }) => {
    await expect(page.getByText("Design").first()).toBeVisible();
    await expect(page.getByText("Engineering")).toBeVisible();
    await expect(page.getByText("Customer Experience")).toBeVisible();
  });

  test("should have Apply Now buttons", async ({ page }) => {
    const applyButtons = page.getByRole("link", { name: "Apply Now" });
    await expect(applyButtons.first()).toBeVisible();
    expect(await applyButtons.count()).toBeGreaterThan(0);
  });

  test("should display general application CTA", async ({ page }) => {
    await expect(page.getByText("Don't see a fit?")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Send General Application" })
    ).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
