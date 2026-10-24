# Hosttiva launch checklist

Everything that needs a person, an account or a server, in the order it unblocks the most. The website code is
ready for each step; the file to edit is named on every line. Check items off here as you go.

Current state: the site is live at **https://hosttiva.pages.dev** in **pre-launch mode** (`CLIENT_AREA_LIVE = false`),
so no button links to a client area that does not exist yet, and **hidden from search** (`DOMAIN_LIVE = false`:
noindex everywhere, robots.txt blocks crawlers). The contact inbox is temporarily `rulesheaven1@gmail.com`.

## 1. Domain and DNS (unblocks the real address and SEO)

- [ ] Register `hosttiva.com` (and consider `.pk` / common typos).
- [ ] Add the domain to Cloudflare and switch the registrar's nameservers to Cloudflare's.
- [ ] Cloudflare → Workers & Pages → **hosttiva** → Custom domains → add `hosttiva.com` and `www.hosttiva.com`.
- [ ] Check https://hosttiva.com loads; canonicals, sitemaps and share images already point there.
- [ ] Set `DOMAIN_LIVE = true` in `website/src/config/site.ts` (re-enables indexing and the normal robots.txt).

## 2. Email (unblocks contact and security reports)

- [ ] Create mailboxes: `hello@`, `security@`, `abuse@` (and `billing@` if wanted).
- [ ] Add MX, SPF, DKIM and DMARC records (guide: `/knowledgebase/deliverability-records`).
- [ ] Change `SITE.email` in `website/src/config/site.ts` from the interim Gmail to `hello@hosttiva.com`.
- [ ] Change `SECURITY_EMAIL` in `website/src/data/trust.ts` to `security@hosttiva.com` (also feeds `/.well-known/security.txt`).

## 3. Prices and plans (unblocks honest pricing)

- [ ] Confirm every price, renewal price and resource limit in `website/src/data/plans.ts`.
- [ ] Set `PRICES_ARE_PLACEHOLDERS = false` (removes the "Draft prices" badges).
- [ ] Confirm marketplace prices, delivery times and support periods in `website/src/data/marketplace.ts`, then set
      `MARKETPLACE_DETAILS_ARE_PLACEHOLDERS = false`.
- [ ] Confirm which "quote" products you actually sell today; switch any you don't to `status: 'coming-soon'` in
      `website/src/data/products.ts`.

## 4. Legal (required before taking money)

- [ ] Send the 14 drafts in `website/src/content/legal/` to a Pakistan-based legal professional.
- [ ] Fill every `[bracketed]` placeholder; set `status: final` and an `effective:` date in each file.
- [ ] Remove `'/legal'` from `NOINDEX_PREFIXES` in `website/src/config/noindex.ts`.
- [ ] Add a cookie banner only if you add cookie-based analytics (GA4/Clarity).

## 5. WHMCS client area (unblocks ordering, quotes, domains, tickets)

- [ ] Install WHMCS + Lagom at `client.hosttiva.com`, then apply the branding kit in `whmcs-addons/` (README: Lagom
      Style Manager values, CSS + hooks upload, email header/footer).
- [ ] Connect payment gateway, domain registrar module, and email delivery (SMTP).
- [ ] Create product groups matching `whmcsGroup` in `plans.ts` (`web-hosting`, `wordpress`, `applications`,
      `reseller`, `game-servers`) and the products inside them.
- [ ] Put each WHMCS product id into `pid` for its plan in `plans.ts`.
- [ ] Set `CLIENT_AREA_LIVE = true` in `website/src/config/site.ts`. Every button switches to WHMCS at once.
- [ ] Test an order, a domain search, a quote request and a ticket end to end.

## 6. Servers

- [ ] **Status page** (separate small VPS): follow `infra/status-page/README.md`, then set `STATUS_URL` in `site.ts`.
- [ ] **Live SSL checker**: follow `infra/ssl-check-api/README.md`, then set `SSL_CHECK_API` in `site.ts`.
- [ ] **Hosting infrastructure**: cPanel/WHM servers, CloudPanel VPS template, separate game cluster (Pterodactyl).
- [ ] **One-click apps**: test each stack in `deploy-stacks/` on a real VPS, pin image versions, then wire `deploy.sh`
      into WHMCS provisioning.

## 7. Monitoring and search

- [ ] Cloudflare Web Analytics: enable it on the Pages project, or paste the token into `MONITORING.cfBeaconToken`.
- [ ] Google Search Console + Bing Webmaster: verify (`MONITORING.googleSiteVerification`, `bingSiteVerification`)
      and submit `https://hosttiva.com/sitemap-index.xml`.
- [ ] Run PageSpeed Insights (https://pagespeed.web.dev) on the home, pricing and a product page; target 95+.

## 8. Content to replace or add

- [ ] Real logo files (current mark is a placeholder-quality SVG in `website/src/components/Logo.astro`).
- [ ] Social profiles → `SITE.sameAs` / `SITE.twitter` in `site.ts`.
- [ ] Trust Center pending topics (privacy, infrastructure, encryption, DDoS, incidents) in `website/src/data/trust.ts`
      once facts are confirmed.
- [ ] Remove the pre-launch bar automatically by completing step 5.

## 9. Final pre-launch test (SRS §19)

- [ ] SSL on every domain and subdomain · CDN · DNS · backups · monitoring · status page
- [ ] Payment gateway · registrar · email delivery · support desk · WHMCS automation
- [ ] Legal pages final · mobile test on a real phone · speed test · security headers check (securityheaders.com)
