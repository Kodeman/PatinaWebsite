---
description: Keep changed code within the CRAP ceiling
globs: ["src/**"]
priority: 85
---
- Before calling a change to `src/` done, run the gate: `node "/Users/kody/.claude/plugins/cache/eigenwise-toolshed/quartermaster/0.12.0/bin/quartermaster.js" crap --project "/Users/kody/Code/PatinaWebsite"`. Config lives in `.claude/quartermaster/crap.json` (ceiling 6, ratchet against `main`, sources `src/`).
- The ceiling applies to functions you add or grow. Legacy functions above it are grandfathered by the ratchet; do not raise their complexity.
- Coverage comes from `npm run test:server` through `tests/helpers/load-module.mjs`, whose inline source maps let node attribute VM-run handlers to `src/`. A covered function passes at its complexity; an uncovered new function must stay at one branch or gain a test. Route modules that import a new `src/lib` file must mock or load it in `handlerHarness`.
- `.tsx` is excluded on purpose: lizard counts a `?` inside JSX text as a ternary, so static pages score as complex. Do not re-add it without fixing the measurement.
- Exit 1 lists offenders by file and line. Split the function or cover it, then rerun. Exit 2 is a missing prerequisite (lizard via `uvx`, or the lcov file); follow the printed hint and rerun. Never report the gate as passed without the run.
