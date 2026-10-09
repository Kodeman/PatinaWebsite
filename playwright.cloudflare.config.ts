import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  use: { ...base.use, baseURL: process.env.PATINA_PREVIEW_URL || "http://localhost:8787" },
  // The built Worker is started separately, using preview:cloudflare.
  webServer: undefined,
});
