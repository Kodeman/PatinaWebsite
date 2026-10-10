import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

const template = loadModule('src/lib/emails/template.ts', {});
const senders = loadModule('src/lib/emails/senders.ts', {});

function withCapturedSend(path) {
  const sent = [];
  const mod = loadModule(path, {
    './send': { sendHtmlEmail: async (options) => { sent.push(options); return { success: true }; } },
    './template': template,
    './senders': senders,
  });
  return { mod, sent };
}

const lead = {
  kind: 'Founding Circle',
  email: 'member@example.test',
  name: 'Ada <Lovelace>',
  distinctId: 'anon/id 1',
  fields: { role: 'consumer', source: 'hero', signup_page: '/founding', channel: null },
  attribution: {
    first_touch_attribution: { utm_source: 'first-src', referrer: 'https://first.example' },
    last_touch_attribution: { utm_source: 'last-src', utm_campaign: 'spring' },
  },
};

test('lead notification goes to kody@ as internal mail that replies to the lead', async () => {
  const { mod, sent } = withCapturedSend('src/lib/emails/lead-notification.ts');
  await mod.sendLeadNotification(lead);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'kody@patina.cloud');
  assert.equal(sent[0].replyTo, 'member@example.test');
  assert.equal(sent[0].subject, 'New Founding Circle signup — Ada <Lovelace>');
  assert.deepEqual(JSON.parse(JSON.stringify(sent[0].tags)), [
    { name: 'source', value: 'lead_notification' },
    { name: 'email_type', value: 'internal' },
  ]);
  await mod.sendLeadNotification({ ...lead, name: null });
  assert.equal(sent[1].subject, 'New Founding Circle signup — member@example.test');
});

test('lead notification body is an escaped key/value table with a PostHog person link', () => {
  const { mod } = withCapturedSend('src/lib/emails/lead-notification.ts');
  const html = mod.leadNotificationEmail(lead);
  assert.match(html, />kind<\/td><td[^>]*>Founding Circle</);
  assert.match(html, />name<\/td><td[^>]*>Ada &lt;Lovelace&gt;</);
  assert.match(html, />signup_page<\/td><td[^>]*>\/founding</);
  assert.match(html, />last-touch utm_campaign<\/td><td[^>]*>spring</);
  assert.match(html, />first-touch utm_source<\/td><td[^>]*>first-src</);
  assert.match(html, />first-touch referrer<\/td><td[^>]*>https:\/\/first.example</);
  assert.doesNotMatch(html, />channel</, 'Empty fields are left out');
  assert.match(html, /href="https:\/\/us\.posthog\.com\/project\/326191\/person\/anon%2Fid%201"/);
  assert.doesNotMatch(html, /Unsubscribe/);
  const fallback = mod.leadNotificationEmail({ ...lead, distinctId: null, attribution: undefined });
  assert.match(fallback, /person\/member%40example\.test"/);
});

test('contact notification reaches both hello@ and kody@', async () => {
  const { mod, sent } = withCapturedSend('src/lib/emails/contact-received.ts');
  await mod.sendContactNotification({ name: 'A', email: 'a@example.test', reason: 'press', message: 'Hi' });
  assert.deepEqual([...sent[0].to], ['hello@patina.cloud', 'kody@patina.cloud']);
  assert.equal(sent[0].replyTo, 'a@example.test');
});

test('lifecycle emails follow the marketing canon: names not titles, Middle West Studio, held words out', async () => {
  const welcome = withCapturedSend('src/lib/emails/founding-welcome.ts');
  const acks = withCapturedSend('src/lib/emails/application-received.ts');
  const newsletter = withCapturedSend('src/lib/emails/newsletter-welcome.ts');
  const contact = withCapturedSend('src/lib/emails/contact-received.ts');
  const confirmation = loadModule('src/app/api/newsletter/confirmation-email.ts', {
    '@/lib/emails/send': { sendHtmlEmail: async () => ({ success: true }) },
    '@/lib/emails/template': template,
    '@/lib/site-url': { SITE_URL: 'https://patina.cloud' },
  }, { globals: { URLSearchParams } });
  const emails = {
    founding: welcome.mod.foundingWelcomeEmail({ first_name: 'Ada' }),
    designer: acks.mod.designerReceivedEmail({ first_name: 'Ada' }),
    maker: acks.mod.makerReceivedEmail({ contact_name: 'Ada', brand_name: 'Oak & Iron' }),
    newsletter: newsletter.mod.newsletterWelcomeEmail({ first_name: 'Ada' }),
    confirm: confirmation.newsletterConfirmationEmail({ email: 'a@example.test', token: 't' }),
    contact: contact.mod.contactAutoReplyEmail({ name: 'Ada' }),
  };
  for (const [kind, html] of Object.entries(emails)) {
    assert.doesNotMatch(html, /co-?founder|Middlewest/i, `${kind}: V4 byline, C01 spelling`);
    assert.doesNotMatch(html, /\bAI\b|algorithm|curated|platform|Where Time Adds Value/i, `${kind}: lexicon`);
    assert.doesNotMatch(html, /\$\d|\bfees?\b|\bpric(e|ing)\b/i, `${kind}: no money language (V2)`);
    assert.doesNotMatch(html, /download|App Store/i, `${kind}: app is pre-launch`);
  }
  for (const kind of ['founding', 'designer', 'newsletter']) assert.match(emails[kind], /Middle West Studio/);
  assert.match(emails.designer, /bring one live project/);
  assert.match(emails.founding, /Warmly,<br\/>Kody<br\/>Patina · Madison, WI<\/p>/);
  for (const kind of ['founding', 'newsletter']) assert.match(emails[kind], /Unsubscribe<\/a>/);

  await acks.mod.sendMakerReceived({ email: 'a@example.test', contact_name: 'Ada', brand_name: 'A very long workshop name, LLC' });
  assert.ok(acks.sent[0].subject.length <= 60, 'canon email subject limit');
});

function sendModule({ key = 'test-key', fetch }) {
  // The test's Error comes from another realm than a VM-loaded errors module, so
  // read its message directly; errors.ts has its own coverage elsewhere.
  return loadModule('src/lib/emails/send.ts', { '@/lib/errors': { errorMessage: (err) => err.message } }, {
    env: key ? { RESEND_API_KEY: key } : {},
    globals: { fetch },
  });
}

test('sendHtmlEmail posts one or many recipients as a list', async () => {
  const bodies = [];
  const { sendHtmlEmail } = sendModule({
    fetch: async (_url, init) => { bodies.push(JSON.parse(init.body)); return Response.json({ id: 'email-1' }); },
  });
  const single = await sendHtmlEmail({ to: 'one@example.test', subject: 's', html: 'h' });
  await sendHtmlEmail({ to: ['one@example.test', 'two@example.test'], subject: 's', html: 'h' });
  assert.equal(single.success, true);
  assert.equal(single.id, 'email-1');
  assert.deepEqual(bodies[0].to, ['one@example.test']);
  assert.deepEqual(bodies[1].to, ['one@example.test', 'two@example.test']);
  assert.equal(bodies[0].from, 'Patina <hello@patina.cloud>');
});

test('sendHtmlEmail reports a missing key, a rejected send, and a network failure', async () => {
  const skipped = await sendModule({ key: null, fetch: async () => assert.fail('must not send') })
    .sendHtmlEmail({ to: 'a@example.test', subject: 's', html: 'h' });
  assert.equal(skipped.success, false);
  const rejected = await sendModule({ fetch: async () => Response.json({ message: 'Bad sender' }, { status: 422 }) })
    .sendHtmlEmail({ to: 'a@example.test', subject: 's', html: 'h' });
  assert.equal(rejected.error, 'Bad sender');
  const unreadable = await sendModule({ fetch: async () => new Response('not json', { status: 500 }) })
    .sendHtmlEmail({ to: 'a@example.test', subject: 's', html: 'h' });
  assert.equal(unreadable.error, 'Resend HTTP 500');
  const offline = await sendModule({ fetch: async () => { throw new Error('offline'); } })
    .sendHtmlEmail({ to: 'a@example.test', subject: 's', html: 'h' });
  assert.equal(offline.error, 'offline');
});
