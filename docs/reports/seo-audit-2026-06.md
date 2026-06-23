# Patina SEO Audit — June 2026

**Audit date:** 2026-06-01
**Site audited:** https://patina.cloud
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** `docs/reports/seo-audit-2026-05.md`

---

## Executive Summary

- **The fix is written; the fix is not deployed.** All three of last month's critical issues — newline-corrupted URLs, wrong canonical hostname (`patina-website.vercel.app`), and the broken `patina.design` code default — have working code fixes sitting in Kody's working tree. None of them are committed. Production still serves the exact same broken HTML and sitemap as May 1.
- **No deployment in ~30+ days.** Live response headers show `/makers` last built 2026-04-15, `/furniture` 2026-04-18, `/furniture/[slug]` 2026-04-28. Even if today's local code were pushed, it wouldn't reach production without a manual deploy. This is the single highest-impact action for June: `git add` + `git commit` + push.
- **Title template doubling is a new bug.** `https://patina.cloud/furniture/noma-dining-chair` now returns `<title>Product Not Found | Patina | Patina</title>` — the page-level title already includes `| Patina` and the root template appends another `| Patina`. Same pattern on the journal `Post Not Found` state. Fix is one line.
- **The 6 fallback product slugs now return HTTP 200, not 404.** That sounds like improvement but it's worse: search engines see a 200 with "Product Not Found" content and will index six near-duplicate empty pages. Either populate Sanity or remove the fallbacks from `sitemap.ts`.
- **One new page since May (`/makers`) shipped with no canonical, no schema, no OG metadata.** It's a public, indexable route — needs a 10-minute metadata pass before next month.
- **Journal cadence has not moved.** Still 3 posts on `/journal`. Visibility plan target is 8 by now (2/month since April). Three months of underproduction against the plan.

Overall: **The structural work is done. The deployment pipeline is the blocker.** Every code-level recommendation from May is still valid; the only new code finding is the title-doubling bug.

---

## Top 3 Quick Wins (Kody — this week)

1. **Commit and push the uncommitted SEO work, then verify the Vercel env var.** `git status` shows `src/lib/site-url.ts` untracked and `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/furniture/[slug]/page.tsx`, `src/app/journal/[slug]/page.tsx` all modified. After pushing, set `NEXT_PUBLIC_SITE_URL=https://patina.cloud` in Vercel (no whitespace, no trailing slash), redeploy, then `curl https://patina.cloud/sitemap.xml | head -5` to confirm `<loc>` values are clean.
2. **Fix the title template doubling.** In `src/app/furniture/[slug]/page.tsx:33` change `"Product Not Found | Patina"` → `"Product Not Found"`. In `src/app/journal/[slug]/page.tsx:68` change `"Post Not Found | Patina"` → `"Post Not Found"`. The root template `"%s | Patina"` will append the suffix. Same audit needed for any other page that hard-codes `| Patina` inside a title string.
3. **Add metadata to `/makers`.** `src/app/makers/page.tsx:10–15` has only `title` + `description`. Add `alternates: { canonical: "/makers" }`, an `openGraph` block, and render an `ItemList` JSON-LD around the makers grid (it's a collection page — Houzz's equivalent ranks well in design-related queries).

---

## Quick Wins (full list — under 2 hours each)

### 1. Ship what's already written (CRITICAL — carryover)
**Where:** Local working tree.
**Symptom:** `git status` shows 5 modified files and `src/lib/site-url.ts` untracked. The code that would fix the newline bug, the canonical-host bug, and the `patina.design` default has been written but never committed. `git log --since="2026-05-01"` returns zero commits.
**Fix:** Commit, push, deploy. After deploy:
- `curl https://patina.cloud/sitemap.xml` should show `<loc>https://patina.cloud/...</loc>` with no embedded newline.
- `curl https://patina.cloud/robots.txt | grep Sitemap` should be a single line ending in `/sitemap.xml`.
- The homepage `og:url` should be `https://patina.cloud`, not `https://patina-website.vercel.app`.
**Impact:** Unblocks every other SEO improvement. Highest impact action of the month.

### 2. Set `NEXT_PUBLIC_SITE_URL` correctly in Vercel (CRITICAL — carryover)
**Where:** Vercel project settings → Environment Variables.
**Symptom:** Live JSON-LD on the homepage contains `"url":"https://patina-website.vercel.app\n"` — the env var value contains a trailing newline and points at the wrong host. The local `src/lib/site-url.ts` adds `.trim()` defense, but it isn't deployed (see #1) and even with `.trim()` the value still resolves to the wrong domain unless the env var itself is corrected.
**Fix:** In Vercel, re-enter `NEXT_PUBLIC_SITE_URL` as exactly `https://patina.cloud`. Click save without ever pressing Enter inside the input field. Redeploy.
**Impact:** Consolidates domain authority on `patina.cloud`. Without this, Patina is splitting search signals between `patina.cloud` and `patina-website.vercel.app`.

### 3. Fix the title template doubling (NEW)
**Where:** `src/app/furniture/[slug]/page.tsx:33`, `src/app/journal/[slug]/page.tsx:68`.
**Symptom:** Live `/furniture/noma-dining-chair` returns `<title>Product Not Found | Patina | Patina</title>`. The page-level title already includes `| Patina` and the root template (`title.template: "%s | Patina"` in `seo.ts:11`) appends another suffix.
**Fix:** Remove the `| Patina` suffix from page-level titles. Audit any other `title:` string that ends in `| Patina` — also check `src/app/about/page.tsx:20` (`'Our Story | Patina'`), `src/app/services/page.tsx:10` (`"Design Services | Patina"`), `src/app/contact/page.tsx:7`, `src/app/careers/page.tsx:7`, `src/app/materials/page.tsx:10`, `src/app/makers/page.tsx:10`, `src/app/makers/apply/page.tsx:7`, `src/app/journal/page.tsx:10`, `src/app/furniture/page.tsx:10`, `src/app/app/page.tsx:17`, `src/app/founding/page.tsx:7`, `src/app/designers/page.tsx:7`, `src/app/waitlist/page.tsx:5`.
**Impact:** Most of these pages render in real Google results with the double "| Patina | Patina" suffix today. Cleaner SERP titles, better CTR.

### 4. Fallback product slugs return 200 with empty content (HIGH — regression)
**Where:** `src/app/sitemap.ts:11–19`, `src/app/furniture/[slug]/page.tsx:33`.
**Symptom:** Last month these 404'd; now they all return HTTP 200 with `Product Not Found | Patina | Patina` content. Search engines crawling the sitemap see six indexable pages with substantively identical "not found" content — that's worse than a 404, which would tell crawlers to drop them. (Likely caused by missing `notFound()` call in the metadata path; the page component does call `notFound()` correctly.)
**Fix:** Either populate Sanity with the 6 slugs (preferred — the products exist in branding copy as "Noma Dining Chair," etc.) OR remove the fallback array from `sitemap.ts:11–19`. As a defense, in `furniture/[slug]/page.tsx`, also call `notFound()` from `generateMetadata` when the product is missing so the page returns a true 404.
**Impact:** Stops bleeding crawl budget and avoids near-duplicate-content signals.

### 5. Add metadata + schema to `/makers` (NEW PAGE)
**Where:** `src/app/makers/page.tsx`.
**Symptom:** Page shipped between April 15 and May 1. Has `title` + `description` only. No canonical, no OG block, no JSON-LD. It's a public collection page with Sanity-backed maker grid — Houzz's equivalent ("Pro" directory) ranks well organically.
**Fix:** Add to the `metadata` export:
```tsx
alternates: { canonical: "/makers" },
openGraph: {
  title: "Our Makers — Patina",
  description: "...",
  url: "/makers",
  type: "website",
},
```
And render an `ItemList` JSON-LD around the makers grid (each item an `Organization` with `name`, `address`, `description`). Helper does not exist yet — add `generateMakerListJsonLd(makers)` to `src/lib/seo.ts`.
**Impact:** New keyword surface for "furniture makers Wisconsin," "heritage furniture workshops," etc. Internal links to `/makers/apply` and `/makers/[slug]` (once profiles ship).

### 6. Add `<link rel="canonical">` to defaultMetadata (HIGH — carryover)
**Where:** `src/lib/seo.ts:7`.
**Symptom:** Live homepage HTML has no `<link rel="canonical">`. Same on `/app`, `/furniture`, `/materials`, `/contact`, `/careers`, `/makers`, `/makers/apply`. Pages with explicit canonical: `/designers`, `/founding`, `/journal`, `/journal/[slug]`, `/waitlist`.
**Fix:** Add `alternates: { canonical: "./" }` to `defaultMetadata`. This sets the default for every page; per-page metadata can override.
**Impact:** Prevents duplicate-content risk between root domain and UTM-tagged URLs.

### 7. Resolve the static-vs-dynamic robots.txt conflict (carryover)
**Where:** `public/robots.txt` AND `src/app/robots.ts`.
**Symptom:** Both still exist. `public/robots.txt` actually has the *correct* hostname (`Sitemap: https://patina.cloud/sitemap.xml` with no newline), but Next.js App Router precedence means `src/app/robots.ts` wins — and it currently outputs the broken hostname.
**Fix:** Delete `public/robots.txt`. The dynamic `app/robots.ts` is the source of truth once #1 + #2 ship.
**Impact:** Prevents future drift. Cosmetic until the live one is fixed.

### 8. Strengthen homepage `<title>` for AI/search relevance (carryover)
**Where:** `src/lib/seo.ts:10`.
**Symptom:** Current title `Patina | Complete Designer-Curated Rooms | Where Time Adds Value` (62 chars). Doesn't include `room scan`, `AR`, `furniture app`.
**Fix:** Try `Patina — Designer-Curated Furniture & AR Room Scanning App` (58 chars).
**Impact:** Better SERP CTR for app/AR-related queries.

### 9. Expand `keywords` in `defaultMetadata` (carryover)
**Where:** `src/lib/seo.ts:14–26`.
**Fix:** Append `"designer-taught"`, `"room scanning furniture app"`, `"alternatives to Havenly"`, `"alternatives to Wayfair"`, `"alternatives to Modsy"`, `"Madison Wisconsin furniture"`.
**Impact:** Marginal but free. Google ignores `keywords`; Bing and several AI crawlers still parse it.

### 10. Add `og:image` + canonical to `/app` (carryover)
**Where:** `src/app/app/page.tsx:16–24`.
**Symptom:** Live `/app` HTML has no `og:image`, no `og:url`, no canonical link. The `openGraph` block has `title` + `description` only.
**Fix:** Add `url: "/app"`, `images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]`, and `alternates: { canonical: "/app" }`.
**Impact:** Social previews (Twitter/X, LinkedIn, iMessage) currently show nothing. Medium.

### 11. Move journal post `coverImageUrl` fallback to a default OG image (carryover)
**Where:** `src/app/journal/[slug]/page.tsx:77`.
**Symptom:** Journal posts conditionally include `images` only if `coverImageUrl` is set. None of the 3 live posts have a cover image, so they share previews with the homepage.
**Fix:** Replace `...(post.coverImageUrl && { images: [{ url: post.coverImageUrl }] })` with a default:
```tsx
images: [{ url: post.coverImageUrl || "/og-image.jpg" }],
```
**Impact:** Social CTR on journal-post shares.

### 12. Add real `lastmod` dates to static routes (carryover)
**Where:** `src/app/sitemap.ts:36–51`.
**Symptom:** Every static route uses `now` (build time). Crawlers treat constantly-updated `lastmod` on unchanged pages as noise — many AI crawlers explicitly devalue it.
**Fix:** Hard-code real dates per route (the date that page's content actually changed), or move the marketing pages into Sanity so `_updatedAt` drives the value.
**Impact:** Better freshness signal weight.

### 13. Add `BreadcrumbList` to `/about`, `/services`, `/designers`, `/makers`, `/founding`
**Where:** Each page's component body.
**Symptom:** Only journal posts and (when populated) furniture detail pages emit `BreadcrumbList`. The hub pages don't.
**Fix:** Render `generateBreadcrumbJsonLd([{name: "Home", url: siteUrl}, {name: "About", url: \`${siteUrl}/about\`}])` near the top of each page.
**Impact:** Breadcrumb SERP trail. Low-medium.

### 14. Descriptive alt text upgrade (carryover)
**Where:** Throughout `src/components/sections/*.tsx`. Run `grep -rE 'alt="[^"]{0,30}"' src/components` to enumerate.
**Symptom:** Visibility plan §1.4 calls for keyword-rich alt text.
**Fix:** Replace short generic alts with descriptive, keyword-rich alternatives.
**Impact:** Image search + AI extraction. Medium.

---

## Strategic Investments (this quarter)

### A. Catch up on the journal publishing cadence (carryover — worse than last month)

Live `/journal` still shows **3 posts** (`why-were-building-patina`, `designer-as-intelligence-layer`, `what-we-look-for-founding-maker`). Visibility plan target was 4/month from April onward — so by June 1 the plan calls for 8–10 posts, and the gap is now 5–7 posts. This is the largest unforced underperformance against the plan.

**Action:** Pick 4 Tier 1 article titles from the visibility plan §2.1 and ship this month. Highest-AI-citation candidates remain:
- "How to Tell If Furniture Will Last 20 Years"
- "What AR Room Scanning Actually Tells You About Your Space"
- "How Designers Choose Furniture for Clients (The Real Process)"
- "The Real Difference Between $800 and $3,000 Furniture"

**Effort:** 3–4 hours per article (Leah voice notes → Claude draft → Kody edit).
**Impact:** High. Every post is a new AI-citation surface. Three months of skipped publishing is three months of compounding lost authority.

### B. Add `FAQPage` schema helper + first reference post (carryover)

Still no `FAQPage` schema anywhere on the site. Visibility plan §2.1 explicitly calls Tier 3 reference content "FAQ schema markup, tables, bullet points, scannable structure." Build `generateFaqJsonLd(items)` in `src/lib/seo.ts`, then apply to the first reference piece ("10 Materials That Age Beautifully," "Furniture Care Guide").

**Effort:** Half day for helper + 1 post.
**Impact:** High. FAQ schema unlocks rich snippets and is heavily weighted in AI extraction.

### C. Build the topic-cluster hub for journal categories (carryover)

`/journal` is still a flat list. `src/app/journal/page.tsx:42–47` defines four categories (`building-patina`, `design-thinking`, `maker-stories`, `material-deep-dives`) but no `/journal/category/[slug]` route exists. Each category deserves its own landing page with intro copy, internal links to all posts in the category, and `CollectionPage` schema.

**Effort:** ~1 day to build the route + 4 category intros (~150 words each).
**Impact:** High. Internal linking + topic-cluster SEO + better navigation for readers.

### D. Add `ItemList` to `/furniture`, `/materials`, `/makers`, `/journal` (carryover, expanded)

All four are collection pages. None emit `ItemList`. Helper does not exist; add `generateItemListJsonLd(items)` to `src/lib/seo.ts` and render across all four routes.

**Effort:** ~2 hours per page after helper exists.
**Impact:** Medium. Surfaces these pages as collections in Google and AI systems.

### E. Designer profile pages — `/designers/[slug]` (carryover)

Houzz owns "[designer name] interior designer" queries because every Pro has an indexable profile. Once a Founding 50 cohort is named, Sanity schema + dynamic route + `Person` schema would create 50 new indexable entity-graph entries. Each profile feeds both branded queries AND Patina's entity graph (the goal in visibility plan §3).

**Effort:** ~3 days for the route + schema + first 5 profiles.
**Impact:** High. Directly expands keyword surface; builds the entity graph LLMs cite.

### F. Comparison page — `/compare` (carryover, sharper)

Competitor research confirms strong query volume around "Havenly alternatives 2026" (multiple roundup posts ranking — see Oblist, Remodel AI, Decorilla, Product Hunt, Interior Insider). These pages capture switching intent — historically high CTR. A `/compare` route or `/journal/havenly-alternatives` post that positions Patina against Havenly, Modsy (shutdown), Decorilla, Spacejoy, Stuccco, and Wayfair gives Patina a direct surface for these queries.

**Format suggestions:**
- Table comparing fee structure, designer-curation model, AR/scanning, marketplace breadth.
- Honest framing — "Why we built Patina differently" — rather than a hit piece.
- `Service` + `FAQPage` schema.

**Effort:** ~1 day for first comparison post; ~2 days for a structured `/compare` route.
**Impact:** High. Switching-intent traffic + AI citation for "alternatives to X" queries.

### G. Connect an SEO tool MCP (carryover — still blocking quantification)

Without Ahrefs / Semrush / GSC, this audit still cannot report actual rankings, search volumes, keyword difficulty, or backlink counts. Visibility plan §5 budgets ~$99/mo. Connecting it (and ideally exposing it via MCP) is the single biggest unlock for the value of every future monthly report.

**Effort:** Subscription + MCP setup, ~2 hours.
**Impact:** Massive for measurement.

### H. Restore deployment cadence (NEW)

The site has not been deployed in 30+ days. Whatever the reason (focus on portal work, manual deploys, holding for content), the gap means none of the SEO investment compounds. Recommend either:
- Auto-deploy on push to `main` (Vercel default — verify it's enabled).
- A weekly "ship Friday" cadence even if only docs and copy moved.

**Impact:** High. The biggest finding this month is that work happened locally but didn't reach users.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | Site serves over HTTPS |
| robots.txt accessible | ⚠️ Warning | Returns 200 but `Sitemap:` directive contains literal newline (unchanged from May) |
| Sitemap.xml accessible | ⚠️ Warning | Returns 200 but every `<loc>` value contains a literal newline; URLs unusable (unchanged from May) |
| Canonical hostname | ❌ Fail | All canonical/og:url references point at `patina-website.vercel.app` (unchanged from May) |
| `<link rel="canonical">` on key pages | ❌ Fail | Missing on `/`, `/app`, `/furniture`, `/materials`, `/contact`, `/careers`, `/makers`, `/makers/apply`, `/about`. Present on `/designers`, `/journal`, `/journal/[slug]`, `/founding`, `/waitlist` |
| AI crawler allowlist | ✅ Pass | 7 user agents explicitly allowed |
| `llms.txt` present | ✅ Pass | `/public/llms.txt` shipped; matches the visibility-plan template |
| Organization JSON-LD on homepage | ⚠️ Warning | Schema present, but `url` field contains literal `\n` |
| WebSite JSON-LD with SearchAction | ⚠️ Warning | Present but same `url` corruption |
| SoftwareApplication on `/app` | ⚠️ Warning | Present but `creator.url` corrupted with `\n` |
| Article JSON-LD on journal posts | ⚠️ Warning | Present on `/journal/why-were-building-patina`; all URLs corrupted with `\n` |
| BreadcrumbList on journal detail | ✅ Pass | Confirmed on journal post |
| BreadcrumbList on `/about`, `/services`, `/designers`, `/makers`, `/founding` | ❌ Fail | None render breadcrumb JSON-LD |
| Product JSON-LD on `/furniture/[slug]` | ❌ Fail | Slugs exist but return 200 "Product Not Found" — schema helper never executes |
| AboutPage schema | ✅ Pass | Imported and rendered |
| Service schema on `/services` | ✅ Pass | Imported and rendered |
| FAQ / HowTo schema | ❌ Fail | No `FAQPage` or `HowTo` schemas anywhere (unchanged) |
| ItemList on catalog pages | ❌ Fail | `/furniture`, `/materials`, `/makers`, `/journal` all missing |
| `<title>` length within 50–60 chars | ⚠️ Warning | Homepage 62; several others fine |
| Title template doubling | ❌ Fail (NEW) | `/furniture/noma-dining-chair` returns `Product Not Found \| Patina \| Patina` — title template appends `\| Patina` to a string that already includes it |
| `<meta description>` 150–160 chars | ✅ Pass | All within range |
| Single `<h1>` per page | ⚠️ Warning | Spot check fine; full audit deferred |
| Mobile-friendly | ✅ Pass | Tailwind responsive utilities throughout |
| Static `public/robots.txt` and dynamic `app/robots.ts` both present | ⚠️ Warning | Drift risk; pick one (unchanged) |
| Last deployment recency | ❌ Fail (NEW) | Live response headers show `/makers` deployed 2026-04-15, `/furniture` 2026-04-18, `/furniture/[slug]` 2026-04-28 — site has not been re-deployed in 30+ days, so May code work is stranded locally |
| Local code committed | ❌ Fail (NEW) | `git status` shows 5 modified + 1 untracked file with the May audit's fixes |
| `/waitlist` redirect | ✅ Pass | 308 → `/founding` confirmed |

---

## On-Page Issues Table

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| All pages | `og:url` and sitemap URLs use `patina-website.vercel.app\n` | **Critical** | Commit `src/lib/site-url.ts` + modified files; correct `NEXT_PUBLIC_SITE_URL` in Vercel; redeploy |
| `/sitemap.xml` | Every `<loc>` contains a literal `\n` | **Critical** | Same fix as above |
| `robots.txt` | `Sitemap:` directive split across two lines | **Critical** | Same fix as above |
| `/furniture/[slug]` fallback slugs | 200 with "Product Not Found" — were 404 last month, now worse | **High** (regression) | Either populate Sanity OR remove fallbacks in `sitemap.ts:11–19`; also call `notFound()` from `generateMetadata` |
| `/furniture/[slug]`, `/journal/[slug]` | Title template doubling produces `... \| Patina \| Patina` | **High** (new) | Strip `\| Patina` suffix from page-level titles since root template adds it |
| `/` (homepage) | No `<link rel="canonical">` | High | Add to `defaultMetadata.alternates` |
| `/app` | No canonical, no `og:url`, no `og:image` | High | Add `alternates` and full `openGraph` block |
| `/makers` (NEW PAGE) | No canonical, no `openGraph`, no schema | High | Add metadata + `ItemList` JSON-LD |
| `/about` | Missing `alternates.canonical` and `openGraph.url` | Medium | Add both |
| `/services` | Missing `alternates.canonical` (Service schema present) | Medium | Add `alternates.canonical` |
| `/journal/[slug]` | No `og:image` fallback when `coverImageUrl` empty | Medium | Default to `/og-image.jpg` |
| `/furniture/[slug]` | Metadata missing `openGraph`, `alternates.canonical`, `keywords` | Medium | Expand `generateMetadata` |
| `/furniture` | No `ItemList` JSON-LD | Medium | Add helper + emit |
| `/materials` | No structured data | Medium | `ItemList` of materials |
| `/journal` | No `CollectionPage` or `ItemList` schema | Medium | Add to journal index |
| `/contact`, `/careers`, `/makers/apply` | Missing canonical and `openGraph` blocks | Medium | Add per page |
| Journal Tier 3 reference posts (planned) | No `FAQPage` schema helper exists yet | Medium | Build helper before publishing |
| `seo.ts:10` homepage title | 62 chars, no `room scan`/`AR` terms | Low | Test alternate title |
| `seo.ts:14–26` keyword list | Missing target terms | Low | Append `"designer-taught"`, `"room scanning"`, `"Havenly alternative"`, `"Wayfair alternative"`, `"Modsy alternative"`, `"Madison Wisconsin furniture"` |
| Image alt text across components | Likely under-optimized per visibility plan §1.4 | Low | Audit and rewrite |

---

## Content Gap Recommendations

Competitor research this month confirmed strong query volume around "Havenly alternatives 2026" — multiple roundup posts ranking from Oblist, Remodel AI, Decorilla, Product Hunt, Interior Insider. Modsy shutdown searches are also active. Patina has no surface targeting any of this.

| Topic / Keyword | Why it matters | Recommended Format | Priority | Effort |
|---|---|---|---|---|
| "How to tell if furniture will last 20 years" | Tier 1; high-intent informational | Long-form post + FAQPage schema | High | 3–4 hours |
| "What AR room scanning actually tells you" | Direct product relevance; positions Patina in the category | Tier 1 + Article schema | High | 3–4 hours |
| "Alternatives to Havenly / Modsy / Decorilla" | Switching-intent traffic; high CTR; ranks heavily for competitors right now | `/compare` route OR journal post + Service schema | High | 1 day |
| "How designers choose furniture" | Positions Aesthete Engine methodology | Tier 1 | High | 3–4 hours |
| Designer profile pages (`/designers/[slug]`) | Houzz owns this format; each profile is an indexable surface | Sanity schema + dynamic route + Person schema | High | 3 days |
| Maker profile pages (`/makers/[slug]`) | `/makers` exists but is a flat grid; published makers should have indexable profiles | Sanity schema + dynamic route + Organization schema | Medium | 2 days |
| "Furniture care guide" (Tier 3) | Reference content with FAQ schema — high featured-snippet potential | Reference page, FAQPage | Medium | 4 hours |
| "Interior design styles explained" (Tier 3) | Taxonomy content, evergreen, link-magnet | Long reference with `DefinedTerm` schema | Medium | 1 day |
| Local SEO content for "Madison Wisconsin furniture" | Pairs with Google Business Profile in visibility plan §3.1 | Single page with `LocalBusiness` schema | Medium | 4 hours |
| Newsletter sign-up landing page (`/newsletter`) | Distribution channel from visibility plan §2.3 | Short landing + form | Low | 2 hours |

---

## Month-over-Month Delta

| Metric | May 1, 2026 | June 1, 2026 | Direction |
|---|---|---|---|
| Sitemap URL count | 24 | 24 | No change |
| Sitemap URL corruption (newline) | Yes | Yes | **No change** — fix written, never shipped |
| Canonical hostname | `patina-website.vercel.app` | `patina-website.vercel.app` | **No change** |
| Critical config issues | 3 | 3 | **No change** |
| New critical issues | n/a | +1 (title template doubling) | Worse |
| Regressions | n/a | +1 (fallback slugs now 200 not 404) | Worse |
| Journal post count | 3 | 3 | No change (plan target: +4 to +8) |
| Pages with canonical | 4 (`/designers`, `/journal`, `/journal/[slug]`, `/founding`) | 5 (+ `/waitlist`) | +1 |
| Pages with FAQPage schema | 0 | 0 | No change |
| Pages with ItemList schema | 0 | 0 | No change |
| AI-crawler allowlist coverage | 7 user agents | 7 user agents | No change |
| New public routes | n/a | `/makers`, `/waitlist`, `/careers`, `/contact` | Larger surface (good), but new pages missing metadata (bad) |
| Last production deploy | Recent (within May 1) | 2026-04-28 (most recent build timestamp on a route) | Stale |
| Uncommitted SEO work in local tree | n/a | 5 modified + 1 untracked | New blocker |

**Net:** Structural posture identical to last month + 2 net-new issues + content cadence falling further behind plan.

---

## File-Level Recommendations

| File | Line | Change |
|---|---|---|
| `src/lib/site-url.ts` | (untracked) | `git add` + commit — fix is written and good |
| `src/lib/seo.ts` | 7 | Add `alternates: { canonical: "./" }` to `defaultMetadata` |
| `src/lib/seo.ts` | 14–26 | Append: `"designer-taught"`, `"room scanning furniture app"`, `"alternatives to Havenly"`, `"alternatives to Wayfair"`, `"alternatives to Modsy"`, `"Madison Wisconsin furniture"` |
| `src/lib/seo.ts` | (new) | Add `generateFaqJsonLd(items)`, `generateItemListJsonLd(items)`, `generateMakerListJsonLd(makers)` helpers |
| `src/app/sitemap.ts` | 11–19 | Either populate Sanity with these 6 product slugs OR remove the fallback array entirely |
| `src/app/sitemap.ts` | 36–51 | Replace `lastModified: now` with hard-coded dates of last meaningful content change |
| `src/app/app/page.tsx` | 16–24 | Add `alternates: { canonical: "/app" }`, `openGraph.url`, `openGraph.images` |
| `src/app/journal/[slug]/page.tsx` | 68 | Strip `\| Patina` from `"Post Not Found \| Patina"` (root template will append) |
| `src/app/journal/[slug]/page.tsx` | 77 | Always include `images` with `/og-image.jpg` fallback |
| `src/app/furniture/[slug]/page.tsx` | 33 | Strip `\| Patina` from `"Product Not Found \| Patina"`; also call `notFound()` here so route returns 404 instead of 200 |
| `src/app/furniture/[slug]/page.tsx` | 38–41 | Expand metadata: add `openGraph`, `alternates.canonical`, `keywords` |
| `src/app/furniture/page.tsx` | (new) | Render `ItemList` JSON-LD for the products array; add `alternates.canonical` |
| `src/app/materials/page.tsx` | (new) | Render `ItemList` JSON-LD; add `alternates.canonical` + `openGraph` |
| `src/app/journal/page.tsx` | (new) | Render `CollectionPage` + `ItemList` JSON-LD |
| `src/app/makers/page.tsx` | 10–15 | Add `alternates.canonical`, `openGraph` block; render `ItemList` JSON-LD for makers |
| `src/app/makers/apply/page.tsx` | 7–11 | Add `alternates.canonical` + `openGraph` |
| `src/app/about/page.tsx` | 20–27 | Add `alternates.canonical`, `openGraph.url`; render `BreadcrumbList` |
| `src/app/services/page.tsx` | 10–13 | Add `alternates.canonical`, `openGraph` block; render `BreadcrumbList` |
| `src/app/contact/page.tsx` | 7–11 | Add `alternates.canonical` + `openGraph` |
| `src/app/careers/page.tsx` | 7–13 | Add `alternates.canonical` + `openGraph` |
| `public/robots.txt` | — | Delete; `src/app/robots.ts` is the source of truth |
| **Vercel project settings** | — | `NEXT_PUBLIC_SITE_URL` → `https://patina.cloud` (no whitespace, no newline) |
| **Deploy** | — | `git add -A && git commit && git push` (the highest-leverage action of the month) |

---

## Notes & Constraints

- **`marketing:seo-audit` skill not available.** The task description references a `marketing:seo-audit` skill that isn't installed in this environment. This audit ran the equivalent methodology manually (technical checks, on-page audit, JSON-LD validation via curl + python, MoM comparison to the May report). If the skill is meant to be installed, that's a setup task for next cycle.
- **No SEO tool connection.** This audit could not pull keyword rankings, search volumes, keyword difficulty, or backlink data. See Strategic Investment G.
- **Live-site HTML is large.** Curl bodies for catalog and journal pages exceed inline limits; analysis was done via `grep` + targeted `python` regex extraction rather than reading full HTML. Schema validation should be re-run against [Schema Markup Validator](https://validator.schema.org) and [Rich Results Test](https://search.google.com/test/rich-results) once the canonical-host fix ships.
- **No code changes were made.** Per task instructions, this report only identifies what to change.
- **Competitor research sources for this audit:** [Beyond Havenly — Oblist](https://oblist.com/blogs/editorial/beyond-havenly-curated-alternatives-for-interior-design-2026), [Modsy alternatives — Remodel AI](https://www.remodelai.io/blog/modsy-alternatives), [Havenly alternatives — Remodel AI](https://www.remodelai.io/blog/havenly-alternatives), [Decorilla vs Havenly](https://www.decorilla.com/online-decorating/decorilla-vs-havenly-which-online-interior-design-service-is-right-for-you/), [Best Curated Furniture Marketplaces 2026 — Oblist](https://oblist.com/blogs/editorial/the-best-curated-furniture-marketplaces-ranked-for-2026).

---

*Next scheduled run: 2026-07-01.*
