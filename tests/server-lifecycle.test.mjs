import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

const nextResponse = {
  json: (body, init) => Response.json(body, init),
  redirect: (url) => Response.redirect(url, 307),
};
const copy = loadModule('src/lib/copy/system-messages.ts', {});
const errors = loadModule('src/lib/errors.ts', {});

function handlerHarness(route, { configured = true, existing = null, rejectEmail = false, insertError = null, emailResult = { success: true } } = {}) {
  const callbacks = [];
  const sends = [];
  const events = [];
  const writes = [];
  const logs = [];
  const delivery = deferred();
  const send = (name) => async (payload) => {
    sends.push({ name, payload });
    if (rejectEmail) throw new Error('Simulated delivery failure');
    await delivery.promise;
    return emailResult;
  };
  const query = {
    select() { return this; },
    eq() { return this; },
    maybeSingle: async () => ({ data: existing, error: null }),
    upsert: async (row) => { writes.push(row); return { error: null }; },
    insert: async (row) => { writes.push(row); return { error: insertError }; },
    update(row) { writes.push(row); return this; },
    then(resolve) { return Promise.resolve({ error: null }).then(resolve); },
  };
  const dependencies = {
    'next/server': { after: (callback) => callbacks.push(callback), NextResponse: nextResponse },
    'node:crypto': { randomUUID: () => 'test-confirmation-token' },
    '@/lib/supabase': { supabaseAdmin: configured ? { from: () => query } : null },
    '@/lib/copy/system-messages': copy,
    '@/lib/errors': errors,
    '@/lib/rate-limit': {
      isHoneypotTripped: (body) => body.honeypot === true,
      checkRateLimit: () => ({ ok: true }),
      getClientIp: () => '127.0.0.1',
    },
    '@/lib/site-url': { SITE_URL: 'https://patina.example' },
    '@/lib/lead-capture': { captureLeadEvent: (event) => events.push(event) },
    '@/lib/posthog-server': { captureServerEvent: (event) => events.push(event) },
    '@/lib/emails/founding-welcome': { sendFoundingWelcome: send('founding') },
    '@/lib/emails/application-received': {
      sendDesignerReceived: send('designer'), sendMakerReceived: send('maker'),
    },
    '@/lib/emails/contact-received': {
      sendContactNotification: send('contact-notification'),
      sendContactAutoReply: send('contact-reply'),
    },
    '@/lib/emails/newsletter-welcome': { sendNewsletterWelcome: send('newsletter-welcome') },
    './confirmation-email': { sendNewsletterConfirmation: send('newsletter-confirmation') },
  };
  const handler = loadModule(`src/app/api/${route}/route.ts`, dependencies, { logs });
  return { handler, callbacks, sends, events, writes, logs, delivery };
}

const validLead = {
  email: 'member@example.test', source: 'lifecycle-test', first_name: 'A', last_name: 'Member',
  brand_name: 'Test Workshop', contact_name: 'A Maker', name: 'A Member', message: 'Test note',
};
function postRequest(body = validLead) {
  return new Request('https://patina.example/api/test', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
}

for (const route of ['founding', 'contact', 'designers-apply', 'makers-apply', 'newsletter']) {
  test(`${route}: missing persistence returns retryable 503 without logging or scheduling the lead`, async () => {
    const harness = handlerHarness(route, { configured: false });
    const response = await harness.handler.POST(postRequest());
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('Retry-After'), '60');
    assert.deepEqual(await response.json(), { error: copy.systemMessages.errors.generic });
    assert.deepEqual(harness.logs, []);
    assert.deepEqual(harness.callbacks, []);
    assert.deepEqual(harness.events, []);
    assert.deepEqual(harness.sends, []);
  });

  test(`${route}: saved response precedes email and the scheduled callback awaits delivery`, async () => {
    const harness = handlerHarness(route);
    const response = await harness.handler.POST(postRequest());
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(harness.writes.length, 1);
    assert.deepEqual(harness.sends, []);
    const expectedSends = route === 'contact' ? 2 : 1;
    assert.equal(harness.callbacks.length, expectedSends);
    let finished = false;
    const background = Promise.all(harness.callbacks.map((callback) => callback()))
      .then(() => { finished = true; });
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(harness.sends.length, expectedSends);
    assert.equal(finished, false, 'The lifecycle promise must stay pending during delivery');
    harness.delivery.resolve();
    await background;
    assert.equal(finished, true);
  });
}

test('contact: a failed insert waits for notification acceptance before confirming receipt', async () => {
  const harness = handlerHarness('contact', { insertError: { code: 'PGRST205', message: 'Table missing' } });
  let finished = false;
  const pending = harness.handler.POST(postRequest()).then(response => { finished = true; return response; });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(finished, false);
  assert.deepEqual(harness.sends.map(send => send.name), ['contact-notification']);
  assert.equal(harness.callbacks.length, 0);
  harness.delivery.resolve();
  const response = await pending;
  assert.equal(response.status, 200);
  assert.equal(harness.callbacks.length, 1, 'Only the acknowledgement remains deferred');
  await harness.callbacks[0]();
  assert.deepEqual(harness.sends.map(send => send.name), ['contact-notification', 'contact-reply']);
});

for (const failure of ['rejected', 'thrown']) {
  test(`contact: failed persistence and ${failure} notification returns retryable failure without an acknowledgement`, async () => {
    const harness = handlerHarness('contact', {
      insertError: { code: 'PGRST205', message: 'Table missing' },
      emailResult: { success: false, error: 'Delivery unavailable' },
      rejectEmail: failure === 'thrown',
    });
    harness.delivery.resolve();
    const response = await harness.handler.POST(postRequest());
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('Retry-After'), '60');
    assert.deepEqual(await response.json(), { error: copy.systemMessages.errors.generic });
    assert.equal(harness.callbacks.length, 0);
    assert.equal(harness.events.length, 0);
    assert.deepEqual(harness.sends.map(send => send.name), ['contact-notification']);
  });
}

test('founding: repeat signup does not schedule another first letter', async () => {
  const harness = handlerHarness('founding', { existing: { email: validLead.email, phone: null } });
  assert.equal((await harness.handler.POST(postRequest())).status, 200);
  assert.equal(harness.writes.length, 1);
  assert.equal(harness.callbacks.length, 0);
});

test('founding: a delivery rejection does not reject the lifecycle callback or saved response', async () => {
  const harness = handlerHarness('founding', { rejectEmail: true });
  const response = await harness.handler.POST(postRequest());
  await assert.doesNotReject(harness.callbacks[0]());
  assert.equal(response.status, 200);
  assert.equal(harness.logs.length, 1);
});

test('honeypot and invalid submissions schedule no mail even with missing persistence', async () => {
  const harness = handlerHarness('founding', { configured: false });
  assert.equal((await harness.handler.POST(postRequest({ ...validLead, honeypot: true }))).status, 200);
  assert.equal((await harness.handler.POST(postRequest({ ...validLead, email: 'invalid' }))).status, 400);
  assert.equal(harness.callbacks.length, 0);
});

const confirmationRequest = () => new Request(
  'https://patina.example/api/newsletter/confirm?email=member%40example.test&token=test-token',
);

test('newsletter confirmation: missing persistence does not claim confirmation', async () => {
  const harness = handlerHarness('newsletter/confirm', { configured: false });
  const response = await harness.handler.GET(confirmationRequest());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('Location'), null);
  assert.equal(response.headers.get('Retry-After'), '60');
  assert.deepEqual(await response.json(), { error: copy.systemMessages.newsletter.confirmError });
  assert.equal(harness.logs.length, 0);
  assert.equal(harness.callbacks.length, 0);
});

test('newsletter confirmation: fresh confirmation schedules welcome after the redirect', async () => {
  const harness = handlerHarness('newsletter/confirm', {
    existing: { email: validLead.email, confirmed: false, source: 'test' },
  });
  const response = await harness.handler.GET(confirmationRequest());
  assert.equal(response.status, 307);
  assert.match(response.headers.get('Location'), /newsletter=confirmed$/);
  assert.equal(harness.writes.length, 1);
  assert.equal(harness.callbacks.length, 1);
  assert.equal(harness.sends.length, 0);
  const background = harness.callbacks[0]();
  harness.delivery.resolve();
  await background;
  assert.equal(harness.sends[0].name, 'newsletter-welcome');
});

test('founding count: missing persistence is unavailable, not a fabricated count', async () => {
  const harness = handlerHarness('founding/count', { configured: false });
  const response = await harness.handler.GET();
  assert.equal(response.status, 503);
  assert.equal(Object.hasOwn(await response.json(), 'count'), false);
});

for (const failure of ['rejected credentials', 'missing count', 'network failure']) {
  test(`founding count: ${failure} returns unavailable and never caches a fabricated zero`, async () => {
    const handler = loadModule('src/app/api/founding/count/route.ts', {
      'next/server': { NextResponse: nextResponse },
      '@/lib/copy/system-messages': copy,
      '@/lib/supabase': { supabaseAdmin: { from: () => ({ select: async () => {
        if (failure === 'network failure') throw new Error('Network unavailable');
        return { count: null, error: failure === 'rejected credentials' ? { message: 'Invalid API key' } : null };
      } }) } },
    });
    const response = await handler.GET();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Retry-After'), '60');
    assert.equal(Object.hasOwn(await response.json(), 'count'), false);
  });
}

test('founding count: a verified empty database still returns zero successfully', async () => {
  const handler = loadModule('src/app/api/founding/count/route.ts', {
    'next/server': { NextResponse: nextResponse },
    '@/lib/copy/system-messages': copy,
    '@/lib/supabase': { supabaseAdmin: { from: () => ({ select: async () => ({ count: 0, error: null }) }) } },
  });
  const response = await handler.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { count: 0 });
});

test('server analytics: after owns the immediate capture promise and isolates failure', async () => {
  const callbacks = [];
  const captures = [];
  const delivery = deferred();
  let reject = false;
  class FakePostHog {
    async captureImmediate(event) {
      captures.push(event);
      if (reject) throw new Error('Simulated analytics failure');
      await delivery.promise;
    }
  }
  const { captureServerEvent } = loadModule('src/lib/posthog-server.ts', {
    'next/server': { after: (callback) => callbacks.push(callback) },
    'posthog-node': { PostHog: FakePostHog },
  }, { env: { NEXT_PUBLIC_POSTHOG_KEY: 'test-only' } });
  captureServerEvent({ distinctId: 'anonymous-test-id', event: 'test_event' });
  assert.equal(captures.length, 0);
  let finished = false;
  const background = callbacks[0]().then(() => { finished = true; });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(captures.length, 1);
  assert.equal(finished, false);
  delivery.resolve();
  await background;
  reject = true;
  captureServerEvent({ distinctId: 'anonymous-test-id', event: 'test_failure' });
  await assert.doesNotReject(callbacks[1]());
});

test('lead analytics retains anonymous identity, attribution and person properties', () => {
  const events = [];
  const { captureLeadEvent } = loadModule('src/lib/lead-capture.ts', {
    '@/lib/posthog-server': { captureServerEvent: (event) => events.push(event) },
  });
  captureLeadEvent({ event: 'signup', email: validLead.email, posthogDistinctId: 'anonymous-id',
    properties: { source: 'test', sms_consent: false }, personProps: { role: 'consumer' } });
  assert.deepEqual(JSON.parse(JSON.stringify(events[0])), {
    distinctId: 'anonymous-id', event: 'signup', properties: {
      surface: 'marketing-web', source: 'test', sms_consent: false, $set: { role: 'consumer' },
    },
  });
  captureLeadEvent({ event: 'signup', email: validLead.email });
  assert.equal(events[1].distinctId, validLead.email);
});
