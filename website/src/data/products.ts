// Every product/solution page is generated from this file (see src/pages/[...slug].astro).
// Copy comes from docs/SRS.md sections 3 (Products / Solutions). Do not invent specs here:
// numeric limits belong in plans.ts and are placeholders until confirmed.
import type { PlanGroupId } from './plans';

export type CategoryId =
  | 'ai'
  | 'hosting'
  | 'domains'
  | 'create'
  | 'sell'
  | 'email'
  | 'agencies'
  | 'solutions';

/**
 * available   – orderable through WHMCS (plan buttons shown)
 * enquiry     – real offer, but sold by quote / consultation
 * coming-soon – SRS marks it conditional or Phase 2+; never shows prices or order buttons
 */
export type ProductStatus = 'available' | 'enquiry' | 'coming-soon';

export interface Faq {
  q: string;
  a: string;
}

export interface Product {
  /** URL path without leading slash, exactly as in the SRS. */
  slug: string;
  name: string;
  category: CategoryId;
  /** Short SRS one-liner. */
  headline: string;
  /** SRS paragraph. */
  summary: string;
  status: ProductStatus;
  /** Lucide icon component name. */
  icon: string;
  features?: string[];
  useCases?: string[];
  planGroup?: PlanGroupId;
  /** Compliance/availability note shown on the page. */
  note?: string;
  faqs?: Faq[];
  related?: string[];
  /** Hide from mega-menu (still gets a page). */
  hideInNav?: boolean;
}

export const CATEGORIES: Record<CategoryId, { label: string; blurb: string }> = {
  ai: { label: 'AI & Automation', blurb: 'Assistants, agents and workflow automation.' },
  hosting: { label: 'Hosting', blurb: 'Shared, WordPress, VPS, cloud and dedicated.' },
  domains: { label: 'Domains', blurb: 'Search, register, transfer and check domains.' },
  create: { label: 'Create a Website', blurb: 'WordPress, templates or a full Inventomo build.' },
  sell: { label: 'Sell Online', blurb: 'Store hosting, launch help and ongoing care.' },
  email: { label: 'Email & Marketing', blurb: 'Business email, campaigns and transactional mail.' },
  agencies: { label: 'For Agencies', blurb: 'White-label hosting, partners and referrals.' },
  solutions: { label: 'Solutions', blurb: 'Ready environments for specific workloads.' },
};

export const PRODUCT_CATEGORIES: CategoryId[] = [
  'ai',
  'hosting',
  'domains',
  'create',
  'sell',
  'email',
  'agencies',
];

const COMING_SOON_NOTE =
  'This service is not available yet. We will publish it only once availability, pricing and limits are confirmed. Leave an enquiry and we will contact you when it launches.';

export const PRODUCTS: Product[] = [
  // ── AI & Automation ────────────────────────────────────────────────
  {
    slug: 'products/ai-workspace',
    name: 'AI Workspace',
    category: 'ai',
    icon: 'BrainCircuit',
    status: 'enquiry',
    headline: 'AI tools for everyday business tasks.',
    summary:
      'Use AI to organize information, summarize documents, draft content, answer customer questions, and support daily business workflows.',
    useCases: ['Organize information', 'Summarize documents', 'Draft content', 'Answer customer questions', 'Support daily workflows'],
    related: ['products/managed-ai-assistant', 'products/self-hosted-n8n'],
  },
  {
    slug: 'products/managed-ai-assistant',
    name: 'Managed AI Assistant',
    category: 'ai',
    icon: 'MessageSquareText',
    status: 'enquiry',
    headline: 'Your always-available assistant for business automation.',
    summary:
      'Deploy a managed AI assistant for customer support, internal knowledge, lead qualification, document search, and routine business tasks.',
    useCases: ['Customer support', 'Internal knowledge', 'Lead qualification', 'Document search', 'Routine business tasks'],
    related: ['products/ai-agents', 'hosting/ai-vps'],
  },
  {
    slug: 'products/ai-agents',
    name: 'AI Agent Hosting',
    category: 'ai',
    icon: 'Bot',
    status: 'enquiry',
    headline: 'Build, deploy, and manage intelligent AI agents.',
    summary:
      'Run agents that connect with approved tools, APIs, CRMs, knowledge bases, and internal business workflows.',
    useCases: ['Tool and API integrations', 'CRM connections', 'Knowledge-base retrieval', 'Internal workflows'],
    related: ['hosting/ai-vps', 'solutions/ai-vps'],
  },
  {
    slug: 'products/self-hosted-n8n',
    name: 'Self-hosted n8n',
    category: 'ai',
    icon: 'Workflow',
    status: 'available',
    planGroup: 'apps',
    headline: 'Create powerful visual workflows with full control.',
    summary:
      'Connect applications, APIs, databases, forms, CRMs, email, notifications, and AI tools in a managed n8n environment.',
    features: ['Managed n8n environment', 'Connect APIs, databases and forms', 'CRM, email and notification integrations', 'AI tool connections'],
    related: ['solutions/n8n', 'products/ai-automation'],
  },
  {
    slug: 'products/ai-automation',
    name: 'AI Automation Apps',
    category: 'ai',
    icon: 'Cog',
    status: 'enquiry',
    headline: 'Host the automation tools your business depends on.',
    summary:
      'Deploy supported automation applications on managed VPS infrastructure and expand your tools as your requirements grow.',
    related: ['products/self-hosted-n8n', 'hosting/applications'],
  },
  {
    slug: 'products/ai-website-builder',
    name: 'AI-assisted Website Builder',
    category: 'ai',
    icon: 'Wand',
    status: 'coming-soon',
    headline: 'Describe your idea and start building your website faster.',
    summary:
      'Use an AI-assisted workflow to create a starting structure for your website, then customize the design, content, branding, forms, and hosting.',
    note: COMING_SOON_NOTE,
    related: ['create/hire-inventomo', 'create/wordpress'],
  },

  // ── Hosting ────────────────────────────────────────────────────────
  {
    slug: 'hosting/web',
    name: 'Web Hosting',
    category: 'hosting',
    icon: 'Globe',
    status: 'available',
    planGroup: 'web',
    headline: 'Fast, reliable hosting for websites and small businesses.',
    summary:
      'Launch blogs, portfolios, company websites, landing pages, and lightweight stores with SSL, email, backups, and an easy control panel.',
    features: ['SSL certificates', 'Email on your domain', 'Backups', 'cPanel control panel', 'Free migration on eligible plans'],
    useCases: ['Blogs', 'Portfolios', 'Company websites', 'Landing pages', 'Lightweight stores'],
    related: ['hosting/wordpress', 'hosting/vps', 'email/business'],
  },
  {
    slug: 'hosting/vps',
    name: 'VPS Hosting',
    category: 'hosting',
    icon: 'Server',
    status: 'available',
    planGroup: 'apps',
    headline: 'Private virtual servers for more control and performance.',
    summary:
      'Deploy websites, APIs, databases, dashboards, SaaS platforms, automation tools, and AI systems with dedicated virtual resources and optional root access.',
    features: ['NVMe storage', 'Docker support', 'Root access where available', 'Linux environments', 'Firewall configuration', 'Backup options', 'Monitoring', 'Application deployment support'],
    useCases: ['APIs', 'Databases', 'Dashboards', 'SaaS platforms', 'Automation tools', 'AI systems'],
    related: ['hosting/cloud', 'hosting/ai-vps', 'hosting/dedicated'],
  },
  {
    slug: 'hosting/ai-vps',
    name: 'Managed AI VPS',
    category: 'hosting',
    icon: 'Cpu',
    status: 'available',
    planGroup: 'apps',
    headline: 'Run AI tools and automation without managing every server detail.',
    summary:
      'Host chatbots, RAG systems, AI agents, vector databases, n8n workflows, and automation platforms in a managed environment.',
    useCases: ['Chatbots', 'RAG systems', 'AI agents', 'Vector databases', 'n8n workflows', 'Automation platforms'],
    related: ['solutions/ai-vps', 'products/ai-agents'],
  },
  {
    slug: 'hosting/wordpress',
    name: 'Managed WordPress',
    category: 'hosting',
    icon: 'PanelsTopLeft',
    status: 'available',
    planGroup: 'wordpress',
    headline: 'Build and manage WordPress websites with less technical work.',
    summary:
      'Get WordPress installation, SSL, updates, backups, caching, migration assistance, performance support, and optional Inventomo website care.',
    features: ['WordPress installation', 'SSL', 'Managed updates', 'Backups', 'Caching', 'Migration assistance', 'Performance support', 'Optional Inventomo website care'],
    related: ['hosting/woocommerce', 'create/wordpress', 'hosting/web'],
  },
  {
    slug: 'hosting/cloud',
    name: 'Cloud Hosting',
    category: 'hosting',
    icon: 'Cloud',
    status: 'available',
    planGroup: 'apps',
    headline: 'Dedicated resources for websites and applications that are growing.',
    summary:
      'Use managed cloud infrastructure for high-traffic websites, online stores, SaaS platforms, and applications that need more stability than traditional shared hosting.',
    useCases: ['High-traffic websites', 'Online stores', 'SaaS platforms', 'Growing applications'],
    related: ['hosting/vps', 'hosting/dedicated'],
  },
  {
    slug: 'hosting/woocommerce',
    name: 'WooCommerce Hosting',
    category: 'hosting',
    icon: 'ShoppingCart',
    status: 'available',
    planGroup: 'wordpress',
    headline: 'A managed environment for online stores.',
    summary:
      'Launch and operate WooCommerce stores with hosting, SSL, database support, payment configuration, backups, performance tuning, and migration assistance.',
    features: ['SSL', 'Database support', 'Payment configuration', 'Backups', 'Performance tuning', 'Migration assistance'],
    related: ['sell-online/managed-ecommerce', 'hosting/wordpress'],
  },
  {
    slug: 'hosting/web-apps',
    name: 'Web App Hosting',
    category: 'hosting',
    icon: 'Code',
    status: 'available',
    planGroup: 'apps',
    headline: 'Deploy custom applications from GitHub or your development workflow.',
    summary:
      'Host Node.js, Python, PHP, APIs, dashboards, PWAs, and custom applications with SSL, databases, deployment support, and monitoring.',
    features: ['Node.js, Python and PHP', 'SSL', 'Databases', 'Deployment support', 'Monitoring'],
    useCases: ['APIs', 'Dashboards', 'PWAs', 'Custom applications'],
    related: ['solutions/cloudpanel', 'hosting/vps'],
  },
  {
    slug: 'hosting/applications',
    name: 'One-click Applications',
    category: 'hosting',
    icon: 'Boxes',
    status: 'available',
    planGroup: 'apps',
    headline: 'Deploy supported open-source applications faster.',
    summary:
      'Install selected applications on VPS infrastructure with guided setup, domain connection, SSL, and basic configuration.',
    features: ['Guided setup', 'Domain connection', 'SSL', 'Basic configuration'],
    related: ['hosting/vps', 'products/self-hosted-n8n'],
  },
  {
    slug: 'hosting/game-servers',
    name: 'Game Servers',
    category: 'hosting',
    icon: 'Gamepad2',
    status: 'available',
    planGroup: 'game',
    headline: 'Game servers on infrastructure kept separate from web hosting.',
    summary:
      'Run supported game servers with configurable resources, backups, game panels, and technical support.',
    features: ['Configurable resources', 'Game panel', 'Scheduled backups', 'Plugin and mod support (selected plans)', 'Technical support'],
    related: ['hosting/dedicated'],
  },
  {
    slug: 'hosting/gpu',
    name: 'GPU Hosting',
    category: 'hosting',
    icon: 'Microchip',
    status: 'coming-soon',
    headline: 'High-performance infrastructure for demanding AI and compute workloads.',
    summary:
      'Use GPU-backed infrastructure for model inference, computer vision, data processing, experimentation, and other supported workloads.',
    note: COMING_SOON_NOTE,
    related: ['hosting/ai-vps', 'hosting/dedicated'],
  },
  {
    slug: 'hosting/linux',
    name: 'Linux Hosting',
    category: 'hosting',
    icon: 'Terminal',
    status: 'available',
    planGroup: 'apps',
    headline: 'Flexible hosting for developers and open-source applications.',
    summary:
      'Deploy PHP, Python, Node.js, Docker, databases, APIs, frameworks, and other Linux-based applications.',
    related: ['hosting/vps', 'hosting/web-apps'],
  },
  {
    slug: 'hosting/windows',
    name: 'Windows Hosting',
    category: 'hosting',
    icon: 'AppWindow',
    status: 'coming-soon',
    headline: 'Hosting for Microsoft-based websites and applications.',
    summary: 'Run supported ASP.NET, .NET, Microsoft SQL Server, and Windows-compatible applications.',
    note: COMING_SOON_NOTE,
    related: ['hosting/vps'],
  },
  {
    slug: 'hosting/dedicated',
    name: 'Dedicated Servers',
    category: 'hosting',
    icon: 'HardDrive',
    status: 'enquiry',
    headline: 'Your own physical server for demanding workloads.',
    summary:
      'Use dedicated hardware for high-traffic websites, large databases, SaaS platforms, enterprise applications, AI workloads, and game networks.',
    useCases: ['High-traffic websites', 'Large databases', 'SaaS platforms', 'Enterprise applications', 'AI workloads', 'Game networks'],
    related: ['solutions/dedicated', 'hosting/cloud'],
  },

  // ── Domains ────────────────────────────────────────────────────────
  {
    slug: 'domains/search',
    name: 'Search Domains',
    category: 'domains',
    icon: 'Search',
    status: 'available',
    headline: 'Find the right domain for your brand or project.',
    summary: 'Check availability, compare extensions, and start building your digital identity.',
    related: ['domains/register', 'domains/transfer'],
  },
  {
    slug: 'domains/register',
    name: 'Register a Domain',
    category: 'domains',
    icon: 'AtSign',
    status: 'available',
    headline: 'Register your domain and manage it from one account.',
    summary: 'Connect your domain to a website, store, email service, application, or VPS.',
    related: ['domains/search', 'email/business'],
  },
  {
    slug: 'domains/transfer',
    name: 'Transfer a Domain',
    category: 'domains',
    icon: 'ArrowRightLeft',
    status: 'available',
    headline: 'Move your existing domain to Hosttiva with guided support.',
    summary:
      'Transfer your domain while keeping control of registration, DNS, renewals, and connected services.',
    related: ['domains/register'],
  },
  {
    slug: 'domains/generator',
    name: 'Domain Name Generator',
    category: 'domains',
    icon: 'Lightbulb',
    status: 'coming-soon',
    headline: 'Get creative domain ideas for your next project.',
    summary: 'Enter your business name, industry, location, or keywords and receive naming suggestions.',
    note: 'This free tool is planned and not live yet. Use domain search in the meantime.',
    related: ['domains/search'],
  },
  {
    slug: 'domains/whois',
    name: 'WHOIS Lookup',
    category: 'domains',
    icon: 'FileSearch',
    status: 'coming-soon',
    headline: 'Check publicly available domain information.',
    summary:
      'Review domain status, registrar information, registration dates, expiry information, and available ownership details.',
    note: 'This free tool is planned and not live yet. Some domain details may be hidden or limited because of privacy regulations and registrar policies.',
  },
  {
    slug: 'domains/dns-checker',
    name: 'DNS Checker',
    category: 'domains',
    icon: 'Network',
    status: 'coming-soon',
    headline: 'Verify your domain’s DNS records and nameservers.',
    summary: 'Check A, AAAA, CNAME, MX, TXT, NS, and CAA records.',
    note: 'This free tool is planned and not live yet.',
  },
  {
    slug: 'domains/ssl-checker',
    name: 'SSL Checker',
    category: 'domains',
    icon: 'ShieldCheck',
    status: 'coming-soon',
    headline: 'Check your website’s SSL certificate and expiry status.',
    summary:
      'Verify whether the certificate is correctly installed, trusted by browsers, and approaching expiration.',
    note: 'This free tool is planned and not live yet.',
  },

  // ── Create a website ───────────────────────────────────────────────
  {
    slug: 'create/ai-website-builder',
    name: 'AI-assisted Website Builder',
    category: 'create',
    icon: 'Wand',
    status: 'coming-soon',
    headline: 'Describe your idea and start building faster.',
    summary:
      'Create an initial website structure and customize its content, design, branding, forms, and hosting.',
    note: COMING_SOON_NOTE,
    related: ['create/hire-inventomo'],
    hideInNav: true,
  },
  {
    slug: 'create/wordpress',
    name: 'Managed WordPress',
    category: 'create',
    icon: 'PanelsTopLeft',
    status: 'available',
    planGroup: 'wordpress',
    headline: 'Create WordPress websites with hosting and support.',
    summary:
      'Launch with SSL, templates, backups, updates, migration, performance support, and optional website care.',
    features: ['SSL', 'Templates', 'Backups', 'Updates', 'Migration', 'Performance support', 'Optional website care'],
    related: ['hosting/wordpress', 'create/templates'],
  },
  {
    slug: 'create/templates',
    name: 'Website Templates',
    category: 'create',
    icon: 'LayoutTemplate',
    status: 'enquiry',
    headline: 'Start with a ready-to-customize website design.',
    summary:
      'Explore designs for business websites, portfolios, landing pages, online stores, applications, newsletters, agencies, and technology companies.',
    related: ['create/wordpress', 'create/hire-inventomo'],
  },
  {
    slug: 'create/hire-inventomo',
    name: 'Hire an Inventomo Expert',
    category: 'create',
    icon: 'UserRound',
    status: 'enquiry',
    headline: 'Need a complete website? Let Inventomo build it for you.',
    summary:
      'Inventomo designs, builds and migrates websites and applications, then hosts them on Hosttiva with continuing support.',
    features: ['Business websites', 'Landing pages', 'E-commerce stores', 'WordPress websites', 'PWAs', 'Custom web applications', 'AI-powered websites', 'Booking and CRM systems', 'Website migration', 'SEO and content', 'Branding and UI/UX'],
    related: ['solutions/inventomo-web-solutions', 'agencies/custom-build'],
  },
  {
    slug: 'solutions/inventomo-web-solutions',
    name: 'Inventomo Web Solutions',
    category: 'create',
    icon: 'Layers',
    status: 'enquiry',
    headline: 'From idea to launch, Inventomo helps you build and run your digital platform.',
    summary:
      'Hosttiva provides the infrastructure. Inventomo provides the design, development, AI integration, automation, migration, and continuing support.',
    features: ['Design', 'Development', 'AI integration', 'Automation', 'Migration', 'Continuing support'],
    related: ['create/hire-inventomo', 'agencies/custom-build'],
  },

  // ── Sell online ────────────────────────────────────────────────────
  {
    slug: 'sell-online/store-hosting',
    name: 'Online Store Hosting',
    category: 'sell',
    icon: 'Store',
    status: 'available',
    planGroup: 'web',
    headline: 'Launch and manage an online store with hosting, SSL, email, and support.',
    summary:
      'Hosting for small and growing stores, with SSL, email on your domain, backups and an upgrade path to VPS when traffic grows.',
    related: ['hosting/woocommerce', 'sell-online/store-launch'],
  },
  {
    slug: 'sell-online/managed-ecommerce',
    name: 'Managed E-commerce',
    category: 'sell',
    icon: 'Gauge',
    status: 'enquiry',
    headline: 'Performance-focused infrastructure for growing online stores.',
    summary:
      'Support online stores with database optimization, backups, security, payment integration, staging, migration, and VPS upgrades.',
    features: ['Database optimization', 'Backups', 'Security', 'Payment integration', 'Staging', 'Migration', 'VPS upgrades'],
    related: ['solutions/ecommerce', 'sell-online/ecommerce-care'],
  },
  {
    slug: 'sell-online/store-launch',
    name: 'Store Launch Service',
    category: 'sell',
    icon: 'Rocket',
    status: 'enquiry',
    headline: 'Get help with products, payments, shipping, design, and launch configuration.',
    summary:
      'Inventomo helps set up your catalogue, payment gateways, shipping rules and store design, then launches the store on Hosttiva hosting.',
    features: ['Product setup', 'Payments', 'Shipping', 'Design', 'Launch configuration'],
    related: ['sell-online/store-hosting', 'sell-online/ecommerce-care'],
  },
  {
    slug: 'sell-online/ecommerce-care',
    name: 'E-commerce Care',
    category: 'sell',
    icon: 'ShieldCheck',
    status: 'enquiry',
    headline: 'Keep your store updated, secure, backed up, and ready for customers.',
    summary:
      'An ongoing care service for online stores covering updates, security checks, backups and help when something needs fixing.',
    features: ['Updates', 'Security checks', 'Backups', 'Ongoing support'],
    related: ['sell-online/managed-ecommerce'],
  },

  // ── Email & marketing ──────────────────────────────────────────────
  {
    slug: 'email/business',
    name: 'Business Email',
    category: 'email',
    icon: 'Mail',
    status: 'enquiry',
    headline: 'Create a professional email address on your domain.',
    summary:
      'Use addresses such as hello@yourcompany.com, sales@yourcompany.com, and support@yourcompany.com.',
    features: ['Custom-domain email', 'Webmail', 'Mailbox setup', 'Forwarding', 'SPF, DKIM, and DMARC', 'Spam and malware protection', 'Email migration', 'Mobile and desktop setup'],
    related: ['email/google-workspace', 'domains/register'],
  },
  {
    slug: 'email/marketing',
    name: 'Email Marketing',
    category: 'email',
    icon: 'Megaphone',
    status: 'enquiry',
    headline: 'Create campaigns that keep your customers connected.',
    summary:
      'Design newsletters, promotions, announcements, onboarding emails, and automated customer campaigns.',
    note: 'Email marketing must be permission-based. Customers are responsible for having permission to contact subscribers, providing unsubscribe options, maintaining accurate sender information, and following applicable anti-spam and privacy requirements.',
    related: ['email/mautic', 'email/campaign-platform'],
  },
  {
    slug: 'email/mautic',
    name: 'Mautic Marketing Automation',
    category: 'email',
    icon: 'GitBranch',
    status: 'enquiry',
    headline: 'Build automated marketing journeys with an open-source platform.',
    summary:
      'Host and configure Mautic for lead capture, email campaigns, landing pages, segmentation, lead scoring, and customer journeys.',
    features: ['Lead capture', 'Email campaigns', 'Landing pages', 'Segmentation', 'Lead scoring', 'Customer journeys'],
    note: 'Email marketing must be permission-based. Customers are responsible for consent, unsubscribe options, accurate sender information and applicable anti-spam and privacy rules.',
    related: ['email/marketing'],
  },
  {
    slug: 'email/campaign-platform',
    name: 'Campaign Email Platform',
    category: 'email',
    icon: 'Send',
    status: 'enquiry',
    headline: 'A flexible email-campaign system for businesses and agencies.',
    summary:
      'Use a hosted or self-hosted email-marketing application for newsletters, promotions, customer communication, and campaign reporting.',
    note: 'Email marketing must be permission-based. Customers are responsible for consent, unsubscribe options, accurate sender information and applicable anti-spam and privacy rules.',
    related: ['email/mautic', 'email/custom-solution'],
  },
  {
    slug: 'email/transactional',
    name: 'Transactional Email',
    category: 'email',
    icon: 'MailCheck',
    status: 'enquiry',
    headline: 'Deliver important messages from your websites and applications.',
    summary: 'Send password resets, order confirmations, invoices, support notices, and system alerts.',
    related: ['hosting/web-apps'],
  },
  {
    slug: 'email/google-workspace',
    name: 'Google Workspace Setup',
    category: 'email',
    icon: 'Users',
    status: 'enquiry',
    headline: 'Get professional Gmail and collaboration tools for your team.',
    summary:
      'Hosttiva and Inventomo can help you set up Google Workspace with Gmail, Drive, Meet, Calendar, Docs, Sheets, and business-domain email. This is a setup, migration and support service; the Workspace subscription itself is provided by Google.',
    features: ['Setup', 'DNS and domain verification', 'Mailbox migration', 'Ongoing support'],
    related: ['email/business'],
  },
  {
    slug: 'email/custom-solution',
    name: 'Custom Email Solution',
    category: 'email',
    icon: 'Wrench',
    status: 'enquiry',
    headline: 'Need a system built around your workflow? Inventomo can build it.',
    summary: 'Inventomo builds email systems that connect to your CRM, data and workflows.',
    features: ['Campaign dashboard', 'CRM-connected email marketing', 'Customer notification system', 'AI-assisted email writing', 'Newsletter management', 'Lead-capture system', 'Automated follow-ups', 'Email analytics dashboard', 'Mautic integration', 'n8n and API integrations'],
    related: ['email/mautic', 'agencies/custom-build'],
  },

  // ── For agencies ───────────────────────────────────────────────────
  {
    slug: 'agencies/hosting',
    name: 'Agency Hosting',
    category: 'agencies',
    icon: 'Building2',
    status: 'available',
    planGroup: 'agency',
    headline: 'Manage your clients’ websites with professional white-label tools.',
    summary:
      'Create hosting packages, manage customer accounts, configure domains and SSL, and offer hosting under your agency brand.',
    features: ['Custom hosting packages', 'Customer account management', 'Domains and SSL', 'White-label branding'],
    related: ['agencies/white-label', 'solutions/reseller'],
  },
  {
    slug: 'agencies/affiliate',
    name: 'Affiliate Program',
    category: 'agencies',
    icon: 'HandCoins',
    status: 'enquiry',
    headline: 'Earn rewards when you refer customers to Hosttiva.',
    summary:
      'Share Hosttiva with your clients, audience, or professional network and receive eligible commissions or account credit.',
    note: 'Affiliate terms and commission rates are being finalised and will be published before the program opens.',
    related: ['agencies/partner-program'],
  },
  {
    slug: 'agencies/partner-program',
    name: 'Partner Program',
    category: 'agencies',
    icon: 'Handshake',
    status: 'enquiry',
    headline: 'Grow your agency with Hosttiva and Inventomo.',
    summary:
      'Offer hosting, domains, email, cloud infrastructure, application deployment, AI automation, and technical support.',
    related: ['agencies/hosting', 'agencies/affiliate'],
  },
  {
    slug: 'agencies/directory',
    name: 'Agency Directory',
    category: 'agencies',
    icon: 'BookUser',
    status: 'coming-soon',
    headline: 'Get discovered by businesses looking for digital experts.',
    summary:
      'List your agency and showcase its services, portfolio, technologies, industries, and customer solutions.',
    note: 'The directory is planned and not open yet. Leave an enquiry to be notified.',
  },
  {
    slug: 'agencies/white-label',
    name: 'White-label Client Area',
    category: 'agencies',
    icon: 'LayoutDashboard',
    status: 'available',
    planGroup: 'agency',
    headline: 'Give your customers a professional hosting experience under your brand.',
    summary:
      'Manage services, invoices, domains, support tickets, and account details through a branded WHMCS and Lagom portal.',
    features: ['Services and invoices', 'Domains', 'Support tickets', 'Account details', 'Branded WHMCS + Lagom portal'],
    related: ['agencies/hosting'],
  },
  {
    slug: 'agencies/custom-build',
    name: 'Custom Builds by Inventomo',
    category: 'agencies',
    icon: 'Hammer',
    status: 'enquiry',
    headline: 'Need something different? Ask Inventomo to build it for you.',
    summary:
      'Inventomo designs and builds custom platforms, then runs them on Hosttiva infrastructure with continuing support.',
    features: ['Custom websites', 'Web applications', 'E-commerce platforms', 'PWAs', 'AI chatbots', 'RAG systems', 'CRM dashboards', 'n8n workflows', 'Billing portals', 'WHMCS integrations', 'Hosting marketplaces', 'Game-server platforms', 'Custom cloud architectures'],
    related: ['solutions/inventomo-web-solutions'],
  },

  // ── Solutions ──────────────────────────────────────────────────────
  {
    slug: 'solutions/crm',
    name: 'CRM Hosting',
    category: 'solutions',
    icon: 'Contact',
    status: 'enquiry',
    headline: 'Run your customer-management platform on reliable infrastructure.',
    summary:
      'Host your CRM, customer database, sales workflows, support system, and business automations in a secure managed environment.',
    related: ['solutions/n8n', 'hosting/vps'],
  },
  {
    slug: 'solutions/ecommerce',
    name: 'Managed E-commerce',
    category: 'solutions',
    icon: 'ShoppingBag',
    status: 'enquiry',
    headline: 'Infrastructure for online stores that are ready to grow.',
    summary:
      'Support online stores with performance tuning, backups, SSL, security, database support, and an upgrade path.',
    related: ['sell-online/managed-ecommerce', 'hosting/woocommerce'],
  },
  {
    slug: 'solutions/ai-vps',
    name: 'AI VPS',
    category: 'solutions',
    icon: 'Cpu',
    status: 'available',
    planGroup: 'apps',
    headline: 'High-resource infrastructure for AI applications and automation.',
    summary:
      'Deploy LLM applications, RAG systems, AI agents, chatbots, vector databases, and automation services.',
    related: ['hosting/ai-vps', 'products/ai-agents'],
  },
  {
    slug: 'solutions/n8n',
    name: 'n8n Hosting',
    category: 'solutions',
    icon: 'Workflow',
    status: 'available',
    planGroup: 'apps',
    headline: 'Run your own business automation workflows.',
    summary:
      'Connect forms, CRMs, email, databases, APIs, notifications, and AI tools through a managed n8n environment.',
    related: ['products/self-hosted-n8n'],
  },
  {
    slug: 'solutions/cloudpanel',
    name: 'CloudPanel Hosting',
    category: 'solutions',
    icon: 'PanelTop',
    status: 'available',
    planGroup: 'apps',
    headline: 'A lightweight application environment for developers.',
    summary:
      'Deploy PHP, Node.js, Python, static websites, reverse proxies, databases, SSL, cron jobs, and application services.',
    features: ['NGINX', 'PHP-FPM', 'Redis', 'Node.js', 'Python', 'Static sites', 'Reverse proxies', 'Cron jobs'],
    related: ['hosting/web-apps'],
  },
  {
    slug: 'solutions/scripts',
    name: 'Application Script Hosting',
    category: 'solutions',
    icon: 'FileCode',
    status: 'enquiry',
    headline: 'Launch compatible business scripts with a prepared environment.',
    summary:
      'Deploy supported dashboards, booking systems, CRM tools, helpdesks, and PHP applications with installation assistance.',
    related: ['solutions/cloudpanel'],
  },
  {
    slug: 'solutions/root-whm',
    name: 'Root WHM Access',
    category: 'solutions',
    icon: 'KeyRound',
    status: 'enquiry',
    headline: 'Manage hosting accounts with powerful WHM controls.',
    summary:
      'Create packages, manage customer accounts, configure DNS, control resources, assign reseller permissions, and manage shared-hosting infrastructure.',
    related: ['solutions/reseller'],
    hideInNav: true,
  },
  {
    slug: 'solutions/reseller',
    name: 'Reseller Hosting',
    category: 'solutions',
    icon: 'Repeat',
    status: 'available',
    planGroup: 'agency',
    headline: 'Build and sell hosting under your own brand.',
    summary:
      'Create hosting plans, manage client accounts, use private nameservers, connect WHMCS, and generate recurring revenue.',
    features: ['WHM', 'Private nameservers', 'WHMCS integration', 'Custom packages'],
    related: ['agencies/hosting', 'solutions/root-whm'],
  },
  {
    slug: 'solutions/dedicated',
    name: 'Dedicated Infrastructure',
    category: 'solutions',
    icon: 'HardDrive',
    status: 'enquiry',
    headline: 'Private hardware for serious workloads.',
    summary:
      'Use an entire physical server for enterprise applications, large databases, AI workloads, high-traffic websites, and game networks.',
    related: ['hosting/dedicated'],
  },
];

/** Solutions mega-menu order from SRS section 2. */
export const SOLUTIONS_NAV = [
  'solutions/crm',
  'solutions/ecommerce',
  'solutions/ai-vps',
  'solutions/n8n',
  'solutions/cloudpanel',
  'solutions/scripts',
  'solutions/reseller',
  'solutions/dedicated',
  'agencies/custom-build',
];

/** Generic FAQs per category; shown on product pages and emitted as FAQPage JSON-LD. */
export const CATEGORY_FAQS: Partial<Record<CategoryId, Faq[]>> = {
  hosting: [
    { q: 'Is migration included?', a: 'Free migration is available on eligible plans. Our team moves your files, databases and email and checks the site before DNS is switched.' },
    { q: 'Can I upgrade later?', a: 'Yes. You can move from shared hosting to VPS, cloud or dedicated infrastructure as your site or application grows.' },
    { q: 'Are renewal prices different from the first term?', a: 'They can be. Every plan shows the introductory price and the renewal price separately so you know what you will pay after the first term.' },
  ],
  domains: [
    { q: 'Can I manage DNS myself?', a: 'Yes. Domains registered or transferred to Hosttiva are managed from the client area, including DNS records and nameservers.' },
    { q: 'Do I need hosting to register a domain?', a: 'No. You can register a domain on its own and connect it to hosting, email or a VPS later.' },
  ],
  email: [
    { q: 'Do you set up SPF, DKIM and DMARC?', a: 'Yes. We help configure the DNS records your domain needs for reliable delivery.' },
    { q: 'Can I send bulk email to purchased lists?', a: 'No. Email marketing on Hosttiva must be permission-based. You need consent from subscribers and must include unsubscribe options.' },
  ],
  agencies: [
    { q: 'Can my clients see the Hosttiva name?', a: 'White-label plans let you present hosting and the client area under your own agency brand.' },
    { q: 'Can Inventomo build projects for my clients?', a: 'Yes. Inventomo can take on design, development, migration and custom builds that you resell or manage.' },
  ],
  ai: [
    { q: 'Where does my data live?', a: 'AI services run on Hosttiva-managed infrastructure. We will confirm hosting location, data handling and model providers for your setup before you sign up.' },
    { q: 'Can Inventomo build a custom assistant or agent?', a: 'Yes. Inventomo builds chatbots, RAG systems and agents connected to your own documents and tools.' },
  ],
};

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productUrl = (p: Product) => `/${p.slug}`;
export const productsIn = (c: CategoryId) => PRODUCTS.filter((p) => p.category === c && !p.hideInNav);
