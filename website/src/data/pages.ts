// Pages referenced by the navigation/footer that are planned for later phases.
// Each gets a lightweight noindex placeholder so no link 404s. See docs/ROADMAP.md.
export interface PlannedPage { slug: string; title: string; blurb: string; phase: 2 | 3 | 4 }

export const PLANNED_PAGES: PlannedPage[] = [
  { slug: 'knowledgebase', title: 'Knowledge Base', blurb: 'Help articles and guides for every Hosttiva service.', phase: 3 },
  { slug: 'tutorials', title: 'Tutorials', blurb: 'Step-by-step articles to help you launch, manage, and grow online.', phase: 2 },
  { slug: 'academy', title: 'Hosttiva Academy', blurb: 'Practical video guides for websites, hosting, cloud, applications, and online business.', phase: 3 },
  { slug: 'learning-lab', title: 'Learning Lab', blurb: 'Guided learning paths to build, launch, and grow online.', phase: 3 },
  { slug: 'status', title: 'Status', blurb: 'Live service status and maintenance announcements.', phase: 3 },
  { slug: 'developers', title: 'Developer Center', blurb: 'API, CLI, Git deploy, SSH keys, Docker, runtimes, webhooks and API tokens.', phase: 3 },
  { slug: 'community', title: 'Community', blurb: 'Feature requests, partner directory, developer community and customer stories.', phase: 3 },
  { slug: 'infrastructure', title: 'Infrastructure', blurb: 'Server locations, data centres, CPU platforms, storage, backups and disaster recovery.', phase: 3 },
  { slug: 'performance', title: 'Performance', blurb: 'The web servers, caching and network technology behind Hosttiva plans.', phase: 3 },
  { slug: 'enterprise', title: 'Enterprise', blurb: 'Private cloud, architecture consulting, migration planning and managed services.', phase: 3 },
  { slug: 'careers', title: 'Careers', blurb: 'Open roles at Hosttiva and Inventomo.', phase: 2 },
  { slug: 'legal/privacy', title: 'Privacy Policy', blurb: 'How Hosttiva collects, uses and protects personal data.', phase: 2 },
  { slug: 'legal/terms', title: 'Terms of Service', blurb: 'The terms that apply to every Hosttiva service.', phase: 2 },
  { slug: 'legal/acceptable-use', title: 'Acceptable Use Policy', blurb: 'What you can and cannot run on Hosttiva infrastructure.', phase: 2 },
  { slug: 'legal/refund', title: 'Refund Policy', blurb: 'Refund and cancellation terms by service type.', phase: 2 },
  { slug: 'legal/sla', title: 'Service Level Agreement', blurb: 'Uptime commitments and service credits.', phase: 2 },
  { slug: 'legal/backup', title: 'Backup Policy', blurb: 'Backup frequency, retention and restore terms.', phase: 2 },
  { slug: 'legal/abuse', title: 'Abuse Reporting', blurb: 'How to report abuse, spam or copyright issues.', phase: 2 },
];
