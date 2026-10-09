import { defineConfig, devices } from "@playwright/test";

// Public Sanity identifiers (already in the client bundle) so CMS pages render
// in a checkout without .env.local. The dev server and test workers both see them.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= "kv3qrinl";
process.env.NEXT_PUBLIC_SANITY_DATASET ??= "production";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    // PostHog stays off in dev unless opted in. e2e opts in with a dummy key,
    // never the real one; tracking-coverage.spec.ts intercepts /ingest.
    env: {
      NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV: "true",
      NEXT_PUBLIC_POSTHOG_KEY: "phc_test",
    },
  },
});
