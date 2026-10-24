---
title: 'Email not arriving: a troubleshooting checklist'
description: 'Work through the usual causes when messages to or from your domain go missing.'
category: email
updated: 2026-10-25
order: 4
related: ['email/deliverability-records', 'domains-dns/dns-record-types']
---

## Mail sent to you isn't arriving

1. **Check MX records** with the [DNS checker](/domains/dns-checker). They must point to the server that hosts your mailboxes.
2. **Check mailbox quota.** A full mailbox rejects new mail.
3. **Look in spam and filters,** including filters in your mail app.
4. **Ask the sender for the bounce message.** It names the reason (unknown user, full mailbox, rejected by policy).

## Mail you send isn't arriving

1. **Check SPF, DKIM and DMARC** (see [the setup guide](/knowledgebase/deliverability-records)).
2. **Check whether the recipient's server rejected it.** Look for a bounce in your inbox.
3. **Check sending limits.** Shared hosting caps messages per hour.
4. **Check the server or domain isn't on a blocklist** using a public blocklist checker.

## Mail from your website (contact forms, WooCommerce)

PHP's built-in mail function is often filtered as spam. Configure your site to send through SMTP with a real mailbox, or use a transactional email service.

Still stuck? Open a ticket with a sample message's full headers.
