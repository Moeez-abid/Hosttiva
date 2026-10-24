// Single source of truth for site-wide settings and every client-area link.
// All WHMCS URLs are PLACEHOLDERS until the Lagom client area is live.

export const SITE = {
  name: 'Hosttiva',
  fullName: 'Hosttiva by Inventomo',
  parent: 'Inventomo',
  tagline: 'Host what you build.',
  url: 'https://hosttiva.com',
  description:
    'Hosting, domains, business email, cloud and VPS, application deployment, AI automation and game servers, with human support from Hosttiva by Inventomo.',
  locale: 'en',
  ogImage: '/og-default.png',
  // Interim contact inbox until hosttiva.com and its mailboxes exist (owner's choice, 2026-10-25).
  email: 'rulesheaven1@gmail.com',
  inventomoUrl: 'https://inventomo.com',
  twitter: '',
  sameAs: [] as string[],
} as const;

/**
 * Monitoring (SRS §6). Each is off while null. Paste the value, push, done.
 * - cfBeaconToken: Cloudflare dashboard → Analytics & Logs → Web Analytics → Add site → copy the token
 *   (cookieless, no consent banner needed). Alternative: enable "automatic setup" on the Pages project instead.
 * - googleSiteVerification / bingSiteVerification: the content="" value of each tool's HTML meta-tag method.
 * GA4 and Microsoft Clarity set cookies: add them only after the cookie banner + privacy policy exist.
 */
export const MONITORING = {
  cfBeaconToken: null as string | null,
  googleSiteVerification: null as string | null,
  bingSiteVerification: null as string | null,
};

/** Public status page (infra/status-page). null → /status shows a "launching soon" notice. */
export const STATUS_URL: string | null = null;

/**
 * Live SSL check API (infra/ssl-check-api). null → the SSL checker falls back to
 * certificate-transparency logs (crt.sh). Set to e.g. 'https://tools.hosttiva.com/ssl' once deployed.
 */
export const SSL_CHECK_API: string | null = null;

/** Base URL of the WHMCS + Lagom client area (out of scope for this repo). */
export const CLIENT_AREA = 'https://client.hosttiva.com';

/**
 * PRE-LAUNCH SWITCH. false = the WHMCS client area is not live yet: every order, quote, ticket and client-area
 * link goes to /contact (subject prefilled), plan buttons read "Notify me at launch", domain forms check
 * registration via the free WHOIS tool, and a launch notice shows site-wide.
 * Flip to true once client.hosttiva.com works and WHMCS product ids are in plans.ts.
 */
export const CLIENT_AREA_LIVE = false;

/**
 * DOMAIN SWITCH. false = hosttiva.com is not registered yet: every page is noindex and robots.txt blocks
 * crawlers, so nothing gets indexed at hosttiva.pages.dev. Flip to true once hosttiva.com serves the site.
 */
export const DOMAIN_LIVE = false;
export const PRELAUNCH = !CLIENT_AREA_LIVE;

const contact = (subject?: string) => `/contact${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const LINKS = {
  clientArea: CLIENT_AREA_LIVE ? `${CLIENT_AREA}/clientarea.php` : contact(),
  getStarted: CLIENT_AREA_LIVE ? `${CLIENT_AREA}/cart.php` : '/pricing',
  ticket: CLIENT_AREA_LIVE ? `${CLIENT_AREA}/submitticket.php` : contact('Support question'),
  /** Enquiry / quote requests: WHMCS contact form when live, otherwise the site's contact page. */
  enquiry: (subject?: string) =>
    CLIENT_AREA_LIVE ? `${CLIENT_AREA}/contact.php${subject ? `?subject=${encodeURIComponent(subject)}` : ''}` : contact(subject),
  /** WHMCS domain checker (used only when live). The search form appends ?query=<domain>. */
  domainSearch: `${CLIENT_AREA}/cart.php?a=add&domain=register`,
  domainTransfer: `${CLIENT_AREA}/cart.php?a=add&domain=transfer`,
  /**
   * Order link for a WHMCS product id. Live: exact product (pid) or the group store page.
   * Pre-launch: launch-notice enquiry naming the plan.
   */
  order: (pid: number | null, group = '', label = '') =>
    CLIENT_AREA_LIVE
      ? pid ? `${CLIENT_AREA}/cart.php?a=add&pid=${pid}` : `${CLIENT_AREA}/store/${group}`
      : contact(`Launch notice: ${label || group}`),
} as const;
