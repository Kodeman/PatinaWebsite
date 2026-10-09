# Patina / Photographer and maker handoff

Prepared 12 September 2026. This supplements the September launch package.

## Share these two documents

- **Patina-Photographer-Shot-List.pdf**: a six-page photography brief with 16 prioritized shots, four optional motion clips, composition and continuity notes, a proposed four-hour home/studio session, a separate 90-minute workshop session and delivery specifications.
- **Patina-Maker-Pitch-Packet.pdf**: a six-page maker-facing introduction with Kody's founder note, the first 15 invitation, the reasons to participate, conversation prompts, application preparation and answers to practical questions. Includes clickable application links and a QR code to `https://patina.cloud/makers/apply`.

The PDFs are in `output/pdf/` at the repository root and in the downloadable handoff ZIP's `PDFs/` folder. Nothing has been emailed, scheduled or published.

## Working files

- `photographer-shoot-checklist.csv`: 16 stills plus four optional motion rows, with blank fields for status, selected filenames, confirmed captions, subject identity, photographer credit and agreed usage. The detailed setup notes are here as well as the PDF's shot directions.
- `photographer-shot-list.md`: editable reading copy of the photography brief.
- `maker-pitch-packet.md`: editable reading copy of the maker invitation.
- `maker-cover-email.md`: first email from Kody, one follow-up and short internal use notes. Replace the recipient and specific observation before sending.
- `build.py`: ReportLab source for both designed PDFs. Text changes in the Markdown reading copies do not automatically rebuild the PDFs; make final layout/copy edits in `build.py` and run it again.
- `assets/`: the two image references, local fonts and font licenses used by the builder.

## Scope decisions

The first photography delivery concentrates on rooms, the actual hero piece, materials and making. The two shoot blocks are proposals for a photographer's quote; locations, date, access, subjects, delivery, usage and optional motion/cutout work remain to be arranged. Travel is additional to the session timings. Founder portraits are a later priority and the full photo set is not a launch requirement.

The maker packet is for recruiting a founding group while the app and marketplace remain pre-launch. It offers a personal review and conversation with Kody and Leah, with a reply within two weeks. It promises no sales volume, settled commission rate, exclusive arrangement or already-live marketplace. "15" is the program size, not a remaining-place count.

## Source and imagery register

Copy was checked against the repository's source of truth on 12 September 2026:

- `docs/messaging/patina-messaging-system.md` (version dated 10 September 2026): voice, positioning, founder facts, pre-launch status, CTA and proof rules.
- `src/app/makers/page.tsx`: the public invitation and maker partnership details.
- `src/app/makers/apply/MakersApplyContent.tsx`: required application fields and optional portfolio/trade fields.
- `design-proposals/living-study/PHOTOGRAPHY-SHOT-LIST.md`: the previously agreed photography priorities and continuity direction.
- `public/images/founders/README.md` and `public/images/studio/README.md`: original provenance.
- `src/components/ui/StrataMark/StrataMark.tsx`: exact compact Strata geometry and default/on-clay color variants.

**Photography brief cover:** `assets/room-reference.jpg`, copied unchanged from `public/images/studio/room.jpg`. Internal provenance: generated concept study from the approved website direction. Public caption: "Illustrative imagery — awaiting partner photography." It is a visual reference, not a documented product or partner workshop.

**Maker packet, page 2:** `assets/hiawatha-room.jpg`, copied unchanged from the approved founder image collection. Hiawatha, Middle West Studio. Interior design: Leah Kochaver. Photography: Ashley Hicks. [Original project source](https://www.middlewest.studio/saraha-circle-1). This documents Leah's design practice, not a Patina marketplace listing or client commission. The owner's earlier authorization permits using these source images in this work. Preserve the credit with reuse.

No new imagery was generated. The Strata mark retains the website's existing line lengths, thicknesses, spacing, colors and opacity. Font redistribution notices are included.

## Rebuild and check

The builder uses Python with `reportlab`, `fonttools` and `pypdf`; Poppler renders the final PDFs for visual inspection. From the repository root, run `python3 docs/launch/photographer-and-makers-2026-09/build.py` in an environment with those dependencies. It creates both PDFs under `output/pdf/`, refreshes the reading copies and CSV, and records temporary layout checks under `tmp/pdfs/patina-photo-maker/`. The extracted ZIP is also self-contained: run `python3 build.py` from its root with the same dependencies; it uses the bundled assets and writes into `PDFs/`.

For this delivery, all 12 PDF pages were rendered with Poppler for visual review. Text bounds, page counts and application link targets are checked before packaging. See `quality-checks.md` for final results.
