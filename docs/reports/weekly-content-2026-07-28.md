# Weekly Content Check — Monday, July 28, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`.

## Status Snapshot

| Bucket | Count | Detail |
|---|---|---|
| Published, last 7 days | 0 | — |
| Drafts in progress | 0 | No `drafts.` documents exist |
| Scheduled (future publishedAt) | 0 | — |
| Total journalPosts in CMS | 3 | All published April 3–7, 2026 (launch seed content) |

The three live posts: "Why We're Building Patina" (building-patina), "The Designer as Intelligence Layer" (design-thinking), "What We Look For in a Founding Maker" (maker-stories). Nothing has been created or updated in Sanity since April 7 — the journal has been dormant for roughly 16 weeks.

Note: the `tier` field is null on all three posts. Worth backfilling so future cadence checks can group automatically (these three read as Tier 2 narratives).

## Cadence Health (July, day 28 of 31)

| Tier | Target/month | July actual | Status |
|---|---|---|---|
| Tier 1 (AI citation articles) | 2 | 0 | 🔴 Red |
| Tier 2 (behind-the-build) | 1 | 0 | 🔴 Red |
| Tier 3 (quick-reference) | 1 | 0 | 🔴 Red |
| Newsletter (biweekly) | 2 issues | Not verifiable from Sanity | 🟡 Unknown |

Cumulative gap since the plan's Month 1 (April): the visibility plan's 3-month checkpoint called for 10+ articles; the site has 3. May, June, and July each shipped zero.

**Newsletter:** "The Designer's Eye" issues aren't stored in Sanity (sends go through Resend), so this check can't confirm whether an issue went out in the last 14 days. Recommend a manual look at the Resend dashboard — and if sends aren't logged anywhere queryable, adding a lightweight send log (Supabase table or Sanity doc type) so future checks can verify automatically.

## Priority Topics — 10 of 10 Untouched

None of the Tier 1 priority topics from the visibility plan have been drafted:

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

- Draft Tier 1 priority #1: "How to Tell If Furniture Will Last 20 Years" — the highest-value AI citation target, and it runs entirely on Leah's sourcing expertise.
- Manual newsletter status check (Resend) — if no issue has gone out in July, ship a short one; even a two-section issue keeps the biweekly signal alive.
- Backfill `tier` on the three existing posts.

## Recommended Next Actions

1. **Book a 1-hour Leah interview for article #1.** What she needs to bring: the specific material tests she runs when sourcing (joint types, drawer-box construction, veneer vs. solid checks, upholstery tell-tales), 2–3 real examples with price points, and one story of a piece that fooled her. That interview is the whole raw material — the draft follows the plan's format (question H1, direct answer in paragraph one, self-contained H2 sections, verifiable specifics, author block).
2. **Queue priority #2 ("What Interior Designers Look For That You'd Never Notice") as the second July/August Tier 1** — same interview can feed both if the conversation runs long.
3. **Pick the cheapest Tier 3 win** to restart cadence: "Room-by-Room Furniture Dimensions Guide" is AI-draftable and needs only Leah's accuracy review.
4. **Consider resetting the cadence clock.** Three months behind the plan is a planning fact, not a moral failing — restarting at 4 articles/month from August 1 is more realistic than backfilling.

### Leah input needed
- The sourcing-inspection interview (feeds articles #1 and #2)
- Accuracy review on any Tier 3 reference piece
- One "what Leah's working on this week" note if a newsletter ships

## Blockers

- No drafts exist, so nothing is one-review-away from shipping — the pipeline needs raw input (the Leah interview) before anything can move.
- Newsletter sends aren't observable by this automated check (no Sanity/queryable log). Fix once and this section goes green/red automatically.
