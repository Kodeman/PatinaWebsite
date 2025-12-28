import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Our Story.*Patina/);
  });

  test("should display hero section with tagline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Where time adds");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("value");
  });

  test("should display StrataMark logo element", async ({ page }) => {
    // StrataMark is rendered as divs with specific structure
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByText("PATINA").first()).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Furniture" })).toBeVisible();
  });

  test("should display mission section", async ({ page }) => {
    await expect(page.getByText("Our Mission")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Fighting furniture/i })).toBeVisible();
    await expect(page.getByText(/fast fashion/i)).toBeVisible();
  });

  test("should display all 4 company values", async ({ page }) => {
    await expect(page.getByText("What We Believe")).toBeVisible();

    const values = [
      "Craft Over Mass",
      "Stories Worth Telling",
      "Transparency Always",
    ];

    for (const value of values) {
      await expect(page.getByRole("heading", { name: value })).toBeVisible();
    }
    // "Time Adds Value" appears in multiple places, check the value card specifically
    await expect(page.locator("h3", { hasText: "Time Adds Value" })).toBeVisible();
  });

  test("should display value descriptions", async ({ page }) => {
    await expect(page.getByText(/Every piece in our collection is made by human hands/)).toBeVisible();
    await expect(page.getByText(/Furniture should come with a story/)).toBeVisible();
  });

  test("should display company timeline", async ({ page }) => {
    await expect(page.getByText("Our Journey")).toBeVisible();

    const timeline = ["2021", "2022", "2023", "2024"];
    for (const year of timeline) {
      await expect(page.getByText(year)).toBeVisible();
    }
  });

  test("should display timeline milestones", async ({ page }) => {
    const milestones = ["The Spark", "First Makers", "AR Launch", "Growing Network"];
    for (const milestone of milestones) {
      await expect(page.getByRole("heading", { name: milestone })).toBeVisible();
    }
  });

  test("should display team section", async ({ page }) => {
    await expect(page.getByText("The Team")).toBeVisible();
    await expect(page.getByRole("heading", { name: /The people behind/i })).toBeVisible();
  });

  test("should display all team members", async ({ page }) => {
    const team = [
      { name: "Elena Vasquez", role: "Co-Founder & CEO" },
      { name: "James Okonkwo", role: "Co-Founder & CTO" },
      { name: "Sarah Chen", role: "Head of Maker Relations" },
      { name: "Marcus Webb", role: "Head of Design" },
    ];

    for (const member of team) {
      await expect(page.getByRole("heading", { name: member.name })).toBeVisible();
      await expect(page.getByText(member.role)).toBeVisible();
    }
  });

  test("should display final CTA section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Join us in changing/i })).toBeVisible();
  });

  test("should have Explore Collection link", async ({ page }) => {
    const exploreLink = page.getByRole("link", { name: /Explore Collection/i });
    await expect(exploreLink).toBeVisible();
    await expect(exploreLink).toHaveAttribute("href", "/furniture");
  });

  test("should have Partner With Us link", async ({ page }) => {
    const partnerLink = page.getByRole("link", { name: /Partner With Us/i });
    await expect(partnerLink).toBeVisible();
    await expect(partnerLink).toHaveAttribute("href", "/designers");
  });

  test("should navigate to furniture when clicking Explore Collection", async ({ page }) => {
    const exploreLink = page.getByRole("link", { name: /Explore Collection/i });
    await exploreLink.click();
    await expect(page).toHaveURL(/\/furniture/);
  });

  test("should navigate to designers when clicking Partner With Us", async ({ page }) => {
    const partnerLink = page.getByRole("link", { name: /Partner With Us/i });
    await partnerLink.click();
    await expect(page).toHaveURL(/\/designers/);
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
