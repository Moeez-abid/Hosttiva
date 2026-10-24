# Hosttiva by Inventomo — public marketing site

Tagline: "Host what you build." Client area (WHMCS + Lagom, client.hosttiva.com) is OUT of scope.

## Stack (fixed)
Astro (static) + TypeScript + Tailwind v4 (`@tailwindcss/vite`) · MDX content collections · Pagefind ·
Lucide icons only (`src/components/Icon.astro`) · SF Pro system stack + self-hosted Inter Variable (opsz) fallback ·
@astrojs/sitemap · Cloudflare Pages via GitHub Actions. Islands only if unavoidable (Svelte OR React, not both).

## Layout
- `website/` Astro site · `docs/` SRS.md, ROADMAP.md, LAUNCH.md · `whmcs-addons/` client-area branding kit (CSS built
  from tokens: `node whmcs-addons/scripts/build-css.mjs`) · `deploy-stacks/` one-click apps · `infra/` status page + SSL API
- `website/src/config/site.ts` — site info + ALL client-area URLs (only place they live)
- `website/src/config/nav.ts` — header/footer menus, built from data
- `website/src/data/products.ts` — every product/solution page (`pages/[...slug].astro` generates them)
- `website/src/data/plans.ts` — plan groups + PLACEHOLDER prices (`PRICES_ARE_PLACEHOLDERS`)
- `website/src/data/pages.ts` — planned (Phase 2+) pages rendered as noindex placeholders
- `website/src/styles/tokens.css` — the only place colours/type/radii are defined (match Lagom to it)
- `DESIGN.md` — visual system (Apple language); `PRODUCT.md` — product truth for design work

## Commands (run in `website/`)
`npm run dev` · `npm run build` (astro build + pagefind) · `npm run preview` · `npm run check`

## Brand rules
- Apple design language (see DESIGN.md): neutral grounds, ONE accent (system blue #0071e3), SF Pro/Inter, pills, glass only on floating chrome.
- Every new page MUST ship motion via the shared hooks (DESIGN.md › Motion): `data-split` on H1/H2, `.enter`, `.reveal` + `data-stagger`, `data-tilt`, `data-count`; 3D where it fits.
- Banned: eyebrows/kickers above headings, mono as decoration, gradient text, glow blobs, emoji icons, hype copy, identical card grids.
- "Powered by Inventomo" in footer. Promo and renewal prices shown separately.
- Never publish SRS-conditional items (GPU, Windows, AI website builder, Envato names, affiliate %):
  set `status: 'coming-soon'` → enquiry CTA, no prices, noindex.
- No fake checkout: plan buttons use `LINKS.order()` from site.ts. Never hard-code prices in pages.
- `CLIENT_AREA_LIVE` in site.ts (false = pre-launch): all client-area links go to /contact; flip to true when WHMCS is live. Always use `LINKS.*`, never hard-code client.hosttiva.com.
- `DOMAIN_LIVE` in site.ts (false = no domain yet): whole site noindex + robots Disallow; flip when hosttiva.com serves the site.

## Working rules
- Plan ≤10 bullets, then execute. No subagents, no broad repo exploration.
- Read `docs/SRS.md` by section (offset/limit; `grep -n '^#' docs/SRS.md` for the map). Never cat it whole.
- Generate pages from data + shared components. No new deps without asking.
- `npm run build` once per milestone; pipe long output through `tail -n 30`.
- Work in LARGE milestones (several related modules per batch, no stops between them). At the end of a batch: `git add`, one commit message, ask the user to commit + push, then wait.
