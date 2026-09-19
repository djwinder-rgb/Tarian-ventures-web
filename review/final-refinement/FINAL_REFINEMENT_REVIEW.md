# Final visual refinement

19 September 2026 · **READY FOR FINAL HUMAN REVIEW**

Human review approved White + Forest and the overall design. This pass changes only the desktop decorative shield and compact header identity; substantive copy, master logos and other page compositions are unchanged.

- **Hero before/after:** existing contour was 100% column width and fully opaque. It is now 80% width, centred in the same column, at 50% opacity. Paths, stroke definitions, headline sizing and column layout are unchanged. The contour remains visible but subordinate to the headline. It is decorative and `aria-hidden`, with no meaning dependent on contrast.
- **Mobile header:** unchanged supplied green mark plus 16px, lightly spaced TARIAN lettering. Full accessible link name is retained. Desktop lockup is unchanged. This avoids unreadably small secondary lettering from shrinking the full lockup.
- **Authoritative palette:** Forest `#13564D`, White `#FFFFFF`, Pale Forest `#F3F7F6`, Deep Ink `#12262B`, Decorative Rule `#D0DDDB`. Roles are formalised in [WEBSITE_BRAND.md](../../docs/WEBSITE_BRAND.md).
- **Responsive:** 1440, 1024, 768, 390, 375 and 320px passed overflow checks. Compact brand/Menu bounds do not overlap; Menu targets are at least 44 × 44px. Open/Escape/focus behaviour passed at every compact width. Observed layout-shift sum was zero at all six widths in local Chrome; this is not a deployed field-performance claim. Headline wrapping is unchanged. Raw evidence: [responsive-results.json](responsive-results.json).
- **Accessibility:** brand text and light-surface focus use Forest/White, 8.52:1. Menu boundary uses Ink/White, 15.70:1. Other meaningful palette pairs remain at least 7.89:1. Decorative opacity does not affect text or controls. Axe, keyboard, no-JavaScript navigation, 200% text enlargement and reduced motion checks passed.
- **Regression:** production build and all 14 Playwright tests passed. Copy, metadata, CSP, internal assets and source/public byte identity passed. Zero unexpected external requests, application cookies or browser-storage entries observed.
- **Remaining judgment:** approve the quieter contour and mobile lettering at normal display scale. No new visual blocker found. Existing live-SVG font variability, cross-browser/device review and legal/domain publication prerequisites remain. No merge or deployment performed.

## Screenshots

- [Desktop hero 1440](home-hero-desktop-1440.png)
- [Desktop full page 1440](home-desktop-1440.png)
- [Mobile header 390](home-header-mobile-390.png)
- [Mobile header 375](home-header-mobile-375.png)
- [Mobile header 320](home-header-mobile-320.png)
- [Mobile full page 375](home-mobile-375.png)

Compare with the preserved [previous desktop hero](../brand-refinement/home-hero-desktop-1440.png). Captures use unchanged page content from the production build, without browser chrome.
