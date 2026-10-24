---
title: 'Deploy n8n on a VPS with automatic HTTPS'
description: 'Run your own n8n with Postgres and a Caddy reverse proxy that gets certificates automatically.'
pubDate: 2026-10-25
totalTime: PT30M
level: Intermediate
requirements: ['An Ubuntu 24.04 VPS with root or sudo access', 'A domain or subdomain you can point at the VPS', 'Basic SSH familiarity']
related: ['products/self-hosted-n8n', 'solutions/n8n', 'hosting/vps']
---

Prefer not to manage it yourself? Self-hosted n8n plans include setup. This guide does it by hand.

## 1. Point a domain at the server

Add an **A record** such as `flows.yourbrand.com` → your VPS IP. Check it with the [DNS checker](/domains/dns-checker) before continuing.

## 2. Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
sudo ufw allow OpenSSH && sudo ufw allow 80,443/tcp && sudo ufw enable
```

## 3. Create the stack

Create a folder with a `.env` file:

```bash
mkdir ~/n8n && cd ~/n8n
cat > .env <<ENV
DOMAIN=flows.yourbrand.com
DB_PASSWORD=$(openssl rand -hex 24)
ENCRYPTION_KEY=$(openssl rand -hex 24)
ENV
```

Then `docker-compose.yml`:

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    environment:
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: db
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8n
      DB_POSTGRESDB_PASSWORD: ${DB_PASSWORD}
      N8N_HOST: ${DOMAIN}
      N8N_PROTOCOL: https
      WEBHOOK_URL: https://${DOMAIN}/
      N8N_ENCRYPTION_KEY: ${ENCRYPTION_KEY}
    volumes: [n8n-data:/home/node/.n8n]
    depends_on: [db]
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: n8n
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes: [db-data:/var/lib/postgresql/data]
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    command: caddy reverse-proxy --from ${DOMAIN} --to n8n:5678
    volumes: [caddy-data:/data]
volumes: { n8n-data: {}, db-data: {}, caddy-data: {} }
```

## 4. Start it

```bash
docker compose up -d
docker compose logs -f caddy   # wait for the certificate
```

Open `https://flows.yourbrand.com` and create the owner account straight away.

## 5. Keep it healthy

- Back up the `n8n-data` and `db-data` volumes (see [Back up your VPS](/knowledgebase/vps-backups)).
- Keep the `ENCRYPTION_KEY` safe: without it, saved credentials can't be decrypted.
- Update with `docker compose pull && docker compose up -d`.
