# Hosttiva by Inventomo — public marketing site

Tagline: "Host what you build." Client area (WHMCS + Lagom, client.hosttiva.com) is OUT of scope.

## Stack (fixed)
Astro (static) + TypeScript + Tailwind v4 (`@tailwindcss/vite`) · MDX content collections · Pagefind ·
Lucide icons only (`src/components/Icon.astro`) · Fontsource: Space Grotesk / IBM Plex Sans / IBM Plex Mono ·
@astrojs/sitemap · Cloudflare Pages via GitHub Actions. Islands only if unavoidable (Svelte OR React, not both).

## Layout
- `website/` Astro site · `docs/` SRS.md, ROADMAP.md · `whmcs-addons/`, `deploy-stacks/`, `infra/` stubs
- `website/src/config/site.ts` — site info + ALL client-area URLs (only place they live)
- `website/src/config/nav.ts` — header/footer menus, built from data
- `website/src/data/products.ts` — every product/solution page (`pages/[...slug].astro` generates them)
- `website/src/data/plans.ts` — plan groups + PLACEHOLDER prices (`PRICES_ARE_PLACEHOLDERS`)
- `website/src/data/pages.ts` — planned (Phase 2+) pages rendered as noindex placeholders
- `website/src/styles/tokens.css` — the only place colours/type/radii are defined (match Lagom to it)

## Commands (run in `website/`)
`npm run dev` · `npm run build` (astro build + pagefind) · `npm run preview` · `npm run check`

## Brand rules
- Calm, technical, honest. Dark navy base + light mode, ONE accent (teal), mono for specs.
- No purple/blue gradients, glow blobs, emoji icons, vague hype copy, or identical card grids everywhere.
- "Powered by Inventomo" in footer. Promo and renewal prices shown separately.
- Never publish SRS-conditional items (GPU, Windows, AI website builder, Envato names, affiliate %):
  set `status: 'coming-soon'` → enquiry CTA, no prices, noindex.
- No fake checkout: plan buttons use `LINKS.order()` from site.ts. Never hard-code prices in pages.

## Working rules
- Plan ≤10 bullets, then execute. No subagents, no broad repo exploration.
- Read `docs/SRS.md` by section (offset/limit; `grep -n '^#' docs/SRS.md` for the map). Never cat it whole.
- Generate pages from data + shared components. No new deps without asking.
- `npm run build` once per milestone; pipe long output through `tail -n 30`.
- After each milestone: `git add` its files, give a commit message, and ask the user to commit + push. Wait for them.
