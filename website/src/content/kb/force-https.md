---
title: 'Force HTTPS and fix mixed-content warnings'
description: 'Redirect every visitor to the secure version of your site and remove the padlock warnings caused by mixed content.'
category: ssl-security
updated: 2026-10-21
order: 1
related: ['ssl-security/account-security']
---

## 1. Make sure a certificate is installed

Check your domain with the [SSL checker](/domains/ssl-checker). On cPanel hosting, AutoSSL issues free certificates automatically once your domain points to the server.

## 2. Redirect HTTP to HTTPS

Add this to the top of `.htaccess` in your site's root folder:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

For WordPress, also set both addresses in **Settings → General** to `https://`.

## 3. Fix mixed content

A page loaded over HTTPS that pulls an image, script or font over `http://` shows a warning or loses its padlock.

- Open the browser console; it lists each insecure URL.
- Update hard-coded `http://` links in your theme, content or settings.
- For WordPress, a search-and-replace of `http://yourbrand.com` → `https://yourbrand.com` in the database fixes most cases. Take a backup first.
