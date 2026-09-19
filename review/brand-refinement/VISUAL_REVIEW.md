# White + Forest — visual review

19 September 2026 · `feature/website-v1` · **READY FOR VISUAL REVIEW**

This is a design review pack, not publication approval. Screenshots come from the local production build in Chrome 153.0.8010.48, without browser chrome or content changes for capture. Passing technical checks does not establish whether the identity is right for Tarian.

## 1. Exact palette and roles

- **Forest `#13564D`**: supplied mark colour; headings, navigation, links, light-surface focus rings, CTA, status strokes, stage markers, hero contours, evidence section and footer.
- **White `#FFFFFF`**: dominant canvas; inverse text, mark and focus on Forest.
- **Pale Forest tint `#F3F7F6`**: approximately 5% Forest mixed into White; About origin section, contact invitation, legal review notices and footer secondary text.
- **Deep Ink `#12262B`**: body/supporting text and menu border. This single neutral improves long-form contrast and separates explanation from Forest headings. It replaces V1 Slate.
- **Soft rule `#D0DDDB`**: approximately 20% Forest in White; decorative dividers only, never text, focus, control boundaries or information conveyed solely by a line.

There are no decorative secondary greens, gradients, photographs or shadows. Immutable supplied logo lettering retains Midnight `#101820` and Slate `#35434A`; supplied icon backgrounds retain Midnight. These are artwork colours, not general site tokens. Unused reversed assets also contain `#0C3B34` and `#C9D3D0`.

## 2. Contrast and interaction

Calculated using WCAG relative luminance by `node scripts/contrast.mjs`; raw evidence: [contrast.json](contrast.json).

- Forest/White, either direction: **8.52:1**. Headings, navigation, links, active underlines, status/stage strokes, CTA default/hover and focus on White/Forest.
- Deep Ink/White: **15.70:1**. Body/supporting text and menu boundary.
- Deep Ink/tint: **14.54:1**. Supporting text on pale sections/notices.
- Forest/tint, either direction: **7.89:1**. Tinted-section headings/links/focus and footer secondary text.
- Supplied logo Midnight/White: **17.89:1**; Slate/White: **10.23:1**; white icon/Midnight: **17.89:1**.
- Decorative rule/White **1.40:1**, rule/tint **1.29:1**. Grouping remains apparent from headings, spacing and document structure.

Meaningful text pairs exceed AA normal-text contrast; meaningful control/focus boundaries exceed 3:1. Focus is a 3px outline, offset 5px, switching to White on Forest. CTA hover/active reverses Forest/White; ordinary link hover thickens the underline. Current navigation has both underline and stronger weight. Status is explicit text. Automated checks are not a claim of complete WCAG conformance.

## 3. Logo roles and SVG findings

- Desktop header: unchanged `tarian-lockup-horizontal.svg`, 320px image frame including original internal clearspace.
- Header at 768px and below: unchanged `tarian-mark-green.svg`, 64px frame, accessible home-link name.
- About origin section: unchanged green mark, 80px frame.
- Footer: unchanged `tarian-mark-white.svg`, 72px frame on Forest.
- Browser/app icons: supplied `tarian-favicon.svg` and `tarian-app-icon.svg`, with local PNG rasterisations.
- Social card: exact supplied green mark paths in a separate project-authored White + Forest composition.
- Stacked/reversed lockups: retained, not placed in pages. Reversed stacked background is `#0C3B34`, so the white standalone mark avoids a mismatched rectangle without altering artwork.

All ten SVGs parse and fit their viewBoxes in installed Chrome. Horizontal lockups: 620 × 200; stacked: 440 × 360; marks: 100 × 100; app: 512 × 512; favicon: 64 × 64. Source/public copies are byte-identical. No scripts, handlers, raster images, foreignObject or external runtime references were found.

Four lockups contain live text with `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`, not outlines. Original declarations remain untouched; local font availability may change metrics. Each SVG contains a relatively large C2PA manifest, retained unchanged and not independently authenticated. Per-file colours, fonts, dimensions, bounds and SHA-256: [svg-inspection.json](svg-inspection.json). Rendered inventory: [logo-inspection.png](logo-inspection.png). No supplied artwork defect required correction.

## 4. Changes from V1

The pre-refinement implementation still used Green `#1F6B57`, Midnight `#101820`, Slate `#35434A`, Stone `#F3F1EB` and White, plus muted rule/geometry colours. It did not already implement a coherent Forest theme; the earlier separate palette exploration was not the active site.

The website now uses kit green `#13564D`, removes Stone from the canvas, changes Midnight sections to Forest and replaces Slate prose with Deep Ink. Supplied artwork colours are respected. Obsolete public approximations and font-substituted derivatives have been removed from production use.

The hero gives the approved headline more weight, with a fine outline instead of heavy decorative shield geometry. One full-Forest evidence section interrupts the white canvas deliberately, followed by white venture content, a pale contact invitation and Forest footer. Ventures retain open typographic rows, with a status stroke replacing an enclosing badge. Approach uses separated numbered markers and a stronger rule before “Scale or stop”; no arrows or continuous success path. Substantive copy is unchanged.

## 5. Responsive decisions

1440px uses generous margins and a two-column hero with a three-line headline. Ventures place headings/status beside explanation; Approach separates number, title and prose.

At 768px and below the layout switches to a compact mark/menu, hides decorative hero geometry and stacks content. It does not squeeze desktop navigation/artwork into tablet width. Mobile venture statuses remain with their headings in reading order. Approach retains its number column, with prose below each heading. Footer navigation/statutory fields stack.

At 375px the hero headline wraps to four lines; at 320px to five. There are no manual headline breaks. The CTA remains a distinct target. Email addresses may wrap instead of overflowing. Legal prose remains unboxed apart from its review notice. Reflow tests cover eight route cases at 1440, 768, 375 and 320px and enlarged root text at 640px.

## 6. Critical assessment and compromises

Captured layouts have consistent alignment and readable hierarchy, without visible overlap. Venture rows avoid a SaaS feature-grid treatment. Approach preserves conditional language. About and Contact use the same system without added decorative assets.

- The desktop outline still resembles an oversized identity mark. Human review should judge whether it earns its space or whether a typography-only hero would be stronger.
- The compact header gives a clear shield and usable menu but loses the immediate full company name on inner pages. This is the principal responsive brand compromise.
- Forest can suggest consultancy or investment management. Business/technology copy and the absence of nature imagery help, but the intended venture-studio character still needs human judgment.
- The supplied desktop lockup has generous clearspace and small secondary lettering. “VENTURES” is deliberately understated rather than competing with the headline.
- Live SVG lettering can vary across systems. Outlining requires a separately approved source, not silent modification here.
- The mobile footer is tall because unverified company/legal fields remain visible. They were not trimmed from screenshots. Publication facts remain outstanding.
- Mobile pages remain long and editorial. Content is not hidden in accordions. Judge reading rhythm at normal device scale, not only a compressed full-page preview.

## 7. Human design judgments requested

Review the desktop/mobile hero first: headline/outline balance, mark-only compact identity and the amount of Forest. Then judge whether Ventures reads as a coherent portfolio and “Scale or stop” feels like a real decision. These are visual choices, not unresolved implementation errors.

## 8. Regression, privacy and performance

Astro/TypeScript: 25 files, zero errors/warnings/hints. Production build passed. All 14 Playwright tests passed: axe desktop/mobile, keyboard, no-JavaScript navigation, responsive reflow, enlarged text, reduced motion, internal links/assets, approved copy, metadata, CSP and provenance reconciliation.

No external page requests, cookies, localStorage/sessionStorage entries or unexpected console/page errors were observed. Architecture, security/publication controls and dependency set remain unchanged. Capture evidence: [capture-results.json](capture-results.json).

Home HTML: 5,846 bytes (2,141 gzip), versus V1 5,961 (2,181). Navigation JS: unchanged at 553 (318 gzip). CSS: 7,956 (2,302 gzip), versus 7,743 (2,298). Social PNG: 37,963 bytes versus 38,254; not an ordinary rendering request. Supplied SVGs are around 8–9 KB each, largely retained metadata, adding weight compared with earlier small approximations. No metadata was stripped without authorisation. Runtime script cost is unchanged; total asset bytes are not claimed identical. No Lighthouse, deployed timing or real-device Core Web Vitals score is claimed. Safari/Firefox and screen-reader/device review remain human gates.

## 9. Screenshot inventory

Full-page:

- [Home desktop 1440](home-desktop-1440.png)
- [Home tablet 768](home-tablet-768.png)
- [Home mobile 375](home-mobile-375.png)
- [Home narrow mobile 320](home-mobile-320.png)
- [Ventures desktop 1440](ventures-desktop-1440.png)
- [Ventures mobile 375](ventures-mobile-375.png)
- [Approach desktop 1440](approach-desktop-1440.png)
- [Approach mobile 375](approach-mobile-375.png)
- [About desktop 1440](about-desktop-1440.png)
- [About mobile 375](about-mobile-375.png)
- [Contact desktop 1440](contact-desktop-1440.png)

Viewport-only:

- [Home hero 1440 × 1000](home-hero-desktop-1440.png)
- [Home hero 375 × 812](home-hero-mobile-375.png)

## 10. Reproduction and next gate

Build with `ASTRO_TELEMETRY_DISABLED=1 npm run build`; serve with `node scripts/serve-built.mjs`; run `node scripts/review-brand.mjs` and `node scripts/contrast.mjs`. Regression suite: `npm test`. Chrome is needed for review tools, not production builds.

No merge, push or deployment is part of this work. The next gate is human visual/design review; existing legal/domain/publication prerequisites apply separately.
