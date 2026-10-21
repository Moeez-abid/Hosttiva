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
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
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

export const blogPosting = (o: { title: string; description: string; path: string; published: Date; updated?: Date; author: string; section: string }) => ({
  '@type': 'BlogPosting',
  headline: o.title,
  description: o.description,
  url: abs(o.path),
  mainEntityOfPage: abs(o.path),
  datePublished: o.published.toISOString(),
  dateModified: (o.updated ?? o.published).toISOString(),
  articleSection: o.section,
  image: abs(SITE.ogImage),
  author: { '@type': 'Organization', name: o.author, url: SITE.url },
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: SITE.locale,
});

export const howTo = (o: { title: string; description: string; path: string; totalTime: string; requirements: string[]; steps: { name: string; anchor: string }[] }) => ({
  '@type': 'HowTo',
  name: o.title,
  description: o.description,
  url: abs(o.path),
  totalTime: o.totalTime,
  ...(o.requirements.length ? { supply: o.requirements.map((r) => ({ '@type': 'HowToSupply', name: r })) } : {}),
  step: o.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.name, url: `${abs(o.path)}#${s.anchor}` })),
});

export const techArticle = (o: { title: string; description: string; path: string; updated: Date; section: string }) => ({
  '@type': 'TechArticle',
  headline: o.title,
  description: o.description,
  url: abs(o.path),
  mainEntityOfPage: abs(o.path),
  dateModified: o.updated.toISOString(),
  articleSection: o.section,
  author: { '@id': `${SITE.url}/#organization` },
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: SITE.locale,
});
