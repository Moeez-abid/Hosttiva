// Builds llms.txt / llms-full.txt from the same data that renders the site.
import { SITE, LINKS } from '../config/site';
import { PRODUCTS, CATEGORIES, PRODUCT_CATEGORIES, type CategoryId } from '../data/products';
import { PLAN_GROUPS, PRICES_ARE_PLACEHOLDERS, formatPrice } from '../data/plans';

const abs = (slug: string) => `${SITE.url}/${slug}`;
const live = PRODUCTS.filter((p) => p.status !== 'coming-soon');
const cats: CategoryId[] = [...PRODUCT_CATEGORIES, 'solutions'];

export function llmsTxt(full = false): string {
  const out: string[] = [
    `# ${SITE.fullName}`,
    '',
    `> ${SITE.description} Hosttiva is the hosting and cloud division of Inventomo. Hosttiva hosts your technology; Inventomo helps you create it.`,
    '',
    '## Company',
    `- [Home](${SITE.url}/): ${SITE.tagline}`,
    `- [Contact](${SITE.url}/contact): sales, migration, Inventomo projects and support routes`,
    `- [Inventomo](${SITE.inventomoUrl}): parent company (design, development, AI integration, automation)`,
    '',
  ];
  for (const c of cats) {
    const items = live.filter((p) => p.category === c);
    if (!items.length) continue;
    out.push(`## ${CATEGORIES[c].label}`);
    for (const p of items) {
      out.push(`- [${p.name}](${abs(p.slug)}): ${p.headline}`);
      if (full) {
        out.push(`  ${p.summary}`);
        if (p.features?.length) out.push(`  Includes: ${p.features.join('; ')}.`);
        if (p.status === 'enquiry') out.push('  Availability: quote / consultation.');
      }
    }
    out.push('');
  }
  out.push('## Pricing', `- [All plans](${SITE.url}/pricing): first-term and renewal prices shown separately`);
  if (full) {
    out.push(PRICES_ARE_PLACEHOLDERS ? '  NOTE: prices are draft placeholders and not final.' : '');
    for (const g of PLAN_GROUPS) {
      out.push(`### ${g.name}`);
      for (const p of g.plans) {
        const price = p.price ? `${formatPrice(p.price.annual.promo)}/mo first term, renews ${formatPrice(p.price.annual.renewal)}/mo (annual)` : 'custom quote';
        out.push(`- ${p.name}${p.fit ? ` (${p.fit})` : ''}: ${p.features.join(', ')}. ${price}.`);
      }
    }
  }
  out.push(
    '',
    '## Support',
    `- [Client area](${LINKS.clientArea}): billing, services, domains and support tickets`,
    '',
    '## Not yet available',
    ...PRODUCTS.filter((p) => p.status === 'coming-soon').map((p) => `- ${p.name}: planned, not offered yet`),
    '',
    '## Optional',
    `- [Full details](${SITE.url}/llms-full.txt)`,
    `- [Sitemap](${SITE.url}/sitemap-index.xml)`,
    '',
  );
  return out.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
}
