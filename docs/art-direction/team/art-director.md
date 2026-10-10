# Art Director: image audit, believability checklist, Midjourney pack

Rulebook: patina-merged/marketing/canon/art-direction.md §3, §5, §6. Realism benchmark: Ashley Hicks / Middle West Studio photos in public/images/founders/. Generated images are illustrations; never caption one as a real project.

## 1. Audit of the four studio images

**workbench.jpg: KILL.** Breaks canon §3 "Never" outright: antique wooden plane, distressed bench, worn veiny hands as the subject, plant on a sill catching a god-ray. Joinery is impossible: a short second post stops mid-air beside the main post and the rail tenons into a split post. Shavings are cloned identical curls. No computer, no plans, no Midwest. The lone-craftsman story is the one canon retired.

**chair.png: KILL.** Orange halo glow on black is a 3D-render tell. Frame rotated ~15° with no floor plane, so nothing grounds it. A rear strut juts out at right, disconnected from the frame. The leather sling wraps rails that do not exist; strap heights differ between the two back posts. Hero-furniture isolation, the subject AI mangles most.

**room.jpg: KILL.** Empty-showroom wabi-sabi plaster: no outlets, switches, baseboards, door casing, HVAC registers or visible ceiling (every real Middle West room shows these). Chair arms meet back posts with no joint; the sled runner does not resolve into legs; the coffee-table slab changes thickness around its edge. Window-mullion sun lands on a wall the window cannot reach at that angle. Teal-orange grade, crushed blacks: a moody render. Reads Tulum/Japandi, not Wisconsin.

**materials.jpg: HOLD (interim, supporting only, caption retained).** Least-bad, but it is the stock flat-lay: stoneware cup, dried sprigs, leaf-gobo dapple, rustic pine table. Hard leaf shadows on the paper contradict the soft contact shadows under the oak chip. Filler hatch marks float around the sketch. No tile, stone, tagged fabric book or printed plan set, so it is not a studio of today. Replace with S5.

**What the real photos do that these do not:** 24–35mm at standing eye level with verticals corrected (Hiawatha, Windy Peak) or 85mm compressed for details (Sahara Circle); neutral daylight around 5200–5600K with lifted shadows and slightly bloomed window highlights, never orange; builder-grade truth left in frame: can lights, flush-mount fixture, switch plates, outlets, floor registers, carpeted stairs, double-hung windows showing bare trees or a neighbor’s siding; imperfection: a rug corner turned up, a crooked frame, an outlet on the island end, a slightly tilted handheld point-and-shoot (Country Home).

## 2. Believability checklist (reject on any FAIL)

1. **Legs/floor contact:** count every leg; chairs 4, tables 3–4, each ending on the floor with a contact shadow. No floating or doubled legs.
2. **Joinery:** every rail and arm terminates in a post; no merged members, no rails passing through each other, no post ending in air.
3. **Hands:** five fingers, knuckles bending the right way, no fused grip on tablet/phone/pen. If unsure, crop or reject.
4. **Screens:** show a plan, elevation or photo; no legible words, no fake UI chrome, no glow brighter than the window.
5. **Text:** no letters anywhere (drawings, tags, boxes, signage, title blocks). Smudged pseudo-text also fails.
6. **Perspective:** verticals vertical at eye level, one consistent horizon; no fisheye bowing of cabinets or studs.
7. **Shadows vs windows:** every shadow falls away from the visible window; no second sun, no dapple without a source.
8. **Material scale:** tile 3–12 in, studs 16 in on center, cabinet boxes 24 in deep, fabric books hand-sized, drywall 4×8.
9. **House systems:** an outlet or switch plate in any wall run over ~6 ft; ceiling has cans, a fixture or joists; registers or a radiator plausible.
10. **Construction logic:** studs have top and bottom plates, drywall seams land on studs, an island has a box before a top.
11. **People:** mid-task, looking at the work, nobody into the lens, no staged smile; clothes suit studio or site.
12. **Midwest cues:** double-hung or casement windows, bare or deciduous trees, brick or lap siding, overcast light. No palms, ocean, skyline, mountains.
13. **Grade:** neutral whites, lifted blacks, no teal-orange, no HDR halo; it sits beside a Hicks photo without jumping.
14. **Real clutter:** at least one cord, box, painter’s tape or scrap of paper; spotless surfaces fail.
15. **Duplicates:** no cloned objects, repeated tile patterns or mirrored people.

## 3. Recipe to beat the AI look

- **Lens/film language:** name a real focal length and height: "35mm at standing eye level", "50mm over the shoulder", "85mm close". Add "documentary, available light". Avoid "cinematic", "moody", "editorial"; they pull the render look.
- **Light:** "overcast daylight through a north window", "flat LED panel overhead", "late-morning winter light". Diffuse light hides geometry errors; hard sun exposes them.
- **Grade (Hicks match):** "neutral white balance, soft lifted shadows, natural color, slight highlight bloom at the windows". Never ask for warmth.
- **Imperfection cues:** orange extension cords on the subfloor, blue painter’s tape on drywall seams, sawdust and pencil marks on plywood, cabinet boxes still in cardboard, a charger cable across the desk, sticky notes on plans, house wrap in window openings.
- **Furniture tactics:** furniture partly out of frame; never one hero piece; people-with-plans as the subject so furniture is incidental; eye level only, no low hero angles; prefer cabinet boxes and built-ins to freestanding chairs; keep hands small in frame or busy with paper.
- **Process:** generate 4, run the checklist at 100%, vary one clause at a time. Generate the 4:5 mobile version as its own job, not a crop of the 16:9.

## 4. Ready-to-paste pack

Tails per canon §5, --sref omitted. Hero background 16:9 or 3:2; mobile 4:5. For a mobile sibling of any hero, rerun with --ar 4:5. Each prompt is one paste.

**S1 · sample library (hero 16:9)**
~~~
an interior designer in her forties pulling a fabric book from open studio shelves that run out of frame, rows of tagged fabric books, tile boards, quartz and wood door samples, bright overcast daylight from a wide window and flat LED panels overhead, 35mm at standing eye level with natural color and lifted shadows, candid and mid-task with a laptop and a charger cord on the cutting table at the edge of frame, a design studio in a converted brick building in Madison, Wisconsin --ar 16:9 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S2 · designer desk (hero 3:2)**
~~~
a designer at a white oak desk working between a laptop and a large monitor showing a floor plan, a printed plan set with sticky notes, a tile sample and a phone beside the keyboard, cables in a tray under the desk edge, clean overcast daylight and soft overhead light, 50mm over the shoulder at seated eye level with neutral white balance, focused, a bright studio office in Milwaukee’s Third Ward with a brick wall and a radiator under the window --ar 3:2 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S3 · designer + contractor + client on site (hero 16:9)**
~~~
a designer, a contractor in a canvas work jacket and a homeowner standing in a framed-out kitchen looking down at the same plan on a tablet while the contractor points at a stud wall, studs with pencil marks, stacked drywall, cabinet boxes still in cardboard and an orange extension cord across the plywood subfloor, overcast daylight through new window openings with house wrap, 35mm documentary at eye level, practical and calm, a new-build house in Waunakee, Wisconsin with bare November trees outside --ar 16:9 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S4 · kitchen mid-install (mobile 4:5)**
~~~
a kitchen mid-install with painted cabinet boxes in place and the island waiting for its top, a printed elevation held to the wall with blue painter’s tape, plywood, primed drywall, open outlet boxes and sawdust on the subfloor, soft daylight from a rear window wall, 28mm from the doorway at eye level with straight verticals, work in progress, a new home outside Madison, Wisconsin --ar 4:5 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S5 · overhead material scheme (3:2; mobile 4:5)**
~~~
a designer’s two hands arranging a scheme on a white studio table, an open fabric book, three tile samples, a quartz chip, a painted cabinet door sample and an oak flooring offcut beside a printed floor plan with sticky notes, even overcast daylight from tall windows with soft shadows, 50mm from directly above with natural color, deliberate and collaborative, a contemporary design studio in Madison, Wisconsin --ar 3:2 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S6 · phone + drawing set on island (mobile 4:5)**
~~~
a phone face up and a printed drawing set on a raw plywood island top under construction, a tape measure, a pencil, a quartz sample and a painted cabinet door beside them with light sawdust on the plywood, soft morning light from a side window, 85mm close at standing eye level with shallow depth of field, the start of a site visit, a new-build house in Wisconsin --ar 4:5 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S7 · finished Midwest room (hero 16:9)**
~~~
a finished family room in a newer suburban home with a sofa running out of frame and a round wood coffee table at the edge, cream walls, white trim, oak floors, recessed can lights, a switch plate and a floor register, overcast autumn daylight through double-hung windows, 28mm at standing eye level with verticals corrected and lifted shadows, lived-in and quiet with a throw left on the arm, a home outside Madison, Wisconsin with bare maples and a neighbor’s lap siding through the glass --ar 16:9 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S8 · framing/drywall wide (hero 16:9)**
~~~
the open main floor of a house mid-build with drywall half hung and seams taped, bare studs with top plates, stacked drywall sheets, blue painter’s tape, a stepladder, an orange extension cord and sawdust on the plywood subfloor, flat overcast daylight through window openings in house wrap, 24mm at eye level with straight verticals, work in progress and quiet, a new-build subdivision in Waunakee, Wisconsin under a grey November sky --ar 16:9 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S9 · designer measuring (mobile 4:5)**
~~~
an interior designer in a sweater measuring a framed window opening with a tape measure, a folded plan sheet tucked under her arm, studs, house wrap and a stack of drywall behind her, soft overcast daylight from the opening, 35mm at eye level from three quarters behind her, concentrating, a new-build house outside Madison, Wisconsin with a bare field beyond --ar 4:5 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**S10 · material close-up (mobile 4:5)**
~~~
a quartz countertop sample edge, a handmade glazed white tile, a painted shaker cabinet door corner and an oak floor plank resting on a plywood subfloor with pencil marks and light sawdust, real material textures at true scale, soft window daylight with one clear shadow direction, 85mm close at a low oblique angle with natural color, tactile and calm, a kitchen under construction in Wisconsin --ar 4:5 --style raw --v 8.1 --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

### Motion prompts (Midjourney animate: low motion, one camera move, ≤10 s, loopable)

Animate from the approved still. Reject any face/hand/material warp, any text appearing, any light flicker (canon §6).

**V1 · from S1**
~~~
slow push-in toward the shelves, the designer draws the fabric book out and turns toward the table, everything else still, steady overcast light --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**V2 · from S3**
~~~
slow lateral slide left to right, the contractor’s finger moves along the stud wall and the designer nods at the tablet, the homeowner shifts weight, steady daylight --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**V3 · from S2**
~~~
slow tilt down from the monitor to the printed plans, the designer turns one page of the plan set, the screen image stays fixed, steady daylight --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

**V4 · from S8**
~~~
slow lateral slide along the stud wall, the house wrap in one window opening lifts slightly in a draft, no people, flat steady overcast light --motion low --loop --no text, letters, words, watermark, logo, signage, gradient, emoji, glossy render, CGI, 3d render, plastic, chrome, neon, lens flare, HDR, oversaturated, stock photo, smiling at camera, looking at camera, posed portrait, handshake, antique workshop, hand tools, sepia, grime, distressed, skyline, palm trees, ocean, beach, mountains, penthouse, marble everywhere
~~~

If the animate box rejects --loop or --no, paste the motion text alone, set Low motion in the UI, and trim to a clean loop point in hyperframes.
