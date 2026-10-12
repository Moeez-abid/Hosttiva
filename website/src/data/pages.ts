// Pages referenced by the navigation/footer that are planned for later phases.
// Each gets a lightweight noindex placeholder so no link 404s. See docs/ROADMAP.md.
export interface PlannedPage { slug: string; title: string; blurb: string; phase: 2 | 3 | 4 }

export const PLANNED_PAGES: PlannedPage[] = [
  { slug: 'blog', title: 'Blog', blurb: 'Expert tips, product updates, and customer stories.', phase: 2 },
  { slug: 'roadmap', title: 'Product Updates', blurb: 'Follow the latest Hosttiva releases, improvements, maintenance notices, and upcoming features.', phase: 2 },
  { slug: 'about', title: 'Our Story', blurb: 'Meet the people, technology, and vision behind Hosttiva by Inventomo.', phase: 2 },
  { slug: 'knowledgebase', title: 'Knowledge Base', blurb: 'Help articles and guides for every Hosttiva service.', phase: 3 },
  { slug: 'tutorials', title: 'Tutorials', blurb: 'Step-by-step articles to help you launch, manage, and grow online.', phase: 2 },
  { slug: 'academy', title: 'Hosttiva Academy', blurb: 'Practical video guides for websites, hosting, cloud, applications, and online business.', phase: 3 },
  { slug: 'learning-lab', title: 'Learning Lab', blurb: 'Guided learning paths to build, launch, and grow online.', phase: 3 },
  { slug: 'status', title: 'Status', blurb: 'Live service status and maintenance announcements.', phase: 3 },
  { slug: 'careers', title: 'Careers', blurb: 'Open roles at Hosttiva and Inventomo.', phase: 2 },
  { slug: 'legal/privacy', title: 'Privacy Policy', blurb: 'How Hosttiva collects, uses and protects personal data.', phase: 2 },
  { slug: 'legal/terms', title: 'Terms of Service', blurb: 'The terms that apply to every Hosttiva service.', phase: 2 },
  { slug: 'legal/acceptable-use', title: 'Acceptable Use Policy', blurb: 'What you can and cannot run on Hosttiva infrastructure.', phase: 2 },
  { slug: 'legal/refund', title: 'Refund Policy', blurb: 'Refund and cancellation terms by service type.', phase: 2 },
  { slug: 'legal/sla', title: 'Service Level Agreement', blurb: 'Uptime commitments and service credits.', phase: 2 },
  { slug: 'legal/backup', title: 'Backup Policy', blurb: 'Backup frequency, retention and restore terms.', phase: 2 },
  { slug: 'legal/abuse', title: 'Abuse Reporting', blurb: 'How to report abuse, spam or copyright issues.', phase: 2 },
];
