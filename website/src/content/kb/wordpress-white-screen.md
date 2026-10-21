---
title: 'Fix a blank page or "critical error" in WordPress'
description: 'Find the plugin, theme or setting behind a white screen or WordPress critical error, and get the site back.'
category: websites
updated: 2026-10-21
order: 2
related: ['websites/upload-website-files']
---

A blank page or the message "There has been a critical error on this website" almost always comes from a plugin, a theme, or the PHP version.

## 1. Check the email WordPress sent

WordPress emails the site admin a recovery link when a fatal error happens. The link opens a safe mode where you can disable the faulty plugin.

## 2. Turn on error logging

In `wp-config.php`, just above "That's all, stop editing":

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

Reload the page, then read `wp-content/debug.log`. The last lines name the file that failed.

## 3. Disable plugins without the dashboard

Rename `wp-content/plugins` to `plugins-off` in File Manager. If the site comes back, rename it back and disable plugins one at a time to find the culprit.

## 4. Check the PHP version

A plugin that requires a newer or older PHP version can break the site. In cPanel, open **MultiPHP Manager** and compare with the plugin's requirements.

Turn `WP_DEBUG` off again when you are done.
