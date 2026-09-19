import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

const output = 'review/brand-refinement';
await mkdir(output, { recursive: true });
const sources = [
  ...['tarian-lockup-horizontal.svg', 'tarian-lockup-horizontal-reversed.svg', 'tarian-lockup-stacked.svg', 'tarian-lockup-stacked-reversed.svg', 'tarian-mark.svg', 'tarian-mark-green.svg', 'tarian-mark-midnight.svg', 'tarian-mark-white.svg'].map(name => `logos/${name}`),
  'icons/tarian-app-icon.svg', 'icons/tarian-favicon.svg',
];
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  const findings = [];
  const panels = [];
  for (const source of sources) {
    const svg = await readFile(source, 'utf8');
    const inspection = await page.evaluate(svg => {
      const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
      const root = document.documentElement;
      const nodes = [...document.querySelectorAll('*')];
      return {
        valid: !document.querySelector('parsererror') && root.localName === 'svg',
        width: root.getAttribute('width'), height: root.getAttribute('height'), viewBox: root.getAttribute('viewBox'),
        colours: [...new Set(nodes.flatMap(node => [node.getAttribute('fill'), node.getAttribute('stroke')]).filter(Boolean))],
        fonts: [...new Set(nodes.map(node => node.getAttribute('font-family')).filter(Boolean))],
        text: [...document.querySelectorAll('text')].map(node => node.textContent),
        rasterCount: document.querySelectorAll('image').length,
        scriptCount: document.querySelectorAll('script, foreignObject').length,
        externalReferences: nodes.flatMap(node => [...node.attributes].filter(attr => (/href$/.test(attr.name) && !attr.value.startsWith('#')) || /url\((?!#)/.test(attr.value)).map(attr => attr.value)),
        handlers: nodes.flatMap(node => [...node.attributes].filter(attr => /^on/i.test(attr.name)).map(attr => attr.name)),
        metadata: document.querySelector('metadata') ? 'Embedded C2PA manifest; retained unchanged, not independently authenticated' : null,
      };
    }, svg);
    if (!inspection.valid || inspection.scriptCount || inspection.externalReferences.length || inspection.handlers.length || inspection.rasterCount) throw new Error(`Unsafe/invalid asset: ${source}`);
    await page.setContent(svg);
    await page.evaluate(() => document.fonts.ready);
    const bounds = await page.locator('svg').evaluate(svg => {
      const v = svg.viewBox.baseVal;
      return [...svg.querySelectorAll('path, rect, text')].map(element => {
        const box = element.getBBox();
        const matrix = element.getCTM();
        const rootMatrix = svg.getCTM().inverse();
        const points = [[box.x,box.y],[box.x+box.width,box.y],[box.x,box.y+box.height],[box.x+box.width,box.y+box.height]].map(([x,y]) => new DOMPoint(x,y).matrixTransform(matrix).matrixTransform(rootMatrix));
        const x = Math.min(...points.map(p=>p.x)), y = Math.min(...points.map(p=>p.y));
        const right = Math.max(...points.map(p=>p.x)), bottom = Math.max(...points.map(p=>p.y));
        return { element: element.tagName, text: element.textContent, x, y, right, bottom, fits: x >= v.x && y >= v.y && right <= v.x+v.width && bottom <= v.y+v.height };
      });
    });
    findings.push({ source, bytes: Buffer.byteLength(svg), sha256: createHash('sha256').update(svg).digest('hex'), ...inspection, bounds });
    const isWhite = source.includes('white');
    panels.push(`<section><h2>${source}</h2><div class="asset ${isWhite ? 'forest' : ''}">${svg}</div></section>`);
  }
  await page.setContent(`<html><head><style>body{font:14px Arial;margin:24px;background:#fff;color:#12262b}main{display:grid;grid-template-columns:1fr 1fr;gap:20px}section{border-bottom:1px solid #d0dddb;padding:16px}h2{font-size:14px;font-weight:400}.asset{padding:18px;min-height:130px;display:flex;align-items:center}.asset svg{max-width:100%;max-height:220px}.forest{background:#13564d}</style></head><body><main>${panels.join('')}</main></body></html>`);
  await page.screenshot({ path: `${output}/logo-inspection.png`, fullPage: true });
  await writeFile(`${output}/svg-inspection.json`, JSON.stringify(findings, null, 2)+'\n');
  console.log(findings.map(item => ({ asset: item.source, viewBox: item.viewBox, colours: item.colours, liveText: item.text.length, fits: item.bounds.every(box=>box.fits) })));
  if (findings.some(item=>item.bounds.some(box=>!box.fits))) throw new Error('Asset overflow requires review before integration');
  if (!process.argv.includes('--inspect')) {
    const requests = new Set();
    const errors = [];
    page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4321/')) requests.add(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    const captures = [
      ['home','/',1440,1000],['home','/',768,1024],['home','/',375,812],['home','/',320,800],
      ['ventures','/ventures/',1440,1000],['ventures','/ventures/',375,812],
      ['approach','/approach/',1440,1000],['approach','/approach/',375,812],
      ['about','/about/',1440,1000],['about','/about/',375,812],['contact','/contact/',1440,1000],
    ];
    const inventory=[];
    for (const [name, route, width, height] of captures) {
      await page.setViewportSize({ width, height });
      await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow on ${route} at ${width}`);
      const device=width===1440?'desktop':width===768?'tablet':'mobile';
      const file=`${name}-${device}-${width}.png`;
      await page.screenshot({path:`${output}/${file}`,fullPage:true}); inventory.push(file);
      if(name==='home' && [1440,375].includes(width)) {const hero=`home-hero-${device}-${width}.png`;await page.screenshot({path:`${output}/${hero}`});inventory.push(hero);}
    }
    const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
    const cookies=await page.context().cookies();
    const files=['dist/index.html',...(await readdir('dist/_astro')).map(name=>`dist/_astro/${name}`),'public/brand/tarian-social.png'];
    const sizes=await Promise.all(files.map(async file=>{const bytes=await readFile(file);return {file,bytes:bytes.length,gzip:gzipSync(bytes).length};}));
    await writeFile(`${output}/capture-results.json`,JSON.stringify({ browser:browser.version(), inventory, externalRequests:[...requests], errors, storage, cookies, sizes },null,2)+'\n');
    if(requests.size||errors.length||cookies.length||storage.local||storage.session)throw new Error('Review runtime regression');
    console.log(`Captured ${inventory.length} production screenshots; no external requests, cookies, storage or page errors.`);
  }
} finally { await browser.close(); }
