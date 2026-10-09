# Weekly Content Check — Monday, August 3, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`. Previous report: `weekly-content-2026-07-28.md`.

## Status Snapshot

| Bucket | Count | Detail |
|---|---|---|
| Published, last 7 days | 0 | — |
| Drafts in progress | 0 | No `drafts.` documents exist |
| Scheduled (future publishedAt) | 0 | — |
| Total journalPosts in CMS | 3 | All published April 3–7, 2026 (launch seed content) |

No change since last week's check. Nothing has been created or updated in Sanity since April 7 — the journal has now been dormant for ~17 weeks. July closed at 0 of 4 planned articles.

The `tier` field is still null on all three live posts (flagged 7/28, not yet backfilled).

## Cadence Health (August, day 3 of 31)

| Tier | Target/month | Aug MTD | Status |
|---|---|---|---|
| Tier 1 (AI citation articles) | 2 | 0 | 🟡 Early in month — but no draft in pipeline, so red by ~Aug 10 without a start |
| Tier 2 (behind-the-build) | 1 | 0 | 🟡 Same |
| Tier 3 (quick-reference) | 1 | 0 | 🟡 Same |
| Newsletter (biweekly) | 2 issues | Not verifiable from Sanity | 🟡 Unknown |

August is a clean slate on paper, but the yellow is soft: with zero drafts in Sanity, there is nothing one-review-away from publishing. May, June, and July each shipped zero; the plan's 3-month checkpoint called for 10+ articles and the site has 3.

**Newsletter:** "The Designer's Eye" sends go through Resend and aren't stored in Sanity, so this check still can't confirm whether an issue went out in the last 14 days. Manual check of the Resend dashboard needed. (Standing recommendation: log sends somewhere queryable — a small Supabase table or Sanity doc type — so this line goes green/red automatically.)

## Priority Topics — 10 of 10 Untouched

Unchanged from last week. None of the Tier 1 priority topics have been drafted:

1. **How to Tell If Furniture Will Last 20 Years** ← priority #1
2. **What Interior Designers Look For That You'd Never Notice** ← priority #2
3. The Real Difference Between $800 and $3,000 Furniture
4. How to Furnish a Room in the Right Order
5. What AR Room Scanning Actually Tells You About Your Space
6. How Designers Choose Furniture for Clients (The Real Process)
7. Why Most Furniture Recommendations Are Wrong
8. How to Mix High and Low Price Points Without It Looking Cheap
9. What to Ask a Furniture Maker Before You Buy
10. The Furniture Your Designer Wishes You'd Stop Buying

## What's Due This Week

- **The Leah interview.** This is the single unblocking action — a 1-hour conversation on her sourcing-inspection process feeds both priority #1 and priority #2. It was the top recommendation on 7/28 and hasn't happened; everything downstream waits on it.
- **Newsletter status check** in Resend. If nothing shipped in July, send a short two-section issue this week to restart the biweekly signal.
- **Backfill `tier`** on the three existing posts (5-minute Sanity edit; all three read as Tier 2).

## Recommended Next Actions

1. **Put the Leah interview on the calendar before anything else.** Bring: the specific material tests she runs when sourcing (joints, drawer-box construction, veneer vs. solid, upholstery tells), 2–3 real examples with price points, one story of a piece that fooled her. One conversation → two Tier 1 drafts.
2. **Draft "How to Tell If Furniture Will Last 20 Years" within 48 hours of the interview** while it's fresh — question H1, direct answer in paragraph one, self-contained H2 sections, verifiable specifics, author block.
3. **Run the "Room-by-Room Furniture Dimensions Guide" (Tier 3) in parallel** — it's AI-draftable now and needs only Leah's accuracy pass. Cheapest way to get something publishing again this month.
4. **August as the reset month.** Treat 4 articles this month as the goal, not backfilling the spring gap. Three shipped pieces in August beats a plan to ship twelve.

### Leah input needed
- The sourcing-inspection interview (feeds articles #1 and #2)
- Accuracy review on the dimensions guide (Tier 3)
- One "what I'm working on this week" note if a newsletter ships

## Blockers

- **Pipeline has no raw material.** Zero drafts exist; the Leah interview is the bottleneck for all Tier 1 work. Second consecutive week flagging this.
- **Newsletter sends remain unobservable** to this automated check. One-time fix (send log) makes this section automatic.
