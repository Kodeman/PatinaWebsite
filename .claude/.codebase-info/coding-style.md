# Coding Style

*Last Updated: 2026-09-15*

## Tooling

ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` and `/typescript`; ignores `.next`, `.open-next`, `.wrangler`, `cloudflare-env.d.ts`. No Prettier config; the codebase uses double quotes in `.tsx`/`.ts` under `src/` and single quotes in a few newer files (`SignupContent.tsx`, `founding/count/route.ts`, tests). Match the file you are in. TypeScript is strict with `@/*` alias.

## Conventions

| Kind | Convention | Example |
|------|------------|---------|
| Components | PascalCase folder + file, optional co-located `.module.css` and `index.ts` | `src/components/ui/FoundingCircleForm/FoundingCircleForm.tsx` |
| Client islands | Named `<Page>Content.tsx` or descriptive, `"use client"` first line | `src/app/contact/ContactContent.tsx` |
| Hooks | `useX.ts` in `src/hooks`, exported through `index.ts` | `useScrollProgress.ts` |
| Lib modules | kebab-case files, named exports, no default exports | `src/lib/lead-payload.ts` |
| Route handlers | `export async function POST/GET` in `route.ts` | `src/app/api/founding/route.ts` |
| Types | `interface` for object shapes, string-literal unions for enums, label maps alongside | `src/types/sanity.ts` |
| CSS | Tailwind utilities with `--patina-*` tokens; CSS modules for studio page families; global studio rules in `src/app/studio.css` | `LivingStudy.module.css` |
| Analytics | Only via `track()` with a name from `AnalyticsEvents` | `track("founding_circle_signup", {...})` |
| Copy | System strings from `systemMessages`; voice per messaging doc; no fake urgency, testimonials, or AI accuracy claims | `src/lib/copy/system-messages.ts` |
| Scripts/tests | ESM `.mjs`, `node:` imports, `node:test` + `assert/strict` | `tests/server-lifecycle.test.mjs` |
| Comments | Short, explain intent or a constraint; avoid restating code | route files |

## House rules already encoded as live rules

`.claude/live-rules/rules/`: reuse-first implementation, messaging voice, e2e verification, CRAP gate, self-improvement. Read them before large changes; they are injected when relevant.
