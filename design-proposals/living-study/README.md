# Patina — The living study / Round 06

Open **Patina-Homepage-Prototype.html** for the full-size homepage. Open **Patina-The-Living-Study.html** for the presentation, which includes the same working prototype.

Both files embed their images, fonts, styles, and scripts. Share both together for the presentation's full-size links to work. The embedded homepage works within the presentation alone.

## What changed

Scroll through **In the room → As a study → In the making**. The opening stays in view while the chair, photography, palette, typography, and active view marker change together, then releases into the rest of the page. Scrolling upward reverses the sequence.

After the opening, Leah and Kody’s story shares a moving composition: a material table becomes an open paper study as Kody’s reason for building enters. The page ends with **The Founding Circle**: the original site's five member benefits, its 200-member cap, and a personal letter lifting from an olive envelope. Prominent join links appear in the opening, the navigation, the offer, and the letter. A compact joining rail stays available through the founder passage and hides when a section join button is visible.

- Use the view buttons to go directly to a perspective. Arrow keys, Home, and End work when a view button has focus.
- Select a material to lift the sample and read its note.
- The desktop **Our beginnings** link skips the opening passage.
- **Our story** remains available for Leah and Kody’s fuller account.
- **Motion off** removes the pinned scroll distance and object movement, preserving the chosen view. Device reduced-motion preferences are respected.
- Phone layouts bring the founder imagery into the reading flow. Very short viewports use manual hero controls.
- Every **Join the Founding Circle** link opens the existing Patina signup page directly in a new tab. This prototype captures and submits no personal information.
- **See what’s included** jumps to the five benefits: first access, monthly influence, founder updates, named recognition, and permanent status. The 200-member cap is not a live remaining-spots counter.
- Room, chair, material, and maker images are generated illustrations. No product, finish, or maker relationship is claimed.
- Round 05 is preserved in `homepage-v5.html` and `presentation-v5.html`.

## Edit and rebuild

Edit `homepage.html` for the prototype or `index.html` for the presentation, then run:

```sh
python3 design-proposals/living-study/build-portable.py
```

Preview from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory design-proposals/living-study
```

- Homepage: http://127.0.0.1:8765/Patina-Homepage-Prototype.html
- Study: http://127.0.0.1:8765/Patina-Homepage-Prototype.html#study
- Our story: http://127.0.0.1:8765/Patina-Homepage-Prototype.html#our-story
- Founding Circle: http://127.0.0.1:8765/Patina-Homepage-Prototype.html#founding-invitation
- Presentation: http://127.0.0.1:8765/Patina-The-Living-Study.html

The presentation's existing feedback worksheet saves locally and downloads Markdown. Nothing is sent.

## Sources and validation

See `DESIGN-NOTES.md` for decisions, source boundaries, and checks. Image prompts are retained in `sources/`; generated source imagery is in `assets/`. Round 06 reuses the approved round 04 concept images. Founder wording is proposed copy grounded in the messaging system and Kody’s feedback. Membership benefits come from `src/app/founding/FoundingPageContent.tsx`; the cap and CTA label follow the messaging system.

This is a proposal artifact, not a production website release.
