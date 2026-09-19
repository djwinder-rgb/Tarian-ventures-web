import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const output = 'review/final-refinement';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.__shifts = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__shifts += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const results = [];
  for (const width of [1440, 1024, 768, 390, 375, 320]) {
    await page.setViewportSize({ width, height: width > 768 ? 1000 : 812 });
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
    const brand = page.locator('.brand');
    const menu = page.getByRole('button', { name: 'Menu' });
    const bounds = await brand.boundingBox();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow).toBe(false);
    if (width <= 768) {
      await expect(page.locator('.mobile-brand-name')).toBeVisible();
      const target = await menu.boundingBox();
      expect(target.width).toBeGreaterThanOrEqual(44);
      expect(target.height).toBeGreaterThanOrEqual(44);
      expect(bounds.x + bounds.width).toBeLessThan(target.x);
      await menu.focus();
      await expect(menu).toHaveCSS('outline-style', 'solid');
      await menu.click();
      await expect(page.locator('#primary-navigation')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await expect(page.locator('#primary-navigation')).toBeHidden();
      await menu.blur();
    }
    const layoutShift = await page.evaluate(() => window.__shifts);
    expect(layoutShift).toBe(0);
    results.push({ width, overflow, layoutShift, brandBounds: bounds });
    if (width === 1440) {
      await page.screenshot({ path: `${output}/home-hero-desktop-1440.png` });
      await page.screenshot({ path: `${output}/home-desktop-1440.png`, fullPage: true });
    }
    if ([390, 375, 320].includes(width)) await page.locator('.site-header').screenshot({ path: `${output}/home-header-mobile-${width}.png` });
    if (width === 375) await page.screenshot({ path: `${output}/home-mobile-375.png`, fullPage: true });
  }
  await writeFile(`${output}/responsive-results.json`, JSON.stringify(results, null, 2) + '\n');
  console.log(results);
} finally { await browser.close(); }
