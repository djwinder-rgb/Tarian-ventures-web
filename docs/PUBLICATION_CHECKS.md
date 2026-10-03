# Deployment preparation update — 3 October 2026

The current reviewed build is now deployed to https://ashy-mud-035919310.1.azurestaticapps.net/ and all 18 automated tests passed against Azure. Source commit b517061 is saved and pushed. This supersedes earlier statements below that the local build has not been deployed. It is still a review release with noindex, review labels and draft policy notices.

Azure ownership checks for the apex and www domains are prepared; Cloudflare sign-in is required before DNS work can continue. No DNS/email changes have been made. The owner requested policies be reviewed together last, after technical preparation. See AZURE_HOSTING.md for the exact next steps and manual checklist.

---

# Launch readiness review — 3 October 2026

Current verdict: design and core content ready; public launch awaits the items below. This section supersedes older unresolved-question lists. Do not re-request the owner confirmations recorded on 1 October.

## Verified in this review

- Astro check and build passed; all 18 Playwright tests passed, covering routes, links/assets, accessibility, responsive layout, navigation, reduced motion, metadata and local cookies/storage/network behaviour. Desktop home screenshot reviewed. Browser automation is Chromium; physical-device and other-browser checks remain outstanding.
- The copy accurately describes a founder-led venture-development umbrella, Compute as the current research priority and AltGRC as in development. No investment/customer success claims need inventing. No further video or imagery work is required for launch.
- The Business Wales source still supports the Compute page's November 2025 announcement and Newport-to-Bridgend geography: https://businesswales.gov.wales/news-and-blog/second-ai-growth-zone-wales-announced .
- Company identity, registered office, jurisdiction and contact addresses are populated from owner confirmations.
- DNS nameservers are Cloudflare; MX records point to IONOS, with an IONOS SPF record. This confirms DNS configuration, not delivery; send/receive testing is owner-confirmed.
- Neither tarianventures.com nor www.tarianventures.com resolves to a website. Azure tarian-public-web-prod has no custom domain and no linked repository. Its default hostname is reachable, but the current local build has not been published in this review.

## Required before public launch

1. Complete the privacy provider verification: exact IONOS email product, processing/transfer safeguards and backup lifecycle; Azure service logging/access and retention; final Cloudflare DNS-only/proxy role. Update the affected privacy paragraphs and cookie-policy hosting reference. Do not replace unknown facts with blanket assurances or claim UK-only processing.
2. Remove privacy/cookie draft notices and the footer review label once the release checks are complete. publicationReviewed remains false; it currently controls the noindex headers/meta, robots and sitemap behaviour.
3. Publish a versioned, reviewed build to the existing Tarian Azure resource. Connect tarianventures.com, issue/verify HTTPS, and configure www to redirect to the primary address while preserving paths and query strings. Preserve all working IONOS DNS records.
4. Check the actual hosted site: all pages, real 404s, security headers, browser errors, cookie/storage behaviour, email links and social-image URL. Spot-check Safari and an actual phone.
5. Enable indexing for the final release, verify canonical URLs/robots/sitemap, and address the Azure default hostname so it does not become an unintended duplicate.

## Before outbound outreach

Record the proportionate legitimate-interest assessment and operational retention/suppression process already agreed by the owner. This is an outreach prerequisite, distinct from a website design defect.

## Useful small improvement

Add a direct link from the AltGRC venture entry to the newly updated https://www.altgrc.com while retaining the enquiry route. This makes the product-family relationship easier to explore, but is not a launch blocker. Analytics, video, case studies and a CMS are not required at this stage.

---

# Updated owner confirmations — 1 October 2026

This update supersedes the unresolved owner questions in the historical checklist below. The owner confirmed England and Wales registration; tarianventures.com as primary with www to redirect; IONOS email tested for send/receive; Dan as sole mailbox/record user and privacy contact; local secure spreadsheets and Apple Mail; IONOS backups; no enquiry sharing or AI-tool use; deletion of closed enquiries within 12 months of substantive contact and unanswered outreach within 12 months of last outreach, including local copies unless documented retention is needed; annual review of active relationships; minimal suppression records; adopted rights/complaints process; current ICO fee exemption (owner-reported).

Outreach is individually selected, UK incorporated organisations only, using business contacts from public LinkedIn profiles/company websites, introductions and existing contacts, without purchased lists, newsletters or bulk campaigns. First messages will identify Tarian, link the notice and offer an opt-out. Check the actual email subscriber, not only the person's employer: do not assume a personal email account is a corporate subscription.

Current remaining work: verify service-specific IONOS processing/backup settings (do not confuse optional long-term archiving with routine backup), Azure logs and processing, Cloudflare proxy/DNS role and applicable transfer safeguards. Record the legitimate-interest assessment before outreach. Then complete policy wording, remove pre-launch notices, configure www redirection and release/indexing settings, and walk the owner through deployment in stages. No deployment or redirect has been performed. publicationReviewed remains false.

Privacy page now contains the owner-confirmed policy with provider-verification limits explicitly marked. Source for outreach drafting: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing . IONOS optional archiving documentation is not evidence of this account's backup settings: https://www.ionos.co.uk/help/email/email-archiving/email-archiving-via-imap/ .

---

# Publication checks — 25 September 2026

The supplied company name, number and registered office are populated. Jurisdiction remains unconfirmed. Current edits are local review work, not deployed to Azure. The privacy and cookie pages now contain substantive review drafts rather than placeholder outlines.

Email update — 29 September 2026: the user confirmed that hello@tarianventures.com and ventures@tarianventures.com have been set up. These replace the earlier .co.uk addresses throughout the site. The actual provider, any forwarding destination and sending arrangements remain unconfirmed; do not assume Cloudflare was selected. Receipt and reply testing has not been independently performed. This confirmation does not establish the production website domain.

## Decisions and confirmations still needed

1. Confirm registration jurisdiction from company records.
2. Confirm the primary domain, apex/www preference and any secondary-domain redirects.
3. Email setup is user-confirmed. Confirm who monitors the addresses, the provider, and whether hello@tarianventures.com is the privacy contact. Test receipt and reply before launch.
4. Identify everyone and every service with access to enquiries, including forwarding, CRM, backups, AI tools and advisers. Confirm whether outreach uses public sources, referrals or mailing lists. The draft covers direct enquiries; additional processing needs accurate wording before it starts.
5. Approve actual enquiry purposes and document a proportionate legitimate-interest assessment. Adopt a retention/deletion schedule and a privacy-rights and complaints process. The draft's 12-month closed-enquiry period is a proposal, not an established fact or a universal legal deadline. Define separate treatment for active relationships, contractual records, complaints, logs and backups.
6. Confirm configured Azure/email logging, retention, processing locations, provider agreements and any applicable international-transfer mechanism. An Azure resource-group location alone does not establish where all processing occurs. Confirm Cloudflare's DNS/proxy role; recheck any provider-added functionality.
7. Complete the ICO fee self-assessment and record whether payment or an exemption applies. A website policy does not determine fee status.

## Final technical and content checks

- Review the revised outreach pages and these policy drafts. Optional imagery and AI video are not launch requirements; AI video exploration has been cancelled.
- Apply confirmed policy facts, remove editorial draft notes and populate the production origin. Keep publicationReviewed false until prerequisites are complete.
- Deploy the reviewed build to Azure and verify HTTPS, custom domains, redirects, every direct page, genuine 404 responses, security headers, browser requests, cookies and storage. Recheck privacy claims on the final hostname, not just locally.
- Complete a real-device/mobile and cross-browser spot check, including email links and reduced-motion behaviour. Existing automated Chromium checks do not replace these.
- Enable indexing only on the intended public site, then verify canonical URLs, social previews, robots and sitemap. Review the default Azure hostname separately so it does not become an unintended indexed duplicate.

## Drafting sources

Official guidance consulted on 25 September 2026. These sources support the drafting approach; they do not verify Tarian's operational practices.

- [ICO: privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/)
- [ICO: legitimate interests](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/legitimate-interests/)
- [ICO: data protection rights](https://ico.org.uk/global/privacy-notice/your-data-protection-rights/)
- [ICO: complaints handling](https://ico.org.uk/for-the-public/how-to-make-a-data-protection-complaint/)
- [ICO: international transfers](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/)
- [ICO: storage and access technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/)
- [ICO: fee self-assessment](https://ico.org.uk/fee-checker)
- [Microsoft: Static Web Apps FAQ](https://learn.microsoft.com/en-us/azure/static-web-apps/faq)
