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
  });

  test("should link the consent text to privacy and SMS terms", async ({ page }) => {
    const consentParagraph = page.getByText("Message and data rates may apply");

    await expect(consentParagraph.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
    await expect(consentParagraph.getByRole("link", { name: /terms/i })).toHaveAttribute("href", "/terms#sms");
  });

  // The API is mocked here deliberately: this is the only test that exercises a
  // real submission, and it has to assert the exact request body the route
  // requires (source/role/sms_consent/phone) without writing to Supabase.
  test("should submit consented signup with the fields the founding API requires", async ({ page }) => {
    let requestBody: Record<string, unknown> | null = null;

    await page.route("**/api/founding", async (route) => {
      requestBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel("First name (optional)").fill("Ada");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Mobile number (optional)").fill("555 123 4567");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Welcome to the Founding Circle")).toBeVisible();

    const body = requestBody as Record<string, unknown> | null;
    expect(body).not.toBeNull();
    expect(body?.source).toBe("signup_page");
    expect(body?.role).toBe("consumer");
    expect(body?.sms_consent).toBe(true);
    // The form transmits what the member typed; E.164 normalization (+1…) is
    // the founding route's job (normalizePhone), so the request body carries
    // the raw digits, not the "+1" form.
    expect(String(body?.phone).replace(/\D/g, "")).toBe("5551234567");
  });
});
