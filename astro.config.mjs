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
    } },
  }],
  site: site.productionOrigin ?? undefined,
  trailingSlash: 'always',
  // Keep even the tiny navigation script external so CSP needs no unsafe-inline.
  vite: { build: { assetsInlineLimit: 0 } },
  build: { format: 'directory', inlineStylesheets: 'never' },
});
