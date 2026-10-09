# Weekly Content Check — Monday, August 24, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`. Previous report: `weekly-content-2026-08-17.md`.

## Status Snapshot

| Bucket | Count | Detail |
|---|---|---|
| Published, last 7 days | 0 | — |
| Drafts in progress | 0 | No `journalPost` drafts. Five doc types exist (journalPost, servicePackage, teamMember, testimonial, trustBadge) — none are content in progress |
| Scheduled (future `publishedAt`) | 0 | — |
| Total journalPosts in CMS | 3 | Published April 3, 5, 7 — launch seed content |

Nothing in Sanity has been touched since **April 7** — now **20 weeks dormant**. And this week the *repo* was quiet too: zero commits in the last 7 days, most recent anywhere is Aug 11 (`chore: retrigger Vercel deploy`).

That last fact matters. Last week's report gave content a fair alibi — the Aug 11 SMS-consent/A2P 30909 sprint was a real compliance deadline that ate the capacity. This week there's no alibi. No competing engineering work shipped either. The week was simply idle on both fronts, and content still didn't move.

The `tier` field is still null on all three live posts — first flagged 7/28, now the **fifth consecutive report** carrying it. It's a five-minute edit.

## Cadence Health (August, day 24 of 31 — 77% through the month)

| Tier | Target/month | Aug MTD | Status |
|---|---|---|---|
| Tier 1 (AI citation articles) | 2 | 0 | 🔴 Unreachable — 7 days left, no draft, no interview booked |
| Tier 2 (behind-the-build) | 1 | 0 | 🔴 Technically possible, nothing started |
| Tier 3 (quick-reference) | 1 | 0 | 🔴 The only realistically closable item — and only if it ships this week |
| Newsletter (biweekly) | 2 issues | Not verifiable from Sanity | 🟡 Unknown — see below |

The honest read isn't "August is behind." It's that the **4-article monthly cadence has not been operative for five months.** May, June, July, and August have each shipped zero. The plan's 3-month checkpoint called for 10+ articles; the site has 3, all from launch week. A target missed five months running isn't a target anymore — it's a number on a page that the weekly report keeps dutifully measuring against.

So this week the recommendation changes shape. It's no longer "draft the next article." It's: **decide whether the cadence is real.** Either the next seven days break the streak with one shipped Tier 3, or the target gets formally re-scoped (or the pipeline paused) — because an unchanged report flagging the same zero every Monday has stopped being information and started being wallpaper.

**Newsletter:** "The Designer's Eye" sends go through Resend and aren't stored in Sanity — no `newsletter`/`newsletterIssue` doc type, no send-log table in `supabase/`. Fifth report unable to confirm whether an issue went out in 14 days. The one-afternoon fix (log sends to a queryable table) still isn't built. Manual Resend-dashboard check remains the only way to verify.

## Priority Topics — 10 of 10 Untouched

Unchanged since the plan was written in April:

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

- **One Tier 3 piece, published.** "Room-by-Room Furniture Dimensions Guide" is AI-draftable today and needs only Leah's accuracy pass. It is the single item on this list that can realistically close in seven days, and it's the cheapest way to break 20 weeks of zero.
- **The Leah interview, booked with an actual date.** Fourth report recommending it. It's been "the next thing" since 7/28 — which tells us the ask, not the plan, is what keeps failing.
- **Backfill `tier`** on the three existing posts (all read as Tier 2). Five minutes; five reports of carrying it now cost more than doing it.

## Recommended Next Actions

1. **Ship the Tier 3 dimensions guide this week to break the zero.** One published reference page moves the trajectory — on search signals, on the newsletter's reason to exist, on the sense that the journal is alive — more than a perfect Tier 1 that keeps not arriving. Angle, in Patina's voice: *"I used to guess at whether a sofa would swallow a room. Here's the cheat sheet I wish I'd had — the real clearances designers work to, room by room, and what changes when you actually scan the space."* First-person, one honest admission up front, then the useful table. Leah reviews for accuracy; it ships.
2. **Book the Leah 30-minute interview as a dated calendar hold — not a task.** Record it on a phone, three questions about how she inspects a piece (joints, drawer boxes, veneer tells, upholstery). That single session is the raw material for priority topics #1 and #2 and unblocks all Tier 1 work.
3. **Make the cadence call, in writing.** Either commit the next two pieces (one Tier 3 this week, one Tier 1 next) as dated calendar commitments the way the SMS work was — or revise the monthly target down to a number that's true (one piece/month is honest from a standing start) or pause the pipeline until there's capacity. Any of the three is fine. Continuing to miss four/month silently is the only bad option.
4. **Backfill `tier` and build the newsletter send-log.** Both are sub-afternoon. The send-log (a small Supabase table written on Resend send, or a `newsletterIssue` doc in Sanity) ends five reports of an unverifiable line and costs less than the reporting overhead it keeps generating.

### Leah input needed

- 30 minutes on her sourcing-inspection process — the joints, drawer boxes, veneer tells, upholstery checks she actually looks at (feeds priority topics #1 and #2)
- Accuracy pass on the Tier 3 dimensions guide
- One "what I'm working on" note if a newsletter ships

## Blockers

- **Pipeline has no raw material.** Zero `journalPost` drafts. The Leah interview remains the single unblocking action for all Tier 1 content — unchanged for four reports.
- **Newsletter sends remain unobservable** to this check. Fifth report. This is settled tooling debt now, not a status unknown.
- **No dated owner on content — and this week, no cover story.** August's SMS work shipped because it had a compliance date attached; content has a cadence but no date, and loses accordingly. This week nothing competed for the time and content still didn't move, which points past "priorities" to "the commitment isn't dated."
- **The report may have reached its limit as an intervention.** Five weeks of the same findings with no change is worth a decision in itself: keep the check running as a passive tripwire, re-scope the target it measures against, or pause it until the pipeline is live again. Flagging it rather than quietly generating a sixth identical report next Monday.

---

*Generated automatically. Next run: Monday, August 31, 2026.*
