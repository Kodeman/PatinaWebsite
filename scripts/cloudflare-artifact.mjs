import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** OpenNext compiles env files; deployed secrets must come from Worker bindings. */
export function retainPublicBuildEnv(outputDir, env) {
  const target = join(outputDir, "cloudflare/next-env.mjs");
  if (!existsSync(target)) throw new Error("OpenNext env artifact is missing; review the adapter output.");
  const publicEnv = Object.fromEntries(
    Object.entries(env).filter(([key, value]) => key.startsWith("NEXT_PUBLIC_") && typeof value === "string"),
  );
  const serialized = JSON.stringify(publicEnv);
  writeFileSync(target, `export const production = ${serialized};\nexport const development = ${serialized};\nexport const test = {};\n`);
}

/** Report filenames only, never credential values or matching source lines. */
export function assertNoPrivateValues(outputDir, env) {
  const privateValues = Object.entries(env)
    .filter(([key, value]) => !key.startsWith("NEXT_PUBLIC_") && /(?:TOKEN|SECRET|PASSWORD|API_KEY|SERVICE_ROLE_KEY)/i.test(key) && typeof value === "string" && value.length >= 12)
    .map(([, value]) => value);
  let filesChecked = 0;
  const matches = [];
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (/\.(?:js|mjs|json|html|txt|map)$/.test(entry.name)) {
        filesChecked++;
        const body = readFileSync(path, "utf8");
        if (privateValues.some(value => body.includes(value) || body.includes(JSON.stringify(value).slice(1, -1)))) matches.push(path);
      }
    }
  }
  scan(outputDir);
  if (matches.length) throw new Error(`Private configuration found in build artifacts: ${matches.join(", ")}`);
  return { filesChecked, privateValuesChecked: privateValues.length };
}
