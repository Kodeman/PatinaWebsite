# Weekly Content Pipeline Check — Patina

**Report date:** Monday, 2026-04-20
**Month-to-date:** 20 of 30 days in April (67% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Apr 13–20) | **0** | Content tap has been closed for 13 days |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (publishedAt in future) | **0** | No runway queued |
| Total journal posts in CMS | 3 | All published between Apr 3 and Apr 7 |

### Published this month (April 2026)
| Date | Title | Category | Tier field |
|---|---|---|---|
| 2026-04-07 | [Why We're Building Patina](https://patina.cloud/journal/why-were-building-patina) | building-patina | null |
| 2026-04-05 | [The Designer as Intelligence Layer](https://patina.cloud/journal/designer-as-intelligence-layer) | design-thinking | null |
| 2026-04-03 | [What We Look For in a Founding Maker](https://patina.cloud/journal/what-we-look-for-founding-maker) | maker-stories | null |

### Data hygiene flag
Every journal post has `tier: null` in Sanity. The visibility plan keys its cadence (2 T1 / 1 T2 / 1 T3 per month) off tier, so without that field set we can't self-audit automatically. Recommend backfilling `tier` on the schema and on these three posts before the next weekly check. *(Mapping best-guess from category: all three read as Tier 2 "Behind-the-Build" narrative content.)*

---

## Cadence Health (against visibility-plan targets)

| Tier | April target | Published so far | Status |
|---|---|---|---|
| **Tier 1** — AI citation / expert Q&A | 2 | 0 | 🔴 RED — zero for the month with 10 days left |
| **Tier 2** — Behind-the-build narrative | 1 | ~3 (by category inference) | 🟢 GREEN — on/over target |
| **Tier 3** — Quick-reference / listicle | 1 | 0 | 🔴 RED — nothing in draft |
| **Newsletter** ("The Designer's Eye") | 2 per month (biweekly) | Unknown — no Sanity schema | 🟡 YELLOW — can't verify from CMS |

**Overall:** The brand-voice content is flowing; the AI-discovery content (which is the entire thesis of the visibility plan) hasn't started. We're stacked toward storytelling and light on the expert / snippet content that actually gets cited.

---

## Priority Topics — Still Untouched

From the 10 Tier 1 priority topics in the visibility plan, **none have been drafted yet**. The full list, in plan-priority order:

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

No `newsletter`, `issue`, or `email` document type exists in the Sanity schema. If newsletter issues are being produced, they live outside the CMS (probably Klaviyo / Mailchimp / ConvertKit — unconfirmed).

**Recommendation:** either (a) add a lightweight `newsletterIssue` doctype so this weekly check can verify cadence automatically, or (b) point this scheduled task at the sending platform directly. Until then the biweekly cadence can't be verified from this automation and should be confirmed manually.

---

## What's Due This Week (Apr 20–26)

To hit April targets before month-end, the realistic stretch is:

1. **One Tier 1 article published by Apr 26** — start with priority #1 "How to Tell If Furniture Will Last 20 Years." Leah is the bottleneck (expert interview needed). Kody drafts after interview.
2. **One Tier 3 reference page drafted by Apr 26** — "10 Materials That Age Beautifully in Furniture" is the fastest to ship (Leah can red-line a Kody-drafted list in one sitting).
3. **Newsletter issue sent by Apr 24** — if one hasn't gone out since early April, the biweekly cadence is about to slip.

Hitting a second Tier 1 by April 30 is probably unrealistic given current WIP (zero). Recommend accepting a 1-Tier-1 month for April and rolling the second into early May, rather than rush-publishing something that undercuts the expert-content positioning.

---

## Recommended Next Actions

**This week (Kody):**
- Set up a 60–90 minute expert interview with Leah on "furniture that lasts 20 years." Use the interview transcript + AI assist to draft — per the plan's Tier 1 format: H1 as the question, direct answer in first paragraph, then depth.
- Draft the Tier 3 listicle ("10 Materials That Age Beautifully in Furniture") in parallel — this is the lowest-lift win on the board.
- Add `tier` values to the 3 published posts in Sanity so next week's automated check can audit properly.

**This week (Leah):**
- Expert input on materials that last — specific species, joint types, construction tells. Plan notes this is her unfair advantage ("white oak rates 1,360 on the Janka hardness scale" style specifics).
- Newsletter insight block: "what I'm working on this week" paragraph for the next Designer's Eye issue.

**Schema / infra (Kody, one-time):**
- Add `tier` (Tier 1 / Tier 2 / Tier 3) as an enum field on `journalPost`.
- Consider adding `newsletterIssue` doctype so cadence is trackable.

---

## Blockers

- **Leah-input bottleneck on Tier 1 content.** The entire Tier 1 thesis depends on her expertise. Without scheduled interview or draft-review time blocked off, Tier 1 will stay at zero.
- **Missing tier metadata in Sanity.** Can't self-audit the plan's cadence targets until this is set.
- **No newsletter source of truth.** Until issues live in the CMS or the sending tool is connected to this report, newsletter cadence can't be verified weekly.
- **No drafts or scheduled posts anywhere.** April's buffer is fully spent — every week from here starts at zero.

---

## Methodology Notes

- Queried Sanity directly via MCP (`mcp__sanity__query_documents`) against project `kv3qrinl`, dataset `production`.
- Checked both `raw` and `drafts` perspectives — identical results (3 docs, all published, none in draft).
- Searched for `newsletter` / `issue` / `email` doctypes — none exist.
- Tier cadence assessed by inference from `category` since the `tier` field is unset across the corpus; flagged as a data-hygiene gap above.
- Scheduled task file referenced session path `/sessions/nifty-optimistic-hawking/...` but this run is on session `fervent-cool-pascal`. Report written to the equivalent path under this session's workspace folder. No functional impact — Sanity is session-independent.
