# Tarian Ventures Website V1 — Codex Implementation Specification

## 1. Objective
Build a professional, fast, understated public website for Tarian Ventures that establishes credibility when prospective partners, public bodies, customers, suppliers or investors investigate the company.

The site must not imply that Tarian Ventures or its ventures are larger, more mature or operationally established than they are.

## 2. Brand
Use assets from `/brand/logos` and `/brand/icons`.
Colours: Midnight `#101820`, Slate `#35434A`, Tarian Green `#1F6B57`, Stone `#F3F1EB`, White `#FFFFFF`.
Primary typography: Inter with sensible local/system fallbacks.
Design: generous whitespace, strong typography, restrained green accents, subtle geometric shield-derived line work. No stock photography.

## 3. Technical approach
- Static-first site.
- React + Vite is acceptable; avoid adding a backend, database or CMS.
- Deployable to Cloudflare Pages.
- Responsive from small mobile through wide desktop.
- No third-party analytics, advertising, tracking pixels or non-essential cookies in V1.
- No externally hosted runtime fonts, images, icons or scripts unless explicitly approved.
- Prefer semantic HTML and CSS/SVG over decorative image files.
- Respect `prefers-reduced-motion`.
- No autoplaying animation.
- Keep dependencies minimal and justified.

## 4. Navigation
Home | Ventures | Approach | About | Contact

Footer: Privacy | Cookies, plus statutory company information.

## 5. Home
Hero:
**Building businesses around problems worth solving.**

Tarian Ventures identifies, validates and develops new technology and infrastructure ventures.

We focus on opportunities created by changing markets, emerging technologies and complex problems where better solutions can create meaningful value.

CTA: **Explore our ventures**

Section: **From opportunity to evidence**
Good ideas are easy to find. Evidence that they should become businesses is harder.

We take a disciplined approach to venture development: identify a problem, understand the market, test the assumptions that matter and progressively invest where the evidence supports it.

Our interests span technology, AI, infrastructure, governance and resilience.

Section: **Ventures**
We develop businesses independently and alongside partners with relevant expertise, assets or market access.

Our current work includes opportunities in AI infrastructure and governance technology.

CTA: **Explore our ventures**

Section: **Work with us**
We are interested in conversations with organisations, founders, technical specialists, investors and public-sector partners working on difficult problems or emerging opportunities.

CTA: **Start a conversation**

## 6. Ventures
# Ventures
We develop opportunities progressively, moving from research and validation through experimentation and, where the evidence supports it, into standalone ventures.

### Tarian Compute
**AI infrastructure**

Tarian Compute is exploring opportunities within the next generation of UK digital and AI infrastructure.

Current work is focused on the conditions required to develop commercially viable compute infrastructure, including power, connectivity, location, development partnerships and future demand.

Status treatment: **In development**

### AltGRC
**Governance technology**

AltGRC is a governance, risk and resilience technology platform developed to make complex organisational governance easier to understand and operate.

The platform brings together risk, controls, assurance, resilience and related governance activities within a common operating model.

Status treatment: **Developed by Tarian Ventures**

### New Ventures
Tarian Ventures continuously investigates new opportunities created by technological, regulatory, demographic and market change.

Ideas do not automatically become businesses. We test the underlying problem, market, economics and execution assumptions before committing significant capital or resources.

Where an opportunity survives that process, we build.

## 7. Approach
# Evidence before scale.

We believe new ventures should earn increasing levels of investment.

Rather than beginning with a predetermined solution, we start with the problem and progressively test whether a commercially attractive opportunity exists.

### Discover
We examine technological, regulatory, economic and societal change to identify problems and market gaps worth investigating.

### Validate
We test the assumptions that would need to be true for an opportunity to succeed: customer need, market structure, competition, economics, regulatory constraints and routes to market.

### Experiment
Where possible, we favour prototypes, pilots and real-world evidence over assumptions.

The objective is to learn quickly and inexpensively before committing significant capital.

### Build
When the evidence supports continued investment, we develop the technology, partnerships and operating capability required to turn the opportunity into a viable business.

### Scale or stop
Not every opportunity should become a company.

We are as interested in identifying reasons not to proceed as reasons to invest further. Capital and time move towards the opportunities where evidence continues to support the case.

## 8. About
# About Tarian Ventures

Tarian Ventures is an independent venture development company based in Wales.

We investigate, validate and develop opportunities across technology, infrastructure and complex regulated markets.

Our approach combines commercial analysis, technology development, governance and risk disciplines with rapid experimentation.

### Built in Wales. Looking outward.
Tarian takes its name from the Welsh word for shield.

Our roots are in Wales, but our ambitions and the markets we investigate extend well beyond it.

We are particularly interested in opportunities where technology intersects with infrastructure, resilience and significant market change.

### Founder
Tarian Ventures was founded by **Dan Winder**, a technology and risk leader with experience spanning technology delivery, governance, data, digital risk and enterprise transformation.

His career has included work across telecommunications, government services and regulated consumer businesses, alongside the development of independent technology ventures.

Tarian Ventures brings those disciplines together: understanding complex problems, testing assumptions and building practical solutions.

## 9. Contact
# Start a conversation.

We are interested in speaking with organisations and individuals working on significant problems, emerging technologies and new market opportunities.

This includes potential customers, development partners, technical specialists, infrastructure partners and investors.

Display:
**General enquiries** — hello@tarianventures.co.uk
**Partnerships and ventures** — ventures@tarianventures.co.uk

Do not add a server-side contact form in V1. Use accessible `mailto:` links.

## 10. Legal pages
Create Privacy and Cookies pages with clearly marked content areas. Privacy copy must accurately describe the actual V1 implementation and business enquiry processing; do not invent processors or retention periods. Cookies page should state the site's actual cookie behaviour after implementation.

Statutory footer fields must be configuration-driven/placeholders until verified:
- exact registered company name
- company number
- registered office
- jurisdiction

Do not invent these values.

## 11. SEO and metadata
- Unique page titles and descriptions.
- Canonical URLs using the production domain once configured.
- Open Graph metadata using a Tarian-owned generated brand card, not third-party imagery.
- `robots.txt` and sitemap.
- Favicon/app icons from supplied brand assets.
- Structured Organization data only for verified facts.
- No fabricated social profiles.

## 12. Accessibility
Target WCAG 2.2 AA-oriented implementation:
- semantic landmarks and heading hierarchy;
- keyboard-operable navigation;
- visible focus states;
- sufficient contrast;
- accessible mobile menu;
- meaningful link names;
- decorative SVGs hidden from assistive technology;
- motion reduction;
- responsive text without clipping at zoom.

## 13. Performance and security
Aim for excellent Lighthouse results without gaming the audit.
- Avoid layout shift.
- Minimise JS.
- Optimise SVG/CSS.
- No secrets in client code.
- Add appropriate static-site security headers where supported by Cloudflare configuration.
- No unnecessary third-party network requests.

## 14. Asset provenance
Maintain `/docs/ASSET_PROVENANCE.md`.
No third-party image may be added unless its origin, rights/licence and intended use are recorded and explicitly approved.

## 15. Acceptance criteria
The build is complete when:
1. All five primary pages plus Privacy/Cookies exist and are responsive.
2. Approved Tarian brand assets and colours are used consistently.
3. No third-party stock imagery is present.
4. No unapproved external runtime resources or trackers are present.
5. Mobile navigation is keyboard accessible.
6. Reduced-motion preference is honoured.
7. There are no broken links or placeholder lorem ipsum.
8. Company/legal facts that have not been verified remain explicit configuration placeholders, not invented content.
9. Production build completes cleanly.
10. README contains local development and Cloudflare Pages deployment instructions.
11. Asset provenance register is present.
12. A final implementation report lists dependencies, external requests, accessibility checks, performance checks and any unresolved decisions.

## 16. Codex working instruction
First inspect the repository and produce a short implementation plan. Then implement V1 in small coherent commits. Do not broaden scope, add a CMS/backend, add analytics, introduce stock imagery, or rewrite approved copy without recording the proposed change for human review.
