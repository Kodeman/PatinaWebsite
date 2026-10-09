# Patina — launch sequence and measurement

Draft working plan. No event, launch date, distribution schedule, or external send is booked. Owners below are proposed responsibilities for the launch team; they are not commitments already accepted by an outside party.

## Release sequence

| Stage | Work | Suggested owner | Completion evidence |
| --- | --- | --- | --- |
| 1. Review the complete first version | Review the site, enrollment journey, copy, motion, mobile layouts, and image context. Preserve the approved Patina Strata. Resolve the specific claims in the content release checks. | Kody and Leah, with design/engineering | One reviewed release candidate and documented disposition of unresolved copy |
| 2. Verify the member experience | Complete a controlled enrollment, duplicate enrollment, validation failure, and welcome-email check. Confirm preferences, newsletter separation, attribution, consent choices, and contact/application delivery. | Engineering with Kody | Successful records and expected delivery in the configured system; test data identified for cleanup |
| 3. Prepare the campaign | Finalize the personal invitation, press release, fact sheet, social crops, links, and captions. Put the first monthly member question and founder update on an owned delivery plan. | Leah: client note and design content; Kody: product story and release | Approved assets, actual sender/reply route, assigned update owner |
| 4. Release the website | Deploy the reviewed site when authorized; verify its public enrollment and practical routes immediately afterward. | Engineering/Kody | Public checks pass and rollback is available |
| 5. Begin with client relationships | Leah sends reviewed personal invitations to appropriate contacts. Track replies and questions without adding every client to a bulk audience. | Leah | Working destination, replies monitored, preferences honored |
| 6. Introduce the story locally | Distribute the dated release when authorized, starting with Madison-area press. Expand relevant outreach across the Chicago–Madison–Minneapolis corridor. Publish the consumer launch message alongside it. | Launch communications/Kody | Release date and public links verified; each actual outreach action logged |
| 7. Support designers and makers | Use dedicated website pages and invitation assets in Kody’s direct conversations. Keep consumer membership as the main campaign focus. | Kody with Leah | Inquiries and applications reach the correct flow; personal response ownership clear |
| 8. Follow through | Read member questions, publish the promised founder update, ask the first monthly question, and show how input affected a decision. | Leah and Kody | A real member communication delivered, with replies reviewed |
| 9. Add documentary photography | Replace illustrative images progressively using the shot list. Preserve image subjects, credits, rights records, and truthful room-to-maker relationships. | Design/content | Updated asset register and reviewed responsive crops |

Stages 4–7 require actual deployment/publication/outreach authorization. Completing this package does not perform those actions. The website and Founding Circle campaign form one coordinated launch; photography can follow.

## Campaign links

Use generic channel identifiers. Never put a person’s name, email, client address, or other private information in a URL. These are prepared identifiers, not evidence of traffic or outreach already delivered.

| Placement | Destination with attribution |
| --- | --- |
| Leah’s personal client invitation | `https://patina.cloud/founding?utm_source=leah_client_invitation&utm_medium=email&utm_campaign=living_study_launch&utm_content=personal_note` |
| Madison press outreach link | `https://patina.cloud/?utm_source=madison_press&utm_medium=earned&utm_campaign=living_study_launch&utm_content=living_study` |
| Regional press outreach link | `https://patina.cloud/?utm_source=regional_press&utm_medium=earned&utm_campaign=living_study_launch&utm_content=living_study` |
| Consumer social invitation | `https://patina.cloud/founding?utm_source=patina_social&utm_medium=organic_social&utm_campaign=living_study_launch&utm_content=founding_invitation` |
| Designer outreach | `https://patina.cloud/designers?utm_source=founder_outreach&utm_medium=direct_outreach&utm_campaign=living_study_launch&utm_content=founding_50` |
| Maker outreach | `https://patina.cloud/makers/apply?utm_source=founder_outreach&utm_medium=direct_outreach&utm_campaign=living_study_launch&utm_content=founding_makers` |

Use ordinary canonical links in the press release itself where editorial clarity is preferable. Publications can remove or change tracking parameters, so earned attribution will be incomplete. Treat a tagged link as a channel signal, not proof that a particular placement caused a signup.

## What to measure

The primary outcome is new Founding Circle enrollments. The 200-member cap is not a launch target deadline or a progress counter. Report designer and maker applications separately so all three audiences remain visible.

| Question | Evidence | Interpretation |
| --- | --- | --- |
| Are people joining? | Successful persisted Founding Circle records, reconciled with `waitlist_signup` where analytics consent permits | Distinguish new enrollments from retries, duplicate addresses, and test records |
| Does the invitation lead to enrollment? | `cta_click` → founding destination → successful enrollment within the same observable journey | Label the denominator and consent coverage; do not imply it represents every visitor |
| Which outreach creates useful interest? | Existing first/last-touch attribution and generic campaign identifiers | Compare channels without equating all visits to unique people or assuming complete earned-media attribution |
| Are promised communications arriving? | Configured email delivery events, failures, replies, and member preferences | A queued email is not the same as confirmed delivery |
| Are the supporting paths working? | Persisted designer/maker applications and contact inquiries | Separate applications from accepted partners; respond within the published expectations |
| Is the experience getting in the way? | Form failure rates, consented error signals, usability checks, direct replies | Review mobile and reduced-motion journeys; motion should support exploration and keep joining clear |
| Does membership feel participatory? | Responses to the actual monthly question and a record of decisions informed by members | Share concrete examples with permission; avoid invented engagement claims |

Review operational failures as soon as the site is released. Review acquisition and member feedback after the first invitations, then in a regular weekly launch review. Set numerical acquisition targets only after the available audience, distribution plan, and baseline are known.

## Privacy and continuity checks

- Preserve the existing consent-aware analytics and identity flow. Respect declined consent and Do Not Track; do not enable new blanket autocapture to measure the redesign.
- Keep form submission and essential enrollment functional when analytics is declined. Do not turn marketing consent into a hidden requirement for basic site use.
- Keep newsletter double opt-in separate from Founding Circle enrollment. An invitation recipient is not automatically a subscriber.
- Keep emails, addresses, free-text form answers, and client/project details out of analytics properties and campaign URLs. Do not publish dashboard views that expose individual members.
- Verify the actual marketing preference/unsubscribe mechanism before sending through a campaign tool; preserve existing suppression preferences across the site migration.
- Ask before publishing member names, project details, quotations, or client photographs. Store recognition preferences separately from the act of joining.
- Preserve existing attribution and identity continuity through redirects. Verify legacy entry points, including `/waitlist`, reach the intended working destination.
- Report observed counts honestly. State when consent, blocked tracking, removed parameters, or missing baseline data limit a conversion interpretation.

This plan relies on the project’s existing consent and enrollment architecture. It does not introduce a new tracking platform or a new bulk-email workflow.
