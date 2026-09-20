# Azure hosting preparation

20 September 2026. Hosting target changed from Cloudflare Pages to Azure Static Web Apps at the user's request. Cloudflare remains the domain registrar/DNS provider.

## Verified reference setup

Read-only Azure inspection found subscription `Azure subscription 1`, resource group `altgrc-public-web-prod_group`, and Static Web App `altgrc-public-web-prod`. It uses the Free tier in Central US. Its resource reports no repository connection, branch or custom domains. The resource group's location is West Europe; the app's own location is Central US.

Tarian should use a separate Static Web App and resource group in the same subscription, following this model. No changes were made to AltGRC. No Tarian cloud resources or deployment were created in this preparation pass.

## Prepared build

Build with the pinned project runtime and `npm ci`, then `npm run build`. Deploy `dist/` as prebuilt static output. The build now emits Azure's `staticwebapp.config.json` with the same global CSP and security headers as the existing Cloudflare configuration, review noindex, fingerprinted asset caching and a branded 404 response. No SPA fallback is configured. No API/backend or application settings are needed.

Azure configuration reference: https://learn.microsoft.com/en-us/azure/static-web-apps/configuration

The local suite checks Azure configuration parity; local browser checks do not emulate Azure routing or prove deployed response headers. A hosted preview must still verify direct routes, genuine 404 status, CSP, headers, requests, cookies and storage.

## Remaining publication inputs

- Confirm the production domain and any apex/www redirect preference.
- Confirm statutory company details and both published mailboxes.
- Confirm enquiry processing, email provider and retention arrangements for the privacy notice.
- Keep `publicationReviewed` false until those facts and hosted behaviour are verified.
- Review indexing separately for preview/default Azure hostnames before enabling public indexing; the old Cloudflare hostname-specific rules do not apply to Azure.

Do not connect a live custom domain or remove review controls before these checks. Keep deployment credentials out of the repository and terminal output.
