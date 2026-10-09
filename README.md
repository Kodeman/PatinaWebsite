# Patina — The Living Study

Patina’s pre-launch website, built with Next.js 16 and React 19. The Living Study brings together the founder story, designer and maker invitations, and Founding Circle enrollment. Production hosting is configured for Cloudflare Workers through OpenNext.

## Local development

Use Node 24 (`.nvmrc`), install the lockfile with `npm ci`, and copy `.env.example` to `.env.local` with the intended development configuration.

```bash
npm run dev
```

Open http://localhost:3000. Customer-facing copy follows [the messaging system](docs/messaging/patina-messaging-system.md).

## Production build and preview

```bash
npm run build:cloudflare
npm run preview:cloudflare
```

The Workers preview runs at http://localhost:8787. Public build values come from the environment or ignored local env files. Private Workers preview bindings require an ignored `.dev.vars` file; see `.dev.vars.example`. Without test credentials, lead APIs return a retryable unavailable response. Automated tests intercept submissions.

```bash
npm run lint
npm run test:server
npm run test:cloudflare
npx wrangler deploy --dry-run --outdir .wrangler/deploy-check
```

The dry run validates packaging without uploading a Worker. It does not establish production credentials, remote bindings, or mail delivery.

## Deployment

Follow the [Cloudflare deployment runbook](docs/launch/living-study/CLOUDFLARE-DEPLOYMENT.md) for account setup, build configuration, secrets, domain cutover, and rollback. The configured Worker is `patina-website`; custom domains are attached at cutover. `npm run deploy:cloudflare` publishes the existing build and populates its content cache—build first.

The [production handoff](docs/launch/living-study/PRODUCTION-HANDOFF.md) records visual validation, asset credits, and remaining launch decisions. The app and marketplace remain pre-launch.
