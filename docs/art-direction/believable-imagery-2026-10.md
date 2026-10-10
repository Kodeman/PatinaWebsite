# Art direction: believable imagery for patina.cloud

*2026-10-10. Creative direction, art direction and web design, synthesized. Team briefs: [creative director](team/creative-director.md), [art director](team/art-director.md), [web design](team/web-design.md). Governing canon: `patina-merged/marketing/canon/art-direction.md` §3 (2026-10-09 ruling), §5, §6.*

## Why the current set reads as generated

The four launch studies (`public/images/studio/room.jpg`, `chair.png`, `workbench.jpg`, `materials.jpg`) fail on three counts.

1. **Geometry.** The chair's back posts end in mid-air, a rail crosses a leg without a joint, and the straps sit at different heights. The tenon in the workbench shot never seats.
2. **Render grammar.** Each has one amber sun, a halo on black, smeared plaster and crushed blacks. Nothing in them dates the picture to now.
3. **The wrong story.** The headline says *for studios*. The pictures show a showroom, then a product cutout, then a craftsman's hands. Canon retired all three.

The Middle West photos read as true because they keep the mundane in frame: a floor register, a switch plate, an outlet on the island end. Pictures that show the work in progress can carry that texture. Hero furniture cannot.

## The idea

**One page, three places: the studio table, the house mid-build, and the finished room Leah's studio delivered.**

- **Real where it can be.** Finished rooms come only from the credited Middle West photos. Generated images show work in progress (studio, site, shop) and never a finished home.
- **Bright and current.** Daylight plus LED overheads, laptops, a monitor, phones, printed plans, white walls and pale oak. No black grounds, sunbeams or sepia.
- **Mundane density.** Each frame keeps outlets, painter's tape, cords, sample tags and boxes still in cardboard.
- **People mid-task, two or three sharing one page.** Faces sit at a natural distance and never look toward the lens.
- **Low geometry risk.** Chairs and joinery stay out of focus or out of frame. Frames favor flat, rectilinear subjects: plans, tile, fabric books and cabinet boxes.

## Believability gate

The art director's 15-point checklist ([team/art-director.md §2](team/art-director.md)) is the pass/fail gate. One FAIL rejects the frame. The short form:

- Count the legs.
- Check every joint.
- Check every hand.
- Screens show plans, not words.
- No letters anywhere.
- Verticals stay vertical.
- Shadows fall away from the window.
- Materials are at true scale.
- An outlet in any long wall.
- Construction logic holds.
- Nobody looks into the lens.
- Midwest cues are present.
- Neutral grade.
- Some real clutter.
- No clones.

**Motion gate (added for loops):**
- No face turns toward the camera at any frame.
- No warp in hands or paper.
- Luminance drift under 5 levels across the clip, which rules out flicker.
- First/last-frame SSIM ≥ 0.94 for a clean seam.

## What was made (Midjourney v8.2, raw, stylize 40, profile P)

All picks below passed the gate at 100% and were upscaled with Upscale (Subtle). The working files live in the session scratchpad and are listed in the provenance register once they are integrated.

| File (`public/images/studio/`) | Shot | Size | Use |
|---|---|---|---|
| `studio-table.jpg` | Two designers laying out fabric, tile and a door sample beside plans; laptop open | 2400×1345 | Homepage scene 1 poster |
| `site-visit.jpg` | Designer, contractor and homeowner on one tablet in a framed kitchen | 2400×1345 | Homepage scene 3 poster |
| `cabinet-shop.jpg` | Cabinetmaker checking a white oak door against a shop drawing on a laptop | 2400×1345 | Makers hero poster, maker study, apply page |
| `sample-library.jpg` | Designer pulling a fabric book from floor-to-ceiling sample shelves | 2400×1345 | Designers hero |
| `designer-desk.jpg` | Designer between laptop, monitor floor plan and printed set | 2400×1600 | Studio door, app hero |
| `material-scheme.jpg` | Overhead: oak plank, green door sample, quartzite, zellige, linen on a printed plan | 2400×1600 | Homepage scene 2 (replaces the chair), swatches, founder paper |
| `studio-clients.jpg` | Designer and homeowner couple on one printed plan | 2400×1600 | Services |
| `kitchen-install.jpg` | Kitchen mid-install, island before its top, elevation taped up, no people | 2400×1345 | App page study |
| `shared-monitor.jpg` | Two colleagues sharing one monitor, sample wall behind | 2400×1600 | Careers |
| `site-phone-plans.jpg` | Phone, rolled plans, tape and door sample on a plywood island | 1600×2000 | Designers application |
| `studio-table-portrait.jpg` | 4:5 sibling of the studio table | 1600×2000 | Held for social and email; not shipped to `public/` |

**Loops** (`public/videos/studio/`). Each is a 5 s seamless loop at 24 fps, Low motion, with a locked-off camera and small subject motion.

| Loop | Source | Desktop MP4 / AV1 | Mobile MP4 / AV1 |
|---|---|---|---|
| `studio-table` | 1280×720, variant 1 (Kody's pick) | 1.2 MB / 0.51 MB | 0.29 / 0.23 MB |
| `site-visit` | HD 1280×720 | 1.2 MB / 0.51 MB | 0.32 / 0.24 MB |
| `cabinet-shop` | HD 1280×720 | 1.1 MB / 0.46 MB | 0.26 / 0.19 MB |

Rejected in review:
- Studio-table variant 0 (first shipped): the swatch morphs while she moves it. Kody chose variant 1, where the designer in glasses looks up at her colleague.
- The library loops: she turns toward the camera in 3 of 4 variants. The designers hero is a 4:5 frame, so it uses the still.
- The first cabinet-shop batch: he looks into the lens mid-clip.
- The desk loop where the drawing floats unsupported.
- The kitchen loops where a door jamb pops in at the seam.

## Slot plan

REAL = licensed Middle West photo, credit unchanged. ILL = Midjourney illustration, captioned.

| Slot | Now | Becomes |
|---|---|---|
| `LivingStudy.tsx` scene 1 | room.jpg | ILL loop `studio-table` |
| `LivingStudy.tsx` scene 2 figure | chair.png cutout | ILL `material-scheme.jpg` as a rectangular still. The floating-cutout mechanic goes. |
| `LivingStudy.tsx` scene 3 | workbench.jpg | ILL loop `site-visit` |
| `LivingStudy.module.css` swatches | materials.jpg | ILL crops of `material-scheme.jpg` (labels must match what is visible) |
| `LivingStudy.tsx` founder photo | materials.jpg | REAL `windy-peak-detail.jpg` |
| `LivingStudy.tsx` founder paper | chair.png | ILL `material-scheme.jpg` |
| `page.tsx` studio door | materials.jpg | ILL `designer-desk.jpg` |
| `designers/page.tsx` hero | materials.jpg | ILL `sample-library.jpg` |
| `DesignerWorkbench.tsx` ×3 | room / materials / chair | REAL `windy-peak-room`, `windy-peak-detail`, `country-home-kitchen` (drop the isolated-chair styling) |
| `designers/page.tsx` application | chair.png | ILL `site-phone-plans.jpg` |
| `makers/page.tsx` hero | workbench.jpg | ILL loop `cabinet-shop` |
| `MakerStudy.tsx` ×3 | materials / workbench / chair | REAL `windy-peak-detail`, ILL `cabinet-shop`, REAL `sahara-circle-kitchen` (Classic Cabinetry credited as contractor only) |
| `makers/apply` | workbench.jpg | ILL `cabinet-shop.jpg` |
| `services/page.tsx` hero / study / scope | room / chair / materials | REAL `hiawatha-room`, ILL `studio-clients`, REAL `windy-peak-detail` |
| `app/page.tsx` hero / overlay / study | room / chair card / chair | ILL `designer-desk`, **delete the chair overlay**, ILL `kitchen-install` |
| `journal`, `press`, `contact` | materials | REAL `hiawatha-room`, `windy-peak-room`, `windy-peak-detail`. Press must be real, because exports drop captions. |
| `careers/page.tsx` | workbench.jpg | ILL `shared-monitor.jpg` |
| `about/page.tsx` #kody | none | Kody's portrait (below) |

After the swap, `room.jpg`, `chair.png`, `workbench.jpg` and `materials.jpg` have no site references. They stay in `public/` until the September launch package that copies them is rebuilt.

## Captions and provenance

- **Every ILL frame carries the caption "Illustration."**, or "Illustration. Not a real project." where space allows. A loop and its poster are one asset with one caption.
- **Canon voice bans the word "AI" in customer copy**, so captions do not say "created with AI". The README register in `public/images/studio/` states plainly that each file was generated in Midjourney, with prompt, version, job id and edits. That record is the full disclosure.
- REAL photos keep their existing credit lines and get no illustration label.

## Moving backgrounds

There is one component, `src/components/studio/BackgroundVideo.tsx`.
- Props: `mp4Src`, `webmSrc`, `mobileMp4Src`, `mobileWebmSrc`, `poster`, `className`.
- Rendering: native `<video muted playsInline loop preload="none" poster>` with AV1 WebM first and H.264 MP4 as fallback. It is `aria-hidden`, with no controls.
- Plays only in view (IntersectionObserver) and pauses off-screen.
- Shows the poster only under reduced motion, the existing StudioMotion toggle, or Save-Data.
- Loops are used only in full-bleed scenes: homepage scenes 1 and 3, and the makers hero. Every other slot stays still.

## Kody's portrait

- **File:** `public/images/founders/kody-kochaver.jpg`, 940×1254 (3:4). The source's checkerboard background was removed by subject cutout and recomposited onto flat warm paper #E6E0D7.
- **Placement:** `/about` #kody, beside the existing working-page quote card. It mirrors Leah's portrait: same 570 px frame, and the card rotated −3° to answer hers.
- **Caption:** "Kody Kochaver", then "Portrait courtesy of Kody Kochaver." No title.
- **Alt text:** "Kody Kochaver in a dark button-down shirt and glasses."
- **Register:** add a row to `public/images/founders/README.md`. Name Kody as the source; the photographer is not recorded.

## Canon updates (signed off by Kody 2026-10-10, applied in patina-merged `8c3ac64c0`)

1. **§5 "Nothing automates Midjourney"** is now false. Midjourney was driven from Kody's logged-in Chrome session at Kody's request, with downloads saved locally. Replace it with "Midjourney may be driven through the Chrome extension on Kody's account; every pick still passes the believability gate by eye."
2. **§5 default version** goes from `--v 8.1` to `--v 8.2` (the current default), and the SREF is still unset. Until a house SREF exists, profile P plus `--style raw --s 40` holds the look consistent.
3. **§6** gets the motion gate above. It also records an operational gotcha: the HD video setting resets after each submission, so it must be confirmed before every HD render.
4. **§3** adds a rule: **no hero furniture in generated images.** Chairs and joinery are where Midjourney fails, and they were the tell on the old site.

5. **§3/§6 motion gate** adds: a handled object keeps its shape and material from first frame to last.
6. **§5 house style code:** `--p m7507783415631638492`, the moodboard "Patina house style 2026-10" built from the 11 approved stills. A test render with it matched the set.

## Decisions (2026-10-10)

- Leah reviewed the picks: approved.
- Captions stay "Illustration." The tool is named only in the provenance register.
- House style code created (above).
- Partner photography for the finished-room slots remains the long-term goal. Each real shoot replaces an ILL frame and updates the register.
