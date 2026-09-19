import { createHash } from 'node:crypto';
import { organizationJson, site } from './site';
const hash = createHash('sha256').update(organizationJson).digest('base64');
export const securityHeaders = `/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
${site.publicationReviewed ? '' : '  X-Robots-Tag: noindex, nofollow\n'}
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

https://:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow

https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow
`;
