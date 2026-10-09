# Patina SEO Audit — October 2026

**Audit date:** 2026-10-01
**Site audited:** https://patina.cloud (now served by the `patina-website` Cloudflare Worker)
**Audit type:** Full site (technical SEO + on-page + structured data + content gap)
**Run by:** Scheduled monthly automation (`patina-monthly-seo-audit`)
**Prior report:** `docs/reports/seo-audit-2026-09.md`
**Source audited:** working tree on `codex/living-study-production` (HEAD `4d5433c` plus 87 modified and 59 untracked files, all uncommitted)

---

## Executive Summary

- **The Living Study cutover (Sept 10) closed most of the long-running technical debt in one move.** The wrong host is gone: live `og:url`, `twitter:image` and canonicals now resolve to `patina.cloud` (it had been open for 5 months). The sitemap no longer lists 404s. `/furniture/*` and `/materials` redirect to `/makers`. Every page now uses the same footer. Images are self-hosted with descriptive alt text. A generated `/opengraph-image` replaces the missing `og-image.jpg`. The `/journal` double title is fixed. In total, 9 items from September's list are resolved.

- **The new top defect: most inner pages share as the homepage.** The redesign removed most per-page `openGraph` blocks, so 12 routes now inherit `og:url = https://patina.cloud` and the homepage `og:title`/`og:description` from `defaultMetadata` (`src/lib/seo.ts:18–26`). I confirmed it live on `/services`, `/makers`, `/designers`, `/contact`, `/press`, `/makers/apply` and `/terms`. `twitter:title`/`description` are the homepage's on all 9 inner routes that returned current HTML. One `pageMetadata()` helper in `seo.ts` fixes this, the 5 missing canonicals and the 2 routes still missing `og:image` in a single pass (Quick Win 1).

- **Production is running from uncommitted code.** The deployment record says so in plain words ("no commit was created"), and `origin/main` is still at Aug 11. Every SEO gain above exists only in one local working tree. A rollback, a rebuild from git, or a new machine would quietly undo all of it (Quick Win 2).

- **Measurement is now unblocked, and it's needed.** Search Console was waiting on the host fix, and that fix is live. Meanwhile the public search index still shows the **pre-redesign `/app` copy** ("the complete room, designer-curated, with handcrafted anchor pieces…"). That predates the pre-launch messaging rules, and a recrawl request is the only fast way to replace it (Quick Win 3). The brand collision has also grown: a second furniture-adjacent "Patina" app (`patina-app.com`, an antique/vintage identifier) now ranks next to *Patina — The Resale Wizard*.

- **The journal has been frozen for 177 days (7th month, still 3 posts).** This month's SERP check is encouraging. "How to tell if furniture is good quality" is held by Stickley, a 1stDibs answer page, retailer blogs and **an independent interior designer's own blog** (Laura Engen Interior Design). That last one shows that one designer-authored piece can rank here. Also new: the coined term **"designer-taught" is completely uncontested** in search. No one else uses it, so Patina could own it outright.

> **⚠ Check this first (2 minutes):** this run's fetch tool returned **pre-cutover HTML** for 5 routes: `/about`, `/app`, `/founding`, `/signup` and `/furniture`. That HTML has the old nav, Unsplash images, `twitter:image` on `patina-website.vercel.app`, "Get the App" / "Explore Furniture Collection" links and "0 of 200 spots claimed". The other 11 HTML routes, including `/materials` (which correctly 307s to `/makers`), returned Living Study HTML. The most likely cause is a cache inside the fetch tool, not the live site. `/furniture` came back as a 200 with the old catalog, but both the source (`src/app/furniture/page.tsx:5`, `next.config.ts:30`) and the Sept 10 production checks show a 308. Still, please open `/about` and `/app` in a private window and view-source. If you see the old pages, purge the Cloudflare cache for the zone. Those pages would contradict the pre-launch rule in `docs/messaging/patina-messaging-system.md`.

---

## Top 3 Quick Wins (Kody — this week)

1. **Add one `pageMetadata()` helper to `src/lib/seo.ts` and route all pages through it.** This fixes four defects at once: inner pages sharing as the homepage (12 routes), canonicals missing on 5 routes, `og:image` missing on `/journal`, journal posts and `/signup`, and the homepage Twitter card showing on every route.

   ```ts
   // src/lib/seo.ts
   const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Patina. Where Time Adds Value. Join the Founding Circle." };

   export function pageMetadata({ title, description, path, image }:
     { title: string; description: string; path: string; image?: string }): Metadata {
     return {
       title,
       description,
       alternates: { canonical: path },
       openGraph: {
         type: "website", locale: "en_US", siteName,
         title, description, url: path,
         images: [image ? { url: image } : defaultOgImage],
       },
     };
   }
   ```
   Then make three changes:
   - In `defaultMetadata`, cut `twitter` (`seo.ts:27–32`) down to `{ card: "summary_large_image" }`. Next.js fills Twitter title, description and image from the resolved `openGraph` when they're absent.
   - Remove `url: siteUrl` from the default `openGraph` (`seo.ts:21`) so no page can inherit the homepage URL.
   - Replace each page's `metadata` export with `pageMetadata({...})`. Paths can be relative (`"/services"`), because `metadataBase` resolves them. That also removes the hard-coded `https://patina.cloud` strings in `about`, `app`, `careers`, `journal`, `journal/[slug]`, `signup` and `waitlist`.

   About 45 minutes. After deploying, view-source `/services` and one journal post to confirm `og:url`, `og:image` and `twitter:title` are page-specific.

2. **Commit and push the production working tree.** `docs/launch/living-study/DEPLOYMENT-RECORD.md` states the Worker was built from the working tree with no commit. Right now 87 tracked files are modified and 59 untracked, including `wrangler.jsonc`, `open-next.config.ts`, `src/app/opengraph-image.tsx`, `src/app/press/`, `src/components/studio/` and `public/images/studio/`. Make logical commits with explicit pathspecs on `codex/living-study-production` and push. Until that's done, every "fixed" row in the delta table below can be lost by one rebuild. About 45 minutes.

3. **Connect Google Search Console and request recrawls (6th month open, now unblocked).** Add a Domain property and verify it with a DNS TXT record in Cloudflare. That's DNS-only, so it doesn't touch the Worker or the custom-domain records. Submit `https://patina.cloud/sitemap.xml`. Then use URL Inspection → Request indexing on `/`, `/app`, `/about`, `/founding` and `/services`. That replaces the stale `/app` snippet and the indexed pre-redesign copy with the current pre-launch-compliant pages. About 30 minutes. It's also the first time this report will have real impression and position data.

---

## Quick Wins (full list)

### 1. Inner pages share as the homepage (HIGH — NEW, introduced by the redesign)
**Where:** `src/lib/seo.ts:18–32`. These pages have no `openGraph`: `about/page.tsx:16`, `app/page.tsx:10`, `careers/page.tsx:12`, `contact/page.tsx:3`, `designers/page.tsx:12`, `founding/page.tsx:6`, `makers/page.tsx:11`, `makers/apply/page.tsx:3`, `press/page.tsx:6`, `privacy/page.tsx:8`, `services/page.tsx:11`, `terms/page.tsx:8`.
**Evidence (live, today):** `/services`, `/makers`, `/designers`, `/contact`, `/press`, `/makers/apply` and `/terms` all emit `og:url = https://patina.cloud` and `og:title = "Patina | Where Time Adds Value"`. Facebook and LinkedIn treat `og:url` as the canonical for a share, so a shared `/designers` link turns into the homepage card and its share count rolls up to `/`. The Founding 50 and maker outreach both depend on sharing those exact pages.
**Fix:** Quick Win 1 above.

### 2. Production source uncommitted (HIGH — NEW)
See Top-3 #2. This is an operations risk, but it carries the SEO state: a rebuild from `origin/main` (Aug 11) would bring back the old sitemap and 404 URLs, the `/furniture` catalog, and the `vercel.app` host fallbacks.

### 3. Search Console + recrawl (HIGH — carryover, 6th month)
See Top-3 #3. The public index snippet for `patina.cloud/app` still quotes the pre-redesign page.

### 4. Twitter card hard-coded to the homepage (MEDIUM — carryover)
`src/lib/seo.ts:29–30`. Confirmed live on all 9 inner routes that returned current HTML. It's covered by Quick Win 1: keep only `card`.

### 5. Five routes have no canonical (MEDIUM — carryover, much improved)
Coverage went from 5 routes to 11. Still missing: `/services` (`services/page.tsx:11–15`), `/contact` (`contact/page.tsx:3–6`), `/makers/apply` (`makers/apply/page.tsx:3–6`), `/privacy` (`privacy/page.tsx:8–12`) and `/terms` (`terms/page.tsx:8–12`). The first three are confirmed missing live. Covered by Quick Win 1.

### 6. `og:image` still missing where a page overrides `openGraph` (MEDIUM — carryover, narrowed from 8 routes to 3)
Confirmed live on `/journal` and `/journal/why-were-building-patina`: they have `og:title` and `og:url` but no `og:image`, `og:type` or `og:site_name`. From source, `/signup` (`signup/page.tsx:10–15`) has the same problem. `journal/[slug]/page.tsx:81` only adds an image when the post has a cover, and none of the 3 posts does. Covered by Quick Win 1. `pageMetadata` falls back to `/opengraph-image`.

### 7. Robots: consolidate, and correct last month's advice (MEDIUM — carryover, corrected)
Both `public/robots.txt` and `src/app/robots.ts` still exist. On Cloudflare Workers Static Assets, a request that matches a file in the assets directory is served **before the Worker runs**, and `wrangler.jsonc` sets no `run_worker_first`. So the live file is almost certainly the static one, which does **not** disallow `/studio/`. I couldn't fetch `/robots.txt` this run (see Notes).
**Correction:** last month said "delete `public/robots.txt` and fold into `robots.ts`." That's still right, but **also remove `"/_next/"` from `robots.ts:41`**. Blocking `/_next/` stops Googlebot from loading the CSS/JS chunks it needs to render the page, and from crawling `/_next/image`, which serves every image on the site. The `?sort=` / `?filter=` rules (`public/robots.txt:37–38`) protected a catalog that no longer exists, so drop them rather than carry them over. End state: `disallow: ["/api/", "/studio/"]`.

### 8. `/signup` still indexable (MEDIUM → LOW — carryover)
It's out of the sitemap and no page links to it any more (`grep` finds no `href="/signup"` in `src/`). But it was indexed during the Vercel era and still serves `index, follow` with a self-canonical (`signup/page.tsx:16–18`). Add `robots: { index: false, follow: true }`. The SMS-consent page stays publicly reachable for carrier review, and `noindex` doesn't affect the form.

### 9. Raster logo for Organization and Article schema (MEDIUM — carryover, 5th month)
- `generateArticleJsonLd` → `publisher.logo` = `${siteUrl}/logo.png` (`seo.ts:233`). The file still doesn't exist in `public/`, so all three journal posts point at a 404 logo.
- `generateOrganizationJsonLd` → `logo` = `/icon.svg` (`seo.ts:81`). That's an improvement because it exists, but its viewBox is 64×64, and Google's logo guidance asks for at least 112×112.

One file fixes both. Add `public/logo.png` (512×512, Strata mark on Warm White) and point `seo.ts:81` at it.

### 10. Organization `sameAs` lists a different company (MEDIUM — NEW)
`seo.ts:123–127` includes `https://middlewest.studio`. `sameAs` should only list URLs for *the same entity*, and Middle West Studio is Leah's separate practice. Including it tells Google that Patina and the studio are one organization, which is the reverse of the entity separation the press kit draws. Move the studio URL into the `worksFor` objects instead (`seo.ts:110` and `:274`: `{ "@type": "Organization", name: "…", url: "https://middlewest.studio" }`). While you're there, confirm the Instagram and LinkedIn URLs at `seo.ts:125–126` resolve.

### 11. Pick one spelling of the studio name (MEDIUM — NEW)
"**Middlewest** Studio" is in `seo.ts:110,274`, `journal/page.tsx:16`, `designers/page.tsx:129,142`, `press/page.tsx:108`, `LivingStudy.tsx:460`, `NewsletterSignup.tsx:178` and three emails. "**Middle West** Studio" is in `about/page.tsx:70,94,112,126,136,145,291` and `makers/page.tsx:148,300,305`. Leah's LinkedIn uses "Middle West Studio", and the messaging doc itself uses both (`patina-messaging-system.md:152` vs `:153`). Search engines use exact names to connect entities. This month's query for "Patina … Madison Wisconsin Leah Kochaver" returned Leah's LinkedIn and `middlewest.studio` but **no patina.cloud result**, and the engine couldn't link the two. Choose the studio's own spelling and do one find-and-replace.

### 12. Homepage title, description and H1 never say "furniture" (MEDIUM — carryover, reframed)
- `seo.ts:10` title: `Patina | Where Time Adds Value`. That's 31 characters with no category term.
- `seo.ts:5` description doesn't use the **approved search/meta descriptor** in `patina-messaging-system.md:38` ("Designer-taught furniture discovery — find pieces that belong in your space, then hand off to a designer who can take it further. Where time adds value.").
- The H1 (`LivingStudy.tsx:235`, scene 0 at `:22–27`) is the tagline. The description under it (`:29–30`) says "A more personal way to find what belongs" and never uses the word *furniture*.

**Fix (no redesign needed):** use the approved descriptor for `siteDescription`. Set `title.default` to `Patina — Designer-Taught Furniture Discovery` (44 characters; the tagline stays the signature in OG and the page). Start the scene-0 description with "Designer-taught furniture discovery." The protected tagline stays as the H1.

### 13. FAQPage JSON-LD on `/makers` (LOW — NEW, easy)
`makers/page.tsx:18–39` already has a visible 4-question `questions` array. Add a `generateFaqJsonLd(questions)` helper and render it. **Expectation:** since 2023, Google shows FAQ rich results only for authoritative government and health sites, so this won't create a SERP feature. Its value is giving answer engines clean, extractable Q&A ("Can makers pay for placement? No."). About 20 minutes.

### 14. `/careers` is an orphan (LOW — NEW)
It's in the sitemap (`sitemap.ts:31`), but the only link to it is in `SearchBar.tsx:92`, and no page renders `SearchBar`. Either add it to `Footer.tsx:29–39` or drop it from the sitemap while there are no openings.

### 15. Indexed copy that contradicts pre-launch status (LOW for SEO / HIGH for messaging — NEW)
These aren't ranking factors, but search engines and answer engines quote this text back:
- `/terms`: `terms/page.tsx:86–150` describes ordering, payment, white-glove delivery and a 10-year warranty, which reads as a live store. `content-release-checks.md:14` already calls for this review.
- Journal post *Why We're Building Patina* (Sanity): "how the AI learns to recommend" conflicts with the restrained-AI rule (messaging §5).

---

## Strategic Investments (this quarter)

### A. Restart the journal with the piece the SERP is asking for (carryover — 7th month, top priority)
Still 3 posts, the latest dated April 7 (177 days ago). The plan called for 2–4 per month, so the journal is now roughly 9–21 posts behind.
**New evidence this month:** for "how to tell if furniture is good quality", one of the top results is **an individual interior designer's blog** (Laura Engen Interior Design), next to Stickley, 1stDibs Answers and retailer blogs (Arrow, Gladhill, Wooden Edge). This SERP rewards exactly the format Leah could write: a designer's quality checklist. Order:
1. "How to Tell If Furniture Will Last 20 Years". Leah, 3–4h. Strongest evidence of winnability.
2. The Kody-only Tier-2 piece proposed in `weekly-content-2026-09-28.md` (built from the designer-portal teaching notes). About 2h, no Leah time needed.
3. "How Designers Choose Furniture for Clients". The SERP is held by Qpractice, NYIAD, designspec and small studio blogs, with nothing authoritative.

### B. Own the term "designer-taught" (NEW)
A search for `"designer-taught" furniture` returns **nothing** that uses the phrase. The results are only about self-taught designers and furniture schools. Patina's lexicon already centers on the phrase (messaging §4, VISION's "Designer-Taught Intelligence"). A coined term with no competition is the cheapest #1 ranking available, and answer engines repeat category definitions. Put it in the homepage `<title>` (Quick Win 12) and the `/app` H1/title. Then publish one short explainer, "What 'designer-taught' means (and why it isn't an algorithm)", with `DefinedTerm` or `FAQPage` markup. About half a day.

### C. Entity linking: connect Patina ↔ Leah ↔ Madison (NEW)
Search doesn't currently connect these three. Cheapest moves first:
1. **A link from `middlewest.studio` to `patina.cloud`.** It's the easiest relevant backlink Patina has, because you control both sites.
2. Consistent studio name (Quick Win 11) and corrected `sameAs` (Quick Win 10).
3. Add each founder's professional profile URL to their `Person.sameAs` in `seo.ts:101–121`.
4. Use the new `/press` page and fact sheet for Madison-area press. The press kit is new this month and is the right asset for it.

### D. Brand-name collision is getting worse (carryover — escalated)
The brand query now surfaces **two** furniture-adjacent "Patina" apps: *Patina — The Resale Wizard* (App Store, id6747730655) and **`patina-app.com` — "Patina — AI Antique & Vintage Identifier"** (plus an estate-sale sub-product). They also compete with *PATINA DESIGN* (a Houzz pro in Naples, FL), `rentpatina.com`, `patinadecorlv.com`, and a Substack product called "Patina". Both `patina.cloud/` and `/app` do appear on page one, which is good. Settle the App Store display name (with a disambiguator) before submission, and keep "Madison" plus "designer-taught" in the brand's metadata. Those are the two modifiers no other Patina owns.

### E. An honest "alternatives" page (carryover — reframed for pre-launch)
"Havenly alternatives 2026" is now held by AI-render tools that self-publish comparisons (airender.ai, Remodel AI, paintit.ai, First Chair), plus Product Hunt and craft.co. Patina is absent. A feature-comparison page would break the proof rules while the app is pre-launch. A **Leah-authored** "AI room render vs. a real designer: how to choose" is honest, needs no shipped product, and takes the angle none of those tools can credibly take. About 1 day.

### F. Remaining schema work (carryover — lower priority now)
- `FAQPage` (Quick Win 13).
- `Blog` + `ItemList` on `/journal` once there are more than 3 posts.
- `BreadcrumbList` on hubs. It's currently only on journal posts (`journal/[slug]/page.tsx:189`).
- **Don't re-add** `Service` or `SoftwareApplication` yet. Both generators are now unused (`seo.ts:161–192`), and that's correct for pre-launch: the `Service` description says "The app captures your style profile, room scans…" in the present tense. Rewrite before re-wiring at launch.

### G. Rank tracking (carryover)
Once Search Console has 4 weeks of data, decide whether the ~$99/mo Ahrefs/Semrush budget in visibility plan §5 is still needed. GSC alone may cover a pre-launch site.

### H. `marketing:seo-audit` skill (carryover — 5th month)
It's still not installed in the automation environment, and I reproduced the methodology manually again. Recommend accepting the manual path and removing the reference from the task file.

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS / `www` → apex | ✅ Pass | Cloudflare custom domains; `www` 308 → apex (deploy record + `next.config.ts:19–24`) |
| Hosting | ✅ **Changed** | Vercel → Cloudflare Worker `patina-website` (Sept 10); Vercel kept for rollback |
| Production source committed | ❌ **Fail (NEW)** | Worker built from an uncommitted tree; `origin/main` = Aug 11 |
| Canonical hostname | ✅ **Fixed** | `og:url`, `twitter:image` and canonicals on `patina.cloud`; `wrangler.jsonc` vars + `site-url.ts:5` default |
| Title doubling | ✅ **Fixed** | `/journal` now `The Designer's Eye — Journal \| Patina` |
| `<link rel="canonical">` coverage | ⚠️ Improved | 11 routes; missing on `/services`, `/contact`, `/makers/apply`, `/privacy`, `/terms` |
| Per-page `og:url` / `og:title` | ❌ **Fail (NEW)** | 12 routes inherit the homepage values |
| `og:image` presence | ⚠️ Improved | Present on inheriting routes via `/opengraph-image`; missing on `/journal`, posts, `/signup` |
| Twitter card per-page | ❌ Fail | Homepage title/description on all 9 current inner routes checked |
| `logo.png` | ❌ Fail (5th mo) | `seo.ts:233` 404; Organization uses 64-unit `icon.svg` |
| Organization / WebSite JSON-LD | ⚠️ Warning | Wired `layout.tsx:21–38`; `sameAs` includes another entity; logo below 112px |
| Article + BreadcrumbList on posts | ⚠️ Warning | `journal/[slug]/page.tsx:181–205`; `publisher.logo` 404; no `image` (no covers) |
| AboutPage JSON-LD | ✅ Pass | `about/page.tsx:27–29` |
| Service / SoftwareApplication | ➖ Unwired | Removed in the redesign; leave off until launch (copy is present-tense) |
| FAQ / ItemList / Blog | ❌ Fail | None; `/makers` has FAQ content ready |
| Sitemap validity | ✅ **Fixed** | 14 static routes + journal; fallback slugs, `/furniture`, `/signup` and `/materials` removed |
| Sitemap `lastmod` | ✅ **Fixed** | Build-time `now` removed; posts use `_updatedAt` (`sitemap.ts:13–16`) |
| Retired-route redirects | ✅ Pass | `/materials` 307 → `/makers` (verified live today); `/furniture/*` 308 (deploy record) |
| Dual robots files | ⚠️ Warning | Static file likely served (Workers assets precedence); `robots.ts` has a harmful `/_next/` disallow |
| AI crawler allowlist / `llms.txt` | ✅ Pass | 7 UAs in both robots files; `public/llms.txt` present |
| Self-hosted images + alt text | ✅ **Fixed** | `/images/studio/*`, descriptive "Illustrative…" alts |
| Footer parity / internal links | ✅ **Fixed** | Single `Footer.tsx`; `/careers` now orphaned |
| Thin indexable pages | ⚠️ Improved | `/signup` out of sitemap and unlinked, still `index` |
| Single `<h1>` per page | ✅ Pass | Homepage H1 is the tagline (Quick Win 12) |
| Security headers | ✅ Pass | `X-Frame-Options`, `nosniff`, `Referrer-Policy` via `_headers` + `next.config.ts` |

---

## Content Gap Analysis

| Topic | Format | Competition observed (Oct) | Priority | Effort |
|---|---|---|---|---|
| "How to tell if furniture is good quality / will last" | Tier-1 + FAQPage | Stickley, **Laura Engen Interior Design**, 1stDibs Answers, retailer blogs | **Highest** | 3–4h (Leah) |
| "Designer-taught" — what it means | Explainer + DefinedTerm/FAQ | **Uncontested — zero users of the term** | **High (NEW)** | 3h |
| "How designers choose furniture for clients" | Tier-1 | Qpractice, NYIAD, designspec, small studio blogs | High | 3–4h |
| AI room render vs. a real designer (Havenly-alternatives intent) | Tier-1, Leah-authored | airender.ai, Remodel AI, paintit, First Chair, Product Hunt | High | 1d |
| "Room scanning apps for furniture" | Tier-1 | Full turnover again: Room Scanner, 3D Cloud, amrax, DecorViz, tardis-ai, Roomform | Medium (wait for app) | 3–4h |
| "The real difference between $800 and $3,000 furniture" | Tier-1 | Fragmented | Medium-High | 3–4h |
| Furniture care guide (wood / leather / linen / stone) | Tier-3 + FAQPage | Retailer blogs | Medium | 4h |
| Madison, WI presence | Entity work (Strategic C) | No Patina entity owns the geo modifier | Medium | 2h |

**Designer-curated platform SERP (reference):** industrialkonzept, The Oblist, Formed & Furnished, roomLift, Spacejoy, CB2, Chairish. This is a crowded category. "Designer-taught" is the more winnable term.

---

## Month-over-Month Delta

| Metric | Sep 1 | Oct 1 | Direction |
|---|---|---|---|
| Hosting / deploy | Vercel, `3e8212a` | Cloudflare Worker, uncommitted tree | 🔄 Changed |
| Canonical hostname (env var) | ❌ Fail (5th mo) | ✅ Fixed | ✅ **Resolved** |
| Sitemap fallback 404s | 6 URLs | 0 | ✅ **Resolved** |
| `/furniture` in sitemap at 0.9 | Yes | Removed; route 308s | ✅ **Resolved** |
| Sitemap build-time `lastmod` | Yes | Removed | ✅ **Resolved** |
| `/journal` double title | Stale | Fixed | ✅ **Resolved** |
| OG image file | Missing `og-image.jpg` | Generated `/opengraph-image` | ✅ **Resolved** |
| Homepage footer parity | Missing 2 links | Single shared footer | ✅ **Resolved** |
| Hot-linked Unsplash heroes | Yes | Self-hosted | ✅ **Resolved** |
| `/app` CTA anchor mismatch | "browse our collection" → `/about` | Gone from source | ✅ **Resolved** (pending live verification) |
| `og:image` missing on override routes | 8 routes | 3 routes | ✅ Improved |
| Canonical coverage | 5 live + 1 dead | 11 routes | ✅ Improved |
| `/signup` indexable at 0.8 | Yes | Out of sitemap, still `index` | ✅ Improved |
| Inner pages' `og:url` / `og:title` | Page-specific where declared | Homepage values on 12 routes | 🔴 **New regression** |
| Production code committed | Yes | ❌ No | 🔴 **New risk** |
| Twitter card per-page | Fail | Fail | ❌ No change |
| `logo.png` | Absent (4th mo) | Absent (5th mo) | ❌ No change |
| Dual robots files | Present | Present (+ `/_next/` hazard identified) | ❌ No change |
| Homepage H1 | "PATINA" | "Where Time Adds Value." | ➖ Changed, still non-descriptive |
| Service / SoftwareApplication schema | Wired | Unwired | ➖ Appropriate for pre-launch |
| FAQ / ItemList | 0 | 0 | ❌ No change |
| Journal posts | 3 (April) | 3 (April) — 177 days | ❌ Frozen, 7th month |
| GSC connected | No (5th mo) | No (6th mo) — **now unblocked** | ❌ No change |
| Brand SERP — patina.cloud | `/app` #1 | `/app` and `/` on page one; stale `/app` snippet | ➖ Mixed |
| ASO / name collision | 1 app (Resale Wizard) | 2 apps (+ `patina-app.com` antique identifier) | 🔴 Worse |
| "Designer-taught" competition | Not measured | Uncontested | ✅ **New opportunity** |
| "Room scanning" SERP incumbents | GlamAR, DecorViz, SkyeBrowse, First Chair | Room Scanner, 3D Cloud, amrax, DecorViz, tardis-ai | 🔄 Second full turnover |
| Patina in "alternatives" roundups | 0 | 0 | ❌ No change |

**Net:** this is the best month since these audits began. The cutover cleared nine items, including the host bug that had been open for five months. What's left is mostly one metadata helper in `seo.ts`, a commit, and turning on Search Console. The journal is still the only item that compounds, and it's the only one that has never moved.

---

## File-Level Recommendations

| File | Line | Change |
|---|---|---|
| **git** | — | Commit the production tree on `codex/living-study-production` (explicit pathspecs) and push |
| **Google Search Console** | — | Domain property via Cloudflare DNS TXT; submit sitemap; request indexing for `/`, `/app`, `/about`, `/founding`, `/services` |
| `src/lib/seo.ts` | (new) | `pageMetadata({ title, description, path, image })` helper (snippet in Top-3 #1) |
| `src/lib/seo.ts` | 21 | Remove `url: siteUrl` from default `openGraph` |
| `src/lib/seo.ts` | 27–32 | Cut `twitter` down to `{ card: "summary_large_image" }` |
| `src/lib/seo.ts` | 5, 10 | Approved meta descriptor (`patina-messaging-system.md:38`); `title.default` → `Patina — Designer-Taught Furniture Discovery` |
| `src/lib/seo.ts` | 81, 233 | Point both logos at a new `public/logo.png` |
| `src/lib/seo.ts` | 110, 274 | Add `url: "https://middlewest.studio"` to the studio `worksFor` objects; fix the studio-name spelling |
| `src/lib/seo.ts` | 123–127 | Remove `middlewest.studio` from Organization `sameAs`; verify the IG and LinkedIn URLs |
| `src/lib/seo.ts` | (new) | `generateFaqJsonLd(items)` |
| `public/logo.png` | (new) | 512×512 raster Strata mark |
| `src/app/services/page.tsx` | 11–15 | → `pageMetadata({ …, path: "/services" })` |
| `src/app/contact/page.tsx` | 3–6 | → `pageMetadata({ …, path: "/contact" })` |
| `src/app/makers/apply/page.tsx` | 3–6 | → `pageMetadata({ …, path: "/makers/apply" })` |
| `src/app/privacy/page.tsx` | 8–12 | → `pageMetadata({ …, path: "/privacy" })` |
| `src/app/terms/page.tsx` | 8–12 | → `pageMetadata({ …, path: "/terms" })` |
| `src/app/terms/page.tsx` | 86–150 | Reframe ordering, delivery and warranty sections for pre-launch (with whoever owns legal copy) |
| `src/app/{about,app,careers,designers,founding,makers,press}/page.tsx` | metadata export | → `pageMetadata(...)`; drop the hard-coded `https://patina.cloud` canonicals |
| `src/app/journal/page.tsx` | 13–26 | → `pageMetadata(...)` (restores `og:image`) |
| `src/app/journal/[slug]/page.tsx` | 74–86 | → `pageMetadata({ …, image: post.coverImageUrl })` |
| `src/app/signup/page.tsx` | 6–19 | → `pageMetadata(...)` + `robots: { index: false, follow: true }` |
| `src/app/makers/page.tsx` | 18–39 | Render `generateFaqJsonLd(questions)` |
| `src/app/robots.ts` | 41 | `disallow: ["/api/", "/studio/"]`. **Remove `/_next/`.** |
| `public/robots.txt` | — | Delete (after the `robots.ts` edit above) |
| `src/app/sitemap.ts` | 31 | Drop `/careers` if there are no openings (or link it from the footer) |
| `src/components/layout/Footer/Footer.tsx` | 29–39 | Optionally add `/careers` |
| `src/components/studio/LivingStudy.tsx` | 29–30 | Start the scene-0 description with "Designer-taught furniture discovery." |
| Studio name (10+ files) | see Quick Win 11 | One spelling everywhere, matching the studio's own site |
| **Sanity** journal post *Why We're Building Patina* | body | Replace "how the AI learns to recommend" (messaging §5) |
| **middlewest.studio** | about page | Link to `https://patina.cloud` |
| **Cloudflare** | — | Only if the 2-minute check finds old HTML on `/about` or `/app`: purge the cache |

---

## Notes & Constraints

- **Live verification method:** `web_fetch` (returns `<head>` meta but strips `<script>`) on 17 URLs: `/`, `/about`, `/app`, `/contact`, `/designers`, `/founding`, `/furniture`, `/journal`, `/journal/why-were-building-patina`, `/makers`, `/makers/apply`, `/materials`, `/press`, `/press/patina-fact-sheet.txt`, `/services`, `/signup`, `/terms`. Everything described as "confirmed live" comes from routes that returned Living Study HTML.
- **Five routes returned pre-cutover HTML** (`/about`, `/app`, `/founding`, `/signup`, `/furniture`). The strongest evidence that this is a fetch-tool cache rather than the live site: `/furniture` returned a 200 with the old catalog, which neither the current source nor the Sept 10 production HTTP checks (308) can produce. I couldn't cache-bust, because the fetch tool only allows URLs it has already seen. Live claims for those five routes come from source only, pending the manual check in the summary.
- **JSON-LD validated from the source generators and their call sites, not from the live DOM.** `web_fetch` strips scripts. Claude in Chrome wasn't connected, and browser-pane access to patina.cloud was declined (unattended run). Once `logo.png` ships, run Google's Rich Results Test on `/` and one journal post.
- **`/robots.txt` and `/sitemap.xml` couldn't be fetched** (provenance rule; no page links to them). Robots behavior is inferred from Workers Static Assets precedence plus source. The Sept 10 deploy record confirms both return 200.
- **Rankings are inferred from public SERP inspection today**, not from Patina's own data (Strategic G). Queries: brand + descriptor; "how to tell if furniture is good quality"; "designer-curated furniture platform"; "Havenly alternatives 2026"; "room scanning app for furniture shopping"; "Patina furniture Madison Wisconsin Leah Kochaver"; "how do interior designers choose furniture for clients"; `"designer-taught" furniture`.
- **Paths:** the task file references `/sessions/nifty-optimistic-hawking/…`. This run used the current mount of the same `PatinaWebsite` folder.
- **No code changes made.** This run only produced the report, per the task constraints. It ran autonomously with no clarifying questions. Judgment calls are noted inline, in particular the corrected robots advice in Quick Win 7 and the recommendation *not* to re-wire `Service` / `SoftwareApplication` before launch.

---

*Next scheduled run: 2026-11-01.*
