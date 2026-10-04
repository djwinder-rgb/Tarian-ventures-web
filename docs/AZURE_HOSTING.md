# Azure hosting and release preparation

Updated 4 October 2026.

## Verified Tarian resource

- Subscription: Azure subscription 1 (`597d64e5-20da-4cef-aacb-ebca54f66d0e`).
- Resource group: `tarian-public-web-prod_group`.
- Static Web App: `tarian-public-web-prod`, Free tier.
- Review URL: https://ashy-mud-035919310.1.azurestaticapps.net/
- Reviewed website source: commit `b517061` on `codex/venture-outreach`.
- Current build deployed successfully on 3 October 2026; Azure environment reports Ready.

Tarian uses its own resource. AltGRC's established production pipeline targets `purple-hill-0befdc203.7.azurestaticapps.net`; the similarly named AltGRC resource in this CLI subscription is a different instance. Do not use it as the production deployment destination.

## Validation

Astro check/build and 18 local Playwright tests passed. The same 18 tests passed against the actual Azure review URL. Checks cover routes, missing-page HTTP 404, security headers, metadata, links/assets, accessibility, responsive reflow, keyboard navigation, reduced motion, JavaScript-disabled behaviour, and absence of cookies/storage/external requests in the tested pages. The deployed CSP hash matches the current build. Physical-device testing remains for the owner.

Run the hosted suite after future deployments:

```sh
TARIAN_TEST_BASE_URL=https://ashy-mud-035919310.1.azurestaticapps.net npm test
```

The suite allows only the known Azure and Tarian custom hostnames. The local suite remains `npm run validate`. Build output is `dist/`; deploy it as prebuilt static output with no API. The Azure deployment credential was read directly into process memory and never persisted or printed.

## Domain setup — 4 October 2026

Cloudflare sign-in verified. Added three records only:

- TXT at `@`: current Azure ownership value (read from hostname list).
- DNS-only CNAME at `@`: `ashy-mud-035919310.1.azurestaticapps.net`, flattened by Cloudflare.
- DNS-only CNAME at `www`: same Azure hostname.

The apex uses TXT validation. The www Azure binding was switched to CNAME delegation, avoiding a conflicting TXT and CNAME at the same subdomain. Original IONOS MX, SPF, DKIM, DMARC and other existing records were preserved. Authoritative Cloudflare DNS and the 1.1.1.1 public resolver return the new records. Cloudflare is DNS-only for website traffic; no proxy, analytics or additional service was enabled.

Azure still reports both domains as Validating with no error; certificate provisioning and local resolver propagation are pending. Do not bypass TLS certificate checks. Once both names are validated and HTTPS is working, set `tarianventures.com` as the default in Azure Custom domains. Then test www and generated-host redirects, preserving paths/query strings, and run the full suite on the primary domain. No default-domain redirect has yet been set.

References: https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external and https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-default .

## Final launch gate

The owner requested policy review last. Policies and review labels are unchanged. `publicationReviewed` remains false: deployed headers and meta remain noindex, robots disallows crawling and sitemap contains no public entries. A review URL is publicly reachable; noindex is not access control.

After domain tests and the owner's manual check, review the privacy/cookie details together, remove the editorial notices, set publicationReviewed true, build and deploy the final release, then rerun the suite on https://tarianventures.com. Verify redirects from www and Azure and check actual robots/sitemap/canonical output. No public-launch declaration until these gates pass.

Manual check: open on a phone and desktop/Safari; navigate every page; try the mobile menu and animation pause; confirm email links open the correct address; check the logo and readable layout. Review policy content separately at the final step.
