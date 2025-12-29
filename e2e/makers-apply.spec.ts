import { test, expect } from "@playwright/test";

test.describe("Maker Application Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/makers/apply");
  });

  test("should display hero section with heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("maker");
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.locator("nav").first()).toBeVisible();
  });

  test("should display what we look for section", async ({ page }) => {
    await expect(page.getByText("What we look for")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Exceptional Craft" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sustainable Practices" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Authentic Story" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Partnership Mindset" })).toBeVisible();
  });

  test("should display application form", async ({ page }) => {
    await expect(page.getByText("Apply to join")).toBeVisible();
  });

  test("should display workshop information fields", async ({ page }) => {
    await expect(page.getByLabel("Workshop Name *")).toBeVisible();
    await expect(page.getByLabel("Location *")).toBeVisible();
    await expect(page.getByLabel("Primary Specialty *")).toBeVisible();
    await expect(page.getByLabel("Years of Experience *")).toBeVisible();
  });

  test("should display contact information fields", async ({ page }) => {
    await expect(page.getByLabel("Contact Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Phone")).toBeVisible();
    await expect(page.getByLabel("Website or Portfolio")).toBeVisible();
  });

  test("should display about your work fields", async ({ page }) => {
    await expect(page.getByLabel("Tell us about your craft *")).toBeVisible();
    await expect(page.getByLabel("Sustainability practices")).toBeVisible();
    await expect(page.getByLabel("Portfolio links or images")).toBeVisible();
    await expect(page.getByLabel("How did you hear about us?")).toBeVisible();
  });

  test("should have specialty dropdown options", async ({ page }) => {
    const specialtySelect = page.getByLabel("Primary Specialty *");
    await expect(specialtySelect).toBeVisible();
    // Check that select has options
    const options = await specialtySelect.locator("option").allTextContents();
    expect(options).toContain("Wood furniture");
    expect(options).toContain("Upholstery");
    expect(options).toContain("Leather goods");
  });

  test("should have submit button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Submit Application" })
    ).toBeVisible();
  });

  test("should be able to fill out form", async ({ page }) => {
    await page.getByLabel("Workshop Name *").fill("Test Workshop");
    await page.getByLabel("Location *").fill("Brooklyn, NY");
    await page.getByLabel("Primary Specialty *").selectOption("Wood furniture");
    await page.getByLabel("Years of Experience *").fill("10 years");
    await page.getByLabel("Contact Name *").fill("Test Maker");
    await page.getByLabel("Email *").fill("maker@example.com");
    await page.getByLabel("Tell us about your craft *").fill("Test craft description");

    await expect(page.getByLabel("Workshop Name *")).toHaveValue("Test Workshop");
    await expect(page.getByLabel("Contact Name *")).toHaveValue("Test Maker");
    await expect(page.getByLabel("Email *")).toHaveValue("maker@example.com");
  });

  test("should show success message after form submission", async ({ page }) => {
    // Fill required fields
    await page.getByLabel("Workshop Name *").fill("Test Workshop");
    await page.getByLabel("Location *").fill("Brooklyn, NY");
    await page.getByLabel("Primary Specialty *").selectOption("Wood furniture");
    await page.getByLabel("Years of Experience *").fill("10 years");
    await page.getByLabel("Contact Name *").fill("Test Maker");
    await page.getByLabel("Email *").fill("maker@example.com");
    await page.getByLabel("Tell us about your craft *").fill("Test craft description");

    // Submit form
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Check success message
    await expect(page.getByText("Application Received")).toBeVisible();
    await expect(page.getByText("will review your application")).toBeVisible();
  });

  test("should have link to privacy policy", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
