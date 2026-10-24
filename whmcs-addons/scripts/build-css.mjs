// Builds whmcs-addons/assets/css/hosttiva.css from the website's design tokens so the client area
// always matches the site. Run from the repo root:  node whmcs-addons/scripts/build-css.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(here, '../../website/src/styles/tokens.css');
const outPath = path.resolve(here, '../assets/css/hosttiva.css');
const tokens = fs.readFileSync(tokensPath, 'utf8');

// Pull the light (:root) and dark ([data-theme='dark']) custom-property blocks out of tokens.css.
const block = (selectorRe) => {
  const m = tokens.match(selectorRe);
  if (!m) throw new Error(`Block not found: ${selectorRe}`);
  const start = tokens.indexOf('{', m.index) + 1;
  let depth = 1, i = start;
  while (depth && i < tokens.length) { if (tokens[i] === '{') depth++; else if (tokens[i] === '}') depth--; i++; }
  return tokens.slice(start, i - 1).split('\n').filter((l) => /^\s*--[\w-]+\s*:/.test(l)).map((l) => '  ' + l.trim()).join('\n');
};
// WHMCS can't use the site's self-hosted 'Inter Variable'; add the standard 'Inter' name (optionally loaded by the hook).
const addInter = (b) => b.replace(/'Inter Variable'/g, "'Inter Variable', 'Inter'");
const light = addInter(block(/^:root\s*\{/m));
const dark = block(/^:root\[data-theme='dark'\]\s*\{/m);

const css = `/* Hosttiva client-area skin. GENERATED from website/src/styles/tokens.css — do not edit by hand.
   Regenerate: node whmcs-addons/scripts/build-css.mjs  ·  Loaded by includes/hooks/hosttiva_assets.php */

:root {
${light}
}

/* Dark palette follows the visitor's OS setting, like the website. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${dark.replace(/^/gm, '  ')}
  }
}
:root[data-theme='dark'] {
${dark}
}

/* ── Base ──────────────────────────────────────────────────────────── */
body {
  font-family: var(--font-sans);
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.011em;
}
h1, h2, h3, h4, .h1, .h2, .h3, .h4 { font-family: var(--font-display); letter-spacing: -0.03em; color: var(--text); }
a { color: var(--link); }
a:hover { color: var(--link); text-decoration: underline; text-underline-offset: 0.18em; }
::selection { background: var(--accent); color: var(--accent-ink); }
:focus-visible { outline: 3px solid color-mix(in srgb, var(--accent) 70%, transparent); outline-offset: 2px; }
code, pre, kbd { font-family: var(--font-mono); }

/* ── Buttons (Bootstrap classes used by WHMCS and Lagom) ──────────────── */
.btn { border-radius: var(--radius); font-weight: 500; letter-spacing: -0.01em; }
.btn-primary, .btn-primary:focus {
  background: var(--accent); border-color: var(--accent); color: var(--accent-ink);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(0 0 0 / 0.12);
}
.btn-primary:hover, .btn-primary:active, .btn-primary.active { background: var(--accent-strong); border-color: var(--accent-strong); color: var(--accent-ink); }
.btn-default, .btn-secondary, .btn-outline-secondary {
  background: var(--surface); border-color: var(--border-strong); color: var(--text);
}
.btn-default:hover, .btn-secondary:hover, .btn-outline-secondary:hover { background: var(--bg-raised); border-color: var(--text-muted); color: var(--text); }

/* ── Surfaces ──────────────────────────────────────────────────────── */
.card, .panel, .tile, .well {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-tile);
}
.form-control, select.form-control, .custom-select {
  border-radius: var(--radius); border-color: var(--border-strong); background: var(--bg); color: var(--text);
}
.form-control:focus { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.table { color: var(--text); }
.table td, .table th { border-color: var(--border); }
.badge, .label { border-radius: var(--radius-pill); font-weight: 600; }
.alert { border-radius: var(--radius-lg); }

/* ── Hosttiva footer strip (added by hosttiva_footer.php) ─────────────── */
.hosttiva-powered {
  border-top: 1px solid var(--border); background: var(--bg-raised); color: var(--text-muted);
  font-size: 0.8125rem; padding: 14px 20px; text-align: center;
}
.hosttiva-powered a { color: var(--text); font-weight: 600; }
.hosttiva-powered nav { display: inline-flex; gap: 16px; margin-left: 16px; }
.hosttiva-powered nav a { font-weight: 400; color: var(--text-muted); }
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, css);
console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${css.length} bytes)`);
