# Tarian Ventures V1 implementation report

Implementation date: 19 September 2026.

## Outcome

**READY FOR HUMAN REVIEW.** The implementation is complete as a review build. It has not been merged, pushed or deployed. Publication still requires verified business/legal information, a production hostname and a separately authorised deployment. This report does not claim full WCAG conformance or verified Cloudflare production behaviour.

## Pre-write safety gate and version control

- Exact repository root confirmed: `/Users/dwinmacmini/Development/TarianVentures/tarian-ventures-web`.
- Origin confirmed: `https://github.com/djwinder-rgb/tarian-ventures-web.git`.
- `git fetch origin` completed before implementation.
- Initial branch: `main`.
- Baseline HEAD and fetched `origin/main`: `9f7a618219034174266ad165b90e36f68e221df4`.
- Initial working tree: clean; HEAD and origin/main had zero commits of divergence.
- Created and worked on `feature/website-v1`.
- No baseline history rewrite, force push, merge or deployment.
- Implementation is divided into foundation/assets, pages/layout and validation/documentation commits. Final commit SHA and clean status are supplied in the completion response; this document intentionally does not attempt to contain its own commit hash.

## Architecture and files

Astro static output, TypeScript for configuration and browser behaviour, and plain CSS. Eight HTML pages are pre-rendered; robots and sitemap are generated at build time. No client router or UI framework is included. Standard links work without JavaScript.

`Layout.astro` supplies document metadata, landmarks and header/footer. Components are limited to Header, Footer, PageIntro and decorative Geometry. Approved copy lives in page templates; Approach uses a local five-item sequence. Global CSS defines palette, typography, spacing and responsive behaviour. `src/config/site.ts` holds typed public configuration; `src/config/headers.ts` defines the header policy. A local build integration writes `_headers` into `dist/`.

The only application JavaScript is a small mobile-navigation enhancement, emitted as a same-origin external module. Astro automatic inlining is disabled so the strict CSP permits it without unsafe-inline. No hydration, runtime backend, database, CMS, server adapter, React, Vue, Svelte, CSS framework, component library, animation library or icon library.

## Direct dependencies and runtime requirements

All direct packages are exact-pinned development/build dependencies, recorded with their transitive dependencies in `package-lock.json`:

- `astro` 7.3.3 — static build and local preview.
- `typescript` 5.9.3 — strict type checking.
- `@astrojs/check` 0.9.10 — Astro diagnostics.
- `@playwright/test` 1.63.0 — compact browser validation.
- `@axe-core/playwright` 4.13.0 — development-only accessibility scans.

No npm dependency runs in the visitor's browser; only the site's compiled navigation code does. No production Node process is required. Installation/build may contact the npm registry; that is separate from visitor runtime requests. Astro build-tool telemetry was disabled during validation with `ASTRO_TELEMETRY_DISABLED=1`.

Validated using Node 26.5.0, npm 11.17.0 and Google Chrome 153.0.8010.48 on this Mac. Node 26.5.0 is recorded in `.nvmrc`; package engines specify Node >=22.12.0 <27 and npm >=9.6.5. Other allowed Node versions were not independently tested. Chrome is required only for browser checks/social-card regeneration, not for the production build. `npm install` reported 0 vulnerabilities. npm also emitted an informational esbuild install-script policy warning; installation, diagnostics and builds completed successfully.

## Pages and approved content

- `/` — full hero copy and both venture CTAs; From opportunity to evidence; Ventures; Work with us.
- `/ventures/` — Tarian Compute (AI infrastructure / In development), AltGRC (Governance technology / Developed by Tarian Ventures), New Ventures.
- `/approach/` — Evidence before scale; Discover, Validate, Experiment, Build, Scale or stop.
- `/about/` — company introduction, Welsh roots and founder **Dan Winder**, with the approved biography.
- `/contact/` — two accessible mailto links using the approved addresses; no form.
- `/privacy/` — explicit review draft separating website-code facts from unresolved business/hosting processing details.
- `/cookies/` — explicit review draft describing application behaviour and pending deployed-hosting verification.
- `/404.html` — branded missing-page content and home link; unknown paths returned HTTP 404 in local production checks.

An automated check compares every approved content line in specification sections 5–9 with the underlying page text. Typography may uppercase short category labels visually; source wording is unchanged. Additional short navigation labels, metadata summaries, legal review notices and 404 utility text introduce no new marketing claims.

## Design

Stone and White surfaces, Midnight typography/dark sections, Slate supporting text, selective Green accents, generous whitespace and a 1200px content maximum. The homepage uses large typography and decorative shield-inspired line geometry. Venture sections use rules and text status labels rather than a card grid. Approach is an always-visible ordered sequence. Mobile layouts stack naturally; the decorative hero illustration is omitted at small widths. No photography, gradients, large shadows or autoplay animation.

## Assets and fonts

`docs/ASSET_PROVENANCE.md` is the canonical register. All original `logos/`, `icons/` and `guidance/` files remain unchanged from baseline. Public byte-identical copies provide the specified `/brand/logos/` and `/brand/icons/` URLs.

The default horizontal/reversed wordmarks have documented web derivatives whose only change is explicitly selecting Arial rather than Inter/Arial. This avoids accidentally depending on a locally installed Inter font; platform font rendering can still differ. No font binary was downloaded, bundled or licensed speculatively. Website typography uses the permitted Arial/system fallback.

The supplied horizontal wordmarks and web derivatives fit their viewBoxes and were visually inspected. The stacked logo's TARIAN text measured approximately -4.52 to 104.52 within a 100-unit viewBox; visual inspection confirmed slight clipping. It is preserved and not used. No logo geometry was redesigned or clipping correction silently applied.

The Open Graph card is a committed 1200 × 630 PNG generated locally from a committed SVG using only supplied shield paths, approved colours and the approved headline. A regeneration script and source lineage are documented. No third-party visual assets were added.

## Accessibility

Implemented semantic landmarks, English language declaration, one page H1, ordered heading levels, skip link, visible focus, current-page navigation, 44px-or-larger primary interactive targets, text status labels and decorative SVG hiding. The mobile toggle exposes aria-expanded/aria-controls, supports keyboard operation and Escape, and restores focus when closed with Escape. Without JavaScript, the toggle stays hidden and navigation links remain visible. Reduced-motion disables transitions; there is no autoplay motion.

Meaningful text uses passing palette combinations. Green is not used for meaningful text/UI on Midnight. Contrast calculated during discovery: Midnight/Stone 15.84:1; Slate/Stone 9.06:1; Green/Stone 5.64:1; White/Green 6.37:1. Decorative geometry has no contrast-dependent meaning.

Automated axe scans found no violations in the selected WCAG 2/2.1/2.2 A/AA rule tags, across all eight route cases in desktop and expanded mobile-menu states. These scans are not proof of full WCAG conformance.

### Manual-accessibility and review checklist

Completed visual inspection:

- [x] Desktop/mobile homepage composition, readable hierarchy and wrapping.
- [x] Representative Ventures, Approach, About and Contact layouts.
- [x] Privacy/Cookies review notices and branded 404.
- [x] Source and web horizontal logos, stacked-source clipping and social-card appearance.
- [x] No visual reliance on colour alone for venture statuses.

Completed through browser automation (not represented as screen-reader testing):

- [x] Skip-link focus, keyboard menu activation, Tab order into navigation and Escape focus return.
- [x] Visible keyboard focus and reduced-motion transition removal.
- [x] Navigation with JavaScript disabled at 320px.
- [x] Reflow at 320, 375, 768 and 1440 CSS pixels across all eight route cases.
- [x] 200% root text enlargement at 640px across all seven primary/legal pages.

Still to perform during human/device review:

- [ ] VoiceOver/Safari and, where available, NVDA reading order, names and menu announcements.
- [ ] Actual browser zoom at 200%/400% on a desktop display; 320px reflow above is a viewport check, not a claim of actual browser-zoom testing.
- [ ] Real iOS/Android touch and device-font rendering.
- [ ] Safari/Firefox cross-browser pass and final visual sign-off.

## Privacy and external requests

Across all tested routes and mobile-menu interaction, the local production build made **zero cross-origin page requests**, set **zero cookies**, and left localStorage/sessionStorage empty. HTML, CSS, navigation JS, logos and icons are same-origin. The social card is referenced in metadata; ordinary page rendering does not fetch it. No fonts are fetched.

There are no analytics, ads, trackers, embedded content, remote APIs, application cookies or persistent browser preferences. Mailto links only hand off after user activation; tests verified their destinations without sending email. npm/build tooling and test instrumentation are not visitor runtime resources.

Cloudflare deployment configuration, provider request logs and the business email-processing arrangements have not been verified. Legal pages distinguish these unknowns from checked code behaviour. No processor list, retention period, legal identity or business processing basis was fabricated.

## Metadata and publication controls

Each page has a unique title and description, favicon/app-icon references and Open Graph metadata. Organization JSON-LD contains only the approved brand name and optionally the configured production origin, with no invented registered identity or social profiles.

Production origin and statutory fields are explicitly null/unverified. Review builds omit canonical/og:url without a real origin, output noindex/nofollow, disallow robots crawling and produce a valid empty sitemap. The Open Graph image uses a local path until the origin is verified. With a verified origin and publication review enabled, the seven public routes populate the sitemap and absolute metadata URLs are generated. Noindex alone is not access control.

The publication flag refuses a build when the origin or statutory fields are missing. Human review must also finalise the explicit draft legal pages before enabling it. The current review mode, not the future fully configured production mode, is what browser tests validated.

## Security and Cloudflare

The build emits `dist/_headers` with:

- CSP restricting resources to self, allowing the exact SHA-256 hash of Organization JSON-LD, denying connections, frames/objects, forms and base-URL changes, and upgrading insecure requests.
- X-Content-Type-Options: nosniff.
- Referrer-Policy: strict-origin-when-cross-origin.
- X-Frame-Options: DENY and CSP frame-ancestors none.
- Permissions-Policy denying camera, microphone, geolocation, payment and USB.
- Long-lived immutable caching only for fingerprinted `_astro` files.
- Noindex for review builds and Cloudflare Pages preview hostnames.

Local validation served generated global headers and found no browser CSP or script errors. It is not a complete Cloudflare emulator. No unsafe-inline, unsafe-eval, third-party resource allowances or client secrets were added. HSTS/domain redirects require actual zone/domain review and were not guessed.

Cloudflare Pages setup: repository root, Node 26.5.0, install from lockfile with npm ci, build `npm run build`, publish `dist/`. No adapter, Functions, bindings or server process. Preserve 404.html and avoid SPA rewrites. README contains operational steps. Deployment was not attempted.

## Validation performed

Final `ASTRO_TELEMETRY_DISABLED=1 npm run validate` completed successfully:

- Astro/TypeScript diagnostics: 23 files, 0 errors, 0 warnings, 0 hints.
- Production build: 8 static HTML pages plus robots, sitemap, headers and assets.
- Playwright: **14 tests passed**.
- All seven public routes returned 200; unknown path returned branded 404.
- Approved copy comparison passed on all five primary pages.
- All collected local links/assets resolved; titles/descriptions unique; review metadata validated.
- Desktop and mobile axe scans passed across eight route cases.
- Keyboard, no-JavaScript navigation, responsive/text-enlargement and reduced-motion checks passed.
- No cross-origin page requests, cookies, local/session storage or unexpected browser console/page errors observed.
- Original/public asset byte comparisons passed; horizontal logo text bounds passed.
- `git diff --check` passed. Baseline comparison confirmed the supplied source logos, icons and guidance were unchanged.

An initial validation run exposed Astro's automatic script inlining conflicting with CSP; external emission corrected it without weakening policy. A later copy-test failure came from CSS text-transform affecting innerText; the check now compares underlying text. Final validation passed after those corrections.

No standalone linter or large unit-test framework was added. Astro/TypeScript checks, build and the targeted browser suite provide the proportionate checks for this implementation. Screenshots and failure traces are local ignored review artefacts under `test-results/`.

## Performance evidence and limits

Measured final build files:

- Home HTML: 5,961 bytes; 2,181 bytes gzip.
- Navigation JS: 553 bytes; 318 bytes gzip.
- Shared CSS: 7,743 bytes; 2,298 bytes gzip.
- Social PNG: 38,254 bytes; not part of normal page rendering.

No browser framework runtime, downloaded fonts or photography. Logos reserve intrinsic dimensions. Static HTML provides immediate content without waiting for JS. A Lighthouse audit, deployed latency/Core Web Vitals and real-device performance have not been measured; no synthetic score is claimed.

## Unresolved publication decisions and deviations

Before publication, confirm the production hostname, registered company name, company number, registered office and jurisdiction; finalise Privacy/Cookies from actual enquiry-processing and hosting facts; verify mailbox operation without speculative messages; perform the human/device accessibility checks; and separately authorise/verify Cloudflare deployment settings.

There are no material scope deviations. Permitted system fonts are used because no approved Inter files were supplied. Legal review placeholders and the unconfigured production domain are intentional requirements. The unused stacked logo remains unchanged. Build-time security-header generation is an implementation detail, not a runtime backend. The next gate is human review.

## Brand Refinement — 19 September 2026

This dated addition supersedes the visual decisions above without rewriting the historical V1 record. Verdict: **READY FOR VISUAL REVIEW**. No merge, push or deployment was performed.

### Safety and scope

Confirmed exact root `/Users/dwinmacmini/Development/TarianVentures/tarian-ventures-web`, fetched origin, and remained on `feature/website-v1`. Starting HEAD: `c0938fce7e34f26f0e24c8318dbf7cc88aa54c24`; fetched origin/main: `9f7a618219034174266ad165b90e36f68e221df4`; origin: `https://github.com/djwinder-rgb/tarian-ventures-web.git`. No tracked changes existed at the gate. The only untracked inputs were the ten supplied SVGs under logos/icons and `tarian-logo-kit/README.txt`, explicitly identified as intentional kit files. No unrelated work was overwritten.

### Artwork and palette

The five named replacement assets (horizontal, stacked, stacked-reversed, green mark, white mark) and five companion SVGs are now authoritative repository assets, unchanged. Public copies are byte-identical. All parse and fit their viewBoxes in installed Chrome. Four lockups retain live SVG text and their supplied font stack. C2PA manifests are retained but not independently authenticated. No scripts, raster images or external resource references were found. The older stacked clipping warning does not apply to the new kit.

Desktop headers use the supplied horizontal lockup; compact headers and About use green marks; footers use the white mark. Stacked/reversed lockups are retained but not unnecessarily repeated. Icons use supplied vectors and local rasterisations. Social artwork uses exact supplied green mark paths. Obsolete public derivatives were removed. `docs/ASSET_PROVENANCE.md` now records source lineage, use and technical caveats.

Final CSS palette: Forest `#13564D`, White `#FFFFFF`, pale tint `#F3F7F6`, Deep Ink `#12262B`, decorative rule `#D0DDDB`. These replace V1's Stone/Green/Midnight/Slate website roles. Original SVG colours remain untouched. White dominates; Forest headings, a deliberate evidence section and footer establish the new rhythm. Body Ink improves reading hierarchy. Hero geometry is lighter; venture statuses use text and strokes; Approach has separate markers and a stronger “Scale or stop” rule without progression arrows. Approved copy is unchanged.

### Validation and performance

- Astro/TypeScript: 25 files; zero errors, warnings or hints. Two initial tooling hints were corrected before final diagnostics.
- Production build passed; all 14 Playwright tests passed, including axe, keyboard, no-JavaScript navigation, reflow at 1440/768/375/320, enlarged text, reduced motion, links/assets, approved copy, metadata, CSP and source/public reconciliation.
- Meaningful text contrast passes AA: Forest/White 8.52:1; Ink/White 15.70:1; Ink/tint 14.54:1; Forest/tint 7.89:1. Decorative-only rules are lower contrast. Focus remains visible on light and Forest surfaces.
- Zero external page requests, cookies, browser storage entries or unexpected console/page errors observed. Privacy/security controls, review noindex and dependency set are unchanged.
- HTML 5,846 bytes / 2,141 gzip; JS unchanged 553 / 318; CSS 7,956 / 2,302; social PNG 37,963 bytes. Supplied SVG metadata increases logo bytes; retained deliberately to preserve sources. No claim of identical total payload or measured deployed Core Web Vitals is made.
- `git diff --check` passed. Full technical findings and capture evidence are committed with the review pack.

### Visual review pack and remaining decisions

`review/brand-refinement/VISUAL_REVIEW.md` records exact roles/contrasts, per-context artwork, responsive decisions, compromises and all 13 production screenshots. Additional SVG inspection gallery/JSON, contrast JSON and capture results make the checks reproducible. Full-page and viewport-only hero captures are included; page content was not edited for screenshots.

Human review should decide whether the desktop shield contour earns its space, whether mark-only mobile identity is sufficient and whether Forest usage conveys a venture development company. Live wordmark text can vary by operating system. Tall mobile legal-review footers remain intentional. Safari/Firefox, assistive-technology/device checks and existing company/domain/legal publication prerequisites remain outstanding. Technical passing results do not substitute for visual approval.

## Final Visual Refinement — 19 September 2026

Human visual review: **PASS WITH MINOR REFINEMENT**. White + Forest, overall design and supplied logo geometry are approved. This pass implements only the two authorised presentation adjustments.

Safety gate confirmed the exact repository root, fetched origin, and verified `feature/website-v1` at reviewed SHA `80bade0074116a84c9c38feeaa710696f367a7d3`; origin/main remained `9f7a618219034174266ad165b90e36f68e221df4`. An untracked reviewed screenshot ZIP initially stopped the gate. The user then authorised excluding it. It remains untouched and locally ignored through `.git/info/exclude`; no shared ignore rule or archive was committed. No other unexpected changes existed.

The decorative hero contour now uses 80% of its original column width and 50% opacity, centred in the same column. Paths, stroke definitions and master artwork are unchanged. Compact headers pair the supplied 64px green shield with 16px system-font TARIAN lettering, retaining the full accessible home-link name. Desktop identity and menu logic are unchanged.

`docs/WEBSITE_BRAND.md` formalises Forest `#13564D`, White `#FFFFFF`, Pale Forest `#F3F7F6`, Deep Ink `#12262B` and Decorative Rule `#D0DDDB` as authoritative. README/provenance describe current usage; historical brand guidance is explicitly marked superseded for website palette/presentation. Historical review evidence remains intact.

Complete validation passed: production build, all 14 Playwright tests, axe scans, keyboard/Escape/focus, JavaScript-disabled navigation, reflow, text enlargement, reduced motion, approved copy, links/assets, metadata, CSP and byte-identical source/public artwork. Final diagnostics cover 26 files with zero errors, warnings or hints. Contrast recheck passed: mobile brand/focus 8.52:1, menu boundary 15.70:1; decorative opacity carries no information. Zero unexpected external runtime requests, application cookies or local/session storage entries observed.

Targeted header/hero checks passed at 1440, 1024, 768, 390, 375 and 320px. No overflow, compact header collision or observed layout shift; Menu targets meet 44px and navigation/focus behaviour remains intact. Six production screenshots and measured results are in `review/final-refinement/`; `FINAL_REFINEMENT_REVIEW.md` records the comparison and remaining human judgments. Final `git diff --check` passed. Only a harmless test-runner NO_COLOR/FORCE_COLOR environment warning appeared; no site errors were reported.

Verdict: **READY FOR FINAL HUMAN REVIEW**. Existing cross-browser/device and publication prerequisites remain. No merge, push, deployment or history rewrite performed.

## Venture outreach and original motion — 20 September 2026

The user clarified that Tarian is an umbrella for testing/piloting ideas before spinning viable work into separate legal entities, and is not itself seeking investment. Current priority is credible outreach for Tarian Compute. The user authorised the seven resulting content/design recommendations and original animation development while investigating video-generation services.

Work started from merged Azure-ready main (`8e07e3066de49307dee4df0fac040603def8b40b`) on `codex/venture-outreach`, with a clean working tree. AltGRC local project documentation was inspected read-only. Engineering deployment labels were not treated as evidence of commercial traction; public wording follows the user's explicit confirmation: demonstration stage, no first customer, further work before customer deployment. No private demo material or customer references were published.

Home now explains the umbrella purpose, brings named work forward and leads to a new `/compute/` page. Compute describes areas of investigation and the expertise sought. About makes the founder and relevant experience clearer. Contact offers subject-specific Compute, AltGRC and general enquiry routes. No email was sent. White/Charcoal `#20282B` with Forest accents replaces uniformly Forest typography. Master logos, legal placeholders and publication controls are retained.

Original SVG connected-plane animation replaces the old decorative shield. An 18-second signal loop has pause/play, reduced-motion preference handling and static no-JavaScript behaviour. No library, tracking, video service or stock asset added. `docs/VIDEO_DIRECTION.md` supplies original-network and Welsh-waterfront generation briefs; actual film production remains pending the user's service exploration. No genuine portrait or approved product screenshot was available, so neither was fabricated.

Production build and all 18 Playwright tests passed. Diagnostics reported zero errors, warnings or hints. Tests include nine route cases, axe, keyboard/no-JavaScript, responsive widths, enlarged text, motion controls, contact journeys, truthful stage assertions, original/public SVG identity and Azure security configuration parity. Approach copy remains checked against the historical specification; the other pages' old-copy expectations were replaced to reflect explicit revision authorisation. No external runtime requests, cookies, storage or page errors observed. White/Charcoal contrast is 15:1; Forest/White 8.52:1. Detailed contrast and screenshots are in `review/venture-outreach/`.

The branch is for visual/content review; the deployed Azure site and custom-domain state are unchanged by this pass. Existing legal/company/domain publication prerequisites remain.

## Company details supplied — 25 September 2026

The user supplied the registered name Tarian Ventures Limited, company number 17238255 and registered office Quest House, Fortran Road, St. Mellons, Cardiff, Wales, CF3 0EY. These are now recorded in shared configuration and displayed in every page's footer. Their source is the user's confirmation; no independent registry verification was performed. Jurisdiction remains unconfirmed, and publication review remains pending. The footer review label now reflects the remaining publication checks.

The user has also ended exploration of paid AI video generation. The existing original network animation remains the current visual direction; video production is no longer pending.

Validation passed: Astro diagnostics reported no errors, warnings or hints, the production build completed, and all 18 browser tests passed, including responsive reflow and accessibility. No Azure deployment was performed.

## Privacy and cookie policy drafts — 25 September 2026

Replaced the legal-page placeholder outlines with substantive review drafts for the website and direct early-stage business enquiries. Incorporated the supplied company identity, purpose/basis proposals, data categories, providers and transfers requiring confirmation, retention proposal, individual rights, complaints route and cookie/storage behaviour. Operational assumptions remain explicitly marked; no claim of legal sign-off, implemented deletion rules or verified email arrangements is made. Future product processing and separate venture entities require their own appropriate notices.

`docs/PUBLICATION_CHECKS.md` records the remaining factual, operational and deployment checks and the official ICO/Microsoft sources consulted. Added an explicit allowance for the ICO complaints hyperlink in the existing link test; all external runtime requests remain prohibited by the same browser assertions. Diagnostics and build passed and all 18 tests passed, including both expanded legal pages at mobile/desktop widths. Publication remains disabled and no Azure deployment was performed.

## Broad venture positioning and review refinements — 30 September 2026

Following the owner's correction to the external review, retained Tarian's broad venture-development purpose, original homepage headline and network animation. Compute is the current priority, not the umbrella's sole purpose or a Wales-only proposition. Added Compute to primary navigation without duplicating its sitemap route; simplified repeated copy, centralised the independent-company explanation on Ventures, and changed AltGRC to In development while retaining its customer-readiness limitation. Approach now uses plain language about time, money and evidence. Footer adds navigation, the general enquiry address, build-year copyright and the Registered in label. Contact retains separate subject-specific enquiry routes with smaller email lettering; 404 now also links to Compute.

No founder image, LinkedIn URL, unsupported biography detail, confidentiality promise or reply-time commitment was invented. Publication flags and outstanding legal facts remain pending. The previous verbatim Approach-copy test was replaced because these copy changes were authorised; the five-stage structure and enquiry journeys remain checked. Diagnostics/build and all 18 browser checks passed, including mobile reflow, accessibility, animation and navigation. Desktop screenshot inspected. No Azure deployment performed.
