import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadModule } from './helpers/load-module.mjs';

const seo = loadModule('src/lib/seo.ts', {
  '@/lib/site-url': { SITE_URL: 'https://patina.example' },
});

const TAGLINE = /where time adds value/i;

function founders(jsonLd) {
  return jsonLd.founder || jsonLd.mainEntity.founders;
}

test('seo: founders carry names, not titles, and the studio is Middle West Studio', () => {
  for (const jsonLd of [seo.generateOrganizationJsonLd(), seo.generateAboutPageJsonLd()]) {
    const people = founders(jsonLd);
    assert.equal(JSON.stringify(people.map((person) => person.name)), '["Leah Kochaver","Kody Kochaver"]');
    for (const person of people) assert.equal('jobTitle' in person, false);
    const text = JSON.stringify(jsonLd);
    assert.match(text, /Middle West Studio/);
    assert.doesNotMatch(text, /Middlewest Studio|co-?founder/i);
  }
});

test('seo: the held tagline stays in the default title and OG image only', () => {
  const metadata = seo.defaultMetadata;
  assert.match(metadata.title.default, TAGLINE);
  assert.match(metadata.openGraph.images[0].alt, TAGLINE);
  assert.equal(metadata.openGraph.title, 'Patina');
  assert.equal(metadata.twitter.title, 'Patina');
  assert.doesNotMatch(metadata.description, TAGLINE);
  assert.doesNotMatch(JSON.stringify(seo.generateOrganizationJsonLd()), TAGLINE);
});

test('seo: the site description keeps the app pre-launch and drops platform talk', () => {
  const description = seo.defaultMetadata.description;
  assert.match(description, /pre-launch/);
  assert.doesNotMatch(description, /\bplatform\b|\bAI\b|algorithm|curated/i);
  assert.equal(seo.generateOrganizationJsonLd().description, description);
});
