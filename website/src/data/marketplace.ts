// Solutions marketplace (SRS §4 "Solutions marketplace") and one-click apps (SRS §12 "AI Marketplace").
//
// ⚠️  Starting prices, delivery times and support periods are PLACEHOLDERS. ⚠️
// Confirm with Inventomo before launch, then set MARKETPLACE_DETAILS_ARE_PLACEHOLDERS = false.
export const MARKETPLACE_DETAILS_ARE_PLACEHOLDERS = true;

export type MarketGroup = 'websites' | 'ai' | 'care' | 'setup';

export interface MarketItem {
  id: string;
  name: string;
  group: MarketGroup;
  description: string;
  /** Starting price in USD, or null for quote only. */
  priceFrom: number | null;
  delivery: string;
  included: string[];
  requirements: string[];
  support: string;
  upgrades: string[];
  /** WHMCS product id once it exists. */
  pid: number | null;
  /** Related product page. */
  related?: string;
}

export const MARKET_GROUPS: Record<MarketGroup, string> = {
  websites: 'Websites and stores',
  ai: 'AI and automation',
  care: 'Migration, speed and security',
  setup: 'Setup services',
};

export const MARKET_ITEMS: MarketItem[] = [
  {
    id: 'website-launch-pack', name: 'Website Launch Pack', group: 'websites',
    description: 'Domain, hosting, SSL, business email and a starter WordPress site configured and connected for you.',
    priceFrom: 149, delivery: '3–5 business days',
    included: ['Domain and DNS setup', 'Hosting account setup', 'SSL', 'Up to 3 mailboxes configured', 'Starter WordPress theme installed'],
    requirements: ['Business name and logo', 'Preferred domain', 'Basic page text'],
    support: '14 days after launch', upgrades: ['Business Website', 'WP Care plan'], pid: null, related: 'hosting/wordpress',
  },
  {
    id: 'business-website', name: 'Business Website', group: 'websites',
    description: 'A custom-designed company website built by Inventomo and hosted on Hosttiva.',
    priceFrom: null, delivery: 'Quoted per project',
    included: ['Design', 'Development', 'Responsive layout', 'Contact forms', 'Basic on-page SEO'],
    requirements: ['Brand assets', 'Content or a content brief', 'Reference sites you like'],
    support: '30 days after launch', upgrades: ['Speed Optimization', 'Security Care'], pid: null, related: 'create/hire-inventomo',
  },
  {
    id: 'online-store', name: 'Online Store', group: 'websites',
    description: 'A WooCommerce or custom store with products, payments and shipping configured.',
    priceFrom: null, delivery: 'Quoted per project',
    included: ['Store setup', 'Payment gateway configuration', 'Shipping rules', 'Product import', 'Launch checklist'],
    requirements: ['Product list', 'Payment gateway account', 'Shipping and tax rules'],
    support: '30 days after launch', upgrades: ['E-commerce Care', 'Managed VPS Setup'], pid: null, related: 'sell-online/store-launch',
  },
  {
    id: 'pwa-launch', name: 'PWA Launch', group: 'websites',
    description: 'Deploy an existing progressive web app with SSL, caching and a production build pipeline.',
    priceFrom: 199, delivery: '3–7 business days',
    included: ['Managed VPS or app hosting setup', 'SSL and HTTPS redirects', 'Service-worker and cache review', 'Deployment from your Git repository'],
    requirements: ['Repository access', 'Build instructions', 'Domain'],
    support: '14 days after launch', upgrades: ['App Growth plan'], pid: null, related: 'hosting/web-apps',
  },
  {
    id: 'ai-chatbot-starter', name: 'AI Chatbot Starter', group: 'ai',
    description: 'A website chatbot that answers common questions using content you provide.',
    priceFrom: 299, delivery: '5–10 business days',
    included: ['Chat widget for your site', 'Knowledge from up to 20 pages or documents', 'Hand-off to email or ticket', 'Hosting on Hosttiva'],
    requirements: ['Source content', 'Model provider account or budget', 'Tone and escalation rules'],
    support: '30 days after launch', upgrades: ['RAG Knowledge Base', 'Managed AI Assistant'], pid: null, related: 'products/managed-ai-assistant',
  },
  {
    id: 'rag-knowledge-base', name: 'RAG Knowledge Base', group: 'ai',
    description: 'Retrieval-augmented search and chat over your own documents, hosted on a managed AI VPS.',
    priceFrom: null, delivery: 'Quoted per project',
    included: ['Document ingestion pipeline', 'Vector database', 'Search and chat interface', 'Access control review'],
    requirements: ['Document set', 'Access rules', 'Model provider choice'],
    support: '30 days after launch', upgrades: ['AI Agent Hosting'], pid: null, related: 'hosting/ai-vps',
  },
  {
    id: 'n8n-automation-setup', name: 'n8n Automation Setup', group: 'ai',
    description: 'A managed n8n instance with your first workflows built and tested.',
    priceFrom: 199, delivery: '3–7 business days',
    included: ['n8n installation on managed VPS', 'SSL and authentication', 'Up to 3 workflows', 'Credential setup'],
    requirements: ['List of apps to connect', 'API access to those apps'],
    support: '14 days after launch', upgrades: ['Custom Inventomo Build'], pid: null, related: 'products/self-hosted-n8n',
  },
  {
    id: 'mautic-installation', name: 'Mautic Installation', group: 'ai',
    description: 'Mautic installed, secured and connected to your sending domain.',
    priceFrom: 249, delivery: '3–7 business days',
    included: ['Mautic installation', 'Cron jobs', 'SPF, DKIM and DMARC records', 'First segment and form'],
    requirements: ['Sending domain', 'Email delivery provider', 'Permission-based contact list'],
    support: '14 days after launch', upgrades: ['Custom email solution'], pid: null, related: 'email/mautic',
  },
  {
    id: 'website-migration', name: 'Website Migration', group: 'care',
    description: 'Move a site from another host with files, databases and email, checked before DNS switches.',
    priceFrom: 0, delivery: '1–3 business days',
    included: ['Files and databases', 'Mailbox migration', 'Post-move checks', 'DNS switch guidance'],
    requirements: ['Access to current host or backups', 'Domain registrar access'],
    support: '7 days after migration', upgrades: ['Speed Optimization'], pid: null, related: 'hosting/web',
  },
  {
    id: 'speed-optimization', name: 'Speed Optimization', group: 'care',
    description: 'Measure and improve load times with caching, image and database work.',
    priceFrom: 129, delivery: '3–5 business days',
    included: ['Before/after performance report', 'Caching configuration', 'Image optimization', 'Database cleanup'],
    requirements: ['Admin access to the site', 'A staging copy if available'],
    support: '14 days after delivery', upgrades: ['WP Care plan'], pid: null, related: 'hosting/wordpress',
  },
  {
    id: 'security-care', name: 'Security Care', group: 'care',
    description: 'A hardening pass plus ongoing malware checks and update monitoring.',
    priceFrom: 49, delivery: 'Starts within 2 business days',
    included: ['Hardening review', 'Malware scanning', 'Update monitoring', 'Backup verification'],
    requirements: ['Admin access', 'Current backup'],
    support: 'Monthly, while subscribed', upgrades: ['E-commerce Care'], pid: null, related: 'sell-online/ecommerce-care',
  },
  {
    id: 'managed-vps-setup', name: 'Managed VPS Setup', group: 'setup',
    description: 'A production-ready VPS with CloudPanel, firewall, backups and monitoring configured.',
    priceFrom: 149, delivery: '2–5 business days',
    included: ['CloudPanel installation', 'Firewall rules', 'Backup schedule', 'Monitoring and alerts', 'First application deployed'],
    requirements: ['Application requirements', 'Repository or files'],
    support: '14 days after setup', upgrades: ['App Scale plan'], pid: null, related: 'hosting/vps',
  },
  {
    id: 'agency-starter-kit', name: 'Agency Starter Kit', group: 'setup',
    description: 'Reseller hosting, private nameservers and a branded client area set up for your agency.',
    priceFrom: null, delivery: 'Quoted per project',
    included: ['WHM packages', 'Private nameservers', 'WHMCS + Lagom branding', 'First client migration'],
    requirements: ['Agency brand assets', 'Domain for nameservers'],
    support: '30 days after setup', upgrades: ['Agency Growth plan'], pid: null, related: 'agencies/hosting',
  },
  {
    id: 'game-server-setup', name: 'Game Server Setup', group: 'setup',
    description: 'A game server configured with your mods, plugins, backups and access for your team.',
    priceFrom: 49, delivery: '1–3 business days',
    included: ['Server configuration', 'Mod or plugin installation', 'Backup schedule', 'Panel access for admins'],
    requirements: ['Game and version', 'Mod or plugin list'],
    support: '7 days after setup', upgrades: ['Custom Game plan'], pid: null, related: 'hosting/game-servers',
  },
  {
    id: 'google-workspace-setup', name: 'Google Workspace Setup', group: 'setup',
    description: 'Workspace connected to your domain, with mailboxes created and existing mail migrated.',
    priceFrom: 79, delivery: '2–4 business days',
    included: ['Domain verification', 'MX, SPF, DKIM and DMARC', 'User creation', 'Mailbox migration'],
    requirements: ['Google Workspace subscription', 'Domain DNS access', 'User list'],
    support: '14 days after setup', upgrades: ['Custom email solution'], pid: null, related: 'email/google-workspace',
  },
  {
    id: 'custom-inventomo-build', name: 'Custom Inventomo Build', group: 'setup',
    description: 'Anything not on this list: a platform designed, built and hosted by Inventomo.',
    priceFrom: null, delivery: 'Quoted per project',
    included: ['Discovery call', 'Architecture proposal', 'Design and development', 'Hosting on Hosttiva'],
    requirements: ['A description of what you need'],
    support: 'Agreed per project', upgrades: ['Ongoing support retainer'], pid: null, related: 'agencies/custom-build',
  },
];

/** One-click apps (SRS §12). Phase 4: shown as planned, linking to managed setups where they exist today. */
export const ONE_CLICK_APPS: { name: string; what: string; availableAs?: string }[] = [
  { name: 'n8n', what: 'Workflow automation', availableAs: 'products/self-hosted-n8n' },
  { name: 'Mautic', what: 'Marketing automation', availableAs: 'email/mautic' },
  { name: 'Flowise', what: 'Visual LLM app builder' },
  { name: 'Langflow', what: 'LLM workflow builder' },
  { name: 'Open WebUI', what: 'Self-hosted AI chat interface' },
  { name: 'AnythingLLM', what: 'Private document chat' },
  { name: 'Typebot', what: 'Conversational forms and bots' },
  { name: 'Chatwoot', what: 'Customer support inbox' },
  { name: 'Supabase', what: 'Postgres backend platform' },
  { name: 'Appwrite', what: 'Backend server for apps' },
  { name: 'NocoDB', what: 'Spreadsheet interface for databases' },
  { name: 'Plausible', what: 'Privacy-friendly analytics' },
  { name: 'Uptime Kuma', what: 'Uptime monitoring' },
  { name: 'Coolify', what: 'Self-hosted deployment platform' },
];
