# Weekly Content Pipeline Check — Patina

**Report date:** Monday, 2026-06-15
**Month-to-date:** 15 of 30 days in June (50% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-05-28.md` (18 days ago)

---

## TL;DR — This is the third flat report. Time for a decision, not another red flag.

**Nothing has moved in the journal since April 7.** Same 3 published posts, zero drafts, zero scheduled — identical to both the April 20 and May 28 reports. That's now **69 days of zero new content** against a target of ~4 articles/month, and **0 of 10** Tier 1 priority topics drafted.

The honest read: the content engine isn't slipping, it's parked. Per project context, the team is heads-down on the Designer Portal / "The Document" workstream and a 22-week launch timeline — content was deprioritized on purpose. So the useful move this week isn't to re-ring the same alarm. **It's to make one explicit call: formally pause the content engine until post-launch, or restart it with one low-lift piece this week.** Both are fine. Drifting in the gray — where the automation keeps reporting RED and everyone keeps ignoring it — is the only bad option.

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Jun 8–15) | **0** | No publishing activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (publishedAt in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since April 7 |

### All journal posts in CMS (unchanged from last two reports)

| Published | Title | Slug | Category | Tier field |
|---|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | building-patina | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | design-thinking | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | maker-stories | null |

Most recent journal activity in Sanity: **2026-04-07** (publish date) / **2026-04-07T15:02:12Z** (last `_updatedAt`) — **69 days ago**.

### Data hygiene flags (unchanged for 8+ weeks)
- All 3 posts still have `tier: null`, `status: null`, `tags: null`, `author: null`. Cadence can't be self-audited from the CMS until `tier` exists.
- No `newsletterIssue` doctype. Full type list confirmed (19 types: page singletons, `maker`, `material`, `teamMember`, `testimonial`, `trustBadge`, plus system docs) — nothing newsletter-shaped. Newsletter cadence remains invisible to this report.

---

## Cadence Health (against visibility-plan targets)

### June 2026 — month-to-date (50% elapsed)

| Tier | June target | Published in June | Status |
|---|---|---|---|
| **Tier 1** — AI citation / expert Q&A | 2 | **0** | 🔴 RED — halfway through, nothing in flight |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | 2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

### Quarter-to-date snapshot (Apr + May + Jun = 3 months tracked)

| Tier | Cumulative target | Published | Gap |
|---|---|---|---|
| Tier 1 | 6 | 0 | **−6** |
| Tier 2 | 3 | ~3 (by category inference) | ~even, but all front-loaded in April |
| Tier 3 | 3 | 0 | **−3** |

Tier 2 (brand / behind-the-build) is technically on its 3-month number — but every one of those posts landed in a single April week, and nothing has shipped in the 10 weeks since. The AI-discovery content the visibility plan is actually built on (Tier 1 + Tier 3) sits at a combined **−9**.

---

## Priority Topics — Still Untouched (0 / 10)

All 10 Tier 1 priority topics remain undrafted, same as April 20 and May 28:

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

No `newsletterIssue` doctype exists in Sanity (confirmed against the full 19-type list). If issues are going out, they live outside the CMS and this report can't see them. The plan calls for **biweekly** — for June that's ~2 issues by now. Based on the carry-over from prior reports and zero CMS activity, the working assumption is the newsletter is also stalled, but it **cannot be verified from automation.**

**Recommendation (unchanged):** either add a thin `newsletterIssue` doctype (`subject`, `sentAt`, `previewText`, `linkedPost`) or wire this task to the sending platform (Klaviyo / Mailchimp / ConvertKit / Resend) so cadence becomes checkable. Skip this entirely if the content engine is being formally paused.

---

## What's Due This Week (Jun 15–21)

Backfilling the −9 quarter gap is not realistic and not worth chasing — rushing expert content would undercut the exact quality the AI-citation thesis depends on. So this week is a **decision week**, not a catch-up week:

1. **Make the pause-or-restart call (15 minutes, Kody).** Decide out loud whether content stays parked through launch or restarts now. This single decision is worth more than any article this week. If pausing → snooze this weekly check until a set restart date so it stops generating noise. If restarting → do #2.
2. **If restarting: draft the one piece that needs no one but you.** *"10 Materials That Age Beautifully in Furniture"* (Tier 3). It's the lowest lift on the board, has zero Leah dependency, and breaks the 69-day "0 published" streak in a single sitting.
3. **If restarting: get one 60–90 min slot on Leah's calendar** for priority topic #1, *"How to Tell If Furniture Will Last 20 Years."* The Tier 1 thesis has been gated on this one interview for 10+ weeks.

---

## Recommended Next Actions — The Fork

This is the third consecutive zero-movement report. Re-issuing the same task list would be dishonest about why nothing's moved. Here's the actual fork:

### Path A — Formally pause content until post-launch *(probably the honest choice right now)*
- One line in `DECISIONS.md` or the visibility plan: "Content engine paused until [launch date / week]. Resume cadence: 1 Tier 3 + 1 Leah interview to restart."
- Reschedule this weekly check to fire on the restart date instead of every Monday, so it stops crying RED into the void.
- **Why this is fine:** the Designer Portal *is* the product right now. Shipping it beats publishing about it. The visibility plan even says the window is "narrow but open" — a deliberate 8–10 week pause with a known restart is a strategy, not a failure. What's been happening *without* the explicit decision is the failure mode.

### Path B — Restart with the lowest-friction piece on the board
- **Kody, solo, this week:** draft *"10 Materials That Age Beautifully in Furniture"* (Tier 3, 600–1,000 words, FAQ schema). No interview required. Voice it like you'd actually talk: *"I've found that the materials I trust most aren't the flashy ones — they're the ones that look better the day you finally hand the piece down than the day it arrived."* Lead with the relatable beat, embed the specifics (white oak ~1,360 Janka, full-grain leather, linen, soapstone), close on the patina-as-meaning note. 70% practical, 30% why-it-matters.
- **Leah, this week:** confirm a single 60–90 min interview slot for the "20-year furniture" Tier 1. Inputs needed: species + Janka numbers, joint types (dovetail vs. dowel vs. staple), the construction tells she spots at retail, and the 3–5 questions she asks a vendor before specifying.
- **Then ship the schema fix (~30 min, Kody):** add `tier` as an enum on `journalPost` and backfill the 3 existing posts, so next week's check can self-audit instead of inferring.

### Either path
- Decide the newsletter's fate in the same breath as the journal's. Don't pause one and silently let the other rot.

---

## Blockers

- **No explicit pause/restart decision.** This is now the real blocker — bigger than any single article. Three reports have flagged the same reds because nobody has formally chosen a lane. The cost is automation noise and quiet guilt, neither of which helps.
- **Leah-input bottleneck (10+ weeks).** Every Tier 1 topic is gated on one 60–90 min interview that keeps not getting booked. Highest-leverage unblock *if* Path B.
- **Schema gaps unshipped (8+ weeks).** `tier`, `status`, `newsletterIssue` flagged since April 20; none built. Cadence auditing stays partially blind.
- **No pipeline buffer.** Zero drafts, zero scheduled — every week starts from a standing stop.
- **Competing priority is legitimate, not an excuse.** The Document workstream (slices flipped to default, Dissolve track in build, spec v1.4 pending) is real, sanctioned work. The content engine lost the priority fight fair and square. That just means the pause should be *named*, not drifted into.

---

## Trend vs. Previous Reports

| Metric | Apr 20 | May 28 | Jun 15 | Δ (since May 28) |
|---|---|---|---|---|
| Total published | 3 | 3 | 3 | 0 |
| In draft | 0 | 0 | 0 | 0 |
| Scheduled | 0 | 0 | 0 | 0 |
| Days since last publish | 13 | 51 | 69 | +18 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0/10 | 0 |
| Schema fixes (tier/status/newsletter) shipped | 0/3 | 0/3 | 0/3 | 0 |

The pipeline has been fully stopped for three consecutive reports. The only number that moves is "days since last publish," and it only goes up.

---

## Methodology Notes

- Queried Sanity via MCP against project `kv3qrinl`, dataset `production`, `raw` perspective (includes drafts; zero `drafts.*` docs returned, so 0 drafts confirmed).
- Enumerated all 19 `_type` values to verify no newsletter doctype exists; ran an explicit name-match query for `*ewsletter* / *ssue* / *mail*` → 0 hits.
- Tier cadence assessed by inference from publish dates, titles, and `category` fields, since `tier` is still unset across all posts.
- "Published in last 7 days" window: 2026-06-08 → 2026-06-15.
- This run executed autonomously as a scheduled task (Kody not present). No write actions taken against Sanity or any send platform — read-only audit plus this report file, per the task's constraints.
- Scheduled-task file referenced session path `/sessions/nifty-optimistic-hawking/...`; this run is on a different session. Report written to the equivalent path under the current workspace folder (`docs/reports/`). Sanity is session-independent, so no functional impact.
