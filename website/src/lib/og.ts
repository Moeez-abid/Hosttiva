// Per-page Open Graph images (1200×630), rendered at build time by src/pages/og/[...slug].png.ts.
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COMPARISONS } from '../data/compare';

export interface OgEntry { slug: string; title: string; subtitle: string; section: string }

/** Static pages that get their own share image. Paths without leading slash; 'home' is "/". */
export const STATIC_OG: OgEntry[] = [
  { slug: 'pricing', title: 'Plans with the renewal price on the label', subtitle: 'Web, WordPress, applications, agency and game-server plans.', section: 'Pricing' },
  { slug: 'about', title: 'Hosttiva hosts it. Inventomo builds it.', subtitle: 'The hosting and cloud division of Inventomo.', section: 'Our story' },
  { slug: 'marketplace', title: 'Services with a defined scope', subtitle: 'Launch, migration, AI, automation and care services.', section: 'Marketplace' },
  { slug: 'agencies', title: 'Grow your agency with Hosttiva', subtitle: 'Reseller hosting, white-label tools and custom builds.', section: 'For agencies' },
  { slug: 'trust', title: 'What we can show you today', subtitle: 'Security, backups, responsible disclosure and email compliance.', section: 'Trust Center' },
  { slug: 'roadmap', title: 'What shipped, and what is next', subtitle: 'Releases, improvements and upcoming features.', section: 'Product updates' },
  { slug: 'customer-success', title: 'Help that starts before you sign up', subtitle: 'Migration, onboarding, support and technical reviews.', section: 'Customer success' },
  { slug: 'blog', title: 'Notes from the people who run the servers', subtitle: 'Guides on hosting, email, VPS, AI and agencies.', section: 'Blog' },
  { slug: 'tutorials', title: 'Step by step, start to finish', subtitle: 'Guides to launch, manage and grow online.', section: 'Tutorials' },
  { slug: 'status', title: 'Service status', subtitle: 'Live status, scheduled maintenance and incident history.', section: 'Status' },
  { slug: 'knowledgebase', title: 'How can we help?', subtitle: 'Help articles for every Hosttiva service.', section: 'Knowledge Base' },
  { slug: 'compare', title: 'Which hosting do you need?', subtitle: 'Shared, VPS, cloud, WordPress and app hosting compared.', section: 'Compare' },
  { slug: 'plan-finder', title: 'Find your plan', subtitle: 'Four questions, one recommendation with both prices.', section: 'Plan finder' },
  ...COMPARISONS.map((c) => ({ slug: `compare/${c.slug}`, title: c.title, subtitle: c.intro, section: 'Compare' })),
  { slug: 'contact', title: 'Talk to a person', subtitle: 'Plan advice, migrations, Inventomo projects and support.', section: 'Contact' },
];

export const PRODUCT_OG: OgEntry[] = PRODUCTS.map((p) => ({
  slug: p.slug,
  title: p.name,
  subtitle: p.headline,
  section: p.status === 'coming-soon' ? `${CATEGORIES[p.category].label} · Coming soon` : CATEGORIES[p.category].label,
}));

const OG_PATHS = new Set([...STATIC_OG, ...PRODUCT_OG].map((e) => `/${e.slug}`));

/** Share image for a page path, or null when the page uses the site default. */
export function ogFor(path: string): string | null {
  if (path.startsWith('/blog/') && !path.startsWith('/blog/category')) return `/og${path}.png`;
  if (path.startsWith('/tutorials/') || path.startsWith('/knowledgebase/')) return `/og${path}.png`;
  return OG_PATHS.has(path) ? `/og${path}.png` : null;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap by approximate character width. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,.;:]*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

export function ogSvg(e: OgEntry): string {
  const titleSize = e.title.length > 42 ? 76 : e.title.length > 26 ? 92 : 112;
  const titleLines = wrap(e.title, titleSize >= 112 ? 17 : titleSize >= 92 ? 22 : 27, 3);
  const subLines = wrap(e.subtitle, 58, 2);
  const font = "-apple-system, 'SF Pro Display', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";
  const titleTop = 630 - 96 - subLines.length * 44 - 36 - (titleLines.length - 1) * titleSize * 1.05;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f5f7"/>
  <g transform="translate(80,72) scale(1.5)"><path d="M16 0c9.9 0 13.1 0 14.6 1.4C32 2.9 32 6.1 32 16s0 13.1-1.4 14.6C29.1 32 25.9 32 16 32s-13.1 0-14.6-1.4C0 29.1 0 25.9 0 16S0 2.9 1.4 1.4C2.9 0 6.1 0 16 0Z" fill="#0071e3"/><path d="M10.5 8.5v15M21.5 8.5v15M10.5 16h11" stroke="#fff" stroke-width="3.2" stroke-linecap="round" fill="none"/></g>
  <text x="142" y="108" font-family="${font}" font-size="30" font-weight="600" fill="#1d1d1f" letter-spacing="-0.8">Hosttiva <tspan font-weight="400" font-size="22" fill="#6e6e73" letter-spacing="0">by Inventomo</tspan></text>
  <text x="1120" y="106" text-anchor="end" font-family="${font}" font-size="24" font-weight="600" fill="#0066cc">${esc(e.section)}</text>
  ${titleLines.map((l, i) => `<text x="76" y="${titleTop + i * titleSize * 1.05}" font-family="${font}" font-size="${titleSize}" font-weight="700" fill="#1d1d1f" letter-spacing="${-titleSize * 0.035}">${esc(l)}</text>`).join('\n  ')}
  ${subLines.map((l, i) => `<text x="80" y="${630 - 96 - (subLines.length - 1 - i) * 44}" font-family="${font}" font-size="32" fill="#6e6e73" letter-spacing="-0.5">${esc(l)}</text>`).join('\n  ')}
</svg>`;
}
