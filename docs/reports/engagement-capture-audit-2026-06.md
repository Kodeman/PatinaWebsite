# Patina Engagement Capture Audit — June 2026

**Report date:** 2026-06-23
**Scope:** patina.cloud visit tracking → traffic-source attribution → signup capture → cross-platform identity
**Reviewed against:** PatinaWebsite repo (`main` @ `78771df`) and `docs/engagement-tracking-plan.md`
**Status:** Draft for review

---

## TL;DR

The capture foundation is in good shape: PostHog is wired correctly (consent-gated, autocapture off, manual pageviews), Vercel Analytics + Speed Insights run alongside it, UTM attribution is captured with first/last-touch, and five signup surfaces post to Supabase with server-side event mirroring. The work done so far is solid and ahead of the original plan.

The problems are **at the edges of the funnel**, and they cluster into four issues worth acting on:

1. **The core conversion table (`waitlist`) has no migration in the repo.** The live signup path and the homepage founding counter both depend on it. If it's drifted or missing on the self-hosted DB, signups fail silently. This needs verification today.
2. **Attribution leaks on the two highest-value lead types.** Designer and maker applications capture almost no traffic source — so we can't tell which channel produces the leads that matter most.
3. **The identity spine is missing.** `posthog_distinct_id` is being stored on every signup row (good groundwork), but the `profiles` table, conversion trigger, and cross-surface identify contract from the plan don't exist yet — so website identity doesn't actually stitch to the extension, iOS, or portal.
4. **No spam protection or `role` capture**, which quietly degrades data quality and the one segmentation field we most need.

Everything below maps to a phased plan in Section 4. Section 5 is a verification checklist — several findings can only be confirmed against the live self-hosted DB, which this audit can't reach.

---

## 1. Current-state map

### 1.1 Visit tracking

| Layer | Status | Notes |
|---|---|---|
| **PostHog (client)** | ✅ Wired | `src/lib/posthog.ts` — `autocapture: false`, `capture_pageview: false`, `capture_pageleave: true`, `persistence: localStorage+cookie`. Opt-out by default unless consent granted or DNT set. |
| **Manual pageviews** | ✅ Wired | `src/app/providers.tsx` `PostHogPageView` fires `$pageview` on every App-Router navigation (path + query). Correct SPA pattern. |
| **Vercel Analytics + Speed Insights** | ✅ Wired | `src/app/layout.tsx` renders `<Analytics />` and `<SpeedInsights />`. Runs independently of consent. |
| **SEO / structured data** | ✅ Wired | Organization + Website JSON-LD in root layout; `src/lib/seo.ts`. |
| **Event taxonomy** | ✅ Rich | `src/lib/analytics.ts` defines ~40 typed events (product, AR, search, founding, room, CTA, scroll depth). Type-safe `track()` → `posthog.capture()`. |

### 1.2 Attribution

`src/lib/attribution.ts` captures `utm_source/medium/campaign/content/term` + `referrer` from the landing URL, stores **first-touch and last-touch** in `localStorage` (`patina_attribution`) on a 30-day window, and registers UTM as PostHog super-properties via `register()`. `captureAttribution()` runs once on mount in `providers.tsx`.

### 1.3 Consent

`src/components/ui/CookieConsent/CookieConsent.tsx` — a single Accept/Decline banner shown after 1.5s if no prior choice. Wired to `setConsent()` which calls `opt_in_capturing()` / `opt_out_capturing()`. DNT is respected at init. **One global analytics toggle** — no granular categories (analytics vs. marketing) despite the plan calling for them.

### 1.4 Signup capture — the matrix

| Surface (form) | Live route | Table | Attribution captured | `distinct_id` sent | Client `identify()` | Server-side event |
|---|---|---|---|---|---|---|
| **Founding Circle** form + modal (hero, footer, mobile menu, About/App CTAs, journal, `/founding`) | `/api/founding` | `waitlist` | **Full** — UTM + referrer + first/last-touch JSONB + user_agent | ✅ | ✅ `identify(email)` | ⚠️ only on **error** (`founding_signup_error`) |
| **Newsletter** (footer, inline, journal) | `/api/newsletter` | `newsletter_subscribers` | **Partial** — `utm_source/medium/campaign` only | ✅ | ✅ `identify(email)` | ✅ `newsletter_signup` |
| **Designer application** (`/designers`) | `/api/designers-apply` | `founding_designer_applications` | **Minimal** — `referral_source = utm_source` only | ❌ | ❌ | ✅ `designer_application_submitted` (distinctId = **email**) |
| **Maker application** (`/makers/apply`) | `/api/makers-apply` | `maker_applications` | **None** | ❌ | ❌ | ✅ `maker_application_submitted` (distinctId = **email**) |
| _(legacy)_ `WaitlistForm` | `/api/waitlist` _(unused)_ | `waitlist` | n/a — dead route | — | — | — |

Note: `WaitlistForm` is now just a re-export of `FoundingCircleForm`, so **`/api/waitlist` is dead code**. The canonical path is `/api/founding`. The homepage founding counter (`/api/founding/count`) does an exact-count `head` query on `waitlist`.

### 1.5 Cross-platform identity

The website does the right groundwork — it sends `posthog_distinct_id` on signup and stores it in the `waitlist` row — but the consuming half from `docs/engagement-tracking-plan.md` is **not built**: no `profiles` table, no `handle_new_user()` conversion trigger, no `engagement_events` sync table. Migrations present are only `newsletter_subscribers`, `maker_applications`, and `founding_designer_applications`.

---

## 2. Gaps — prioritized

Severity: **P0** = blind spot or likely breakage · **P1** = material data leak · **P2** = hygiene/polish.
"Confirmed from code" vs. "verify on live DB" is flagged per item.

### Stage A — Visit tracking & data integrity

**G1 · P0 · `waitlist` table is unmanaged (schema drift).** _Confirmed from code; live state must be verified._
No `CREATE TABLE waitlist` exists anywhere in the repo, yet `/api/founding` (live signups) and `/api/founding/count` (homepage counter) both depend on it. Either it was created by hand on the self-hosted instance (untracked — repo is not the source of truth) or it doesn't exist (signups 500, counter silently returns 0). Same drift signal elsewhere: the `maker_applications` and `founding_designer_applications` migrations are **missing columns the routes write** — maker writes `location`, `materials`, `trade_program`; designer writes `location`, `sourcing_process` — none of which are in the committed schemas. Those inserts either error or the live tables were altered out-of-band.

**G2 · P1 · Pre-consent visits are uncounted.** _Confirmed from code._
PostHog initializes opt-out-by-default, so `$pageview` is suppressed for any visitor who hasn't clicked Accept (and permanently for those who Decline). Vercel Analytics still counts them, so your two visit numbers will never reconcile and top-of-funnel is undercounted in PostHog. This is a defensible privacy posture, but it should be a **decision**, not an accident — options range from a cookieless pre-consent pageview to documenting Vercel as the source of truth for raw traffic.

**G3 · P2 · No PostHog reverse proxy.** _Confirmed from code._
PostHog loads from `us.i.posthog.com` directly, so a meaningful slice of events is lost to ad-blockers. A Next.js rewrite to a first-party path (`/ingest`) recovers most of them.

**G4 · P2 · Two analytics systems, no documented source of truth.** Vercel counts bots/visits differently than PostHog. Pick which answers "how many visits" and write it down.

### Stage B — Where visits come from (attribution)

**G5 · P0 · Designer & maker leads lose their source.** _Confirmed from code._
These are the highest-value lead types and they capture the least. Designer applications store `referral_source = utm_source` only (dropping medium/campaign/content/term, referrer, first/last-touch, and `posthog_distinct_id`); maker applications capture **no attribution at all**. You cannot currently answer "which channel produced our founding designers?"

**G6 · P1 · Attribution schema differs per table.** _Confirmed from code._
`waitlist` gets full first/last-touch JSONB; `newsletter_subscribers` gets three UTM columns; applications get a string or nothing. Reporting across lead types requires a consistent attribution shape.

**G7 · P1 · No paid-click IDs or channel grouping.** `gclid`/`fbclid`/`msclkid` aren't captured, so paid campaigns can't be reconciled against ad platforms. Referrer is stored raw but never bucketed into organic / social / referral / direct.

**G8 · P2 · No UTM governance.** No documented naming convention or validation; inconsistent tags will fragment campaign reporting at the source.

### Stage C — Signup capture

**G9 · P0 · No `role` (designer/consumer) on signup.** _Confirmed from code._
The single most useful segmentation field is absent from the founding/waitlist capture. Every founding signup lands as an undifferentiated email, so role-based funnels (a core goal of the plan) can't be built retroactively.

**G10 · P1 · No spam protection on any form.** _Confirmed from code (`grep`: none)._
No honeypot, rate limit, or CAPTCHA on the five POST routes. This inflates signup counts, poisons the email list, and adds attribution noise. Cheapest high-value fix in this report.

**G11 · P1 · Identity merge is half-wired.** _Confirmed from code._
Founding and newsletter forms call `identify(email)` client-side, which correctly merges the anonymous session. But designer/maker routes capture server-side events with `distinctId = email` and **never send the anonymous `posthog_distinct_id`** — so a designer's pre-application browsing is orphaned from their identified profile. Also: identifying on `email` now will collide with the Supabase `auth.uid()` used post-conversion unless an alias strategy is chosen (see G15).

**G12 · P1 · No email verification / double opt-in.** Newsletter especially — fake and mistyped addresses enter the list and hurt deliverability. (Founding/designer/maker send an ack email but don't verify.)

**G13 · P2 · Delete the dead `/api/waitlist` route + divergent schema.** It writes a `preferred_styles` column the canonical `/api/founding` path doesn't use (founding nests styles inside `first_touch_attribution` JSONB). Harmless today because nothing posts to it, but it's a live schema-drift trap.

**G14 · P2 · Founding success event is client-only.** `founding_circle_signup` fires from the browser; the server only logs failures. An ad-blocker between submit and capture means a saved signup with no PostHog event. Mirror the success event server-side (as newsletter/designer/maker already do).

### Stage D — Cross-platform identity (the broader scope)

**G15 · P0 (for the cross-platform goal) · The identity spine isn't built.** _Confirmed from code._
`profiles`, `handle_new_user()`, and `engagement_events` from the plan don't exist. The website faithfully stores `posthog_distinct_id` on waitlist rows, but nothing consumes it, so waitlist → authenticated-user conversion and the unified cross-surface identity have no mechanism yet.

**G16 · P1 · No canonical-ID decision.** Single PostHog project is correct for unified identity, but there's no documented contract for what the canonical `distinct_id` is (email pre-auth vs. Supabase `auth.uid()` post-auth) or how extension/iOS/portal converge on it. Decide before those surfaces start emitting.

**G17 · P1 · No PostHog → Supabase sync, so plan's scoring/funnels can't run.** The engagement-scoring SQL and funnel views assume an `engagement_events` table fed from PostHog. Decide: use PostHog-native funnels/cohorts (recommended first) vs. build the reverse-ETL sync.

---

## 3. What's already good (don't touch)

So the plan stays balanced: the PostHog init config, the consent gate + DNT handling, the first/last-touch attribution model, the typed `analytics.ts` event layer, server-side mirroring on three of four routes, and storing `posthog_distinct_id` on signup rows are all correct and worth preserving. The fixes below are additive — none require re-architecting this.

---

## 4. The plan

### Phase 0 — Stabilize & verify (this week, ~1 day) — addresses G1, G9, G13

- **Verify the live `waitlist` table** exists with the columns `/api/founding` writes; capture a row count and reconcile against the PostHog `founding_circle_signup` count and the on-site counter. (See Section 5.)
- **Commit the real schema as migrations** so repo == DB: a `waitlist` migration plus `ALTER`s adding the missing `maker_applications` / `founding_designer_applications` columns. Repo becomes source of truth again.
- **Add `role`** (`designer` | `consumer` | `unknown`) to the founding capture — a single optional toggle/inference at signup.
- **Delete the dead `/api/waitlist` route.**

### Phase 1 — Close attribution leaks (week 1–2) — addresses G5, G6, G7, G11, G14

- **One shared attribution payload** (a `buildLeadPayload()` helper) sent by **all five** forms: full UTM + referrer + first/last-touch JSONB + `posthog_distinct_id` + landing page + `gclid/fbclid`.
- **Add attribution columns** to the designer/maker/newsletter tables (or a shared `lead_attribution` JSONB) so every lead type carries the same shape.
- **Fix server-side identity:** designer/maker routes use the anonymous `posthog_distinct_id` as `distinctId` and `$set` person properties; mirror the founding **success** event server-side.
- **Channel-grouping helper** + a short UTM naming-convention doc.

### Phase 2 — Visit-counting integrity & consent (week 2–3) — addresses G2, G3, G4, G8, G12

- **Decide the consent model** (cookieless pre-consent pageview vs. strict opt-in) and, if needed, split consent into analytics/marketing categories.
- **Document the source of truth** for raw visits (likely Vercel) vs. product analytics (PostHog).
- **PostHog reverse proxy** via Next rewrites; enable internal-traffic / bot filtering in PostHog.
- **Newsletter double opt-in.**

### Phase 3 — Identity spine (week 3–5) — addresses G15, G16, G17

- Implement `profiles` + `handle_new_user()` + waitlist→profile conversion from the plan.
- **Choose the canonical ID** (recommended: keep email pre-auth, then `alias()` to `auth.uid()` on conversion) and write the cross-surface identify contract.
- Stand up engagement reporting — start with **PostHog-native funnels/cohorts** before building the `engagement_events` reverse-ETL.

### Phase 4 — Cross-platform rollout (week 5+) — addresses G16, remaining D

- Extension / iOS / portal emit against the shared identify contract; build the main conversion funnel and the designer/consumer role funnels.

### Quick wins (do first, all low-risk)

`role` field · honeypot + rate limit on all routes · unify the attribution payload across forms · commit the `waitlist` migration · fix designer/maker `distinctId` · mirror the founding success event server-side.

---

## 5. Verification checklist (live DB — outside this audit's reach)

This review is code-level; the self-hosted Supabase at `api.patina.cloud` couldn't be queried. Please confirm:

- [ ] `waitlist` table exists; list its columns and compare to the `/api/founding` upsert (`first_touch_attribution`, `last_touch_attribution`, `user_agent`, `posthog_distinct_id`, …).
- [ ] Row counts: `waitlist`, `newsletter_subscribers`, `maker_applications`, `founding_designer_applications`.
- [ ] `maker_applications` has `location`, `materials`, `trade_program`; `founding_designer_applications` has `location`, `sourcing_process`. If present, they were added out-of-band → back-fill as migrations.
- [ ] Reconcile: `waitlist` count vs. PostHog `founding_circle_signup` count vs. the on-site founding counter. Large divergence = G1/G14 in effect.
- [ ] Check server logs for `[Founding]/[Newsletter]/[MakerApply]/[DesignerApply]` Supabase errors.
- [ ] Confirm `NEXT_PUBLIC_POSTHOG_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are set in the production (Vercel) environment — if absent, routes log-and-return success and nothing persists.

---

## Appendix — files reviewed

- `src/lib/posthog.ts`, `src/lib/posthog-server.ts`, `src/lib/attribution.ts`, `src/lib/supabase.ts`, `src/lib/analytics.ts`
- `src/app/layout.tsx`, `src/app/providers.tsx`
- `src/app/api/{founding,founding/count,waitlist,newsletter,designers-apply,makers-apply}/route.ts`
- `src/components/ui/{FoundingCircleForm,FoundingCircleModal,NewsletterSignup,WaitlistForm,CookieConsent}/…`
- `src/app/designers/DesignerApplicationForm.tsx`
- `supabase/migrations/*.sql`
- `docs/engagement-tracking-plan.md`, `CLAUDE.md`
