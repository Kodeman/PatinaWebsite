import { test, expect } from "@playwright/test";

test.describe("Design Services Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Design Services.*Patina/);
  });

  test("should display hero with new headline", async ({ page }) => {
    await expect(page.getByText("Design Services").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Your designer already knows your"
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText("space");
  });

  test("should display hero CTA", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Find Your Designer/i })
    ).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
  });

  test("should display the Briefing Package section", async ({ page }) => {
    await expect(page.getByText("The Patina Advantage")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /What your designer receives before/i,
      })
    ).toBeVisible();

    const items = ["Style Profile", "Room Scans", "Saved Pieces", "Budget & Timeline"];
    for (const item of items) {
      await expect(page.getByText(item, { exact: true })).toBeVisible();
    }
  });

  test("should display the new How It Works steps", async ({ page }) => {
    await expect(page.locator("#main-content").getByText("How It Works")).toBeVisible();

    const steps = ["Use the App", "Get Matched", "Meet & Consult", "Receive a Proposal"];
    for (const step of steps) {
      await expect(page.getByRole("heading", { name: step })).toBeVisible();
    }

    await expect(page.getByText("01", { exact: true })).toBeVisible();
    await expect(page.getByText("02", { exact: true })).toBeVisible();
    await expect(page.getByText("03", { exact: true })).toBeVisible();
    await expect(page.getByText("04", { exact: true })).toBeVisible();
  });

  test("should display the Designer Matching section", async ({ page }) => {
    await expect(page.getByText("Designer Matching")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /The right designer, not the/i })
    ).toBeVisible();
    await expect(page.getByText("Leah Kirkland")).toBeVisible();
    await expect(page.getByText("94%")).toBeVisible();
    await expect(page.getByText("Style Match")).toBeVisible();
  });

  test("should display the What to Expect scoping examples", async ({ page }) => {
    await expect(page.getByText("What to Expect")).toBeVisible();
    const scopes = ["A Single Room", "A Connected Floor", "A Whole Home"];
    for (const scope of scopes) {
      await expect(page.getByRole("heading", { name: scope })).toBeVisible();
    }
  });

  test("should display the closing CTA section with dual CTAs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Ready to meet/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Download the App/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Already Have a Profile\? Connect Now/i })
    ).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should not display legacy pricing tiers", async ({ page }) => {
    await expect(page.getByText("$450")).toHaveCount(0);
    await expect(page.getByText("Most Popular")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Room Design" })).toHaveCount(0);
  });

  test("closing primary CTA points to /app", async ({ page }) => {
    const downloadLink = page.getByRole("link", { name: /Download the App/i });
    await expect(downloadLink).toHaveAttribute("href", "/app");
  });
});
