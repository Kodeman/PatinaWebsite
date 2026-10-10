import { test, expect, type Page } from '@playwright/test';

// Never let these launch checks create leads, send mail, or submit other API data.
// Each submission test registers its own more-specific mocked endpoint afterward.
test.beforeEach(async ({ page }) => {
  await page.addLocatorHandler(page.getByRole('dialog', { name: 'Cookie consent' }), async dialog => {
    // A native enrollment/menu dialog makes the underlying consent banner inert.
    if (await page.locator('dialog[open]').count()) return;
    await dialog.getByRole('button', { name: 'Decline', exact: true }).click();
  }, { noWaitAfter: true });
  await page.route('**/api/**', async route => {
    if (route.request().method() !== 'GET') return route.abort('blockedbyclient');
    if (new URL(route.request().url()).pathname === '/api/founding/count') {
      return route.fulfill({ json: { count: 12 } });
    }
    return route.continue();
  });
});

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )).toBeLessThanOrEqual(1);
}

test('visitors can navigate the studio and reach each audience invitation', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Bring one live project', exact: true }).first()).toBeVisible();
  for (const [label, path] of [
    ['Our story', '/about'],
    ['For designers', '/designers'], ['For makers', '/makers'], ['Journal', '/journal'],
  ]) {
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main')).toHaveCount(1);
  }
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'For makers', exact: true }).click();
  await page.getByRole('link', { name: 'Apply to Partner', exact: true }).first().click();
  await expect(page).toHaveURL(/\/makers\/apply$/);
  await expect(page.locator('main form')).toBeVisible();
  for (const [label, path] of [['Design services', '/services'], ['Say hello', '/contact'], ['Founding Circle', '/founding']]) {
    await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator('main h1')).toBeVisible();
  }
});

test('Founding Circle validates, recovers from a failed signup, and preserves attribution', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/founding', async route => {
    submissions.push(route.request().postDataJSON());
    return route.fulfill(submissions.length === 1
      ? { status: 503, json: { error: 'Please try again in a moment.' } }
      : { json: { success: true } });
  });
  await page.goto('/founding?utm_source=studio_test&utm_medium=referral&utm_campaign=launch_regression');
  // The modal trigger, not the page's inline form submit (the nav now leads to the studio door).
  await page.locator('main button[type="button"]').filter({ hasText: 'Join the Founding Circle' }).first().click();
  const dialog = page.getByRole('dialog', { name: 'The Founding Circle' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel('First Name', { exact: true })).toBeFocused();
  const submit = dialog.getByRole('button', { name: /Join the Founding Circle/ });
  await submit.click();
  await expect(dialog.getByRole('alert')).toContainText('email');
  expect(submissions).toHaveLength(0);
  await dialog.getByLabel('First Name', { exact: true }).fill('Studio');
  await dialog.getByLabel('Last Name', { exact: true }).fill('Regression');
  await dialog.getByLabel('Email', { exact: true }).fill('studio@example.com');
  await dialog.getByLabel(/What brings you to Patina/).fill('A room with materials that last.');
  await submit.click();
  await expect(dialog.getByText('Please try again in a moment.', { exact: true })).toBeVisible();
  await expect(dialog.getByLabel('Email', { exact: true })).toHaveValue('studio@example.com');
  await submit.click();
  await expect(page.getByRole('heading', { name: 'Welcome to the Founding Circle.' })).toBeVisible();
  expect(submissions).toHaveLength(2);
  expect(submissions[1]).toMatchObject({
    email: 'studio@example.com', first_name: 'Studio', signup_page: '/founding', role: 'consumer',
    cta_text: 'Join the Founding Circle', utm_source: 'studio_test',
    utm_campaign: 'launch_regression', company_url: '',
    utm: { utm_source: 'studio_test', utm_medium: 'referral', utm_campaign: 'launch_regression' },
    first_touch_attribution: { first_name: 'Studio', last_name: 'Regression', reason: 'A room with materials that last.' },
  });
  await page.getByRole('button', { name: 'Return to the site' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('homepage enrollment keeps keyboard focus in the invitation and identifies consumers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/founding', async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/');
  const trigger = page.locator('main').getByRole('button', { name: 'Join the Founding Circle', exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: /The Founding.*Circle/ });
  await expect(dialog.getByLabel('First Name', { exact: true })).toBeFocused();
  await dialog.getByRole('link', { name: 'Privacy Policy' }).focus();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByLabel('Email', { exact: true }).fill('home@example.com');
  await dialog.getByRole('button', { name: /Join the Founding Circle/ }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to the Founding Circle.' })).toBeVisible();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({ email: 'home@example.com', role: 'consumer', signup_page: '/', source: 'studio_home_invitation' });
});

test('inline Founding Circle enrollment preserves optional audience selection', async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/founding', async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ json: { success: true } });
  });
  for (const role of ['consumer', 'designer']) {
    await page.goto('/founding');
    const form = page.locator('main form');
    await form.getByLabel('Email', { exact: true }).fill(`${role}@example.com`);
    if (role === 'designer') await form.getByRole('button', { name: 'Designer', exact: true }).click();
    await form.getByRole('button', { name: 'Join the Founding Circle', exact: true }).click();
    await expect(page.locator('main').getByRole('status')).toContainText('Welcome to the Founding Circle.');
    expect(submissions.at(-1)).toMatchObject({ email: `${role}@example.com`, role, signup_page: '/founding', source: 'founding_page' });
  }
  expect(submissions).toHaveLength(2);
});

test('designer application keeps applicant details and campaign context', async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/designers-apply', async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/designers?utm_source=studio_test&utm_campaign=trade_launch');
  const form = page.locator('main form');
  await form.getByRole('button', { name: 'Apply to the Founding 50' }).click();
  await expect(form.getByText('Please enter a valid email')).toBeVisible();
  expect(submissions).toHaveLength(0);
  await form.getByLabel('First Name', { exact: true }).fill('Taylor');
  await form.getByLabel('Last Name', { exact: true }).fill('Sample');
  await form.getByLabel('Email', { exact: true }).fill('designer@example.com');
  await form.getByLabel('Company / Studio Name').fill('Example Studio');
  await form.getByLabel('Location', { exact: true }).fill('Madison, WI');
  await form.getByLabel('Portfolio or Website').fill('https://example.com/studio');
  await form.getByLabel(/What does.*timeless design/).fill('Materials that grow more interesting with use.');
  await form.getByLabel(/How do you currently source/).fill('Independent workshops and trade showrooms.');
  await form.getByRole('button', { name: 'Apply to the Founding 50' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Application received.' })).toBeVisible();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({
    first_name: 'Taylor', last_name: 'Sample', email: 'designer@example.com',
    company: 'Example Studio', location: 'Madison, WI', website: 'https://example.com/studio',
    motivation: 'Materials that grow more interesting with use.',
    sourcing_process: 'Independent workshops and trade showrooms.',
    source: 'designers_page', utm_source: 'studio_test', referral_source: 'studio_test', company_url: '',
  });
});

test('maker application submits required details and retains supplemental answers', async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/makers-apply', async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/makers/apply?utm_source=studio_test&utm_campaign=maker_launch');
  const form = page.locator('main form');
  await form.getByLabel(/Workshop Name/).fill('Example Workshop');
  await form.getByLabel(/^Location/).fill('Madison, WI');
  await form.getByLabel(/Primary Specialty/).selectOption({ label: 'Wood furniture' });
  await form.getByLabel(/Years of Experience/).fill('12 years');
  await form.getByLabel(/Contact Name/).fill('Jordan Example');
  await form.getByLabel(/^Email/).fill('maker@example.com');
  await form.getByLabel('Phone', { exact: true }).fill('6085550100');
  await form.getByLabel('Website or Portfolio', { exact: true }).fill('https://example.com/workshop');
  await form.getByLabel(/Tell us about your craft/).fill('Solid timber furniture built with considered joinery.');
  await form.getByLabel('Sustainability practices', { exact: true }).fill('We document the source of each timber batch.');
  await form.getByLabel('Existing trade program', { exact: true }).fill('Trade inquiries welcome.');
  await form.getByLabel('Portfolio links or images', { exact: true }).fill('https://example.com/portfolio');
  await form.getByLabel('How did you hear about us?', { exact: true }).fill('A personal invitation.');
  await form.getByRole('button', { name: 'Submit Application', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Application Received' })).toBeVisible();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toMatchObject({
    brand_name: 'Example Workshop', contact_name: 'Jordan Example', email: 'maker@example.com',
    location: 'Madison, WI', materials: 'Wood furniture', website: 'https://example.com/workshop',
    trade_program: 'Trade inquiries welcome.', referral_source: 'A personal invitation.',
    source: 'makers_apply', utm_source: 'studio_test', company_url: '',
  });
  for (const answer of ['Solid timber furniture', '12 years', '6085550100', 'source of each timber batch', 'https://example.com/portfolio']) {
    expect(submissions[0].description).toEqual(expect.stringContaining(answer));
  }
});

test('contact form recovers from delivery failure without losing the note', async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route('**/api/contact', async route => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill(submissions.length === 1
      ? { status: 503, json: { error: 'Please try your note again.' } }
      : { json: { success: true } });
  });
  await page.goto('/contact');
  const form = page.locator('main form');
  await form.getByLabel('Your Name', { exact: true }).fill('Morgan Example');
  await form.getByLabel('Email Address', { exact: true }).fill('contact@example.com');
  await form.getByLabel(/What.s this about/).selectOption('press');
  await form.getByLabel('Your Message', { exact: true }).fill('Please share the launch press materials.');
  await form.getByRole('button', { name: 'Send Message', exact: true }).click();
  await expect(form.getByRole('alert')).toHaveText('Please try your note again.');
  await expect(form.getByLabel('Your Message', { exact: true })).toHaveValue('Please share the launch press materials.');
  await form.getByRole('button', { name: 'Send Message', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Message Sent' })).toBeVisible();
  expect(submissions).toHaveLength(2);
  expect(submissions[1]).toMatchObject({ name: 'Morgan Example', email: 'contact@example.com', reason: 'press', message: 'Please share the launch press materials.', company_url: '' });
  await page.getByRole('button', { name: 'Send another message' }).click();
  await expect(page.locator('main form').getByLabel('Your Message', { exact: true })).toBeEmpty();
});

test('reduced motion keeps studio content and membership controls accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-studio-motion', 'off');
  await expect(page.locator('main h1')).toBeVisible();
  await page.goto('/designers');
  await expect(page.locator('body')).toHaveAttribute('data-studio-motion', 'off');
  await expect(page.locator('main h1')).toBeVisible();
  const motion = page.getByRole('button', { name: 'Motion off, following your device setting' }).last();
  await expect(motion).toBeDisabled();
  // The Founding Circle is the homepage's second door; the nav leads to the studio door.
  await page.goto('/');
  await page.locator('main').getByRole('button', { name: 'Join the Founding Circle', exact: true }).first().click();
  await expect(page.getByRole('dialog', { name: 'The Founding Circle' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

for (const width of [320, 390]) {
  test(`mobile ${width}px exposes navigation and avoids horizontal overflow`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expectNoHorizontalOverflow(page);
    const menuButton = page.getByRole('button', { name: 'Menu', exact: true });
    await menuButton.click();
    const menu = page.getByRole('dialog', { name: 'Explore the Patina studio' });
    await expect(menu).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await menu.getByRole('link', { name: 'For makers', exact: true }).click();
    await expect(page).toHaveURL(/\/makers$/);
    await expect(menu).not.toBeVisible();
    await expectNoHorizontalOverflow(page);
    for (const route of ['/founding', '/designers', '/makers/apply', '/contact', '/services']) {
      await page.goto(route);
      // Streaming can briefly retain a hidden copy of the page. Wait for the
      // final document before checking its unique heading and layout.
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('main h1')).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Explore the Patina studio' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  });
}
