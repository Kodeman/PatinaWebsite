# Weekly Content Pipeline Check — Patina

**Report date:** Monday, 2026-07-27
**Month-to-date:** 27 of 31 days in July (87% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-07-23.md` (4 days ago)

---

## TL;DR — Seventh flat report, and this week the "content is happening elsewhere" defense got weaker.

Journal numbers are identical for the seventh time: **3 published, 0 drafts, 0 scheduled, 111 days since the last publish.** All three tiers red at 87% of July elapsed.

But the surrounding picture changed in two ways that matter:

1. **The whole marketing surface froze on the same day.** The last Sanity write of *any* type is **2026-07-10**. The last commit in the **PatinaWebsite repo is also 2026-07-10** — `2ac7138`, the merge of the unified-messaging-system branch. Seventeen days, both surfaces, one stop date. Marketing isn't being deprioritized in pieces — it stopped as a unit.
2. **The "capacity is committed to the Portal" receipt weakened.** Last week's headline was R98 → R115 (+17 rulings in ten days). This week: **R115 → R115. Zero new rulings.** `patina-merged` logged 32 commits Jul 21–23 and then **0 commits Jul 24–27**. The only live signal is an **uncommitted** `I91` entry in the working tree (written Sun Jul 26) plus an untracked action-visibility HTML study. Real work, but not the acceleration that justified the pause last week.

**The one genuinely good piece of news:** the Jul 10 merge that froze everything is the *unified messaging system* — voice, lexicon, CTA hierarchy, lifecycle email frame. The foundation a journal restart would need is **done and shipped**. The last structural excuse is gone.

**Ask, seventh time: record the pause or restart the lane. Paste-ready lines for both are in *What's Due*.**

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Jul 20 – Jul 27) | **0** | No journal activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (`publishedAt` in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since Apr 7 |
| Newest CMS write, **any** type | **2026-07-10** | 17 days quiet |
| Newest PatinaWebsite commit | **2026-07-10** | 17 days quiet — same date |

### All journal posts in CMS (unchanged, seven reports running)

| Published | Title | Slug | Category | Tier field |
|---|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | building-patina | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | design-thinking | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | maker-stories | null |

Most recent journal `_updatedAt`: **2026-04-07T15:02:12Z** — **111 days ago.**

### Data hygiene flags (unchanged, 15+ weeks)
- All 3 posts still carry `tier: null`, `status: null`; `author` is "Leah" on all three. This check still can't self-audit tier from the CMS.
- Still no `newsletterIssue` doctype among the **19 types / 304 docs** (full type list re-verified this run). Newsletter cadence remains invisible to automation.

---

## Cadence Health (against visibility-plan targets)

### July 2026 — month-to-date (87% elapsed)

| Tier | July target | Published in July | Status |
|---|---|---|---|
| **Tier 1** — AI-citation / expert Q&A | 2 | **0** | 🔴 RED |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | ~2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

July closes at 0/4 with four days left and nothing drafted. This was called at 42% (Jul 13) and 74% (Jul 23); it is now simply the final score.

### Quarter-to-date (May 1 → Jul 27, ~2.9 months)

| Tier | Cumulative target | Published | Gap |
|---|---|---|---|
| Tier 1 | ~6 | 0 | **−6** |
| Tier 2 | ~3 | 0 | **−3** |
| Tier 3 | ~3 | 0 | **−3** |

---

## Priority Topics — Still Untouched (0 / 10)

Unchanged across all seven reports (source: `patina-digital-visibility-plan.md`, **Track 2 §2.1, Tier 1**):

| # | Title | Target query |
|---|---|---|
| 1 | How to Tell If Furniture Will Last 20 Years | "how to tell if furniture is good quality" |
| 2 | What Interior Designers Look For That You'd Never Notice | "what do interior designers look for" |
| 3 | The Real Difference Between $800 and $3,000 Furniture | "expensive vs cheap furniture difference" |
| 4 | How to Furnish a Room in the Right Order | "what order to furnish a room" |
| 5 | What AR Room Scanning Actually Tells You About Your Space | "room scanning apps for furniture" |
| 6 | How Designers Choose Furniture for Clients (The Real Process) | "how do interior designers choose furniture" |
| 7 | Why Most Furniture Recommendations Are Wrong | "furniture recommendation apps" |
| 8 | How to Mix High and Low Price Points Without It Looking Cheap | "mixing expensive and cheap furniture" |
| 9 | What to Ask a Furniture Maker Before You Buy | "questions to ask furniture maker" |
| 10 | The Furniture Your Designer Wishes You'd Stop Buying | "furniture designers hate" |

**On ownership — the plan does not assign topics to people, and this report previously implied it did.** The plan's table has three columns (title, query, why-Patina-wins) and no owner field. Its only ownership language is tier-wide: *"One from Leah's perspective (designer expertise), one from Kody's perspective (technology/product)"* and *"Owner: Leah (expertise), Kody (writing/editing with AI assist)."* That's a rotating monthly voice split, not a fixed per-topic assignment.

**Why it still matters:** the standing account of this blocker is "waiting on Leah," and the plan doesn't actually say that either. By subject matter, **#5 and #7 read as writable by Kody without an interview** — that's this check's inference, not a plan directive, and it's worth testing rather than inheriting.

**Still true from last week:** the Jul 10 `helpContent` corpus (Library, Margin, Orders, "Send a proposal") is effectively topic #6 written as product help copy, for an audience of one designer, behind a login. When the journal restarts, that corpus is a source, not a blank page.

---

## Newsletter Check — "The Designer's Eye"

Target is biweekly → ~1 issue expected in the last 14 days. **Still unverifiable from automation:**

- No `newsletterIssue` doctype exists in Sanity (re-confirmed against the full 19-type list).
- Checked the cloud Supabase this run: **`public.newsletter_subscribers` on Strata has 0 rows** — but Strata is the *portal* DB. Per `CLAUDE.md`, the marketing newsletter lives on the **self-hosted** instance at `api.patina.cloud`, which this scheduled check cannot reach. Treat the 0 as "wrong table," not "no subscribers."
- Actual send history lives in **Resend**, outside every source this check can read.

Working assumption remains "also paused." Fix options unchanged: add a thin `newsletterIssue` doctype (`subject`, `sentAt`, `previewText`, `linkedPost`), point this check at Resend, or drop the newsletter line entirely if content is formally paused.

---

## What's Due This Week (Jul 27 – Aug 3)

**One decision, two paste-ready lines. Pick one. Fifteen minutes either way.**

**Option 1 — record the pause.** Append to `docs/patina-digital-visibility-plan.md`:

> *"Journal + newsletter paused as of 2026-04-07. Content capacity is committed to Designer Portal help content and the design workstream through launch. Restart trigger: [Portal launch shipped / specific date]. Resume with 1 Tier 3 (no dependencies) + 1 Leah interview (Tier 1 #1)."*

**Option 2 — restart small.** Put one line in the same file and book one thing:

> *"Journal restarts 2026-08. First piece: '10 Materials That Age Beautifully in Furniture' (Tier 3, Kody, no dependencies). First interview booked with Leah for Tier 1 #1 by [date]."*

**Then, either way (2 min):** repoint this scheduled check. If paused, snooze it to the restart trigger. Seven identical reports means the *cadence of the check*, not the content, is what's misconfigured — and a channel you've learned to ignore is worthless on the day you need it.

---

## Recommended Next Actions

### Path A — Formally pause

Still defensible, but on thinner evidence than last week. The Jul 24–27 commit gap and the flat R-count mean "capacity is being spent elsewhere" is now an assumption rather than a receipt. If Path A is the call, say what the capacity is going to and name a restart trigger — otherwise the next six reports look exactly like the last seven.

- Record the pause + restart trigger.
- Snooze/repoint this task.
- Decide the newsletter's fate in the same breath — don't pause one lane and let the other quietly rot.

### Path B — Restart, and it just got cheaper

The Jul 10 messaging merge shipped the voice system, lexicon, CTA hierarchy, and email frame. That was the real prerequisite, and it's done. A restart no longer needs a foundation — it needs 90 minutes.

- **Kody, solo, zero dependencies:** draft *"10 Materials That Age Beautifully in Furniture"* (Tier 3, 600–1,000 words, FAQ schema). One sitting breaks a 111-day streak. Voice per `docs/messaging/patina-messaging-system.md` — designers lead, no accuracy claims, no "invisible signals." Something like:
  > *"I've found the materials I trust most aren't the flashy ones. They're the ones that look better the day you hand the piece down than the day it showed up — white oak (~1,360 Janka), full-grain leather, linen, soapstone. Patina isn't damage. It's the record of a thing being lived with."*
  70% practical (what it is, how it ages, how to care for it), 30% why it matters.
- **Second option if that one's stale:** topic #5, *"What AR Room Scanning Actually Tells You About Your Space."* You've spent July inside the scan pipeline — refine hardening, COLMAP qualification, tolerance classes. That's the article, and you've never been better positioned to write it — no interview required.
- **Leah — the one gating input:** a single 60–90 min interview for Tier 1 #1, *"How to Tell If Furniture Will Last 20 Years."* Needs: species + Janka numbers, joint types (dovetail vs. dowel vs. staple), the construction tells she spots at retail, and the 3–5 questions she asks a vendor before specifying. This one interview has gated the Tier 1 lane for **16 weeks.**
- **Then the 30-min schema fix:** add `tier` as an enum on `journalPost` and backfill the 3 posts, so this check can self-audit instead of inferring from titles.

---

## Blockers

- **No recorded decision — still the only real blocker.** Asked Jun 15, Jul 6, Jul 13, Jul 23, and now. `patina-digital-visibility-plan.md` is byte-for-byte unchanged since **2026-04-13**; `DECISIONS.md` (head R115) contains no journal, newsletter, or content-pause entry. Chosen in practice for 111 days, written down nowhere.
- **Leah-input bottleneck (16 weeks) — but probably narrower than assumed.** The plan assigns no topic-level owners; by subject matter #5 and #7 look writable without an interview. Worth testing before treating all ten as gated. Only binding under Path B.
- **Schema gaps unshipped (15 weeks).** `tier`, `status`, `newsletterIssue` flagged since Apr 20; none built.
- **No pipeline buffer.** Zero drafts, zero scheduled — any restart begins from a standing stop.
- **~~Confirmed, accelerating priority~~ → Competing priority, currently idle.** Downgraded from last week. R-count flat, no commits Jul 24–27, and the only movement is uncommitted (I91, Sun Jul 26) plus an untracked HTML study. Work is happening; it isn't outrunning the journal the way it was on Jul 23.

---

## Trend vs. Previous Reports

| Metric | Jun 15 | Jul 6 | Jul 13 | Jul 23 | **Jul 27** | Δ |
|---|---|---|---|---|---|---|
| Total published | 3 | 3 | 3 | 3 | **3** | 0 |
| In draft | 0 | 0 | 0 | 0 | **0** | 0 |
| Scheduled | 0 | 0 | 0 | 0 | **0** | 0 |
| Days since last publish | 69 | 90 | 97 | 107 | **111** | +4 |
| Days since any CMS write | — | — | 3 | 13 | **17** | +4 |
| Days since website commit † | — | — | 3 | 13 | **17** | +4 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0/10 | 0/10 | **0/10** | 0 |
| Schema fixes shipped | 0/3 | 0/3 | 0/3 | 0/3 | **0/3** | 0 |
| `DECISIONS.md` head (R-number) | — | — | R98 | R115 | **R115** | **0** |
| `DECISIONS.md` head (I-number) † | — | — | — | I90 | **I91 \*** | +1 |
| `patina-merged` commits, last 7d † | — | — | — | ~30 | **32** | — |
| …of those, Jul 24–27 | — | — | — | — | **0** | — |

\* uncommitted working-tree change
† **Backfilled this week, not carried forward.** Prior reports never tracked I-numbers, website-commit recency, or commit counts. The Jul 23 I90 figure was recomputed from `git show` at commit `53f5d138`; the "~30" is a re-derivation of the same Jul 21–23 burst, not a number the Jul 23 report stated. Treat these three rows as a new baseline starting today.

Seven consecutive flat journal reports. Last week the only two moving numbers lived outside the journal; this week one of them (the R-count) stopped moving too. Every counter on this table that's still climbing is a counter you'd rather see fall.

---

## Methodology Notes

- Queried Sanity via MCP, project `kv3qrinl` / dataset `production`, `raw` perspective (includes drafts; zero `drafts.*` returned → 0 drafts confirmed). Re-enumerated all 19 doctypes to re-confirm no `newsletterIssue`.
- Confirmed newest write across all types = `2026-07-10T22:32:54Z` (appPage/careersPage/contactPage) → CMS quiet 17 days.
- Website repo `git log`: newest commit `2ac7138`, 2026-07-10 (messaging-system merge) → repo quiet 17 days.
- `patina-merged`: 32 commits in the last 7 days, all landing Jul 21–23 (13 / 5 / 14 by day; scan-pipeline, field-capture, iOS companion); 0 commits Jul 24–27. `DECISIONS.md` max ids R115 · I91 · D14 · L4; I91 and `designer-portal-action-visibility-study.html` are uncommitted/untracked (mtime 2026-07-26 12:50 UTC — Sunday).
- Verified no recorded pause: `patina-digital-visibility-plan.md` mtime 2026-04-13, zero matches for pause/suspend/restart-trigger; `DECISIONS.md` has no journal/newsletter/content entry.
- Newsletter: checked Sanity (no doctype) and cloud Supabase Strata (`newsletter_subscribers`, 0 rows — wrong DB, portal not marketing). The marketing instance (`api.patina.cloud`) and Resend are both unreachable from this scheduled context.
- Tier cadence assessed by inference from publish dates, titles, and `category`, since `tier` is unset on all posts.
- "Published in last 7 days" window: 2026-07-20 → 2026-07-27.
- Ran autonomously as a scheduled task (Kody not present). **Read-only** — no writes to Sanity, Supabase, or any send platform; the only file created is this report, per the task's constraints.
- *Note:* the task file references session path `/sessions/nifty-optimistic-hawking/…`; this run's mount is `/sessions/magical-dazzling-wright/…`. Same repo, path translated automatically.

---

### Incidental finding (not content-related, flagged once)

Supabase's advisor surfaced a **critical** RLS issue on Strata while checking for newsletter tables: `public._comms_backfill_legacy_map` has **Row Level Security disabled** — readable/writable by anyone holding the anon key. It's an internal migration-idempotency map (0 rows), so exposure is low today. Remediation SQL below is **not** applied — enabling RLS with no policies blocks all access, so this is a decision for you, not this check:

```sql
ALTER TABLE public._comms_backfill_legacy_map ENABLE ROW LEVEL SECURITY;
```
