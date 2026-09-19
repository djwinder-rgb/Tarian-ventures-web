# Asset provenance — implementation register

This is the canonical V1 implementation register. The original supplied register remains unchanged at `guidance/ASSET_PROVENANCE.md` as historical/source documentation.

## Supplied source assets

- `logos/tarian-shield.svg`
- `logos/tarian-ventures-horizontal.svg`
- `logos/tarian-ventures-horizontal-reversed.svg`
- `logos/tarian-ventures-stacked.svg`
- `icons/favicon.svg`
- `icons/tarian-icon-32.png`
- `icons/tarian-icon-180.png`
- `icons/tarian-icon-512.png`

Origin and rights: created specifically for Tarian Ventures; Tarian Ventures project assets, as recorded in the supplied register. SVGs are deterministic vector recreations of the approved geometric shield direction. PNGs derive from that geometry. No separate third-party visual asset licence is asserted or required by the supplied pack.

The source files are preserved byte-for-byte. Matching public copies live under `public/brand/logos/` and `public/brand/icons/`, resolving the specification's URL-path requirement. An automated comparison checks the copies against the sources.

## Horizontal web wordmarks

`public/brand/logos/tarian-ventures-horizontal-system.svg` and `tarian-ventures-horizontal-reversed-system.svg` derive from the corresponding project-owned source SVGs. Their only change is replacing `Inter, Arial, sans-serif` with `Arial, sans-serif`, explicitly selecting the permitted fallback instead of relying on locally installed Inter. Shapes, colours, coordinates, viewBoxes and lettering are unchanged. The default header/footer use these derivatives.

No glyph outlines or font binaries were introduced. Minor platform font-rendering differences remain possible; the wording is not claimed to be outlined or universally pixel-identical. Horizontal text bounds and rendered appearance are checked. The stacked source is retained but not used by the site. Chromium measurement found its TARIAN text spans x = -4.52 to 104.52 in a 100-unit viewBox, and visual inspection confirmed clipping. No stacked-logo correction was needed because V1 uses the horizontal versions. The source remains unchanged.

## Social card

`public/brand/tarian-social.svg` is project-owned source artwork created for V1 from the exact supplied shield paths, approved palette and approved homepage headline. `public/brand/tarian-social.png` is its 1200 × 630 raster derivative, generated locally by `node scripts/generate-social.mjs` using installed Chrome and Arial. No image model, stock source, downloaded visual asset or remote request is involved. Intended use: Open Graph previews. Rights: Tarian Ventures project asset.

## Code-native geometry

`src/components/Geometry.astro` contains decorative shield-inspired line geometry in the approved palette, authored for this project. It is decorative, is not a replacement logo, and is hidden from assistive technology. No third-party source or licence.

## Fonts

No Inter file was supplied. V1 uses `Arial, sans-serif`, the fallback explicitly permitted by the brand guidelines and implementation authorisation. No font binary is bundled or downloaded; the visitor's system supplies the font. No font/CDN request is made. Any future bundled font requires a recorded official source, version, applicable licence and licence file before committing it.

## Exclusions and future changes

No photography, third-party icons, illustration library or other third-party visual assets are present. No third-party visual asset may be introduced without explicit human approval and recorded origin, rights/licence and intended use. Record future derivatives here and retain their source lineage.
