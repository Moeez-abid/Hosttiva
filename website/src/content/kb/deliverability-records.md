---
title: 'Set up SPF, DKIM and DMARC'
description: 'The three DNS records that stop your email landing in spam, and how to add them safely.'
category: email
updated: 2026-10-21
order: 1
related: ['domains-dns/dns-record-types', 'email/mail-app-settings']
---

Receiving mail servers check three records to decide whether a message really came from your domain.

## SPF

A TXT record on your domain listing the servers allowed to send for it.

```
v=spf1 include:_spf.yourmailprovider.example ~all
```

Only one SPF record per domain. Add every sending service (website, newsletter tool) to the same record.

## DKIM

A cryptographic signature added to each message. Your mail provider generates the key; you publish it as a TXT record, usually at `selector._domainkey`. In cPanel, **Email Deliverability** shows the exact record.

## DMARC

Tells receivers what to do when SPF or DKIM fails, and where to send reports. Start in monitoring mode:

```
_dmarc  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@yourbrand.com"
```

After a few weeks of clean reports, move to `p=quarantine`, then `p=reject`.

## Check your setup

Send a message to an external address and open its headers. You want to see `spf=pass`, `dkim=pass` and `dmarc=pass`.
