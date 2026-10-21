# Design

The visual system of the Hosttiva site, recorded from the built world (2026-10-20). Tokens live in
`website/src/styles/tokens.css`; component classes in `website/src/styles/global.css`.

## Direction
Apple structure and typography with a Vercel/Linear finish (owner's choice, 2026-10-21). One idea per section,
very large plain type, real numbers as the visual object; surfaces are monochrome with hairline borders, faint
engineering grid detail and a cursor spotlight on borders. The refused defaults: neon accents, colour glows,
purple/blue gradients, grid-of-identical-cards pages.

## Color
- Strategy: Restrained. Monochrome plus one accent.
- Light: `#ffffff` / `#fafafa` / `#f5f5f5`, ink `#171717`, secondary `#666666`, borders `#eaeaea` / `#d4d4d4`.
- Dark: `#0a0a0a` / `#111111` / `#161616`, ink `#ededed`, secondary `#a1a1a1`, borders `#232323` / `#333333`.
- Accent: system blue `#0071e3` for filled buttons (white text 4.7:1), hover `#0062c4`; links `--link`
  (`#0066cc` light, `#3b9eff` dark). Never a large field or gradient.
- Status: ok `#1a7f37`/`#3ccf6e`, warn `#b25000`/`#ffb224`, danger `#d70015`/`#ff5c5c`. All text pairs pass WCAG AA.
- Inverse sections (`.section-inverse`): `#0a0a0a` light mode, `#111111` dark.

## Typography
- SF Pro (system) on Apple devices; Inter Variable with optical sizing, self-hosted, everywhere else. System mono only for code and data values.
- Display scale: `.display-xl` (≤6rem, 700, -0.04em), `.display-lg`, `.display-md`, `.title`, `.lead`.
- Body 17px / 1.47, tracking -0.022em. Headings balanced, tight leading.
- No eyebrows or kickers above headings, no uppercase tracked labels, no monospace as decoration.
- Small labels (`.label`) only for form fields, column titles and metadata.

## Shape, depth, material
- Radii: 6 / 10 / 14 / 20px. Buttons 10px (small 8px); badges are pills with a hairline inset border.
- Tiles (`.tile`, `.tile-surface`): 1px `--border`, inset top highlight, and a border spotlight that follows the
  cursor (`--mx/--my`, set by motion.ts). `.grid-backdrop` adds a faint 56px grid fading from the top of a section.
- Glass (`.glass`, `.glass-panel`): only for chrome and panels that float over content: the sticky nav,
  flyouts, the mobile sheet, the page scrim behind an open flyout, and hero panels over the rack illustration.
  `saturate(180%) blur(20px)` with a hairline border; opaque fallback without backdrop-filter.
- Shadows: `--shadow-float` for floating glass and hovered tiles only.

## Components
- Buttons: `.btn-primary` (blue, inset highlight), `.btn-secondary` (neutral surface + hairline border, Vercel-style),
  `.btn-quiet` (neutral fill), `.btn-sm`.
  Secondary actions are usually `.link-more` text links with a chevron.
- Header: 52px glass bar, centred nav, flyouts with a large "Explore" column; page behind is blurred.
- Plan comparison (`PlanTable`): one column per plan, large price, "Renews at" directly beneath, features below;
  featured plan on a filled tile; horizontal snap scroller on small screens.
- Segmented controls for billing term and tool choice.
- FAQ: large questions, plus/minus glyph drawn in CSS.

## Layout
- `container-x` (80rem) for wide sections, `container-narrow` (980px) for reading and centred heroes.
- Sections breathe: 6–9rem vertical padding; alternate white / `#f5f5f7` / inverse.

## Motion (required on every page)
Shared system in `website/src/lib/motion.ts` + `global.css`; armed by `html.motion` only when the visitor allows
motion, with a 3s failsafe, so content is always visible without JS. Hooks:
- `data-split="now"` on every page H1 (word-by-word rise from a mask); `data-split` on section H2s (on view).
- `.enter` + `style="--d:320ms"` for hero copy/CTAs that follow the H1.
- `.reveal` for blocks; wrap lists that appear as lists in `data-stagger` (70ms steps, capped at 560ms).
- `data-tilt="5"` on interactive tiles/cards: 3D pointer tilt with glare (fine pointers only).
- `data-count` on headline numbers (count up once, no layout shift).
- `.icon-3d` for a hero icon's 3D flip-in.
- `<details>` open/close, billing-term price swaps, flyout item cascade and page-to-page transitions are automatic.
- Product scenes: `ProductVisual.astro` gives every product page an authored animated illustration (servers,
  terminal, dot globe, mail+DNS, site/store, automation flow, game panel, accounts, blueprint→app), chosen by slug
  then category. Examples only; no invented metrics.
- Homepage showcase: pinned scroll section; the step nearest the viewport centre activates and replays its scene.
- Focal 3D: homepage hero rack (`src/lib/rack3d.ts`, three.js, lazy-loaded ~130 KB gzip, pauses off-screen,
  SVG fallback without WebGL). Add further 3D only where it carries the product story.
- Easing `--ease-out` (cubic-bezier(0.16,1,0.3,1)); entrances 500–1100ms, feedback 120–300ms; no bounce.
  Everything static under `prefers-reduced-motion`.

## Imagery
No photography or customer assets exist. The hero uses an authored SVG server rack; any demonstration data is
labelled as illustrative. Never add stock photos of data centres, fake dashboards with invented metrics, or logos
of customers that are not real.
