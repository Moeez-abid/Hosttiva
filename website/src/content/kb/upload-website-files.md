---
title: 'Upload your website files'
description: 'Three ways to put a site on your hosting: File Manager, FTP/SFTP, and Git.'
category: websites
updated: 2026-10-21
order: 1
related: ['websites/wordpress-white-screen']
---

Your site's public files live in the **document root**, usually `public_html` for your main domain.

## File Manager (simplest)

1. In cPanel, open **File Manager** and go to `public_html`.
2. Click **Upload** and choose a `.zip` of your site.
3. Right-click the uploaded file and choose **Extract**.

## FTP or SFTP (best for many files)

Use a client such as FileZilla or Cyberduck with the FTP account details from cPanel. Prefer **SFTP** or **FTPS** so your password is encrypted.

## Git (for developers)

cPanel's **Git Version Control** can clone a repository and deploy it with a `.cpanel.yml` file. On a VPS, pull from your repository and run your build as part of your deploy script.

## After uploading

- Make sure an `index.html` or `index.php` is directly inside `public_html`, not in a subfolder.
- If you see a 403 error, check file permissions: folders `755`, files `644`.
