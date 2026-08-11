import { test, expect } from "@playwright/test";

test.describe("Signup Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("should display the page", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Create your Patina account");
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("should show the SMS consent checkbox unchecked by default", async ({ page }) => {
    await expect(page.getByRole("checkbox")).not.toBeChecked();
  });

  test("should keep consent optional", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Mobile number (optional)").fill("5551234567");

    await expect(page.getByText("Add a mobile number, or uncheck the texts option.")).not.toBeVisible();
    await expect(page.getByRole("checkbox")).not.toBeChecked();
  });

  test("should show the exact inline error when consent is checked without a mobile number", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Add a mobile number, or uncheck the texts option.")).toBeVisible();
  });

  test("should display the required disclosure language", async ({ page }) => {
    const consentParagraph = page.getByText("Message and data rates may apply");

    await expect(consentParagraph).toContainText("STOP");
    await expect(consentParagraph).toContainText("HELP");
    await expect(consentParagraph).toContainText("Message and data rates may apply");
  });

  test("should link the consent text to privacy and SMS terms", async ({ page }) => {
    const consentParagraph = page.getByText("Message and data rates may apply");

    await expect(consentParagraph.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
    await expect(consentParagraph.getByRole("link", { name: /terms/i })).toHaveAttribute("href", "/terms#sms");
  });
});
