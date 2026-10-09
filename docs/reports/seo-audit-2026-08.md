# Patina SEO Audit — August 2026

**Audit date:** 2026-08-01
**Site audited:** https://patina.cloud
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** `docs/reports/seo-audit-2026-07.md`

---

## Executive Summary

- **The July 10 fixes are written but not shipped.** Commit `039e75e` (2026-07-10) fixed the `| Patina | Patina` title doubling across every page — exactly what July's report asked for — but the live site is still serving a build from ≤ June 23. Live-confirmed today: `/about` → `Our Story | Patina | Patina`, `/journal` → `The Designer's Eye — Journal | Patina | Patina`, `/furniture` and journal posts likewise doubled. **One redeploy makes July's #2 quick win real.** Deployment staleness — resolved in July — has regressed (~5.5 weeks since the last live build).
- **The wrong env var enters month four.** Live `og:url`, default `og:image`, and every `twitter:image` still resolve to `patina-website.vercel.app`. `src/lib/site-url.ts` defaults correctly to `https://patina.cloud`, so the fix remains: correct or delete `NEXT_PUBLIC_SITE_URL` in Vercel and redeploy. This pairs naturally with the redeploy above — one action clears both of the two oldest open items.
- **`og-image.jpg` and `logo.png` still don't exist.** `public/` remains without both files. Social previews are broken site-wide (blank cards on iMessage, LinkedIn, X, Slack) and the Organization/Article JSON-LD `logo` still 404s, suppressing rich-result eligibility. Flagged as new in July; no movement.
- **Journal enters month five frozen at 3 posts** (all April 3–7, all Tier-2 build narrative). Zero Tier-1 question-answering and zero Tier-3 reference content — the formats the visibility plan says AI systems cite. August search confirms the "Havenly alternatives" / "room scanning furniture app" queries are owned by third-party roundups (Oblist, Product Hunt, Remodel AI, Ark7, MeltFlex); **Patina appears in none of them.** This is now the single largest gap against plan.
- **One July recommendation is obsolete:** `/careers` was converted to an honest "not hiring yet" state in `039e75e`, so the `JobPosting` schema investment (July Strategic D) is withdrawn until real roles exist.

Overall: **a month of written-but-unshipped progress.** The code moved (3 commits on July 10: title fixes, messaging unification, analytics surface); production didn't. Every quick win below except one starts with the same verb: deploy.

---

## Top 3 Quick Wins (Kody — this week)

1. **Redeploy — and fix the env var in the same motion.** The July 10 commits (title-doubling fix, messaging system, contact API) exist only in git. Before triggering the deploy, go to Vercel → Settings → Environment Variables and set `NEXT_PUBLIC_SITE_URL=https://patina.cloud` **or delete it** (the `site-url.ts` default is correct). One deploy then simultaneously: kills the doubled titles on ~15 routes, fixes `og:url`/`og:image`/`twitter:image` hosts, corrects the sitemap/robots host, and ships the unified messaging copy. This is two of the three oldest open items resolved in ~10 minutes.

2. **Add `public/og-image.jpg` (1200×630) and `public/logo.png` (square transparent PNG, ≥112×112).** Third month broken. Every page references them (`src/lib/seo.ts:39,50,109` and Article `publisher.logo`); both 404. No code change needed — just export the assets and include them in the deploy above. Restores social share previews site-wide and unblocks Organization/Article rich results.

3. **Add the default canonical + de-hard-code the Twitter card in `src/lib/seo.ts`.** Two small edits, both carryovers: (a) add `alternates: { canonical: "./" }` to `defaultMetadata` (line 7) — covers the ~13 pages that render no canonical today; (b) remove the hard-coded `title`/`description` from the default `twitter` block (lines 46–51) so X reads each page's `og:` values instead of showing the homepage card on every inner page (live-confirmed on `/about`, `/journal`, and journal posts today).

---

## Quick Wins (full list)

### 1. Deploy the July 10 commits (CRITICAL — NEW, gates everything)
**Where:** Vercel dashboard. Note: the July 10 commits **are already pushed to origin/main** (only the 07-30 docs commit is local-only), so if auto-deploy is wired to GitHub it has failed or been disconnected — check the Vercel Deployments tab for a failed build before assuming a manual redeploy suffices.
**Symptom (live):** Doubled `<title>` confirmed on `/about`, `/journal`, `/furniture`, `/journal/why-were-building-patina` — despite the fix existing in source since July 10. Live `og:title` on `/journal` matches pre-July source.
**Fix:** Trigger a production deploy after correcting the env var (#2). Verify by viewing source on `/about` — title should read `Our Story | Patina` (single).
**Impact:** Ships 3 weeks of committed SEO + messaging work. Nothing else in this list matters until this happens.

### 2. Correct/delete `NEXT_PUBLIC_SITE_URL` in Vercel (CRITICAL — carryover, 4th month)
Same as July #1. Set to exactly `https://patina.cloud` or delete (code default is correct). Live evidence today: homepage and `/furniture` `og:url: https://patina-website.vercel.app`; every `twitter:image` on the vercel.app host. Do it before #1's deploy so one build picks up both.

### 3. Create `og-image.jpg` + `logo.png` (HIGH — carryover, 3rd month)
Verified absent again today (`public/` holds only SVGs, css, llms.txt, robots.txt, images/partners). References: `seo.ts:39,50,109`, Article `publisher.logo`, `apple-touch-icon.png` (`seo.ts:65`, also absent — minor). Export both, drop in `/public`, include in the deploy.

### 4. Default canonical in `defaultMetadata` (HIGH — carryover)
**Where:** `src/lib/seo.ts:7`. Add `alternates: { canonical: "./" }`. Canonicals currently exist on only 5 routes (`/journal`, `/journal/[slug]`, `/waitlist` [dead — redirects], `/designers`, `/founding`); missing on `/`, `/about`, `/app`, `/services`, `/furniture`, `/furniture/[slug]`, `/makers`, `/makers/apply`, `/materials`, `/contact`, `/careers`, `/privacy`, `/terms`.

### 5. De-hard-code the default `twitter` block (MEDIUM — carryover)
**Where:** `src/lib/seo.ts:46–51`. Remove `title`/`description` (keep `card`); X falls back to `og:`. Live-confirmed today: `/about` and journal posts serve the homepage `twitter:title`/`twitter:image`.

### 6. Journal `og:image` fallback (MEDIUM — carryover)
**Where:** `src/app/journal/[slug]/page.tsx` (openGraph images conditional on `coverImageUrl`). Live: `/journal/why-were-building-patina` emits **no** `og:image`. Fix: `images: [{ url: post.coverImageUrl || "/og-image.jpg" }]` — works once #3 ships.

### 7. Remove `fallbackProductSlugs` from the sitemap (HIGH — carryover)
**Where:** `src/app/sitemap.ts:11–18, 71–83` — unchanged since July. `/furniture` live shows "Showing 0 pieces"; Sanity still has zero products; the sitemap still advertises 6 `/furniture/{slug}` URLs that 404. Remove the array (or populate Sanity).

### 8. Lower `/furniture` sitemap priority (MEDIUM — carryover)
**Where:** `src/app/sitemap.ts:38` — still `priority: 0.9, changeFrequency: "daily"` on an empty, near-orphaned catalog page. Drop to `0.5`/`monthly` until products exist.

### 9. Delete `public/robots.txt` (LOW — carryover)
Both `public/robots.txt` and `src/app/robots.ts` still exist and still differ (static blocks `?sort=`/`?filter=`; dynamic blocks `/studio/`, `/api/`, `/_next/`). Keep `robots.ts` as sole source; fold in the query-param disallows.

### 10. Homepage title + keywords (LOW — carryover)
`seo.ts:10` title still 62 chars without `app`/`AR`/`room scan`; `seo.ts:14–26` keyword list still omits plan targets (`designer-taught`, `room scanning furniture app`, `alternatives to Havenly/Wayfair`, `Madison Wisconsin furniture`).

### 11. Alt-text + self-hosted imagery (LOW — carryover)
Homepage/`/about` heroes still hot-link Unsplash with generic alts (`"Living space with natural materials and warm light"` live today). Rewrite alts keyword-rich; self-host so imagery can double as OG/cover assets.

---

## Strategic Investments (this quarter)

### A. Break the journal freeze — publish Tier-1 content (carryover — 5th month, top priority)
Live `/journal` still shows exactly 3 posts (April 3–7). Plan cadence (visibility plan §2.1) called for 2–4/month from April — the site is now ~8–14 posts behind, with zero Tier-1 and zero Tier-3 content. Ship the four highest-citation titles first: "How to Tell If Furniture Will Last 20 Years," "What AR Room Scanning Actually Tells You About Your Space," "How Designers Choose Furniture for Clients," "The Real Difference Between $800 and $3,000 Furniture." 3–4h each. Highest impact of anything in this report — every stalled month is lost compounding AI-citation authority.

### B. Comparison surface for "alternatives" queries (carryover — freshly re-validated)
August search of "room scanning furniture app / Havenly alternatives 2026": winners are Oblist, Product Hunt's alternatives page, Remodel AI (two posts), Ark7, and MeltFlex — roundups listing Decorilla, Spacejoy, Magicplan, Modsy(!), RoomGenius. **Patina appears nowhere.** A `/compare` route or "Havenly/Wayfair alternatives" journal post with `Service` + `FAQPage` schema is the only way to surface for switching-intent queries. ~1–2 days.

### C. Schema helpers: `FAQPage`, `ItemList`, `CollectionPage` (carryover)
Still zero instances anywhere. Add `generateFaqJsonLd()`, `generateItemListJsonLd()`, `generateCollectionPageJsonLd()` to `src/lib/seo.ts`; wire into `/journal`, `/materials`, `/makers`, `/furniture`. Pair FAQ schema with the first Tier-3 piece. Half day.

### D. Journal category hub-and-spoke (carryover)
Four categories defined in `src/app/journal/page.tsx` with no `/journal/category/[slug]` route. ~1 day. (Becomes meaningful once A restarts publishing.)

### E. Designer & maker profile routes (carryover)
`/designers/[slug]`, `/makers/[slug]` with `Person`/`Organization` schema once Founding 50 / founding makers are named. ~3 days per route.

### F. Connect GSC + an SEO tool (carryover — still blocking measurement)
Fourth consecutive report unable to state a single real keyword ranking, impression count, or backlink. GSC is free and ~30 min once the host fix ships (submit the sitemap immediately). Ahrefs/Semrush (~$99/mo) is already budgeted in the visibility plan §5. Until this happens, "keyword rankings" in the task spec is unanswerable.

### G. Install the `marketing:seo-audit` skill (carryover — setup)
Still not installed in the automation environment; this run reproduced the methodology manually for the third time.

### ~~JobPosting schema on /careers~~ (WITHDRAWN)
July's Strategic D is obsolete: commit `039e75e` converted `/careers` to an honest "not hiring yet" page. Revisit when real roles exist.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | |
| Deployment recency | ❌ **Regressed** | Live build ≤ 2026-06-23; commits of 07-10 undeployed (~3 wks); last code deploy ~5.5 wks ago |
| Local code committed | ⚠️ Warning | Tree clean except untracked `docs/reports/*` (Jul reports), `AGENTS.md`, `.agents/`, `.serena/` — commit or ignore |
| Canonical hostname | ❌ Fail (4th month) | `og:url`/`twitter:image` = `patina-website.vercel.app` (live-confirmed `/`, `/furniture`) |
| Title doubling (source) | ✅ **Fixed in source** | `039e75e` stripped `\| Patina` from all page titles |
| Title doubling (live) | ❌ Fail | `/about`, `/journal`, `/furniture`, journal posts all doubled — fix undeployed |
| `<link rel="canonical">` coverage | ❌ Fail | 4 live routes + 1 dead (`/waitlist`); ~13 pages missing |
| `og-image.jpg` / `logo.png` exist | ❌ Fail (3rd month) | Both absent from `public/` |
| Twitter card per-page | ❌ Fail | Inner pages inherit homepage card (live-confirmed) |
| AI crawler allowlist | ✅ Pass | 7 UAs in `robots.ts`; `llms.txt` present |
| Organization / WebSite JSON-LD | ⚠️ Warning | Present; `url` host wrong + `logo` 404 |
| SoftwareApplication / Service / AboutPage | ✅ Pass | Rendered |
| Article JSON-LD on posts | ⚠️ Warning | Rendered; `publisher.logo` 404 |
| BreadcrumbList on hubs | ❌ Fail | Detail pages only |
| Product JSON-LD | ⚠️ N/A | Sanity still 0 products |
| FAQ / ItemList / CollectionPage | ❌ Fail | None anywhere |
| Sitemap validity | ❌ Fail | 6 fallback `/furniture/{slug}` URLs 404 |
| Sitemap `lastmod` | ⚠️ Warning | Build-time `now` on static routes |
| Dual robots files | ⚠️ Warning | `public/robots.txt` + `app/robots.ts` still coexist |
| `/waitlist` redirect | ✅ Pass | 308 → `/founding` |
| Mobile-friendly | ✅ Pass | |

---

## Content Gap (unchanged core, re-validated)

Patina still has no content mapping to any informational or commercial query. Priorities identical to July, reordered only by the deploy dependency:

| Topic | Format | Priority | Effort |
|---|---|---|---|
| "What AR room scanning actually tells you" | Tier-1 + Article schema | High | 3–4h |
| "How to tell if furniture will last 20 years" | Tier-1 + FAQPage | High | 3–4h |
| Havenly/Wayfair/Houzz alternatives comparison | `/compare` or journal + FAQ schema | High | 1–2d |
| "How designers choose furniture for clients" | Tier-1 | High | 3–4h |
| Furniture care guide (wood/leather/linen/stone) | Tier-3 + FAQPage | Medium | 4h |
| Designer/maker profile routes | Person/Org schema | Medium (blocked on naming) | 3d |
| Madison, WI local page + LocalBusiness schema | Local | Medium | 4h |

---

## Month-over-Month Delta

| Metric | July 1 | Aug 1 | Direction |
|---|---|---|---|
| Deployment recency | ✅ current | ❌ 07-10 commits undeployed | **Regressed** |
| Title doubling — source | Fail | **Fixed** (`039e75e`) | ✅ Improved |
| Title doubling — live | Fail | Fail | ❌ No change (needs deploy) |
| Canonical hostname (env var) | Fail (3rd mo) | Fail (4th mo) | ❌ No change |
| `og-image.jpg` / `logo.png` | Absent | Absent | ❌ No change |
| Twitter card per-page | Fail | Fail | ❌ No change |
| Default canonical | Missing | Missing | ❌ No change |
| Sitemap fallback 404s | 6 URLs | 6 URLs | ❌ No change |
| Journal posts | 3 (April) | 3 (April) | ❌ Frozen, 5th month |
| Sanity products | 0 | 0 | ❌ No change |
| FAQ/ItemList/CollectionPage | 0 | 0 | ❌ No change |
| `/careers` honesty | Fabricated roles | "Not hiring yet" | ✅ Improved (JobPosting rec withdrawn) |
| Messaging system doc | — | `docs/messaging/patina-messaging-system.md` shipped | ✅ New asset |
| Patina in "alternatives" roundups | 0 mentions | 0 mentions | ❌ No change |

**Net:** July produced real committed work (title fix, messaging unification, honest careers page) — but none of it reached production, and the four structural carryovers (env var, OG assets, canonicals, sitemap 404s) are all untouched. The entire quick-win list now collapses into: *fix one env var, add two image files, make two seo.ts edits, delete one array — then deploy once.*

---

## File-Level Recommendations

| File | Line | Change |
|---|---|---|
| **Vercel env settings** | — | `NEXT_PUBLIC_SITE_URL` → `https://patina.cloud` or delete. **Then deploy — this ships the July 10 title fixes too.** |
| `public/og-image.jpg` | (new) | 1200×630 branded OG card |
| `public/logo.png` | (new) | Square transparent PNG ≥112×112 |
| `src/lib/seo.ts` | 7 | Add `alternates: { canonical: "./" }` to `defaultMetadata` |
| `src/lib/seo.ts` | 46–51 | Remove hard-coded `title`/`description` from default `twitter` block |
| `src/lib/seo.ts` | 10, 14–26 | Shorter term-rich homepage title; append plan keywords |
| `src/lib/seo.ts` | (new) | `generateFaqJsonLd()`, `generateItemListJsonLd()`, `generateCollectionPageJsonLd()` |
| `src/app/sitemap.ts` | 11–18, 71–83 | Remove `fallbackProductSlugs` + usages |
| `src/app/sitemap.ts` | 38 | `/furniture` → `priority: 0.5, changeFrequency: "monthly"` |
| `src/app/journal/[slug]/page.tsx` | og block | `images: [{ url: post.coverImageUrl || "/og-image.jpg" }]` |
| `public/robots.txt` | — | Delete; fold `?sort=`/`?filter=` disallows into `app/robots.ts` |
| `docs/reports/*` (untracked) | — | Commit July reports + `AGENTS.md` (or add to `.gitignore`) |

*(The ~15 per-page title edits listed in July's table are already done in source — no action beyond deploying.)*

---

## Notes & Constraints

- **`marketing:seo-audit` skill not installed** (3rd month). Methodology reproduced manually: source audit, live meta/title/OG extraction via web fetch, competitive search, MoM comparison against the July report.
- **No SEO data source connected.** Real rankings/impressions/backlinks remain unquantifiable (Strategic F). Keyword presence was spot-checked via web search: Patina absent from all first-page roundups for "Havenly alternatives" and "room scanning furniture app 2026" (Oblist, Product Hunt, Remodel AI, Ark7, MeltFlex own these).
- **JSON-LD validated from source generators + render sites**, not scraped live (fetch doesn't surface `<script>` blocks). Re-run Google Rich Results Test after the deploy + logo ship.
- **Pages verified live this run:** `/`, `/about`, `/journal`, `/journal/why-were-building-patina`, `/furniture`.
- **No code changes made** — report-only per task constraints. Autonomous run; no clarifying questions.

---

*Next scheduled run: 2026-09-01.*
