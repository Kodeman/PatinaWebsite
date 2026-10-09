# Patina — The living study

Design direction proposal, 7 September 2026. This is a presentation and interaction study, not a production website change.

## Plan and review

The subject is the judgment of a working interior designer, expressed through a room and the things within it. The website's immediate consumer goal is Founding Circle membership; the trade goal is Founding 50 applications.

- Palette: warm white #FAF7F2, off-white #EDE9E4, clay beige #A3927C, mocha #655B52, charcoal #3F3B37, proposed olive #4F5948.
- Type: Libre Caslon Display for spacious editorial headlines; Manrope for reading and controls. The serif wordmark remains a typographic study, not a replacement logo.
- Layout: a room-sized visual paired with a short, left-aligned statement; close-up crops lead to a designer's explanation and then a personal invitation.
- Principle: one memorable interaction, the designer's eye. A visitor selects a real object to understand why it belongs. Ordinary navigation and native scrolling stay clear and usable.

Compared structures:

```
Static catalog                Selected: room study
[ headline | product ]        [ positioning | invitation ]
[ card ][ card ][ card ]      [ room photograph + points of interest ]
[ generic value props ]       [ selected material | designer's reasoning ]
                              [ continue with a designer ]
```

Review against the brief: a warm serif layout alone would be generic. Retain the warm colors because they are established Patina tokens, but make the spatial room study the distinctive device. Translate Illoca's subject-specific environment and responsive demonstrations into material and designer stories. Avoid importing its blue drafting grid, technical cursor, or sketch identity. Use motion in response to a selection, not repetitive entrance effects.

## Version 06 — the Founding Circle takes its place

User direction: fold the original site's Founding Circle content into the approved prototype and make joining a first-class action.

Plan before implementation:
- Retain paper #FAF7F2, stone #EDE9E4, clay #A3927C, mocha #655B52, charcoal #3F3B37, and olive #4F5948. Caslon remains the editorial face; Manrope carries benefits and actions.
- Give the opening a visible filled join button and a link to the membership offer. Strengthen the header action and keep a compact joining rail available during the founder passage.
- Name the closing section The Founding Circle. Pair the five existing member benefits with the personal letter, keeping the offer legible as an editorial list rather than five promotional cards.
- Use the published cap of 200 members without inventing remaining places, a deadline, or a live counter.
- Send join actions directly to the existing /founding page. This portable design prototype does not capture or submit personal information.
- Preserve the scroll sequence, founder choreography, and still version.

Content sources: `src/app/founding/FoundingPageContent.tsx`, `src/components/ui/FoundingCircleModal/FoundingCircleModal.tsx`, and `docs/messaging/patina-messaging-system.md`. The five benefits are first access, real influence through monthly questions, behind-the-scenes updates, named recognition at launch, and permanent founding-member status.

Review: the personal letter earns warmth; the benefits explain the commitment. The invitation should make both visible, with a direct route to joining. Keep the 200-member cap as a factual part of the offer, not an invented urgency device.

Implementation and review:
- Added a primary opening join link, strengthened the header action, and linked the opening's supporting text and post-hero strip to the membership offer.
- Replaced the generic closing heading with The Founding Circle. Included all five original member benefits and the published 200-member cap beside the animated personal letter.
- Added a compact joining rail for the founder passage and longer benefits list. It hides when a section join link is fully visible, and retains focus if someone is using its controls.
- Every join action now links directly to `https://patina.cloud/founding` in a new tab. Removed the consumer preview-dialog step. No signup was submitted and no personal information is collected by this artifact.
- Fixed an inherited navigation selector exposing the mobile join link on desktop; refined the mobile title size and rail wrapping. Preserved room → study → making behavior and inactive-context accessibility.
- Reviewed desktop 1440px, tablet 1024px, phone 390px, and compact phone 320px layouts. Checked the mobile menu, membership anchor/focus, direct link destinations, and all five benefit entries. No horizontal overflow was found.
- Motion-off leaves the joining rail usable with zero transition duration and removes the hero's extra scroll distance. No new OS-preference emulation was run.
- The portable homepage and embedded presentation passed JavaScript syntax, IDs, anchors, local/embedded image references, and join-link audits. The embedded offer link and signup destination were checked in-browser; no warning/error logs were reported.
- Captures: `preview-founding-v6.png` and `assets/homepage-mobile-v6.png`. Prior round sources are preserved in `homepage-v5.html` and `presentation-v5.html`.
- Changes are confined to proposal artifacts; no production signup logic or app route was changed.

## Version 05 — a story carried by scrolling

User direction: keep the connected perspectives, advance the hero through room → study → making as the visitor scrolls, and choreograph the rest of the homepage around the founders and the Founding Circle.

Plan before implementation:
- Keep the established paper, stone, clay, charcoal, and olive palette, Caslon headlines, and Manrope reading text.
- Pin the opening for a short native-scroll passage. The chair, images, palette, and view marker change together. Keep direct controls, reverse scrolling, and a link past the sequence.
- Release into an editorial introduction, then a shared visual composition beside two founder passages. Leah's material table gives way to a paper study as Kody's reason for building enters.
- Finish with a letter lifting from an olive envelope: a tangible invitation to join the Founding Circle. The button and message stay readable and operable throughout.
- Respect reduced motion and the visible motion toggle by removing pinned scroll distance and object movement. All story text remains visible.
- Retain the fuller Our story destination, generated-image disclosures, and existing live form destinations.

Review: the scroll should feel like looking more closely, then meeting the people behind the idea. Give motion to photographs, material layers, and paper; keep reading text stable. Use natural page scrolling, with no wheel/touch interception or forced snap.

Implementation and review:
- Added a sticky hero inside a short scroll track. Native scrolling selects the three perspectives with a small threshold dead band; no wheel or touch interception, forced snapping, or automatic loop.
- Direct controls move to the corresponding scroll position. Keyboard arrows, Home/End, reverse scrolling, study/making deep links, and the link past the hero were exercised.
- Moved the header into the held scene; Our story relocates the same header into its own layout. Verified mobile navigation and return to the study.
- Replaced the former studio and continuation rows with an editorial beginning, Leah/Kody passages, a shared belief, and the Founding Circle letter.
- Founder imagery moves independently of the reading text. The desktop material composition changes as Kody enters; mobile uses an inline chair study. The letter movement is measured from the letter holder, so its entrance is visible on mobile.
- Corrected caption overlap, a wrapping hero cue, and the 320 × 568 study layout. Added a manual-control fallback for very short viewports.
- Checked desktop 1440 × 1000, tablet 1024 × 768, phone 390 × 844 and 320 × 568, and landscape 844 × 390. No horizontal document overflow in these checks.
- Motion off collapses the scroll track to one scene, preserves the current perspective, and produces zero transition duration. Device reduced-motion follows the same path; OS preference emulation and print rendering were not exercised.
- Material selection, founder routes, consumer invitation, Escape dismissal, and the portable presentation’s embedded scrolling/story round trip passed. No browser warnings or errors were reported in the inspected preview sessions.
- Source and portable HTML IDs, fragment destinations, JavaScript syntax, image references, and embedded assets passed validation. No production app code changed, so the Next.js build and app E2E suite were not run.
- Round 04 sources are archived in `homepage-v4.html` and `presentation-v4.html`. Preview captures: `preview-homepage-v5.png`, `preview-founders-v5.png`, `preview-invitation-v5.png`, and `assets/homepage-mobile-v5.png`.

## Version 04 — one object, connected perspectives

The critique: round 03 had more imagery and controls, but still repeated familiar split layouts. Its interactions were separate demonstrations. The next pass gives the opening one continuous visual subject.

Plan before implementation:
- Palette: warm white #FAF7F2, off-white #EDE9E4, clay #A3927C, mocha #655B52, charcoal #3F3B37, olive #4F5948.
- Type: Caslon for the protected tagline and editorial headlines; Manrope for compact navigation and explanatory copy.
- Opening: one full-viewport room, with a persistent three-view control. The same chair moves into a material study and then a workshop context.
- Supporting content: one quiet studio composition, a short designer-continuation explanation, and an invitation. Founder hints stay brief; Our story remains separate.
- Motion: coordinated changes in image framing, object scale and placement, color, and the active view marker. No automatic carousel, loop, or compulsory scroll sequence.

```
[ full-room scene + tagline                       ]
[ switch: In the room / As a study / In the making ]
    room -> isolated chair + materials -> workshop
[ studio image / the human point of view          ]
[ designer continuation / personal invitation     ]
```

Review: a full-bleed hero alone is not enough. The specific differentiator is the continuity of the furniture object through the three perspectives. Remove the separate drag-card exercise and decorative room-brief card so they do not compete with that interaction. Keep the production pre-launch and illustrative-image boundaries.

Implementation and visual review:
- Added `assets/chair-study-v4.png`, generated as a transparent-background interpretation of the existing concept chair. Built-in image tool; prompt in `sources/image-prompt-v4.md`. No documented product-to-maker relationship is implied.
- Rebuilt the homepage composition, perspective controls, scene transitions, and responsive behavior. Kept the separate founder story and existing invitation destinations.
- Corrected an annotation overlapping the chair, low contrast on the phone room image, a mobile selector hiding the material note, and deep-link/reload framing.
- Checked all three perspectives at desktop and phone widths; no horizontal document overflow at 320, 390, 1024, or 1440px.
- Checked material selection, keyboard perspective switching, Home/End, mobile menu, founder-story return links, consumer invitation and Escape dismissal, and motion-off (computed transition duration is zero).
- Source and portable JavaScript/anchor/ID/asset checks passed. The embedded presentation supports local view changes and Our story.
- System reduced-motion and print styles are present; OS and print emulation were not run.
- Prior source versions are preserved in `homepage-v3.html` and `presentation-v3.html`.

## Version 03 — a more visual homepage, 9 September 2026

Kody requested warmer, more lived-in visuals, more motion, a homepage prototype, founder hints on the homepage, and a separate Our story section. He confirmed that he is building because existing tools feel sterile and disconnected from the creative process. This motivation is now recorded in the messaging reference.

### Design plan and review

Retain the six established colors and Caslon/Manrope type. Open with a generous room image and a short invitation, followed by a material table and a workshop scene. Use asymmetrical imagery, paper samples, tangible details, and human phrasing. The existing room remains the visual starting point; new imagery expands the world beyond that single room.

```
[ short invitation | room, with a closer look ]
[ material table   | moveable material samples ]
[ workshop image, with a note about the making ]
[ a small founder hint + Our story link        ]
[ designer continuation + Founding Circle      ]

Our story, opened separately:
[ the founders' belief | material-table image ]
[ Leah's perspective / Kody's motivation       ]
[ honest pre-launch invitation                ]
```

Review against the brief: the previous long founder letter interrupted the homepage. Move the full story to its own view. Keep the sense of authorship in three short places: the opening footnote, the tool-making belief beside the samples, and a small founder note after the craft story. The tactile controls make Kody's motivation something visitors can experience.

Motion: one brief opening entrance; user-triggered room reframe; physical sample movement and reset; a small workshop-image shift with scroll; and a maker detail disclosure. No loop or scroll hijacking. A persistent prototype control switches motion off; OS reduced motion disables transitions, animation, and the scroll transform. Direct manipulation remains available.

### Content and imagery

- Kody's motivation: user feedback, September 9, 2026. The story wording is an editorial adaptation, not an attributed verbatim quote.
- Leah's quote: existing Founding Circle welcome email.
- Founder names, roles, founding year, Madison, Middlewest Studio, and pre-launch language: messaging system.
- New assets: `assets/maker-hands-v3.png` and `assets/material-table-v3.png`, with compressed JPEG versions. Generated with the built-in image tool. Prompts: `sources/image-prompts-v3.md`.
- All room, maker, and material images are labeled illustrative. No real maker identity, product provenance, available finish, custom-order capability, or founder portrait is invented.
- The sample table is a local visual exercise, without persistence or product configuration.
- Real founder and maker photography remains a future content step.

### Implementation and validation

`homepage.html` is the editable standalone prototype. Our story has its own hash route with focus management; the homepage contains no full founder biography. Browser Back and links work in standalone mode. Inside the presentation's embedded document, view changes stay local so they do not navigate away from the prototype.

The portable builder produces both HTML deliverables and embeds the homepage into the presentation. Local assets are embedded, including material textures used in CSS.

Validated:
- JavaScript syntax, unique IDs, internal anchors, and asset embedding for source and portable documents, including the embedded homepage.
- Desktop visual review at 1440px; mobile review at 390px and 320px. No document overflow at 320, 390, 1024, and 1440px.
- Room detail and close controls; mouse dragging, keyboard movement, sample selection, and reset.
- Maker disclosure; consumer and maker invitation previews; Escape dismissal.
- Separate story navigation, return links, mobile menu, and embedded story/home navigation.
- Motion-off sets the workshop transform to zero and disables transitions.
- No warning/error console entries in the final standalone preview. OS reduced-motion and print CSS were inspected but not separately emulated.

The new studio image initially retained its HTML height; this was corrected to use the responsive aspect ratio. The embedded preview uses local view state rather than navigating the srcdoc URL.

## Version 02 — founder story exploration, 9 September 2026

The founder presence now starts in the homepage introduction and continues into a dedicated story chapter after the room study. A letter excerpt anchors the layout, with both founders' roles alongside it and a personal Founding Circle invitation below.

Design plan: keep the six existing colors and Caslon/Manrope pairing. Use a left-aligned letter with a quieter founder column; stack them on mobile. The letter is the focal point of the new chapter. No new ornamental handwriting, staged origin scene, or generated founder imagery.

```
[ Leah & Kody introduction | what Patina is becoming ]
[ room study + designer notes                      ]
[ Leah's letter           | the people behind it   ]
[ optional explanation + personal invitation       ]
[ continue with a designer                         ]
```

Review against the brief: names alone would not make this personal. The existing welcome letter gives a specific frustration in Leah's voice and connects the website to an email that already sends. Kody's independent motivation remains an open editorial question; his role description is not a substitute for that story.

Source boundaries:
- Confirmed in the messaging system: names, roles, Madison, founding year, Middlewest Studio, pre-launch state.
- Existing authored copy: the excerpt from `src/lib/emails/founding-welcome.ts`.
- Proposed for review: surrounding homepage, story introduction, invitation, and explanatory copy.
- Still needed: a first-hand origin moment, Kody's account, and actual founder/work photography. The older kitchen-table concept is not treated as confirmed biography.

The presentation includes discussion prompts for these missing details. Its feedback notes field can capture them using the existing local save/download behavior.

Validation for this revision: portable build regenerated; both HTML editions passed JavaScript syntax, unique-ID, and internal-anchor checks. All eight images remain embedded in the portable edition. Browser review covered founder navigation, story disclosure, invitation dialog and Escape dismissal, and room view controls. No document overflow at 320, 390, or 1440 CSS pixels; images loaded and no warning/error logs were reported. Screenshots reviewed at the default desktop viewport and 390px. Reduced-motion and print styles are present but were not emulated.

## Sources

- https://illoca.unseen.co/ — directly inspected in browser 2026-09-07. Drafting grid, oversized headline, blue architectural scene, floating navigation and feature demonstrations. Screenshot included only for reference analysis; no Illoca assets used in proposed website mockups.
- https://patina.cloud/ — directly inspected in browser 2026-09-07. Existing warm interior hero, Founding Circle, designer handoff and maker story.
- ../../docs/messaging/patina-messaging-system.md — authoritative positioning, protected tagline, exact CTA labels, pre-launch honesty and dual audience.
- ../../AGENTS.md — existing palette and architecture.
- Fonts: Libre Caslon Display and Manrope from Google Fonts; SIL Open Font License. Fonts are embedded in the portable HTML. Upstream licenses are retained in sources/.
- Room imagery: generated using the built-in image generation tool; illustrative and not a documented Patina room, maker, product, or material specification. Prompt retained in sources/image-prompt.txt.

## Proposed implementation scope

First: commission one real room shoot with detail crops, obtain product and maker permissions, verify specifications, and have Leah author or approve every designer note. Validate the room-study concept with five homeowners and three working designers before expanding.

Next: implement the homepage, material story and designer landing page in existing Next.js, keeping current forms, consent, attribution and typed analytics. Only ship links and functionality supported by the live product. The cross-platform handoff remains a clearly labeled future product story until available.

Finally: responsive and keyboard QA, reduced-motion review, actual field performance checks, and comparison against the current Founding Circle conversion baseline. Proposed budgets: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile; these are targets, not measured results.

## Deliverables

`index.html` is the editable presentation source and uses local assets. `Patina-The-Living-Study.html` is the single-file portable version with embedded images and fonts. Both work without a build step. Review responses are saved locally when browser storage is available and can be downloaded as Markdown. No responses are sent anywhere.
