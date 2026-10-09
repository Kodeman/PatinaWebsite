import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

function sitemapModule(fetchImpl) {
  return loadModule('src/app/sitemap.ts', {
    '@/lib/site-url': { SITE_URL: 'https://patina.example' },
    '../../sanity/lib/client': { sanityFetch: fetchImpl },
    '../../sanity/lib/queries': { journalSitemapQuery: 'query' },
  }).default;
}

test('sitemap keeps public routes when the publishing service fails', async () => {
  const routes = await sitemapModule(async () => { throw new Error('offline'); })();
  assert.equal(routes[0].url, 'https://patina.example');
  assert.ok(routes.every((route) => !route.url.includes('/journal/')));
});

test('sitemap adds journal routes with a parseable last-modified date only', async () => {
  const routes = await sitemapModule(async () => [
    { slug: 'dated', _updatedAt: '2026-09-01T00:00:00Z', publishedAt: '2026-08-01T00:00:00Z' },
    { slug: 'published-only', publishedAt: '2026-08-01T00:00:00Z' },
    { slug: 'bad-date', publishedAt: 'not a date' },
    { slug: '' },
  ])();
  const journal = routes.filter((route) => route.url.includes('/journal/'));
  assert.deepEqual([...journal.map((route) => route.url)], [
    'https://patina.example/journal/dated', 'https://patina.example/journal/published-only', 'https://patina.example/journal/bad-date',
  ]);
  assert.equal(journal[0].lastModified.toISOString(), '2026-09-01T00:00:00.000Z');
  assert.equal(journal[1].lastModified.toISOString(), '2026-08-01T00:00:00.000Z');
  assert.equal(journal[2].lastModified, undefined);
});
