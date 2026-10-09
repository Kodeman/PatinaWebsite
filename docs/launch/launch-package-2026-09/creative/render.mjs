import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

// Run from the repository: node docs/launch/launch-package-2026-09/creative/render.mjs
// After extracting the kit elsewhere, install Playwright locally first.
const directory = path.dirname(fileURLToPath(import.meta.url));
const exportsDirectory = path.join(directory, 'exports');
await mkdir(exportsDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1400, height: 2100 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('requestfailed', (request) => errors.push(request.url()));
await page.goto(pathToFileURL(path.join(directory, 'templates.html')).href);
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(Array.from(document.images, image => image.decode()));
});
const arts = await page.locator('.art').evaluateAll(elements => elements.map(art => ({ id: art.id, file: art.dataset.export, width: Number(art.dataset.width), height: Number(art.dataset.height), description: art.getAttribute('aria-label') })));
const report = [];
for (const artwork of arts) {
  const locator = page.locator(`#${artwork.id}`);
  const bounds = await locator.boundingBox();
  if (bounds.width !== artwork.width || bounds.height !== artwork.height) throw new Error(`Dimensions do not match for ${artwork.id}`);
  const clippedText = await locator.evaluate(art => {
    const frame = art.getBoundingClientRect();
    return [...art.querySelectorAll('p,h1,figcaption')].flatMap(element => {
      const box = element.getBoundingClientRect();
      if (box.left < frame.left || box.right > frame.right || box.top < frame.top || box.bottom > frame.bottom) return [element.textContent];
      return [];
    });
  });
  if (clippedText.length) throw new Error(`Clipped text in ${artwork.id}: ${clippedText.join('; ')}`);
  await locator.screenshot({ path: path.join(exportsDirectory, `${artwork.file}.png`), animations: 'disabled' });
  report.push({ ...artwork, path: `exports/${artwork.file}.png`, clippedText: 0 });
}
if (errors.length) throw new Error(errors.join('\n'));
await writeFile(path.join(directory, 'export-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), format: 'PNG', deviceScaleFactor: 1, fontsLoaded: await page.evaluate(() => document.fonts.check('32px Caslon') && document.fonts.check('32px Manrope')), renderErrors: errors, assets: report }, null, 2) + '\n');
console.log(JSON.stringify({ exported: report.length, sizes: report.map(item => `${item.file}: ${item.width}×${item.height}`), errors }, null, 2));
await browser.close();
