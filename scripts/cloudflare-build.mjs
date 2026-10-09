import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { assertNoPrivateValues, retainPublicBuildEnv } from "./cloudflare-artifact.mjs";
import { buildKeys, loadProductionEnv, missingKeys } from "./production-env.mjs";

loadProductionEnv();
// Local preview origins must never leak into a deployable sitemap or canonical URL.
process.env.NEXT_PUBLIC_SITE_URL = "https://patina.cloud";
process.env.NODE_ENV = "production";
const missing = missingKeys(buildKeys);
if (missing.length) {
  console.error(`Missing build configuration: ${missing.join(", ")}`);
  process.exit(1);
}

const result = spawnSync("node_modules/.bin/opennextjs-cloudflare", ["build"], {
  stdio: "inherit",
  env: process.env,
});
if (result.error) console.error(result.error.message);
if (result.status !== 0) process.exit(result.status ?? 1);

try {
  retainPublicBuildEnv(".open-next", process.env);
  const result = assertNoPrivateValues(".open-next", process.env);
  console.log(`Cloudflare artifact verified: ${result.filesChecked} files, ${result.privateValuesChecked} private values checked; no private configuration retained.`);
} catch (error) {
  // A failed artifact must not remain deployable through the standard command.
  rmSync(".open-next/worker.js", { force: true });
  console.error(error.message);
  process.exit(1);
}
