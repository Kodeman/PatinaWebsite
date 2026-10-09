import assert from 'node:assert/strict';
import test from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

// A fresh fake posthog-js per load, recording every call the module makes.
function setup({ consent = null, dnt = null, env = {}, window = true } = {}) {
  const calls = [];
  const stored = new Map(consent ? [['patina_analytics_consent', consent]] : []);
  const fake = {
    __loaded: false,
    init(key, config) { calls.push(['init', key, config]); this.__loaded = true; },
    register(props) { calls.push(['register', props]); },
    opt_in_capturing() { calls.push(['opt_in_capturing']); },
    opt_out_capturing() { calls.push(['opt_out_capturing']); },
  };
  const globals = window ? {
    window: {},
    navigator: { doNotTrack: dnt },
    localStorage: {
      getItem: (k) => stored.get(k) ?? null,
      setItem: (k, v) => stored.set(k, v),
    },
  } : {};
  const mod = loadModule('src/lib/posthog.ts', { 'posthog-js': { default: fake } }, {
    env: { NEXT_PUBLIC_POSTHOG_KEY: 'phc_test', NODE_ENV: 'production', ...env },
    globals,
  });
  return { mod, fake, calls, stored };
}

test('posthog: no consent choice starts in cookieless on_reject capture with autocapture', () => {
  const { mod, fake, calls } = setup();
  assert.equal(mod.getPostHogClient(), fake);
  const [name, key, config] = calls[0];
  assert.equal(name, 'init');
  assert.equal(key, 'phc_test');
  assert.equal(config.cookieless_mode, 'on_reject');
  assert.equal(config.opt_out_capturing_by_default, true);
  assert.equal(config.autocapture, true);
  assert.equal(config.capture_dead_clicks, true);
  assert.equal(config.enable_heatmaps, true);
  assert.equal(config.capture_pageleave, true);
  assert.equal(config.respect_dnt, true);
  assert.equal(config.persistence, 'localStorage+cookie');
  assert.equal(calls[1][0], 'register');
  assert.equal(calls[1][1].surface, 'marketing-web');
  assert.equal(calls.length, 2, 'no opt-in without consent');
});

test('posthog: stored consent opts back in to full persistence', () => {
  const { mod, calls } = setup({ consent: 'granted' });
  mod.getPostHogClient();
  assert.equal(calls[0][2].opt_out_capturing_by_default, false);
  assert.equal(calls.at(-1)[0], 'opt_in_capturing');
});

test('posthog: initialises once across calls', () => {
  const { mod, calls } = setup();
  mod.getPostHogClient();
  mod.getPostHogClient();
  assert.equal(calls.filter(([n]) => n === 'init').length, 1);
});

test('posthog: Do Not Track loads nothing at all', () => {
  const { mod, calls } = setup({ dnt: '1' });
  assert.equal(mod.getPostHogClient(), null);
  assert.equal(calls.length, 0);
});

test('posthog: no key, server render, or dev without opt-in returns null', () => {
  for (const options of [
    { env: { NEXT_PUBLIC_POSTHOG_KEY: '' } },
    { window: false },
    { env: { NODE_ENV: 'development' } },
  ]) {
    const { mod, calls } = setup(options);
    assert.equal(mod.getPostHogClient(), null);
    assert.equal(calls.length, 0);
  }
});

test('posthog: dev with explicit opt-in initialises', () => {
  const { mod, calls } = setup({ env: { NODE_ENV: 'development', NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV: 'true' } });
  assert.notEqual(mod.getPostHogClient(), null);
  assert.equal(calls[0][0], 'init');
});

test('posthog: setConsent stores the choice and flips capture mode', () => {
  const { mod, calls, stored } = setup();
  mod.setConsent('denied');
  assert.equal(stored.get('patina_analytics_consent'), 'denied');
  assert.equal(calls.at(-1)[0], 'opt_out_capturing');
  mod.setConsent('granted');
  assert.equal(mod.getConsent(), 'granted');
  assert.equal(calls.at(-1)[0], 'opt_in_capturing');
});
