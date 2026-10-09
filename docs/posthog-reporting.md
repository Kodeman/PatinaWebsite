# PostHog Reporting

**Status:** Daily dashboard and email report provisioned 2026-10-09; the funnels and cohorts in §1–§5 are still a build-by-hand checklist.
**Project:** PostHog 326191 ("Patina Website"), timezone UTC.
**References:** `docs/reports/engagement-capture-audit-2026-06.md` (gap **G17**); `docs/identity-contract.md`; `docs/analytics-source-of-truth.md`; `docs/marketing/utm-convention.md` (campaign tagging).

---

## Provisioned (2026-10-09)

**Dashboard 2084092, "Patina Cloud Traffic & Signups".** Existing tiles plus four added for the October campaigns:

| Insight | Short ID | What it shows |
|---|---|---|
| Yesterday at a glance (Chicago) | `qKp5Ka8k` | Previous America/Chicago day: visitors, pageviews, campaign visitors, signups by type (HogQL) |
| Campaign traffic (UTM) | `l5bxRFxW` | Pageviews by `utm_campaign` × `utm_medium` |
| Studio door: /designers to Founding 50 application | `cffTEkMt` | 14-day funnel `/designers` pageview → `designer_application_submitted`, broken down by first-touch `utm_campaign` |
| Newsletter, contact and consent | `sQXHabhA` | `newsletter_signup`, `newsletter_confirmed`, `contact_form_submitted`, `consent_updated` |

**Subscription 167653, "patina.cloud daily traffic report".** Emails the dashboard to kody@patina.cloud daily at 13:00 UTC (8:00 CDT; 7:00 CST after Nov 1, because the schedule is in UTC). The AI summary is off; turning it on needs the org's AI data-processing approval.

**Per-signup alerts** do not come from PostHog. Each lead route emails kody@patina.cloud from `after()` (see `src/lib/emails/`).

---

## Counting model

Before consent, PostHog runs in cookieless mode (`cookieless_mode: "on_reject"`, project setting `cookieless_server_hash_mode`). Visits are counted anonymously with no cookie or person profile. Accepting upgrades the visitor to a normal identified profile. Do-Not-Track visitors are not captured. Visitor counts are therefore close to real traffic, but person-level funnels only cover visitors who consented or submitted a form.

## Prerequisites: events these reports depend on

Signup events are **server-authoritative**. Each is emitted once from its API route through `captureLeadEvent()` (posthog-node, `$lib = posthog-node`) against the lead's `posthog_distinct_id`. The client does not fire them.

| Event | Emitted from | Key properties |
|---|---|---|
| `$pageview` | `PostHogPageView` in `src/app/providers.tsx` | `$current_url`, `$pathname`, `utm_*` |
| `$autocapture`, `cta_click`, `nav_link_clicked` | browser (autocapture plus named CTAs) | element text, `href`, `location` |
| `founding_circle_signup` | `POST /api/founding` | `role`, `channel`, `source`, `signup_page`, `has_utm`, `sms_consent` |
| `newsletter_signup` | `POST /api/newsletter` | `channel`, `source`, `signup_page` |
| `newsletter_confirmed` | `GET /api/newsletter/confirm` | `email_domain`; person `newsletter_confirmed = true` |
| `designer_application_submitted` | `POST /api/designers-apply` | `email_domain`, `has_company`, `has_website`, `has_motivation` |
| `maker_application_submitted` | `POST /api/makers-apply` | `email_domain`, `has_company`, `has_website`, `has_motivation` |
| `contact_form_submitted` | `POST /api/contact` | `reason`, `email_domain`, attribution |
| `consent_updated` | `CookieConsent` | `status`, `previous_status` |
| `user_identified` | `identifyUser()` in `src/lib/identity.ts` | `platform`, `identification_method` |

The **person property `role`** (`designer` | `consumer` | `unknown`) is set via the lead `$set` path. First-touch UTMs are `$set_once` on the person.

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

**Reads as:** the headline marketing conversion rate. Pair with the on-site founding counter and the `waitlist` row count; they should now match, because the event is emitted only after the row is saved.

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

| Step | Event | Notes |
|---|---|---|
| 1 | `newsletter_signup` | Server event on request. |
| 2 | `newsletter_confirmed` | Server event when the confirmation link is clicked. |

**Config**
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
| `Confirmed subscribers` | persons who performed `newsletter_confirmed` | deliverability-clean newsletter base |

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
- [ ] Build §3 newsletter funnel.
