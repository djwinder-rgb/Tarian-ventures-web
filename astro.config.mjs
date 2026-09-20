import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import { securityHeaders } from './src/config/headers.ts';
import { site } from './src/config/site.ts';

export default defineConfig({
  output: 'static',
  integrations: [{
    name: 'static-security-headers',
    hooks: { 'astro:build:done': async ({ dir }) => {
      await writeFile(new URL('_headers', dir), securityHeaders);
      // Azure uses JSON configuration rather than Cloudflare's _headers format.
      const globalHeaders = Object.fromEntries(securityHeaders.split('\n\n')[0].split('\n').slice(1).filter(line => line.trim()).map(line => {
        const colon = line.indexOf(':');
        return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
      }));
      await writeFile(new URL('staticwebapp.config.json', dir), JSON.stringify({
        globalHeaders,
        routes: [{ route: '/_astro/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }],
        responseOverrides: { '404': { rewrite: '/404.html' } },
      }, null, 2) + '\n');
    } },
  }],
  site: site.productionOrigin ?? undefined,
  trailingSlash: 'always',
  // Keep even the tiny navigation script external so CSP needs no unsafe-inline.
  vite: { build: { assetsInlineLimit: 0 } },
  build: { format: 'directory', inlineStylesheets: 'never' },
});
