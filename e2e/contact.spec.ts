import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should display the page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Contact.*Patina|Patina/);
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("hear");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display contact form", async ({ page }) => {
    await expect(page.getByLabel("Your Name")).toBeVisible();
    await expect(page.getByLabel("Email Address")).toBeVisible();
    await expect(page.getByLabel("Your Message")).toBeVisible();
  });

  test("should display contact reason dropdown", async ({ page }) => {
    await expect(page.getByLabel(/What's this about/)).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await expect(page.getByText("hello@patina.com")).toBeVisible();
    await expect(page.getByText("1-800-555-1234")).toBeVisible();
  });

  test("should display showroom address", async ({ page }) => {
    await expect(page.getByText("123 Craft District")).toBeVisible();
    await expect(page.getByText("Brooklyn, NY 11201")).toBeVisible();
  });

  test("should have submit button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Send Message/i })).toBeVisible();
  });

  test("should be able to fill out form", async ({ page }) => {
    await page.getByLabel("Your Name").fill("Test User");
    await page.getByLabel("Email Address").fill("test@example.com");
    await page.getByLabel("Your Message").fill("This is a test message");

    await expect(page.getByLabel("Your Name")).toHaveValue("Test User");
    await expect(page.getByLabel("Email Address")).toHaveValue("test@example.com");
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
