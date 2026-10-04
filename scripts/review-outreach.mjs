import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const output = 'review/venture-outreach';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  const inventory = [];
  for (const [name, route, widths] of [
    ['home', '/', [1440, 1024, 768, 390, 375, 320]],
    ['compute', '/compute/', [1440, 375]],
    ['ventures', '/ventures/', [1440, 375]],
    ['about', '/about/', [1440, 375]],
    ['contact', '/contact/', [1440, 375]],
  ]) for (const width of widths) {
    await page.setViewportSize({ width, height: width > 768 ? 1000 : 812 });
    await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const file = `${name}-${width}.png`;
    await page.screenshot({ path: `${output}/${file}`, fullPage: true });
    inventory.push(file);
    if (name === 'home' && [1440, 375].includes(width)) {
      const hero = `hero-${width}.png`;
      await page.screenshot({ path: `${output}/${hero}` });
      inventory.push(hero);
    }
  }
  await writeFile(`${output}/screenshots.json`, JSON.stringify(inventory, null, 2) + '\n');
  console.log(`Captured ${inventory.length} review screenshots.`);
} finally { await browser.close(); }
