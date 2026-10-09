# Codebase Map — Patina Website

*Last Updated: 2026-10-09*

Patina's marketing site ("The Living Study"): a Next.js 16 App Router app that tells the brand story, captures leads (Founding Circle, newsletter, designer and maker applications, contact) into a Supabase Postgres, tracks the funnel in PostHog, sends lifecycle email through Resend, and deploys to Cloudflare Workers via OpenNext. Sanity hosts editorial content (journal, careers) and an embedded Studio at `/studio`. The app and marketplace are pre-launch.

Mapped from branch `codex/living-study-production` at commit `3e8212a` plus a large uncommitted working tree (the Living Study redesign, Cloudflare build scripts, `tests/`). The map describes the working tree as it is.

## Documents

| Document | What's inside |
|----------|---------------|
| [architecture.md](./architecture.md) | Request path, lead-capture pipeline, content sources, deploy shape |
| [tech-landscape.md](./tech-landscape.md) | Stack table, source-of-truth files, env variable names, infra |
| [directory-structure.md](./directory-structure.md) | Annotated tree of `src/`, `sanity/`, `scripts/`, `tests/`, `e2e/`, `docs/` |
| [entry-points.md](./entry-points.md) | Every page route, API route, redirect, script, and test command |
| [modules.md](./modules.md) | `src/lib/*`, component families, Sanity client, scripts |
| [communication.md](./communication.md) | HTTP API contracts, analytics events, PostHog proxy, Resend, Sanity webhooks |
| [database.md](./database.md) | Supabase tables the routes write, Sanity schema types |
| [dependencies.md](./dependencies.md) | Runtime and dev packages by role |
| [patterns.md](./patterns.md) | Route handler shape, error/503 policy, `after()` side effects, testing, config |
| [coding-style.md](./coding-style.md) | Lint, naming, component and CSS conventions |
| [onboarding.md](./onboarding.md) | Quick start, common tasks, gotchas |

## How to use this map

Read `INDEX.md` (injected at session start), then open only the doc that matches the task: a copy or page change starts at `entry-points.md` and `patterns.md`; a form or API change starts at `communication.md` and `database.md`; a deploy question starts at `tech-landscape.md` and `onboarding.md`. Paths are exact; verify before editing anything the map does not mention.

## Keeping this map current

After code changes, assess whether any doc here is now wrong and run the `codebase-mapper:update-codebase-map` skill when it is. `.map-state.json` records the mapped commit and document hashes so staleness is detectable. Never edit `CLAUDE.md` from this map.
