---
title: 'PWA hosting requirements: SSL, caching, databases, and deployment'
description: 'What a progressive web app needs from its hosting: HTTPS, correct caching headers for the service worker, an API backend, and a repeatable deploy.'
category: apps-pwa
pubDate: 2026-10-14
related: ['hosting/web-apps', 'solutions/cloudpanel', 'hosting/vps']
---

A progressive web app (PWA) is a website that can be installed, work offline and feel like a native app. Most of that happens in the browser, but a few hosting details decide whether it works reliably.

## 1. HTTPS everywhere

Service workers only register on secure origins. Without HTTPS, your PWA is just a website.

- Serve every page and asset over HTTPS, with a valid certificate that renews automatically.
- Redirect HTTP to HTTPS at the server level.
- Avoid mixed content. One `http://` image can break the install prompt in some browsers.

## 2. The web app manifest

The manifest (`manifest.webmanifest`) tells the browser the app’s name, icons, colours and start URL. Hosting-wise it needs:

- The correct content type: `application/manifest+json`.
- To be reachable at the path referenced in your HTML.
- Icons at the sizes your target platforms expect.

## 3. Caching headers that do not fight the service worker

This is where most PWA bugs come from.

| File | Recommended caching |
|---|---|
| `service-worker.js` | `Cache-Control: no-cache` so browsers always check for a new version |
| `index.html` | `no-cache`, or a short max-age |
| Hashed assets (`app.3f9a1c.js`) | `max-age=31536000, immutable` |
| API responses | Depends on the data; often `no-store` for personal data |

If the service worker file is cached for a long time, users can be stuck on an old version of your app for days.

## 4. An API and database behind it

Many PWAs are a static front end talking to an API. Plan for:

- **Where the API runs.** Node.js, Python or PHP on an application server or VPS.
- **The database.** PostgreSQL or MySQL, sized for your data, with backups.
- **CORS.** If the API is on a different subdomain, configure allowed origins explicitly.
- **Rate limiting and auth.** Offline sync can replay many requests at once when a device reconnects.

## 5. Compression and HTTP/2 or HTTP/3

Enable Brotli or gzip for text assets, and make sure your server or CDN supports HTTP/2 at least. PWAs often load many small files, and multiplexing helps.

## 6. A repeatable deployment

- Build in CI from your Git repository, not on your laptop.
- Deploy hashed assets first, then `index.html` and the service worker, so no user ever loads HTML that points to files that do not exist yet.
- Keep the previous build available so you can roll back.

## Quick checklist

- [ ] Valid HTTPS with automatic renewal
- [ ] HTTP → HTTPS redirect
- [ ] Manifest served with the right content type
- [ ] Service worker served with `no-cache`
- [ ] Long-lived caching only on hashed assets
- [ ] API, database and backups in place
- [ ] Compression enabled
- [ ] Deploy from CI with rollback

Hosttiva’s [web app hosting](/hosting/web-apps) and [CloudPanel plans](/solutions/cloudpanel) cover the server side, and the [PWA Launch](/marketplace#websites) service can set up deployment for an existing app.
