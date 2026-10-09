import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

function payloadModule(attribution) {
  return loadModule('src/lib/lead-payload.ts', {
    './attribution': { getAttribution: () => attribution, classifyChannel: () => 'organic' },
  });
}

const touch = { utm_source: 'newsletter', utm_medium: 'email', gclid: 'g-1', referrer: 'https://ref.example', timestamp: 1 };

test('buildLeadPayload flattens last-touch attribution and keeps the legacy utm object', () => {
  const { buildLeadPayload } = payloadModule({ first_touch: { ...touch, utm_source: 'first' }, last_touch: touch });
  const payload = buildLeadPayload({ source: 'hero', signupPage: '/', ctaText: 'Join', posthogDistinctId: 'anon', extra: { email: 'a@example.test' } });
  assert.equal(payload.source, 'hero');
  assert.deepEqual(payload.utm, touch);
  assert.equal(payload.utm_source, 'newsletter');
  assert.equal(payload.first_touch_attribution.utm_source, 'first');
  assert.equal(payload.gclid, 'g-1');
  assert.equal(payload.fbclid, null);
  assert.equal(payload.referrer, 'https://ref.example');
  assert.equal(payload.cta_text, 'Join');
  assert.equal(payload.channel, 'organic');
  assert.equal(payload.email, 'a@example.test');
});

test('buildLeadPayload forwards every click id and the first-touch campaign', () => {
  const last = { ...touch, ttclid: 'tt-1', li_fat_id: 'li-1', ref: 'partner-7' };
  const first = { utm_source: 'first-src', utm_medium: 'social', utm_campaign: 'launch', referrer: '', timestamp: 0 };
  const { buildLeadPayload } = payloadModule({ first_touch: first, last_touch: last });
  const payload = buildLeadPayload({ source: 'hero', signupPage: '/', posthogDistinctId: null });
  assert.equal(payload.ttclid, 'tt-1');
  assert.equal(payload.li_fat_id, 'li-1');
  assert.equal(payload.ref, 'partner-7');
  assert.equal(payload.first_touch_utm_source, 'first-src');
  assert.equal(payload.first_touch_utm_medium, 'social');
  assert.equal(payload.first_touch_utm_campaign, 'launch');
  assert.equal(payload.first_touch_attribution, first);
});

test('captureAttribution records TikTok and LinkedIn click ids and a ref code', async () => {
  const store = new Map();
  const registered = [];
  const { captureAttribution, getAttribution } = loadModule('src/lib/attribution.ts', {
    './posthog': { getPostHogClient: () => ({ register: (props) => registered.push(props) }) },
  }, {
    globals: {
      window: { location: { search: '?ttclid=tt-1&li_fat_id=li-1&ref=partner-7&utm_source=tiktok' } },
      document: { referrer: '' },
      localStorage: {
        getItem: (key) => store.get(key) ?? null,
        setItem: (key, value) => store.set(key, value),
        removeItem: (key) => store.delete(key),
      },
      URLSearchParams,
    },
  });
  captureAttribution();
  const { first_touch } = getAttribution();
  assert.equal(first_touch.ttclid, 'tt-1');
  assert.equal(first_touch.li_fat_id, 'li-1');
  assert.equal(first_touch.ref, 'partner-7');
  assert.equal(first_touch.utm_source, 'tiktok');
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(registered[0].utm_source, 'tiktok');
});

test('buildLeadPayload without attribution sends nulls, not undefined strings', () => {
  const { buildLeadPayload } = payloadModule(null);
  const payload = buildLeadPayload({ source: 'footer', signupPage: '/about', posthogDistinctId: null });
  assert.equal(payload.utm, null);
  assert.equal(payload.utm_source, undefined);
  assert.equal(payload.referrer, '');
  assert.equal(payload.first_touch_attribution, null);
  assert.equal(payload.last_touch_attribution, null);
  assert.equal(payload.cta_text, null);
  assert.equal(payload.gclid, null);
  assert.equal(payload.ttclid, null);
  assert.equal(payload.li_fat_id, null);
  assert.equal(payload.ref, null);
  assert.equal(payload.first_touch_utm_source, undefined);
});

test('inferRole reads the surface and page', () => {
  const { inferRole } = payloadModule(null);
  assert.equal(inferRole('designers_page', '/designers'), 'designer');
  assert.equal(inferRole('maker_cta', '/makers/apply'), 'designer');
  assert.equal(inferRole('hero', '/'), 'consumer');
  assert.equal(inferRole('studio_nav', '/founding'), 'consumer');
  assert.equal(inferRole('x', '/press'), 'unknown');
});
