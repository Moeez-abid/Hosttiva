// Navigation built from data files (SRS sections 2 and 5). Nothing hand-listed twice.
import {
  CATEGORIES,
  PRODUCT_CATEGORIES,
  SOLUTIONS_NAV,
  getProduct,
  productsIn,
  type Product,
} from '../data/products';
import { LINKS, SITE, PRELAUNCH } from './site';

export interface NavLink { label: string; href: string; soon?: boolean; external?: boolean; desc?: string; icon?: string }

const link = (p: Product): NavLink => ({
  label: p.name,
  href: `/${p.slug}`,
  soon: p.status === 'coming-soon',
  desc: p.headline,
  icon: p.icon,
});
const bySlug = (slug: string) => link(getProduct(slug)!);

export const PRODUCTS_MENU = PRODUCT_CATEGORIES.map((c) => ({
  id: c,
  label: CATEGORIES[c].label,
  blurb: CATEGORIES[c].blurb,
  items: productsIn(c).map(link),
}));

export const SOLUTIONS_MENU: NavLink[] = [
  ...SOLUTIONS_NAV.map(bySlug),
  { label: 'Solutions Marketplace', href: '/marketplace', desc: 'Fixed-scope setup, migration, AI and care services.', icon: 'Package' },
  { label: 'For Agencies', href: '/agencies', desc: 'Hosting, white-label tools and partner programs for agencies.', icon: 'Building2' },
];

export const RESOURCES_MENU: NavLink[] = [
  { label: 'Blog', href: '/blog', desc: 'Expert tips, product updates, and customer stories.', icon: 'Newspaper' },
  { label: 'Product Updates', href: '/roadmap', desc: 'Releases, improvements and maintenance notices.', icon: 'GitCommitHorizontal' },
  { label: 'Our Story', href: '/about', desc: 'The people and vision behind Hosttiva.', icon: 'BookOpen' },
  { label: 'Contact', href: '/contact', desc: 'Help choosing a plan or moving your website.', icon: 'MessagesSquare' },
  { label: 'Customer Success', href: '/customer-success', desc: 'Migration, onboarding, support and reviews.', icon: 'LifeBuoy' },
  { label: 'Compare hosting', href: '/compare', desc: 'Shared, VPS, cloud, WordPress and app hosting side by side.', icon: 'Columns3' },
  { label: 'Plan finder', href: '/plan-finder', desc: 'Four questions, one recommended plan.', icon: 'Compass' },
  { label: 'Knowledge Base', href: '/knowledgebase', desc: 'Help articles for every Hosttiva service.', icon: 'LifeBuoy' },
  { label: 'Tutorials', href: '/tutorials', desc: 'Step-by-step guides to launch and grow.', icon: 'ListChecks' },
  { label: 'Hosttiva Academy', href: '/academy', desc: 'Practical video guides.', icon: 'GraduationCap', soon: true },
  { label: 'Learning Lab', href: '/learning-lab', desc: 'Guided learning paths.', icon: 'FlaskConical', soon: true },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Hosting',
    links: [
      bySlug('hosting/web'),
      { ...bySlug('hosting/wordpress'), label: 'WordPress Hosting' },
      bySlug('hosting/cloud'),
      bySlug('hosting/vps'),
      bySlug('hosting/dedicated'),
      { ...bySlug('hosting/game-servers'), label: 'Game Hosting' },
      bySlug('solutions/reseller'),
    ],
  },
  {
    title: 'Domains & Email',
    links: [
      bySlug('domains/register'),
      bySlug('domains/transfer'),
      bySlug('email/business'),
      { ...bySlug('domains/dns-checker'), label: 'DNS Tools' },
      bySlug('domains/whois'),
      bySlug('domains/ssl-checker'),
    ],
  },
  {
    title: 'Solutions',
    links: [
      { ...bySlug('hosting/web-apps'), label: 'PWA & App Hosting' },
      { ...bySlug('hosting/ai-vps'), label: 'AI & LLM Hosting' },
      { ...bySlug('solutions/n8n'), label: 'n8n Automation' },
      bySlug('solutions/ecommerce'),
      bySlug('solutions/crm'),
      { ...bySlug('agencies/custom-build'), label: 'Custom Inventomo Builds' },
      { label: 'Marketplace', href: '/marketplace' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Knowledge Base', href: '/knowledgebase' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Academy', href: '/academy', soon: true },
      { label: 'Learning Lab', href: '/learning-lab', soon: true },
      { label: 'Product Updates', href: '/roadmap' },
      { label: 'Customer Success', href: '/customer-success' },
      { label: 'Compare hosting', href: '/compare' },
      { label: 'Plan finder', href: '/plan-finder' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Hosttiva', href: '/about' },
      { label: 'About Inventomo', href: SITE.inventomoUrl, external: true },
      bySlug('agencies/partner-program'),
      bySlug('agencies/affiliate'),
      { label: 'Trust Center', href: '/trust' },
      { label: 'Security', href: '/trust#security' },
      { label: 'Compliance', href: '/trust#compliance' },
      { label: 'Status', href: '/status' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Developers', href: '/developers', soon: true },
      { label: 'Community', href: '/community', soon: true },
      { label: 'Careers', href: '/careers', soon: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Acceptable Use Policy', href: '/legal/acceptable-use' },
      { label: 'Refund Policy', href: '/legal/refund' },
      { label: 'Service Level Agreement', href: '/legal/sla' },
      { label: 'Backup Policy', href: '/legal/backup' },
      { label: 'Abuse Reporting', href: '/legal/abuse' },
      { label: 'All policies', href: '/legal' },
    ],
  },
];

export const FOOTER_BUTTONS: NavLink[] = [
  ...(PRELAUNCH ? [] : [{ label: 'Client Area', href: LINKS.clientArea, external: true }]),
  { label: 'Get Started', href: LINKS.getStarted, external: !PRELAUNCH },
  { label: 'Contact Inventomo', href: '/contact' },
  { label: 'View Hosting Plans', href: '/pricing' },
];
