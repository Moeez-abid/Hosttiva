// Plan data from docs/SRS.md section 4.
//
// ⚠️  ALL PRICES BELOW ARE PLACEHOLDERS. ⚠️
// Confirm upstream costs, licences, taxes, payment fees, backup costs and renewal
// prices before launch, then set PRICES_ARE_PLACEHOLDERS = false.
// While true: every price shows a "Placeholder" badge and no Offer JSON-LD is emitted.
// WHMCS product ids (`pid`) are null until the client area products exist.

export const PRICES_ARE_PLACEHOLDERS = true;
export const CURRENCY = { code: 'USD', symbol: '$' } as const;

export type PlanGroupId = 'web' | 'wordpress' | 'apps' | 'agency' | 'game';
export type Term = 'monthly' | 'annual';

export interface Price {
  /** Introductory price per month for the first term. */
  promo: number;
  /** Price per month on renewal. */
  renewal: number;
}

export interface Plan {
  id: string;
  name: string;
  /** "Suitable for" / "Client capacity" column. */
  fit?: string;
  features: string[];
  /** null → quote only (custom plans). */
  price: Record<Term, Price> | null;
  pid: number | null;
  featured?: boolean;
}

export interface PlanGroup {
  id: PlanGroupId;
  name: string;
  intro: string;
  fitLabel?: string;
  /** WHMCS store group slug used when pid is null. */
  whmcsGroup: string;
  /** Product page that represents this group. */
  productSlug: string;
  plans: Plan[];
  note?: string;
}

// Helper so placeholder numbers are easy to grep and replace.
const p = (monthlyPromo: number, monthlyRenew: number, annualPromo: number, annualRenew: number) => ({
  monthly: { promo: monthlyPromo, renewal: monthlyRenew },
  annual: { promo: annualPromo, renewal: annualRenew },
});

export const PLAN_GROUPS: PlanGroup[] = [
  {
    id: 'web',
    name: 'Web hosting',
    intro: 'cPanel hosting for websites, blogs and small stores.',
    fitLabel: 'Suitable for',
    whmcsGroup: 'web-hosting',
    productSlug: 'hosting/web',
    plans: [
      { id: 'launch', name: 'Launch', fit: 'Portfolio and starter website', features: ['1 website', '10 GB storage', 'SSL', '5 mailboxes', 'cPanel', 'Weekly backup'], price: p(3.99, 6.99, 2.99, 5.99), pid: null },
      { id: 'business', name: 'Business', fit: 'Company website or small store', features: ['3 websites', '25 GB storage', 'SSL', '20 mailboxes', 'Daily backup', 'Staging'], price: p(6.99, 10.99, 5.49, 9.49), pid: null, featured: true },
      { id: 'professional', name: 'Professional', fit: 'Growing website or e-commerce', features: ['10 websites', '50 GB storage', 'Higher resources', 'Malware monitoring'], price: p(11.99, 17.99, 9.49, 15.49), pid: null },
      { id: 'scale', name: 'Scale', fit: 'High-traffic business', features: ['Custom resources', 'Priority support', 'Advanced backups', 'Migration assistance'], price: null, pid: null },
    ],
  },
  {
    id: 'wordpress',
    name: 'Managed WordPress',
    intro: 'WordPress with installation, backups, updates and performance support.',
    whmcsGroup: 'wordpress',
    productSlug: 'hosting/wordpress',
    plans: [
      { id: 'wp-starter', name: 'WP Starter', features: ['1 website', 'SSL', 'Migration', 'Weekly backups', 'WordPress installation'], price: p(4.99, 8.99, 3.99, 7.49), pid: null },
      { id: 'wp-business', name: 'WP Business', features: ['3 websites', 'Daily backups', 'Staging', 'Caching', 'Plugin and theme support'], price: p(9.99, 14.99, 7.99, 12.99), pid: null, featured: true },
      { id: 'wp-care', name: 'WP Care', features: ['Managed updates', 'Malware checks', 'Performance monitoring', 'Monthly support'], price: p(19.99, 24.99, 16.99, 21.99), pid: null },
      { id: 'wp-pro', name: 'WP Pro', features: ['Managed VPS', 'Advanced caching', 'Database optimization', 'Priority support'], price: p(39.99, 49.99, 34.99, 44.99), pid: null },
    ],
  },
  {
    id: 'apps',
    name: 'Managed applications',
    intro: 'Managed VPS with CloudPanel for PWAs, APIs, SaaS and AI workloads.',
    fitLabel: 'Suitable for',
    whmcsGroup: 'applications',
    productSlug: 'hosting/web-apps',
    plans: [
      { id: 'app-start', name: 'App Start', fit: 'PWA, API, small app', features: ['Managed VPS', 'CloudPanel', 'SSL', 'Firewall', 'Deployment assistance'], price: p(14.99, 19.99, 12.99, 17.99), pid: null },
      { id: 'app-growth', name: 'App Growth', fit: 'SaaS, dashboard, chatbot', features: ['More CPU/RAM', 'Database', 'Redis', 'Backups', 'Staging'], price: p(29.99, 39.99, 25.99, 34.99), pid: null, featured: true },
      { id: 'app-scale', name: 'App Scale', fit: 'Production platform', features: ['Dedicated resources', 'Recovery plan', 'Advanced monitoring'], price: p(69.99, 89.99, 59.99, 79.99), pid: null },
      { id: 'custom-cloud', name: 'Custom Cloud', fit: 'Enterprise workloads', features: ['Architecture review', 'Private network', 'Dedicated nodes', 'Custom support'], price: null, pid: null },
    ],
  },
  {
    id: 'agency',
    name: 'Agency reseller',
    intro: 'WHM reseller hosting with white-label tools and WHMCS integration.',
    fitLabel: 'Client capacity',
    whmcsGroup: 'reseller',
    productSlug: 'agencies/hosting',
    plans: [
      { id: 'agency-starter', name: 'Agency Starter', fit: 'Up to 10 accounts', features: ['WHM', 'Custom packages', 'Private nameservers', 'SSL'], price: p(19.99, 24.99, 16.99, 21.99), pid: null },
      { id: 'agency-growth', name: 'Agency Growth', fit: 'Up to 30 accounts', features: ['WHMCS integration', 'White-label portal', 'Migration help'], price: p(39.99, 49.99, 34.99, 44.99), pid: null, featured: true },
      { id: 'agency-pro', name: 'Agency Pro', fit: 'Up to 75 accounts', features: ['Higher resources', 'Custom limits', 'Partner support'], price: p(79.99, 94.99, 69.99, 84.99), pid: null },
      { id: 'agency-enterprise', name: 'Agency Enterprise', fit: 'Custom', features: ['Dedicated infrastructure', 'API provisioning', 'Custom terms'], price: null, pid: null },
    ],
  },
  {
    id: 'game',
    name: 'Game servers',
    intro: 'Game servers on a separate cluster from web hosting, managed with a game panel.',
    fitLabel: 'Suitable for',
    whmcsGroup: 'game-servers',
    productSlug: 'hosting/game-servers',
    note: 'Game hosting runs on infrastructure separate from web hosting.',
    plans: [
      { id: 'game-2gb', name: 'Game 2GB', fit: 'Private server', features: ['2 GB RAM', 'Game panel', 'Basic backup', 'Standard support'], price: p(5.99, 7.99, 4.99, 6.99), pid: null },
      { id: 'game-4gb', name: 'Game 4GB', fit: 'Small community', features: ['4 GB RAM', 'Plugin/mod support', 'Scheduled backups'], price: p(10.99, 13.99, 8.99, 11.99), pid: null, featured: true },
      { id: 'game-8gb', name: 'Game 8GB', fit: 'Growing community', features: ['8 GB RAM', 'Higher CPU allocation', 'Advanced backups'], price: p(19.99, 24.99, 16.99, 21.99), pid: null },
      { id: 'custom-game', name: 'Custom Game', fit: 'Server network', features: ['Dedicated node', 'Multiple instances', 'Migration support'], price: null, pid: null },
    ],
  },
];

export const getPlanGroup = (id: PlanGroupId) => PLAN_GROUPS.find((g) => g.id === id)!;
export const formatPrice = (n: number) => `${CURRENCY.symbol}${n.toFixed(2)}`;
