// Comparison pages (SRS final assessment: "detailed comparison pages"). Generic, honest trade-offs;
// Hosttiva-specific facts only where products.ts / plans.ts already state them.
import type { Faq } from './products';

/** true = included, false = not included, string = qualified answer. */
export type Cell = boolean | string;

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  intro: string;
  columns: { name: string; href: string; summary: string }[];
  rows: { label: string; cells: Cell[] }[];
  verdicts: { title: string; text: string }[];
  faqs: Faq[];
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'shared-vs-vps-vs-cloud',
    title: 'Shared vs VPS vs Cloud hosting',
    description: 'How shared hosting, a VPS and cloud hosting differ in resources, control, maintenance and price, and which one your project needs.',
    intro: 'All three run your website. They differ in who shares the machine, how much you control, and who does the maintenance.',
    columns: [
      { name: 'Shared hosting', href: '/hosting/web', summary: 'Many accounts on one server, managed for you.' },
      { name: 'VPS', href: '/hosting/vps', summary: 'Reserved resources on a virtual server, with root access.' },
      { name: 'Cloud hosting', href: '/hosting/cloud', summary: 'Managed infrastructure for sites and apps that are growing.' },
    ],
    rows: [
      { label: 'Resources', cells: ['Shared, limited per account', 'Reserved CPU, RAM and storage', 'Dedicated resources, managed'] },
      { label: 'Control panel', cells: ['cPanel', 'CloudPanel or none', 'Managed environment'] },
      { label: 'Root access', cells: [false, 'Where available', false] },
      { label: 'Run any runtime (Node.js, Python, Docker)', cells: [false, true, 'Supported stacks'] },
      { label: 'Background jobs and workers', cells: [false, true, true] },
      { label: 'Server maintenance', cells: ['Done for you', 'You, or managed plans', 'Done for you'] },
      { label: 'Email on your domain included', cells: [true, false, false] },
      { label: 'Good for', cells: ['Blogs, company sites, small stores', 'Apps, APIs, custom stacks', 'High-traffic sites and SaaS'] },
      { label: 'Technical skill needed', cells: ['Low', 'Medium to high', 'Low to medium'] },
      { label: 'Upgrade path', cells: ['Bigger plan, then VPS or cloud', 'More resources, then dedicated', 'Dedicated infrastructure'] },
    ],
    verdicts: [
      { title: 'Choose shared hosting', text: 'when you run a website or small store on WordPress or PHP and want email, SSL and backups handled for you.' },
      { title: 'Choose a VPS', text: 'when you need your own runtime, background workers, Docker or root access, and are comfortable with a server (or pick a managed plan).' },
      { title: 'Choose cloud hosting', text: 'when a site or app has outgrown shared hosting and you want more stability without managing the server yourself.' },
    ],
    faqs: [
      { q: 'Can I start on shared hosting and move later?', a: 'Yes. Moving to a VPS or cloud plan is a migration to a different server; it is free on eligible plans and DNS is only switched after the site is checked.' },
      { q: 'Is a VPS faster than shared hosting?', a: 'Not automatically. A VPS gives you reserved resources, which helps under load, but a well-cached site on shared hosting can be very fast. Measure before you move.' },
    ],
  },
  {
    slug: 'wordpress-vs-managed-wordpress',
    title: 'Regular vs Managed WordPress hosting',
    description: 'What managed WordPress adds over installing WordPress on regular hosting: updates, backups, caching, staging and WordPress-aware support.',
    intro: 'WordPress runs on almost any PHP hosting. Managed WordPress adds the upkeep, so you spend less time maintaining the site.',
    columns: [
      { name: 'WordPress on web hosting', href: '/hosting/web', summary: 'You install and maintain WordPress yourself.' },
      { name: 'Managed WordPress', href: '/hosting/wordpress', summary: 'WordPress installed, updated, cached and backed up for you.' },
    ],
    rows: [
      { label: 'WordPress installation', cells: ['You install it', true] },
      { label: 'Core and plugin updates', cells: ['You apply them', 'Managed on WP Care and above'] },
      { label: 'Backups', cells: ['Per plan', 'Weekly to daily, per plan'] },
      { label: 'Caching tuned for WordPress', cells: ['You configure a plugin', true] },
      { label: 'Staging site', cells: ['Business plan and above', 'WP Business and above'] },
      { label: 'Malware checks', cells: ['Professional plan', 'WP Care and above'] },
      { label: 'Migration help', cells: ['Eligible plans', true] },
      { label: 'Email on your domain', cells: [true, 'Add business email'] },
      { label: 'Best for', cells: ['People comfortable maintaining WordPress', 'Business sites and stores that must stay up'] },
    ],
    verdicts: [
      { title: 'Choose regular web hosting', text: 'for a personal blog or a site you are happy to update and back up yourself, or when you need several non-WordPress sites too.' },
      { title: 'Choose managed WordPress', text: 'when the site matters to your business, runs WooCommerce, or nobody on your team wants to own updates and backups.' },
    ],
    faqs: [
      { q: 'Can I switch from regular to managed WordPress later?', a: 'Yes. We migrate the site to a managed WordPress plan; eligible plans include migration.' },
      { q: 'Do managed plans limit which plugins I can use?', a: 'You can install the plugins you need. We help with common plugins and themes, and will tell you if a plugin is known to cause problems.' },
    ],
  },
  {
    slug: 'web-hosting-vs-app-hosting',
    title: 'Web hosting vs App hosting',
    description: 'cPanel web hosting compared with a managed application VPS: which runs websites best, and which runs Node.js, Python, APIs and AI tools.',
    intro: 'Websites and applications have different needs. cPanel hosting is built for sites and email; application hosting is built for long-running code.',
    columns: [
      { name: 'Web hosting (cPanel)', href: '/hosting/web', summary: 'Websites, WordPress and email on a managed shared server.' },
      { name: 'App hosting (CloudPanel VPS)', href: '/hosting/web-apps', summary: 'Node.js, Python, PHP apps and APIs on a managed VPS.' },
    ],
    rows: [
      { label: 'PHP websites and WordPress', cells: [true, true] },
      { label: 'Node.js and Python apps', cells: [false, true] },
      { label: 'Long-running processes and websockets', cells: [false, true] },
      { label: 'Redis and custom databases', cells: [false, 'App Growth and above'] },
      { label: 'Email hosting', cells: [true, false] },
      { label: 'Deployment', cells: ['File Manager, FTP, Git', 'Git and deployment assistance'] },
      { label: 'Firewall and server security', cells: ['Managed', 'Configured with your plan'] },
      { label: 'Examples', cells: ['Company site, blog, small store', 'PWA, API, SaaS, chatbot, n8n'] },
    ],
    verdicts: [
      { title: 'Choose web hosting', text: 'for websites, WordPress and email under one simple control panel.' },
      { title: 'Choose app hosting', text: 'for code that runs continuously: APIs, dashboards, PWAs, bots, automation and AI tools.' },
    ],
    faqs: [
      { q: 'Can I use both?', a: 'Yes. A common setup is the marketing site and email on web hosting, and the app on an application VPS, each on its own subdomain.' },
    ],
  },
];

export const getComparison = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
