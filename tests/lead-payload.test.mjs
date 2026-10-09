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
});

test('inferRole reads the surface and page', () => {
  const { inferRole } = payloadModule(null);
  assert.equal(inferRole('designers_page', '/designers'), 'designer');
  assert.equal(inferRole('maker_cta', '/makers/apply'), 'designer');
  assert.equal(inferRole('hero', '/'), 'consumer');
  assert.equal(inferRole('studio_nav', '/founding'), 'consumer');
  assert.equal(inferRole('x', '/press'), 'unknown');
});
