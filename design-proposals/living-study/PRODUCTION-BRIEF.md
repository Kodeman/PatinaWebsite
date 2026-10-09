# Patina redesign — production direction interview

Status: core direction interview complete; first production version and launch drafts implemented on `codex/living-study-production`. Release verification and remaining operational decisions are recorded in `docs/launch/living-study/PRODUCTION-HANDOFF.md`.

## Confirmed direction

- Replace the current public website with a complete, production-ready redesign based on the approved Living Study prototype, round 06.
- Preserve the Patina Strata as an existing brand identity element. Confirm the approved production asset and usage before consolidating the existing component variants; do not silently change its proportions.
- Retain the connected room → study → making opening, warmer material character, personal founder story, and prominent Founding Circle invitation.
- Carry forward the original Founding Circle benefits and the published 200-member cap. A cap is not a count of remaining places.
- Prepare for launch; publishing and external campaign distribution are not part of this interview.

## Team review

Creative direction and conversion strategy reviewed the current proposal and existing implementation independently. The production lead reviewed routes, identity components, and the existing lead-capture architecture.

Existing working capabilities include Founding Circle enrollment, designer and maker applications, contact, newsletter double opt-in, welcome emails, attribution, and consent-aware analytics. Their continuity must be accounted for in the migration.

The current messaging source describes the app and marketplace as pre-launch. The interview will establish the intended product state at the redesigned website's launch.

## Round one — confirmed decisions

All four opening questions have been answered. The decisions below reflect Kody’s responses, including departures from the team’s original recommendations.

1. **Decided — include all three audiences, with founding members leading.** Kody selected a modified all-community approach: the homepage and public campaign lean toward founding members, with visible designer and maker messaging and dedicated paths. Kody will personally reach out to designers and makers; the website should substantiate those conversations. Do not treat this as equal campaign weighting for all three audiences.
2. **Decided — pre-launch product state.** Kody confirmed that the app and marketplace will remain pre-launch when the redesigned public website launches. Build the founding community, support designer/maker recruitment, and explain forthcoming capabilities honestly. Do not imply public product access, available downloads, or live marketplace purchasing.
3. **Decided — rooms, materials, and making lead at launch; minimal founder visibility.** Kody and Leah should not be prominent in homepage photography yet. Their words and distinct perspectives remain part of the story. Launch before the complete photography set is available, and add personal/documentary shots later. Prepare a prioritized photography shot list and design image placements so later assets can replace launch imagery without restructuring the experience. The approved generated study imagery remains concept material; review each launch image's source, permitted use, and factual context before publishing. Do not imply that illustrative rooms, furniture, or workshop images document actual Patina founders, products, projects, or partners.
4. **Decided — extensive motion across the website, experienced as exploring Patina’s studio.** Kody wants motion to carry throughout the site, with the feeling of walking through and exploring the studio. This supersedes the recommendation to limit substantial motion to selected stories. Develop connected spaces, purposeful transitions, and visual continuity between rooms, materials, people, and stories. Avoid treating the direction as unrelated entrance effects on every section. Keep actions responsive, navigation understandable, and complete reduced-motion alternatives available.

## Round two — content and launch scope

5. **Delegated — balance founder voices using brand and marketing judgment.** Kody asked the team to make this decision. Use a shared founder voice, with Leah leading design judgment and Kody explaining the creative tools and motivation for building. Keep general marketing copy clear and welcoming; use personal founder notes where they contribute specific meaning. Makers speak for their own documented work. Exact quotations and personal anecdotes require a factual source; editorial founder copy remains draft language for review.

6. **Decided — no browsable furniture catalog in the first release.** Kody confirmed that browsing individual furniture pieces is not important for launch. Do not build product listing/detail discovery as part of this release. Focus on the studio experience, founding membership, and designer/maker invitations, using rooms, materials, and documented craft stories where appropriate. Include existing furniture URLs in the migration audit and map retained or retired destinations deliberately.

7. **Decided — coordinated website and Founding Circle campaign launch; photography follows.** Kody agreed to launch the redesigned website and Founding Circle campaign together, then introduce photography as it becomes available. No launch event is set, and no fixed launch date has been provided. Plan around a reviewed production release rather than an assumed event deadline.

8. **Decided — first acquisition through Leah’s clients, followed by Madison-area press.** Kody expects the first founding members to come from Leah’s clients, then Madison-area press releases and traffic driven to the website. Prioritize a personal client invitation and a factual local press package, with a clear Founding Circle destination for incoming visitors. Drafting launch materials is in scope; sending invitations, contacting media, or publishing a release has not been authorized.

9. **Decided — open membership, regional launch focus.** Founding Circle membership has no geographic limit. Focus initial outreach and press on the Chicago–Madison–Minneapolis corridor. Express Midwest roots as part of the story without implying that membership is restricted to the region.

## Production handoff

The core direction interview is complete. Proceed with the first production version and draft launch materials. Resolve routine design, copy, architecture, and implementation choices using the confirmed direction and existing brand sources. Preserve working lead-capture and consent infrastructure. Deployment, outreach, and campaign distribution remain separate from preparing the reviewed release.

## Remaining content and operational work

- Distinct founder voices and a specific, confirmed origin story.
- What membership feels like immediately after joining and how members see their influence over time.
- Public launch content: real rooms, founders, maker relationships, product imagery, demonstrations, and editorial material.
- Complete route and audience coverage, including existing pages to retain, consolidate, or redirect.
- Launch timing, campaign deliverables, content ownership, and the review process.

## Source material

- `homepage.html` and `DESIGN-NOTES.md` in this directory.
- `docs/messaging/patina-messaging-system.md`.
- `src/app/founding/FoundingPageContent.tsx` and the existing Founding Circle form/modal and welcome flow.
- `src/components/ui/StrataMark/StrataMark.tsx` and `src/components/ui/AnimatedStrataMark/AnimatedStrataMark.tsx`.
- Existing production routes and engagement infrastructure. The shipped-state guidance in repository instructions takes precedence over older implementation-plan to-do lists.
