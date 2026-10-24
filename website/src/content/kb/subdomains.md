---
title: 'Create a subdomain'
description: 'Add shop.yourbrand.com or app.yourbrand.com and point it at a folder, server or service.'
category: domains-dns
updated: 2026-10-25
order: 4
related: ['domains-dns/dns-record-types']
---

A subdomain is a name in front of your domain, such as `shop.yourbrand.com`. It can point to a folder on your hosting, a different server, or a third-party service.

## On cPanel hosting (same account)

1. In cPanel open **Domains** and choose **Create a New Domain** (or **Subdomains** on older versions).
2. Enter `shop.yourbrand.com` and choose its document root folder.
3. Upload the site files to that folder. AutoSSL issues a certificate once DNS resolves.

## On another server

Add a DNS record where your DNS is hosted:

| Type | Name | Value |
|---|---|---|
| A | `app` | the server's IPv4 address |
| CNAME | `shop` | the hostname a service gives you (for example a store platform) |

## On a third-party service

Follow the service's instructions; most ask for a CNAME. Remove any old A record with the same name first, because a name cannot have both.
