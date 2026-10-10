# Web design: image slots, motion backgrounds, and Kody portrait


## 1. Image-slot inventory

Frames are rendered CSS sizes; fill images follow their containing frame. Text-over means composited with art, not neighboring copy. Replace only illustrative studio assets; founder project photos and partner marks stay still/documentary.

| File:line(s) | Frame / fit | Text over art? | Direction |
|---|---|---|---|
| src/components/studio/LivingStudy.tsx:217 room.jpg; :226 workbench.jpg | Full-bleed 100svh stage; cover, positions 50% 55% and 62% 50% (LivingStudy.module.css:16-43) | Yes, shaded hero copy/CTA | Best loop candidates; swap background layers only. |
| src/components/studio/LivingStudy.tsx:256 chair.png | Floating isolated chair, fill frame | Annotation/caption adjacent | Still foreground object. |
| src/components/studio/LivingStudy.tsx:416 materials.jpg | Sticky founder art, max 680px, inset frame and cover (LivingStudy.module.css:516-533) | Layered paper nearby/over composition; caption below | Still collage. |
| src/components/studio/LivingStudy.tsx:428 chair.png | Paper inset, contain (LivingStudy.module.css:541-558) | Yes, text above/below | Still. |
| src/components/studio/LivingStudy.module.css:228 materials.jpg | Three 112px-high cropped swatch textures, background-size 640% (:231-238) | No, material labels adjacent | Still texture. |
| src/components/studio/DesignerWorkbench.tsx:13,21,29 room/materials/chair | Stacked workbench art frame; cover except isolated chair contain (DesignersPage.module.css:261-285) | Not over image; notation/caption over frame | Still interactive studies. |
| src/app/makers/MakerStudy.tsx:13,21,29 data; :174 renderer | Materials/workbench/chair studies in studyArt (55vw desktop / 100vw mobile), fill; isolated chair frame; MakerStudy.tsx:165-180 | Copy is adjacent; captions overlay image foot | Still, user-selected explanatory triptych. |
| src/app/page.tsx:47 materials.jpg | 800x650 intrinsic; mobile 100vw / desktop 40vw | No, heading below | Still. |
| src/app/services/page.tsx:33 room.jpg; src/app/press/page.tsx:36 materials.jpg; src/app/contact/ContactContent.tsx:105 materials.jpg; src/app/makers/apply/MakersApplyContent.tsx:160 workbench.jpg | Shared StudioPage hero: 1536x1024 source; mobile 100vw / desktop 48vw | No, side-by-side copy; caption below | Still. |
| src/app/services/page.tsx:74 chair.png; :116 materials.jpg | Responsive chair-study/scope frames (TradePages.module.css:180-290), column layout | No, captions below | Still. |
| src/app/app/page.tsx:34 room.jpg | 1536x1024; mobile 100vw / desktop 52vw | No, caption below | Still. |
| src/app/app/page.tsx:49 chair.png | 240px card | Yes, card labels | Still. |
| src/app/app/page.tsx:92 chair.png | 1536x1024 source; mobile 100vw / desktop 50vw, paper study | Yes, note/caption | Still. |
| src/app/careers/page.tsx:58 workbench.jpg | 1536x1024; mobile 100vw / desktop 52vw | No, caption below | Still. |
| src/app/journal/page.tsx:101 materials.jpg | 1536x1024; mobile 80vw / desktop 40vw | No, title adjacent; caption below | Still. |
| src/app/designers/page.tsx:75 materials.jpg | Fill frame; mobile 100vw / desktop 48vw | Invitation card nearby, not over image | Still. |
| src/app/designers/page.tsx:211 chair.png | 310px application-study figure | Caption below | Still. |
| src/app/makers/page.tsx:50 workbench.jpg | Full-bleed cover hero (MakersPage.module.css:51-56) | Yes, shaded title/copy | Loop candidate; retain poster. |
| src/app/makers/page.tsx:310 windy-peak-room.jpg | Responsive fill/crop | No, portfolio copy nearby | Still/documentary. |
| src/components/studio/StoryJourney.tsx:65,75,85 windy room/detail, Sahara kitchen | Stage ~62vw desktop/100vw mobile, fill; cover positions 50% 62%, 50% 46%, 50% 56% (:69,79,89,133) | Stage label; observation copy adjacent | Still real project photos. |
| src/app/about/page.tsx:58 hiawatha-room.jpg | 650px desktop hero (StoryPage.module.css:67-75), cover 48% 50%; mobile override | Copy adjacent | Still/documentary. |
| src/app/about/page.tsx:138 leah-kochaver.jpg | 100% width x 570px; cover 50% 28% (StoryPage.module.css:180-200) | Caption below | Still portrait. |
| src/app/about/page.tsx:281 country-home-kitchen.jpg | 1000x1334 source; responsive closing frame, cover 50% 58% (StoryPage.module.css:495-508) | Caption below, invitation adjacent | Still/documentary. |
| src/components/sections/StudioConnection/StudioConnection.tsx:31,41 partner logo/wordmark | 64x96px and 192x24px; contain | No | Must stay still. |

This enumerates every /images/ reference in src and the CSS background URL. Dynamic CMS images are outside this replacement inventory; no source component renders video.

## 2. Moving-background specification

Use 5–10s locked-off or extremely slow loops: no cuts, fast exposure shifts, people, or hand motion. Deliver MP4 H.264 (video/mp4) plus WebM AV1 (video/webm; codecs=av01...), with JPEG/WebP poster. Encode 1920x1080 desktop at 2.5–4 Mbps (2–4 MB per 5–8s); 960x540 mobile at 0.8–1.5 Mbps (under 1.5 MB). Hard cap each file at 20 MB, below the 25 MiB Workers static asset limit with margin.

One reusable client component: src/components/studio/BackgroundVideo.tsx, props { mp4Src, webmSrc, poster, className?, ariaLabel? }; decorative by default, aria-hidden, no controls. Use native <video autoPlay muted playsInline loop preload="none" poster> with source fallbacks. Defer source activation until near viewport; eager poster only for visible hero, lazy below-fold. IntersectionObserver starts eligible media in view and pauses offscreen. Use src/hooks/useReducedMotion.ts and existing StudioMotion/user toggle: reduced motion means poster only, no autoplay. Check navigator.connection?.saveData and use poster only when true. No <video> currently exists under src.

wrangler.jsonc serves .open-next/assets through ASSETS and has only patina-website-cache R2 binding, not public media. Start with static assets within per-file limit. R2 requires intentional public origin/cache routing; Stream is unnecessary for short loops. Create seamless loop offline by matching endpoint frame/luminance, slow continuous movement and a short tail-to-head crossfade; inspect seam, do not runtime-fetch a second clip.

## 3. Kody bio placement

src/app/about/page.tsx:152 (#kody) currently has quote card and reading column but no image; Leah portrait at :138 is 570px tall. Add Kody beside reading: square 320–360px desktop / 72–85vw mobile, object-fit: cover; object-position: 50% 50%, keeping face centered rather than Leah’s tall crop. Use /images/founders/kody-kochaver.png, width={1254}, height={1254}; alt: “Kody Kochaver, co-founder of Patina.” Provided PNG has checkerboard baked into pixels and no alpha: do not represent it as transparent; visually approve the checkerboard before publication. Add credit: “Portrait supplied by Kody Kochaver; source/photographer and publication permission to confirm.” Add row to public/images/founders/README.md without asserting unknown photographer or license.

## 4. Provenance and tests

public/images/studio/README.md identifies four launch assets as generated illustrative studies; requires near-scene context, accurate alt, captions on crops/derivatives and register updates. Carry “Illustrative, created with AI” beside each generated still/video (poster and loop are one asset), with full context: “An illustrative study, created with AI. Not a Patina project, available product, or maker partnership.” Keep in shared crops; update register with new asset, prompt, version, edits, exports and derivative usage. Remove no AI label while source remains generated. Documentary founder photos retain their existing credits, not AI labeling.

rg through e2e/ found no assertions on /images/ src or image alt; only unrelated form label assertions. If adding Kody image, extend e2e/about.spec.ts to check visible portrait, source and meaningful alt. For moving hero, test poster/reduced-motion behavior only with implementation.

## 5. Ordered implementation checklist

1. Prepare approved Midjourney stills, matched desktop/mobile loops and posters; record creator, prompt/version, edits, permission and filenames.
2. Add assets under public/images/studio/ and update public/images/studio/README.md with per-asset provenance and preserved caption.
3. Add src/components/studio/BackgroundVideo.tsx with reduced-motion, StudioMotion toggle, Save-Data, lazy start, offscreen pause, poster and codec fallback.
4. Integrate only full-bleed scene in src/components/studio/LivingStudy.tsx and .module.css and makers hero in src/app/makers/page.tsx plus MakersPage.module.css if loops are approved; leave all other placements still.
5. Add Kody portrait in src/app/about/page.tsx, layout in src/components/studio/StoryPage.module.css and provenance row in public/images/founders/README.md after checkerboard/rights approval.
6. Extend e2e/about.spec.ts for portrait src/alt; add focused poster/reduced-motion checks only with the video component.
7. Verify each asset under 25 MiB; check mobile/desktop crop, attribution, reduced motion, Save-Data, offscreen pause, and responsive layout. Avoid broad suite before integration gate.
