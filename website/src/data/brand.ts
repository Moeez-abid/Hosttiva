// Brand foundation copy from docs/SRS.md ("Brand assets", sections 1–6 of the master additions).
export const BRAND = {
  promise: 'Reliable infrastructure backed by people who build technology.',
  promiseLines: ['Reliable infrastructure.', 'Transparent pricing.', 'Expert support.', 'Technology that grows with your business.'],
  mission:
    'To empower businesses, developers, agencies, and creators with reliable hosting, cloud infrastructure, AI solutions, and expert technical services—all from one trusted platform.',
  vision:
    'To become one of the world’s most trusted cloud infrastructure and digital services companies by combining dependable technology with expert human support.',
  usp: 'Hosttiva combines modern hosting infrastructure with Inventomo’s software development and AI expertise—so you can build, host, and scale from one trusted partner.',
  mainMessage: 'Hosttiva hosts your technology. Inventomo helps you create it.',
  positioning:
    'Hosttiva provides hosting, domains, business email, cloud infrastructure, application deployment, reseller tools, AI automation, game servers, and managed technical support. When customers need a website, application, automation system, or digital platform, Inventomo provides the development expertise behind Hosttiva.',
  finalStatement: 'Hosttiva by Inventomo gives you the infrastructure to launch, the tools to manage, and the expertise to grow.',
};

export const VALUES: { name: string; text: string }[] = [
  { name: 'Reliability', text: 'Services that behave the same on day 400 as on day one.' },
  { name: 'Transparency', text: 'Published limits, renewal prices on the label, honest status updates.' },
  { name: 'Performance', text: 'Fast defaults, and a clear upgrade path when you outgrow them.' },
  { name: 'Security', text: 'SSL, backups and sensible hardening as standard, not an upsell.' },
  { name: 'Simplicity', text: 'Plain language and fewer steps between an idea and a live service.' },
  { name: 'Innovation', text: 'AI and automation where they help, not where they make a headline.' },
  { name: 'Customer Success', text: 'People who answer, understand the stack, and follow through.' },
];

export const AUDIENCES: { name: string; icon: string }[] = [
  { name: 'Startups', icon: 'Rocket' },
  { name: 'Small businesses', icon: 'Store' },
  { name: 'SaaS companies', icon: 'Layers' },
  { name: 'Developers', icon: 'Terminal' },
  { name: 'Agencies', icon: 'Building2' },
  { name: 'E-commerce stores', icon: 'ShoppingCart' },
  { name: 'AI builders', icon: 'BrainCircuit' },
  { name: 'Content creators', icon: 'PenLine' },
  { name: 'Gaming communities', icon: 'Gamepad2' },
  { name: 'Students and education', icon: 'GraduationCap' },
  { name: 'Non-profits', icon: 'HeartHandshake' },
  { name: 'Enterprises', icon: 'Landmark' },
];

/** Product ecosystem (SRS "Create a Product Ecosystem"). */
export const ECOSYSTEM: { name: string; href: string }[] = [
  { name: 'Hosting', href: '/hosting/web' },
  { name: 'Domains', href: '/domains/search' },
  { name: 'Email', href: '/email/business' },
  { name: 'Cloud', href: '/hosting/cloud' },
  { name: 'AI', href: '/products/managed-ai-assistant' },
  { name: 'Automation', href: '/products/self-hosted-n8n' },
  { name: 'Game servers', href: '/hosting/game-servers' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Professional services', href: '/solutions/inventomo-web-solutions' },
];

export const WHY_CHOOSE = [
  'Built by developers, not just hosting resellers',
  'Infrastructure plus development expertise',
  'Transparent pricing with no renewal surprises',
  'AI-ready infrastructure',
  'Human technical support',
  'Website migration assistance',
  'Flexible upgrade paths',
];
