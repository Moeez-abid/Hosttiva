---
title: 'How to set up professional email on your domain'
description: 'A step-by-step guide to email on your own domain: choosing a provider, MX records, SPF, DKIM and DMARC, and testing delivery.'
category: domains-email
pubDate: 2026-10-14
related: ['email/business', 'email/google-workspace', 'domains/dns-checker']
---

An address like `hello@yourcompany.com` looks more trustworthy than a free webmail address, and it stays yours if you change providers. Setting it up takes four things: a domain, a mail provider, the right DNS records, and a test.

## 1. Pick where your mail will live

You have two broad options:

- **Hosting-based email.** Mailboxes included with a hosting plan, managed from the same control panel. Good for small teams that mainly need reliable inboxes.
- **A dedicated suite** such as Google Workspace. Adds shared calendars, documents and video calls, with a per-user subscription.

Either way, the domain stays in your account. Only the DNS records decide where mail is delivered.

## 2. Create the mailboxes

Create the addresses you need, for example `hello@`, `sales@` and `support@`. Decide which should be real mailboxes and which can be forwarders or aliases pointing to someone’s main inbox. Fewer mailboxes means fewer passwords to manage.

## 3. Point MX records at the provider

MX records tell other mail servers where to deliver mail for your domain. Your provider gives you one or more hostnames with priorities. In your domain’s DNS zone:

1. Remove MX records from any previous provider.
2. Add the new MX records exactly as given, including priority values.
3. Wait for the old records’ TTL to expire. This is often minutes, sometimes a few hours.

## 4. Add SPF, DKIM and DMARC

These three records prove that mail claiming to come from your domain is genuine. Without them, your messages are more likely to land in spam.

**SPF** is a TXT record listing the servers allowed to send mail for your domain:

```
v=spf1 include:_spf.yourprovider.example ~all
```

Keep one SPF record per domain. If you also send from a newsletter tool or a transactional email service, add its `include:` to the same record.

**DKIM** adds a cryptographic signature to each message. Your provider generates a key and gives you a TXT (or CNAME) record to publish, usually at a name like `selector._domainkey`.

**DMARC** tells receiving servers what to do when SPF or DKIM checks fail, and where to send reports. Start in monitoring mode:

```
_dmarc  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@yourcompany.com"
```

Once reports show your legitimate mail passing, move to `p=quarantine` and later `p=reject`.

## 5. Test before you rely on it

- Look up your records with a [DNS checker](/domains/dns-checker) to confirm MX and TXT values are published.
- Send a message to an external address and check the headers for `spf=pass`, `dkim=pass` and `dmarc=pass`.
- Reply from the external address to confirm inbound delivery.

## 6. Connect your devices

Add the account to phones and desktop clients using the IMAP and SMTP settings from your provider, or the provider’s own app. Turn on two-factor authentication wherever it is offered.

## Moving from another provider?

Export or migrate existing mail before switching MX records, so nothing is lost in between. If you would like help, our team can set up mailboxes, DNS and migration as part of [Business Email](/email/business) or a [Google Workspace setup](/email/google-workspace).
