---
title: 'Forwarders, aliases and catch-all addresses'
description: 'Send mail for one address to another inbox without creating extra mailboxes.'
category: email
updated: 2026-10-25
order: 3
related: ['email/mail-app-settings', 'email/email-not-arriving']
---

Not every address needs its own mailbox. Forwarders keep your inbox count (and passwords) down.

## Create a forwarder in cPanel

1. Open **Email → Forwarders → Add Forwarder**.
2. Enter the address to forward, such as `sales@yourbrand.com`.
3. Choose **Forward to email address** and enter the destination inbox.

## Forwarder or mailbox?

| Use a forwarder when | Use a mailbox when |
|---|---|
| One person reads several addresses | Someone needs to send as that address |
| The address is temporary | You need separate storage or a separate password |

## Catch-all (default) address

A catch-all receives mail sent to any address that doesn't exist. It also attracts a lot of spam, so set it to **discard** unless you genuinely need it.

## Forwarding to Gmail or Outlook

Forwarded mail can be rejected or marked as spam by the receiving provider, because it was not sent by your server. If you see this, use a mailbox and add it to Gmail as an account instead.
