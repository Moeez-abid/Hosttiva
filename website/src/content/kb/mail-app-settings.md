---
title: 'Connect your mailbox to a mail app'
description: 'IMAP and SMTP settings for phones and desktop mail apps, and how to fix common sign-in problems.'
category: email
updated: 2026-10-21
order: 2
related: ['email/deliverability-records']
---

## Settings

Find the exact values in cPanel under **Email Accounts → Connect Devices**. They usually look like this:

| Setting | Value |
|---|---|
| Username | Your full email address |
| Incoming (IMAP) | Your mail server, port **993**, SSL/TLS |
| Outgoing (SMTP) | Your mail server, port **465**, SSL/TLS (or **587** with STARTTLS) |
| Authentication | Required for both, using the mailbox password |

Use **IMAP**, not POP3, so messages stay in sync across devices.

## Common problems

- **Password rejected:** sign in to webmail with the same password. If that fails too, reset it in cPanel.
- **Can receive but not send:** outgoing authentication is off, or your network blocks the SMTP port. Try 587.
- **Certificate warning:** use the server name shown in cPanel exactly, not your own domain, unless your plan includes a mail certificate for it.
