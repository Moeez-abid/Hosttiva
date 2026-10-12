// JSON-LD builders. Keep claims factual: no ratings/reviews/offers until real.
import { SITE } from '../config/site';
import type { Faq } from '../data/products';

const abs = (path: string) => new URL(path, SITE.url).toString();

export const organization = () => ({
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: abs('/favicon.svg'),
  slogan: SITE.tagline,
  parentOrganization: { '@type': 'Organization', name: SITE.parent, url: SITE.inventomoUrl },
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: SITE.email },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.fullName,
  url: SITE.url,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: SITE.locale,
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const service = (o: { name: string; description: string; path: string; category: string }) => ({
  '@type': 'Service',
  name: o.name,
  description: o.description,
  url: abs(o.path),
  serviceType: o.category,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: 'Worldwide',
});

export const faqPage = (faqs: Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
