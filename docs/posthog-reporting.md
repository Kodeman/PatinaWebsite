# PostHog Reporting — Funnels & Cohorts to Build

**Status:** Spec (build-in-PostHog checklist — nothing here is provisioned by code)
**Date:** 2026-06-23
**Owners:** Growth / Web
**For:** Kody to build by hand in the PostHog UI
**References:** `docs/reports/engagement-capture-audit-2026-06.md` — gap **G17** (no reporting layer); `docs/identity-contract.md` (canonical-ID contract); `docs/analytics-source-of-truth.md` (PostHog = consented product analytics).

---

## TL;DR

This is the **PostHog-native** reporting layer — funnels and cohorts built inside PostHog Cloud, fed directly by the events the marketing site already emits. It is the recommended first move from the audit (**G17**): stand up funnels and cohorts before investing in the `engagement_events` reverse-ETL sync.

> **Do not build these in code.** These are saved Insights and Cohorts created in the PostHog UI. This document specifies *what* to build so the reporting is consistent and reproducible. Nothing here ships in the repo.

All measurement is over the **consented** population only — PostHog is opt-out by default and never captures for a Do-Not-Track or declined visitor (see `docs/analytics-source-of-truth.md`). Funnel denominators will **not** match Vercel traffic; that is intentional.

---

## Prerequisites — events these funnels depend on

Every step below references an event the site already emits via `src/lib/analytics.ts`. Confirm these are arriving in PostHog **Activity** before building:

| Event | Emitted from | Key properties used in reporting |
|---|---|---|
| `$pageview` | manual SPA capture (PostHog `capture_pageview: false`, fired on navigation) | `$current_url`, `$pathname` |
| `founding_circle_signup` | `FoundingCircleForm` / `FoundingCircleModal` (client) | `role`, `channel`, `source`, `signup_page`, `has_utm` |
| `newsletter_signup` | `NewsletterSignup` (client) | `role`, `channel`, `source`, `signup_page` |
| `designer_application_submitted` | designer form (client) | `email_domain`, `has_company`, `has_website`, `has_motivation` |
| `maker_application_submitted` | maker form (client) | `email_domain`, `has_company`, `has_website`, `has_motivation` |
| `user_identified` | `identifyUser()` in `src/lib/identity.ts` | `platform`, `identification_method` |

**Person property `role`** (values: `designer` | `consumer` | `unknown`) is set via the lead `$set` path and is the breakdown dimension for every role-segmented funnel below. Confirm it is populated on persons before relying on the role funnels.

> **Newsletter `confirmed` caveat:** the double-opt-in confirmation step (audit **G12**) is not yet wired to a PostHog event. The newsletter signup → confirmed funnel below is **specced but blocked** until a `newsletter_confirmed` event is emitted (see that section).

---

## 1. Main conversion funnel — visit → founding signup

**Type:** Funnel
**Name:** `Main · Pageview → Founding Signup`

| Step | Event | Notes |
|---|---|---|
| 1 | `$pageview` | Entry. Any page. |
| 2 | `founding_circle_signup` | The primary site conversion. |

**Config**
- **Conversion window:** 7 days (covers return-visit conversions; tighten to 1 day for a same-session view).
- **Breakdown:** by `channel` (the `classifyChannel` bucket: `organic` | `paid` | `social` | `referral` | `direct`) to see which acquisition channel converts best. Add a second saved copy broken down by `role`.
- **Order:** sequential (step 2 must follow step 1).

**Reads as:** the headline marketing conversion rate. Pair with the on-site founding counter and the `waitlist` row count — divergence between this funnel's step-2 count and the DB row count is the audit **G14** symptom (client-only event vs. server-saved row).

---

## 2. Role funnels — designer / consumer / maker

Three saved copies of the main funnel, each scoped to one audience via the `role` person property or the role-specific application event. These answer "how well does each audience convert?"

### 2a. Designer conversion
**Name:** `Role · Designer → Application`

| Step | Event |
|---|---|
| 1 | `$pageview` |
| 2 | `designer_application_submitted` |

- **Filter:** person property `role = designer` on step 1 (optional — narrows the denominator to self-identified designers).
- **Breakdown:** `channel`.

### 2b. Consumer conversion
**Name:** `Role · Consumer → Founding Signup`

| Step | Event |
|---|---|
| 1 | `$pageview` |
| 2 | `founding_circle_signup` |

- **Filter:** person property `role = consumer`.
- **Breakdown:** `channel`.

### 2c. Maker conversion
**Name:** `Role · Maker → Application`

| Step | Event |
|---|---|
| 1 | `$pageview` |
| 2 | `maker_application_submitted` |

- **Breakdown:** `channel`. Makers are a distinct supply-side audience; keep this separate from the designer funnel even though both are "application" events.

> **Role as the segmentation key:** all three lean on the `role` person property populated at signup. Where role is `unknown`, the lead still appears in the relevant *application* funnel (2a/2c) because the event itself is the audience signal; the `role` filter is the refinement, not the gate.

---

## 3. Newsletter funnel — signup → confirmed

**Type:** Funnel
**Name:** `Newsletter · Signup → Confirmed`
**Status:** SPECCED — BLOCKED on a `newsletter_confirmed` event.

| Step | Event | Notes |
|---|---|---|
| 1 | `newsletter_signup` | Fires on form submit. |
| 2 | `newsletter_confirmed` | **Not yet emitted.** See below. |

**Why it's blocked:** double opt-in (audit **G12**) is being added — `newsletter_subscribers` gained `confirmed` / `confirmation_token` columns — but no `newsletter_confirmed` PostHog event exists yet. The confirmation handler (the link a subscriber clicks) must `capture("newsletter_confirmed", { email_domain })` against the lead's `posthog_distinct_id` for this funnel to populate.

**Until then,** measure confirmation rate from the DB: `count(confirmed = true) / count(*)` on `newsletter_subscribers`. Move it into PostHog once the event ships.

**Config (once unblocked)**
- **Conversion window:** 3 days (confirmation emails are acted on quickly or not at all).
- **Breakdown:** `source` (footer / inline / journal) to see which placement yields confirmable addresses.

---

## 4. Application funnel — designer / maker quality

**Type:** Funnel
**Name:** `Applications · Started → Qualified`

A within-application-event funnel that measures **application quality**, using the boolean properties the forms emit (`has_company`, `has_website`, `has_motivation`). Build one for designers, one for makers.

| Step | Event | Filter |
|---|---|---|
| 1 | `designer_application_submitted` (or `maker_application_submitted`) | none — all submissions |
| 2 | same event | `has_website = true` **and** `has_motivation = true` |

**Reads as:** what share of applicants submit a "complete" profile (website + motivation present). A low rate flags either a friction problem in the form or low-intent traffic. Break down by `email_domain` is noisy — prefer breakdown by `channel` if available, otherwise leave unbroken.

> **Note:** because both quality signals are properties on the *same* event, this is a single-event funnel filtered on step 2, not a two-event sequence. PostHog supports this via per-step property filters.

---

## 5. Cohorts to define

Cohorts are reusable person filters that feed the funnels above and power retention/segmentation later.

| Cohort | Definition | Use |
|---|---|---|
| `Designers` | persons where `role = designer` | scope role funnels, future portal retention |
| `Consumers` | persons where `role = consumer` | scope consumer funnel |
| `Paid-acquired` | persons where `channel = paid` (last value) | ROAS-adjacent conversion analysis |
| `Identified users` | persons who performed `user_identified` | post-auth cross-surface base once extension/iOS emit |
| `Confirmed subscribers` | persons who performed `newsletter_confirmed` | (blocked — see §3) deliverability-clean newsletter base |

---

## Deferred — `engagement_events` reverse-ETL

The richer engagement-scoring views and cross-surface retention dashboards in `docs/engagement-tracking-plan.md` assume an `engagement_events` table in Supabase fed from PostHog (audit **G17**). That reverse-ETL sync is **deferred** — the `engagement_events` table exists (migration `20260623000005`) but is intentionally unpopulated. Build the PostHog-native funnels and cohorts above first; only invest in the sync if PostHog-native reporting proves insufficient.

---

## Build checklist

- [ ] Confirm all prerequisite events (table above) arrive in PostHog **Activity**.
- [ ] Confirm the `role` person property is populated on persons.
- [ ] Build §1 main funnel (+ `channel` and `role` breakdown copies).
- [ ] Build §2a / §2b / §2c role funnels.
- [ ] Build §4 application-quality funnels (designer + maker).
- [ ] Define §5 cohorts.
- [ ] Park §3 newsletter funnel until `newsletter_confirmed` ships; measure from DB meanwhile.
