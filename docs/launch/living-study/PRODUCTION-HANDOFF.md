# Patina — production handoff

Living Study production revision · 10 September 2026 · branch `codex/living-study-production`. This handoff records implementation, asset provenance, configuration presence, and release checks. The Cloudflare Workers preview is available at `http://localhost:8787`. Follow the [Cloudflare deployment runbook](CLOUDFLARE-DEPLOYMENT.md) for the current hosting configuration and cutover procedure. The replacement website is live at `https://patina.cloud`, with valid TLS and `www` redirecting to the apex while preserving paths and queries, with the candidate still available at `https://patina-website.kody-be3.workers.dev`. The original Vercel deployment is retained for rollback. The [deployment record](DEPLOYMENT-RECORD.md) records the active version, hosted database, domain attachments, and remaining launch checks.

**Database correction, 10 September 2026:** the website uses hosted Supabase Cloud project **Strata**, reference `bkvcixdmuyejfzcijpdg`, at `https://bkvcixdmuyejfzcijpdg.supabase.co`. The owner confirmed that Supabase is no longer self-hosted. Earlier API-host checks were misidentified as self-hosted verification and are superseded by connected project/schema checks.

The redesigned website and Founding Circle campaign launch together. The app and marketplace remain pre-launch. Consumer enrollment leads; designers and makers have supporting paths. The existing Patina Strata is retained. No launch date or event is assigned.

## Route migration

Source-level map at handoff; verify actual responses and navigation in the release candidate.

| Route | Intended release behavior |
| --- | --- |
| `/` | Living Study opening, connected founder story, prominent Founding Circle invitation |
| `/founding` | Membership benefits, 200-member program cap, working enrollment |
| `/about` | Four connected chapters: Leah, Kody, Patina, and the reader; real Middle West Studio photography and a scroll-led room study |
| `/designers` | Founding 50 invitation and application path |
| `/makers`, `/makers/apply` | Workshop journey, founding 15 partnership, mutual expectations, and existing application flow |
| `/app` | Honest pre-launch product direction; Founding Circle CTA |
| `/services` | Path to a design conversation; do not imply live app access or a confirmed matching service beyond what is available |
| `/materials` | Paused; temporary redirect to `/makers`, removed from navigation, search suggestions, and sitemap. Prior page archived in the design proposal |
| `/furniture`, `/furniture/[slug]` | Permanent redirect directly to `/makers`; no launch catalog or product-purchase pages |
| `/waitlist` | Existing redirect to `/founding` |
| `/signup` | Retained compatibility signup with its optional phone and SMS consent flow; uses the new typography, navigation, and footer |
| `/journal`, `/journal/[slug]` | Retained editorial destinations; publish only factual, approved content |
| `/press` | Press background and [downloadable fact sheet](../../../public/press/patina-fact-sheet.txt); keep an undated draft release out of public announcements |
| `/contact`, `/careers`, `/privacy`, `/terms` | Retained practical routes; verify current copy, working actions, and pre-launch consistency |
| `/studio` and content service endpoints | Preserve existing editorial access and configuration; these are not campaign destinations |

Preserve `/api/founding`, `/api/designers-apply`, `/api/makers-apply`, `/api/contact`, newsletter confirmation, attribution, and consent-aware identity flows. Verify legacy query parameters survive the actual redirect chain. Keep retired catalog routes out of the sitemap and ensure canonical URLs point to `patina.cloud`.

## Assets and later photography

The production assets `room.jpg`, `chair.png`, `materials.jpg`, and `workbench.jpg` are generated studies. Their [provenance register](../../../public/images/studio/README.md) maps each to the retained proposal notes and a future photographic replacement. The public caption is now “Illustrative imagery — awaiting partner photography.” Real Middle West Studio photography keeps its original credits. The room-to-workbench motion does not establish a real product’s provenance.

Follow the [photography shot list](../../../design-proposals/living-study/PHOTOGRAPHY-SHOT-LIST.md) when documentary images arrive. Record subjects, permission, credits, and real relationships before swapping them in. Recheck responsive crops and scene transitions, and update captions asset by asset. Leah’s portrait and five photographs of her work now appear on Our Story and Makers, with the user’s authorization. The [founder image register](../../../public/images/founders/README.md) records the original public URLs, project names, and photographer credits. These are Middle West Studio projects, not Patina listings or partner evidence. Kody’s perspective is represented through his verified writing; no stand-in portrait is used.

Local Libre Caslon Display and Manrope fonts now have official Google Fonts OFL notices in [public/fonts](../../../public/fonts/README.md). No font binary was changed by the license work.

## Configuration presence

Presence-only local check on 9 September 2026: the current process plus `.env` and `.env.local` were inspected without printing any values. A present entry has a nonempty value; that does not establish that a credential is valid, correctly scoped, or configured in the deployment environment. No service request was made by this check.

| Configuration group | Local presence result | Release verification |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Present | Canonical production origin is correct |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | Present | Intended published content is used |
| `SANITY_API_READ_TOKEN`, `SANITY_WEBHOOK_SECRET`, `SANITY_PREVIEW_SECRET` | Present | Server-only configuration and intended editorial flows |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Present | Correct project, consent behavior, and no unintended development traffic |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Present; hosted project and credential verified on 10 September | Production uses `https://bkvcixdmuyejfzcijpdg.supabase.co`; direct authenticated hosted HEAD and the live production count returned 200 |
| `RESEND_API_KEY` | Recovered from the existing Vercel configuration on 10 September | Configured on Cloudflare; verified sending domain; actual receipt still pending |

Do not copy credentials into this document, screenshots, source control, analytics properties, or handoff messages. Read-only Cloudflare checks on 10 September confirmed access to the account and active `patina.cloud` zone. The subsequent authorized deployment created the Worker and R2 cache and installed the email, Supabase, and Sanity secrets. The confirmed Supabase credential belongs to the hosted Strata project. The corrected configuration calls that hosted URL directly and removes the temporary `PATINA_API` adapter/binding; the existing API Worker remains untouched. Authenticated before/after DNS inventories and domain-attachment records are retained locally. Cutover replaced only the two website A records with Cloudflare-managed custom-domain records; all 30 unrelated records are unchanged. The original origin/routes remain recorded for rollback. The final remote settings audit confirms both domains route to `patina-website`, all four existing Worker routes are unchanged, the hosted Strata URL and five secrets are configured, and the temporary API binding is absent. The ignored `.wrangler/production-final-configuration.json` snapshot records the audit. Local presence alone is not proof of production configuration.

## Implemented and verified in development

- Homepage rebuilt as production Next.js components, using optimized local images and licensed local fonts. The scrolling room → study → making opening retains manual scene selection, reverse scrolling, and material exploration.
- Founder passages, five original membership benefits, invitation letter, dedicated enrollment page, designer/maker recruitment, editorial routes, shared navigation/footer, and press page are implemented.
- The actual StrataMark component is retained in navigation, editorial pages, and enrollment. OG/icon artwork follows its existing proportions.
- The native enrollment dialog preserves attribution and identity, traps and restores keyboard focus, and uses the shared motion preference. Nonfunctional social signup buttons were removed.
- Studio tracking sources now infer consumer intent; explicit designer/maker intent still takes precedence. Both flat and legacy nested UTM fields are sent. First names reach the existing welcome-email personalization.
- Existing application, contact, newsletter, and SMS submission systems remain. Automated tests intercept mutations; no real applicant, subscriber, or contact data was submitted.
- Desktop and phone visual reviews now include the homepage, supporting pages, and enrollment dialog. With the browser extension unavailable, screenshots from the project’s installed Playwright browser were inspected directly. The 10 September revision adds independent visual review of Makers and Our Story at desktop and phone sizes.
- Automated checks cover 320px and 390px layouts, keyboard behavior, scene progression/reversal, motion pause/resume, device reduced motion, and a readable no-JavaScript path with email contact.
- Source-level and endpoint checks confirm a temporary Materials redirect, permanent furniture redirects, preserved campaign parameters, and a sitemap without retired discovery pages. The generated OG and Strata icon return successfully.
- About, App, Designers, Makers, Services, and Contact use the reviewed launch copy directly. Journal articles and Careers listings retain their real CMS content paths. Future editorial changes to fixed launch copy require a code change or an explicit CMS integration.

## Validation record

Verified on 10 September 2026, including the Cloudflare preparation pass:

- `npm run build:cloudflare` — passed using Next.js 16.3.4, React 19.3.0, and OpenNext 1.20.6; TypeScript, 38 generated pages, and the Workers bundle completed.
- `npx wrangler deploy --dry-run --outdir .wrangler/deploy-check` — passed without uploading or creating resources. The bundle is approximately 24 MiB uncompressed.
- `npm run lint` — passed with 10 existing warnings; no lint errors.
- `npm run test:server` — 28 server/build checks passed after removing the four temporary API-adapter tests, covering saved responses, missing configuration, completion of background email/analytics callbacks, and removal/detection of private credentials in build artifacts.
- All 131 Chromium Playwright checks passed in one run against the final Workers artifact. Earlier test fixes used the configured preview URL and waited for hydration before keyboard input. Coverage includes desktop/phone layouts, all story and maker chapters, scrolling, keyboard controls, reduced motion, and a no-JavaScript path.
- Worker responses returned the intended Materials/catalog redirects with retained campaign parameters, canonical production URLs, security headers, social image, robots, and sitemap. The build wrapper removes OpenNext’s compiled private environment defaults and fails if known credential values remain in generated JavaScript, JSON, HTML, text, or source maps. The latest artifact scan passed across 1,416 files and seven private values. A separate Wrangler bundle and source-map scan passed in the preceding validation pass; runtime secrets are configured as Worker bindings.
- Public imagery labels were updated across the active site. Real photography retains its source credits.
- Updated dependencies and targeted overrides remove known high/critical audit findings. Six moderate findings remain in the Sanity CLI dependency chain, rooted in the unpatched `adm-zip` symlink-extraction advisory; see the hosting runbook. Third-party Sanity bundle duplicate-key warnings remain nonfatal.
- All 31 production Playwright checks passed in one minute after cutover, covering studio launch, motion, and polish with form submissions blocked or mocked. All 15 production HTTP checks passed, including the direct hosted count, optimized image, social image, sitemap/robots, custom 404, and legacy redirects with preserved queries. The homepage and `www` redirect have valid TLS; canonical and DENY/nosniff headers are correct. The cutover upload reported 48 ms startup. The earlier Careers webhook/cache check also passed.
- A subsequent contact-route fix now verifies the founder-notification fallback before reporting success when the database insert fails. If both fail, it returns retryable 503 without sending an auto-reply or capturing success analytics. Three regression checks failed against the old implementation and now pass. The fix was rebuilt and deployed successfully. The final `/contact` page and Founding Circle count returned 200, and the focused remote contact-recovery test passed 1/1 in 1.7 seconds with mocked submissions. `git diff --check` passed. The deployment record identifies the active code.
- Automated browser submissions were intercepted or blocked. Separately, the applied Strata contact migration passed schema/RLS/grant verification, direct REST HEAD, and a service-role INSERT/SELECT assertion inside a rolled-back transaction. No test record remained. These results do not establish live form enrollment, mail delivery, or production CPU behavior under traffic.

The preparation pass made no external changes. The subsequent authorized deployment created the Worker, cache, and runtime secrets, applied the contact migration, and completed the apex/`www` cutover as recorded in [DEPLOYMENT-RECORD.md](DEPLOYMENT-RECORD.md). This work did not create a commit, perform an end-to-end signup or email send, distribute a campaign, contact the press, or enable automatic Git deployment.

## Signup emails from Kody

The deployed signup emails now come from **Kody at Patina <hello@patina.cloud>**, signed by Kody, with replies to the existing Patina mailbox. Founding members receive his personal first letter. Designer and maker acknowledgements explain that Kody reviews with Leah. The public signup and application copy matches this direction.

[Review the three rendered emails](email-review/index.html). The templates were checked with intercepted Resend payloads and visually reviewed. The update passed the production build, 28 server checks, scoped lint, five live page/copy checks, and all 24 selected browser checks across the initial run and one corrected-locator rerun. No test email was sent. The deployment record identifies the current version.

## Known release dependencies

1. **Membership capacity:** the inherited backend accepts unlimited waitlist rows and does not enforce 200 founding memberships. Its count endpoint counts all waitlist rows; query failures now return retryable 503. The redesigned UI therefore shows only the published cap, without a live remaining-spots claim. Kody has been asked whether subsequent interest should become a launch waitlist, enrollment should close, or membership should use personal selection. No behavior has been assumed or deployed while that answer is pending.
2. **Backend and welcome mail:** Resend and the hosted Strata credential are verified. The sending domain and direct hosted database reads pass. The [contact migration](../../../supabase/migrations/20260910152111_create_contact_messages.sql) was applied to hosted Strata as `20260910152111_create_contact_messages`. RLS, service-only access, REST HEAD, and a rolled-back service-role INSERT/SELECT all passed. No test record remained. The live production count returned 200 through the corrected hosted connection; no self-hosted management access is needed. Verify persistence and actual welcome/confirmation/application/contact mail with an approved test recipient. No email test has been approved or sent. An API success response does not establish inbox delivery.
3. **Operational benefits:** assign ownership of monthly questions and decide how members choose whether they receive public named recognition.
4. **Target browser review:** Chromium desktop/phone screenshots and interactions have been reviewed. Confirm the release candidate on actual Safari/iOS and Android devices before deployment.
5. **Production operation:** the apex and `www` cutover, public TLS/redirect verification, and all 31 browser/15 HTTP checks are complete. Canonical URLs use `https://patina.cloud`. The results and active version are in the deployment record. Keep the old Vercel deployment and local DNS/domain snapshots for rollback. Detach only the two recorded custom domains before restoring their original A records; do not edit Cloudflare-managed placeholder records. Reconcile Wrangler routes before a subsequent deploy. Automatic Git deployments remain disabled.

## Manual release verification

- Review the complete desktop and phone journeys: opening scene progression and reversal, manual controls, material selection, navigation, founder passage, and persistent joining paths. Confirm the Strata’s approved form.
- Complete keyboard-only and reduced-motion journeys. Check focus visibility, menu/modal focus return, readable static content, responsive layouts, and prompt CTA feedback.
- Confirm every primary join action reaches the real enrollment flow. Check valid submission, duplicate submission, validation/server failure, and return-to-page behavior using controlled test data in the intended test environment.
- Verify the welcome email and reply path, newsletter double opt-in and unsubscribe, designer/maker applications, and contact delivery. Use approved test recipients; a code path or queued send is not proof of inbox delivery.
- Confirm the 200-member cap’s real admission behavior, public recognition by choice, and ownership of monthly questions. Keep live copy and emails aligned with the actual member experience.
- Check consent accepted and declined, Do Not Track, retained attribution, and exclusion of private form content from analytics. Essential enrollment must remain functional without analytics consent.
- Follow old furniture, waitlist, signup, and journal links. Review sitemap, canonical metadata, social preview, missing-page behavior, and the press download.
- Review generated-image captions and all retained content for invented partner, availability, testimonial, purchase, or app-download claims.
- Record build/lint/test outcomes, browser coverage, known limitations, deployment configuration confirmation, and rollback reference in the main release record. Do not treat this checklist as evidence that any item has run.

Deployment and external campaign distribution are separate from preparation. Use the [launch sequence](launch-sequence.md) after the release candidate is reviewed and the relevant action is authorized.
