---
title: 'Run apps with Docker on your VPS'
description: 'Install Docker, run an app with Docker Compose, and put it behind HTTPS.'
category: vps-apps
updated: 2026-10-25
order: 3
related: ['vps-apps/connect-ssh', 'vps-apps/firewall-basics', 'vps-apps/vps-backups']
---

## Install Docker (Ubuntu)

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
docker run --rm hello-world
```

## Describe your app in `docker-compose.yml`

```yaml
services:
  app:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:80"
```

Binding to `127.0.0.1` keeps the container off the public internet; a reverse proxy publishes it with HTTPS.

## Start, update, stop

```bash
docker compose up -d        # start in the background
docker compose logs -f      # follow logs
docker compose pull && docker compose up -d   # update
docker compose down         # stop
```

## Add HTTPS

Put a reverse proxy such as Caddy or NGINX with Let's Encrypt in front of your containers. Caddy obtains and renews certificates automatically from a two-line config.

## Keep data safe

Store data in named volumes, back them up (see [VPS backups](/knowledgebase/vps-backups)), and pin image versions for production.
