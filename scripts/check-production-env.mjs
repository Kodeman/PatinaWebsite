import { buildKeys, loadProductionEnv, missingKeys, runtimeKeys } from "./production-env.mjs";

loadProductionEnv();
const missing = missingKeys([...buildKeys, ...runtimeKeys]);
if (missing.length) {
  console.error(`Missing production configuration: ${missing.join(", ")}`);
  console.error("Set runtime secrets on the Cloudflare Worker. Never add them to source control.");
  process.exitCode = 1;
} else {
  console.log("Required configuration is present locally. This does not verify deployed secrets or mail delivery.");
}
