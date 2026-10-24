---
title: 'Back up your VPS'
description: 'Back up files and databases off the server on a schedule, and test that restores work.'
category: vps-apps
updated: 2026-10-25
order: 4
related: ['vps-apps/docker-on-vps', 'ssl-security/account-security']
---

Unless your plan includes managed backups, a VPS's data is your responsibility. A backup on the same server is not a backup.

## What to back up

- Databases (dump them; don't copy live database files).
- Application files and uploads.
- Configuration: `/etc/nginx`, `docker-compose.yml`, `.env` files.

## A simple nightly backup with restic

```bash
sudo apt install -y restic
export RESTIC_REPOSITORY=sftp:backup@backup-host:/backups/myserver
export RESTIC_PASSWORD='use-a-long-random-password'
restic init
```

Then schedule a script with cron that dumps the database and runs:

```bash
restic backup /srv /etc /root/db-dumps
restic forget --keep-daily 7 --keep-weekly 4 --prune
```

Store the restic password somewhere other than the server.

## Test restores

Every few months, restore to a fresh test server and check the application starts. Read why in [Backups vs disaster recovery](/blog/backups-vs-disaster-recovery).
