---
title: 'Connect to your VPS with SSH keys'
description: 'Create an SSH key, add it to your server, and turn off password logins.'
category: vps-apps
updated: 2026-10-21
order: 1
related: ['vps-apps/firewall-basics']
---

## 1. Create a key on your computer

```bash
ssh-keygen -t ed25519 -C "you@yourbrand.com"
```

Press Enter to accept the default location and set a passphrase.

## 2. Copy it to the server

```bash
ssh-copy-id root@YOUR_SERVER_IP
```

On Windows without `ssh-copy-id`, paste the contents of `~/.ssh/id_ed25519.pub` into `~/.ssh/authorized_keys` on the server.

## 3. Log in

```bash
ssh root@YOUR_SERVER_IP
```

## 4. Disable password logins

Once key login works, edit `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
PermitRootLogin prohibit-password
```

Then restart SSH: `sudo systemctl restart ssh`. Keep your current session open until you have confirmed a new login works.
