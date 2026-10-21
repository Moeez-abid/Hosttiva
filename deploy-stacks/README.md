# Deploy stacks (one-click apps)

SRS §12 "AI Marketplace" and Phase 4 "one-click deploy". Each folder is a self-contained Docker Compose stack for a
customer VPS. A shared proxy gives every app automatic HTTPS, so many apps can run on one server.

```
deploy-stacks/
  deploy.sh            one-click: ./deploy.sh <app> <domain>
  proxy/               shared Caddy (caddy-docker-proxy) on ports 80/443
  <app>/               docker-compose.yml + .env.example
```

## Ready stacks

| App | Folder | What it is | Notes |
|---|---|---|---|
| n8n | `n8n` | Workflow automation | Postgres included |
| Flowise | `flowise` | Visual LLM app builder | Create the admin account on first visit |
| Open WebUI | `open-webui` | Self-hosted AI chat interface | Add an Ollama URL or an OpenAI-compatible key |
| NocoDB | `nocodb` | Spreadsheet interface for databases | Postgres included |
| Mautic | `mautic` | Marketing automation | Web, cron and worker roles; MariaDB. Permission-based email only |
| AnythingLLM | `anythingllm` | Private document chat | Needs `SYS_ADMIN` capability for document processing |
| Langflow | `langflow` | LLM workflow builder | Superuser from `.env` |
| Typebot | `typebot` | Conversational forms and bots | Two domains + SMTP required |
| Uptime Kuma | `uptime-kuma` | Uptime monitoring | Hosttiva's own status page lives in `infra/status-page` |

## Official installers (no stack here)

These apps ship complex, frequently changing setups. Use the vendor's installer rather than a copy that drifts:

| App | Official setup |
|---|---|
| Supabase | https://supabase.com/docs/guides/self-hosting/docker |
| Appwrite | https://appwrite.io/docs/advanced/self-hosting |
| Coolify | https://coolify.io/docs/get-started/installation |
| Chatwoot | https://developers.chatwoot.com/self-hosted/deployment/docker |
| Plausible CE | https://github.com/plausible/community-edition |

## Deploy an app

On a fresh Ubuntu 24.04 VPS:

```bash
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER && newgrp docker
git clone <this repo> && cd hosttiva/deploy-stacks
./deploy.sh n8n flows.yourbrand.com
```

Then add a DNS **A record** for the domain pointing at the server. Caddy issues the certificate on the first request.

`deploy.sh`:
1. creates the shared `web` network and starts the proxy (asks once for a Let's Encrypt email),
2. copies `.env.example` to `.env`, sets `DOMAIN`, and replaces every `CHANGE_ME` with a unique random secret,
3. runs `docker compose up -d`.

Running it again for the same app keeps the existing `.env` (secrets are never regenerated).

## Operating

- Update an app: `cd <app> && docker compose pull && docker compose up -d`
- Logs: `cd <app> && docker compose logs -f`
- Backups: every stack keeps data in named Docker volumes; back them up with `docker run --rm -v <volume>:/d -v $PWD:/b alpine tar czf /b/<volume>.tgz -C /d .`
- Images use `latest`/major tags for simplicity. For production, pin exact versions in each compose file.

## Next (platform work)

Wire these stacks into WHMCS provisioning so "Deploy" in the client area runs `deploy.sh` on the customer's VPS
over SSH, and show the app list on the website's marketplace (`website/src/data/marketplace.ts` → `ONE_CLICK_APPS`).
