# Homeowner shot list and Midjourney prompts

*2026-10-11. Art director. Brief: Kody wants the patina.cloud homepage to read for homeowners. Governing canon: `patina-merged/marketing/canon/art-direction.md` §3 (imagery, people, never-list, no hero furniture), §5 (house style, negative list), §6 (image to video, motion gate). Gate and lessons from the last round: [believable-imagery-2026-10.md](believable-imagery-2026-10.md) and the 15-point checklist in [team/art-director.md §2](team/art-director.md). The orchestrator drives Midjourney in Chrome. Every pick passes the gate by eye at 100%, and nothing is picked unseen.*

## Ground rules for this batch

- **The homeowners' own house.** Older Madison houses: a 1920s bungalow or a 1920s foursquare. They are lived-in, in daylight, with a little mess, and mid-renovation planning. Not a studio, not a showroom, not magazine-perfect. Real cues: plaster walls, oak trim and casing, radiators, double-hung windows with bare maples outside, an outlet on every long wall, mail and a phone charger on the counter.
- **No furniture as subject.** No chairs, no stools, no table legs, no joinery in focus. A table or island exists only as a surface seen from above or cut by the frame edge. The island is preferred to a freestanding table because it has no legs.
- **People.** Working adults of mixed ages, mid-task, looking at the plan, the wall or each other. Faces in profile or three-quarter profile at a natural distance. No face turns to the camera. Hands rest flat on paper, hang empty, or are folded. Hands gripping small objects are where frames fail.
- **Composition for the hero slots (1 and 2).** Subjects sit right of centre. The left ~45% of the frame holds quiet mid-to-dark tone (wall, cabinet run, doorway in shadow) so white headline type can sit on a dark shade there. No window, glare or face falls inside that zone. The window sits at right or behind the subjects, so shadows fall to the left.
- **Generated images stay illustrations.** Caption every placement "Illustration." Never caption one as a real client's home. The believable-imagery rule that generated frames never show a *finished* home still holds: these houses are before or mid-renovation, never the delivered room.
- **Mobile.** If a 4:5 poster is needed for a hero, run it as its own job with `--ar 4:5` and subjects centred. Do not crop it from the 16:9.

### Parameters

Hero tail (slots 1 and 2), per the ticket:
`--ar 16:9 --v 8.2 --style raw --s 40 --p m7507783415631638492`

Slot 3 changes only the ratio: `--ar 4:5` (variant A) or `--ar 3:2` (variant B).

`--no` clause = the canon §5 negative list, verbatim, then this batch's additions: `chairs, stools, chair legs, showroom, staged interior`. The additions come after the canon list, which is unchanged. Every prompt below already carries the full clause.

## Slot 1. Scene 1 hero (still + loop)

**Intent:** a homeowner couple and their designer at the couple's own kitchen island, deciding on samples over a printed plan. This is the homeowner's version of "the same page".

**Variant 1A · bungalow island (16:9)**
~~~
a homeowner couple in their fifties and their interior designer in her thirties standing together at the couple's own kitchen island, grouped in the right half of the frame and looking down at a printed floor plan spread across the counter, tile samples, a fabric cutting and a painted cabinet door sample lying flat on the plan, a coffee mug, a phone and a pen beside it, their faces in three-quarter profile turned to the plan and their hands resting flat on the paper, the left half of the frame a quiet run of dated painted cabinets and plaster wall in soft shadow, a 1920s bungalow kitchen in Madison, Wisconsin with oak trim, a radiator under a double-hung window behind them at right, an outlet on the backsplash and mail stacked by the toaster, overcast late-morning daylight, 35mm at standing eye level with straight verticals, neutral white balance and lifted shadows, documentary and mid-conversation --ar 16:9 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

**Variant 1B · foursquare table from above the edge (16:9)**
~~~
seen from slightly above the end of a kitchen table, a homeowner couple in their forties and their interior designer in her sixties leaning over a printed plan set spread across the tabletop, painted door samples, three tile samples and an open fabric book holding down its corners, the three of them on the right side of the frame with their hands resting flat on the paper and their eyes on the plan, the tabletop running out of the bottom edge of the frame with no legs visible, the left side of the frame the darker kitchen behind them with a dated range, a refrigerator with a few snapshots under magnets, a plaster wall and a doorway into the dining room, a 1920s foursquare in Madison, Wisconsin, a laptop closed at the table edge, keys and a roll of blue painter's tape, soft overcast daylight from a double-hung window at right, 40mm at standing eye level, natural color and lifted shadows, a working weekend morning --ar 16:9 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

**Believability gate for this shot** (on top of the 15 points):
- **Hands:** six hands on the counter is the main risk. Count five fingers on each. Fingertips must sit on the paper, not sink into it. No hand fused to a sample, the mug or another hand.
- **Sample edges:** tile is square-edged at 3–12 in, the door sample is a flat panel with a consistent thickness, and the fabric cutting has a cut edge, not a melted one. No sample is transparent or floating above the plan, and each casts a contact shadow.
- **Text on plans:** the plan reads as lines, rooms and dimensions with no letters. Title blocks, sticky notes and the mail by the toaster must not show pseudo-text. Smudged script fails.
- **Faces:** all three are in profile or three-quarter profile, eyes down on the plan. No one looks at the lens, and no staged smile.
- **Furniture:** no stool or chair in focus. In 1B no table leg shows. If one shows, the frame fails.
- **House:** at least two old-house cues (oak trim, radiator, plaster, double-hung window) and one outlet. The kitchen looks dated and lived-in, not renovated or styled.
- **Text zone:** the left ~45% is quiet mid-to-dark tone with no window glare, no face and no busy high-contrast detail.

**Motion prompt · loop 1** (animate from the approved still; Low motion, Loop on, 5 s; re-select HD before each render)
~~~
locked-off camera, no camera movement at all, the three keep studying the plan on the counter, the husband looks up from the plan to the designer and then back down to the plan, every sample, the plan, the mug and the phone stay exactly where they lie and no one picks anything up, their hands stay flat and still on the paper, steady overcast daylight --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

## Slot 2. Scene 3 (still + loop)

**Intent:** the homeowner walks her own kitchen mid-install with the person building it. The boxes are in, the tops are not, and the plan is taped to the wall.

**Variant 2A · bungalow with cabinetmaker (16:9)**
~~~
a homeowner in her sixties in a cardigan pausing mid-walkthrough of her own kitchen with a cabinetmaker in a work shirt, the two of them in the right half of the frame looking at a printed elevation held to the wall with blue painter's tape, both with empty hands at their sides, painted cabinet boxes set along the wall with no countertops yet, open plywood tops and an empty sink base, ram board floor protection taped over the old oak floor, an orange extension cord and a cardboard box of hardware on the floor, original plaster walls with a fresh drywall patch and a new outlet box, the left side of the frame the doorway into her dining room in soft shadow with old oak casing, a 1920s bungalow in Madison, Wisconsin under renovation, overcast daylight from a double-hung window at right, 28mm at standing eye level with straight verticals, neutral white balance and lifted shadows, documentary and practical --ar 16:9 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

**Variant 2B · foursquare with contractor (16:9)**
~~~
a homeowner in her forties with her arms folded and a general contractor in a canvas work jacket with a tape measure clipped to his belt, standing in the right half of the frame in her kitchen mid-install, he gestures with an open hand toward a printed elevation taped to the plaster wall and she follows his hand, a run of white painted cabinet boxes with no countertops, an island box without its top, blue painter's tape marking the range location on the wall, ram board over the floor, a shop vacuum and a stack of cabinet boxes still in cardboard, the left side of the frame the darker back hall with a radiator and a coat hook, a 1920s foursquare in Madison, Wisconsin under renovation, overcast daylight from a double-hung window behind them with bare maples outside, 28mm at standing eye level with straight verticals, natural color and lifted shadows, a weekday site check --ar 16:9 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

**Believability gate for this shot** (on top of the 15 points):
- **Hands:** empty, folded or one open-hand gesture. No fused tape measure or fingers merged into the cabinet face. Count five fingers on the gesturing hand.
- **Sample and box edges:** cabinet boxes are 24 in deep with square corners and consistent face frames, doors line up, and there is no countertop anywhere. The island is a box with no top. Boxes in cardboard are box-shaped, not soft.
- **Text on plans:** the taped elevation shows cabinet lines with no letters or dimensions as legible text. Cardboard boxes carry no brand marks. Tape is plain blue.
- **Faces:** profile or three-quarter, eyes on the elevation or on each other. No one looks at the lens.
- **Construction logic:** the drywall patch sits in a plaster wall, outlet boxes are at outlet height, the sink base is open for plumbing, and the ram board is flat and taped at the seams. Nothing reads finished.
- **House:** the old house shows through: oak casing, radiator, double-hung window, plaster. A new-build subdivision fails this slot.
- **Text zone:** the left ~45% holds the doorway or back hall in shadow. No bright window there.

**Motion prompt · loop 2** (animate from the approved still; Low motion, Loop on, 5 s; re-select HD before each render)
~~~
locked-off camera, no camera movement at all, the contractor lifts one open empty hand toward the taped elevation at chest height and lowers it again, the homeowner turns her head from the elevation to him and back to the wall, her arms stay folded, the elevation, the tape, the cabinet boxes, the cord and the cardboard do not move, steady overcast daylight --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~
For a 2A still (hands at sides), swap the action line for: "the cabinetmaker turns his head from the elevation to the homeowner and back, the homeowner shifts her weight, both keep their hands empty at their sides".

## Frame-by-frame check for both loops

Motion prompts carry no `--ar` or `--p`, because the clip inherits both from its still. If the animate box rejects `--loop` or `--no`, paste the motion text alone and set Low motion and Loop in the UI.

Step through frames 0, 24, 60, 96 and the last frame (5 s at 24 fps), then scrub the seam twice. One FAIL rejects the clip.

1. **Objects hold shape and material.** Every sample, the plan, the mug, the phone, the tape measure and the elevation keep their outline, colour and material from frame 0 to the last frame. Nothing is lifted, slid or re-shaped. A swatch that morphs fails. That was Kody's rejection of studio-table variant 0.
2. **No face turns to the camera** at any frame. Looking up at each other is fine.
3. **Hands do not warp.** Same finger count in every checked frame, no melting into paper or cabinet faces.
4. **Paper stays paper.** The plan and elevation do not ripple, gain lines or grow letters.
5. **Camera is locked.** The door casing, cabinet edges and window mullions do not shift against the frame edge.
6. **Light is steady.** Luminance drift under 5 levels with no flicker. Check: `ffmpeg -i loop.mp4 -vf signalstats,metadata=print:key=lavfi.signalstats.YAVG -f null - 2>&1 | grep YAVG`, then max − min < 5.
7. **Clean seam.** First/last-frame SSIM ≥ 0.94. Extract with `ffmpeg -i loop.mp4 -frames:v 1 first.png` and `ffmpeg -sseof -0.2 -i loop.mp4 -update 1 last.png`, then compare with `ffmpeg -i first.png -i last.png -lavfi ssim -f null -`. No door jamb, cabinet or person pops in at the seam (the rejected kitchen loops did this).
8. **Text zone stays clear.** Nobody drifts into the left ~45% during the clip.

## Slot 3. Supporting still (Founding Circle / belief band)

**Intent:** the quiet moment at home: a letter opened and the samples she is living with taped up at her own table. Still only, no loop.

**Variant 3A · hands, letter and taped samples (4:5). Recommended.**
~~~
a homeowner's two hands resting flat on her own kitchen table beside a plain cream envelope opened along the top and a folded letter lying face down, a kraft card with a linen fabric cutting, a small glazed tile and a painted wood sample held on with blue painter's tape, a pencil, reading glasses and a mug at the edge, the worn painted tabletop seen from above and running out of frame on every side, soft overcast morning daylight from a window at left with shadows falling to the right, 50mm from above at a slight angle, natural color and lifted shadows, unhurried, a 1920s bungalow kitchen in Madison, Wisconsin --ar 4:5 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~

**Variant 3B · doorway into a room mid-planning (3:2)**
~~~
a view through an open doorway with painted oak casing into the lived-in living room of a 1920s foursquare in Madison, Wisconsin while the family plans a renovation, the door casing sharp in the left foreground and the room beyond in soft focus, paint drawdowns and fabric cuttings taped to the far plaster wall with blue painter's tape, a stack of sample boxes and a rolled plan on the floor, a sofa pushed aside under a throw and running out of frame, a radiator under double-hung windows with bare maples outside, a lamp cord along the baseboard, overcast autumn daylight, 35mm at standing eye level with shallow depth of field, natural color and lifted shadows, quiet --ar 3:2 --v 8.2 --style raw --s 40 --p m7507783415631638492 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere, chairs, stools, chair legs, showroom, staged interior
~~~
3B is the riskier of the two. A generated lived-in room drifts toward a finished, styled home, which the believable-imagery rules keep for real photographs. Pick it only if the taped drawdowns, the sample boxes and the pushed-aside sofa clearly read as "before". Otherwise use 3A.

**Believability gate for this shot** (on top of the 15 points):
- **Hands (3A):** two hands, five fingers each, both flat and relaxed, wrists attached to the arms at a plausible angle from the bottom edge. No third hand or fused fingers. Skin is ordinary, not veined or aged as the subject (canon never-list: worn hands as the subject).
- **Sample edges:** the tile has a crisp edge and glaze, the wood sample is a flat board, and the fabric is cut. Each is held by tape that crosses its edge onto the kraft card. Tape lies flat with no bubbles that turn into shapes.
- **Text on the letter:** the letter is face down and the envelope has no address, stamp or postmark text. Any visible pseudo-handwriting fails. Reading glasses must not magnify letters.
- **Faces:** none in 3A. In 3B no person, or one figure soft and turned away.
- **Furniture (3B):** the sofa stays soft and partial. No visible chair or table legs in focus. The casing miter at the head of the door resolves cleanly.
- **Finished-home check (3B):** the room must read mid-planning, not delivered.

## Shot-review checklist for grids

1. Composition: subjects right of centre, with the left ~45% quiet and dark enough for white type (slots 1–2), or the stated 4:5 or 3:2 frame (slot 3).
2. Homeowner's own old Madison house: at least two of plaster, oak trim, radiator, double-hung window, plus an outlet and real clutter. Not a studio, showroom or new build.
3. No furniture as subject: no chair, stool, table leg or joint in focus. The table or island appears only as a surface or edge.
4. Hands, faces, text: five fingers on every hand, no face toward the lens, no letters or pseudo-text on plans, letters, boxes or screens.
5. Samples and materials hold true scale, crisp edges and contact shadows. The construction logic holds (boxes before tops, patches in plaster).
6. Grade and light: neutral daylight, lifted blacks, shadows falling away from the window, no clones. The frame could sit beside a Middle West photo without jumping.
