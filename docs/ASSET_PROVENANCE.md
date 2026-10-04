# Asset provenance — implementation register

Updated 19 September 2026 for the authorised White + Forest refinement. The register in `guidance/ASSET_PROVENANCE.md` and earlier Git revisions remain the historical V1 record.

## Authoritative human-supplied kit

The user supplied and authorised these new SVGs, found under `logos/` and `icons/` at the pre-write gate:

- `logos/tarian-lockup-horizontal.svg` — desktop header.
- `logos/tarian-lockup-stacked.svg` and `logos/tarian-lockup-stacked-reversed.svg` — retained, not placed in pages.
- `logos/tarian-mark-green.svg` — compact header beside system-font TARIAN text, About and source paths for the social card. This responsive composition does not alter the SVG.
- `logos/tarian-mark-white.svg` — footer on Forest.
- Companion kit: `logos/tarian-lockup-horizontal-reversed.svg`, `logos/tarian-mark.svg`, `logos/tarian-mark-midnight.svg`, `icons/tarian-app-icon.svg`, `icons/tarian-favicon.svg` and `tarian-logo-kit/README.txt`.

Origin: human-supplied Tarian artwork, authorised as the replacement brand kit. Intended use: Tarian Ventures identity. This inspection does not independently authenticate ownership, trademarks or embedded provenance claims. No third-party stock asset or font binary was obtained.

All ten SVG sources are preserved byte-for-byte, including C2PA metadata. Canonical public copies are under `public/brand/logos/` and `public/brand/icons/`, with matching basenames. Regression checks compare source/public bytes. `review/brand-refinement/svg-inspection.json` records SHA-256, dimensions, viewBox, colours, fonts, metadata and measured bounds per file.

All SVGs parse and fit their viewBoxes in installed Chrome. No raster images, scripts, event handlers, foreignObject or external resource references were found. Four lockups contain live text with `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`; declarations remain untouched. System font availability can change rendering. Marks/icons use paths. C2PA manifests were retained, not independently authenticated.

Supplied green is `#13564D`. The horizontal lockup also contains `#101820` and `#35434A`; icon backgrounds are `#101820`. These immutable artwork colours are not additional CSS palette roles. Unused reversed lockups contain backgrounds `#101820` (horizontal) or `#0C3B34` (stacked), with `#C9D3D0` secondary lettering. They were not recoloured. The white standalone mark avoids a mismatched rectangular backdrop in the footer.

## Superseded V1 assets

Earlier shield approximations, system-font lockup derivatives and old favicon/app PNG copies were removed from `public/brand/`. No page references them. Older source files remain outside the public directory and in Git history; they are not authoritative for the current site. Earlier clipping observations apply to the old stacked artwork, not this new kit.

## Generated derivatives

`scripts/generate-social.mjs` renders locally with installed Chrome, without network resources:

- `public/brand/tarian-social.svg` and its 1200 × 630 PNG: approved headline, White + Forest, and the exact three path definitions from the supplied green mark. Composition and typography are project-authored; shield paths are unchanged. Intended use: Open Graph.
- `public/brand/icons/tarian-favicon-32.png`: rasterisation of the unchanged supplied favicon SVG.
- `public/brand/icons/tarian-app-icon-180.png` and `tarian-app-icon-512.png`: rasterisations of the unchanged supplied app-icon SVG.

No image model, downloaded artwork or new external licence was introduced. Derivatives inherit their supplied source lineage. Raster generation is not required during production builds.

## Decorative geometry and fonts

20 September outreach revision: `src/components/Network.astro` is original project-authored SVG geometry and CSS signal motion. It uses no third-party asset or animation library and depicts no real infrastructure. The previous `Geometry.astro` contour is no longer displayed. Master supplied logos and metadata remain unchanged. No founder portrait, AltGRC application screenshot or generated video was added; no approved source image was available and internal demonstration data was not exported. Future cinematic briefs are in `docs/VIDEO_DIRECTION.md` and do not constitute produced/licensed assets.

`src/components/Geometry.astro` contains project-authored shield-inspired outlines. Decorative, hidden from assistive technology and used only in the desktop homepage hero; never a replacement for the supplied logo.

Page text uses `Arial, sans-serif`. SVG text retains its supplied font stack. No font files/services are included. Future bundled fonts need an official source, version, licence and licence file recorded.

## Review artefacts and exclusions

PNG screenshots under `review/brand-refinement/` are local Chrome captures of the production build; `logo-inspection.png` renders supplied vectors for technical review. These are not website runtime assets.

No photography, third-party icon/illustration library or external visual asset is used. Future additions require recorded origin, rights and intended use. Current authority is `docs/WEBSITE_BRAND.md`; final evidence is in `review/final-refinement/FINAL_REFINEMENT_REVIEW.md`. The earlier brand-refinement pack remains historical review evidence. Final hero changes affect CSS presentation only; no source artwork or provenance metadata changed.
