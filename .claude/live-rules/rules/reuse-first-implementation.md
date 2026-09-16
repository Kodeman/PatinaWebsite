---
description: Reuse-first implementation
priority: 90
---
- Before changing code, trace the real flow through the App Router page, its section components, and any API route it calls. Decide whether the requested behavior needs new code at all.
- Reuse in this order: an existing component or helper under `src/components` and `src/lib`, then a Next.js or React built-in, then an already-installed dependency. Do not add a package for one call site.
- Motion goes through the wrappers in `src/components/motion`; analytics through the typed events in `src/lib/analytics.ts`; class merging through `cn()`. Do not hand-roll parallel versions.
- Server components are the default. Add `"use client"` only for hooks, interactivity, or Framer Motion.
- When code must change, fix the smallest shared root cause and delete what the change makes dead. Skip speculative guards, config, and abstractions. Keep validation where trust boundaries, data loss, or accessibility require it.
- Run the smallest focused check that exercises the changed behavior before calling it done. Do not claim a result you did not observe.
