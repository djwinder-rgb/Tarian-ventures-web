# Tarian Ventures website

A static, seven-page corporate website built with Astro, TypeScript and plain CSS. No React runtime, server adapter, backend, CMS, analytics, contact form, external fonts or runtime service integrations.

## Prerequisites

- Node.js **26.5.0** (`.nvmrc`, the implementation/validation version). Astro requires Node 22.12 or newer; the declared supported range is `>=22.12.0 <27`.
- npm **11.17.0** used to create the committed lockfile; npm 9.6.5 or newer required.
- Google Chrome installed for the optional Playwright browser checks and social-card regeneration. No browser download is needed on this setup. The tests select Playwright's `chrome` channel.

## Installation and local development

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. To disable Astro's development-tool telemetry, set `ASTRO_TELEMETRY_DISABLED=1` in your shell. This is build-tool telemetry, not visitor analytics; no telemetry is included in the generated site.

## Production build and validation

```sh
npm run check
npm run build
npm run preview
```

`dist/` contains the deployable static output. Astro preview does not apply Cloudflare `_headers`. To review the built site with its generated global security headers locally:

```sh
node scripts/serve-built.mjs
```

This serves `http://127.0.0.1:4321`, including a real 404 response. It is a development/test utility, not a deployed backend or a complete Cloudflare emulator.

```sh
npm run validate
```

Runs Astro/TypeScript diagnostics, production build and the compact Playwright/axe suite. It checks direct routes, approved copy, internal links/assets, metadata, contrast/accessibility automation, navigation without JavaScript, keyboard/Escape/focus, reduced motion, responsive reflow, browser requests, cookies/storage and source-asset integrity. Screenshots and failure traces go to ignored `test-results/`. See `docs/IMPLEMENTATION_REPORT.md` for actual results and manual checks still required.

A separate unit-test framework and linter are not included: Astro/TypeScript diagnostics and production/browser checks cover this small static implementation. Browser tests are development-only dependencies.

## Project structure

- `src/pages/` — five primary pages, Privacy, Cookies, branded 404, robots and sitemap endpoints rendered at build time.
- `src/layouts/Layout.astro` — document structure, metadata and shared layout.
- `src/components/` — header, footer, page introduction and decorative geometry.
- `src/styles/global.css` — brand variables, typography, layouts and responsive behaviour.
- `src/config/site.ts` — typed public company, contact, production-origin and publication configuration.
- `src/config/headers.ts` — security/header policy; the build hook emits `dist/_headers`.
- `public/brand/` — local web assets and Open Graph artwork.
- `logos/`, `icons/`, `guidance/` — preserved original brand pack and approved content specification.
- `docs/ASSET_PROVENANCE.md` — canonical implementation asset register.
- `docs/IMPLEMENTATION_REPORT.md` — validation, limitations and publication decisions.
- `scripts/`, `tests/`, `playwright.config.ts` — proportionate local validation and card-regeneration tools.

## Content and configuration

Approved copy originates in `guidance/CODEX_WEBSITE_IMPLEMENTATION_SPEC.md`; page templates retain it. The Approach sequence is local data in its page. Do not add unsupported claims or change venture statuses without human review. Founder: **Dan Winder**.

`src/config/site.ts` deliberately contains `null` for the production origin and all statutory fields. These are unverified, not empty facts. Review pages expose clearly labelled missing information, never fabricated company details. Contact addresses come from the approved specification.

The initial build has `publicationReviewed: false`:

- HTML and global headers specify `noindex, nofollow`.
- `robots.txt` disallows crawling.
- `sitemap.xml` is valid but empty.
- Canonical URLs and `og:url` are omitted without a verified origin.
- The social-image path is local until an absolute production URL can be generated.

Before public publication, verify the origin (HTTPS origin, no trailing slash), all statutory fields, business enquiry processing and final legal text. Confirm actual hosting/browser behaviour. Only then change `publicationReviewed` to `true` and rebuild. The build refuses this flag when the origin or statutory fields are missing. Once configured, the sitemap lists the seven public pages and canonical/Open Graph URLs use the verified origin. Organization JSON-LD currently contains only the approved brand name, plus the origin if configured; no guessed registered identity, address or social profile.

Noindex and robots directives are indexing controls, not access control. Do not put confidential material in review builds.

## Cloudflare Pages configuration (prepared, not deployed)

**Superseded hosting target, 20 September 2026:** the user selected Azure Static Web Apps, following AltGRC's hosting model. See [Azure hosting preparation](docs/AZURE_HOSTING.md). Cloudflare remains the registrar/DNS provider. The following Pages instructions are historical; the build now also emits Azure configuration.

- Framework: Astro (static).
- Build command: `npm run build` after installation from `package-lock.json` using `npm ci`.
- Output directory: `dist`.
- Root directory: repository root when this repository is connected directly.
- Build environment: Node `26.5.0` (`NODE_VERSION` / `.nvmrc`), npm `11.17.0`; `ASTRO_TELEMETRY_DISABLED=1` recommended.
- No server adapter, Functions, Worker, runtime bindings or secrets are needed.
- Configure the production branch deliberately; do not deploy the feature branch as production before human review.
- Preserve `404.html`; do not add an SPA wildcard rewrite.
- Generated `_headers` includes CSP, MIME-sniffing protection, referrer policy, framing protection and Permissions-Policy. Hashed `_astro` assets receive immutable caching.
- The exact Organization JSON-LD is SHA-256 allowlisted. Scripts and styles otherwise load only from this origin. No `unsafe-inline`, `unsafe-eval` or third-party allowlist.
- Both the Pages hostname and branch-preview hostnames receive noindex headers, even when the production build becomes indexable.
- Leave Cloudflare analytics, Zaraz and any script-injection features disabled. Check actual responses, requests and cookies after any separately authorised deployment.
- Configure the chosen production domain and any apex/www redirect only once the hostname is confirmed. Review TLS/HSTS settings in the actual Cloudflare zone; no unverified long-lived HSTS policy is imposed here.

Cloudflare routing and environment setup must still be verified on an authorised preview deployment. Local tests do not prove provider configuration. No deployment was performed during implementation.

## Branding and assets

**Current outreach review, 20 September 2026:** the user authorised clearer umbrella/venture-stage positioning, a dedicated `/compute/` route, original network motion and Charcoal `#20282B` typography with selective Forest accents. See `review/venture-outreach/REVIEW.md` and `docs/VIDEO_DIRECTION.md`. Earlier brand reviews are historical where they differ. Run `node scripts/review-outreach.mjs` against the local production server to capture the new pack.

The human-approved website authority is [docs/WEBSITE_BRAND.md](docs/WEBSITE_BRAND.md): Forest `#13564D`, White `#FFFFFF`, Pale Forest `#F3F7F6`, Deep Ink `#12262B`, Decorative Rule `#D0DDDB`. Earlier palettes are historical only. Compact headers now pair the supplied mark with readable TARIAN text. Final review evidence is in `review/final-refinement/FINAL_REFINEMENT_REVIEW.md`; regenerate with `node scripts/review-final.mjs` against the local production server.

The latest human-supplied kit is authoritative and copied unchanged into `public/brand/`. The horizontal lockup serves desktop headers; the green mark serves compact headers and About, and the white mark serves the Forest footer. SVG live text retains its supplied font stack. Page text uses Arial/system fallback, with no bundled fonts or font-service requests. See `review/brand-refinement/VISUAL_REVIEW.md` for current palette and evidence; historical decisions remain in the dated implementation report.

Regenerate the Open Graph artwork and favicon/app PNGs from supplied SVG geometry with:

```sh
node scripts/generate-social.mjs
```

The source uses only approved geometry, palette and copy. The raster is committed, so browser tooling is not needed for production builds. See `docs/ASSET_PROVENANCE.md` before adding or changing assets. The supplied historical register remains at `guidance/ASSET_PROVENANCE.md`.

To refresh the review pack, build and serve production output at `http://127.0.0.1:4321`, then run `node scripts/review-brand.mjs` and `node scripts/contrast.mjs`. Use `--inspect` for SVG-only inspection. Captures are committed for review; updating them does not publish the site.

Specialist artwork review remains appropriate before trademark registration, large-format print or permanent signage.
