import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sendFoundingWelcome } from '../src/lib/emails/founding-welcome';
import { sendDesignerReceived, sendMakerReceived } from '../src/lib/emails/application-received';
import { escapeHtml } from '../src/lib/emails/template';

// Exercise the real email wrapper with an intercepted transport. This script
// never loads .env files or sends mail, and the samples use reserved addresses.
async function main() {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const messages: Array<{ from: string; reply_to: string; subject: string; html: string }> = [];
  process.env.RESEND_API_KEY = 'local-preview-only';
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), 'https://api.resend.com/emails');
    assert.equal(init?.method, 'POST');
    messages.push(JSON.parse(String(init?.body)));
    return Response.json({ id: `local-preview-${messages.length}` });
  };
  try {
    const sample = { email: 'alex@example.test', first_name: 'Alex' };
    assert.equal((await sendFoundingWelcome(sample)).success, true);
    assert.equal((await sendDesignerReceived(sample)).success, true);
    assert.equal((await sendMakerReceived({ email: sample.email, contact_name: 'Alex', brand_name: 'Sample Workshop' })).success, true);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }

  const directory = resolve('docs/launch/living-study/email-review');
  mkdirSync(directory, { recursive: true });
  const audiences = ['Founding Circle', 'Designers', 'Makers'];
  const filenames = ['founding.html', 'designers.html', 'makers.html'];
  const cards = messages.map((message, i) => {
    writeFileSync(resolve(directory, filenames[i]), message.html);
    console.log(JSON.stringify({ audience: audiences[i], from: message.from, replyTo: message.reply_to, subject: message.subject, preview: filenames[i] }));
    return `<section><h2>${audiences[i]}</h2><dl><dt>From</dt><dd>${escapeHtml(message.from)}</dd><dt>Reply to</dt><dd>${escapeHtml(message.reply_to)}</dd><dt>Subject</dt><dd>${escapeHtml(message.subject)}</dd></dl><a href="${filenames[i]}">Open full email ↗</a><iframe title="${audiences[i]} email" src="${filenames[i]}" sandbox></iframe></section>`;
  });
  writeFileSync(resolve(directory, 'index.html'), `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Patina — signup emails from Kody</title>
<style>body{margin:0;padding:clamp(20px,4vw,56px);background:#ede9e4;color:#2c2926;font:16px/1.6 system-ui,sans-serif}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.2}h1{font-size:clamp(30px,4vw,46px);margin-bottom:12px}h2{font-size:27px}header{max-width:700px;margin-bottom:36px}.emails{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:24px}section{background:#faf7f2;padding:24px;border:1px solid #d6cfc5;min-width:0}dl{font-size:14px;display:grid;grid-template-columns:64px 1fr;gap:6px;margin-bottom:18px}dt{color:#655b52}dd{margin:0;overflow-wrap:anywhere}a{color:inherit;text-underline-offset:4px}iframe{display:block;width:100%;height:1060px;border:0;margin-top:22px}</style></head>
<body><header><p>Patina / Email review</p><h1>A welcome from Kody.</h1><p>Three signup emails, rendered from the production templates with sample details. Application acknowledgements confirm receipt; Kody reviews with Leah.</p><p>These are local previews. No messages were sent.</p></header><main class="emails">${cards.join('\n')}</main></body></html>`);
  console.log(`Review: ${resolve(directory, 'index.html')}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
