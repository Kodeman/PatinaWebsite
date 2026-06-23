# UTM Governance & Channel Grouping

**Status:** Convention (normative — follow when building any tagged link)
**Date:** 2026-06-23
**Owners:** Growth
**References:** `docs/reports/engagement-capture-audit-2026-06.md` — gaps **G7** (no paid-click IDs or channel grouping) and **G8** (no UTM governance).

---

## Why this exists

UTM parameters are captured at the edge of the funnel (`src/lib/attribution.ts`) and flow into both PostHog (super-properties) and every signup row in Supabase. Garbage in is garbage forever: an inconsistent tag (`Facebook` vs `facebook` vs `fb` vs `FB-Ads`) fragments a single channel into four rows in every report, and there is no after-the-fact fix once the link is in the wild. **Governance happens at link-creation time** — this doc is the contract for that moment.

---

## Naming rules (apply to every UTM value)

1. **Lowercase only.** `utm_source=instagram`, never `Instagram` or `INSTAGRAM`. UTM values are case-sensitive to the analytics layer.
2. **Hyphen-delimited.** Separate words with `-`, never spaces, underscores, or camelCase. `utm_campaign=founding-circle-launch`, never `Founding_Circle_Launch` or `foundingCircleLaunch`.
3. **No spaces, no special characters.** `%20`-encoded spaces and stray punctuation create phantom variants. ASCII `a-z`, `0-9`, and `-` only.
4. **Controlled vocabulary for `source` and `medium`.** These two fields drive channel grouping (below). Use only the approved values. `campaign`, `content`, and `term` are freer-form but still lowercase + hyphenated.
5. **Stable over time.** Reusing the same `campaign` value across a multi-touch push is correct — that's how multi-touch attribution stitches. Do not append dates unless the date *is* the campaign identity.

A tag that violates rules 1–3 should be treated as a bug in the link, not normalized downstream.

---

## Controlled vocabulary

### `utm_source` — *where* the click came from (a specific property/platform)

| Value | Use for |
|---|---|
| `google` | Google Search / Ads |
| `bing` | Microsoft / Bing |
| `instagram` | Instagram (organic or paid) |
| `facebook` | Facebook (organic or paid) |
| `pinterest` | Pinterest |
| `linkedin` | LinkedIn |
| `tiktok` | TikTok |
| `youtube` | YouTube |
| `newsletter` | Our own email sends |
| `partner-<name>` | A named referral partner, e.g. `partner-domino` (lowercase, hyphenated) |
| `print-<name>` | Offline / QR-code campaigns, e.g. `print-dwell-magazine` |

> Add new sources to this table in the same PR that first uses them. An un-listed source is a governance break.

### `utm_medium` — *how* the click was delivered (the channel mechanism)

| Value | Use for |
|---|---|
| `cpc` | Paid search / paid social clicks (cost-per-click) |
| `paid-social` | Paid placements on social platforms (when distinguishing from search `cpc`) |
| `organic-social` | Unpaid social posts, bio links, stories |
| `email` | Newsletter / lifecycle / transactional links |
| `referral` | Partner sites, blogs, press links we control the tag for |
| `affiliate` | Affiliate program links |
| `qr` | Scanned QR codes (print, packaging, events) |
| `display` | Banner / display network |

### `utm_campaign` — the initiative (free-form, lowercase-hyphenated)

Examples: `founding-circle-launch`, `spring-2026-makers`, `designer-waitlist`, `dwell-feature-followup`.

### `utm_content` — the variant within a campaign

Used to A/B distinguish creative or placement. Examples: `hero-cta`, `footer-banner`, `story-swipe-up`, `email-button-a`.

### `utm_term` — paid-search keyword

The bid keyword for `cpc` traffic. Example: `handcrafted-walnut-table`.

### Paid-click IDs (capture, don't author) — audit G7

`gclid` (Google), `fbclid` (Meta), and `msclkid` (Microsoft) are **appended by the ad platforms automatically** — you do not write them, but the site **must capture and store them** so paid campaigns can be reconciled against ad-platform spend. They live alongside the UTM payload on the lead row. Without them, `cpc` rows can be grouped as "paid" but never matched back to a specific click/spend in Google or Meta.

### Canonical example

```
https://patina.cloud/founding
  ?utm_source=instagram
  &utm_medium=paid-social
  &utm_campaign=founding-circle-launch
  &utm_content=story-swipe-up
  &fbclid=<appended-by-meta>
```

---

## `classifyChannel` — bucketing rules

Raw `source` / `medium` / `referrer` are too granular for top-line reporting. A single helper, **`classifyChannel`**, collapses every visit into exactly one of **five** buckets. This is the grouping used for "where do our leads come from" rollups (audit G7).

### Buckets

| Bucket | Meaning |
|---|---|
| `paid` | We paid for the click |
| `social` | Unpaid social referral |
| `organic` | Unpaid search engine |
| `referral` | Another website linked to us (non-social, non-search) |
| `direct` | No discernible source (typed URL, app, untagged) |

### Mapping rules (evaluated top-to-bottom; first match wins)

1. **`paid`** — `utm_medium` is one of `cpc`, `paid-social`, `display`, `affiliate`, **OR** a paid-click ID (`gclid` / `fbclid` / `msclkid`) is present. *Paid-click IDs win even if the medium is mistagged.*
2. **`social`** — `utm_medium` is `organic-social`, **OR** `utm_source` is a known social platform (`instagram`, `facebook`, `pinterest`, `linkedin`, `tiktok`, `youtube`) with no paid signal, **OR** the `referrer` host is a known social domain (e.g. `instagram.com`, `facebook.com`, `t.co`, `lnkd.in`, `pinterest.com`).
3. **`organic`** — `utm_medium` is `organic`/empty with a search `utm_source` (`google`, `bing`), **OR** the `referrer` host is a known search engine (`google.`, `bing.`, `duckduckgo.`, `ecosia.`) with no UTM.
4. **`referral`** — a non-empty `referrer` host that is **not** one of our own domains and **not** matched as social/search above, **OR** `utm_medium` is `referral`/`email`/`qr`. (Email and QR are explicit, traceable referrals.)
5. **`direct`** — fallthrough: no UTM, no paid-click ID, and an empty or self-referencing `referrer`.

### Notes on the rules

- **Order matters.** Paid is checked before social so a paid Instagram click (`paid-social`) lands in `paid`, not `social`.
- **Paid-click IDs override medium.** A mistagged paid link still classifies as `paid` if `gclid`/`fbclid`/`msclkid` is present.
- **Self-referrals collapse to `direct`.** A `referrer` on a `patina.cloud` subdomain is internal navigation, not a referral.
- **`email` and `qr` are `referral`, not `direct`.** They are traceable off-site touches; treating them as direct would hide owned-channel performance.
- **The bucket is derived, not stored as the truth.** The raw UTM + referrer + paid-click IDs remain the source of record; `classifyChannel` is a reporting convenience that can be recomputed if the rules evolve.

### Worked examples

| Input | Bucket | Rule |
|---|---|---|
| `utm_medium=cpc`, `utm_source=google` | `paid` | 1 (cpc) |
| `fbclid` present, no UTM | `paid` | 1 (paid-click id) |
| `utm_source=instagram`, `utm_medium=organic-social` | `social` | 2 |
| `referrer=https://www.instagram.com/...`, no UTM | `social` | 2 (referrer host) |
| `referrer=https://www.google.com/`, no UTM | `organic` | 3 (search host) |
| `utm_medium=email`, `utm_source=newsletter` | `referral` | 4 (email) |
| `referrer=https://somedesignblog.com/post` | `referral` | 4 (external host) |
| no UTM, empty referrer | `direct` | 5 (fallthrough) |
| `referrer=https://patina.cloud/journal` | `direct` | 5 (self-referral) |

---

## Checklist before publishing any tagged link

- [ ] All UTM values lowercase, hyphenated, no spaces/special chars.
- [ ] `utm_source` and `utm_medium` are from the controlled vocabulary (add new entries to this doc in the same PR).
- [ ] `utm_campaign` is the stable, reused initiative name.
- [ ] Paid links rely on the platform to append `gclid`/`fbclid`/`msclkid` — confirm auto-tagging is on.
- [ ] Verify the final link classifies into the intended `classifyChannel` bucket.
