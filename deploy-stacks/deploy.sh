#!/usr/bin/env bash
# One-click deploy:  ./deploy.sh <app> <domain>
# Starts the shared HTTPS proxy if needed, generates secrets into <app>/.env, then starts the app.
set -euo pipefail

usage() { echo "Usage: $0 <app> <domain>"; echo "Apps: $(cd "$(dirname "$0")" && ls -d */ | tr -d / | grep -v proxy | tr '\n' ' ')"; exit 1; }
[ $# -eq 2 ] || usage
APP="$1"; DOMAIN="$2"
ROOT="$(cd "$(dirname "$0")" && pwd)"
[ -f "$ROOT/$APP/docker-compose.yml" ] && [ "$APP" != "proxy" ] || { echo "Unknown app: $APP"; usage; }
command -v docker >/dev/null || { echo "Docker is required: curl -fsSL https://get.docker.com | sh"; exit 1; }

# 1. Shared network + proxy (automatic HTTPS for every app on this server)
docker network inspect web >/dev/null 2>&1 || docker network create web >/dev/null
if ! docker ps --format '{{.Names}}' | grep -qx caddy-proxy; then
  if [ ! -f "$ROOT/proxy/.env" ]; then
    read -rp "Email for Let's Encrypt certificates: " EMAIL
    echo "ACME_EMAIL=$EMAIL" > "$ROOT/proxy/.env"
  fi
  (cd "$ROOT/proxy" && docker compose up -d)
fi

# 2. App environment: copy the example once, fill every CHANGE_ME with a unique random secret
cd "$ROOT/$APP"
if [ ! -f .env ]; then
  : > .env
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
      DOMAIN=*) echo "DOMAIN=$DOMAIN" >> .env ;;
      *=CHANGE_ME_32) echo "${line%%=*}=$(openssl rand -hex 16)" >> .env ;;
      *=CHANGE_ME) echo "${line%%=*}=$(openssl rand -hex 24)" >> .env ;;
      *) echo "$line" >> .env ;;
    esac
  done < .env.example
  chmod 600 .env
  echo "Created $APP/.env (secrets generated). Review it for any app-specific values such as SMTP."
fi

# 3. Start
docker compose up -d
echo
echo "Done. Point an A record for $DOMAIN to this server, then open: https://$DOMAIN"
