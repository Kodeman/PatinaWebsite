import { existsSync, readFileSync } from "node:fs";
import { parse } from "dotenv";

// Match Next's production precedence without printing any configuration values.
export function loadProductionEnv() {
  for (const file of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    if (!existsSync(file)) continue;
    for (const [key, value] of Object.entries(parse(readFileSync(file)))) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

export const buildKeys = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_POSTHOG_KEY",
];

export const runtimeKeys = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "SANITY_API_READ_TOKEN",
  "SANITY_WEBHOOK_SECRET",
  "SANITY_PREVIEW_SECRET",
];

export function missingKeys(keys) {
  return keys.filter((key) => !process.env[key]?.trim());
}
