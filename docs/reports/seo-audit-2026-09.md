# Patina SEO Audit — September 2026

**Audit date:** 2026-09-01
**Site audited:** https://patina.cloud
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** `docs/reports/seo-audit-2026-08.md`

---

## Executive Summary

- **The deploy happened — and it worked.** Commit `3e8212a` (2026-08-11) put the July 10 work into production. Title doubling is now genuinely fixed live on `/about` (`Our Story | Patina`), `/app`, `/furniture`, `/signup`, and journal posts. August's #1 blocker is closed. One exception: **`/journal` still serves `The Designer's Eye — Journal | Patina | Patina`** even though the source has been correct since July 10 and its own child routes are current — a stale cached route, not a code bug (see Quick Win 2).

- **Patina ranks for its own name for the first time in five audits.** A brand query now returns `patina.cloud/app` as the #1 result. Real progress. But the same SERP is crowded with eight unrelated "Patina" home businesses (Patina Interiors, Patina Stores, rentpatina, Patina Inc, Patina Polished Living) **and an existing "Patina" app already live in the iOS App Store** (*Patina — The Resale Wizard*, id6747730655). That's a direct ASO collision against visibility-plan Track 4, and it's new information that should shape the App Store listing before launch.

- **NEW — the site emits no `og:image` on 8 of its routes**, and this is a code defect, not the env-var issue. Next.js shallow-merges `metadata`: any page declaring `openGraph` **replaces** the parent object rather than extending it, so `images` from `defaultMetadata` is dropped. Proven live by natural experiment: `/furniture` (declares no `openGraph`) emits `og:image`; `/about`, `/journal`, `/signup` (which do declare one) emit **none at all**. Every page with a hand-written OG block — the ones most likely to be shared — has the most broken social card.

- **The env var enters month five.** Live `og:url` and every `twitter:image` still resolve to `patina-website.vercel.app`. `src/lib/site-url.ts:5` defaults correctly to `https://patina.cloud`, so the fix remains a Vercel settings change, not a code change. `og-image.jpg` and `logo.png` are still absent from `public/` (4th month) — so even once the host is right, the image 404s.

- **Journal enters month six frozen at 3 posts** (April 3–7, all Tier-2). Still zero Tier-1 and zero Tier-3 content. Encouraging detail from this month's search: the SERP for "how to tell if furniture will last 20 years" is owned entirely by *small furniture-retailer blogs* (Hudson's, Ehlers, Moore's, Nova, Maple Manor) — not Wayfair, not Houzz. **This is a winnable page-one, and one genuinely expert article from Leah would likely take it.** The gap isn't a fight against giants; it's an unclaimed space.

Overall: **the first month in four where production moved forward.** The blocker list is now shorter and more surgical — one settings change, two image files, four small `seo.ts` edits, one cache purge.

---

## Top 3 Quick Wins (Kody — this week)

1. **Fix the OG image inheritance in `src/lib/seo.ts` — one helper, eight routes fixed.** Because Next.js overwrites rather than merges `openGraph`, every page with a custom OG block silently loses its image. Add a small helper next to `defaultMetadata` and use it in each page's metadata:

   ```ts
   // src/lib/seo.ts
   export const defaultOgImages = [
     { url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Patina — Where Time Adds Value" },
   ];
   ```

   Then in each page that declares `openGraph`, add `images: defaultOgImages`. Affected: `about/page.tsx:22`, `app/page.tsx:20`, `designers/page.tsx:11`, `founding/page.tsx:11`, `journal/page.tsx:15`, `signup/page.tsx:10`, `waitlist/page.tsx:11`, and `journal/[slug]/page.tsx:77` (make the conditional fall back rather than omit). ~20 minutes, and it makes Quick Win 3 actually visible.

2. **Set `NEXT_PUBLIC_SITE_URL` correctly, add the two missing images, and redeploy — one motion.**
   - Vercel → Settings → Environment Variables: set `NEXT_PUBLIC_SITE_URL=https://patina.cloud` **or delete it** (the `site-url.ts:5` default is already correct). Fifth month open.
   - Add `public/og-image.jpg` (1200×630) and `public/logo.png` (square transparent PNG, ≥112×112). Fourth month absent; both are referenced by `seo.ts:39`, `seo.ts:50`, `seo.ts:109`, and `seo.ts:279` and currently 404, which suppresses Organization/Article rich-result eligibility.
   - The redeploy also clears the stale `/journal` route. Verify after: `/journal` title should read `The Designer's Eye — Journal | Patina` (single). If it doesn't, purge the CDN cache for that path specifically — the source is already correct, so a persistent double means an edge cache, not a build.

3. **Add the default canonical and de-hard-code the Twitter block in `src/lib/seo.ts`.** Both carryovers, both two-line edits:
   - `seo.ts:7` — add `alternates: { canonical: "./" }` to `defaultMetadata`. Canonicals currently exist on only 5 live routes (`/journal`, `/journal/[slug]`, `/designers`, `/founding`, `/signup`) plus dead `/waitlist`; ~13 pages render none.
   - `seo.ts:46–51` — remove the hard-coded `title` and `description` from the default `twitter` block (keep `card`). Live-confirmed today: `/about`, `/journal`, `/signup`, and journal posts all serve the *homepage* `twitter:title` and `twitter:description`, so every page shared on X presents as the homepage.

---

## Quick Wins (full list)

### 1. OG images lost on every page with a custom `openGraph` block (HIGH — NEW)
**Where:** `src/lib/seo.ts:37–44` (source of truth) + the 8 pages listed in Top-3 #1.
**Evidence (live, today):** `/about`, `/journal`, `/signup`, `/journal/why-were-building-patina` emit **no `og:image`, no `og:type`, no `og:site_name`**. `/furniture`, which declares no `openGraph`, emits all three correctly. Same build — the difference is the override.
**Fix:** Export `defaultOgImages` from `seo.ts` and spread it into each page's `openGraph`.

### 2. `/journal` serving a pre-July-10 cached build (MEDIUM-HIGH — NEW)
**Evidence:** Live title `The Designer's Eye — Journal | Patina | Patina`. Source (`src/app/journal/page.tsx:12`) has read `"The Designer's Eye — Journal"` since commit `039e75e`, and `title.template` (`seo.ts:11`) appends exactly one `| Patina`. The current source **cannot** produce the live string. Sibling `/journal/why-were-building-patina` and `/about` are both current, so this is path-scoped, not a global staleness.
**Fix:** Redeploy; if it persists, purge the edge cache for `/journal`. Verify by view-source.

### 3. Correct/delete `NEXT_PUBLIC_SITE_URL` (CRITICAL — carryover, 5th month)
Live `og:url` on `/` and `/furniture` = `https://patina-website.vercel.app`; every `twitter:image` on the same host. Code default (`src/lib/site-url.ts:5`) is already `https://patina.cloud` — this is purely a Vercel settings fix.

### 4. Create `og-image.jpg` + `logo.png` (HIGH — carryover, 4th month)
Verified absent again today; `public/` holds only SVGs, `css/`, `images/partners/`, `llms.txt`, `robots.txt`, `patina-design-system.css`. `apple-touch-icon.png` (`seo.ts:65`) also absent — minor, but ship it in the same batch.

### 5. Default canonical in `defaultMetadata` (HIGH — carryover)
`src/lib/seo.ts:7`. Missing on `/`, `/about`, `/app`, `/services`, `/furniture`, `/furniture/[slug]`, `/makers`, `/makers/apply`, `/materials`, `/contact`, `/careers`, `/privacy`, `/terms`.

### 6. De-hard-code the default `twitter` block (MEDIUM — carryover)
`src/lib/seo.ts:46–51`. Live-confirmed on four routes today.

### 7. `/signup` is indexable and cannibalizes `/founding` (MEDIUM — NEW)
**Where:** `src/app/signup/page.tsx:6–18`, `src/app/sitemap.ts:44`.
`/signup` is a bare account-creation form — thin content, no unique informational value — currently `index, follow` with sitemap `priority: 0.8`. It targets the same intent and nearly the same copy as `/founding` ("makes you a member of the Founding Circle"), which is also 0.8. Two indexable pages competing for one query.
**Fix:** Either add `robots: { index: false, follow: true }` to the `/signup` metadata and remove it from `sitemap.ts:44`, or point its canonical at `/founding`. Keep `/founding` as the indexable surface. (The SMS-consent function of the page is unaffected — `noindex` doesn't block the form.)

### 8. Homepage footer has drifted from the shared footer (MEDIUM — NEW)
**Where:** `src/components/sections/HomepageFooter/HomepageFooter.tsx:5–25, 83, 89` vs `src/components/layout/Footer/Footer.tsx:9, 136`.
The homepage uses `HomepageFooter`, which omits **`/materials`** (present at `Footer.tsx:9`) and **`/signup`** (present at `Footer.tsx:136`). Its legal row carries only Privacy and Terms. Net effect: the site's highest-authority page passes zero internal link equity to two routes that every other page links to. Confirmed live — compare the footer on `/` against `/about`.
**Fix:** Add both entries to the `HomepageFooter` link groups, or have it consume the same link array as `layout/Footer`.

### 9. `/app` final CTA anchor text doesn't match its destination (MEDIUM — NEW)
**Where:** Sanity `appPage` document, fields `ctaSecondaryText` / `ctaSecondaryLink` (rendered via `src/app/app/page.tsx` → `AppCTA`).
Live `/app` renders the anchor **"browse our collection"** pointing at **`/about`**. Descriptive anchor text is a stated goal of the visibility plan (§2.2 rule 7); this actively misleads crawlers about what `/about` is. Not a code change — fix the Sanity fields. Point it at `/furniture` or relabel it "meet the founders."

### 10. Homepage `<h1>` is just the wordmark (MEDIUM — NEW)
**Where:** `src/components/sections/HomepageHero/HomepageHero.tsx:232–242`.
The `<h1>` on the site's most authoritative page is the single word **"PATINA."** All positioning language ("Where Time Adds Value", "Learn your space. Find what belongs.") sits in lower-level elements. The strongest on-page ranking signal available is spending itself on a word the brand already ranks for.
**Fix:** Keep the visual treatment, extend the `<h1>` to carry the positioning — e.g. `PATINA — Designer-Curated Furniture for Real Rooms` with the tagline visually styled but inside the heading, or move `<h1>` to the statement line and demote the wordmark to a `<p>` with `aria-hidden`.

### 11. Remove `fallbackProductSlugs` from the sitemap (HIGH — carryover)
`src/app/sitemap.ts:11–18, 72–84`. Unchanged. `/furniture` live still shows **"Showing 0 pieces"**; Sanity still has zero products; the sitemap still advertises 6 `/furniture/{slug}` URLs that 404. Six known-bad URLs in a 21-URL sitemap is a meaningful quality signal against the whole file.

### 12. Lower `/furniture` sitemap priority (MEDIUM — carryover)
`src/app/sitemap.ts:38` — still `priority: 0.9, changeFrequency: "daily"` on an empty catalog that no footer links to. Drop to `0.5` / `monthly` until products exist.

### 13. Dual robots files (LOW — carryover)
Both `public/robots.txt` and `src/app/robots.ts` still exist and still differ: the static file blocks `?sort=` / `?filter=` but **not** `/studio/`; the dynamic one blocks `/studio/`, `/api/`, `/_next/` but not the query params. In Next.js a static `public/robots.txt` takes precedence over the metadata route, which would mean the Sanity Studio is currently crawlable. *Could not verify live this run — `/robots.txt` was blocked by the fetch provenance rule.* Resolve by deleting `public/robots.txt` and folding the query-param disallows into `robots.ts:41`.

### 14. Homepage title + keywords (LOW — carryover)
`seo.ts:10` is 64 characters and contains none of `app`, `AR`, or `room scan`. `seo.ts:14–26` still omits the plan's own targets: `designer-taught`, `room scanning furniture app`, `alternatives to Havenly`, `Madison Wisconsin furniture`.

### 15. Alt text + self-hosted imagery (LOW — carryover)
`HomepageHero.tsx:190` still reads `alt="Living space with natural materials and warm light"` on a hot-linked Unsplash URL. Every hero across `/`, `/about`, and `/app` is hot-linked. Self-hosting would let the same assets double as OG and journal cover images — which would partly solve Quick Win 4 for free.

---

## Strategic Investments (this quarter)

### A. Break the journal freeze — and start with the winnable SERP (carryover — 6th month, top priority)
Live `/journal` still shows exactly 3 posts, all April 3–7. The plan (§2.1) called for 2–4/month from April; the site is now roughly 10–17 posts behind.

**What's new and useful this month:** the target SERPs are weaker than assumed. "How to tell if furniture will last 20 years" is held by Hudson's Furniture, Ehlers, Moore's, Nova Furniture Mall, Maple Manor, and Wooden Edge Studios — small retailer blogs with generic, largely interchangeable content. No Wayfair, no Houzz, no Architectural Digest. Leah's actual sourcing knowledge (specific joinery, Janka numbers, named failure modes) would be categorically better than everything ranking.

Ship in this order:
1. "How to Tell If Furniture Will Last 20 Years" — weakest competition, highest citation potential
2. "What AR Room Scanning Actually Tells You About Your Space" — the only one that also does product work
3. "How Designers Choose Furniture for Clients (The Real Process)"
4. "The Real Difference Between $800 and $3,000 Furniture"

3–4h each. This remains the highest-impact item in the report.

### B. Comparison surface for "alternatives" queries (carryover — re-validated, and the SERP is churning)
September search of "Havenly alternatives 2026": Oblist, Decorilla, Product Hunt, Remodel AI (two posts), Paintit.ai. Patina appears nowhere. Notably the "room scanning" SERP has **turned over almost completely since August** — last month's winners (Ark7, MeltFlex) are gone; this month's are GlamAR, DecorViz, First Chair, SkyeBrowse, Polycam, Scaniverse, magicplan, KIRI Engine. High churn means low incumbent authority, which means a genuinely good comparison page can enter quickly. A `/compare` route or journal post with `Service` + `FAQPage` schema. ~1–2 days.

### C. Brand disambiguation + ASO collision (NEW — do before App Store submission)
The brand query surfaces `patina.cloud/app` first (a win), but also: Patina Interiors, Patina Stores, rentpatina.com, patinainc.com, Patina Polished Living, patinadurhamnc.com — all home/furniture businesses — **and `Patina — The Resale Wizard` already shipping on the iOS App Store (id6747730655).** The visibility plan's ASO section (§4.1) assumes "Patina" is available as an app name; it isn't unambiguous. Search results also failed to associate the brand with Madison, Wisconsin at all.

Actions: (1) confirm the App Store display name early — "Patina: Designer Furniture" or similar disambiguator may be forced; (2) build the Madison, WI page with `LocalBusiness` schema to claim the geographic modifier no other Patina owns; (3) tighten Organization `sameAs` (`seo.ts:152–156` currently lists Instagram and LinkedIn URLs — verify both resolve, since a 404 in `sameAs` weakens entity resolution).

### D. Schema helpers: `FAQPage`, `ItemList`, `CollectionPage` (carryover)
Still zero instances anywhere in `src/`. Add `generateFaqJsonLd()`, `generateItemListJsonLd()`, `generateCollectionPageJsonLd()` to `src/lib/seo.ts`; wire into `/journal`, `/materials`, `/makers`, `/furniture`. Pair the FAQ helper with the first Tier-3 piece. Half day.

### E. `BreadcrumbList` on hub pages (carryover)
Currently only on `/furniture/[slug]:74` and `/journal/[slug]:175`. Hubs (`/journal`, `/furniture`, `/makers`, `/materials`) have none.

### F. Journal category hub-and-spoke (carryover)
Four categories render on `/journal` ("Building Patina", "Design Thinking", "Maker Stories" visible live) with no `/journal/category/[slug]` route. ~1 day — becomes meaningful once A restarts publishing.

### G. Designer & maker profile routes (carryover)
`/designers/[slug]`, `/makers/[slug]` with `Person` / `Organization` schema, once the Founding 50 and founding makers are named. ~3 days per route.

### H. Connect Google Search Console + an SEO tool (carryover — 5th month, still blocking measurement)
This is the fifth consecutive report that cannot state a single real keyword position, impression count, or backlink. Everything in the "rankings" section of this report is inferred from public SERP inspection. GSC is free and ~30 minutes once the host fix ships — submit the sitemap the same day. Ahrefs/Semrush (~$99/mo) is already budgeted in visibility plan §5.

### I. Install the `marketing:seo-audit` skill (carryover — setup, 4th month)
Not present in the automation environment. This run reproduced the methodology manually for the fourth time. Worth either installing it or accepting the manual path and deleting the reference from the task file.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | |
| Deployment recency | ✅ **Fixed** | `3e8212a` deployed 2026-08-11; July work is live |
| Local code committed | ⚠️ Warning | Tree clean except untracked `docs/reports/*` (15 files), `AGENTS.md`, `.agents/`, `.serena/`, `.claude/settings.local.json` |
| HEAD in sync with origin | ✅ Pass | `3e8212a` on both |
| Canonical hostname | ❌ Fail (5th month) | `og:url` / `twitter:image` = `patina-website.vercel.app` (live: `/`, `/furniture`) |
| Title doubling (source) | ✅ Pass | Fixed in `039e75e` |
| Title doubling (live) | ⚠️ Warning | Fixed on `/about`, `/app`, `/furniture`, `/signup`, journal posts; **`/journal` still doubled** (stale route) |
| `<link rel="canonical">` coverage | ❌ Fail | 5 live routes + 1 dead (`/waitlist`); ~13 pages missing |
| `og:image` presence | ❌ **Fail (NEW)** | Absent on all 8 routes that declare `openGraph`; present only where the default is inherited |
| `og-image.jpg` / `logo.png` exist | ❌ Fail (4th month) | Both absent from `public/` |
| Twitter card per-page | ❌ Fail | Inner pages inherit the homepage card (live: `/about`, `/journal`, `/signup`, journal post) |
| AI crawler allowlist | ✅ Pass | 7 UAs in `robots.ts`; `llms.txt` present in `public/` |
| Organization / WebSite JSON-LD | ⚠️ Warning | Wired at `layout.tsx:45–46`; `url` host wrong + `logo` 404s |
| SoftwareApplication / Service / AboutPage | ✅ Pass | Wired at `app/page.tsx:91`, `services/page.tsx:220`, `about/page.tsx:62` |
| Article JSON-LD on posts | ⚠️ Warning | Wired at `journal/[slug]:167`; `publisher.logo` 404s |
| BreadcrumbList | ⚠️ Warning | Detail pages only (`furniture/[slug]:74`, `journal/[slug]:175`); no hubs |
| Product JSON-LD | ⚠️ N/A | Generator exists (`seo.ts:69`); Sanity still 0 products |
| FAQ / ItemList / CollectionPage | ❌ Fail | None anywhere |
| Sitemap validity | ❌ Fail | 6 fallback `/furniture/{slug}` URLs 404 |
| Sitemap `lastmod` | ⚠️ Warning | Build-time `now` on all 15 static routes (`sitemap.ts:32`) |
| Thin/duplicate indexable pages | ❌ **Fail (NEW)** | `/signup` indexable at priority 0.8, duplicates `/founding` intent |
| Dual robots files | ⚠️ Warning | `public/robots.txt` + `app/robots.ts` still coexist and differ; live file unverifiable this run |
| Homepage internal linking | ⚠️ **Warning (NEW)** | `HomepageFooter` omits `/materials` and `/signup`; `/furniture` unlinked from both footers |
| Descriptive anchor text | ⚠️ **Warning (NEW)** | `/app` CTA reads "browse our collection" → `/about` |
| Single `<h1>` per page | ✅ Pass | One per route; homepage `<h1>` content is weak (see Quick Win 10) |
| `/waitlist` redirect | ✅ Pass | 308 → `/founding` |
| Mobile-friendly | ✅ Pass | |

---

## Content Gap Analysis

Patina still has no page mapping to any informational or commercial-investigation query. The competitive read changed usefully this month: **the informational SERPs are held by low-authority retailer blogs, not the incumbents.** Wayfair, Houzz, and Havenly dominate transactional and brand queries but are largely absent from the "how do I judge quality" space — which is exactly where Leah's expertise lives.

| Topic | Format | Competition observed (Sept) | Priority | Effort |
|---|---|---|---|---|
| "How to tell if furniture will last 20 years" | Tier-1 + FAQPage | Small retailer blogs only — weakest SERP found | **Highest** | 3–4h |
| "What AR room scanning actually tells you" | Tier-1 + Article | GlamAR, DecorViz, SkyeBrowse, Polycam — high churn | High | 3–4h |
| Havenly / Wayfair / Houzz alternatives | `/compare` + Service + FAQPage | Oblist, Decorilla, Product Hunt, Remodel AI, Paintit.ai | High | 1–2d |
| "How designers choose furniture for clients" | Tier-1 | Fragmented | High | 3–4h |
| "The real difference between $800 and $3,000 furniture" | Tier-1 | Fragmented | Medium-High | 3–4h |
| Furniture care guide (wood/leather/linen/stone) | Tier-3 + FAQPage | Retailer blogs | Medium | 4h |
| Madison, WI local page | LocalBusiness schema | **Uncontested** — no Patina entity owns the geo modifier | Medium (raised) | 4h |
| Designer / maker profile routes | Person / Organization | — | Medium (blocked on naming) | 3d |

---

## Month-over-Month Delta

| Metric | Aug 1 | Sep 1 | Direction |
|---|---|---|---|
| Deployment recency | ❌ July commits undeployed | ✅ Deployed 2026-08-11 | ✅ **Improved** |
| Title doubling — live | Fail (all routes) | Fixed except `/journal` | ✅ **Improved** |
| Brand query visibility | Not measured | `patina.cloud/app` = #1 result | ✅ **New win** |
| `og:image` on OG-override routes | Not detected | ❌ Absent on 8 routes | 🔴 **New defect found** |
| Canonical hostname (env var) | Fail (4th mo) | Fail (5th mo) | ❌ No change |
| `og-image.jpg` / `logo.png` | Absent (3rd mo) | Absent (4th mo) | ❌ No change |
| Twitter card per-page | Fail | Fail | ❌ No change |
| Default canonical | Missing | Missing | ❌ No change |
| Canonical route coverage | 4 live + 1 dead | 5 live + 1 dead (`/signup` added) | ✅ Slight improvement |
| Sitemap fallback 404s | 6 URLs | 6 URLs | ❌ No change |
| Sitemap static routes | 14 | 15 (`/signup` added) | — |
| Journal posts | 3 (April) | 3 (April) | ❌ Frozen, 6th month |
| Sanity products | 0 | 0 | ❌ No change |
| FAQ / ItemList / CollectionPage | 0 | 0 | ❌ No change |
| Thin indexable pages | — | `/signup` cannibalizes `/founding` | 🔴 New |
| Homepage footer parity | — | Missing `/materials`, `/signup` | 🔴 New |
| Patina in "alternatives" roundups | 0 mentions | 0 mentions | ❌ No change |
| "Room scanning" SERP incumbents | Oblist, Ark7, MeltFlex | GlamAR, DecorViz, SkyeBrowse, First Chair | 🔄 Full turnover — low incumbent authority |
| ASO name collision | Unknown | ❌ `Patina — The Resale Wizard` live on App Store | 🔴 **New risk** |
| GSC connected | No | No | ❌ No change (5th mo) |

**Net:** August was the first month in four where production actually moved — the deploy landed and the title fix is real. That progress exposed the next layer: the OG-image override defect was previously masked by the assumption that a bad host was the only OG problem. The remaining list is now short and mostly mechanical. The one item that has never moved in six months is the journal, and it remains the only item on this list that compounds.

---

## File-Level Recommendations

| File | Line | Change |
|---|---|---|
| **Vercel env settings** | — | `NEXT_PUBLIC_SITE_URL` → `https://patina.cloud`, or delete (code default is correct) |
| `public/og-image.jpg` | (new) | 1200×630 branded OG card |
| `public/logo.png` | (new) | Square transparent PNG ≥112×112 |
| `public/apple-touch-icon.png` | (new) | 180×180, referenced by `seo.ts:65` |
| `src/lib/seo.ts` | 7 | Add `alternates: { canonical: "./" }` to `defaultMetadata` |
| `src/lib/seo.ts` | 37–44 | Extract `export const defaultOgImages = [...]` for reuse |
| `src/lib/seo.ts` | 46–51 | Remove hard-coded `title` / `description` from the default `twitter` block |
| `src/lib/seo.ts` | 10, 14–26 | Term-rich homepage title (add `app` / `AR` / `room scan`); append plan keywords |
| `src/lib/seo.ts` | 152–156 | Verify Organization `sameAs` URLs resolve (404s weaken entity resolution) |
| `src/lib/seo.ts` | (new) | `generateFaqJsonLd()`, `generateItemListJsonLd()`, `generateCollectionPageJsonLd()` |
| `src/app/about/page.tsx` | 22 | Add `images: defaultOgImages` to `openGraph` |
| `src/app/app/page.tsx` | 20 | Add `images: defaultOgImages` to `openGraph` |
| `src/app/designers/page.tsx` | 11 | Add `images: defaultOgImages` to `openGraph` |
| `src/app/founding/page.tsx` | 11 | Add `images: defaultOgImages` to `openGraph` |
| `src/app/journal/page.tsx` | 15 | Add `images: defaultOgImages` to `openGraph` |
| `src/app/signup/page.tsx` | 10 | Add `images: defaultOgImages`; add `robots: { index: false, follow: true }` |
| `src/app/waitlist/page.tsx` | 11 | Add `images: defaultOgImages` (or drop metadata — route only redirects) |
| `src/app/journal/[slug]/page.tsx` | 77 | `images: [{ url: post.coverImageUrl || \`${siteUrl}/og-image.jpg\` }]` — unconditional |
| `src/app/sitemap.ts` | 11–18, 72–84 | Remove `fallbackProductSlugs` and both usages |
| `src/app/sitemap.ts` | 38 | `/furniture` → `priority: 0.5, changeFrequency: "monthly"` |
| `src/app/sitemap.ts` | 44 | Remove `/signup` (or drop priority to 0.3) once it's `noindex` |
| `src/components/sections/HomepageFooter/HomepageFooter.tsx` | 5–25, 83–89 | Add `/materials` to Explore and `/signup` to the legal row — match `layout/Footer/Footer.tsx:9,136` |
| `src/components/sections/HomepageHero/HomepageHero.tsx` | 232–242 | Extend `<h1>` beyond the wordmark to carry positioning |
| `src/components/sections/HomepageHero/HomepageHero.tsx` | 190 | Keyword-rich alt text; self-host the hero image |
| `public/robots.txt` | — | Delete; fold `?sort=` / `?filter=` disallows into `src/app/robots.ts:41` |
| **Sanity `appPage` doc** | `ctaSecondaryText` / `ctaSecondaryLink` | "browse our collection" currently points at `/about` — repoint to `/furniture` or relabel |
| `docs/reports/*` (untracked) | — | 15 report files (including this one) + `AGENTS.md` still uncommitted — commit or `.gitignore` |

---

## Notes & Constraints

- **`marketing:seo-audit` skill not installed** (4th month). Methodology reproduced manually: source audit, live meta/title/OG extraction, competitive SERP inspection, MoM comparison against `seo-audit-2026-08.md`.
- **JSON-LD validated from source generators and their wiring, not from live DOM.** Two blockers this run: `web_fetch` strips `<script>` blocks, and the browser pane's navigation to patina.cloud was denied (unattended scheduled run — no one present to approve site access). All eight generators in `src/lib/seo.ts` were read and their call sites confirmed. Once `logo.png` and the host fix ship, run the Google Rich Results Test manually on `/`, one journal post, and `/services`.
- **`/robots.txt` and `/sitemap.xml` could not be fetched** — the fetch tool's provenance rule only permits URLs discovered through prior results, and neither is linked from any page. Audited from source instead; the `public/robots.txt` precedence question in Quick Win 13 remains unverified live.
- **No SEO data source connected** (Strategic H). Real rankings, impressions, and backlinks remain unquantifiable. Everything in the rankings/gap sections is inferred from public SERP inspection this morning, not from Patina's own data.
- **Pages verified live this run:** `/`, `/about`, `/app`, `/furniture`, `/journal`, `/journal/why-were-building-patina`, `/signup`.
- **No code changes made** — report-only per task constraints. Autonomous run; no clarifying questions asked. Judgment calls noted inline.

---

*Next scheduled run: 2026-10-01.*
