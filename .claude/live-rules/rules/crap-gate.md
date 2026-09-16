---
description: Keep changed code within the CRAP ceiling
globs: ["src/**"]
priority: 85
---
- Before calling a change to `src/` done, run the gate: `node "/Users/kody/.claude/plugins/cache/eigenwise-toolshed/quartermaster/0.11.1/bin/quartermaster.js" crap --project "/Users/kody/Code/PatinaWebsite"`. Config lives in `.claude/quartermaster/crap.json` (ceiling 6, ratchet against `main`, sources `src/`).
- The ceiling applies to functions you add or grow. Legacy functions above it are grandfathered by the ratchet; do not raise their complexity.
- Node tests run the API handlers inside a VM sandbox, so V8 coverage attributes nothing to `src/`. Until that changes the gate is effectively a complexity gate: a new function with more than one branch needs splitting, not a coverage excuse.
- Exit 1 lists offenders by file and line. Split the function or cover it, then rerun. Exit 2 is a missing prerequisite (lizard via `uvx`, or the lcov file); follow the printed hint and rerun. Never report the gate as passed without the run.
