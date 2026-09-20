/** Public build-time configuration. Never put secrets here.
 * Null means unverified. Populate only from confirmed company records.
 * Keep publicationReviewed false until legal copy and deployed behaviour are reviewed.
 */
interface SiteConfiguration {
  productionOrigin: string | null;
  publicationReviewed: boolean;
  company: {
    registeredName: string | null;
    number: string | null;
    registeredOffice: string | null;
    jurisdiction: string | null;
  };
  contact: { general: string; ventures: string };
}
export const site: SiteConfiguration = {
  productionOrigin: null,
  publicationReviewed: false,
  company: {
    registeredName: null,
    number: null,
    registeredOffice: null,
    jurisdiction: null,
  },
  contact: {
    general: 'hello@tarianventures.co.uk',
    ventures: 'ventures@tarianventures.co.uk',
  },
};
export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/ventures/', label: 'Ventures' },
  { href: '/approach/', label: 'Approach' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];
export const publicRoutes = [...navigation.map(({ href }) => href), '/compute/', '/privacy/', '/cookies/'];
export const organizationJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tarian Ventures',
  ...(site.productionOrigin ? { url: site.productionOrigin } : {}),
});
export function validateConfiguration() {
  if (site.productionOrigin) {
    const url = new URL(site.productionOrigin);
    if (url.protocol !== 'https:' || url.origin !== site.productionOrigin) {
      throw new Error('productionOrigin must be an HTTPS origin without a trailing slash or path.');
    }
  }
  if (site.publicationReviewed && (!site.productionOrigin || Object.values(site.company).some(value => !value?.trim()))) {
    throw new Error('Publication requires a verified production origin and all statutory fields.');
  }
}
validateConfiguration();
