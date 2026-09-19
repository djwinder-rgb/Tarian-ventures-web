// Regenerates the project-owned raster card from its SVG source. No downloads.
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0">${await readFile('public/brand/tarian-social.svg', 'utf8')}</body></html>`);
  await page.screenshot({ path: 'public/brand/tarian-social.png' });
} finally { await browser.close(); }
