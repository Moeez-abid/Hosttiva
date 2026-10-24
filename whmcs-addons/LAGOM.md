# Lagom Style Manager values

Lagom 2 has its own visual settings (WHMCS admin → **Addons → RS Themes → Lagom → Style Manager**; exact menu
names vary slightly by Lagom version). Set these first so Lagom's built-in components match the website, then the
`hosttiva.css` hook handles the rest.

| Setting | Value | Why |
|---|---|---|
| Primary / brand colour | `#0071e3` | The site's only accent (buttons, active states) |
| Primary hover | `#0062c4` | Keeps white button text above WCAG AA |
| Link colour | `#0066cc` | Matches site links |
| Body text | `#171717` | Site ink colour |
| Secondary text | `#666666` | Site muted text (5.7:1 on white) |
| Page background | `#ffffff` | |
| Card / panel background | `#ffffff` with border `#eaeaea` | Hairline-bordered tiles |
| Alternate background | `#fafafa` | Sidebars, table headers |
| Border radius | `10px` (buttons, inputs), `14px` (cards) | Site radii |
| Font | System font, or Inter | SF Pro on Apple devices, Inter elsewhere |
| Dark mode | Enable if your Lagom version supports it: background `#0a0a0a`, cards `#111111`, borders `#232323`, text `#ededed` | Matches the site's dark palette |
| Logo | Upload the Hosttiva logo (SVG preferred) | |

Avoid Lagom presets with gradients or a second accent colour: the site uses one accent only.
