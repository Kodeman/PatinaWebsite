/** Render local launch artifacts. Uses the repository's installed Playwright. */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const review = join(root, 'review');
await mkdir(review, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 920 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
await page.goto(pathToFileURL(join(root, 'launch-book.html')).href);
await page.evaluate(() => document.fonts.ready);
const imageFailures = await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')));
const sheets = page.locator('.sheet');
await sheets.nth(0).screenshot({ path: join(review, 'launch-book-cover.png') });
await sheets.nth(6).screenshot({ path: join(review, 'launch-book-artwork.png') });

await page.emulateMedia({ media: 'print' });
const printLayout = await sheets.evaluateAll(nodes => nodes.map(node => {
  const box = node.getBoundingClientRect();
  const footer = node.querySelector('footer').getBoundingClientRect();
  const clipped = [];
  for (const child of node.querySelectorAll('p,h1,h2,h3,td,th,a,li,aside,figcaption')) {
    if (child.closest('footer')) continue;
    const r = child.getBoundingClientRect();
    if (r.bottom > footer.top - 6 || r.right > box.right + 1 || r.left < box.left - 1) {
      clipped.push({ text: child.textContent.trim().slice(0,90), bottom: Math.round(r.bottom-box.top), footer: Math.round(footer.top-box.top) });
    }
  }
  return { id: node.id, width: Math.round(box.width), height: Math.round(box.height), clipped };
}));
await page.pdf({ path: join(root, 'Patina-Launch-Book.pdf'), preferCSSPageSize: true, printBackground: true });

await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
await page.setViewportSize({ width: 390, height: 844 });
await page.reload();
await page.evaluate(() => document.fonts.ready);
const mobile = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth }));
await page.screenshot({ path: join(review, 'launch-book-mobile.png') });

await page.setViewportSize({ width: 1200, height: 900 });
await page.goto(pathToFileURL(join(root, 'press/media-background.html')).href);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(root, 'press/Patina-Media-Background.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
const report = { checked_at: new Date().toISOString(), imageFailures, errors, printLayout, mobile, sheets: await Promise.resolve(printLayout.length) };
await writeFile(join(review, 'package-render-checks.json'), JSON.stringify(report, null, 2)+'\n');
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (errors.length || imageFailures.length || mobile.overflow || printLayout.some(s => s.clipped.length)) process.exitCode = 1;
