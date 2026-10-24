---
title: 'Fix a 500 Internal Server Error'
description: 'Track down the cause of a 500 error: .htaccess rules, permissions, PHP errors or resource limits.'
category: websites
updated: 2026-10-25
order: 4
related: ['websites/php-version', 'websites/wordpress-white-screen']
---

A 500 error means the server hit a problem it couldn't describe to the browser. The real reason is in a log.

## 1. Read the error log

In cPanel, open **Errors** (or `error_log` files in your site folders). The newest line usually names the file and problem.

## 2. Check `.htaccess`

A typo or an unsupported directive breaks the whole site. Rename `.htaccess` to `.htaccess-off`; if the site loads, restore it and remove the last rule you added.

## 3. Check file permissions

Folders should be `755` and files `644`. Files set to `777` are refused by the server for security.

## 4. Check PHP

- A PHP fatal error (see the log) points at a plugin, theme or code change.
- A PHP version change can break older code; see [Change your PHP version](/knowledgebase/php-version).

## 5. Check resource limits

If errors appear only under load, you may be hitting the plan's process or memory limits. Caching helps; persistent limits mean it's time to [upgrade](/knowledgebase/upgrade-plan).
