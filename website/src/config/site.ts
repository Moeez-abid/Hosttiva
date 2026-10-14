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
  // PLACEHOLDER contact details — confirm before launch.
  email: 'hello@hosttiva.com',
  inventomoUrl: 'https://inventomo.com',
  twitter: '',
  sameAs: [] as string[],
} as const;

/**
 * Live SSL check API (infra/ssl-check-api). null → the SSL checker falls back to
 * certificate-transparency logs (crt.sh). Set to e.g. 'https://tools.hosttiva.com/ssl' once deployed.
 */
export const SSL_CHECK_API: string | null = null;

/** Base URL of the WHMCS + Lagom client area (out of scope for this repo). */
export const CLIENT_AREA = 'https://client.hosttiva.com';

export const LINKS = {
  clientArea: `${CLIENT_AREA}/clientarea.php`,
  getStarted: `${CLIENT_AREA}/cart.php`,
  /** Enquiry / quote requests go to the WHMCS contact form. */
  enquiry: (subject?: string) =>
    `${CLIENT_AREA}/contact.php${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`,
  /** WHMCS domain checker. The search form appends ?query=<domain>. */
  domainSearch: `${CLIENT_AREA}/cart.php?a=add&domain=register`,
  domainTransfer: `${CLIENT_AREA}/cart.php?a=add&domain=transfer`,
  /**
   * Order link for a WHMCS product id. Until real pids exist, plans carry
   * `pid: null` and fall back to the product group store page.
   */
  order: (pid: number | null, group = '') =>
    pid ? `${CLIENT_AREA}/cart.php?a=add&pid=${pid}` : `${CLIENT_AREA}/store/${group}`,
} as const;
