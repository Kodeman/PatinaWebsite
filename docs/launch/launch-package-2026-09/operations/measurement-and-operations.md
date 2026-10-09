# Launch measurement and daily operations

Prepared 11 September 2026. This is an operating guide and a set of blank working templates; it does not configure a new platform or send any communication.

## Start with the dashboard already built

[Patina Cloud Traffic & Signups](https://us.posthog.com/project/326191/dashboard/2084092) is in the Patina Website PostHog project. It was created and its nine insights verified on 10 September 2026. It defaults to the last 30 days, using the project’s UTC timezone. The campaign calendar uses relative days and should be scheduled locally in America/Chicago.

The dashboard contains:

| Insight | Definition and useful limit |
| --- | --- |
| Website visitors | Unique PostHog people with `$pageview` on `$host = patina.cloud`, deduplicated across the selected date range. Browser traffic depends on analytics consent and may include founder/test browsing. |
| Founding Circle signups | Unique people with `founding_circle_signup`, `surface = marketing-web`, and `$lib = posthog-node`. Browser copies are excluded. These are successful participants, not necessarily first-ever new database members. |
| Designer applications | Unique people with `designer_application_submitted` and the same server/surface filters. Not accepted designers. |
| Maker applications | Unique people with `maker_application_submitted` and the same server/surface filters. Not accepted makers. |
| Daily website traffic | Daily unique visitors alongside raw pageviews. A returning person can appear on several days; do not sum daily visitors to calculate the period total. |
| Visitor to Founding Circle | Same-person website visit followed by server-confirmed enrollment within seven days. Signups without a linked browser visit do not enter this funnel. |
| Most visited pages | People per path; one person can be counted under several paths. |
| Website referral sources | People by recorded referring domain. `$direct` means no referrer was supplied; this is not a full attribution model. |
| Where Founding Circle signups happen | Successful participants by form placement `source`, such as `studio_nav`. This identifies the invitation on the website, not the external campaign source. |

At the 10 September verification, the 30-day calendar window showed 5 measured visitors, 43 pageviews, 1 Founding Circle participant, and no designer or maker applications. This is a **dated instrumentation snapshot**, not a current performance report or an organic launch baseline. Founder/test activity may be present. No campaign in this package has been distributed.

Use the dashboard for directional journeys and the application/enrollment records for operational truth. Do not present a server-signups divided by consented-visitors calculation as a universal conversion rate. Prefer the linked funnel and label its scope.

## The weekly scorecard

Use [weekly-scorecard.csv](weekly-scorecard.csv). Enter the selected period and a snapshot time. Keep the row’s timezone explicit. Record:

1. New non-test Founding Circle records created in the period; maintain a separate adjustment list for duplicates and controlled tests.
2. Designer and maker applications received, reviewed, and awaiting review; note the oldest unanswered application.
3. Measured website visitors, pageviews, and the dashboard’s linked funnel steps.
4. Personal invitations actually sent, substantive replies, press approaches, and journalist responses.
5. Member feedback themes and any operational problem.

For growth, count new database rows using their original creation time and normalized email uniqueness. The Founding endpoint can upsert an existing member, so an analytics event alone does not establish a new member. Do not overwrite the original cohort date during manual reconciliation. This package does not execute database queries or export the member list.

Keep audience paths separate. Do not infer a maker’s identity from the legacy generic lead `role` alone: the shared payload can classify trade sources broadly. Use the actual maker/designer application flow and table/event to identify these audiences.

The headline growth target belongs to the non-test database enrollment count. The dashboard’s unique-person signup count is a companion signal, not a substitute. Email fallback identities and multiple devices can also affect person-level deduplication.

## Campaign links that stay intelligible

[campaign-links.csv](campaign-links.csv) contains the complete launch link registry. Use lowercase values with underscores. Keep `utm_campaign=living_study_launch` for continuity with the earlier launch drafts. Never put a client’s name, address, email, private project, or application answer in a URL.

| Field | Meaning | Example |
| --- | --- | --- |
| `utm_source` | The channel or sender context | `leah_client_invitation`, `founder_outreach`, `instagram`, `linkedin`, `madison_press` |
| `utm_medium` | Distribution method | `email`, `organic_social`, `earned` |
| `utm_campaign` | This campaign | `living_study_launch` |
| `utm_content` | The exact copy/creative placement | `email_01`, `social_01`, `press_01` |

Press registry IDs name markets, not numbered pitch sections: PRESS-01 covers both Madison pitch drafts (sections 1 and 2); PRESS-02 is Chicago (section 3); PRESS-03 is Minneapolis (section 4).

Fragments belong after the query: `/designers?utm_source=…#apply`. Put the Instagram link in the profile or a Story link sticker; a URL in a feed caption is not the intended tap destination. Use generic `utm_content=profile` attribution for a shared profile link, because older posts remain visible. Reserve `social_01`–`social_12` for the actual per-post Story sticker or LinkedIn link. Use the existing homepage’s distinct audience navigation when several posts are active. Do not invent an unbuilt link-in-bio page.

The site’s shared lead payload includes UTM and first/last-touch attribution where available. Its local attribution record expires after 30 days and last-touch updates on tagged visits. The coarse derived `channel` is not sufficient for email reporting; a direct email click can still receive a generic channel classification. Report the explicit UTM fields.

The current nine-tile PostHog dashboard does **not** provide a complete UTM-to-new-enrollment campaign report. Server success events do not all carry the full campaign fields. Reconcile the captured attribution on enrollment/application records and use the link registry with the outreach log. Do not claim an automated campaign ROI report exists. Earned links may lose their tags when edited by a publisher.

## A practical member correspondence system

The live immediate Founding Circle welcome and designer/maker acknowledgements come from **Kody at Patina <hello@patina.cloud>**, with replies to **hello@patina.cloud**. Do not send an additional campaign welcome after the existing welcome. The prepared Day 7, Day 21, and monthly question messages are manual followthrough until deliberately configured in an email platform.

Before a batch, check membership/application status, unsubscribe and suppression preferences, previous sends, and replies. Keep a single send log so a person is not approached separately as a member and a prospect on the same day. A newsletter subscription remains separate and uses its existing confirmation process; joining the Founding Circle does not authorize adding someone to every list.

The draft marketing footer offers a reply-based way to stop notes. Kody must monitor that mailbox and record the preference before another send. Where the sending tool supplies a working unsubscribe link, retain it. Do not replace a real suppression mechanism with decorative footer copy. Essential application responses follow the person’s request; optional campaign followthrough must honor their communication preferences.

Daily during an active wave: check bounces/failures, reply requests, opt-outs, new applications, and overdue responses. Email accepted by a provider is not confirmed delivery. Do not use open rate as the main success measure; useful replies, completed forms, and actual delivery/failure records answer more of this campaign’s questions.

## Templates and the information they hold

- [outreach-tracker.csv](outreach-tracker.csv): blank contact/action log. Assign an internal contact ID; keep personal contact details in the private system already used by the founders, not this shareable repository or launch ZIP.
- [member-feedback-log.csv](member-feedback-log.csv): theme, question, implication, decision, reply date, and permission status. Summarize privately; publish a person’s words or name only with their choice recorded.
- [weekly-scorecard.csv](weekly-scorecard.csv): six blank campaign-week rows. Empty cells mean not entered, not zero.
- [42-day-calendar.csv](42-day-calendar.csv): proposed work, relative timing, asset IDs, owner, dependency, and status. Every row starts as a draft; nothing is scheduled.

## The 30-minute weekly review

**First 5 minutes:** Are replies, delivery, and application deadlines healthy?

**Next 10 minutes:** How many new non-test members joined, and what do the measured journeys suggest? Check exact UTM values alongside the outreach log. Separate unknown attribution from direct traffic.

**Next 10 minutes:** What did people ask? Select one clarification or product question worth addressing. Note which themes came from homeowners, designers, and makers.

**Final 5 minutes:** Assign next week’s two posts, individual outreach, and member followthrough. Reduce distribution if followup capacity is the constraint.

## Dispatch checks specific to this package

Choose the actual T0 date and senders; read the final first-person copy aloud; verify the destination in a normal browser; retain image captions/credits; confirm the person handling replies and the 7-day/2-week review windows; and reconcile the stated program caps with current enrollment handling. The current site still states a 200-member cap; this package does not introduce an automated capacity control or a remaining-places counter.

Automated public GET checks from this preparation environment returned HTTP 403 on 11 September 2026. The deployment and analytics verification from 10 September remain documented, but this package does not claim a fresh end-to-end production signup/email test. Check the live routes in a normal browser before distribution; no synthetic signup or email was sent during preparation.

## Implementation sources

Definitions above were checked against `src/lib/lead-capture.ts`, `posthog-server.ts`, `lead-payload.ts`, `attribution.ts`, the founding/designer/maker API routes, the signup email source, and the dashboard built in this conversation. Earlier launch documents reference `waitlist_signup` as a primary measure; the new dashboard correctly uses `founding_circle_signup`.
