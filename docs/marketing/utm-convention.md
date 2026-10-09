# UTM convention

Every campaign link into patina.cloud carries four parameters so a visit, and the lead it becomes, can be traced to one piece.

| Param | Meaning | Values |
| --- | --- | --- |
| `utm_source` | Platform or partner | `instagram`, `linkedin`, `pinterest`, `email-leah`, `kippley`, `moll-drive`, `patina` |
| `utm_medium` | Kind of placement | `social`, `email`, `print`, `referral`, `video` |
| `utm_campaign` | Brief slug, `YYYY-MM-slug` | `2026-10-moll-drive`, `2026-10-studio-door`, `2026-10-first-hire` |
| `utm_content` | Piece id from the run plan | `P01`, `P02`, ... (write lowercase in URLs: `p01`) |

## Rules

- Lowercase and hyphens only, in every value.
- Print never carries a long UTM URL. Use the vanity paths below; each redirects (307) to `/designers` with source, medium and campaign set. Print pieces are told apart by the vanity path, not by `utm_content`.
- Every digital link gets all four params.
- Vanity paths are defined in `next.config.ts` `redirects()` and are temporary (`permanent: false`); remove them when the campaign ends.

## Vanity paths (print)

| Path | Redirects to |
| --- | --- |
| `patina.cloud/parade` | `/designers?utm_source=moll-drive&utm_medium=print&utm_campaign=2026-10-moll-drive` |
| `patina.cloud/studio-door` | `/designers?utm_source=patina&utm_medium=print&utm_campaign=2026-10-studio-door` |
| `patina.cloud/hire` | `/designers?utm_source=patina&utm_medium=print&utm_campaign=2026-10-first-hire` |

## Link table

Base for digital rows: `https://patina.cloud/designers`. Piece ids come from each run's `plan.json`. The first-hire brief has no plan yet, so its ids (P01-P07) follow the brief's `pieces` order and must be confirmed when its plan is generated.

### 2026-10-studio-door (`runs/2026-10-08-studio-door/plan.json`)

| Piece | Channel | Link |
| --- | --- | --- |
| P01 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-studio-door&utm_content=p01` |
| P02 | linkedin-landscape | `https://patina.cloud/designers?utm_source=linkedin&utm_medium=social&utm_campaign=2026-10-studio-door&utm_content=p02` |
| P03 | pinterest-2x3 | `https://patina.cloud/designers?utm_source=pinterest&utm_medium=social&utm_campaign=2026-10-studio-door&utm_content=p03` |
| P04 | email (letter from Leah) | `https://patina.cloud/designers?utm_source=email-leah&utm_medium=email&utm_campaign=2026-10-studio-door&utm_content=p04` |
| P05 | one-pager-letter (event table) | `patina.cloud/studio-door` |
| P06 | deck-16x9 (in-person sit-down) | `patina.cloud/studio-door` |
| P07 | email (PR pitch) | `https://patina.cloud/designers?utm_source=email-leah&utm_medium=email&utm_campaign=2026-10-studio-door&utm_content=p07` |
| P08 | poster-18x24 | `patina.cloud/studio-door` |
| P09 | video-9x16 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=video&utm_campaign=2026-10-studio-door&utm_content=p09` |

### 2026-10-moll-drive (`runs/2026-10-09-moll-drive-house/plan.json`)

| Piece | Channel | Link |
| --- | --- | --- |
| P01 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-moll-drive&utm_content=p01` |
| P02 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-moll-drive&utm_content=p02` |
| P03 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-moll-drive&utm_content=p03` |
| P04 | poster-18x24 (easel sign at the house) | `patina.cloud/parade` |
| P05 | email (Leah to Madison studio owners) | `https://patina.cloud/designers?utm_source=email-leah&utm_medium=email&utm_campaign=2026-10-moll-drive&utm_content=p05` |
| P06 | one-pager-letter (studio leave-behind) | `patina.cloud/parade` |
| P07 | one-pager-letter (counter flyer at the house) | `patina.cloud/parade` |

### 2026-10-first-hire (`briefs/2026-10-first-hire.md`)

| Piece | Channel | Link |
| --- | --- | --- |
| P01 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-first-hire&utm_content=p01` |
| P02 | instagram-4x5 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-first-hire&utm_content=p02` |
| P03 | linkedin-landscape | `https://patina.cloud/designers?utm_source=linkedin&utm_medium=social&utm_campaign=2026-10-first-hire&utm_content=p03` |
| P04 | email (letter from Leah or Kody) | `https://patina.cloud/designers?utm_source=email-leah&utm_medium=email&utm_campaign=2026-10-first-hire&utm_content=p04` |
| P05 | poster-18x24 | `patina.cloud/hire` |
| P06 | one-pager-letter | `patina.cloud/hire` |
| P07 | video-9x16 | `https://patina.cloud/designers?utm_source=instagram&utm_medium=video&utm_campaign=2026-10-first-hire&utm_content=p07` |

Notes: the studio-door deck (P06) is shown in person, so it uses the print vanity path. Partner placements (for example `kippley`, `referral`) follow the same four-param rule; add rows here as they are agreed.

## Where to see it

- PostHog: build an insight on pageviews of `/designers` and break down by `utm_campaign` (then `utm_content` for the piece).
- Leads: founding, designer, maker, and contact rows in Supabase carry `utm_*` and first/last-touch attribution (`src/lib/attribution.ts`, `src/lib/lead-payload.ts`).
