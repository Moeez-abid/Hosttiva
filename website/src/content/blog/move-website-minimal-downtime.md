---
title: 'How to move a website to Hosttiva with minimal downtime'
description: 'A practical migration checklist: lower TTLs, copy files and databases, test on the new server before DNS changes, then switch and verify.'
category: web-hosting
pubDate: 2026-10-14
related: ['hosting/web', 'hosting/wordpress', 'domains/transfer']
---

Moving hosts does not have to mean an outage. The trick is to have the site fully working on the new server *before* any visitor is sent there, and to make the final switch quick.

## Before you start

- **List what you are moving.** Website files, databases, email accounts, cron jobs, SSL certificates, and any DNS records beyond the basics (MX, TXT for SPF/DKIM, verification records).
- **Take a fresh backup** at the old host, and keep it until the move is confirmed.
- **Pick a quiet time** for the final switch, based on your own traffic graphs.

## 1. Lower the DNS TTL a day early

TTL (time to live) controls how long resolvers cache your DNS records. If your A record has a TTL of 24 hours, some visitors will keep reaching the old server for up to a day after you change it.

At least 24 hours before the move, lower the TTL on the records you will change to 300 seconds (5 minutes). You can raise it again afterwards.

## 2. Copy files and databases

For a typical PHP or WordPress site:

1. Copy the site files to the new account.
2. Export the database from the old host and import it on the new one.
3. Update the configuration file (for WordPress, `wp-config.php`) with the new database name, user and password.

Large sites are easier to move with a server-to-server transfer than by downloading and re-uploading.

## 3. Test before DNS changes

You can preview the site on the new server without touching public DNS by editing your computer’s `hosts` file to point the domain at the new server’s IP address. Then check:

- Pages load, including deep links and images.
- Logins, forms and checkout work.
- Scheduled tasks are set up.
- No errors in the server’s error log.

Remove the `hosts` entry when you are done.

## 4. Freeze changes, then sync

If the site takes orders, comments or sign-ups, there will be new data on the old server after your first copy. Put the site in maintenance mode briefly, or pause content edits, then copy the database again so nothing is lost.

## 5. Switch DNS

Update the A (and AAAA, if used) records to the new server. Because the TTL is low, most visitors move over within minutes. If email is moving too, update MX records at the same time, and migrate mailboxes before switching.

## 6. Verify and clean up

- Issue or confirm the SSL certificate on the new server.
- Check that email sends and receives.
- Raise the TTL back to a normal value after a day or two.
- Keep the old hosting account for a week before cancelling it, just in case.

## Let us do it

Free migration is available on eligible Hosttiva plans. Our team copies files, databases and mailboxes, checks the site on the new server, and tells you when DNS is ready to switch. [Start a migration](/contact).
