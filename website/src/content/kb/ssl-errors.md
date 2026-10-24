---
title: 'Fix common SSL certificate errors'
description: 'What "not secure", certificate name mismatch and expired-certificate warnings mean, and how to fix them.'
category: ssl-security
updated: 2026-10-25
order: 4
related: ['ssl-security/force-https', 'domains-dns/dns-propagation']
---

Check the certificate first with the [SSL checker](/domains/ssl-checker), then match the error below.

## "Not secure" with no padlock

The page loads over `http://`, or loads some files over `http://`. Force HTTPS and fix mixed content: see [Force HTTPS](/knowledgebase/force-https).

## Name mismatch (NET::ERR_CERT_COMMON_NAME_INVALID)

The certificate doesn't cover the name you visited, often `www` or a new subdomain. Make sure both names resolve to the server, then reissue the certificate (in cPanel, **SSL/TLS Status → Run AutoSSL**).

## Expired certificate

Automatic renewal failed, usually because the domain no longer points to the server or a CAA record blocks the certificate authority. Fix the DNS, then run AutoSSL again.

## Untrusted or incomplete chain

The intermediate certificate is missing. AutoSSL installs the full chain automatically; for a certificate you installed yourself, paste the CA bundle as well.

## Too many redirects after enabling HTTPS

Two layers are both redirecting (for example `.htaccess` and a CDN, or WordPress and a plugin). Keep one redirect and remove the other.
