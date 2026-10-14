import type { APIRoute } from 'astro';
import { SITE } from '../../config/site';
import { SECURITY_EMAIL } from '../../data/trust';

// RFC 9116. Expires is regenerated on every build (one year ahead).
export const GET: APIRoute = () => {
  const expires = new Date(Date.now() + 365 * 864e5).toISOString();
  return new Response(
    `Contact: mailto:${SECURITY_EMAIL}
Expires: ${expires}
Preferred-Languages: en
Canonical: ${SITE.url}/.well-known/security.txt
Policy: ${SITE.url}/trust#responsible-disclosure
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
