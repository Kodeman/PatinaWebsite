# Patina launch creative guide

Prepared 11 September 2026. These are production artwork files for the approved Living Study direction. Campaign distribution is a separate action; this kit has not been published or sent.

## What is ready

Open `index.html` for the visual library. Six PNGs are exported at their named dimensions. `templates.html` and `templates.css` are editable masters; images, fonts, notices, and Strata SVGs are included in `assets/`. All paths are relative, so the creative folder can move with the launch package.

The compositions prioritize the Founding Circle, with dedicated designer and maker invitations. Founder portraits are not required. The campaign signature remains **Where Time Adds Value.**

## Asset-to-channel map

| ID / file | Dimensions | Primary use | Copy IDs | Destination |
| --- | --- | --- | --- | --- |
| C01 · `exports/c01-founding-square.png` | 1080 × 1080 | Consumer invitation, Instagram feed, benefit reminder, client invitation attachment | SOCIAL-05, SOCIAL-12; neutral fallback for SOCIAL-04 and SOCIAL-09 | `https://patina.cloud/founding` |
| C02 · `exports/c02-founding-portrait.png` | 1080 × 1350 | Consumer room study, Instagram feed | SOCIAL-03, SOCIAL-08 | `https://patina.cloud/founding` |
| C03 · `exports/c03-studio-story.png` | 1080 × 1920 | Vertical studio invitation; static alternative to reel | SOCIAL-01, SOCIAL-10 | `https://patina.cloud/founding` |
| C04 · `exports/c04-designer-portrait.png` | 1080 × 1350 | Designer recruitment, LinkedIn or Instagram single-image post | SOCIAL-06 | `https://patina.cloud/designers` |
| C05 · `exports/c05-maker-portrait.png` | 1080 × 1350 | Maker invitation, Instagram or direct-outreach attachment | SOCIAL-07 | `https://patina.cloud/makers/apply` |
| C06 · `exports/c06-founder-linkedin.png` | 1200 × 627 | Kody’s founder motivation, LinkedIn single-image post | SOCIAL-02, SOCIAL-11 | `https://patina.cloud/founding` |

Use tracked versions of these destinations from the master campaign register. URLs printed in the artwork stay short; clickable post links carry attribution. Social IDs refer to the communications package. Square and portrait artwork can accompany a LinkedIn post without inventing a landscape crop that cuts off the source caption.

## Publishing copy and alt text

Use the matching social caption from the communications package. Image descriptions below can be pasted into the platform’s image-description field. Keep the primary CTA and pre-launch status in the post text as well, so readers do not have to decipher the graphic.

| Asset | Alt text |
| --- | --- |
| C01 | Patina Founding Circle invitation on warm paper against an olive background. A place at the table. Help shape a designer-taught way to find furniture that belongs. Join the Founding Circle at patina.cloud/founding. First access when the app launches. |
| C02 | Patina: Furniture that earns its place. An illustrative room with a timber and leather chair, linen sofa and warm natural light. Illustrative imagery — awaiting partner photography. Help shape Patina; join the Founding Circle at patina.cloud/founding. First access when the app launches. |
| C03 | Patina invites you to help shape what belongs. An illustrative room and an isolated chair study introduce the Living Study. Illustrative imagery — awaiting partner photography. Join the Founding Circle at patina.cloud/founding for first access when the app launches. |
| C04 | Patina invites designers to help shape a platform taught by designers. Hiawatha, a Middle West Studio project; interior design by Leah Kochaver, photography by Ashley Hicks. Apply to the Founding 50 at patina.cloud/designers. The app and marketplace are pre-launch. |
| C05 | Patina invitation to furniture makers. The work deserves to be known. Tell us about the material, the decisions, and the hands that make it. Apply to Partner at patina.cloud/makers/apply. Applications are reviewed by Kody with Leah. The app and marketplace are pre-launch. |
| C06 | Why Kody is building Patina: Tools should feel part of the creative process. Help Leah and Kody shape a more personal way to find furniture that belongs. Join the Founding Circle at patina.cloud/founding. First access when the app launches. |

## Source and credit register

The original local sources were copied without changing their image pixels. Browser rendering crops them inside the composition. A campaign crop does not change what the underlying image documents.

| File in `assets/` | Origin | Used in | Required context |
| --- | --- | --- | --- |
| `room.jpg` | Repository `public/images/studio/room.jpg`; generated editorial concept from the Living Study | C02, C03, motion preview | **Illustrative imagery — awaiting partner photography.** It is not a documented Patina room, available product, or partner project. |
| `chair.png` | Repository `public/images/studio/chair.png`; generated isolated study based on the room concept | C03, motion preview | Same visible illustrative caption. Do not identify it as a purchasable or product-accurate chair. |
| `materials.jpg` | Repository `public/images/studio/materials.jpg`; generated material-table concept | Motion preview | Same visible illustrative caption. No actual founder desk or material-selection history is claimed. |
| `workbench.jpg` | Repository `public/images/studio/workbench.jpg`; generated workshop concept | Motion preview | Same visible illustrative caption. The hands do not depict a known founder or maker. No connected production provenance is claimed. |
| `hiawatha-room.jpg` | Repository `public/images/founders/hiawatha-room.jpg`; [Middle West Studio, Hiawatha](https://www.middlewest.studio/saraha-circle-1), [original image](https://static.wixstatic.com/media/10325b_86ca8a3c090e4fd28f0959b25c7a538b~mv2.jpg) | C04 | Hiawatha, a Middle West Studio project. Interior design: Leah Kochaver. Photography: Ashley Hicks. This is studio work, not a Patina client commission, listing, or partner announcement. |
| `strata-default.svg`, `strata-on-clay.svg` | Exact compact left-aligned geometry from repository `src/components/ui/StrataMark/StrataMark.tsx` | All campaign artwork | Widths 40/32/24; heights 2/1.7/1.4; gaps 3; rounded ends; original variant colors and opacities. Scale uniformly. Do not reinterpret the mark as a new pattern. |
| `libre-caslon-display.ttf`, `manrope.ttf` | Repository `public/fonts/` | All artwork | Fonts copied unchanged. Accompanying SIL OFL notices are included; retain when sharing editable files. |

Kody authorized use of the founders’ public-site images on 10 September 2026; the source register and credit reflect the site’s existing approved assets. No new stock or generated imagery was introduced. Public illustrative captions follow the updated messaging system, superseding older caption suggestions in the image-source README.

## The first real photographs

The existing detailed brief is `design-proposals/living-study/PHOTOGRAPHY-SHOT-LIST.md` in the website repository. This campaign needs the following first, in order:

1. **A real room, left open for type.** Natural light, one distinctive piece, and evidence of someone’s life. Capture both vertical and horizontal compositions. This replaces the C02/C03 room image.
2. **The same chair, considered.** Full outline, matching three-quarter angle, clean background, then a close view in the room. This replaces the C03 study only when the same-piece relationship is verified.
3. **An actual material decision.** Samples that were considered together, with the designer able to explain why. Overhead and over-the-shoulder views. This replaces the motion material scene.
4. **Actual making.** A consenting maker performing a specific technique. Wide context, hands, and a detail. This replaces the workshop scene; use separate context unless the piece/room relationship is known.
5. **Leah and Kody at work.** Hands, sketches, a real prototype, and an unforced discussion. A traditional portrait can follow later. This adds the personal story without making founder headshots the campaign’s front door.

For each photograph, record the actual subject, maker or studio where relevant, photographer, use permission, credit, and one confirmed detail. Capture clean masters without text or filters. Preserve a copy of the original frame and create versioned campaign derivatives. Only remove an illustrative caption from a derivative after every image in that derivative has been replaced by documented photography.

## A 20-minute phone session, available now

**Owner: Leah for design details; Kody for prototype/building details.** Use the real objects already in the workspace. A large new shoot is unnecessary for the first founder update.

- **Minutes 0–3:** Choose a window-lit table. Put three real material samples and the actual working notebook in view. Capture an uncluttered overhead still and a wider still that shows the setting.
- **Minutes 3–8:** Record three steady, 6–8 second clips: a hand turning a sample into the light; a pencil marking an actual selection; a book opening to a relevant reference. Leave a beat before and after each action.
- **Minutes 8–13:** Record Kody using the real website or sketching an actual flow, filmed over the shoulder. Use a clean demo view with private messages and customer information out of frame. Capture one horizontal still for LinkedIn.
- **Minutes 13–18:** Leah and Kody discuss one real choice at the table. Capture hands and objects first, with one wider optional shot. Record the actual explanation separately as a voice memo for factual writing.
- **Minutes 18–20:** Name the files, note who took them, and write one sentence about what was happening. Capture a few seconds of room tone if producing the reel with original audio.

Keep the camera steady, use a native lens, and move physically closer for a detail rather than adding a digital zoom. For vertical video, leave clear space above and below the main action for text and app controls. Natural color and the sound of the real workspace are enough. Do not stage a maker relationship or imply that everyday samples form a finalized Patina product.

## Editing and re-exporting

1. Edit text in `templates.html`; change layout and type only in the corresponding C01–C06 block in `templates.css`.
2. Keep the exact audience CTA. Use `Join the Founding Circle`, `Apply to the Founding 50`, or `Apply to Partner`.
3. Update the image source and credit together. Keep the source caption within the artwork, not only in an external caption.
4. From the website repository run `node docs/launch/launch-package-2026-09/creative/render.mjs`. Outside the repository, make Playwright available in the folder’s parent environment and install its Chromium browser before running `node render.mjs`.
5. Open the exported PNG at native size and at a phone-feed width. Confirm the whole CTA and source caption survive the final publishing preview. `export-manifest.json` records exact dimensions, font readiness, and rendering checks.

The HTML master is an editing canvas at export size. `index.html` is the responsive browsing surface. PNGs are the distribution assets. The motion HTML is an interactive review preview, not an encoded social video; the storyboard explains the final reel edit.
