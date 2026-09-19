import type { APIRoute } from 'astro';
import { publicRoutes, site } from '../config/site';
export const GET: APIRoute = () => {
  const urls = site.publicationReviewed && site.productionOrigin
    ? publicRoutes.map(route => `<url><loc>${new URL(route, site.productionOrigin!).href.replaceAll('&', '&amp;')}</loc></url>`).join('')
    : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
