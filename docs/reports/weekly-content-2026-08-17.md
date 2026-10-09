# Weekly Content Check — Monday, August 17, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`. Previous report: `weekly-content-2026-08-03.md`.

## Status Snapshot

| Bucket | Count | Detail |
|---|---|---|
| Published, last 7 days | 0 | — |
| Drafts in progress | 0 | 10 `drafts.` docs exist, but all are `maker` and `trustBadge` fixtures — zero `journalPost` drafts |
| Scheduled (future `publishedAt`) | 0 | — |
| Total journalPosts in CMS | 3 | Published April 3, 5, 7 — launch seed content |

Nothing has been created or updated in the journal since **April 7** — 19 weeks dormant. The most recent write anywhere in the dataset was three `helpContent` docs on July 28; nothing at all has changed in Sanity in 20 days.

The `tier` field is still null on all three live posts (first flagged 7/28, three reports running).

**Correction to last week's report:** 8/03 stated "no `drafts.` documents exist." Ten do — they're seed fixtures from December and April, not content in progress. The conclusion is unchanged: the journal pipeline is empty.

## Cadence Health (August, day 17 of 31 — 55% through the month)

| Tier | Target/month | Aug MTD | Status |
|---|---|---|---|
| Tier 1 (AI citation articles) | 2 | 0 | 🔴 Past the midpoint with no draft started; 2 is no longer reachable |
| Tier 2 (behind-the-build) | 1 | 0 | 🔴 Achievable, but nothing started |
| Tier 3 (quick-reference) | 1 | 0 | 🔴 Achievable, but nothing started |
| Newsletter (biweekly) | 2 issues | Not verifiable from Sanity | 🟡 Unknown — see below |

Last week's yellows were provisional on something starting. Nothing did, so they turn red. May, June, July, and now most of August have shipped zero articles. The plan's 3-month checkpoint called for 10+ articles; the site has 3, all from launch week.

**Where the capacity went:** the repo shows real work on Aug 11 — the SMS consent/signup flow for A2P 30909, 16 commits. That's a legitimate reason content slipped, and worth naming rather than treating this as pure neglect. But it's also the pattern: engineering work is concrete and deadline-shaped, content isn't, so content loses every week it isn't scheduled.

**Newsletter:** "The Designer's Eye" sends go through Resend and aren't stored in Sanity, so this check still can't confirm whether an issue went out in the last 14 days. Manual check of the Resend dashboard needed. The one-time fix recommended on 7/28 and 8/03 — log sends to a queryable table — has not been built (no `newsletter_send` artifact anywhere in the repo). Fourth consecutive report carrying this line.

## Priority Topics — 10 of 10 Untouched

Unchanged since the plan was written:

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

- **One Tier 3 piece, published.** Not drafted — published. "Room-by-Room Furniture Dimensions Guide" is AI-draftable today and needs only Leah's accuracy pass. This is the only item on this list that can realistically close in seven days.
- **The Leah interview, on the calendar with a date.** Third report recommending it. It has been "the next thing" since 7/28, which means the recommendation itself is what's failing, not the plan.
- **Backfill `tier`** on the three existing posts — 5 minutes in Sanity, all three read as Tier 2. Small enough that four reports of carrying it costs more than doing it.

## Recommended Next Actions

1. **Change the unit of work from "article" to "90 minutes."** The Leah interview keeps not happening because it's scoped as an hour of her time plus prep plus transcription plus drafting. Book 30 minutes, record it on a phone, ask three questions about how she inspects a piece. That's enough for priority #1.
2. **Ship the Tier 3 dimensions guide this week to break the zero.** Nineteen weeks of nothing is its own drag — on search signals, on the newsletter's reason to exist, and on the sense that the journal is a live thing. One published reference page changes the trajectory more than a perfect Tier 1 next month.
3. **Build the newsletter send log.** It's an afternoon at most: a small Supabase table written on Resend send, or a `newsletterIssue` doc type in Sanity. Four reports have carried an unverifiable line; the fix is smaller than the reporting overhead it's causing.
4. **Revise the August target down, in writing.** 4 articles this month isn't happening from a standing start on day 17. Two — one Tier 3, one Tier 1 — is honest and achievable. A target that's been missed four months running has stopped functioning as a target.

### Leah input needed

- 30 minutes on her sourcing-inspection process — the joints, drawer boxes, veneer tells, upholstery checks she actually looks at (feeds priority topics #1 and #2)
- Accuracy pass on the Tier 3 dimensions guide
- One "what I'm working on" note if a newsletter ships

## Blockers

- **Pipeline has no raw material.** Zero journalPost drafts. Third consecutive week flagging this; the Leah interview remains the single unblocking action for all Tier 1 work.
- **Newsletter sends remain unobservable** to this check. Fourth report. This is now a tooling debt, not a status unknown.
- **No owner-with-a-deadline on content.** August's engineering work shipped because it had a compliance deadline attached. Content has a cadence but no date, and loses accordingly. Worth deciding whether the cadence is real — and if it is, putting the next two pieces on the calendar as dated commitments.

---

*Generated automatically. Next run: Monday, August 24, 2026.*
