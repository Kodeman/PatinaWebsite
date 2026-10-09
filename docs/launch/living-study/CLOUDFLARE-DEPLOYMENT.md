# Patina — Cloudflare deployment runbook

Updated 10 September 2026. **The redesign is live at `https://patina.cloud`; `www` redirects to the apex, and both names have valid TLS.** The original Vercel deployment is retained for rollback. See the [deployment record](DEPLOYMENT-RECORD.md) for the current version, verified behavior, verified database and email setup, authenticated DNS inventory, and remaining controlled form/email checks. The instructions below describe the complete release procedure; do not recreate resources that are already recorded as deployed.

**Confirmed database:** hosted Supabase Cloud project **Strata**, reference `bkvcixdmuyejfzcijpdg`, at `https://bkvcixdmuyejfzcijpdg.supabase.co`. The owner confirmed on 10 September 2026 that Supabase is no longer self-hosted. Earlier API-host checks were misidentified as self-hosted verification; connected project/schema checks supersede that interpretation. The website uses the hosted URL directly.

OpenNext was selected to preserve the existing production Next.js behavior. This release uses Next.js 16.3.4, React 19.3.0, `@opennextjs/cloudflare` 1.20.6, Wrangler 4.130.0, and Node 24 for the verified build. Keep the checked-in lockfile and overrides for the release.

## Verified preparation state

| Item | Result recorded by the production workstream |
| --- | --- |
| Cloudflare account | Read-only authentication confirmed account `be3aaeed18a81b5d90ee2263b62219ea` |
| Zone | `patina.cloud` is active |
| DNS inventory | New DNS token authenticated; all 32 records saved in ignored `.wrangler/dns-all-before-cutover.json`. The original-origin snapshot includes seven relevant records and four Worker routes. Only the two website A records were replaced during cutover; all 30 unrelated records are unchanged. After-state and domain snapshots are retained locally. |
| Worker | `patina-website` serves both attached production custom domains and `https://patina-website.kody-be3.workers.dev` |
| R2 | `patina-website-cache` is created and populated |
| Build | The signup-email update passed its Cloudflare build and TypeScript check. Its artifact guard checked 1,416 files against seven known private values. |
| Bundle | Current production version `3a925280-828e-4fad-b72d-46f0f0cd25f0`: 24,206.00 KiB uncompressed; 5,629.79 KiB gzip. Cloudflare reported 60 ms startup. |
| Server/build tests | All 28 remaining tests and scoped lint pass for direct hosted Strata access, after removing the temporary API adapter and its four tests. The three contact-fallback regressions remain covered. |
| Production browser checks | The initial cutover passed 31 checks. The Kody signup-email update verified all 24 selected checks across a 23-pass run and one passing rerun after fixing an ambiguous privacy-link locator. Submissions were blocked or mocked. See the deployment record. |
| Production HTTP checks | All 15 passed, including core pages, hosted count 200, sitemap/robots, social/optimized images, custom 404, and Materials/Furniture redirects preserving campaign queries. Apex TLS and `www` 308 TLS/path/query behavior passed; canonical and DENY/nosniff headers are correct. |
| Operational verification | No email was sent and browser form tests intercept submissions. A transaction-scoped database write/read check succeeded and was rolled back, leaving no test record. |
| Services | Resend domain verified. Connected Supabase identifies hosted Strata; its service-role credential matches the project, and direct hosted HEAD returned 200 with count 0. The corrected live production count returned 200. A service-role INSERT/SELECT assertion passed inside a rolled-back transaction; no test record remained. Live form enrollment and actual email receipt remain untested. |
| Final configuration | Both custom domains route to `patina-website`; all four existing Worker routes are unchanged; hosted Strata URL, all five secrets, and absence of the temporary API binding are verified in `.wrangler/production-final-configuration.json`. |
| Contact persistence | Migration `20260910152111_create_contact_messages` applied to Strata. RLS, service-role INSERT/SELECT and BYPASSRLS, no anon/authenticated table access, REST HEAD 200, and rolled-back INSERT/SELECT verified. |
| Final preview | Restarted on port 8787 with public configuration only. Homepage returned 200 with its production canonical; the founding-count endpoint returned retryable 503 without persistence credentials. Mutating submission requests remain mocked or blocked. |
| Dependency audit | Six moderate, zero high findings remain after the `adm-zip` 0.6.0 and `sharp` 0.35.4 overrides. The remaining ZIP symlink-extraction issue is in the Sanity CLI dependency chain; runtime reachability has not been audited. |

The current Cloudflare limit is **64 MiB uncompressed** on both Workers plans, with **no compressed-size limit**. The measured bundle is below that size limit. Gzip size is informational. Startup, CPU, memory, request, and asset limits still apply; the current documentation also lists one second for startup and 128 MB per isolate. Confirm the intended account plan against the workload rather than choosing it from gzip size. [Cloudflare limits, updated 5 September 2026](https://developers.cloudflare.com/workers/platform/limits/)

An artifact scan caught OpenNext copying local private defaults into its generated server-only `next-env.mjs` module. Nothing was uploaded. The [build wrapper](../../../scripts/cloudflare-build.mjs) now replaces that module with public defaults and fails if known private credential values appear in generated text artifacts. The final rebuilt output and Wrangler bundle both passed that scan. Use `npm run build:cloudflare` so this cleanup and validation always run.

## Runtime and resource map

[wrangler.jsonc](../../../wrangler.jsonc) names the Worker `patina-website`, uses `.open-next/worker.js`, and serves `.open-next/assets` through `ASSETS`. Its compatibility date is `2026-09-10`, with `nodejs_compat` and `global_fetch_strictly_public`.

| Binding | Purpose and expected resource |
| --- | --- |
| `ASSETS` | Static assets uploaded with the OpenNext release |
| `IMAGES` | Cloudflare Images binding for the image path; confirm account availability during provisioning |
| `WORKER_SELF_REFERENCE` | Service binding to `patina-website` itself |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 bucket `patina-website-cache` for incremental cache |
| `NEXT_CACHE_DO_QUEUE` | Durable Object class `DOQueueHandler` for cache revalidation work |
| `NEXT_TAG_CACHE_DO_SHARDED` | Durable Object class `DOShardedTagCache` for tag invalidation |

Supabase requests go directly to `https://bkvcixdmuyejfzcijpdg.supabase.co` using the server-only credential for hosted Strata. The temporary `PATINA_API` adapter/binding has been removed from the corrected configuration. Existing `api`, `app`, `admin`, and `client` DNS records and their Workers are unchanged by this website correction.

The `v1` migration creates both SQLite-backed Durable Object classes during the first deployment. They are framework cache infrastructure, not a new lead database. Supabase remains the existing system for submissions. Do not create a separate Cloudflare Queue or D1 database for these bindings.

[open-next.config.ts](../../../open-next.config.ts) selects R2 incremental caching, the Durable Object queue, and a one-shard tag cache with regional caching disabled. This configuration does not need a zone-purge token for regional cache invalidation. Preserve the binding names and class exports together. Renaming the Worker alone would leave its self-reference pointing at the wrong service.

## 1. Preserve the existing origin and establish release access

Before any traffic change, obtain an authorized view of the zone’s DNS records. Record the apex and `www` record types, targets, proxy state, TTL, redirect rules, and relevant Worker routes. Keep that record with the release, not in public source control if it contains operational details. Authenticated snapshots are now retained at ignored `.wrangler/dns-all-before-cutover.json` (all 32 records) and `.wrangler/production-origin-before-cutover.json` (seven relevant records and four routes). Recheck them immediately before traffic changes.

Record the old hosting deployment identifier, its direct provider URL, and the exact way to restore the present apex/`www` behavior. Confirm that origin remains available during and after cutover. Do not remove the old host, detach its domain, delete its deployment, or change `api.patina.cloud`, mail records, verification records, or unrelated subdomains as part of website provisioning.

For the approved operation, select the confirmed account explicitly:

```sh
export CLOUDFLARE_ACCOUNT_ID=be3aaeed18a81b5d90ee2263b62219ea
npx wrangler whoami
```

Use operator access scoped for the required Worker, assets, R2, Durable Objects, and eventual domain work. Verify the intended account and zone before any mutation. A successful login alone does not prove DNS-read or cutover access.

## 2. Supply build configuration and reproduce the artifact

The [environment loader](../../../scripts/production-env.mjs) checks existing process variables first, then fills missing values from `.env.production.local`, `.env.local`, `.env.production`, and `.env`, in that order. It prints missing names rather than values.

| Name | Build | Deployed Worker runtime |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Required by build check | Keep the same project configured |
| `NEXT_PUBLIC_SANITY_DATASET` | Required by build check | Keep the same dataset configured |
| `NEXT_PUBLIC_SUPABASE_URL` | Required by build check | Wrangler public vars use `https://bkvcixdmuyejfzcijpdg.supabase.co` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Required by build check; public project key | Configure the same key for server analytics |
| `NEXT_PUBLIC_SITE_URL` | Build wrapper forces `https://patina.cloud` | Already in Wrangler public vars with that value |
| `NEXT_PUBLIC_POSTHOG_HOST` | Use the intended ingest host consistently | Already in Wrangler public vars as `https://us.i.posthog.com` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Use the project’s configured version consistently | Keep consistent where runtime content code needs it |
| `SANITY_API_READ_TOKEN` | Supply as a build secret when needed for the intended CMS reads | Required runtime secret |
| `SUPABASE_SERVICE_ROLE_KEY` | Not a client/build variable | Configured runtime secret; authenticated reads verified |
| `RESEND_API_KEY` | Not a client/build variable; recovered from existing production | Configured runtime secret |
| `SANITY_WEBHOOK_SECRET` | Not a client/build variable | Required runtime secret |
| `SANITY_PREVIEW_SECRET` | Not a client/build variable | Required runtime secret |

Public values can be compiled into browser assets. Changing them after a build requires rebuilding the release; runtime variables alone do not rewrite client JavaScript. Keep private values out of Wrangler `vars`, client bundles, command arguments, source control, and screenshots.

From the repository root, using Node 24 and the reviewed source revision:

```sh
npm ci
npm run check:production-env
npm run test:server
npm run build:cloudflare
npx wrangler deploy --dry-run --outdir .wrangler/deploy-check
```

`check:production-env` checks presence only. A present key may still be invalid. The confirmed Strata credential passed a direct hosted read check, and the corrected production count endpoint returned 200. A controlled service-role INSERT/SELECT test was rolled back successfully; no test record remained. The build command validates the four required build keys and creates the OpenNext artifact; it does not validate deployed secrets. The final wrapper must remove server-secret defaults and pass its private-value artifact scan. Treat a scan failure as a build failure; do not bypass it or upload its output. The dry run packages the artifact without publishing it. Preserve the source revision, lockfile, sanitized build log, final bundle report, and validation results as one release record.

## 3. Configure and test a local Workers preview

After the sanitized rebuild, the build wrapper’s loading of `.env.local` does **not** supply private runtime fallback values to Wrangler preview. Use a local `.dev.vars` next to `wrangler.jsonc` with the actual runtime values required for the intended test environment, including all five runtime secrets and any public values not supplied in Wrangler configuration. Do not use placeholders as proof of configuration or reuse the earlier artifact’s embedded server values.

Confirm `.dev.vars` is ignored by Git and restrict access to its contents. When `.dev.vars` exists, Wrangler does not merge `.env` files into its local environment; all needed local secrets must be in the chosen file. Restart the preview after changing it. [Cloudflare local variables and secrets](https://developers.cloudflare.com/workers/local-development/environment-variables/)

```sh
npm run preview:cloudflare
```

Use another terminal for the browser suite:

```sh
npm run test:cloudflare
```

Review desktop/phone motion, reduced motion, keyboard focus, navigation, images, redirects, metadata, and form error states on `http://localhost:8787`. The automated suite’s intercepted forms and mocked server tests prove behavior around service boundaries; they do not prove live persistence or email delivery.

A separate approved operational test must verify actual persistence, duplicate enrollment, welcome email, newsletter confirmation, application acknowledgements, and contact routing using controlled recipients and records. Point that test deliberately at the candidate Worker. Generated links and canonical metadata still use `https://patina.cloud`; a confirmation link opening the old production host would not validate the candidate’s confirmation route. Do not change the production canonical origin merely to make a test pass.

## 4. Provision resources and deploy away from the production domain

This bootstrap step is complete and is retained here for a fresh environment. It creates remote resources and publishes a candidate on `workers.dev`; execute it only for an authorized release. A new pre-cutover environment would keep `routes` absent, `workers_dev: true`, and `preview_urls: false`. The current production Wrangler configuration already declares both attached custom domains; do not remove those routes during a routine update.

Create the named R2 bucket in the confirmed account:

```sh
npx wrangler r2 bucket create patina-website-cache
```

Then deploy the reviewed OpenNext artifact:

```sh
npm run deploy:cloudflare
```

The script runs `opennextjs-cloudflare deploy --keep-vars`. The first deployment creates `patina-website`, uploads its assets, and applies the configured Durable Object migration. Verify the resulting R2, Images, self-reference, and Durable Object bindings in the Worker settings. Confirm that Supabase uses the hosted Strata URL and that the temporary `PATINA_API` binding is absent. Record the deployment/version identifier and actual `workers.dev` URL reported by Cloudflare; no account subdomain is assumed here.

At this bootstrap stage, the Worker has the three public Wrangler variables plus public defaults retained from the build. It has no private credentials until secrets are installed. Persistence-dependent endpoints should remain unavailable until their secrets are installed. Do not promote that URL as the campaign destination or treat its initial deployment as a completed launch.

## 5. Install runtime values and verify the candidate

Remote Worker settings confirmed all five required runtime secrets; retain them for the direct hosted configuration. The DNS token is operator-only and is not a Worker secret. For an authorized replacement or fresh environment, use `patina-website` → Settings → Variables & Secrets to configure the public variables from the table and the five private values as **secrets**. Alternatively, these commands prompt for secret values without putting them in shell arguments:

```sh
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY --name patina-website
npx wrangler secret put RESEND_API_KEY --name patina-website
npx wrangler secret put SANITY_API_READ_TOKEN --name patina-website
npx wrangler secret put SANITY_WEBHOOK_SECRET --name patina-website
npx wrangler secret put SANITY_PREVIEW_SECRET --name patina-website
```

Each `secret put` creates and immediately deploys a new Worker version. Perform this configuration before domain cutover and record the final version. Future secret changes on the production Worker are deployments too. [Cloudflare secret deployment behavior](https://developers.cloudflare.com/workers/configuration/secrets/)

Continue using the repository’s `deploy:cloudflare` command so `--keep-vars` preserves additional dashboard-managed public variables. Secrets are managed separately. If public values move into Wrangler configuration later, review that change as the new source of truth. [Wrangler variable preservation](https://developers.cloudflare.com/workers/wrangler/configuration/#source-of-truth)

Before cutover, verify the candidate’s public pages, images, legacy redirects, CMS reads, cache revalidation, and missing-page behavior. Complete the approved operational tests from step 3. Confirm Resend sender configuration and actual receipt, not only an accepted API request. Verify the candidate's Supabase reads against hosted Strata directly. A successful operator-side HEAD request alone does not establish the deployed Worker's configuration. This correction reconnects the website to its existing hosted project; it does not move database data.

Before testing contact persistence, check the [deployment record](DEPLOYMENT-RECORD.md) for the execution status of the reviewed [contact table migration](../../../supabase/migrations/20260910152111_create_contact_messages.sql). Apply it only if still pending, through the authorized Supabase `apply_migration` connection for hosted Strata project `bkvcixdmuyejfzcijpdg`. Verify the table schema, RLS, service-role grants, and PostgREST schema refresh without reading customer messages. The earlier self-hosted management-host search is superseded and is not a release dependency.

Record binding names and secret **presence**, never secret values. Confirm there are no resource-limit or unfinished-background-task failures in the candidate’s logs. Mark unresolved audit and consent issues below with an owner and a release disposition.

## 6. Configure Workers Builds when automatic releases are approved

Connecting Git and enabling automatic builds is a separate operational action. Nothing in this preparation has enabled it. Set it up only after the first manual candidate and rollback procedure have been reviewed; keep non-production branch deployments disabled until their resource isolation is designed.

| Workers Builds setting | Proposed value |
| --- | --- |
| Worker | Existing `patina-website` created above |
| Repository/root | This repository, repository root |
| Production branch | The branch explicitly approved for releases; do not assume the default branch is authorized |
| Node | Node 24 |
| Dependency installation | Locked npm install (`npm ci`) |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Build variables | Required public build values from step 2, with canonical production origin |
| Build secrets | Only secrets required during the build, such as the intended Sanity read token |
| Runtime variables/secrets | Configure separately on the Worker; do not rely on build settings to supply them |

Workers Builds separates build-only values from runtime values and lets the project define its build/deploy commands. Keep those fields explicit rather than using a generic deployment command. [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)

This Worker has Durable Object bindings and `preview_urls: false`. Do not assume every pull request receives a usable version-preview URL. A staging Worker would need its own reviewed name, self-reference, cache resources, runtime secrets, and deployment policy.

## 7. Switch the production domain

**Completed on 10 September 2026.** The code upload succeeded, but Wrangler domain attachment returned error `100117` because the original A records were externally managed, despite an empty changeset conflict list. The operator reverified and removed only those two saved A records, then attached each hostname through `PUT /accounts/{account_id}/workers/domains`. Automatic restoration of the old record on an attachment failure was prepared and was not needed: both attachments succeeded. [Cloudflare Attach Domain API](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/update/)

The current `wrangler.jsonc` declares both active custom domains. The Next.js redirect sends `www` to the apex while preserving the path and query:

```json
"routes": [
  { "pattern": "patina.cloud", "custom_domain": true },
  { "pattern": "www.patina.cloud", "custom_domain": true }
]
```

Cloudflare owns the resulting proxied `AAAA 100::` placeholder records; do not edit them manually. The domain IDs and certificate IDs are in the [deployment record](DEPLOYMENT-RECORD.md). Ignored `.wrangler/production-custom-domains.json` preserves the attachments, and `.wrangler/dns-all-after-cutover.json` preserves the authenticated after-state. Comparison with the before-snapshot confirms all 30 unrelated DNS records are unchanged. Cloudflare manages Custom Domain DNS and certificates. [Cloudflare Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

For future reviewed releases, preserve the active route declarations and use `npm run deploy:cloudflare`. Verify certificate readiness, apex and `www` behavior, homepage, Founding Circle, practical pages, images, canonical URLs, and legacy redirects at the public hostname. The first production release passed all 31 browser and 15 HTTP checks; the deployment record and ignored `.wrangler/production-http-checks.json` retain the results. Complete the agreed operational email/form checks when the recipient is approved, and monitor errors and delivery. Keep the old host available for rollback. Campaign distribution remains a separate action.

## 8. Roll back without discarding data

**Restore the previous Vercel site:**

1. Verify the saved Vercel deployment is still available, and load the original DNS records from `.wrangler/production-origin-before-cutover.json` or the full before-snapshot.
2. Detach only `patina.cloud` domain ID `cc7dbe2a0ebd21e3c8b5d393a8fd86959fd9abc0` and `www.patina.cloud` domain ID `fb8b92b89a75d72c34bc0b07f565a4a7e666c360` using `DELETE /accounts/be3aaeed18a81b5d90ee2263b62219ea/workers/domains/{domain_id}`. Use the custom-domain API rather than manually editing Cloudflare-managed placeholder records. [Cloudflare Detach Domain API](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/delete/)
3. Restore only their saved original A records through the DNS API, preserving each original target, TTL, and proxy setting. The target was `216.198.79.1` for both names; the recorded TTLs were 600 for the apex and 300 for `www`. Recreated DNS record IDs may differ from the original IDs.
4. Reconcile both custom-domain declarations in `wrangler.jsonc` before any subsequent deploy so the cutover cannot be silently reapplied. Verify the restored public origin, TLS, redirects, and enrollment path. Compare unrelated DNS against the saved inventory.

Retain the Vercel resource, new Worker, R2 bucket, Durable Objects, and all Supabase/email data during rollback. Reverting website routing does not require deleting the additive contact table or any customer records.

**Later Worker releases:** identify the last accepted compatible Worker version from the release record, then use the dashboard rollback action or the reviewed CLI command:

```sh
npx wrangler versions list --name patina-website
npx wrangler rollback VERSION_ID --name patina-website
```

Replace `VERSION_ID` with the recorded version. Rollback changes the active code deployment; it does not undo database writes or external resource changes. Durable Object class lifecycle changes and missing bindings can prevent a rollback, so preserve the `v1` migration history and resources. Pause any approved automatic deployment path during recovery to prevent an immediate re-deploy of the failing revision. [Cloudflare rollback behavior and restrictions](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)

## Remaining limitations to carry into the release decision

- The inherited rate limiter stores state in memory per isolate. It is not a globally coordinated rate limit.
- Client analytics remains consent-aware, but server lead analytics has no dedicated consent gate of its own. That inherited distinction requires a specific product/privacy decision; do not describe all server capture as consent-gated.
- Email and analytics now use `after()` with awaited promises. Cloudflare allows up to 30 seconds of post-response work through `waitUntil`; this is best-effort delivery, without a durable email outbox or automatic retry workflow. [Cloudflare response-lifetime limits](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil)
- The deployed contact fix retains the email fallback when the database insert fails, but awaits the founder notification and verifies `SendResult.success` before reporting success. A failed or rejected notification returns 503 with `Retry-After: 60`, without auto-reply or success analytics. Successful database saves keep the scheduled notification and reply. All three regression checks pass, and the fix is deployed. Founding-count query failures return retryable 503 instead of a fabricated zero.
- Resend authentication, its verified sending domain, the hosted Strata project/credential, a direct hosted read, and authenticated DNS inventory are verified. The contact migration, rolled-back database write/read check, and live production count read are complete. Live form persistence and send/receipt still require controlled tests; no email test has been approved or sent. The existing contact email fallback does not establish database persistence.
- The six remaining moderate dependency findings are not a clean audit. Review the Sanity CLI ZIP extraction path, avoid untrusted archive handling, and record whether further mitigation is required. No claim of runtime non-reachability has been established.

Source files inspected for this runbook: [Wrangler configuration](../../../wrangler.jsonc), [OpenNext configuration](../../../open-next.config.ts), [package scripts and pinned versions](../../../package.json), and [environment requirements/loader](../../../scripts/production-env.mjs). The implementation workstream supplied the verification and read-only account results above; writing this runbook performed no deployment or resource change.
