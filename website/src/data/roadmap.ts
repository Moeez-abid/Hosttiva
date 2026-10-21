// Public roadmap / product updates (SRS §5 "Product updates", §17 "Public Roadmap").
// Keep entries factual: "released" = live on the site or platform today.
// Coming-soon products from products.ts are appended to "planned" automatically.
import { PRODUCTS } from './products';

export type RoadmapStatus = 'released' | 'beta' | 'in-development' | 'planned';

export interface RoadmapItem {
  title: string;
  detail: string;
  status: RoadmapStatus;
  /** ISO date for released items. */
  date?: string;
  href?: string;
}

export const ROADMAP_STATUSES: { id: RoadmapStatus; label: string; blurb: string }[] = [
  { id: 'released', label: 'Released', blurb: 'Live now.' },
  { id: 'beta', label: 'Beta', blurb: 'Usable, with known limits.' },
  { id: 'in-development', label: 'In development', blurb: 'Being built or set up.' },
  { id: 'planned', label: 'Planned', blurb: 'Committed, not started.' },
];

const ITEMS: RoadmapItem[] = [
  { status: 'released', date: '2026-10-12', title: 'Hosttiva website', detail: 'Product pages, pricing with renewal prices, and the solutions marketplace.', href: '/pricing' },
  { status: 'released', date: '2026-10-14', title: 'Free DNS checker', detail: 'Check A, AAAA, CNAME, MX, TXT, NS and CAA records.', href: '/domains/dns-checker' },
  { status: 'released', date: '2026-10-14', title: 'Free WHOIS lookup', detail: 'Registration data via RDAP.', href: '/domains/whois' },
  { status: 'released', date: '2026-10-14', title: 'Domain name generator', detail: 'Name ideas linked to domain search.', href: '/domains/generator' },
  { status: 'released', date: '2026-10-14', title: 'Blog', detail: 'Guides on hosting, email, VPS, AI and agencies.', href: '/blog' },
  { status: 'released', date: '2026-10-14', title: 'Trust Center', detail: 'Security, backups, disclosure and email compliance.', href: '/trust' },
  { status: 'released', date: '2026-10-15', title: 'Site search', detail: 'Search products, tools and articles.', href: '/search' },
  { status: 'beta', title: 'SSL checker', detail: 'Uses public certificate logs today; a live check of the served certificate is coming.', href: '/domains/ssl-checker' },
  { status: 'in-development', title: 'Client area', detail: 'Ordering, billing, domains and support tickets in one portal.' },
  { status: 'in-development', title: 'Live SSL check service', detail: 'Reads the certificate your server presents, including chain and trust.' },
  { status: 'in-development', title: 'Legal and policy pages', detail: 'Terms, privacy, refunds, SLA and backup policy, with legal review.' },
  { status: 'in-development', title: 'Status page', detail: 'Live status, maintenance and incident history per service at status.hosttiva.com.', href: '/status' },
  { status: 'planned', title: 'Knowledge Base', detail: 'Help articles for every Hosttiva service.' },
  { status: 'in-development', title: 'One-click app deploys', detail: 'n8n, Flowise, Open WebUI, NocoDB, Mautic, Langflow, Typebot and more, with automatic HTTPS on your VPS.', href: '/marketplace#one-click' },
  { status: 'planned', title: 'Hosttiva Academy and Learning Lab', detail: 'Video guides and guided learning paths.' },
];

export const ROADMAP: RoadmapItem[] = [
  ...ITEMS,
  ...PRODUCTS.filter((p) => p.status === 'coming-soon' && !ITEMS.some((i) => i.href === `/${p.slug}`))
    // The AI builder exists under two URLs; list it once.
    .filter((p, i, a) => a.findIndex((x) => x.name === p.name) === i)
    .map((p) => ({ status: 'planned' as const, title: p.name, detail: p.headline, href: `/${p.slug}` })),
];
