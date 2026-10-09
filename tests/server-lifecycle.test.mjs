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

function handlerHarness(route, {
  configured = true, existing = null, rejectEmail = false, insertError = null, emailResult = { success: true },
  upsertErrors = [], rateLimit = { ok: true },
} = {}) {
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
    upsert: async (row) => { writes.push(row); return { error: upsertErrors.shift() ?? null }; },
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
      checkRateLimit: () => rateLimit,
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
    '@/lib/emails/lead-notification': { sendLeadNotification: send('lead-notification') },
    './confirmation-email': { sendNewsletterConfirmation: send('newsletter-confirmation') },
  };
  // The shared lead-route steps run for real against the same mocks, so their
  // after() callbacks, sends and logs land in this harness.
  dependencies['@/lib/lead-route'] = loadModule('src/lib/lead-route.ts', dependencies, { logs });
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
    // Contact: founders' notice + auto-reply. Every other lead: ack + kody@ notice.
    const expectedSends = 2;
    assert.equal(harness.callbacks.length, expectedSends);
    let finished = false;
    const background = Promise.all(harness.callbacks.map((callback) => callback()))
      .then(() => { finished = true; });
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(harness.sends.length, expectedSends);
    const notices = harness.sends.filter((send) => send.name === 'lead-notification');
    assert.equal(notices.length, route === 'contact' ? 0 : 1, 'Exactly one internal notice per new lead');
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

test('founding: a delivery rejection does not reject the lifecycle callbacks or saved response', async () => {
  const harness = handlerHarness('founding', { rejectEmail: true });
  const response = await harness.handler.POST(postRequest());
  await assert.doesNotReject(Promise.all(harness.callbacks.map((callback) => callback())));
  assert.equal(response.status, 200);
  assert.deepEqual(harness.logs.map((log) => log[1]), [
    '[Founding] Welcome email failed:', '[Founding] Lead notification failed:',
  ]);
});

for (const route of ['founding', 'newsletter', 'designers-apply', 'makers-apply']) {
  test(`${route}: a honeypot hit sends no notification and schedules nothing`, async () => {
    const harness = handlerHarness(route);
    assert.equal((await harness.handler.POST(postRequest({ ...validLead, honeypot: true }))).status, 200);
    assert.equal(harness.callbacks.length, 0);
    assert.deepEqual(harness.sends, []);
    assert.deepEqual(harness.writes, []);
  });
}

const attributedLead = {
  ...validLead, posthog_distinct_id: 'anon-1', channel: 'paid', signup_page: '/founding',
  cta_text: 'Join the circle', company: 'Studio', website: 'https://studio.example', motivation: 'Sourcing',
  description: 'Walnut tables', role: 'consumer',
  first_touch_attribution: { utm_source: 'first-src', referrer: 'https://first.example' },
  last_touch_attribution: { utm_source: 'last-src', utm_campaign: 'spring' },
};

test('lead notifications carry kind, identity, fields and attribution for each route', async () => {
  const expected = {
    founding: { kind: 'Founding Circle', name: 'A', role: 'consumer' },
    newsletter: { kind: 'newsletter (pending confirmation)', name: undefined, role: undefined },
    'designers-apply': { kind: 'designer application', name: 'A Member', role: 'designer' },
    'makers-apply': { kind: 'maker application', name: 'A Maker (Test Workshop)', role: 'maker' },
  };
  for (const [route, want] of Object.entries(expected)) {
    const harness = handlerHarness(route);
    await harness.handler.POST(postRequest(attributedLead));
    harness.delivery.resolve();
    await Promise.all(harness.callbacks.map((callback) => callback()));
    const [notice] = harness.sends.filter((send) => send.name === 'lead-notification');
    assert.equal(notice.payload.kind, want.kind, route);
    assert.equal(notice.payload.email, validLead.email);
    assert.equal(notice.payload.name, want.name, route);
    assert.equal(notice.payload.distinctId, 'anon-1');
    assert.equal(notice.payload.fields.role, want.role, route);
    assert.equal(notice.payload.fields.channel, 'paid', route);
    assert.equal(notice.payload.attribution.first_touch_attribution.utm_source, 'first-src');
  }
});

test('server lead events carry the properties the client events used to', async () => {
  const eventOf = async (route) => {
    const harness = handlerHarness(route);
    await harness.handler.POST(postRequest(attributedLead));
    return harness.events[0];
  };
  const designer = await eventOf('designers-apply');
  assert.equal(designer.event, 'designer_application_submitted');
  assert.equal(designer.properties.has_company, true);
  assert.equal(designer.properties.has_website, true);
  assert.equal(designer.properties.has_motivation, true);
  assert.equal(designer.properties.email_domain, 'example.test');
  const maker = await eventOf('makers-apply');
  assert.equal(maker.event, 'maker_application_submitted');
  assert.equal(maker.properties.has_company, true);
  assert.equal(maker.properties.has_website, true);
  assert.equal(maker.properties.has_motivation, true);
  assert.equal(maker.properties.email_domain, 'example.test');
  const founding = await eventOf('founding');
  assert.equal(founding.event, 'founding_circle_signup');
  assert.equal(founding.properties.cta_text, 'Join the circle');
  assert.equal(founding.properties.email_domain, 'example.test');
  for (const event of [designer, maker, founding]) {
    assert.equal(event.posthogDistinctId, 'anon-1');
    assert.equal(event.attribution.last_touch_attribution.utm_source, 'last-src');
  }
  const bare = handlerHarness('designers-apply');
  await bare.handler.POST(postRequest());
  assert.equal(bare.events[0].properties.has_company, false);
  assert.equal(bare.events[0].properties.has_website, false);
});

test('contact: the server event keys on the forwarded anonymous id and attribution', async () => {
  const harness = handlerHarness('contact');
  await harness.handler.POST(postRequest(attributedLead));
  assert.equal(harness.events[0].event, 'contact_form_submitted');
  assert.equal(harness.events[0].posthogDistinctId, 'anon-1');
  assert.equal(harness.events[0].attribution.first_touch_attribution.utm_source, 'first-src');
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
  assert.equal(Object.hasOwn(events[1].properties, '$set'), false);
  assert.equal(Object.hasOwn(events[1].properties, '$set_once'), false);
});

test('lead analytics keeps first touch once as initial_* and sets last-touch utm_*', () => {
  const events = [];
  const { captureLeadEvent } = loadModule('src/lib/lead-capture.ts', {
    '@/lib/posthog-server': { captureServerEvent: (event) => events.push(event) },
  });
  captureLeadEvent({
    event: 'signup', email: validLead.email, personProps: { role: 'designer' },
    attribution: {
      first_touch_attribution: {
        utm_source: 'first', utm_medium: 'email', utm_campaign: 'launch', utm_content: 'hero',
        utm_term: 'never-initial', referrer: 'https://first.example', timestamp: 1,
      },
      last_touch_attribution: { utm_source: 'last', utm_medium: '', utm_term: 'sofa', referrer: 'https://last.example' },
    },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(events[0].properties.$set_once)), {
    initial_utm_source: 'first', initial_utm_medium: 'email', initial_utm_campaign: 'launch',
    initial_utm_content: 'hero', initial_referrer: 'https://first.example',
  });
  assert.deepEqual(JSON.parse(JSON.stringify(events[0].properties.$set)), {
    role: 'designer', utm_source: 'last', utm_term: 'sofa',
  });
  captureLeadEvent({ event: 'signup', email: validLead.email, attribution: { first_touch_attribution: null } });
  assert.equal(Object.hasOwn(events[1].properties, '$set_once'), false);
});

// Route contract details beyond the lifecycle: rejections, persistence failures,
// row shapes, and the founding phone/consent rules. Each lead route keeps its
// own status codes, bodies and log labels.
const plain = (value) => JSON.parse(JSON.stringify(value));
const logTag = {
  founding: 'Founding', newsletter: 'Newsletter', 'designers-apply': 'DesignerApply',
  'makers-apply': 'MakerApply', contact: 'Contact',
};
const leadRoutes = Object.keys(logTag);

for (const route of leadRoutes) {
  test(`${route}: an unreadable body is an invalid request`, async () => {
    const harness = handlerHarness(route);
    const response = await harness.handler.POST(new Request('https://patina.example/api/test', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'not json',
    }));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'Invalid request' });
    assert.equal(harness.logs.length, 1);
    assert.equal(harness.logs[0][1], `[${logTag[route]}] Request error:`);
  });

  test(`${route}: a rate-limited client gets 429 and nothing is written`, async () => {
    const harness = handlerHarness(route, { rateLimit: { ok: false, retryAfter: 30 } });
    const response = await harness.handler.POST(postRequest());
    assert.equal(response.status, 429);
    assert.deepEqual(await response.json(), { error: 'Too many requests' });
    assert.equal(response.headers.get('Retry-After'), route === 'founding' ? null : '30');
    assert.deepEqual(harness.writes, []);
  });

  test(`${route}: an invalid email is rejected before persistence`, async () => {
    const harness = handlerHarness(route);
    const response = await harness.handler.POST(postRequest({ ...validLead, email: 'not-an-email' }));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'Valid email is required' });
    assert.deepEqual(harness.writes, []);
  });
}

test('makers-apply: validation runs before the rate limit', async () => {
  const harness = handlerHarness('makers-apply', { rateLimit: { ok: false, retryAfter: 30 } });
  const response = await harness.handler.POST(postRequest({ ...validLead, email: '' }));
  assert.equal(response.status, 400);
});

const missingField = [
  ['founding', { source: '' }, 'Source is required'],
  ['founding', { phone: '12345' }, copy.systemMessages.signup.invalidPhone],
  ['founding', { phone: 6085550100 }, copy.systemMessages.signup.invalidPhone],
  ['designers-apply', { last_name: '' }, 'First and last name are required'],
  ['makers-apply', { brand_name: '' }, 'Brand name and contact name are required'],
  ['contact', { name: '   ' }, 'Name is required'],
  ['contact', { message: '' }, 'A message is required'],
];
for (const [route, patch, error] of missingField) {
  test(`${route}: ${JSON.stringify(patch)} is rejected with "${error}"`, async () => {
    const harness = handlerHarness(route);
    const response = await harness.handler.POST(postRequest({ ...validLead, ...patch }));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error });
    assert.deepEqual(harness.writes, []);
  });
}

for (const [route, failure, error] of [
  ['designers-apply', { insertError: { code: 'XX000', message: 'boom' } }, 'Failed to save application'],
  ['makers-apply', { insertError: { code: 'XX000', message: 'boom' } }, 'Failed to save application'],
  ['newsletter', { upsertErrors: [{ code: 'XX000', message: 'boom' }] }, 'Failed to save signup'],
  ['founding', { upsertErrors: [{ code: 'XX000', message: 'boom' }] }, 'Failed to save signup'],
]) {
  test(`${route}: a persistence error returns 500 and schedules nothing`, async () => {
    const harness = handlerHarness(route, failure);
    const response = await harness.handler.POST(postRequest(attributedLead));
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error });
    assert.equal(harness.callbacks.length, 0);
    assert.equal(harness.logs[0][1], `[${logTag[route]}] Supabase error:`);
    const logged = JSON.parse(harness.logs[0][2]);
    assert.equal(logged.code, 'XX000');
    assert.equal(logged.message, 'boom');
    if (route !== 'founding') {
      assert.deepEqual(Object.keys(logged), ['code', 'message']);
      assert.deepEqual(harness.events, []);
      return;
    }
    assert.equal(logged.email_domain, 'example.test');
    assert.equal(logged.source, 'lifecycle-test');
    assert.equal(harness.events.length, 1);
    assert.deepEqual(plain(harness.events[0]), {
      distinctId: 'anon-1', event: 'founding_signup_error', properties: {
        error_code: 'XX000', error_message: 'boom', source: 'lifecycle-test', signup_page: '/founding',
      },
    });
  });
}

for (const route of ['designers-apply', 'makers-apply', 'newsletter', 'contact']) {
  test(`${route}: delivery rejections are logged, not raised`, async () => {
    const harness = handlerHarness(route, { rejectEmail: true });
    assert.equal((await harness.handler.POST(postRequest())).status, 200);
    await assert.doesNotReject(Promise.all(harness.callbacks.map((callback) => callback())));
    const expected = {
      'designers-apply': ['[DesignerApply] Ack email failed:', '[DesignerApply] Lead notification failed:'],
      'makers-apply': ['[MakerApply] Ack email failed:', '[MakerApply] Lead notification failed:'],
      newsletter: ['[Newsletter] Confirmation email failed:', '[Newsletter] Lead notification failed:'],
      contact: ['[Contact] Notification email failed', '[Contact] Auto-reply email failed:'],
    }[route];
    assert.deepEqual(harness.logs.map((log) => log[1]).sort(), [...expected].sort());
  });
}

test('contact: a saved note whose notice is not accepted logs it and still succeeds', async () => {
  const harness = handlerHarness('contact', { emailResult: { success: false } });
  harness.delivery.resolve();
  assert.equal((await harness.handler.POST(postRequest())).status, 200);
  await Promise.all(harness.callbacks.map((callback) => callback()));
  assert.deepEqual(harness.logs.map((log) => log[1]), ['[Contact] Notification email was not accepted']);
});

test('contact: the saved row and event carry the trimmed note', async () => {
  const harness = handlerHarness('contact');
  await harness.handler.POST(postRequest({
    ...attributedLead, email: 'Member@Example.TEST', name: '  A Member ', message: ' Hello ', reason: ' trade ',
  }));
  assert.deepEqual(plain(harness.writes[0]), {
    name: 'A Member', email: 'member@example.test', reason: 'trade', message: 'Hello',
    posthog_distinct_id: 'anon-1', user_agent: null,
  });
  assert.equal(harness.events[0].properties.reason, 'trade');
  assert.equal(harness.events[0].properties.email_domain, 'example.test');
  const bare = handlerHarness('contact');
  await bare.handler.POST(postRequest());
  assert.equal(bare.writes[0].reason, 'general');
  assert.equal(bare.writes[0].posthog_distinct_id, null);
});

test('designers-apply and makers-apply rows carry the lead attribution snapshot', async () => {
  const lead = { ...attributedLead, utm_source: 'news', gclid: 'g-1', location: 'Madison' };
  const designer = handlerHarness('designers-apply');
  await designer.handler.POST(postRequest(lead));
  const maker = handlerHarness('makers-apply');
  await maker.handler.POST(postRequest(lead));
  const attribution = {
    utm_source: 'news', utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null,
    referrer: null, gclid: 'g-1', fbclid: null, channel: 'paid',
    first_touch: lead.first_touch_attribution, last_touch: lead.last_touch_attribution,
  };
  assert.deepEqual(plain(designer.writes[0]), {
    first_name: 'A', last_name: 'Member', email: 'member@example.test', company: 'Studio', location: 'Madison',
    website: 'https://studio.example', motivation: 'Sourcing', sourcing_process: null, referral_source: null,
    lead_attribution: attribution, posthog_distinct_id: 'anon-1',
  });
  assert.deepEqual(plain(maker.writes[0]), {
    brand_name: 'Test Workshop', contact_name: 'A Maker', email: 'member@example.test', location: 'Madison',
    website: 'https://studio.example', description: 'Walnut tables', materials: null, trade_program: null,
    referral_source: null, lead_attribution: attribution, posthog_distinct_id: 'anon-1',
  });
  assert.deepEqual(plain(designer.events[0].properties), {
    company: 'Studio', has_company: true, has_website: true, has_motivation: true,
    email_domain: 'example.test', referral_source: null,
  });
  assert.deepEqual(plain(maker.events[0].properties), {
    brand_name: 'Test Workshop', has_company: true, has_website: true, has_motivation: true,
    email_domain: 'example.test',
  });
  for (const harness of [designer, maker]) {
    harness.delivery.resolve();
    await Promise.all(harness.callbacks.map((callback) => callback()));
  }
  assert.deepEqual(plain(designer.sends[0].payload), { email: 'member@example.test', first_name: 'A', last_name: 'Member' });
  assert.deepEqual(plain(maker.sends[0].payload), { email: 'member@example.test', brand_name: 'Test Workshop', contact_name: 'A Maker' });
});

test('newsletter: flat utm keys win over the legacy nested object, which still fills gaps', async () => {
  const harness = handlerHarness('newsletter');
  await harness.handler.POST(postRequest({
    ...attributedLead, source: undefined, utm_source: 'flat',
    utm: { utm_source: 'nested', utm_medium: 'nested-medium', referrer: 'https://nested.example' },
  }));
  assert.deepEqual(plain(harness.writes[0]), {
    email: 'member@example.test', source: 'website', signup_page: '/founding',
    utm_source: 'flat', utm_medium: 'nested-medium', utm_campaign: null, utm_content: null, utm_term: null,
    referrer: 'https://nested.example', user_agent: null,
    lead_attribution: { first_touch: attributedLead.first_touch_attribution, last_touch: attributedLead.last_touch_attribution },
    posthog_distinct_id: 'anon-1', confirmed: false, confirmation_token: 'test-confirmation-token',
  });
  assert.deepEqual(plain(harness.events[0].properties), {
    email_domain: 'example.test', signup_page: '/founding',
    utm_source: 'flat', utm_medium: 'nested-medium', utm_campaign: null,
  });
  harness.delivery.resolve();
  await Promise.all(harness.callbacks.map((callback) => callback()));
  assert.deepEqual(plain(harness.sends[0].payload), { email: 'member@example.test', token: 'test-confirmation-token' });
  const bare = handlerHarness('newsletter');
  await bare.handler.POST(postRequest());
  assert.deepEqual(plain(bare.writes[0].lead_attribution), {});
  assert.equal(bare.writes[0].utm_source, null);
  assert.equal(bare.writes[0].posthog_distinct_id, null);
});

test('founding: the waitlist row maps nested utm, defaults and preferred styles', async () => {
  const harness = handlerHarness('founding');
  await harness.handler.POST(postRequest({
    ...attributedLead, role: undefined, preferred_styles: ['mid-century'], gclid: 'g-1',
    utm: { utm_source: 'news', utm_campaign: 'fall', referrer: 'https://ref.example' },
  }));
  assert.deepEqual(plain(harness.writes[0]), {
    email: 'member@example.test', source: 'lifecycle-test', signup_page: '/founding', cta_text: 'Join the circle',
    utm_source: 'news', utm_medium: null, utm_campaign: 'fall', utm_content: null, utm_term: null,
    referrer: 'https://ref.example', role: 'unknown', gclid: 'g-1', fbclid: null, channel: 'paid',
    posthog_distinct_id: 'anon-1',
    first_touch_attribution: { ...attributedLead.first_touch_attribution, preferred_styles: ['mid-century'] },
    last_touch_attribution: attributedLead.last_touch_attribution, user_agent: null,
  });
  assert.deepEqual(plain(harness.events[0]).properties, {
    source: 'lifecycle-test', signup_page: '/founding', cta_text: 'Join the circle', email_domain: 'example.test',
    has_utm: true, channel: 'paid', sms_consent: false,
  });
  assert.deepEqual(plain(harness.events[0].personProps), { email: 'member@example.test', role: 'unknown', founding_source: 'lifecycle-test' });
  harness.delivery.resolve();
  await Promise.all(harness.callbacks.map((callback) => callback()));
  assert.deepEqual(plain(harness.sends[0].payload), { email: 'member@example.test', first_name: 'A' });
  assert.deepEqual(plain(harness.sends[1].payload.fields), { role: 'unknown', source: 'lifecycle-test', signup_page: '/founding', channel: 'paid' });
  const bare = handlerHarness('founding');
  await bare.handler.POST(postRequest());
  assert.deepEqual(plain(bare.writes[0].first_touch_attribution), {});
  assert.equal(bare.writes[0].last_touch_attribution, null);
  assert.equal(bare.events[0].properties.has_utm, false);
});

const phoneCases = [
  { name: 'a US number with consent records the number and consent', lead: { phone: '(608) 555-0100', sms_consent: true },
    phone: '+16085550100', consent: true },
  { name: 'an international number keeps its country code', lead: { phone: '+44 20 7946 0958' }, phone: '+442079460958', consent: false },
  { name: 'a blank number is no number', lead: { phone: '   ', sms_consent: true }, phone: undefined, consent: false },
  { name: 'consent without a number records no consent', lead: { sms_consent: true }, phone: undefined, consent: false },
  { name: 'a different stored number is not overwritten without consent',
    existing: { email: validLead.email, phone: '+16085550199' }, lead: { phone: '6085550100' }, phone: undefined, consent: false },
  { name: 'the same stored number is restated',
    existing: { email: validLead.email, phone: '+16085550100' }, lead: { phone: '6085550100' }, phone: '+16085550100', consent: false },
  { name: 'an empty stored number is filled',
    existing: { email: validLead.email, phone: null }, lead: { phone: '6085550100' }, phone: '+16085550100', consent: false },
  { name: 'consent replaces a different stored number',
    existing: { email: validLead.email, phone: '+16085550199' }, lead: { phone: '6085550100', sms_consent: true },
    phone: '+16085550100', consent: true },
];
for (const phoneCase of phoneCases) {
  test(`founding phone: ${phoneCase.name}`, async () => {
    const harness = handlerHarness('founding', { existing: phoneCase.existing ?? null });
    const response = await harness.handler.POST(postRequest({ ...validLead, ...phoneCase.lead }));
    assert.equal(response.status, 200);
    assert.equal(harness.writes.length, 1);
    const [row] = harness.writes;
    assert.equal(row.phone, phoneCase.phone);
    assert.equal(Object.hasOwn(row, 'phone'), phoneCase.phone !== undefined);
    assert.equal(row.sms_consent, phoneCase.consent ? true : undefined);
    assert.equal(Object.hasOwn(row, 'sms_consent_at'), phoneCase.consent);
    if (phoneCase.consent) assert.equal(row.sms_consent_text, copy.SMS_CONSENT_TEXT);
    assert.equal(harness.events[0].properties.sms_consent, phoneCase.consent);
  });
}

for (const code of ['PGRST204', '42703']) {
  test(`founding phone: missing consent columns (${code}) retry once without consent`, async () => {
    const harness = handlerHarness('founding', { upsertErrors: [{ code, message: 'column missing' }] });
    const response = await harness.handler.POST(postRequest({ ...validLead, phone: '6085550100', sms_consent: true }));
    assert.equal(response.status, 200);
    assert.equal(harness.writes.length, 2);
    assert.equal(harness.writes[0].sms_consent, true);
    assert.equal(Object.hasOwn(harness.writes[1], 'sms_consent'), false);
    assert.equal(harness.writes[1].phone, '+16085550100');
    assert.equal(harness.logs[0][0], 'warn');
    assert.match(harness.logs[0][1], /migration 00433_waitlist_sms_consent\.sql is pending/);
    assert.equal(harness.events[0].properties.sms_consent, false);
  });
}

test('founding phone: a missing-column error without consent is a save failure, not a retry', async () => {
  const harness = handlerHarness('founding', { upsertErrors: [{ code: 'PGRST204', message: 'column missing' }] });
  const response = await harness.handler.POST(postRequest({ ...validLead, phone: '6085550100' }));
  assert.equal(response.status, 500);
  assert.equal(harness.writes.length, 1);
});

test('founding phone: a failed retry is a save failure', async () => {
  const harness = handlerHarness('founding', {
    upsertErrors: [{ code: 'PGRST204', message: 'column missing' }, { code: 'XX000', message: 'boom' }],
  });
  const response = await harness.handler.POST(postRequest({ ...validLead, phone: '6085550100', sms_consent: true }));
  assert.equal(response.status, 500);
  assert.equal(harness.writes.length, 2);
  assert.equal(harness.events[0].event, 'founding_signup_error');
  assert.equal(harness.events[0].distinctId, validLead.email);
});
