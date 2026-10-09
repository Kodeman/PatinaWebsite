import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertNoPrivateValues, retainPublicBuildEnv } from "../scripts/cloudflare-artifact.mjs";

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "patina-artifact-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, "cloudflare"));
  return directory;
}

test("the deployed env module contains public values and no private defaults", (t) => {
  const directory = fixture(t);
  const target = join(directory, "cloudflare/next-env.mjs");
  writeFileSync(target, "export const production = { PRIVATE_TOKEN: 'sample-private-token' };");
  const env = { NEXT_PUBLIC_SITE_URL: "https://patina.cloud", PRIVATE_TOKEN: "sample-private-token", SANITY_API_WRITE_TOKEN: "another-private-token" };
  retainPublicBuildEnv(directory, env);
  const output = readFileSync(target, "utf8");
  assert.match(output, /https:\/\/patina.cloud/);
  assert.doesNotMatch(output, /PRIVATE_TOKEN|SANITY_API_WRITE_TOKEN|sample-private-token/);
  assert.equal(assertNoPrivateValues(directory, env).privateValuesChecked, 2);
});

test("a private value in another bundle fails validation without logging the value", (t) => {
  const directory = fixture(t);
  const secret = 'private-credential-"quoted"';
  writeFileSync(join(directory, "worker.js"), JSON.stringify({ accidental: secret }));
  assert.throws(() => assertNoPrivateValues(directory, { NEW_SERVICE_SECRET: secret }), error => {
    assert.match(error.message, /worker.js/);
    assert.ok(!error.message.includes(secret));
    return true;
  });
});

test("an unexpected adapter layout fails instead of silently skipping cleanup", (t) => {
  assert.throws(() => retainPublicBuildEnv(fixture(t), {}), /env artifact is missing/);
});
