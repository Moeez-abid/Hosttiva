---
title: 'Set up a basic firewall on Ubuntu'
description: 'Allow only SSH, HTTP and HTTPS with UFW, and avoid locking yourself out.'
category: vps-apps
updated: 2026-10-21
order: 2
related: ['vps-apps/connect-ssh']
---

UFW is the simplest firewall front end on Ubuntu.

## Allow what you need, then enable

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status verbose
```

Always allow SSH **before** enabling the firewall, or you will lock yourself out.

## Opening other ports

Only open what an application needs, and prefer limiting it to your own IP:

```bash
sudo ufw allow from YOUR_IP to any port 5432 proto tcp
```

## Docker note

Docker publishes container ports by editing iptables directly, which can bypass UFW. Bind internal services to `127.0.0.1` (for example `127.0.0.1:5432:5432`) or keep them on an internal Docker network, and expose only your reverse proxy on 80 and 443.
