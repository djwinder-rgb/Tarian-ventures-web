import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { site, publicRoutes } from '../src/config/site';
const routes = [...publicRoutes, '/not-a-page/'];

test('Azure hosting preserves security, review indexing and genuine 404 responses', async () => {
  const azure = JSON.parse(await readFile('dist/staticwebapp.config.json', 'utf8'));
  const headers = await readFile('dist/_headers', 'utf8');
  for (const line of headers.split('\n\n')[0].split('\n').slice(1).filter(line => line.trim())) {
    const colon = line.indexOf(':');
    expect(azure.globalHeaders[line.slice(0, colon).trim()]).toBe(line.slice(colon + 1).trim());
  }
  expect(azure.responseOverrides['404']).toEqual({ rewrite: '/404.html' });
  expect(azure.navigationFallback).toBeUndefined();
  expect(azure.routes).toEqual([{ route: '/_astro/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }]);
});

for (const route of routes) {
  test(`${route}: direct route, metadata, accessibility, privacy and reflow`, async ({ page, context }) => {
    const external: string[] = [];
    const errors: string[] = [];
    page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4321') external.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text()); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(route === '/not-a-page/' ? 404 : 200);
    await page.screenshot({ path: `test-results/visuals/${route === '/' ? 'home' : route.split('/')[1]}-desktop.png`, fullPage: true });
    expect(response?.headers()['content-security-policy']).toContain("connect-src 'none'");
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/.+ \| Tarian Ventures/);
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /tarian-social\.png$/);
    expect(JSON.parse(await page.locator('script[type="application/ld+json"]').innerText()).name).toBe('Tarian Ventures');
    if (!site.publicationReviewed) await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    if (!site.productionOrigin) await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: `test-results/visuals/${route === '/' ? 'home' : route.split('/')[1]}-mobile.png`, fullPage: true });
    await page.getByRole('button', { name: 'Menu' }).click();
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    expect(await context.cookies()).toEqual([]);
    expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('all local links and asset references resolve; titles and descriptions are unique', async ({ page, request }) => {
  const references = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of publicRoutes) {
    await page.goto(route);
    titles.add(await page.title());
    descriptions.add((await page.locator('meta[name="description"]').getAttribute('content'))!);
    for (const ref of await page.locator('[href], [src], [srcset], meta[property="og:image"]').evaluateAll(nodes => nodes.flatMap(node => [node.getAttribute('href'), node.getAttribute('src'), node.getAttribute('srcset'), node.getAttribute('content')].filter((value): value is string => !!value)))) {
      if (ref.startsWith('#')) await expect(page.locator(ref)).toHaveCount(1);
      else if (ref.startsWith('/')) references.add(ref);
      else expect(ref).toMatch(/^mailto:/);
    }
  }
  for (const ref of references) expect((await request.get(ref)).status(), ref).toBe(200);
  expect(titles.size).toBe(7);
  expect(descriptions.size).toBe(7);
  const robots = await (await request.get('/robots.txt')).text();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  if (!site.publicationReviewed) { expect(robots).toContain('Disallow: /'); expect(sitemap).not.toContain('<loc>'); }
});

test('approved copy is preserved verbatim across the five primary pages', async ({ page }) => {
  const spec = await readFile('guidance/CODEX_WEBSITE_IMPLEMENTATION_SPEC.md', 'utf8');
  for (const [number, route] of [[5, '/'], [6, '/ventures/'], [7, '/approach/'], [8, '/about/'], [9, '/contact/']] as const) {
    const section = spec.split(`## ${number}. `)[1].split(`## ${number + 1}. `)[0].split('\n').slice(1);
    await page.goto(route);
    const text = (await page.locator('main').evaluate(main => {
      const copy = main.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('br').forEach(br => br.replaceWith(' '));
      return copy.textContent ?? '';
    })).replace(/\s+/g, ' ');
    for (let line of section) {
      line = line.trim().replace(/^#+\s*/, '').replaceAll('**', '').replace(/^(CTA|Section|Status treatment):\s*/, '');
      if (!line || ['Hero:', 'Display:'].includes(line) || line.startsWith('Do not add')) continue;
      if (line.includes(' — ')) {
        for (const part of line.split(' — ')) expect(text).toContain(part);
      } else expect(text).toContain(line);
    }
  }
});

test('keyboard menu, Escape, focus and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.focus();
  await expect(menu).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  await expect(page.locator('.button').first()).toHaveCSS('transition-duration', '0s');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(menu).toBeHidden();
});

test('navigation and approved content work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Ventures' }).click();
  await expect(page.getByRole('heading', { name: 'Tarian Compute' })).toBeVisible();
  await context.close();
});

test('200% text enlargement reflows and source assets remain byte-identical', async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await page.setViewportSize({ width: 640, height: 900 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  for (const [folder, files] of Object.entries({
    logos: ['tarian-lockup-horizontal.svg', 'tarian-lockup-horizontal-reversed.svg', 'tarian-lockup-stacked.svg', 'tarian-lockup-stacked-reversed.svg', 'tarian-mark.svg', 'tarian-mark-green.svg', 'tarian-mark-midnight.svg', 'tarian-mark-white.svg'],
    icons: ['tarian-favicon.svg', 'tarian-app-icon.svg'],
  })) for (const file of files) expect(await readFile(`public/brand/${folder}/${file}`)).toEqual(await readFile(`${folder}/${file}`));
});

test('authoritative wordmarks fit and source logos are available for visual review', async ({ page }) => {
  const sources = [
    'logos/tarian-lockup-horizontal.svg',
    'logos/tarian-lockup-horizontal-reversed.svg',
    'logos/tarian-lockup-stacked.svg',
    'logos/tarian-lockup-stacked-reversed.svg',
  ];
  const markup = await Promise.all(sources.map(async source => `<section style="padding:20px;border-bottom:1px solid #aaa"><p>${source}</p>${await readFile(source, 'utf8')}</section>`));
  await page.setContent(`<body style="font:16px Arial;background:#fff">${markup.join('')}</body>`);
  await page.screenshot({ path: 'test-results/visuals/logo-review.png', fullPage: true });
  const measurements = await page.locator('svg').evaluateAll(nodes => nodes.map(node => {
    const view = (node as SVGSVGElement).viewBox.baseVal;
    return [...node.querySelectorAll('text')].map(text => {
      const box = text.getBBox();
      return { text: text.textContent, x: box.x, end: box.x + box.width, fits: box.x >= view.x && box.x + box.width <= view.x + view.width };
    });
  }));
  console.log('Logo text bounds (source order):', JSON.stringify(measurements));
  for (const measurement of measurements) expect(measurement.every(text => text.fits)).toBe(true);
});
