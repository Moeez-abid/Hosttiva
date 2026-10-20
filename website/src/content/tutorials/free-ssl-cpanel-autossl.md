---
title: 'Issue a free SSL certificate in cPanel'
description: 'Use cPanel AutoSSL to secure your domain with HTTPS, then force HTTPS so every visitor uses the secure version.'
pubDate: 2026-10-20
totalTime: PT10M
level: Beginner
requirements: ['A cPanel hosting account', 'A domain already pointing to your hosting']
related: ['hosting/web', 'domains/ssl-checker', 'hosting/wordpress']
---

cPanel includes **AutoSSL**, which issues and renews free domain-validated certificates for the domains on your account. It normally runs on its own, but you can trigger it and check the result yourself.

## 1. Make sure the domain points to your hosting

AutoSSL proves you control the domain by checking that it resolves to your server. If you have just changed DNS, confirm it first with the [DNS checker](/domains/dns-checker). See [Point your domain to your hosting](/tutorials/point-domain-to-hosting) if it does not.

## 2. Open SSL/TLS Status

1. Log in to cPanel.
2. In the **Security** section, open **SSL/TLS Status**.

You will see each domain and subdomain on the account, with an icon showing whether it has a valid certificate.

## 3. Run AutoSSL

Click **Run AutoSSL**. It takes a minute or two. When it finishes, refresh the page.

Domains that pass show a green padlock and an expiry date. Certificates renew automatically before they expire.

## 4. Fix any domains that failed

Hover over a failed entry to see the reason. The most common ones:

- **The domain does not resolve to this server.** DNS is still pointing elsewhere, or has not finished updating.
- **A `www` or `mail` subdomain has no DNS record.** Add the missing record, or exclude that name from AutoSSL if you do not use it.
- **A `.htaccess` rule blocks the validation request.** Rules that redirect everything, or block unknown paths, can stop the check. Allow requests to `/.well-known/` and try again.

## 5. Force HTTPS

A certificate only helps if visitors use it. Redirect all HTTP traffic to HTTPS:

- In cPanel, open **Domains** and turn on **Force HTTPS Redirect** for the domain, if your account shows that option.
- Or add this to the top of the `.htaccess` file in your site’s root folder:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

For WordPress, also make sure **Settings → General** uses `https://` in both address fields.

## 6. Check the certificate

Open the site in a browser and click the padlock, or run the [SSL checker](/domains/ssl-checker). Look for any “mixed content” warnings in the browser console; those come from images or scripts still loaded over `http://`.
