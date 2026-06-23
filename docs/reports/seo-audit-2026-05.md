# Patina SEO Audit — May 2026

**Audit date:** 2026-05-01
**Site audited:** https://patina.cloud
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** None — this is the first month-over-month baseline.

---

## Executive Summary

Patina has a strong SEO foundation in code — typed metadata, structured data helpers (`Organization`, `WebSite`, `Article`, `Product`, `Service`, `SoftwareApplication`, `AboutPage`, `BreadcrumbList`), an XML sitemap, and an explicit AI-crawler allowlist in `robots.ts`. The visibility plan is well-articulated and the schemas in `src/lib/seo.ts` line up against it.

What's broken right now is the production deployment configuration, not the code:

1. **Critical: every URL in the live sitemap and `robots.txt` Sitemap directive contains a literal newline.** The production `NEXT_PUBLIC_SITE_URL` env var is set with a trailing `\n`, which makes Next.js emit `https://patina-website.vercel.app\n/furniture` everywhere. Search engines treat these as malformed and skip them. This single fix unlocks the entire sitemap.
2. **Critical: the canonical host on the live site is `patina-website.vercel.app`, not `patina.cloud`.** Every `og:url`, every sitemap entry, every JSON-LD `url` field references the Vercel preview hostname. Patina is currently building search authority for the wrong domain.
3. **High: the fallback product slugs in `sitemap.ts` 404.** A live fetch of `https://patina.cloud/furniture/noma-dining-chair` returns a `Product Not Found` page. Sanity isn't populated, so search engines following the sitemap hit dead URLs.
4. **High: no `<link rel="canonical">` on the homepage or `/app`.** Combined with #2, this leaves duplicate-content risk between `patina.cloud` and `patina-website.vercel.app`.
5. **Medium: source-of-truth defaults in `seo.ts` and `robots.ts` use `https://patina.design`** — a third hostname that is neither the production site nor the Vercel preview. Hard to spot, easy to leak.

Overall assessment: **Strong foundation, blocked by one env-var bug and a hostname mismatch.** Fix the four items in "Quick Wins" this week and Patina recovers most of its SEO surface area without writing new content.

---

## Top 3 Quick Wins (Kody — this week)

1. **Fix `NEXT_PUBLIC_SITE_URL` in Vercel project settings** → set to `https://patina.cloud` exactly, no trailing whitespace, no newline. Verify by checking that `https://patina.cloud/sitemap.xml` returns clean URLs with no line breaks inside `<loc>` tags.
2. **Repoint the production canonical host** → after #1, `og:url`, `canonical`, sitemap, and JSON-LD `url` fields all switch to `patina.cloud` automatically. Then submit the corrected `https://patina.cloud/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
3. **Populate Sanity with at least the 6 fallback product slugs** (`noma-dining-chair`, `atelier-coffee-table`, `kyoto-platform-bed`, `archipelago-bookshelf`, `haven-lounge-chair`, `fjord-sideboard`) OR remove them from `src/app/sitemap.ts` lines 12–19. Right now search engines are being told these URLs exist; they don't.

---

## Quick Wins (full list — under 2 hours each)

### 1. Fix the trailing-newline env var (CRITICAL)
**Where:** Vercel project → Environment Variables → `NEXT_PUBLIC_SITE_URL`.
**Symptom:** Sitemap entries look like `<loc>https://patina-website.vercel.app\n/furniture</loc>` (literal line break inside the `<loc>` element). Same corruption in `robots.txt`: `Sitemap: https://patina-website.vercel.app\n/sitemap.xml`.
**Fix:** Re-enter the value as `https://patina.cloud` with no trailing whitespace. Redeploy.
**Impact:** Restores indexability of every URL in the sitemap (currently ~24 URLs all broken). High.

### 2. Switch canonical host to patina.cloud (CRITICAL)
**Where:** Same env var as #1; also `src/lib/seo.ts:4` and `src/app/robots.ts:3` defaults.
**Symptom:** `og:url` on the homepage returns `https://patina-website.vercel.app`. The whole site's social/AI metadata points at the Vercel preview domain.
**Fix:** Change the fallback in code from `"https://patina.design"` to `"https://patina.cloud"` in both files (so even without the env var you don't leak a third domain). Then make sure the env var is set per #1.
**Impact:** Consolidates domain authority. Without this fix, Patina is splitting search signals between two hostnames. High.

### 3. Add `<link rel="canonical">` to the homepage and `/app`
**Where:** `src/app/layout.tsx` (or per-page metadata).
**Symptom:** Homepage HTML has no `<link rel="canonical">`. `/app` is also missing it.
**Fix:** Add `alternates: { canonical: siteUrl }` to `defaultMetadata` in `src/lib/seo.ts:8` and explicit `alternates.canonical` to `src/app/app/page.tsx` metadata.
**Impact:** Prevents duplicate-content penalties between `/` and any tracked URLs (`?utm_*`). Medium-high.

### 4. Add `og:image` to `/app` and journal post pages
**Where:** `src/app/app/page.tsx` metadata; `src/app/journal/[slug]/page.tsx` `generateMetadata`.
**Symptom:** Live `/app` HTML has no `og:image`. Journal posts conditionally include image only if `coverImageUrl` is set (it currently isn't for any post).
**Fix:** Default to `${siteUrl}/og-image.jpg` when no per-page image exists. For journal posts, fall back to a category-specific image or the site default.
**Impact:** Improves social CTR (Twitter/X, LinkedIn, Facebook previews currently show nothing). Medium.

### 5. Remove or replace `https://patina.design` in code defaults
**Where:** `src/lib/seo.ts:4`, `src/app/robots.ts:3`.
**Symptom:** If `NEXT_PUBLIC_SITE_URL` is ever unset, the site silently emits a third hostname (`patina.design`) that isn't owned by Patina.
**Fix:** Replace with `https://patina.cloud` in both files. Bonus: throw at build time if the env var is missing in production.
**Impact:** Defense in depth — prevents a future env-var mistake from leaking another wrong domain. Low.

### 6. Resolve the static-vs-dynamic robots.txt conflict
**Where:** `public/robots.txt` AND `src/app/robots.ts`.
**Symptom:** Both files exist. Next.js App Router gives precedence to `app/robots.ts`, but the duplicate is confusing and is likely how the bad sitemap URL got committed in the first place.
**Fix:** Delete `public/robots.txt`. Source of truth is `src/app/robots.ts`.
**Impact:** Avoids future drift. Low.

### 7. Strengthen homepage `<title>` for AI/search relevance
**Where:** `src/lib/seo.ts:11`.
**Symptom:** Current title is `Patina | Complete Designer-Curated Rooms | Where Time Adds Value` (62 chars — borderline). It doesn't include `room scan`, `AR`, or `furniture app`, which are the top app-store and AI-citation queries from the visibility plan.
**Fix:** Try `Patina — Designer-Curated Furniture & AR Room Scanning App` (58 chars). Keep the slogan in the meta description, not the title.
**Impact:** Better SERP CTR for app-related queries. Medium.

### 8. Expand `keywords` in `defaultMetadata`
**Where:** `src/lib/seo.ts:15-27`.
**Symptom:** Current keyword list misses the target terms enumerated in `docs/patina-digital-visibility-plan.md`: `designer-taught`, `room scanning furniture app`, `AR room visualization`, `alternatives to Havenly`, `alternatives to Wayfair`, `Madison Wisconsin furniture`. (Note: Google ignores the `keywords` meta tag, but Bing and several AI crawlers still parse it.)
**Fix:** Append the missing terms.
**Impact:** Marginal but free.

### 9. Add `BreadcrumbList` to journal posts
**Where:** `src/app/journal/[slug]/page.tsx` already imports `generateBreadcrumbJsonLd`. Verify it's actually rendered in the page body (the helper exists; live HTML has `BreadcrumbList` per the schema validation pass — confirm this is consistent across all posts).
**Fix:** Audit each journal post to ensure breadcrumb JSON-LD is emitted.
**Impact:** Better SERP appearance with breadcrumb trail. Low.

### 10. Add `lastmod` based on actual content dates, not build time
**Where:** `src/app/sitemap.ts:38-53`.
**Symptom:** Static routes all use `now` (build time), so `lastmod` updates every deploy regardless of whether the page changed. AI crawlers treat this as noise.
**Fix:** Hard-code real dates, or move marketing pages into Sanity and use `_updatedAt`.
**Impact:** Better freshness signal. Medium.

### 11. Add the descriptive alt-text upgrade pass
**Where:** Throughout `src/components/sections/*.tsx`.
**Symptom:** Visibility plan §1.4 calls for keyword-rich alt text. Without crawling every component this audit can't enumerate, but a spot check shows decorative alt patterns. Run a search: `grep -rE 'alt="[^"]{0,30}"' src/components` and review hits under 30 chars.
**Fix:** Replace `alt="Living space"` with `alt="Organic modern living room with walnut coffee table — Patina design aesthetic"` style alts.
**Impact:** Image search + AI extraction. Medium.

---

## Strategic Investments (this quarter)

### A. Catch up on the journal publishing cadence
The visibility plan commits to **2 Tier 1 articles + 1 Tier 2 + 1 Tier 3 per month**. The live sitemap shows **3 journal posts total** since the plan was written in April 2026 (`why-were-building-patina`, `designer-as-intelligence-layer`, `what-we-look-for-founding-maker`). At the current pace Patina will hit ~12 posts by year end — the plan's 6-month target is 25.

**Action:** Pick 4 Tier 1 article titles from the visibility plan §2.1 table and draft them this month. Start with the highest-AI-citation candidates:
- "How to Tell If Furniture Will Last 20 Years" (high-volume informational query)
- "What AR Room Scanning Actually Tells You About Your Space" (direct product relevance)
- "How Designers Choose Furniture for Clients (The Real Process)" (positions Aesthete Engine)

**Effort:** 3–4 hours per article. Use Claude for drafting from Leah's voice notes, Kody for editing.
**Impact:** High — every article that publishes is a new AI-citation surface.

### B. Add `FAQPage` schema to Tier 3 reference content
The visibility plan §2.1 calls Tier 3 "FAQ schema markup, tables, bullet points, scannable structure." None of the existing journal posts use `FAQPage` schema. Add a `generateFaqJsonLd` helper to `src/lib/seo.ts` and use it on the planned reference pieces ("Furniture Care Guide," "10 Materials That Age Beautifully," etc.).

**Effort:** Half day to add the helper + apply to 1 post.
**Impact:** FAQ schema unlocks rich snippets in Google and is heavily weighted in AI extraction. High.

### C. Build the topic cluster for "designer-curated furniture"
The visibility plan §2 implies a hub-and-spoke architecture but the journal index (`/journal`) is a flat list with no category landing pages. Each `categoryLabels` value in `src/app/journal/page.tsx:42-47` (`building-patina`, `design-thinking`, `maker-stories`, `material-deep-dives`) deserves its own `/journal/category/[slug]` route with intro copy, internal links to all posts in the category, and `CollectionPage` schema.

**Effort:** ~1 day to build the route + 4 short intros.
**Impact:** Strong internal linking + topic-cluster SEO signal. High.

### D. Add `ItemList` schema to `/furniture` and `/materials`
Both routes are catalog pages but neither emits structured data. `ItemList` lets Google and AI systems understand them as collections, which surfaces them for queries like "list of designer-curated furniture brands."

**Where:** `src/app/furniture/page.tsx`, `src/app/materials/page.tsx`.
**Effort:** ~2 hours each.
**Impact:** Medium.

### E. Content gap vs. Wayfair / Houzz / Havenly
Without an SEO tool connection (Ahrefs/Semrush), this audit can't quantify ranking gaps. But based on each competitor's known content footprint:

| Competitor | What they own that Patina doesn't | Patina opportunity |
|---|---|---|
| Wayfair | "How to measure for furniture" guides; thousands of long-tail product pages | Out-rank on quality, not volume — focus on designer-perspective angles Wayfair can't credibly write |
| Houzz | Design Story articles, Designer Profiles, room-by-room photo tags | Patina's `/designers` page should evolve into a directory with individual designer profile pages indexable by Google |
| Havenly | "Style quiz" results pages; before/after project galleries | Once the app launches, project showcase pages become the equivalent — plan their SEO structure now |

**Action:** Scope a `/designers/[slug]` route for Founding 50 designer profiles. Each profile becomes an indexable page that competes for "[designer name] interior designer" branded queries and feeds the entity graph for Patina.

**Effort:** ~3 days for the route + schema + first 5 profiles.
**Impact:** High — directly expands keyword surface area and builds the entity graph the visibility plan §3 wants.

### F. Connect an SEO tool MCP for next month's audit
Without Ahrefs / Semrush / Google Search Console data, this audit can't report actual rankings, search volumes, backlink counts, or month-over-month deltas. The visibility plan §5 budgets ~$99/mo for Ahrefs Lite — getting that connected (and ideally exposed via MCP) would let next month's automation report real numbers instead of structural assessments.

**Effort:** Subscription + MCP setup, ~2 hours.
**Impact:** Massive for the value of every subsequent monthly report.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | Site serves over HTTPS |
| robots.txt accessible | ⚠️ Warning | Returns 200 but `Sitemap:` directive contains literal newline |
| Sitemap.xml accessible | ⚠️ Warning | Returns 200 but every `<loc>` value contains a literal newline; URLs unusable |
| Canonical hostname | ❌ Fail | All canonical/og:url references point at `patina-website.vercel.app` instead of `patina.cloud` |
| `<link rel="canonical">` on key pages | ❌ Fail | Missing on `/`, `/app`. Present on `/designers`, `/journal`, `/founding`, `/waitlist` |
| AI crawler allowlist | ✅ Pass | `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `anthropic-ai`, `Bytespider` all explicitly allowed |
| `llms.txt` present | ✅ Pass | `/public/llms.txt` shipped; matches the visibility-plan template |
| Organization JSON-LD on homepage | ✅ Pass | Includes founders, slogan, founding date, contactPoint, sameAs |
| WebSite JSON-LD with SearchAction | ✅ Pass | Search points at `/furniture?search={...}` |
| SoftwareApplication on `/app` | ✅ Pass | Verified in live HTML |
| Article JSON-LD on journal posts | ✅ Pass | Confirmed on `/journal/why-were-building-patina` |
| BreadcrumbList on detail pages | ✅ Pass | Confirmed on journal post; should also be on `/furniture/[slug]` once products exist |
| Product JSON-LD on furniture details | ❌ Fail | `/furniture/noma-dining-chair` returns 404 — Sanity not populated; helper exists but never executes |
| AboutPage schema | ✅ Pass | `generateAboutPageJsonLd` exists in helper; About page imports it |
| Service schema on `/services` | ✅ Pass | `generateServiceJsonLd` exists; Services page imports it |
| FAQ / HowTo schema | ❌ Fail | No `FAQPage` or `HowTo` schemas anywhere — visibility plan calls for them |
| ItemList on catalog pages | ❌ Fail | `/furniture` and `/materials` are collection pages with no `ItemList` schema |
| `<title>` length within 50–60 chars | ⚠️ Warning | Homepage 62 chars, several others 30–40 (under-utilized) |
| `<meta description>` 150–160 chars | ✅ Pass | All pages within range |
| Single `<h1>` per page | ⚠️ Warning | Needs full audit; homepage's H1 is in body, hard to spot from head |
| Mobile-friendly | ✅ Pass | Tailwind responsive utilities throughout |
| Static `public/robots.txt` and dynamic `app/robots.ts` both present | ⚠️ Warning | Drift risk; pick one |

---

## On-Page Issues Table

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| All pages | `og:url` and sitemap URLs use `patina-website.vercel.app` | **Critical** | Fix `NEXT_PUBLIC_SITE_URL` in Vercel; change code defaults in `seo.ts:4` and `robots.ts:3` from `patina.design` to `patina.cloud` |
| `/sitemap.xml` | Every `<loc>` contains a literal `\n` between hostname and path | **Critical** | Strip trailing whitespace from the env var |
| `robots.txt` | `Sitemap:` directive split across two lines | **Critical** | Same env-var fix |
| `/furniture/[slug]` (all 6 fallback slugs) | 404 — products don't exist in Sanity | **High** | Either populate Sanity or remove fallback slugs from `sitemap.ts:12-19` |
| `/` (homepage) | No `<link rel="canonical">` | **High** | Add to `defaultMetadata` |
| `/app` | No `<link rel="canonical">`, no `og:url`, no `og:image` | **High** | Add `alternates.canonical` and full `openGraph` block to `app/app/page.tsx` metadata |
| `/journal/[slug]` | No `og:image` fallback when `coverImageUrl` empty | Medium | Default to `${siteUrl}/og-image.jpg` |
| `/furniture/[slug]` | Metadata missing `openGraph`, `alternates.canonical`, `keywords` | Medium | Expand `generateMetadata` in `app/furniture/[slug]/page.tsx:25-47` |
| `/furniture` | No `ItemList` JSON-LD | Medium | Add a `generateItemListJsonLd(products)` helper and emit on the catalog page |
| `/materials` | No structured data | Medium | Same — `ItemList` of materials |
| `/journal` | No `CollectionPage` or `ItemList` schema | Medium | Add to journal index |
| `/about` | About page metadata missing `alternates.canonical` and `openGraph.url` | Medium | Add both |
| Journal Tier 3 reference posts (planned) | No `FAQPage` schema | Medium | Build helper before publishing |
| `/` (homepage) | Title doesn't include `room scan` or `AR` keywords | Low | Test alternate title with app-related terms |
| `seo.ts` keyword list | Missing `room scanning`, `designer-taught`, `Havenly alternative`, `Wayfair alternative` | Low | Append to `defaultMetadata.keywords` |
| Image alt text across components | Likely under-optimized per visibility plan §1.4 | Low | Audit and rewrite for descriptive, keyword-rich alts |

---

## Content Gap Recommendations

| Topic / Keyword | Why it matters | Recommended Format | Priority | Effort |
|---|---|---|---|---|
| "How to tell if furniture will last 20 years" | Tier 1 from visibility plan; high-intent informational query | Long-form journal post, 1,200–1,800 words, FAQPage schema | High | 3–4 hours |
| "What AR room scanning actually tells you" | Direct product relevance; positions Patina in the AR furniture category before competitors do | Tier 1 journal post + Article schema | High | 3–4 hours |
| "Alternatives to Havenly / Modsy / Wayfair" | Captures "switch from X" search intent — historically high CTR | Comparison page (not a journal post — make it a `/compare` route) with Service schema | High | 1 day |
| Designer profile pages (`/designers/[slug]`) | Houzz owns this format. Each profile is an indexable surface for "[name] interior designer" queries | Sanity schema + dynamic route + Person schema | High | 3 days |
| "Furniture care guide" (Tier 3) | Reference content with FAQ schema — high featured-snippet potential | Reference page, updated quarterly | Medium | 4 hours |
| "Interior design styles explained" (Tier 3) | Taxonomy content, evergreen, link-magnet | Long reference page with `DefinedTerm` schema | Medium | 1 day |
| Maker profile pages (`/makers/[slug]`) | Currently only `/makers/apply` exists — published makers should have indexable profiles | Sanity schema + dynamic route + Organization schema (one per maker) | Medium | 2 days |
| Newsletter sign-up landing page (dedicated `/newsletter`) | Distribution channel from visibility plan §2.3 | Short landing + form | Low | 2 hours |
| Local SEO content for "Madison Wisconsin furniture" | Owns local entity graph; pairs with Google Business Profile in visibility plan §3.1 | Single page with `LocalBusiness` schema | Medium | 4 hours |

---

## Competitor Comparison Summary

Without an SEO tool MCP this is structural rather than quantitative. Numbers will populate once Ahrefs is connected (see Strategic Investment F).

| Dimension | Patina | Wayfair | Houzz | Havenly | Winner |
|---|---|---|---|---|---|
| Indexed pages (rough) | ~24 (sitemap, broken) | Millions (catalog) | Millions (UGC + projects) | Hundreds | Wayfair / Houzz |
| Designer-perspective content | 3 journal posts | None | Some via Houzz Pros | Some via blog | Patina (when at scale) |
| Schema coverage | High (when wired correctly) | High | Medium | Medium | Patina |
| FAQ / HowTo schema | None | Some | None | Some | Havenly |
| AI-crawler allowlist | Explicit | Default | Default | Default | Patina |
| `llms.txt` | Present | None | None | None | Patina |
| Founder thought-leadership content | Beginning | None | None | None | Patina (uniquely positioned) |
| Local entity (Madison WI) | Schema present, no GBP yet | N/A | N/A | N/A | Patina |

Patina's structural advantages are real but the *volume* gap is enormous. The strategy in the visibility plan is correct — out-quality, don't out-volume — but execution has to actually happen. Three posts in three months isn't enough to compound.

---

## Month-over-Month Delta

This is the first SEO audit run. **Baseline established** for these metrics next month:
- Sitemap URL count: 24 (3 journal posts, 6 fallback products, 15 static)
- JSON-LD schemas detected on live pages: Organization, WebSite, Article, BreadcrumbList, SoftwareApplication
- Schemas defined but not yet rendering (Sanity empty): Product, Service, AboutPage, FAQPage (not built)
- Critical config issues: 3 (env-var newline, wrong canonical host, broken product fallbacks)
- High-priority on-page issues: 4
- Medium-priority on-page issues: 8
- Journal post count: 3
- AI-crawler allowlist coverage: 7 user agents

Next month's report will compare directly against these numbers.

---

## File-Level Recommendations

For Kody to action — every recommendation references a real file and line where possible.

| File | Line | Change |
|---|---|---|
| `src/lib/seo.ts` | 4 | Change fallback from `"https://patina.design"` to `"https://patina.cloud"` |
| `src/lib/seo.ts` | 8 | Add `alternates: { canonical: siteUrl }` to `defaultMetadata` |
| `src/lib/seo.ts` | 15–27 | Append: `"designer-taught"`, `"room scanning furniture app"`, `"AR room visualization"`, `"alternatives to Havenly"`, `"alternatives to Wayfair"`, `"Madison Wisconsin furniture"` |
| `src/lib/seo.ts` | (new) | Add `generateFaqJsonLd(items)` and `generateItemListJsonLd(items)` helpers |
| `src/app/robots.ts` | 3 | Change fallback to `"https://patina.cloud"` |
| `src/app/sitemap.ts` | 12–19 | Either populate Sanity with these 6 product slugs, or remove the fallback array entirely |
| `src/app/sitemap.ts` | 38–53 | Replace `lastModified: now` with hard-coded dates of last meaningful content change per page |
| `src/app/app/page.tsx` | metadata block | Add `alternates: { canonical: "https://patina.cloud/app" }`, add `openGraph.url` and `openGraph.images` |
| `src/app/journal/[slug]/page.tsx` | `generateMetadata` | Add `og:image` fallback; ensure `BreadcrumbList` is rendered consistently |
| `src/app/furniture/[slug]/page.tsx` | 25–47 | Expand metadata: add `openGraph`, `alternates.canonical`, `keywords` |
| `src/app/furniture/page.tsx` | (new) | Render `ItemList` JSON-LD for the products array |
| `src/app/materials/page.tsx` | (new) | Render `ItemList` JSON-LD for the materials array |
| `src/app/journal/page.tsx` | (new) | Render `CollectionPage` + `ItemList` JSON-LD |
| `src/app/about/page.tsx` | metadata block | Add `alternates.canonical` and `openGraph.url` |
| `public/robots.txt` | — | Delete this file; `src/app/robots.ts` is the source of truth |
| **Vercel project settings** | — | `NEXT_PUBLIC_SITE_URL` → `https://patina.cloud` (no whitespace, no newline) |

---

## Notes & Constraints

- **No SEO tool connection.** This audit could not pull real keyword rankings, search volumes, keyword difficulty scores, or backlink data. Assessments of "high/medium/low opportunity" are based on the visibility plan's documented research and live-site inspection. Connect Ahrefs (~$99/mo per the plan) or another SEO MCP to enable quantified tracking.
- **Live-site fetches were truncated.** The HTML response bodies for several pages exceeded inline limits and were analyzed via subagent extraction. Specific schema validation details should be re-run against [Schema Markup Validator](https://validator.schema.org) and [Rich Results Test](https://search.google.com/test/rich-results) once the canonical-host fix ships.
- **No code changes were made in this run.** Per task instructions, this report only identifies what to change. Trigger implementation separately.

---

*Next scheduled run: 2026-06-01.*
