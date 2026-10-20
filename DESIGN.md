# Design

The visual system of the Hosttiva site, recorded from the built world (2026-10-20). Tokens live in
`website/src/styles/tokens.css`; component classes in `website/src/styles/global.css`.

## Direction
Apple design language, pinned by the owner. Hosting is presented like Apple presents hardware: one idea per
section, very large plain type, real numbers (first-term and renewal price) as the visual object, and quiet
neutral grounds so the single accent means "act here". The refused default is the dark hosting dashboard with a
neon accent and grid backgrounds.

## Color
- Strategy: Restrained. Neutrals plus one accent.
- Light: grounds `#ffffff` and `#f5f5f7`, ink `#1d1d1f`, secondary `#6e6e73`, hairlines `#d2d2d7`.
- Dark (OS preference or toggle): `#000000` / `#161617` / `#1d1d1f`, ink `#f5f5f7`, secondary `#a1a1a6`, hairlines `#333336`.
- Accent: Apple system blue `#0071e3` for filled buttons (white text 4.7:1), hover `#0062c4`. Text links use
  `--link` (`#0066cc` light, `#2997ff` dark). Never use the accent as a large field or a gradient.
- Status: ok `#1a7f37`/`#30d158`, warn `#b25000`/`#ff9f0a`, danger `#d70015`/`#ff453a`. All text tokens pass WCAG AA.
- Inverse sections (`.section-inverse`): black in light mode, `#161617` in dark; used once or twice per page for emphasis.

## Typography
- SF Pro (system) on Apple devices; Inter Variable with optical sizing, self-hosted, everywhere else. System mono only for code and data values.
- Display scale: `.display-xl` (≤6rem, 700, -0.04em), `.display-lg`, `.display-md`, `.title`, `.lead`.
- Body 17px / 1.47, tracking -0.022em. Headings balanced, tight leading.
- No eyebrows or kickers above headings, no uppercase tracked labels, no monospace as decoration.
- Small labels (`.label`) only for form fields, column titles and metadata.

## Shape, depth, material
- Radii: 8 / 12 / 18 / 28px; buttons and badges are pills (980px).
- Tiles (`.tile`, `.tile-surface`): filled `#f5f5f7` / surface panels, no borders, generous padding.
- Glass (`.glass`, `.glass-panel`): only for chrome and panels that float over content: the sticky nav,
  flyouts, the mobile sheet, the page scrim behind an open flyout, and hero panels over the rack illustration.
  `saturate(180%) blur(20px)` with a hairline border; opaque fallback without backdrop-filter.
- Shadows: `--shadow-float` for floating glass and hovered tiles only.

## Components
- Buttons: `.btn-primary` (blue pill), `.btn-secondary` (blue outline pill), `.btn-quiet` (neutral pill), `.btn-sm`.
  Secondary actions are usually `.link-more` text links with a chevron.
- Header: 52px glass bar, centred nav, flyouts with a large "Explore" column; page behind is blurred.
- Plan comparison (`PlanTable`): one column per plan, large price, "Renews at" directly beneath, features below;
  featured plan on a filled tile; horizontal snap scroller on small screens.
- Segmented controls for billing term and tool choice.
- FAQ: large questions, plus/minus glyph drawn in CSS.

## Layout & motion
- `container-x` (80rem) for wide sections, `container-narrow` (980px) for reading and centred heroes.
- Sections breathe: 6–9rem vertical padding; alternate white / `#f5f5f7` / inverse.
- One authored moment: the hero blur-lift entrance and stage rise. Elsewhere `.reveal` uses CSS scroll-driven
  animation (no JS), content visible by default; all motion off under `prefers-reduced-motion`.

## Imagery
No photography or customer assets exist. The hero uses an authored SVG server rack; any demonstration data is
labelled as illustrative. Never add stock photos of data centres, fake dashboards with invented metrics, or logos
of customers that are not real.
