# Cloudflare deployment record — 10 September 2026

**The confirmed database is hosted Supabase Cloud project Strata**, reference `bkvcixdmuyejfzcijpdg`, at `https://bkvcixdmuyejfzcijpdg.supabase.co`. The owner corrected the stale self-hosted instructions on 10 September 2026. This is also the existing Vercel production database project.

**The redesign is live at https://patina.cloud.** The homepage returns 200 with Living Study content and valid TLS. Both `patina.cloud` and `www.patina.cloud` are attached to the `patina-website` Cloudflare Worker. The candidate also remains available at `https://patina-website.kody-be3.workers.dev`. The original Vercel deployment is retained for rollback. Automatic Git deployments were not enabled.

## Deployed resources

| Item | Recorded value |
| --- | --- |
| Account | `be3aaeed18a81b5d90ee2263b62219ea` |
| Worker | `patina-website` |
| R2 cache | `patina-website-cache`, Standard storage, 51 seeded entries |
| Runtime bindings in the corrected configuration | Assets, Images, R2, self-reference, and both configured Durable Object classes; direct HTTPS to hosted Supabase |
| Initial code version | `c8c24306-1f68-4294-8d27-608d03945d5d` |
| Current code version | `26c5b9bf-f680-4078-adf1-515b07f0b572` (matte homepage loops, 11 October 2026; see below). Previous: `68157308-9507-40ba-b101-8ed25b23ed3e` |
| Next build ID | `dvrwrWhAsnZQbn1lIVAsR` |
| Upload | 24,206.00 KiB uncompressed / 5,629.79 KiB gzip |
| Cloudflare startup measurement | 60 ms for the signup-email update |
| Source | Working tree on `codex/living-study-production`; no commit was created |

The first cache population completed. One write during a later population received a retryable 500, retried successfully, and the command reported all 51 entries populated. The public page checks subsequently passed.

Earlier checks through `api.patina.cloud` were misidentified as self-hosted database verification. That interpretation is superseded by the owner correction and connected Supabase project/schema checks. The temporary `PATINA_API` adapter and service binding have been removed from the corrected website configuration; the existing API Worker and `api`, `app`, `admin`, and `client` DNS remain untouched. The initial cutover used version `6b71d0b9-342a-4636-957c-2fca062bf960`; the current version above also includes the signup-email update described below.

## Verified behavior

- All 15 production HTTP checks passed: core pages, the hosted database count, sitemap/robots, social image, optimized room image, the custom 404, Materials 307 and Furniture 308 redirects with retained campaign queries and successful destination responses. The live homepage returned 200 with Living Study HTML, a `server: cloudflare` header, valid TLS, and canonical `https://patina.cloud`. `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff` were verified. Results are retained at ignored `.wrangler/production-http-checks.json`, preserving raw relative `Location` headers and normalized destination URLs.
- At the initial cutover, all **31 production Playwright checks passed in one minute**, covering studio launch, motion, and polish. Form submissions remained blocked or mocked. Cloudflare image delivery worked; retained photo credits and illustrative captions remain visible.
- The full remote browser suite passed 129/131. A real motion-resume defect was fixed: scrolling within the paused opening no longer makes resume jump to the last scene. The mobile test now waits for streamed loading markup to settle. All 13 affected checks passed on the subsequent remote deployment, covering both previously failing checks. After the API-binding deployment, the bounded remote `studio-launch` suite passed 10/10 in 28.4 seconds; mutation requests remained blocked or mocked. After the contact-fallback upload, `/contact` returned 200 with the expected heading and the focused remote contact-recovery test passed 1/1 in 1.7 seconds, with submissions mocked.
- The latest build passed TypeScript and the artifact guard: 1,416 generated files checked against seven known private values, with no detected private values in the scanned artifact. All 28 remaining server/build tests and scoped lint passed for the direct hosted configuration, including the three contact-fallback regressions. The temporary API adapter and its four tests were removed. The hosted build and deployment completed successfully; `git diff --check` passed in the preceding validation pass.
- A signed request to the preview's Sanity webhook invalidated the Careers cache successfully; the refreshed page returned 200. It did not edit CMS content or invalidate the old Vercel deployment.
- `https://www.patina.cloud/about?utm_source=launch` returned 308 to exactly `https://patina.cloud/about?utm_source=launch`, with valid TLS. The prior `www` certificate issue is resolved on the new production path.
- The connected Supabase account identifies active project **Strata**, reference `bkvcixdmuyejfzcijpdg`. The saved service-role credential identifies that same project. A direct authenticated HEAD request to its hosted `waitlist` endpoint returned 200 with count 0. The production Founding Circle count endpoint also returned 200 using the corrected direct hosted configuration. Query failures return retryable, noncacheable 503 rather than a fabricated zero.
- Connected Supabase SQL schema checks confirmed the required `waitlist`, `founding_designer_applications`, `maker_applications`, and `newsletter_subscribers` tables and columns in Strata. The missing `contact_messages` table was then created by the applied migration recorded below.
- The deployed contact fix now reports retryable 503 if both persistence and the fallback founder notification fail. It checks the notification result before reporting fallback success and skips the auto-reply and analytics on failure. Successful database saves keep the scheduled notification and reply. Three mocked regression tests failed against the old behavior and passed with the fix.
- Browser form tests were mocked or blocked. No successful live enrollment, contact message, newsletter signup, or email send was performed. A separate transaction-scoped service-role INSERT/SELECT check succeeded and was rolled back, leaving no test record. This verifies write/read permissions without testing live form enrollment or inbox delivery.

## Matte homepage loops — 11 October 2026

Version `26c5b9bf-f680-4078-adf1-515b07f0b572`, built from commit `5e07930` on `codex/living-study-production`. At Kody's request the two homepage loops sit back as background: a matte, dimmed treatment (`.photo` filter `saturate(0.72) contrast(0.86) brightness(0.8)` plus a warm `.shade::before` wash) and playback at 0.7× through the new `BackgroundVideo` `playbackRate` prop. The /makers hero is unchanged at 1×.

Validation:
- Before deploying: tsc, eslint, and 48 Playwright checks (homepage, studio-motion, studio-polish including contrast, makers, tracking coverage). The Cloudflare build and private-value scan passed on 1,421 files.
- After deploying, on `https://patina.cloud` at 1440 and 390 px: both loops play from the AV1 desktop and mobile sources at rate 0.7 with the matte filter applied, and there were no page errors. Analytics were blocked and nothing was submitted.

To roll back, run `npx wrangler rollback 68157308-9507-40ba-b101-8ed25b23ed3e --name patina-website`.

## Homeowner homepage release — 11 October 2026

Version `68157308-9507-40ba-b101-8ed25b23ed3e`, built from commit `18a456e` on `codex/living-study-production`. It applies Kody's ruling V17 (homepage only). `/` now speaks to homeowners about their own home, and the Founding Circle is its main door: the hero button and, on `/` only, the nav button. The designer door moves second, as a quiet hero link and a closing band. The release swaps in the homeowner loops and stills Kody picked on 2026-10-11 (`home-table`, `home-install`, `home-letter`; provenance in `public/images/studio/README.md`). The copy comes from [the copy deck](../../art-direction/homeowner-homepage-2026-10.md). Every other page stays studio-first.

Validation:
- Before deploying:
  - 110 server tests, tsc and eslint.
  - 78 Playwright checks: homepage, studio-motion/polish/launch, tracking coverage, about, designers and makers.
  - The CRAP gate. Its only flag is the pre-existing `getSupabaseAdmin` coverage note.
  - The Cloudflare build and private-value scan passed on 1,421 files, and the dry run packaged.
  - A cross-model review (SQ-26) raised six low findings. Five were fixed in `18a456e`. The sixth, the footer tagline, is allowed by V5.
- After deploying, on `https://patina.cloud`:
  - HTTP 200 on all 11 new media files.
  - The new h1 renders at 1440 and 390 px.
  - The hero and install loops play from the AV1 desktop and mobile sources.
  - The nav button points to `/founding`, and the hero button opens the Founding Circle modal.
  - No page errors. Analytics and submissions were blocked during the check, and nothing was submitted.

To roll back, run `npx wrangler rollback 4fb419bb-ed3b-42e0-a7ce-9108dff93789 --name patina-website`.

## Believable-imagery release — 10 October 2026

Version `4fb419bb-ed3b-42e0-a7ce-9108dff93789`, built from commit `c26c581` on `codex/living-study-production`. It replaced the retired generated studies with the Midjourney illustrations and Middle West photos in [the art-direction plan](../../art-direction/believable-imagery-2026-10.md), added the three background loops (`public/videos/studio/`, via `BackgroundVideo`), and placed Kody's portrait on `/about`. Scene 1 uses the loop variant Kody picked.

Validation:
- Before deploying: 110 server tests, tsc, and 90 Playwright checks (homepage, about, app, makers, designers, services, studio-polish/motion/launch and tracking coverage). The Cloudflare build and private-value scan passed on 1,421 files. The dry-run upload was 24,266.78 KiB / 5,649.36 KiB gzip.
- After deploying, on `https://patina.cloud`: HTTP 200 on 12 pages and 6 media files, and the served scene-1 loop is byte-identical to the release encode. A browser check at 1440 and 390 px confirmed both loops play from the AV1 desktop and mobile sources, with no page errors; analytics and submissions were blocked during the check.

To roll back, run `npx wrangler rollback 69e063c1-6909-458a-94a7-46b84f26bee1 --name patina-website`.

## Signup email update — Kody as sender

Version `3a925280-828e-4fad-b72d-46f0f0cd25f0` implements Kody’s request for personal signup mail. Founding Circle welcomes, designer acknowledgements, and maker acknowledgements use **Kody at Patina <hello@patina.cloud>**, with replies to **hello@patina.cloud** and Kody’s signature. The application notes say Kody will review with Leah, retaining the seven-day designer and two-week maker response expectations. They acknowledge receipt without claiming a review or acceptance has already happened.

The matching homepage, Founding Circle, modal, legacy signup, designer, and maker copy was updated. The [three email previews](email-review/index.html) were generated from the actual send functions with Resend transport intercepted locally. Sender, reply address, subject, and rendered HTML were inspected; no mail was sent.

Validation: 28 server/build tests, scoped lint, the Cloudflare build and private-value scan, and five live page/copy checks passed. The affected browser run passed 23 of 24 checks; its one failure was an ambiguous privacy-link test that also matched the cookie banner. Scoping it to the page’s exact privacy link passed the focused rerun. All 24 selected checks are therefore verified. Actual inbox delivery remains untested.

## Credentials and remaining launch checks

**Resend is configured.** The existing production key was recovered through the authenticated Vercel CLI, retained in ignored `.env.local`, and stored as a Worker secret. A read-only Resend API check accepted it and reported `patina.cloud` as verified. The temporary Vercel environment export was removed. The welcome email now includes the unsubscribe link required by Patina's messaging rules. Actual send/receipt still requires a controlled test with an approved recipient; no email test has been approved or sent.

**The hosted Strata credential is verified.** `SUPABASE_SERVICE_ROLE_KEY` matches project `bkvcixdmuyejfzcijpdg` and authenticates directly against `https://bkvcixdmuyejfzcijpdg.supabase.co`. The website configuration now targets that hosted URL. The corrected hosted build is deployed as the version above, and the live production database count returned 200.

**Contact migration is applied.** The reviewed [additive SQL](../../../supabase/migrations/20260910152111_create_contact_messages.sql) was applied through the connected Supabase `apply_migration` tool to hosted Strata project `bkvcixdmuyejfzcijpdg`. Remote migration history records `20260910152111_create_contact_messages`. Schema verification confirmed RLS enabled, `service_role` INSERT/SELECT access and BYPASSRLS, and no table privileges for `anon` or `authenticated`. Direct REST HEAD on `contact_messages` returned 200. An actual service-role INSERT and SELECT with assertions succeeded inside `BEGIN`/`ROLLBACK`, leaving no test record. No email was sent. The earlier LAN/management-host search is superseded and is not a release dependency.

**The two website domains are attached.** The Wrangler code upload succeeded, but its initial domain attachment returned error `100117` because the existing A records were externally managed; the changeset had reported no conflicts. Each original record was reverified before deleting only the two apex/`www` A records. The domains were then attached individually through the official Attach Domain API, with automatic restoration of the original record if attachment failed. Both attachments succeeded, so restoration was not needed. [Cloudflare Attach Domain API](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/update/)

Cloudflare now owns the proxied `AAAA 100::` placeholder records for these custom domains. Do not edit those records manually. An authenticated comparison confirms **all 30 unrelated DNS records are unchanged**. The original 32-record inventory is retained at ignored `.wrangler/dns-all-before-cutover.json`; the original-origin snapshot contains seven relevant records and four routes. Domain attachments and the final DNS state are saved in `.wrangler/production-custom-domains.json` and `.wrangler/dns-all-after-cutover.json`. `wrangler.jsonc` declares both active custom domains.

| Hostname | Custom Domain ID | Certificate ID |
| --- | --- | --- |
| `patina.cloud` | `cc7dbe2a0ebd21e3c8b5d393a8fd86959fd9abc0` | `01fab789-ab92-4f99-a4b1-06ea5d491c04` |
| `www.patina.cloud` | `fb8b92b89a75d72c34bc0b07f565a4a7e666c360` | `32ac1519-d5e1-4c93-b94d-c0ded170f2b5` |

Configured Worker secrets are `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `SANITY_API_READ_TOKEN`, `SANITY_WEBHOOK_SECRET`, and `SANITY_PREVIEW_SECRET`. The Sanity webhook and preview secrets match the existing Vercel configuration. The final settings audit confirmed all five runtime secrets, the hosted Strata URL, and absence of the temporary `PATINA_API` binding. Both custom domains route to `patina-website`, and all four existing Worker routes are unchanged. The audit snapshot is retained at ignored `.wrangler/production-final-configuration.json`. The DNS token is operator-only and was not installed on the Worker. Values were not printed or added to source control.

## Existing origin and rollback

The old production deployment remains available:

- Vercel deployment: `dpl_G2Gv1a3hBYZ22cuU1vysd2i86M5A`
- Provider URL: `https://patina-website-oqvg3yms6-kodemans-projects.vercel.app`
- Former production hostname: `https://patina.cloud`; its public traffic now routes to Cloudflare

Authoritative public DNS, queried before cutover:

| Name | Type | Address | TTL |
| --- | --- | --- | --- |
| `patina.cloud` | A | `216.198.79.1` | 600 |
| `www.patina.cloud` | A | `216.198.79.1` | 300 |

To restore the original site, detach only the two Custom Domain IDs listed above using `DELETE /accounts/be3aaeed18a81b5d90ee2263b62219ea/workers/domains/{domain_id}`. Then restore their saved original A records through the DNS API, preserving the saved targets, TTLs, and proxy settings; recreated DNS record IDs may differ. Reconcile the two `routes` declarations in `wrangler.jsonc` before another deploy so it cannot reattach the domains. Verify the restored origin and public routing. Retain the Vercel deployment, new Worker/cache resources, and all database data. Do not manually edit Cloudflare-managed placeholder records or alter unrelated DNS. [Cloudflare Detach Domain API](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/delete/)

Continue with the [deployment runbook](CLOUDFLARE-DEPLOYMENT.md). The website deployment, public TLS/redirect checks, and production browser/HTTP verification are complete. An approved enrollment/email test and the existing [launch decisions](PRODUCTION-HANDOFF.md#known-release-dependencies) remain separate follow-up work before campaign distribution. No marketing outreach or automatic Git deployment has been enabled.
