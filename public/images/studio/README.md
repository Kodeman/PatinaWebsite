# Studio illustrations — provenance register

Every file in this folder (except the retired files listed at the end) and in `public/videos/studio/` is a **Midjourney illustration**. They were generated on the Patina Midjourney account on 10 October 2026, at Kody's direction. The settings were v8.2, `--style raw --s 40`, personalization profile P, and the art-direction canon negative list. Future batches use the house style code `--p m7507783415631638492` (moodboard "Patina house style 2026-10", built from these stills), per canon §5. None of them documents a real Patina project, client home, studio, maker or product. Nobody pictured is a real person.

The art direction and the believability gate behind these picks are in [`docs/art-direction/believable-imagery-2026-10.md`](../../../docs/art-direction/believable-imagery-2026-10.md). Every frame passed that gate at 100%, and the loops also passed the motion gate.

## Presentation requirements

- **Caption every placement "Illustration."** Where space allows, use "Illustration. Not a real project." Customer copy does not say "AI" (canon voice rule); this register is the full disclosure.
- **A loop and its poster are one asset with one caption.** Crops and exports keep the caption.
- **Write alt text for what is visible.** Never name the people or assign the scene to Middle West Studio.
- **Press, email and social exports use the credited Middle West photos in `../founders/`, not these files**, because exports drop captions.

## Stills

Source = the Midjourney job (`https://www.midjourney.com/jobs/<job>?index=<n>`) upscaled with Upscale (Subtle), then resized to the web size below as JPEG q82. No retouching.

| File | Shot | Source job · index | Upscale job | Web size |
|---|---|---|---|---|
| `studio-table.jpg` | Two designers laying out fabric, tile and a door sample beside printed plans | `799d2389-afbb-4645-af87-d07d81506f35` · 2 | `8033339b-c729-4e25-8cf3-d65ef4bcb73e` | 2400×1345 |
| `site-visit.jpg` | Designer, contractor and homeowner on one tablet in a framed kitchen | `27daff73-6f2c-4ffd-aed4-1a81a867cd2d` · 2 | `dc1cf4b8-7eb0-4b93-86c5-631bc1b303f1` | 2400×1345 |
| `designer-desk.jpg` | Designer between laptop, monitor floor plan and printed set | `f30f65f3-5e8e-43ab-b9e3-fd996099d145` · 0 | `1069db09-2dcd-4883-bc06-2fa28345540a` | 2400×1600 |
| `sample-library.jpg` | Designer pulling a fabric book from the sample library | `a8f49570-ac7a-45a3-a355-85a3a3e279ba` · 1 | `9baaff78-1331-4fbc-944e-577c155f345b` | 2400×1345 |
| `material-scheme.jpg` | Overhead scheme: oak plank, green door sample, quartzite, zellige, linen on a plan | `ea50d665-756f-4292-8b3b-77ee2f925f1c` · 1 | `aa9347b6-7681-461b-bb9d-33c8e953ce41` | 2400×1600 |
| `cabinet-shop.jpg` | Cabinetmaker checking a white oak door against a shop drawing on a laptop | `c23f2ecd-c8a7-4408-95c6-c43b96e43cd0` · 2 | `4241b8b8-d937-4916-8ca6-520096dca14f` | 2400×1345 |
| `studio-clients.jpg` | Designer and homeowner couple at the studio table on one plan | `1a21ed1e-c2a4-4356-a236-79ed61030eca` · 0 | `15cf79cd-b572-409b-9542-3e80b1eca4a2` | 2400×1600 |
| `kitchen-install.jpg` | Kitchen mid-install, island before its top, elevation taped up | `3e81530e-8a43-4edb-afb6-edfcb4936110` · 1 | `e0e9c41b-85db-4fb0-b0eb-4095e60d969e` | 2400×1345 |
| `shared-monitor.jpg` | Two colleagues sharing one monitor, sample wall behind | `c6b0c8fb-793c-4714-9b24-a6b95ba6772c` · 0 | `6ba47e38-3273-4065-8c59-4cdccf9e2583` | 2400×1600 |
| `site-phone-plans.jpg` | Phone, rolled plans, tape and door sample on a plywood island | `f896c123-5e4b-4837-9aae-228b7147fdd7` · 0 | `e51ab6ec-f2ef-4bc0-aa07-3b10437557d1` | 1600×2000 |
| `home-table.jpg` | Homeowner couple and their designer bent over a plan and a tablet at the couple's kitchen island (homepage hero, regenerated 2026-10-12) | `96c99846-0d84-4ca9-af2a-01814fa4bc5d` · 1 | `e3d18bf5-2753-4a08-a4fe-50adf3b0e6d3` | 2400×1346 |
| `home-install.jpg` | Contractor holding up his phone beside a taped elevation while the homeowner leans in (homepage scene 3, regenerated 2026-10-12) | `29848170-0b5d-4090-849a-9c11d52d2e7a` · 3 | `4d86f2b1-4586-4c97-a436-3fce8600f4ab` | 2400×1346 |
| `home-letter.jpg` | A homeowner's hands beside an opened envelope, blank letter and taped samples (homepage founders section, 2026-10-11) | `7c601044-11be-4e4b-8f48-87f45c6a6b9a` · 1 | `2cefcafa-5746-42cd-9606-d81213a77f43` | 1600×2000 |

The three `home-*` stills were generated on 11 October 2026 with the house style code, and Kody picked them that day. Their prompts and gate are in [`docs/art-direction/homeowner-shot-list-2026-10.md`](../../../docs/art-direction/homeowner-shot-list-2026-10.md). On 12 October 2026 Kody replaced `home-table` with their own pick (job `96c99846` · 1) and asked for `home-install` to show the contractor checking Patina on his phone. Midjourney dropped the word "Patina" from that prompt, so the phone and tablet screens show generic UI, not the app.

## Loops (`public/videos/studio/`)

Each loop was animated from the still of the same name: Low motion, Loop on, a locked-off camera with small subject motion, 5 s at 24 fps. Encoding:
- Desktop: 1280×720, H.264 (CRF 22, faststart) and AV1 WebM (SVT-AV1 CRF 36).
- Mobile: 960×540, CRF 27 / 40.
- The poster is the still.

| Loop | Video job · variant | Motion prompt (summary) |
|---|---|---|
| `studio-table` | `43b650ff-853f-485d-9437-f1edb1fc04c4` · 1 | The designers keep studying the samples; one lifts a swatch to the light and the other looks up at her (chosen by Kody 2026-10-10; variant 0 was dropped because the swatch morphs as she moves it) |
| `site-visit` | `ade78f1b-7170-41e7-b2aa-2b70bbadf25f` · 1 | The contractor taps the tablet and gestures at chest height toward the stud wall; the others glance and look back |
| `cabinet-shop` | `45dc45d5-43fa-44c2-9617-1abad1ab1b08` · 1 | The cabinetmaker keeps his eyes on the laptop, scrolls the shop drawing; sawdust drifts in the daylight |
| `home-table` | `442a37cb-964a-410f-bc01-456d41e9cfd0` · 1 | The designer laughs and glances across to the couple; the tablet, its screen, the samples and the hands stay still (2026-10-12; variant 0 was dropped because the husband swings nose to nose with the designer) |
| `home-install` | `99ab828f-bdb3-4fbd-a7e4-bbf5f8819dc0` · 0 | The contractor holds the phone steady by the elevation and turns his head toward her; she leans in to read it (2026-10-12). Dropped renders: `8e81a035-c79b-4ce4-b7b8-bebadd161245` (both people turn to the camera), `34d6af5f-7ec4-4996-9eda-2162cc4f4dbd` (the phone waves overhead or she throws an arm up), and variant 1 of the kept job (she raises a hand to her face) |

## Retired

`room.jpg`, `chair.png`, `workbench.jpg` and `materials.jpg` were generated studies from the September 2026 Living Study proposal; their prompts are in `design-proposals/living-study/sources/`. They were retired on 10 October 2026 because they read as generated (impossible joinery, render lighting, old-workshop nostalgia). The site no longer uses them; they stay only because the September 2026 launch package (`docs/launch/photographer-and-makers-2026-09/build.py`, the creative guide) copies them. Delete them when that package is rebuilt.

## Replacing an illustration with photography

1. Record the subject, photographer, written permission, credit, and any confirmed room, piece or maker relationship.
2. Replace the source in its placement. Make the alt text and caption accurate to the photo, and drop the illustration caption only for that file.
3. Move the row from this register to a photography register with its credit.
