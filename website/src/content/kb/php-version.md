---
title: 'Change your PHP version'
description: 'Pick the right PHP version for your site, switch it safely, and adjust common PHP settings.'
category: websites
updated: 2026-10-25
order: 3
related: ['websites/wordpress-white-screen', 'websites/fix-500-errors']
---

## Check what your site needs

Your CMS, theme and plugins each list a minimum PHP version. Use the newest version they all support: newer versions are faster and still receive security fixes.

## Switch versions in cPanel

1. Open **MultiPHP Manager**.
2. Tick the domain and choose the version.
3. Click **Apply**, then load the site and test logins, forms and checkout.

If something breaks, switch back and update the plugin that failed.

## Change PHP settings

In **MultiPHP INI Editor**, common changes are:

| Setting | Why you'd change it |
|---|---|
| `memory_limit` | "Allowed memory size exhausted" errors |
| `upload_max_filesize`, `post_max_size` | Uploading large media or backups |
| `max_execution_time` | Long imports timing out |

Stay within your plan's limits; raising a value above them has no effect.
