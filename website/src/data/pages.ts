// Pages referenced by the navigation/footer that are planned for later phases.
// Each gets a lightweight noindex placeholder so no link 404s. See docs/ROADMAP.md.
export interface PlannedPage { slug: string; title: string; blurb: string; phase: 2 | 3 | 4 }

export const PLANNED_PAGES: PlannedPage[] = [
  { slug: 'academy', title: 'Hosttiva Academy', blurb: 'Practical video guides for websites, hosting, cloud, applications, and online business.', phase: 3 },
  { slug: 'learning-lab', title: 'Learning Lab', blurb: 'Guided learning paths to build, launch, and grow online.', phase: 3 },
  { slug: 'developers', title: 'Developer Center', blurb: 'API, CLI, Git deploy, SSH keys, Docker, runtimes, webhooks and API tokens.', phase: 3 },
  { slug: 'community', title: 'Community', blurb: 'Feature requests, partner directory, developer community and customer stories.', phase: 3 },
  { slug: 'infrastructure', title: 'Infrastructure', blurb: 'Server locations, data centres, CPU platforms, storage, backups and disaster recovery.', phase: 3 },
  { slug: 'performance', title: 'Performance', blurb: 'The web servers, caching and network technology behind Hosttiva plans.', phase: 3 },
  { slug: 'enterprise', title: 'Enterprise', blurb: 'Private cloud, architecture consulting, migration planning and managed services.', phase: 3 },
  { slug: 'careers', title: 'Careers', blurb: 'Open roles at Hosttiva and Inventomo.', phase: 2 },
];
