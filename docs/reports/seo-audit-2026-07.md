# Patina SEO Audit — July 2026

**Audit date:** 2026-07-01
**Site audited:** https://patina.cloud
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** `docs/reports/seo-audit-2026-06.md`

---

## Executive Summary

- **The pipeline is unblocked. Three of June's four critical findings are resolved.** The working tree is clean, there are three commits since May 1 (latest `0873ff2`, 2026-06-23), and the live site reflects them. The literal-newline URL corruption is **gone** — `og:url` now reads a clean `https://patina-website.vercel.app` instead of `...app\n`. The `src/lib/site-url.ts` `.trim()` defense shipped and works, and deployment cadence is restored (June's "no deploy in 30+ days" is fixed).
- **But the single wrong env var is now three months old.** Live `og:url`, default `og:image`, and every `twitter:image` still resolve to `patina-website.vercel.app`, not `patina.cloud`. Root cause is one Vercel environment variable: `NEXT_PUBLIC_SITE_URL` is still set to the vercel.app host. Because `site-url.ts` now *defaults* to `https://patina.cloud`, the fix is smaller than ever — correct or delete that one variable and redeploy. No code change. This is the highest-leverage 5-minute action on the site, unresolved since May.
- **Title doubling is still live on every child page.** `/about` returns `<title>Our Story | Patina | Patina</title>`; `/furniture` returns `Furniture Collection | Patina | Patina`; journal posts return `... | Patina | Patina`. Flagged in June, still unfixed. Affects ~15 routes.
- **New finding: `og-image.jpg` and `logo.png` don't exist.** Every page references `/og-image.jpg` (OG + Twitter card) and the JSON-LD references `/logo.png` (Organization logo, Article `publisher.logo`), but neither file is in the repo. Result: broken social previews site-wide, and a 404 publisher logo that can suppress Article rich results. (June's report assumed these existed; they don't.)
- **Journal is frozen at 3 posts, all dated early April — now ~3 months without a new piece.** All three are Tier-2 build-narrative content. There is still **zero** Tier-1 (question-answering) and **zero** Tier-3 (reference/FAQ) content — the exact formats the visibility plan says AI systems cite. This is the largest sustained gap against plan.

Overall: **structurally the best month since this audit began** — the code is shipping again. The remaining work is now a short list of small, mechanical fixes (one env var, one title-suffix sweep, two image files, one canonical line) plus the long-standing content deficit.

---

## Top 3 Quick Wins (Kody — this week)

1. **Correct the one Vercel env var, then redeploy.** In Vercel → Project → Settings → Environment Variables, set `NEXT_PUBLIC_SITE_URL` to exactly `https://patina.cloud` (no trailing slash, no newline) — **or delete the variable entirely**, since `src/lib/site-url.ts:5` now defaults to `https://patina.cloud`. Redeploy. This fixes `og:url`, the default `og:image` host, `twitter:image`, `metadataBase`, and the dynamic `sitemap.xml`/`robots.txt` host in one shot. Verify afterward in Google Search Console (URL Inspection) or by viewing source on the homepage.

2. **Kill the `| Patina | Patina` title doubling.** The root template is `%s | Patina` (`src/lib/seo.ts:11`), so any page whose `title` string already ends in `| Patina` renders doubled. Strip the `| Patina` / `— Patina` suffix from every page-level title string (full file list below). Confirmed live-doubled today on `/about`, `/journal`, `/furniture`, and `/journal/why-were-building-patina`.

3. **Add `og-image.jpg` (1200×630) and `logo.png` to `/public`.** Both are referenced everywhere but return 404. Ship a branded OG card and a square logo (transparent PNG, ≥112×112 for the Article publisher logo). While in `seo.ts`, add the one-liner `alternates: { canonical: "./" }` to `defaultMetadata` so every page gets a self-referential canonical. These two moves restore social previews *and* unblock Article/Organization rich results.

---

## Quick Wins (full list — under ~2 hours each)

### 1. Fix the canonical/OG host via the Vercel env var (CRITICAL — carryover, 3rd month)
**Where:** Vercel project settings → Environment Variables (not code).
**Symptom (live):** Homepage `og:url: https://patina-website.vercel.app`; `/furniture` `og:url: https://patina-website.vercel.app`; every page's `twitter:image: https://patina-website.vercel.app/og-image.jpg`. Pages that hard-code their canonical (`/journal`, `/journal/[slug]`, `/designers`, `/founding`) correctly show `patina.cloud`, which is why the site is split-brained across two hosts.
**What changed since June:** The newline is gone — the value no longer contains `\n`. Only the host is still wrong.
**Fix:** Set `NEXT_PUBLIC_SITE_URL=https://patina.cloud` or delete the variable (code default is now correct). Redeploy.
**Impact:** Consolidates domain authority on `patina.cloud`; stops splitting signals with the vercel.app domain. Highest-leverage action on the site.

### 2. Strip `| Patina` from page-level titles (HIGH — carryover, confirmed live)
**Where:** ~15 route files (see File-Level table).
**Symptom (live):** `/about` → `Our Story | Patina | Patina`; `/furniture` → `Furniture Collection | Patina | Patina`; `/journal` → `The Designer's Eye — Journal | Patina | Patina`; `/journal/why-were-building-patina` → `Why We're Building Patina — The Designer's Eye | Patina | Patina`.
**Fix:** Remove the trailing `| Patina` (and `— Patina`) from each page's `title:` string; the root template appends the suffix. `/waitlist` (`title: "Join the Patina Waitlist"`) is the one page that already does this correctly — use it as the pattern.
**Impact:** Cleaner SERP titles across the whole site; better CTR. Every indexed child page currently shows the doubled suffix in Google.

### 3. Create `og-image.jpg` + `logo.png` (HIGH — NEW)
**Where:** `/public/og-image.jpg`, `/public/logo.png` (referenced in `src/lib/seo.ts:39,50,109,279`).
**Symptom:** Neither file exists in the repo (`public/` has only SVGs, `llms.txt`, `robots.txt`, `patina-design-system.css`, and `images/partners/*`). So:
- `og:image` / `twitter:image` → 404 → blank social previews on iMessage, LinkedIn, X, Slack, Facebook.
- Organization JSON-LD `logo` (`seo.ts:109`) → 404 → weakens knowledge-panel eligibility.
- Article JSON-LD `publisher.logo` (`seo.ts:277–280`) → 404 → Google requires a valid, crawlable publisher logo for Article rich results; a 404 can suppress them.
- `apple-touch-icon.png` (`seo.ts:65`) → 404 (minor). `favicon.ico` exists at `src/app/favicon.ico` (fine).
**Fix:** Export a 1200×630 branded OG card and a square transparent-PNG logo. Drop both in `/public`. No code change needed if filenames match the references.
**Impact:** Restores social sharing previews site-wide and unblocks Article/Organization rich results.

### 4. Add a default canonical to `defaultMetadata` (HIGH — carryover)
**Where:** `src/lib/seo.ts:7`.
**Symptom (live):** Homepage, `/about`, and `/furniture` render **no** `<link rel="canonical">`. Missing on `/`, `/about`, `/app`, `/services`, `/furniture`, `/furniture/[slug]`, `/makers`, `/makers/apply`, `/materials`, `/contact`, `/careers`, `/privacy`, `/terms`. Present on `/designers`, `/journal`, `/journal/[slug]`, `/founding`.
**Fix:** Add `alternates: { canonical: "./" }` to `defaultMetadata`. Next resolves it per-route against `metadataBase`; per-page canonicals still override. (Do #1 first so `metadataBase` is on the right host.)
**Impact:** Prevents duplicate-content risk from UTM-tagged and query-string URLs. One line covers ~13 pages.

### 5. Give child pages their own `twitter` card (MEDIUM — NEW)
**Where:** `src/lib/seo.ts:46–51` (default `twitter` block) + per-page metadata.
**Symptom (live):** On `/journal`, `/about`, and `/journal/why-were-building-patina`, the `twitter:title`, `twitter:description`, and `twitter:image` are the **homepage defaults**, not the page's own values — because those pages set `openGraph` but never override `twitter`, so Next falls back to `defaultMetadata.twitter`. X/Twitter shares of any inner page show "Patina | Complete Designer-Curated Rooms…" regardless of the page.
**Fix:** Either drop the hard-coded `title`/`description` from `defaultMetadata.twitter` (let X read from `og:` — simplest and fixes all pages at once), or add a per-page `twitter` block on the high-value routes.
**Impact:** Correct titles/descriptions on X shares of journal posts and hubs.

### 6. Journal `og:image` fallback (MEDIUM — carryover #11)
**Where:** `src/app/journal/[slug]/page.tsx:77`.
**Symptom (live):** `/journal/why-were-building-patina` has **no** `og:image` at all — the image is included only `...(post.coverImageUrl && …)`, and none of the 3 posts has a cover image. Facebook/LinkedIn shares of posts show nothing; X falls back to the (broken) default.
**Fix:** `images: [{ url: post.coverImageUrl || "/og-image.jpg" }]` (works once #3 ships).
**Impact:** Social CTR on post shares.

### 7. Remove the 6 fallback product slugs from the sitemap (HIGH — carryover, reframed)
**Where:** `src/app/sitemap.ts:11–18`, `:71–83`.
**Symptom (live):** `/furniture` renders "Showing 0 pieces — No pieces found." Sanity has **zero** products. When Sanity is empty the sitemap emits 6 `/furniture/{slug}` URLs (`noma-dining-chair`, `atelier-coffee-table`, `kyoto-platform-bed`, `archipelago-bookshelf`, `haven-lounge-chair`, `fjord-sideboard`). Those detail pages call `notFound()` (product null → 404). So the sitemap advertises 6 URLs that 404 — which Search Console flags as "Submitted URL not found (404)."
**Fix:** Remove the `fallbackProductSlugs` array and its two usages, **or** populate Sanity with the 6 pieces (they exist in brand copy). Until there are real products, the sitemap should not list product detail URLs.
**Impact:** Stops GSC 404 errors and wasted crawl budget. (Note: this is different from June's "returns 200" claim — current source correctly 404s the page; the problem is now the sitemap listing, not the status code.)

### 8. Reconcile `/furniture` priority vs. its actual state (MEDIUM — NEW angle)
**Where:** `src/app/sitemap.ts:38`.
**Symptom:** `/furniture` is `priority: 0.9, changeFrequency: "daily"` — the second-highest-priority page — yet it's an empty "0 pieces" catalog, is **not** in the main nav or homepage footer, and is linked only from one `/about` CTA. High crawl priority pointed at a thin, near-orphaned page.
**Fix:** Until the catalog has products, drop `/furniture` to `priority: 0.5, changeFrequency: "monthly"`, or `noindex` the empty state. Re-elevate when Sanity is populated.
**Impact:** Avoids signaling a thin page as the site's most important, and avoids a thin-content impression.

### 9. Delete `public/robots.txt` (carryover)
**Where:** `public/robots.txt` and `src/app/robots.ts` both exist.
**Symptom:** The static file hard-codes the correct `Sitemap: https://patina.cloud/sitemap.xml`; the dynamic `robots.ts` emits `${SITE_URL}/sitemap.xml`, which is currently the wrong host (env-derived). They will drift, and the two disallow lists already differ (static blocks `*?*sort=`/`*?*filter=`; dynamic blocks `/studio/`, `/api/`, `/_next/`).
**Fix:** Delete `public/robots.txt`; make `app/robots.ts` the single source of truth (correct once #1 ships). Fold the useful `?sort=`/`?filter=` disallows into `robots.ts`.
**Impact:** Removes ambiguity and future drift. (Couldn't fetch live `/robots.txt` this run — provenance limit — so verify which one wins after deploy.)

### 10. Strengthen the homepage `<title>` + keyword list (LOW — carryover)
**Where:** `src/lib/seo.ts:10`, `:14–26`.
**Symptom:** Title `Patina | Complete Designer-Curated Rooms | Where Time Adds Value` (62 chars, slightly long, no `app`/`AR`/`room scan`). Keyword list omits the plan's target terms.
**Fix:** Test `Patina — Designer-Curated Furniture & AR Room-Scanning App` (~57 chars). Append to `keywords`: `"designer-taught"`, `"room scanning furniture app"`, `"alternatives to Havenly"`, `"alternatives to Wayfair"`, `"Madison Wisconsin furniture"`.
**Impact:** Marginal but free (Bing + some AI crawlers still parse keywords; title affects CTR).

### 11. Descriptive alt-text pass (LOW — carryover #14)
**Where:** homepage + `/about` hero images.
**Symptom (live):** `alt="Living space with natural materials and warm light"`, `alt="Aged furniture in morning light showing beautiful patina"` — exactly the generic style the visibility plan §1.4 says to replace. Hero images are also hot-linked from `images.unsplash.com` (not owned assets).
**Fix:** Rewrite to keyword-rich, specific alts; longer-term, self-host hero imagery so it can double as OG/journal cover images.
**Impact:** Image search + AI extraction.

---

## Strategic Investments (this quarter)

### A. Break the journal freeze — publish Tier-1 content (carryover — now ~3 months stalled)
Live `/journal` still shows **3 posts**, all dated April 3–7, 2026 (`why-were-building-patina`, `designer-as-intelligence-layer`, `what-we-look-for-founding-maker`). All three are Tier-2 build narrative. There is **zero** Tier-1 (question-answering) and **zero** Tier-3 (reference/FAQ) content — the formats the visibility plan §2.1 says AI systems actually cite. Plan cadence was 2–4/month from April; the site is now ~6–10 posts behind.

**Action:** Ship the four highest-citation Tier-1 titles from the plan:
- "How to Tell If Furniture Will Last 20 Years"
- "What AR Room Scanning Actually Tells You About Your Space"
- "How Designers Choose Furniture for Clients (The Real Process)"
- "The Real Difference Between $800 and $3,000 Furniture"

**Effort:** 3–4 hours each (Leah voice notes → draft → Kody edit).
**Impact:** Highest of anything in this report. Every post is a new AI-citation surface; three stalled months are three months of lost compounding authority.

### B. Add the missing schema helpers: `FAQPage`, `ItemList`, `CollectionPage` (carryover)
No `FAQPage`, `ItemList`, or `CollectionPage` schema exists anywhere. `/furniture`, `/materials`, `/makers`, and `/journal` are all collection pages emitting none. Build `generateFaqJsonLd()`, `generateItemListJsonLd()`, and `generateCollectionPageJsonLd()` in `src/lib/seo.ts`, then wire them in. FAQ schema is heavily weighted in AI extraction and unlocks rich snippets; pair it with the first Tier-3 reference piece ("Furniture Care Guide," "10 Materials That Age Beautifully").
**Effort:** Half day for helpers + first application.
**Impact:** High.

### C. Build the journal category hub-and-spoke (carryover)
`src/app/journal/page.tsx:39–44` defines four categories (`building-patina`, `design-thinking`, `maker-stories`, `material-deep-dives`) with labels, but there is still no `/journal/category/[slug]` route. Each category deserves a landing page with intro copy, links to all posts in it, and `CollectionPage` schema.
**Effort:** ~1 day for the route + 4 intros.
**Impact:** High — internal linking + topic clusters + reader navigation.

### D. `JobPosting` schema on `/careers` (NEW opportunity)
`/careers` lists five named roles (Senior Product Designer, Full-Stack Engineer, Design Services Lead, Maker Relations Manager, Content Producer) with descriptions — but no structured data. Wrapping each in `JobPosting` schema makes them eligible for the Google Jobs experience, a free traffic + entity surface most pre-launch startups ignore.
**Effort:** ~3 hours (helper + render).
**Impact:** Medium — new query surface ("furniture startup jobs Madison," role titles) and an entity-graph signal.

### E. Comparison surface — `/compare` or `/journal/havenly-alternatives` (carryover, still valid)
July search confirms "best AR/room-scanning furniture app 2026" and "Havenly alternatives" are owned by third-party roundups (Remodel AI, DesignFiles, First Chair, GlaMar, 92interiors) listing Houzz, Hutch, Magicplan, Planner 5D, HomeStyler, AI Smart Decor. **Patina appears in none of them and has no on-site surface targeting these queries.** A comparison page positioning Patina's designer-curation + room-scan + handoff model against Havenly/Wayfair/Houzz captures switching intent and gives AI a citable Patina source for "alternatives to X."
**Effort:** ~1 day for first post; ~2 for a structured `/compare` route with `Service` + `FAQPage` schema.
**Impact:** High.

### F. Designer & maker profile routes — `/designers/[slug]`, `/makers/[slug]` (carryover)
Houzz owns "[name] interior designer" queries because every Pro has an indexable profile. Once the Founding 50 and founding makers are named, Sanity schema + dynamic routes + `Person`/`Organization` schema create dozens of indexable entity-graph entries feeding both branded queries and the entity graph LLMs cite.
**Effort:** ~3 days per route + first profiles.
**Impact:** High.

### G. Connect an SEO data source — GSC + Ahrefs/Semrush (carryover — still blocking measurement)
This audit still cannot report real keyword rankings, impressions, search volume, difficulty, or backlinks. Every "target keyword ranking" ask in the task is unanswerable without it. Connect Google Search Console (free — submit the sitemap the moment #1 ships) and Ahrefs/Semrush (~$99/mo, budgeted in the visibility plan §5). Exposing GSC via MCP would let next month's report quantify movement instead of describing structure.
**Effort:** GSC ~30 min; Ahrefs subscription + MCP ~2 hours.
**Impact:** Massive for measurement.

### H. Install the `marketing:seo-audit` skill (carryover — setup)
The scheduled task calls for the `marketing:seo-audit` skill, which is still **not installed** in this environment. This run reproduced the methodology manually. If the skill is meant to drive these audits, installing it is a one-time setup task.
**Impact:** Consistency + reduced run variance.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | Serves over HTTPS |
| URL newline corruption | ✅ **Fixed** | `og:url` now clean (`https://patina-website.vercel.app`, no `\n`) — `site-url.ts` `.trim()` shipped |
| Deployment recency | ✅ **Fixed** | Live HTML reflects commits through 2026-06-23; June's 30-day stall resolved |
| Local code committed | ✅ **Fixed** | `git status` clean (only `.claude/*` local files untracked) |
| Canonical hostname | ❌ Fail | Env-derived URLs still `patina-website.vercel.app` (og:url, default og:image, all twitter:image). One Vercel env var |
| `<link rel="canonical">` on key pages | ❌ Fail | Missing on `/`, `/about`, `/app`, `/services`, `/furniture`, `/furniture/[slug]`, `/makers`, `/makers/apply`, `/materials`, `/contact`, `/careers`, `/privacy`, `/terms`. Present on `/designers`, `/journal`, `/journal/[slug]`, `/founding` |
| Title template doubling | ❌ Fail | Live: `/about` → `Our Story \| Patina \| Patina`; `/furniture`, `/journal`, journal posts all doubled |
| `og:image` asset exists | ❌ Fail (NEW) | `/public/og-image.jpg` returns 404 — file absent from repo |
| Organization `logo` asset | ❌ Fail (NEW) | `/public/logo.png` absent → JSON-LD `logo` 404 |
| Article `publisher.logo` asset | ❌ Fail (NEW) | Same `/logo.png` 404 → can suppress Article rich results |
| `favicon.ico` | ✅ Pass | Present at `src/app/favicon.ico` |
| `apple-touch-icon.png` | ⚠️ Warning | Referenced (`seo.ts:65`) but absent (minor) |
| Twitter card per-page | ❌ Fail (NEW) | Child pages inherit homepage `twitter:title/description/image` |
| AI crawler allowlist | ✅ Pass | 7 user agents allowed in `robots.ts` |
| `llms.txt` present | ✅ Pass | `/public/llms.txt` shipped |
| Organization JSON-LD | ⚠️ Warning | Present (layout), but `url` on wrong host + `logo` 404 |
| WebSite JSON-LD + SearchAction | ⚠️ Warning | Present; `url` host wrong |
| SoftwareApplication on `/app` | ✅ Pass | `generateSoftwareApplicationJsonLd()` rendered |
| Service schema on `/services` | ✅ Pass | Rendered |
| AboutPage schema on `/about` | ✅ Pass | Rendered |
| Article JSON-LD on journal posts | ⚠️ Warning | Rendered; `publisher.logo` 404 (see above) |
| BreadcrumbList on detail pages | ✅ Pass | `/journal/[slug]` and `/furniture/[slug]` |
| BreadcrumbList on hub pages | ❌ Fail | `/about`, `/services`, `/designers`, `/makers`, `/founding` — none |
| Product JSON-LD on `/furniture/[slug]` | ⚠️ N/A | Helper correct, but Sanity empty → no products to render |
| FAQ / HowTo / JobPosting schema | ❌ Fail | None anywhere (`/careers` is a strong `JobPosting` candidate) |
| ItemList / CollectionPage on catalogs | ❌ Fail | `/furniture`, `/materials`, `/makers`, `/journal` all missing |
| Sitemap lists only valid URLs | ❌ Fail | 6 fallback `/furniture/{slug}` URLs 404 while Sanity empty |
| Sitemap `lastmod` accuracy | ⚠️ Warning | Static routes use build-time `now` (`sitemap.ts:37–50`) |
| `public/robots.txt` vs `app/robots.ts` | ⚠️ Warning | Both present; hosts/disallow lists differ (couldn't fetch live this run) |
| Static `<title>` 50–60 chars | ⚠️ Warning | Homepage 62; doubling makes several longer |
| `<meta description>` present | ✅ Pass | Per-page descriptions present and in range |
| `/waitlist` redirect | ✅ Pass | 308 → `/founding` (`next.config.ts`); note `/waitlist/page.tsx` is now dead code behind the redirect |
| Mobile-friendly | ✅ Pass | Tailwind responsive utilities throughout |

---

## On-Page Issues Table

| Page | Issue | Severity | Fix |
|---|---|---|---|
| Env-derived URLs (all pages) | `og:url` / default `og:image` / `twitter:image` host = `patina-website.vercel.app` | **Critical** | Set/delete `NEXT_PUBLIC_SITE_URL` in Vercel; redeploy |
| All child pages | `<title>` doubled: `… \| Patina \| Patina` | **High** | Strip `\| Patina` suffix from page titles |
| Site-wide | `og-image.jpg` + `logo.png` 404 | **High** (new) | Add both files to `/public` |
| `/` and 12 others | No `<link rel="canonical">` | High | `alternates: { canonical: "./" }` in `defaultMetadata` |
| All child pages | Twitter card = homepage defaults | Medium (new) | Remove hard-coded `title`/`desc` from default `twitter` block |
| `/journal/[slug]` | No `og:image` when `coverImageUrl` empty | Medium | Default to `/og-image.jpg` |
| `/furniture` | Empty catalog, `priority 0.9/daily`, near-orphaned | Medium | Lower sitemap priority or `noindex` empty state |
| `/furniture/[slug]` (6 fallback slugs) | Listed in sitemap but 404 | High | Remove fallback array or populate Sanity |
| `/app` | No canonical, no `og:url`/`og:image` override, title doubled | High | Add `alternates.canonical`, `openGraph.url`+`images`; strip title suffix |
| `/services` | No canonical, no breadcrumb, title doubled | Medium | Add canonical + `BreadcrumbList`; strip suffix |
| `/about` | No canonical, no breadcrumb, title doubled | Medium | Add canonical + `BreadcrumbList`; strip suffix |
| `/makers`, `/materials` | No canonical, no `ItemList`, title doubled | Medium | Add canonical + `ItemList`; strip suffix |
| `/careers` | No `JobPosting` schema (5 roles), title doubled | Medium | Add `JobPosting` per role; strip suffix |
| `/contact`, `/makers/apply`, `/privacy`, `/terms` | No canonical, title doubled | Low–Med | Add canonical; strip suffix |
| Homepage `<title>` | 62 chars; no `app`/`AR`/`room scan` | Low | Test shorter, term-rich title |
| Hero images | Generic alt text; hot-linked from Unsplash | Low | Rewrite alts; self-host imagery |

---

## Content Gap Recommendations

July search of "best AR / room-scanning furniture apps 2026" and "Havenly alternatives" confirms the landscape is unchanged: third-party roundups (Remodel AI, DesignFiles, First Chair, GlaMar, 92interiors) own these queries, listing Houzz, Hutch, Magicplan, Planner 5D, HomeStyler, RoomSketcher, and AI Smart Decor. **Patina appears in none, and has no on-site content targeting any of it.** All three existing journal posts are brand narrative; none map to an informational or commercial query.

| Topic / Keyword | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| "What AR room scanning actually tells you about your space" | Direct product relevance; positions Patina in the category the roundups rank for | Tier-1 + Article schema | High | 3–4h |
| "How to tell if furniture will last 20 years" | High-intent informational; Leah's sourcing expertise | Tier-1 + FAQPage | High | 3–4h |
| "Alternatives to Havenly / Wayfair / Houzz" | Switching intent; competitors rank heavily now; AI-citable | `/compare` route or journal post + Service/FAQ schema | High | 1 day |
| "How designers choose furniture for clients" | Positions the Aesthete Engine methodology | Tier-1 | High | 3–4h |
| Designer/maker profiles (`/designers/[slug]`, `/makers/[slug]`) | Houzz owns this format; each profile is an indexable entity | Sanity schema + dynamic route + Person/Organization schema | High | 3 days |
| "Furniture care guide: wood, leather, linen, stone" | Reference content; featured-snippet + FAQ | Tier-3 + FAQPage | Medium | 4h |
| "Interior design styles explained" | Evergreen taxonomy; link magnet | Tier-3 + DefinedTerm | Medium | 1 day |
| "Madison, WI furniture / interior design" | Pairs with Google Business Profile (plan §3.1) | Local page + LocalBusiness schema | Medium | 4h |

---

## Month-over-Month Delta

| Metric | June 1, 2026 | July 1, 2026 | Direction |
|---|---|---|---|
| Uncommitted SEO work | 5 modified + 1 untracked | Clean tree | ✅ **Resolved** |
| Last production deploy | 2026-04-28 (stale) | ≥ 2026-06-23 (live reflects it) | ✅ **Resolved** |
| URL newline corruption | Yes (`…app\n`) | No (clean) | ✅ **Resolved** |
| Canonical hostname | `patina-website.vercel.app` | `patina-website.vercel.app` | ❌ No change (env var) |
| Title template doubling | Fail (new) | Fail | ❌ No change |
| `og-image.jpg` / `logo.png` present | Assumed present | Confirmed **absent** | ❌ Newly surfaced |
| Twitter card per-page | (not assessed) | Fail — homepage defaults | ❌ Newly surfaced |
| Journal post count | 3 | 3 (all early April) | ❌ No change (plan: +6–10) |
| Pages with canonical | 5 | 4 live-confirmed (+`/waitlist` dead route) | ~ Flat |
| FAQPage / ItemList / CollectionPage schema | 0 | 0 | ❌ No change |
| BreadcrumbList on hubs | 0 | 0 | ❌ No change |
| Sanity products | 0 | 0 (`/furniture` shows "0 pieces") | ❌ No change |
| AI-crawler allowlist | 7 UA | 7 UA | Flat |

**Net:** The delivery pipeline that blocked everything in May–June is fixed — three criticals cleared. What remains is a short, mechanical punch list (one env var, one title sweep, two image files, one canonical line, sitemap hygiene) plus the unmoved content deficit. The single wrong env var is now the oldest open item on the site.

---

## File-Level Recommendations

| File | Line | Change |
|---|---|---|
| **Vercel env settings** | — | `NEXT_PUBLIC_SITE_URL` → `https://patina.cloud` (or delete; code default is correct). Redeploy. **Highest-leverage action.** |
| `public/og-image.jpg` | (new) | Add 1200×630 branded OG card |
| `public/logo.png` | (new) | Add square transparent-PNG logo (≥112×112) |
| `src/lib/seo.ts` | 7 | Add `alternates: { canonical: "./" }` to `defaultMetadata` |
| `src/lib/seo.ts` | 10 | Test shorter, term-rich homepage title |
| `src/lib/seo.ts` | 14–26 | Append target keywords (`designer-taught`, `room scanning furniture app`, `alternatives to Havenly/Wayfair`, `Madison Wisconsin furniture`) |
| `src/lib/seo.ts` | 46–51 | Remove hard-coded `title`/`description` from default `twitter` block (let X read `og:`) |
| `src/lib/seo.ts` | (new) | Add `generateFaqJsonLd()`, `generateItemListJsonLd()`, `generateCollectionPageJsonLd()`, `generateJobPostingJsonLd()` |
| `src/app/sitemap.ts` | 11–18, 71–83 | Remove `fallbackProductSlugs` (or populate Sanity) |
| `src/app/sitemap.ts` | 38 | Lower `/furniture` priority/frequency until catalog has products |
| `src/app/sitemap.ts` | 37–50 | Replace `lastModified: now` with real per-route dates |
| `src/app/robots.ts` | — | Add `?sort=`/`?filter=` disallows; keep as sole source of truth |
| `public/robots.txt` | — | Delete |
| `src/app/journal/[slug]/page.tsx` | 68, 71 | Strip `\| Patina` from titles |
| `src/app/journal/[slug]/page.tsx` | 77 | Always include `images` with `/og-image.jpg` fallback |
| `src/app/journal/page.tsx` | 12 | Strip `\| Patina`; add `CollectionPage`/`ItemList` |
| `src/app/furniture/page.tsx` | 11 | Strip `\| Patina`; add `alternates.canonical` + `ItemList` |
| `src/app/furniture/[slug]/page.tsx` | 34, 39 | Strip `\| Patina` from both title strings |
| `src/app/about/page.tsx` | 19 | Strip `\| Patina`; add `alternates.canonical` + `BreadcrumbList` |
| `src/app/app/page.tsx` | 17 | Strip `\| Patina`; add `alternates.canonical`, `openGraph.url`+`images` |
| `src/app/services/page.tsx` | 11 | Strip `\| Patina`; add `alternates.canonical` + `BreadcrumbList` |
| `src/app/designers/page.tsx` | 8 | Strip `\| Patina` (page already has canonical) |
| `src/app/founding/page.tsx` | 8 | Strip `— Patina` suffix |
| `src/app/makers/page.tsx` | 11 | Strip `\| Patina`; add `alternates.canonical` + `ItemList` |
| `src/app/makers/apply/page.tsx` | 8 | Strip `\| Patina`; add `alternates.canonical` |
| `src/app/materials/page.tsx` | 11 | Strip `\| Patina`; add `alternates.canonical` + `ItemList` |
| `src/app/careers/page.tsx` | 10 | Strip `\| Patina`; add `alternates.canonical` + `JobPosting` schema |
| `src/app/contact/page.tsx` | 8 | Strip `\| Patina`; add `alternates.canonical` |
| `src/app/privacy/page.tsx` | 7 | Strip `\| Patina` |
| `src/app/terms/page.tsx` | 7 | Strip `\| Patina` |

---

## Notes & Constraints

- **`marketing:seo-audit` skill not installed.** Same as June — the scheduled task references it, but it isn't available in this environment. This run reproduced the methodology manually (source audit, live meta/OG/title/canonical extraction via WebFetch, competitive search, MoM comparison). Installing the skill is a setup item (Strategic H).
- **No SEO tool connected.** Real keyword rankings, impressions, volumes, difficulty, and backlinks remain unavailable. The task's "keyword rankings for target terms" cannot be quantified without GSC/Ahrefs (Strategic G).
- **Live-fetch limits this run.** WebFetch is scoped to URLs in the provenance set, so `sitemap.xml`, `robots.txt`, and individual `/furniture/[slug]` detail pages could not be fetched directly. Their host/status behavior is inferred from source; verify post-deploy via Search Console. JSON-LD `<script>` blocks aren't surfaced by WebFetch, so schema was validated from `src/lib/seo.ts` generators and their render sites, not scraped from live HTML. Re-run [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org) once the host fix and `logo.png` ship.
- **Pages verified live this run:** `/` (homepage), `/journal`, `/about`, `/journal/why-were-building-patina`, `/furniture`.
- **No code changes were made.** Per task instructions, this report only identifies changes; Kody triggers implementation separately.
- **Autonomous run:** executed without clarifying questions per scheduled-task constraints. Reasonable choices noted inline (e.g., report scoped to SEO — AI-citation testing is the separate monthly task 3.2).

---

*Next scheduled run: 2026-08-01.*
