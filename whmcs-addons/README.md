# WHMCS + Lagom branding kit

Makes the client area at **client.hosttiva.com** look and behave like the website. Everything here uses WHMCS's
documented hook system and global settings, so it works with Lagom 2 and the default themes without editing
theme files (theme updates won't overwrite it).

```
whmcs-addons/
  assets/css/hosttiva.css          GENERATED from website/src/styles/tokens.css
  scripts/build-css.mjs            regenerates hosttiva.css after design changes
  includes/hooks/
    hosttiva_config.php            settings: website URL, status URL, Inter on/off, nav links on/off
    hosttiva_assets.php            injects hosttiva.css + theme-colour meta (ClientAreaHeadOutput)
    hosttiva_footer.php            "Powered by Inventomo" strip with website links (ClientAreaFooterOutput)
    hosttiva_navigation.php        "Resources" menu: Plans, Knowledge Base, Tutorials, Status (ClientAreaPrimaryNavbar)
  email-templates/                 global email header, footer and CSS
  LAGOM.md                         values for Lagom's Style Manager
```

## Install (after WHMCS + Lagom are set up)

1. **Lagom settings:** apply the values in [LAGOM.md](LAGOM.md).
2. **Regenerate the CSS** (only needed if the website's tokens changed): from the repo root,
   `node whmcs-addons/scripts/build-css.mjs`.
3. **Upload** to the WHMCS root, keeping the folders:
   - `assets/css/hosttiva.css` → `<whmcs>/assets/css/hosttiva.css`
   - `includes/hooks/hosttiva_*.php` → `<whmcs>/includes/hooks/`
4. **Edit** `<whmcs>/includes/hooks/hosttiva_config.php`: set `site_url` (`https://hosttiva.com` once live) and
   `status_url` once the status page exists.
5. **Emails:** WHMCS admin → System Settings → General Settings → **Mail**: paste `email-templates/header.html`
   into *Email Global Header Content*, `footer.html` into *Email Global Footer Content*, and `email.css` into
   *Email CSS Styling*. Send yourself a test invoice email.
6. **Test** on desktop and phone, light and dark mode: login, dashboard, a product order, the cart, an invoice and
   a ticket. Fix any Lagom-specific clashes by adding rules at the end of `hosttiva.css` (they survive regeneration
   only if you also add them to `build-css.mjs`).

## Notes

- Not yet tested against a live WHMCS install (none exists yet). The hooks use only standard APIs
  (`add_hook`, `ClientAreaHeadOutput`, `ClientAreaFooterOutput`, `ClientAreaPrimaryNavbar`), and PHP syntax should
  be checked with `php -l` on the server.
- After uploading a new `hosttiva.css`, bump `css_version` in `hosttiva_config.php` so browsers fetch it.
- Product ids created here go into `website/src/data/plans.ts` (`pid`), then set `CLIENT_AREA_LIVE = true` in
  `website/src/config/site.ts`. See `docs/LAUNCH.md` step 5.
