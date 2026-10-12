// Paths excluded from sitemap.xml and marked noindex (placeholders / coming soon).
// Imported by astro.config.mjs — keep imports relative.
import { PLANNED_PAGES } from '../data/pages';
import { PRODUCTS } from '../data/products';

export const NOINDEX_PATHS: string[] = [
  ...PLANNED_PAGES.map((p) => `/${p.slug}`),
  ...PRODUCTS.filter((p) => p.status === 'coming-soon').map((p) => `/${p.slug}`),
  '/404',
];
