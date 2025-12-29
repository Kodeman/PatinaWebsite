import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Our Story.*Patina/);
  });

  test("should display hero section with tagline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Where Time Adds Value");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should display problem section", async ({ page }) => {
    await expect(page.getByText("The Problem")).toBeVisible();
    await expect(page.getByText(/Billions of dollars of furniture/)).toBeVisible();
  });

  test("should display problem statistics", async ({ page }) => {
    await expect(page.getByText("60-70%")).toBeVisible();
    await expect(page.getByText(/designer time consumed by manual tasks/)).toBeVisible();
  });

  test("should display origin story section", async ({ page }) => {
    await expect(page.getByText("Our Story")).toBeVisible();
    await expect(page.getByText("Where It Started")).toBeVisible();
  });

  test("should display narrative blocks", async ({ page }) => {
    const blocks = [
      "The Designer's Dilemma",
      "The Technologist's Itch",
      "The Aha Moment",
      "Building Together",
    ];

    for (const block of blocks) {
      await expect(page.getByRole("heading", { name: block })).toBeVisible();
    }
  });

  test("should display name definition section", async ({ page }) => {
    await expect(page.getByText("Patina")).toBeVisible();
    await expect(page.getByText("/pəˈtēnə/")).toBeVisible();
    await expect(page.getByText(/The surface appearance that develops/)).toBeVisible();
  });

  test("should display all 5 brand values", async ({ page }) => {
    await expect(page.getByText("What We Believe")).toBeVisible();

    const values = [
      "Listen First, Design Second",
      "Craft Over Mass",
      "Stories Over Specs",
      "Heartland Roots",
    ];

    for (const value of values) {
      await expect(page.getByRole("heading", { name: value })).toBeVisible();
    }
    // "Time Adds Value" appears in multiple places, check the value card specifically
    await expect(page.locator("h3", { hasText: "Time Adds Value" })).toBeVisible();
  });

  test("should display founders section", async ({ page }) => {
    await expect(page.getByText("The Founders")).toBeVisible();
    await expect(page.getByRole("heading", { name: /complementary visions/i })).toBeVisible();
  });

  test("should display founder information", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Leah Kochaver" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Kody Kochaver" })).toBeVisible();
    await expect(page.getByText("Design & Experience")).toBeVisible();
    await expect(page.getByText("Technology & Product")).toBeVisible();
    await expect(page.getByText("Madison, Wisconsin").first()).toBeVisible();
  });

  test("should display Middlewest Studio connection", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Born From Real Design Work" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Visit Middlewest Studio/i })).toBeVisible();
  });

  test("should display company timeline", async ({ page }) => {
    await expect(page.getByText("Our Journey")).toBeVisible();

    const years = ["2023", "2024", "2025"];
    for (const year of years) {
      await expect(page.getByText(year).first()).toBeVisible();
    }
  });

  test("should display timeline milestones", async ({ page }) => {
    const milestones = [
      "The Spark",
      "First Lines of Code",
      "AR Comes Alive",
      "Building the Marketplace",
    ];
    for (const milestone of milestones) {
      await expect(page.getByRole("heading", { name: milestone })).toBeVisible();
    }
  });

  test("should display CTA section", async ({ page }) => {
    await expect(page.getByText(/The best things are built together/)).toBeVisible();
  });

  test("should have CTA action buttons", async ({ page }) => {
    const actions = [
      { name: /Explore Furniture Collection/i, href: "/furniture" },
      { name: /For Designers/i, href: "/designers" },
      { name: /For Makers/i, href: "/makers" },
      { name: /Get the App/i, href: "/app" },
    ];

    for (const action of actions) {
      const link = page.getByRole("link", { name: action.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", action.href);
    }
  });

  test("should navigate to furniture when clicking Explore Furniture Collection", async ({ page }) => {
    const exploreLink = page.getByRole("link", { name: /Explore Furniture Collection/i });
    await exploreLink.click();
    await expect(page).toHaveURL(/\/furniture/);
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
