// Regenerates the project-owned raster card from its SVG source. No downloads.
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
const mark = await readFile('logos/tarian-mark-green.svg', 'utf8');
const paths = mark.match(/<path\b[^>]*>[\s\S]*?<\/path>/g)?.join('') ?? '';
if (!paths) throw new Error('Authoritative green mark paths are missing');
// Only the composition is generated. Supplied shield paths and fills are untouched.
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#FFFFFF"/>
<g transform="translate(870 125) scale(2.6)">${paths}</g>
<path d="M72 110H760M72 534H1128" stroke="#13564D" stroke-width="2"/>
<g fill="#13564D" font-family="Arial, sans-serif">
<text x="72" y="80" font-size="22" letter-spacing="6">TARIAN VENTURES</text>
<text x="72" y="236" font-size="66">Building businesses</text>
<text x="72" y="317" font-size="66">around problems</text>
<text x="72" y="398" font-size="66">worth solving.</text>
</g></svg>`;
await writeFile('public/brand/tarian-social.svg', card+'\n');
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0">${await readFile('public/brand/tarian-social.svg', 'utf8')}</body></html>`);
  await page.screenshot({ path: 'public/brand/tarian-social.png' });
  for (const [source, size, target] of [
    ['icons/tarian-favicon.svg', 32, 'tarian-favicon-32.png'],
    ['icons/tarian-app-icon.svg', 180, 'tarian-app-icon-180.png'],
    ['icons/tarian-app-icon.svg', 512, 'tarian-app-icon-512.png'],
  ]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<html><head><style>html,body{margin:0;background:transparent}svg{width:100%;height:100%;display:block}</style></head><body>${await readFile(source, 'utf8')}</body></html>`);
    await page.screenshot({ path: `public/brand/icons/${target}`, omitBackground: true });
  }
} finally { await browser.close(); }
