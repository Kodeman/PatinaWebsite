import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

const { getClientIp, checkRateLimit, isHoneypotTripped } = loadModule('src/lib/rate-limit.ts', {});
const request = (headers) => ({ headers: new Headers(headers) });

test('getClientIp prefers the Cloudflare header, then the first forwarded hop', () => {
  assert.equal(getClientIp(request({ 'cf-connecting-ip': ' 203.0.113.9 ', 'x-forwarded-for': '198.51.100.1' })), '203.0.113.9');
  assert.equal(getClientIp(request({ 'x-forwarded-for': '198.51.100.1, 10.0.0.1' })), '198.51.100.1');
  assert.equal(getClientIp(request({ 'x-forwarded-for': ' , 10.0.0.1' })), 'unknown');
  assert.equal(getClientIp(request({})), 'unknown');
});

test('checkRateLimit allows the window then reports whole seconds until reset', () => {
  const key = `test:${Date.now()}`;
  for (let i = 0; i < 2; i += 1) assert.equal(checkRateLimit(key, { limit: 2, windowMs: 60_000 }).ok, true);
  const limited = checkRateLimit(key, { limit: 2, windowMs: 60_000 });
  assert.equal(limited.ok, false);
  assert.ok(limited.retryAfter >= 59 && limited.retryAfter <= 60);
});

test('isHoneypotTripped only fires on a non-blank string', () => {
  assert.equal(isHoneypotTripped({ company_url: 'http://spam.example' }), true);
  assert.equal(isHoneypotTripped({ company_url: '   ' }), false);
  assert.equal(isHoneypotTripped({ company_url: 1 }), false);
  assert.equal(isHoneypotTripped({ other: 'x' }, 'other'), true);
});
