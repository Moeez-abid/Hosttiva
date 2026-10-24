---
title: 'Install WordPress on cPanel hosting'
description: 'Create a database, upload WordPress, run the installer and secure the site, all from cPanel.'
pubDate: 2026-10-25
totalTime: PT20M
level: Beginner
requirements: ['A cPanel hosting account', 'A domain pointing to your hosting', 'The latest WordPress zip from wordpress.org']
related: ['hosting/wordpress', 'create/wordpress', 'hosting/web']
---

Managed WordPress plans include installation. On regular hosting, you can install it yourself in about twenty minutes.

## 1. Create a database

1. In cPanel, open **Manage My Databases** (or **MySQL Database Wizard**).
2. Create a database, then a database user with a strong password.
3. Add the user to the database with **All Privileges**.

Write down the database name, username and password.

## 2. Upload WordPress

1. Download the latest version from wordpress.org.
2. In **File Manager**, open `public_html` and upload the zip.
3. Extract it, then move the contents of the `wordpress` folder up into `public_html` and delete the empty folder and zip.

## 3. Run the installer

Visit your domain. WordPress asks for the database details from step 1; the database host is usually `localhost`. Then choose a site title, an admin username (not "admin") and a strong password.

## 4. Turn on HTTPS

Make sure an SSL certificate is installed (see [Issue a free SSL certificate](/tutorials/free-ssl-cpanel-autossl)), then set both addresses in **Settings → General** to `https://`.

## 5. Secure the basics

- Delete the default plugins and themes you won't use.
- Install a backup plugin and store backups off the server.
- Turn on automatic updates for minor releases.
- Add two-factor authentication for admin accounts.
