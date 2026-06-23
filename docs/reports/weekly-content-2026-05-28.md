# Weekly Content Pipeline Check — Patina

**Report date:** Thursday, 2026-05-28
**Month-to-date:** 28 of 31 days in May (90% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-04-20.md` (38 days ago)

---

## TL;DR

**Nothing has moved in the journal since April 7.** The pipeline state is identical to the April 20 report — same 3 published posts, zero drafts, zero scheduled. That's **51 days of zero new content** against a target of ~4 articles/month. May is effectively a missed month, and the AI-citation thesis (Tier 1 content) is still at zero out of the 10 priority topics.

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (May 21–28) | **0** | No publishing activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (publishedAt in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since April 7 |

### All journal posts in CMS (unchanged from April 20 report)

| Published | Title | Slug | Tier field |
|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | null |

Most recent journal activity in Sanity: **2026-04-07** (publish date) / **2026-04-07T15:02:12Z** (last `_updatedAt`). That's 51 days ago.

### Data hygiene flags (unchanged since last week)
- All 3 posts still have `tier: null`. The April 20 recommendation to add `tier` as an enum on the `journalPost` schema hasn't shipped — cadence can't be self-audited until it does.
- All 3 posts still have `status: null`. If status was intended as a workflow field (draft/review/published), it isn't being used.
- No `newsletterIssue` doctype exists. Newsletter cadence remains unverifiable from the CMS.

---

## Cadence Health (against visibility-plan targets)

### May 2026 — month-to-date

| Tier | May target | Published in May | Status |
|---|---|---|---|
| **Tier 1** — AI citation / expert Q&A | 2 | **0** | 🔴 RED — 90% through the month, nothing in flight |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | 2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

### Year-to-date snapshot

| Tier | Months tracked (Apr + May) | Cumulative target | Published | Gap |
|---|---|---|---|---|
| Tier 1 | 2 | 4 | 0 | **−4** |
| Tier 2 | 2 | 2 | ~3 (by category inference) | +1 |
| Tier 3 | 2 | 2 | 0 | **−2** |

The brand-voice content (Tier 2) is over-indexed, but the AI-discovery content (Tier 1 + Tier 3) — the actual thesis of the visibility plan — is at zero across two consecutive months.

---

## Priority Topics — Still Untouched

All 10 Tier 1 priority topics from the visibility plan remain undrafted (same status as April 20):

1. How to Tell If Furniture Will Last 20 Years *(top priority — Leah's sourcing lane)*
2. What Interior Designers Look For That You'd Never Notice *(top priority — designer POV)*
3. The Real Difference Between $800 and $3,000 Furniture
4. How to Furnish a Room in the Right Order
5. What AR Room Scanning Actually Tells You About Your Space *(Kody lane — product fit)*
6. How Designers Choose Furniture for Clients (The Real Process)
7. Why Most Furniture Recommendations Are Wrong
8. How to Mix High and Low Price Points Without It Looking Cheap
9. What to Ask a Furniture Maker Before You Buy
10. The Furniture Your Designer Wishes You'd Stop Buying

---

## Newsletter Check — "The Designer's Eye"

Still no `newsletterIssue` (or equivalent) doctype in Sanity. If issues are being sent, they live outside the CMS. The visibility plan calls for **biweekly** sends — for May, that's ~2 issues. With no source of truth connected to this report, the assumption (based on Apr 20 carry-over and zero CMS activity since) is that the newsletter has likely also stalled, but this cannot be verified from automation.

**Recommendation (unchanged):** add a lightweight `newsletterIssue` doctype, or wire this scheduled task to the sending platform (Klaviyo/Mailchimp/ConvertKit/Resend) so cadence becomes verifiable.

---

## What's Due This Week (May 28 – June 3)

Realistically, May is a wash. The honest framing is: stabilize June by drafting *now*, rather than chasing a hopeless May target. Tactical goals for this 7-day window:

1. **Schedule one 60–90 minute expert interview with Leah** on priority topic #1 *"How to Tell If Furniture Will Last 20 Years."* This has been the recommended starting point since April 20 and is still the lowest-risk Tier 1 to ship first.
2. **Draft the Tier 3 listicle in parallel** — *"10 Materials That Age Beautifully in Furniture."* Lowest lift on the board. Kody drafts, Leah red-lines in one sitting.
3. **Send a Designer's Eye issue this week** if one hasn't gone out since early May. The plan's biweekly cadence is past due.
4. **Ship the schema fix** — add `tier` as an enum to `journalPost`, backfill on the 3 existing posts. This is a 30-minute task that has been recommended for 5+ weeks.

A second Tier 1 by June 15 (paired with the first) would put June back on cadence. Trying to backfill May's gap on top of June's target is unrealistic and risks rushing the expert-content quality that the whole positioning depends on.

---

## Recommended Next Actions

### This week — Kody
- Block 60–90 minutes on Leah's calendar this week for the "20-year furniture" interview. The interview is the gate; everything else stalls behind it.
- Draft the Tier 3 *"10 Materials That Age Beautifully"* listicle while waiting for the interview slot — this can ship independently and unblocks the "0 in May" red.
- Ship the `tier` enum schema migration + backfill the 3 existing posts. ~30 minutes; unblocks next week's automated check.
- Add a `newsletterIssue` doctype (even a thin one with `subject`, `sentAt`, `previewText`, `linkedPost`) so cadence is verifiable.

### This week — Leah
- Confirm a 60–90 minute interview slot. Specific input needed: material specifics (species, Janka scale, joint types), construction tells designers spot at retail, the 3–5 questions she asks vendors before specifying.
- Newsletter insight: "what I'm working on this week" paragraph for the next *Designer's Eye* issue. ~15 minutes.

### Schema / infra (Kody, one-time, carries over from Apr 20)
- Add `tier` (Tier 1 / Tier 2 / Tier 3) as enum on `journalPost`.
- Add `newsletterIssue` doctype for cadence tracking.
- Consider adding `status` (draft / in-review / scheduled / published) so the weekly check distinguishes WIP from published.

---

## Blockers

- **Leah-input bottleneck is now critical.** The entire Tier 1 thesis has been waiting on a 60–90 minute interview for 5+ weeks. This is the single highest-leverage unblock.
- **Schema gaps still not fixed.** `tier`, `status`, and `newsletterIssue` were all flagged April 20. None have shipped. Automated cadence auditing remains partially blind.
- **No drafts or scheduled posts.** Every week starts at zero. The publishing pipeline has no buffer.
- **No newsletter source of truth.** Cadence can't be verified weekly.
- **Newer context worth flagging:** the project has been heavy on Round 3 synthesis work (pgvector/Coolify/22-week timeline per memory) and the docs-alignment / file-router skill rollouts — the content engine has been deprioritized through that work. Worth deciding explicitly whether content stays paused through launch or restarts now.

---

## Trend vs. Previous Report (Apr 20 → May 28)

| Metric | Apr 20 | May 28 | Δ |
|---|---|---|---|
| Total published | 3 | 3 | 0 |
| In draft | 0 | 0 | 0 |
| Scheduled | 0 | 0 | 0 |
| Days since last publish | 13 | 51 | +38 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0 |
| Schema fixes (tier/status/newsletter) shipped | 0/3 | 0/3 | 0 |

The pipeline is stationary. Not slowing — fully stopped.

---

## Methodology Notes

- Queried Sanity via MCP (`mcp__sanity__query_documents`) against project `kv3qrinl`, dataset `production`.
- Checked both `raw` and `drafts` perspectives — identical results (3 docs, all published from April).
- Enumerated all `_type` values; confirmed no newsletter doctype was added since last report.
- Tier cadence assessed by inference from publish dates and titles, since `tier` is still unset across all posts.
- Scheduled task file referenced session path `/sessions/nifty-optimistic-hawking/...`; this run is on a different session. Report written to the equivalent path under the current session's workspace folder. Sanity is session-independent so no functional impact.
