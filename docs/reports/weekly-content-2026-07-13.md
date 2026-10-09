# Weekly Content Pipeline Check — Patina

**Report date:** Monday, 2026-07-13
**Month-to-date:** 13 of 31 days in July (42% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-07-06.md` (7 days ago)

---

## TL;DR — Fifth flat report, but this one found the answer.

The journal numbers are identical again: **3 published, 0 drafts, 0 scheduled, 97 days since the last publish.** Nothing new there.

What *is* new: **Sanity itself is busy.** On Jul 10, ~14 `helpContent` documents were written or updated — `designer-portal--document--library`, `--margin`, `--orders`, `--people`, `--how-to--send-a-proposal` — plus `appPage`, `careersPage`, and `contactPage`. The CMS isn't dormant. The *journal* is.

That reframes four reports' worth of red. This was never a capacity problem or a discipline problem. Content effort is being spent, deliberately and productively, on the Designer Portal's help system — the surface that ships with the product. (DECISIONS.md is at R98 and still moving; that workstream is alive.) The journal is losing a priority fight it was always going to lose while the Portal is the product.

**So stop asking for a pause decision. Just record the one that's already been made, and snooze this check.** That's the entire ask, and it's the fifth time it's been the entire ask.

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Jul 6 – Jul 13) | **0** | No journal activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (`publishedAt` in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since April 7 |

### All journal posts in CMS (unchanged from four prior reports)

| Published | Title | Slug | Category | Tier field |
|---|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | building-patina | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | design-thinking | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | maker-stories | null |

Most recent journal `_updatedAt`: **2026-04-07T15:02:12Z** — **97 days ago.**

### 🆕 New this week: the CMS is active, just not here

Dataset now holds **304 documents across 19 types.** Recent writes:

| Updated | Type | What |
|---|---|---|
| 2026-07-10 | `helpContent` × ~14 | Designer Portal help: Document, Library, Margin, Orders (vendors/receiving/week), People, "Send a proposal" |
| 2026-07-10 | `appPage`, `careersPage`, `contactPage` | Marketing page content |
| 2026-04-07 | `journalPost` × 3 | ← the only lane that hasn't moved |

This is the first time in five reports that "nothing is happening" is demonstrably **false**. Plenty is happening. It's aimed elsewhere, and that appears to be correct.

### Data hygiene flags (unchanged, 13+ weeks)
- All 3 posts still have `tier: null`, `status: null`, `tags: null`. `author` is "Leah" on all three. Cadence still can't self-audit from the CMS.
- Still no `newsletterIssue` doctype among the 19 types. Newsletter cadence remains invisible to this report.

---

## Cadence Health (against visibility-plan targets)

### July 2026 — month-to-date (42% elapsed)

| Tier | July target | Published in July | Status |
|---|---|---|---|
| **Tier 1** — AI citation / expert Q&A | 2 | **0** | 🔴 RED |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | 2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

Last week's report hedged the reds as "trajectory, not calendar" because July was only 19% gone. At 42% elapsed with still zero drafts, that hedge expires: **July cannot hit 2 Tier 1 + 1 Tier 2 + 1 Tier 3.** The month is mathematically gone, not just at risk.

But per the TL;DR — these reds are measuring against a target no one is trying to hit. They're accurate and meaningless at the same time. That's the actual finding.

### Quarter-to-date (May 1 → Jul 13)

| Tier | Cumulative target | Published | Gap |
|---|---|---|---|
| Tier 1 | ~5 | 0 | **−5** |
| Tier 2 | ~2 | 0 | **−2** |
| Tier 3 | ~2 | 0 | **−2** |

*(2.4 months elapsed × the 2/1/1 monthly target, rounded down.)*

---

## Priority Topics — Still Untouched (0 / 10)

Unchanged across all five reports:

1. How to Tell If Furniture Will Last 20 Years *(top priority — Leah's sourcing lane)*
2. What Interior Designers Look For That You'd Never Notice *(top priority — designer POV)*
3. The Real Difference Between $800 and $3,000 Furniture
4. How to Furnish a Room in the Right Order
5. What AR Room Scanning Actually Tells You About Your Space *(Kody lane)*
6. How Designers Choose Furniture for Clients (The Real Process)
7. Why Most Furniture Recommendations Are Wrong
8. How to Mix High and Low Price Points Without It Looking Cheap
9. What to Ask a Furniture Maker Before You Buy
10. The Furniture Your Designer Wishes You'd Stop Buying

**Worth noting:** the help content written Jul 10 (Library, Margin, Orders, Proposals) is *adjacent* to several of these. "How Designers Choose Furniture for Clients (The Real Process)" is arguably being written right now — as product help copy, for an audience of one designer, behind a login. When content restarts, that help corpus is a source, not a blank page.

---

## Newsletter Check — "The Designer's Eye"

No `newsletterIssue` doctype exists (confirmed against the full 19-type list). If issues are going out, they live outside the CMS and this check can't see them. Target is biweekly → ~1 issue expected in the last 14 days; **unverifiable from automation.** Working assumption remains "also stalled."

Recommendation unchanged and still low-priority: either add a thin `newsletterIssue` doctype (`subject`, `sentAt`, `previewText`, `linkedPost`) or point this check at Resend. Skip entirely if content is formally paused.

---

## What's Due This Week (Jul 13–19)

Two items. Both are Kody, both are short, and neither involves writing an article.

1. **Record the pause (15 minutes).** One line in `docs/patina-digital-visibility-plan.md` or a DECISIONS entry:
   > *"Journal + newsletter paused as of 2026-04-07. Content capacity is committed to Designer Portal help content through launch. Restart trigger: [Portal launch shipped / specific date]. Resume with 1 Tier 3 (no dependencies) + 1 Leah interview (Tier 1 #1)."*
   The evidence this week makes this a description of reality, not a new decision. Write it down.
2. **Snooze this check (2 minutes).** Repoint the weekly task to fire on the restart trigger instead of every Monday. Five reports have now produced the same three reds; a check that can't change anyone's behavior is noise, and noise trains you to ignore the channel you'll actually need when content restarts.

---

## Recommended Next Actions

### Path A — Formally pause *(now clearly correct, not just the default)*

Previous reports framed this as "the honest default given inaction." This week's data upgrades it: the Jul 10 `helpContent` writes show content capacity is being **spent**, not squandered — on the surface that ships with the product. Shipping the Portal beats publishing about it. That's a real strategy, and it deserves to be *named* instead of showing up as a red cell in an automated report.

- Record the pause + restart trigger (What's Due #1).
- Snooze/repoint this task (What's Due #2).
- Decide the newsletter's fate in the same breath. Don't pause one and let the other quietly rot.

### If you'd rather restart than pause (Path B — unchanged, and getting cheaper)

- **Kody, solo:** draft *"10 Materials That Age Beautifully in Furniture"* (Tier 3, 600–1,000 words, FAQ schema). Zero Leah dependency; breaks a 97-day streak in one sitting. Voice it the way you'd actually say it — lead with the relatable beat, embed the specifics, close on meaning:
  > *"I've found the materials I trust most aren't the flashy ones. They're the ones that look better the day you hand the piece down than the day it showed up — white oak (~1,360 Janka), full-grain leather, linen, soapstone. Patina isn't damage. It's the record of a thing being lived with."*
  70% practical (what it is, how it ages, how to care for it), 30% why it matters.
- **Leah:** one 60–90 min interview slot for Tier 1 #1, *"How to Tell If Furniture Will Last 20 Years."* Inputs: species + Janka numbers, joint types (dovetail vs. dowel vs. staple), the construction tells she spots at retail, the 3–5 questions she asks a vendor before specifying. This single interview has gated the entire Tier 1 lane for **14+ weeks.**
- **Then the 30-min schema fix:** add `tier` as an enum on `journalPost` and backfill the 3 posts, so this check self-audits.

---

## Blockers

- **No recorded decision — still the only real blocker.** Asked for on Jun 15, Jul 6, and now. Visibility plan is byte-for-byte unchanged since Apr 12; no DECISIONS pause entry exists (that log is at R98 and entirely Designer Portal). The lane has been chosen in practice for 97 days and never written down.
- **Leah-input bottleneck (14+ weeks).** Every Tier 1 topic gated on one unbooked interview. Only matters under Path B.
- **Schema gaps unshipped (13+ weeks).** `tier`, `status`, `newsletterIssue` flagged since Apr 20; none built.
- **No pipeline buffer.** Zero drafts, zero scheduled — any restart begins from a standing stop.
- **~~Competing priority~~ → Confirmed priority.** The Designer Portal isn't crowding out the journal by accident. The Jul 10 help-content writes are the receipt. This is no longer a blocker to lament; it's a decision to ratify.

---

## Trend vs. Previous Reports

| Metric | Apr 20 | May 28 | Jun 15 | Jul 6 | **Jul 13** | Δ |
|---|---|---|---|---|---|---|
| Total published | 3 | 3 | 3 | 3 | **3** | 0 |
| In draft | 0 | 0 | 0 | 0 | **0** | 0 |
| Scheduled | 0 | 0 | 0 | 0 | **0** | 0 |
| Days since last publish | 13 | 51 | 69 | 90 | **97** | +7 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0/10 | 0/10 | **0/10** | 0 |
| Schema fixes shipped | 0/3 | 0/3 | 0/3 | 0/3 | **0/3** | 0 |
| Non-journal CMS writes (7d) | — | — | — | 0 | **~17** | 🆕 |

Five consecutive flat reports on the journal. The one number that finally moved is in the last row — and it moved in a lane this report wasn't built to watch.

---

## Methodology Notes

- Queried Sanity via MCP, project `kv3qrinl` / dataset `production`, `raw` perspective (includes drafts; zero `drafts.*` docs returned → 0 drafts confirmed).
- Enumerated all 19 `_type` values (304 docs total) and pulled everything with `_updatedAt` in the last 30 days — this surfaced the `helpContent` / marketing-page activity that prior reports missed by querying `journalPost` alone.
- Checked `patina-digital-visibility-plan.md` (unchanged since Apr 12), `claude-cowork-automation-plan.md`, and `patina-merged/docs/design/the-document/DECISIONS.md` (head R98) for any recorded content pause → **none found.**
- Tier cadence assessed by inference from publish dates, titles, and `category`, since `tier` is unset on all posts.
- "Published in last 7 days" window: 2026-07-06 → 2026-07-13.
- Ran autonomously as a scheduled task (Kody not present). **Read-only** — no writes to Sanity or any send platform; the only file created is this report, per the task's constraints.
