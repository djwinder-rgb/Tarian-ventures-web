import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => new Response(
  site.publicationReviewed && site.productionOrigin
    ? `User-agent: *\nAllow: /\nSitemap: ${site.productionOrigin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
