---
title: 'Keep Ubuntu updated safely'
description: 'Apply security updates automatically and schedule the rest, without surprise downtime.'
category: vps-apps
updated: 2026-10-25
order: 5
related: ['vps-apps/connect-ssh', 'vps-apps/vps-backups']
---

## Manual updates

```bash
sudo apt update
sudo apt upgrade -y
```

If `/var/run/reboot-required` exists afterwards, a kernel or core library was updated; reboot at a quiet time.

## Automatic security updates

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

This installs security updates daily. Edit `/etc/apt/apt.conf.d/50unattended-upgrades` to send you email or to allow automatic reboots at a set time.

## Before major upgrades

Upgrading between Ubuntu releases (for example 22.04 → 24.04) can change software versions your apps rely on. Take a backup or snapshot first, and test on a copy of the server if you can.
