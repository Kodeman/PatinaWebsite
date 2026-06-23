# Analytics Source of Truth

**Status:** Decision record (accepted)
**Date:** 2026-06-23
**Owners:** Growth / Web
**References:** `docs/reports/engagement-capture-audit-2026-06.md` — gaps **G2** (pre-consent visits uncounted) and **G4** (two analytics systems, no documented source of truth).

---

## TL;DR

Patina runs **two** analytics systems on the marketing site, and they measure **different populations on purpose**:

| Question | System of record | Why |
|---|---|---|
| "How many people visited the site?" (raw traffic, visits, page views, Web Vitals) | **Vercel Analytics + Speed Insights** | Runs for **every** visitor, independent of consent. Closest thing we have to ground-truth traffic. |
| "What did our users do, and where did they come from?" (events, funnels, cohorts, attribution, session replay, signup conversion) | **PostHog** | Product analytics over the population of **consented** users only. Rich, identity-stitched, but a deliberate subset. |

These two systems **will never reconcile**, and that is the intended posture — not a bug to be chased. This document explains why, so nobody spends a sprint trying to make the numbers match.

---

## The decision

1. **Vercel Analytics is the source of truth for raw traffic** — total visits, page views, unique visitors, and Web Vitals. When a stakeholder asks "how many people came to the site this week," the answer comes from Vercel.

2. **PostHog is the source of truth for product analytics** — every event richer than a page view (CTA clicks, scroll depth, signup conversion, funnels, retention, cohorts, attribution, session replay), measured over the **consented** subset of visitors.

3. **Strict opt-in is intentional.** PostHog initializes **opt-out by default**. It only captures once a visitor explicitly grants consent (or has previously granted it), and never captures for a visitor with Do Not Track set or who has declined. This is the privacy posture we have chosen — see "Why strict opt-in" below.

These are not interchangeable. Do not quote a PostHog visit count as "site traffic," and do not expect PostHog funnel denominators to equal Vercel visit counts.

---

## Why the two visit counts will never reconcile

The gap between the two numbers is **structural**, driven by four independent factors. None of them can be eliminated without abandoning the privacy posture or one of the two systems.

### 1. Consent gating (the largest factor) — audit G2

PostHog is configured opt-out-by-default in `src/lib/posthog.ts`:

```ts
posthog.init(key, {
  autocapture: false,
  capture_pageview: false,
  // ...
  opt_out_capturing_by_default: dnt || consent !== "granted",
});
```

Consequences:

- A visitor who never interacts with the consent banner is **never captured** in PostHog. Their `$pageview` is suppressed.
- A visitor who **declines** is permanently excluded.
- A visitor with **Do Not Track** enabled (`navigator.doNotTrack === "1"`) is excluded at init and never opted back in.

Vercel Analytics counts **all** of these visitors. So PostHog's visit number is, by construction, **a strict subset** of Vercel's: only visitors who reached the site, saw the banner, and clicked Accept (and don't have DNT) appear in PostHog.

The size of the gap is therefore the **consent rate** plus the **DNT rate** plus the **pre-decision bounce rate** — typically a large fraction of total traffic for a top-of-funnel marketing site.

### 2. Different counting models

- **Vercel** counts page views and visits server-/edge-adjacent, with its own bot filtering and its own definition of a "visit."
- **PostHog** counts `$pageview` events fired client-side on App-Router navigation (`PostHogPageView` in `src/app/providers.tsx`), with PostHog's separate bot/internal-traffic filtering.

Even for the **same** visitor, a single browsing session can produce a different count of "page views" in each system because SPA navigations, prefetches, and bot heuristics are handled differently.

### 3. Ad-blocker and network loss — audit G3 (related)

PostHog currently loads from `us.i.posthog.com` directly (no first-party reverse proxy yet). Ad-blockers and privacy extensions drop a meaningful slice of PostHog requests **even for consented users**. Vercel Analytics is less affected. This widens the gap further. (A `/ingest` reverse proxy would recover some of this, but would not close the consent gap above.)

### 4. Client-only vs. server-side capture

Some conversion events are mirrored server-side (which bypasses consent gating and ad-blockers) while page views are client-only and consent-gated. This means signup counts and visit counts come from different capture paths with different loss profiles — another reason a funnel's top and bottom can't be derived from a single system.

---

## Why strict opt-in (and why we're keeping it)

Strict opt-in is a deliberate choice, not an oversight:

- **Privacy-first brand fit.** Patina's positioning ("Where Time Adds Value," Midwestern warmth, craft trust) is undercut by aggressive tracking. Opt-out-by-default analytics is consistent with the brand promise.
- **GDPR/CCPA posture.** Capturing only after explicit consent, respecting DNT, and minimizing PII is the most defensible regulatory stance. It avoids the legal gray area of "legitimate interest" pre-consent tracking.
- **Data quality over data volume.** The consented population is more engaged and more representative of real prospects than bot/bounce traffic. Funnels built on consented users are cleaner, even if smaller.

The trade-off — top-of-funnel undercounting in PostHog — is **accepted** and absorbed by using Vercel as the raw-traffic source of truth. We get honest total-traffic numbers from Vercel and honest product-behavior numbers from PostHog, without compromising either system's integrity.

> **If the strict posture is ever revisited** (audit G2 lists options such as a cookieless pre-consent pageview, or splitting consent into analytics vs. marketing categories), update this record. Until then, the divergence is by design.

---

## Practical guidance for analysts

- **"How many visits / page views / uniques?"** → Vercel. Never PostHog.
- **"What's our signup conversion rate, by channel?"** → PostHog (numerator and denominator both from PostHog, over consented users). Do **not** divide PostHog signups by Vercel visits — the populations differ.
- **"Which campaign drove the most engaged users?"** → PostHog (attribution + cohorts).
- **"Are we slow on mobile?"** → Vercel Speed Insights.
- **Reconciling the two visit numbers is out of scope.** A PostHog/Vercel ratio that holds roughly steady week-over-week is the signal to watch; the absolute gap is expected and is mostly the consent + DNT rate.

---

## Summary

Two systems, two populations, two questions — by design.
**Vercel = raw traffic. PostHog = consented product behavior.** The numbers diverge because consent gating, counting models, ad-blocker loss, and capture paths differ; strict opt-in is the intentional privacy posture we have chosen to keep. Use each system for the question it actually answers and do not attempt to reconcile their visit counts.
