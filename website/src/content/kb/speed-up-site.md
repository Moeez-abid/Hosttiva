---
title: 'Speed up a slow website'
description: 'The changes that make the biggest difference to load time, in the order to try them.'
category: websites
updated: 2026-10-25
order: 5
related: ['websites/php-version', 'getting-started/upgrade-plan']
---

Measure first with a speed test (for example PageSpeed Insights) so you can tell what helped.

## 1. Turn on caching

Page caching serves ready-made HTML instead of building each page per visit. On WordPress, use one caching plugin, not several.

## 2. Shrink images

Images are usually the heaviest part of a page. Resize to the size they display at, use WebP or AVIF, and lazy-load images below the fold.

## 3. Remove what you don't use

Every plugin, font and third-party script adds work. Remove unused plugins, sliders and chat widgets, and limit web fonts to the weights you use.

## 4. Use a current PHP version

Newer PHP versions run the same code faster. See [Change your PHP version](/knowledgebase/php-version).

## 5. Clean the database

On WordPress, old revisions, transients and spam comments slow queries. Clean them with a reputable plugin after taking a backup.

## 6. Check your plan

If the site is still slow at busy times after all of the above, the server may be the bottleneck. Moving to a VPS or managed application plan gives reserved resources.
