# Hosttiva website roadmap

Derived from SRS sections 3–6. Phase 1 (scaffold, homepage, product pages, pricing, SEO base) is done.
Placeholder pages for Phase 2+ already exist in `website/src/data/pages.ts` (noindex); replace them as each item ships.

## Before launch (blockers)
- [ ] Confirm placeholder marketplace prices/delivery/support in `marketplace.ts`, and the security@ mailbox
- [ ] Replace placeholder prices in `website/src/data/plans.ts`, then set `PRICES_ARE_PLACEHOLDERS = false` (turns on Offer schema later)
- [ ] Flip `CLIENT_AREA_LIVE` to true in site.ts when client.hosttiva.com works
- [ ] Add real WHMCS product ids (`pid`) and store group slugs; confirm `CLIENT_AREA` URL in `site.ts`
- [ ] Publish real storage, CPU, RAM, inode, bandwidth, email, backup and support limits per plan
- [ ] Confirm contact email, Inventomo URL and social profiles in `site.ts`
- [ ] Verify reseller licences and third-party software permissions (cPanel/WHM, CloudPanel, Pterodactyl, Mautic)
- [ ] Check the Hosttiva domain, trademark, social handles and business-name availability
- [ ] Create the Cloudflare Pages project `hosttiva` and add `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` GitHub secrets
- [ ] Confirm which `enquiry` products are actually sold today; switch any that are not to `coming-soon`

## Phase 2: legal, content and marketplace
- [ ] Legal pages, written for Hosttiva and reviewed by a Pakistan-based legal professional (do not copy competitors):
  - [ ] Privacy Policy · [ ] Cookie Policy · [ ] Terms of Service · [ ] Acceptable Use Policy
  - [ ] Refund and Cancellation Policy · [ ] Service Level Agreement · [ ] Backup and Restore Policy
  - [ ] Domain Registration Agreement · [ ] Email Usage Policy · [ ] Game Hosting Rules
  - [ ] Data Processing Addendum · [ ] Abuse and Copyright Reporting · [ ] Security Reporting
  - [ ] Account Suspension and Termination Policy
- [ ] Cookie consent banner (privacy-preserving default)
- [x] Solutions marketplace page from a `marketplace.ts` data file. Each item: description, starting price or quote-only,
      delivery time, included work, customer requirements, support period, upgrade options, order/consultation button
  - [ ] Website Launch Pack · Business Website · Online Store · PWA Launch · AI Chatbot Starter · RAG Knowledge Base
  - [ ] Website Migration · Speed Optimization · Security Care · Managed VPS Setup · Agency Starter Kit
  - [ ] Game Server Setup · Google Workspace Setup · Mautic Installation · n8n Automation Setup · Custom Inventomo Build
- [x] Blog via content collection (`src/content/blog`), Article/BlogPosting schema, categories:
      web hosting, WordPress, domains and email, cloud and VPS, PWA/app deployment, AI/LLM/RAG/automation,
      agency and reseller, game servers, security and backups, Hosttiva and Inventomo updates
- [x] First 12 posts from SRS "Initial blog titles"
- [x] Our Story (/about)
- [x] Product Updates / public roadmap (/roadmap)
- [ ] Careers page
- [x] Tutorials collection with HowTo schema (3 tutorials)
- [x] Agency landing page using the SRS "Agency hero" copy
- [x] Pagefind search UI in the header

## Phase 3: free tools, docs and trust
- [ ] Domain search UI island (TLD price list, suggestions) feeding the WHMCS cart
- [x] Free tools, client-side: DNS checker (DoH), WHOIS (RDAP), domain name generator
- [x] SSL checker via Certificate Transparency logs (crt.sh)
- [ ] Deploy `infra/ssl-check-api` to a VPS and set `SSL_CHECK_API` in site.ts for live checks
- [x] Knowledge Base (/knowledgebase): content collection, 6 categories, 12 starter articles, TechArticle schema, own sitemap
- [ ] More KB articles per service; Developer Center (API/CLI docs once the platform has them)
- [ ] Hosttiva Academy (VideoObject schema) and Learning Lab paths
- [x] /status page (monitored services, maintenance, incident history) + Uptime Kuma stack in infra/status-page
- [ ] Deploy infra/status-page to a separate VPS and set STATUS_URL in site.ts
- [x] Trust Center (/trust) with published + "before launch" topics
- [ ] Fill pending Trust topics (privacy, compliance, infrastructure, encryption, DDoS, monitoring, incidents, continuity); Security features page, Infrastructure and Performance pages
- [x] security.txt, humans.txt, HTML sitemap, split sitemaps (products, blog, KB, docs, tutorials, academy, pages)
- [x] 301 redirect map (`public/_redirects`)
- [ ] 410 handling, hreflang if more locales are added
- [x] Per-page OG images (build-time, /og/*.png)
- [ ] WebP/AVIF image pipeline
- [x] Split XML sitemaps (products, blog, tutorials, pages) under sitemap-index.xml
- [x] Static performance budget: ~6 KB JS, 10 KB CSS, ~15 KB HTML per page (gzip); 3D chunk lazy on home only
- [ ] Lighthouse / PageSpeed run on production (target 95+, LCP < 2.5s, CLS < 0.1, INP < 200ms); WCAG 2.2 AA audit
- [x] Monitoring hooks in `site.ts` (Cloudflare Web Analytics, Google + Bing verification): paste IDs to enable
- [ ] GA4 / Microsoft Clarity (after cookie banner + privacy policy), uptime and error monitoring
- [x] Content Security Policy in `_headers`

## Phase 4: one-click deploy and conditional products
- [x] `deploy-stacks/`: 9 compose stacks (n8n, Flowise, Open WebUI, NocoDB, Mautic, AnythingLLM, Langflow, Typebot, Uptime Kuma) + shared HTTPS proxy + `deploy.sh`
- [ ] Wire deploy-stacks into WHMCS provisioning (client-area "Deploy" button) and test each stack on a real VPS
- [ ] Deploy-from-GitHub flow for Web App Hosting
- [x] Customer success page (/customer-success)
- [ ] AI marketplace, Enterprise services and Community pages
- [ ] Conditional products — publish only once confirmed (currently `coming-soon`):
  - [ ] GPU hosting (availability, pricing, locations, storage costs, usage limits)
  - [ ] Windows hosting (upstream support + licensing)
  - [ ] AI-assisted website builder (only if a working builder exists)
  - [ ] Agency directory
  - [ ] Affiliate program commission rates (once terms are final)
  - [ ] Envato brand names only with written permission
- [ ] Match Lagom client-area theme to `website/src/styles/tokens.css`
