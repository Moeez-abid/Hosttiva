import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// WHMCS admin lives on the client-area host and is blocked there; these cover this host.
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /admin
Disallow: /staging
Disallow: /cache
Disallow: /pagefind/

Sitemap: ${SITE.url}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
