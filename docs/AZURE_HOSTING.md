# Azure hosting and release preparation

Updated 3 October 2026.

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

## Domain preparation — awaiting Cloudflare access

Azure ownership verification has been initiated for `tarianventures.com` and `www.tarianventures.com`; both are Validating. Cloudflare is currently at its sign-in screen. No DNS records have been changed. Existing IONOS MX/SPF and all other email records must be preserved.

Retrieve the current public verification values with `az staticwebapp hostname list -n tarian-public-web-prod -g tarian-public-web-prod_group`. Add the required TXT records at `@` and `www` respectively. Validate ownership first; use DNS-only CNAME records to the Azure hostname (Cloudflare apex flattening) for website routing when ready. Verify HTTPS before relying on either hostname.

After both custom names are validated and reachable, designate `tarianventures.com` as Azure's default domain. This should redirect www and the generated Azure hostname to the primary domain; verify status codes, path and query preservation. Do not enable a redirect before its destination works.

References: https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external and https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-default .

## Final launch gate

The owner requested policy review last. Policies and review labels are unchanged. `publicationReviewed` remains false: deployed headers and meta remain noindex, robots disallows crawling and sitemap contains no public entries. A review URL is publicly reachable; noindex is not access control.

After domain tests and the owner's manual check, review the privacy/cookie details together, remove the editorial notices, set publicationReviewed true, build and deploy the final release, then rerun the suite on https://tarianventures.com. Verify redirects from www and Azure and check actual robots/sitemap/canonical output. No public-launch declaration until these gates pass.

Manual check: open on a phone and desktop/Safari; navigate every page; try the mobile menu and animation pause; confirm email links open the correct address; check the logo and readable layout. Review policy content separately at the final step.
