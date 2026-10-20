---
title: 'Create an email account in cPanel and add it to your phone'
description: 'Create a mailbox on your domain in cPanel, then connect it to your phone or desktop mail app with IMAP and SMTP.'
pubDate: 2026-10-20
totalTime: PT10M
level: Beginner
requirements: ['A cPanel hosting account with email', 'Your domain using the hosting’s mail server (MX records)']
related: ['email/business', 'domains/dns-checker']
---

Most Hosttiva web hosting plans include mailboxes on your own domain. This guide creates one and connects it to a mail app.

## 1. Create the mailbox

1. Log in to cPanel.
2. In the **Email** section, open **Email Accounts** and click **Create**.
3. Choose the domain, then enter the username, for example `hello` for `hello@yourcompany.com`.
4. Set a strong password, or use the generator.
5. Set the storage limit. Your plan’s limit applies across all mailboxes.
6. Click **Create**.

## 2. Try webmail

Back in **Email Accounts**, click **Check Email** next to the new address. Send a test message to another address you own and reply to it, to confirm both directions work.

If mail does not arrive, check the domain’s **MX** records with the [DNS checker](/domains/dns-checker). They must point to your hosting’s mail server.

## 3. Find the connection settings

In **Email Accounts**, click **Connect Devices** next to the address. cPanel shows the exact settings for your account. They usually look like this:

| Setting | Value |
|---|---|
| Username | Your full email address |
| Incoming server (IMAP) | The mail server shown in cPanel, port 993, SSL/TLS |
| Outgoing server (SMTP) | The same server, port 465, SSL/TLS |
| Authentication | Required, using the mailbox password |

Use IMAP rather than POP3, so mail stays in sync across your phone, laptop and webmail.

## 4. Add it to your phone

**iPhone:** Settings → Mail → Accounts → Add Account → Other → Add Mail Account. Enter your name, address and password, choose **IMAP**, then fill in the servers from step 3.

**Android (Gmail app):** Gmail → your profile picture → Add another account → Other. Enter the address, choose **Personal (IMAP)**, then enter the password and the servers from step 3.

## 5. Add it to a desktop app

Outlook, Apple Mail and Thunderbird can often detect the settings automatically. If they cannot, choose manual setup and use the values from step 3.

## 6. Improve deliverability

So your messages reach inboxes instead of spam folders, make sure SPF, DKIM and DMARC are set up. In cPanel, open **Email Deliverability** and follow its suggestions. For background, read [How to set up professional email on your domain](/blog/professional-email-on-your-domain).
