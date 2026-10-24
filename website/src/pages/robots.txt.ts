import type { APIRoute } from 'astro';
import { SITE, DOMAIN_LIVE } from '../config/site';

// WHMCS admin lives on the client-area host and is blocked there; these cover this host.
export const GET: APIRoute = () =>
  new Response(
    !DOMAIN_LIVE
      ? `# Pre-launch: the real domain is not live yet, so crawling is disabled (DOMAIN_LIVE in site.ts).\nUser-agent: *\nDisallow: /\n`
      : `User-agent: *
Allow: /
Disallow: /admin
Disallow: /staging
Disallow: /cache
Disallow: /pagefind/

Sitemap: ${SITE.url}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
