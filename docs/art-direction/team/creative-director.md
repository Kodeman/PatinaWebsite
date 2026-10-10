# Creative director: believable imagery for patina.cloud

Governing: `patina-merged/marketing/canon/art-direction.md` §3 (2026-10-09 ruling), §5–6. Kody's headshot file was not in the repo; §4 works from the ticket's description.

## 1. Diagnosis

**Why the set reads as AI**
- `chair.png`: the back posts end in mid-air, the front leg crosses the rail without a joint, and the straps sit at unrelated heights. The amber halo hugging the silhouette on black is a render tell. It is not even the chair in `room.jpg`, so the "closer look" zoom contradicts itself.
- `room.jpg`: stock generated-interior grammar: one low amber sun, smeared plaster, a generic dark abstract, no outlets or trim, nobody in it. It is an empty showroom, which canon bans.
- `workbench.jpg`: canon's *Never* list item for item: antique plane, distressed bench, worn hands as the subject, no computer. The tenon never seats.
- `materials.jpg`: the least wrong, but prop-styled (a cup, dried sprigs, a sketch whose lines go nowhere). There are no fabric books, tile or tags.
- All four share one hue, one light and one hour, and nothing dates them to now. The Middle West photos read as true because they carry the mundane: a floor register, a switch plate, a Miele range.

**Story conflict.** The headline says *For studios. One living document per client.*, but the pictures tell a consumer furniture story: room → product cutout (a pre-launch marketplace) → craftsman's hands (workshop nostalgia). Canon asks for the studio's work: the sample library, the desk with a monitor, plans on site, the house mid-build, with materials only in support. The chair → workshop cut implies a provenance that `studio/README.md` says is undocumented. And "awaiting partner photography" on every caption announces a placeholder.

## 2. The idea

**One page, three places: the studio table, the house mid-build, and the finished room Leah's studio actually delivered.**

1. **Real where it can be.** Finished rooms come only from credited Middle West photos. Generated images show work in progress (studio, site, shop) and are never a finished home.
2. **Bright and current.** Daylight plus LED overheads, laptops, a monitor, phones, printed plans, white walls and pale oak. No black grounds, halos, sunbeams or sepia.
3. **Mundane density.** Prompt for outlets, painter's tape, binder clips, sample tags, cables and a spec sheet. Screens show plans with no legible words.
4. **People mid-task, 2–3 on one page.** Faces at a natural distance and never toward the lens. Hands belong to a person; they are not the subject.
5. **Low geometry risk.** Midjourney fails on chair legs and joinery. Keep furniture out of focus and favor flat, rectilinear things (plans, tile, fabric books, cabinet boxes). Reject any frame that fails a 10-second look at joints, hands or plan lines.

Captions on generated images read **"Illustration."** (or "Illustration. Not a real project or studio."). The README's "created with AI" fails voice-lint, because "AI" is a lint error.

## 3. Slots

MJ = Midjourney illustration; REAL = licensed Middle West photo, credited (README credit lines). S#/V# refer to §5.

**Homepage (`LivingStudy.tsx`)**

| Scene / slot | Show | Type | Aspect |
|---|---|---|---|
| 1 `:217` (room.jpg) | Studio sample table: a designer and a new hire laying out fabric, tile and a door sample beside printed plans, with a laptop open. Keep the left third quiet for the headline. | MJ **V1** (poster S1) | 16:9, plus 4:5 for mobile |
| 2 `:256` (chair.png figure) | The "page": overhead of the same table, with a printed plan and pencil marks, tile, linen, walnut, olive fabric and a phone. Make it a rectangular still. If the cutout mechanic stays, cut out a flat sample board, never a chair. | MJ S2 | 4:5 |
| 3 `:226` (workbench.jpg) | Framed kitchen: designer, contractor and client reading one tablet among studs and cabinet boxes. | MJ **V2** (poster S3) | 16:9 |
| `LivingStudy.module.css:228` swatches | Crops of S2 with walnut, linen and olive at known positions | MJ S2 | n/a |
| `:416` founder photo | windy-peak-detail (glazed tile, brass) | REAL | 2:3 |
| `:428` founder paper | Remove the chair. Use a crop of S2's plan sheet, or leave the paper blank. | MJ S2 / none | 4:5 |
| `page.tsx:47` studio door | Designer at a desk between a laptop, a monitor floor plan and printed plans | MJ S5 | 5:4 |

**Other pages**

| Slot | Show | Type | Aspect |
|---|---|---|---|
| `designers/page.tsx:75` hero | Designer pulling a fabric book from sample-library shelves | MJ **V3** (S4) | 4:5 |
| `DesignerWorkbench.tsx:13` Proportion | windy-peak-room | REAL | 2:3 |
| `DesignerWorkbench.tsx:21` Material | windy-peak-detail | REAL | 2:3 |
| `DesignerWorkbench.tsx:29` Character | country-home-kitchen (drop `isolatedStudy` styling) | REAL | 3:4 |
| `designers/page.tsx:211` application | Phone and drawing set on an unfinished island | MJ S7 | 4:5 |
| `makers/page.tsx:50` hero | Bright current cabinet shop: a maker checking a white oak door against a shop drawing on a laptop, with dust collection and clamps. No antique tools. | MJ S8 | 16:9 |
| `MakerStudy.tsx:13` material | windy-peak-detail | REAL | 2:3 |
| `MakerStudy.tsx:21` construction | S8 alternate crop | MJ S8 | 3:2 |
| `MakerStudy.tsx:29` maker's words | sahara-circle-kitchen (credit Classic Cabinetry as contractor only, never as a Patina maker) | REAL | 2:3 |
| `makers/page.tsx:310` closing | windy-peak-room, keep | REAL | n/a |
| `makers/apply/MakersApplyContent.tsx:160` | S8 crop | MJ S8 | 3:2 |
| `services/page.tsx:33` hero | hiawatha-room | REAL | 3:2 |
| `services/page.tsx:74` | Designer and client at the studio table on one printed page, fabric book open | MJ S9 | 3:2 |
| `services/page.tsx:116` | windy-peak-detail | REAL | 2:3 |
| `app/page.tsx:34` hero | Desk with a monitor floor plan, printed set and phone | MJ **V4** (S5) | 3:2 |
| `app/page.tsx:49` overlay | Delete; a chair over a room is product fiction | none | n/a |
| `app/page.tsx:92` | Kitchen mid-install, elevation taped to the wall, no people | MJ S6 | 3:2 |
| `journal/page.tsx:101` | hiawatha-room | REAL | 3:2 |
| `press/page.tsx:36` | windy-peak-room. Press assets must be real, because exports drop labels. | REAL | 2:3 |
| `contact/ContactContent.tsx:105` | windy-peak-detail | REAL | 2:3 |
| `careers/page.tsx:58` | Two colleagues sharing one monitor of plans, sample shelf behind | MJ S10 | 3:2 |
| `about/page.tsx:58, :138, :281`; `StoryJourney.tsx:65/75/85` | Keep (all REAL, credited) | REAL | n/a |
| `about/page.tsx:152` #kody | Add Kody's portrait (§4) | REAL | 3:4 |

Video loops: muted, `playsInline`, the still as `poster`, ≤ 8 s, and stopped by the existing `MotionControl` and reduced motion. All REAL photos stay stills.

## 4. Kody's portrait on /about

Leah's portrait sets the pattern: color, daylight, 3:4 (1250×1666), rendered 570 px tall with `object-position: 50% 28%`, a rotated `#d5cdbf` card behind it, and a name-only caption.

- **Background:** the checkerboard is in the pixels, so mask the subject and recomposite onto flat warm paper **#E6E0D7**. That is lighter than the `#d5cdbf` card, so the card's edge still shows. Add a ~3% window-like falloff and matched grain, with no halo or vignette. Check the hair and glasses edges at 200% for checker fringe.
- **Color, not B/W.** A B/W portrait beside Leah's color one reads as memorial or secondary. Warm the white balance slightly toward her daylight skin tones; don't chase her greens.
- **Crop and scale:** 3:4, like Leah's. A chest-up shot would make Kody's face far larger than Leah's, so extend the flat background until the head is about 22% of frame width with the eyes about 21% from the top, matching her. Export at 1254×1672.
- **Layout:** the same 570 px height and `sizes`, with the card rotated −3° to mirror Leah's. It sits beside the existing working-page quote card; it does not replace it.
- **Caption:** "**Kody Kochaver**", then "Portrait courtesy of Kody Kochaver." No title (V4). Alt: "Kody Kochaver in a dark button-down shirt and glasses."

## 5. Make first

**Midjourney stills (10).** Use `--style raw --v 8.1 --sref {{SREF}}` (the SREF is still unset) plus canon's `--no` list, and add "chair legs in focus" to it.

1. **S1** Studio sample table, designer and new hire laying out a scheme, laptop open (16:9 and 4:5)
2. **S3** Framed kitchen, designer, contractor and client on one tablet (16:9)
3. **S5** Designer between a laptop, a monitor floor plan and printed plans (3:2 and 5:4)
4. **S4** Designer pulling a fabric book from the sample library (4:5)
5. **S2** Overhead of the scheme: printed plan, tile, linen, walnut, olive fabric, phone (4:5 and 3:2)
6. **S8** Current cabinet shop, a white oak door checked against a shop drawing on a laptop (16:9)
7. **S9** Designer and client on one printed page at the studio table (3:2)
8. **S6** Kitchen mid-install, island before its top, elevation taped up (3:2)
9. **S10** Two colleagues sharing one monitor, sample shelf behind (3:2)
10. **S7** Phone and drawing set on an unfinished island, tape measure, quartz sample (4:5)

**Video loops (4).** Each is low motion with one camera move and ≤ 8 s. Reject any clip where hands, faces or plans warp, or the light flickers.

1. **V1** from S1: slow push-in; a fabric book is set down
2. **V2** from S3: slow lateral slide; the contractor points at a wall
3. **V3** from S4: slow tilt down as the book comes off the shelf
4. **V4** from S5: slow push-in; the designer turns a printed sheet
