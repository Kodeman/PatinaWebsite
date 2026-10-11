# Homeowner homepage: copy deck

*October 2026. Creative director and homeowner copywriter. Scope: the patina.cloud homepage only (`src/app/page.tsx`, `src/components/studio/LivingStudy.tsx`). /designers, /makers and every other page stay studio-first.*

**Governing.** Kody's ruling (October 2026): the homepage speaks to a homeowner about her own home. This is a scoped exception to `marketing/canon/voice.md` §1 and ruling V3; the canon amendment is written separately. Everything else in canon binds: `voice.md`, `lexicon.json`, `claims.md`. No price or fee language (V2). Names, not titles (V4). The tagline stays where it already is, once, in the FoundingInvitation foot (V5); this deck adds it nowhere. The app and marketplace are pre-launch [C24], so nothing here says download, buy or order.

**The reader.** She owns an older house and is about to change it. She has taste and a designer beside her, and she does not want to be surprised on install day. What we tell her, from VISION: you and your designer are looking at the same agreed direction. Fewer surprises [C05].

**Conventions in this deck.**
- ` / ` marks a JSX line break (`<br />`). A slash that is literal on the page today is marked *(literal slash)*.
- `[Cnn]` is a citation to `marketing/canon/claims.md`. Markers are for this deck and its lint only. They never ship.
- `{nn}` stands for an unchanged two-digit numeral already in the code (chapter numbers, the scene counter). It is written this way so the deck passes the number rule; the numerals themselves do not change.
- Link arrows (the up-right arrow, the down arrow) stay in code as they are and are left out here.
- Headline lines are kept to roughly the length of today's lines, so nothing new wraps on a phone at its narrowest.

## 1. The arc in five lines

1. **Your table.** You, your designer, a printed plan and the samples, at your own kitchen table.
2. **Up close.** The oak, the linen, the tile you will live with, seen in your own light.
3. **Install day.** The people building it work from the page you agreed. Fewer surprises.
4. **Who is behind it.** Leah's eye and Kody's build, from Madison [C01] [C02].
5. **The door.** Join the Founding Circle and help shape it before it launches. Designers, your door is just below.

## 2. String table

Every current visible string and accessible name in the two files, in page order. Image alt text is out of scope. "Keep" means the current text stays as it is.

### `LivingStudy.tsx`: the scroll scenes

| Where | Current | New | Note |
|---|---|---|---|
| `scenes.room.label` | In a room | Your table | Switch button. |
| `scenes.room.kicker` | For studios. | At your kitchen table. | Matches the new hero picture. |
| `scenes.room.title` | One living document / per client. | On the same page / as your designer. | Recommended pick, see §3. This is the page's `h1` on load. |
| `scenes.room.description` | From brief to install. Your client sees the same page you do: one agreed direction. | We’re building one page for you and your designer: what you agreed, from the brief to the install. [C04] [C05] | "We’re building" keeps it honest while pre-launch. |
| `scenes.study.label` | As a study | Up close | Switch button. |
| `scenes.study.kicker` | A closer look changes everything. | The samples come home. | |
| `scenes.study.title` | An eye for / what belongs. | Hold it in / your own light. | Recommended pick, see §3. |
| `scenes.study.description` | The curve of a frame. The warmth of the grain. Good design begins with paying attention. | Oak, linen, zellige, a green door. Choose them at home, then keep the choice on the page you share. | Names only what the material-scheme picture shows. |
| `scenes.making.label` | In the making | The install | Switch button. |
| `scenes.making.kicker` | Behind every piece, a person. | The people who build it. | |
| `scenes.making.title` | Care is in / the details. | Fewer surprises / on install day. | Recommended pick, see §3. |
| `scenes.making.description` | The hands, the judgment, the time. We’re building a place where the story of a piece stays with it. | Your contractor and cabinetmaker will work from the page you agreed: the same door, the same finish, the same plan. [C31] | Future tense on purpose (pre-launch). |
| `materials[White oak].detail` | A warm grain, made richer by the passing years. | A warm grain that deepens as the kitchen is used. | Name "White oak" keeps; it must match the swatch crop. |
| `materials[Linen].detail` | An easy texture. A little irregularity. Room to settle in. | Soft and a little uneven. It relaxes as you live with it. | Name keeps. |
| `materials[Zellige].detail` | A quiet, grounding color that brings the materials together. | No two tiles alike, so the wall catches the light. | Name keeps. Today's line describes a color, not the tile. |
| stage `aria-label` | Explore the living study | Explore one home, from table to install | Accessible name. |
| hero button (`TrackedLink` to /designers) | Bring one live project | *Replaced.* Primary: the existing `JoinCircleButton`, label "Join the Founding Circle". Secondary text link: For designers | Founding Circle becomes the hero's main door; the designer link drops to a quiet text link to /designers. See §3. |
| room cue button `aria-label` | Look closer at the materials | Keep | |
| room cue button | + | Keep | |
| room cue text | There’s more to it. + span "Take a closer look" | See the samples. + span "Take a closer look" | |
| study side text | A small material study. / Three things that feel right together. | Your kitchen, in samples. / Three that sit well together. | |
| swatch group `aria-label` | Explore the study materials | Keep | |
| figure caption | Illustration. | Keep | |
| study annotation | span "Considered, from every angle." + Good things reward a second look. | span "Morning light, then lamplight." + Live with them before you decide. | How any good designer judges samples: at home, morning and evening. |
| making note | A maker’s care deserves to be part of the story. We’re making room for it. | The hands behind your kitchen deserve a name. We’re making room for that. | Honors the craft; sells no maker. |
| making note link (/makers) | Meet the making | Meet the makers | Link target unchanged. |
| dock counter | {nn} / {nn} | Keep | Numerals unchanged. |
| dock scroll hint (motion on) | Scroll to explore the studio | Scroll from table to install | |
| dock scroll hint (motion off) | Explore the three views | Three moments in one home | |
| dock anchor (#beginnings) | Continue to our story | Meet Kody and Leah | |
| switch group `aria-label` | Studio views | Moments in one home | Accessible name. |
| dock end note | Illustration. Not a real project. | Keep | Still true of all three scenes, including the new couple at their own table. |

### `LivingStudy.tsx`: FounderJourney

| Where | Current | New | Note |
|---|---|---|---|
| beginnings chapter label | {nn} / A shared instinct *(literal slash)* | {nn} / Who is behind it *(literal slash)* | |
| beginnings `h2` | Behind the study, / two people. / *One shared instinct.* | Behind Patina, / two people. / *One house at a time.* | Italic line stays the `em`. |
| beginnings small | Rooted in Madison. Made for a wider circle. | Keep | "Wider circle" now leads to the Founding Circle below it. |
| founders section `aria-label` | Why we’re building Patina | Keep | |
| founder paper label | The living study / Illustration. *(literal slash)* | Keep | |
| founder paper span | A little room to think differently. | A little room to think it over. | |
| founder slip | Leave room for / the creative part. | Keep | Reads right from her side too. |
| founder slip span | A note from the studio | Keep | |
| founder credit link | Windy Peak / Middle West Studio *(literal slash)* | Keep | Credit line. "Middle West Studio" exact. |
| founder credit line | Interior design by Leah Kochaver. Photography by Ashley Hicks. | Keep | Credit line. |
| Leah person label | {nn} + span "Leah / the designer’s eye" *(literal slash)* | Keep | |
| Leah `h2` | A room is more / than the things / in it. | Your house / already has / a point of view. | See §5. |
| Leah body, first | Through her work at Middle West Studio, Leah sees what makes a home feel personal: how someone lives, what they keep, and the details they’re drawn to. | See §5 | |
| Leah body, second | Patina carries that attention into the search for furniture. A designer’s judgment belongs in the process from the beginning. | See §5 | |
| Leah blockquote | “The tools never matched how designers actually think.” | *Removed as a quote.* Pull line: Your taste, written down where your designer can see it. | No Leah quote in claims.md, so it cannot run as a quote. See §5. |
| Kody person label | {nn} + span "Kody / room for a different tool" *(literal slash)* | {nn} + span "Kody / the one building it" *(literal slash)* | |
| Kody `h2` | The process / should feel / creative, too. | What you decide / shouldn’t get lost / in a text thread. | See §5. |
| Kody body, first | Kody saw a gap in the tools around that work. The rooms were personal. The process of finding what belonged in them often felt sterile. | See §5 | |
| Kody body, second | He’s building Patina to bring those worlds closer: a place to explore, make connections, and follow an idea with a designer’s perspective alongside you. | See §5 | |
| Kody link (/about) | Our story, still being written | Keep | |
| belief chapter label | {nn} / What brings us together *(literal slash)* | {nn} / Where you come in *(literal slash)* | |
| belief `h2` | Your eye. / A designer’s care. / Something that’s yours. | Keep | Already hers. Strongest line on the page. |
| belief body | We’re building a way to explore your taste and your space, then bring a designer into the conversation with a thoughtful starting point. | We’re building a way for your taste and a designer’s judgment to meet on one page. The Founding Circle helps shape it. | Hands off to the Founding Circle, which now follows directly. |
| belief link (/app) | See what we’re building | Keep | /app already says pre-launch. |

### `page.tsx`

| Where | Current | New | Note |
|---|---|---|---|
| launch line | The app and marketplace are pre-launch. For your own home, the Founding Circle is open. [C24] | Keep [C24] | Already speaks to her. |
| launch line link (/founding) | A place at the beginning | Keep | |
| doors kicker | There’s a place for your perspective. | *Removed* | The band goes quiet, see §4. |
| doors `h2` | A studio takes / many hands. | *Removed* | Section keeps an accessible name: `aria-label` "For designers". |
| door kicker | For designers / the Founding 50 [C23] *(literal slash)* | For designers. | |
| door `h3` | Your judgment / belongs here. | Keep | Studio-first, like /designers. |
| door body | Built for the year a studio brings on its first designer and the work doubles. [C03] Bring one live project to the Founding 50 [C23]. Kody and Leah read every application. [C23] | Running a studio? Patina is built for the year it brings on its first designer and the work doubles. [C03] Kody and Leah read every application. [C23] | One sentence shorter; the link carries the ask. |
| door link (/designers) | Apply to the Founding 50 [C23] | Keep [C23] | |
| doors caption | Illustration. | Keep, if the picture stays | See §4 on the picture. |

**FoundingInvitation** (shared with /founding). Its copy already reads to a homeowner ("For your own home.", "A place at the table.") and needs no change for this ruling. One flag that holds on both pages: the cap line ("Limited to … founding members") states a member count with no row in claims.md, so it fails the number rule as written. Either add a verified claims row for the cap, or cut the line to "Open wherever you call home." That is an orchestrator call because it changes /founding too; this deck does not decide it.

## 3. Hero: headline options

Each scene carries a kicker, a headline and one line beneath. Recommended picks are the ones in the table.

**Scene 1, room (couple and their designer at their own kitchen table)**
- **A (recommended):** On the same page / as your designer.
- B: One direction, / agreed at your table.
- Why A: it says the whole idea in words she already uses, and it is literally true of the product [C05]. B is warmer but asks her to know what "direction" means.

**Scene 2, study (oak, linen, zellige, green door, quartzite)**
- **A (recommended):** Hold it in / your own light.
- B: An eye for / what belongs. (today's line, kept)
- Why A: it is how a designer judges a sample, and it puts the samples in her house, not a showroom. B is good but speaks from the designer's side.

**Scene 3, making (homeowner walking her kitchen mid-install with the cabinetmaker)**
- **A (recommended):** Fewer surprises / on install day.
- B: Built the way / you agreed.
- Why A: it names the moment she is afraid of and says only "fewer", which is what VISION says. B overreaches; nothing guarantees a build.

**Hero doors (scene 1 only, where the hero button sits today)**
- Primary: the existing `JoinCircleButton`, "Join the Founding Circle" (opens the existing modal, then /founding).
- Secondary, quiet text link to /designers: **For designers**
- Implementation note for whoever builds it: the new link is a CTA, so it goes through `TrackedLink` (a `home_hero` location) to keep `e2e/tracking-coverage.spec.ts` green.

## 4. Section order

**Confirmed, with one adjustment:** hero, launch line, founders, Founding Circle, designer band.

1. **Hero** (three scenes, Founding Circle button and the quiet "For designers" link).
2. **Launch line** stays directly under the hero. It is the honest pre-launch sentence [C24] and should sit next to the first button.
3. **Founders** (beginnings band, Leah and Kody, belief band). The belief band now ends on "The Founding Circle helps shape it", so it hands straight to:
4. **Founding Circle** (`FoundingInvitation`, unchanged). The main door.
5. **Designer band**, quiet. *Adjustment:* drop its kicker and `h2`, keep one compact row, and either drop the desk picture or run it small. It should read as a signpost, not a second pitch.

**Designer band copy**
- Kicker: For designers.
- Headline: Your judgment / belongs here.
- Body: Running a studio? Patina is built for the year it brings on its first designer and the work doubles. [C03] Kody and Leah read every application. [C23]
- Link (/designers): Apply to the Founding 50 [C23]

## 5. Leah and Kody, from her side

Facts kept: Leah designs at Middle West Studio in Madison [C01] and leads design at Patina [C02]; Kody builds Patina [C02]. No titles (V4).

**Leah**
- Label: {nn} Leah / the designer’s eye *(literal slash, keep)*
- Headline: Your house / already has / a point of view.
- Body: Leah designs homes at Middle West Studio in Madison. [C01] She starts with how you live: what you keep, where the morning light lands, the things you reach for without thinking.
- Body: At Patina she leads design [C02], so the page you share with your designer reads the way a good designer thinks.
- **Pull line (not a quote):** Your taste, written down where your designer can see it.
- Blockquote ruling: claims.md has no verified Leah quote (C09 to C13 are third-party studio quotes, written to studios), so the current blockquote cannot stay as a quote. The pull line above runs in the same visual slot without quotation marks or a `blockquote` element, and is not attributed to her.

**Kody**
- Label: {nn} Kody / the one building it *(literal slash)*
- Headline: What you decide / shouldn’t get lost / in a text thread.
- Body: Kody saw a gap around Leah’s work. The rooms were personal. The decisions behind them lived in emails, texts and notebooks.
- Body: He’s building Patina [C02] so what you choose with your designer stays on one page, from the brief to the install [C04], where the people building your kitchen can see it too. [C31]
- Link (/about): Our story, still being written *(keep)*

## 6. Lint log

Command: `node /Users/kody/Code/patina-merged/marketing/tools/voice-lint.mjs` on this deck, run from the PatinaWebsite root. Output:

```
1 file(s): 0 error(s), 0 warning(s)
```

Checked by eye as well (lint cannot see these): no "platform", "solution", "dashboard" or marketplace-speak; no price, fee or money word; no titles; no download, buy or order verb; places are Madison only; "Middle West Studio" spelled exactly; the tagline is not added anywhere.

**Claims used**

| id | where | what it backs |
|---|---|---|
| C01 | Arc line 4; Leah body | Middle West Studio, Madison |
| C02 | Arc line 4; Leah and Kody bodies | Leah leads design; Kody leads the build |
| C03 | Designer band body | The year a studio brings on its first designer and the work doubles |
| C04 | Scene 1 description; Kody body | One page per client, from brief to install |
| C05 | Reader note; scene 1 description and option A | Client and designer see the same page, one agreed direction |
| C23 | Designer band link and body | Founding 50 [C23]; Kody and Leah read every application |
| C24 | Governing note; launch line; §4 | App and marketplace are pre-launch |
| C31 | Scene 3 description; Kody body | The household, contractor and trades each hold a seat on the job |

All eight are `verified` rows. No `todo` row is used. No quote is used.
