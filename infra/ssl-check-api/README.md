# SSL check API

Live certificate checker used by the website's SSL Checker (`/domains/ssl-checker`).
Until it is deployed, the website falls back to Certificate Transparency logs (crt.sh).

- `server.mjs`: zero-dependency Node 20+ service. `GET /ssl?host=example.com` → JSON.
- `ssl-check-api.service`: hardened systemd unit.
- `nginx-tools.hosttiva.com.conf`: reverse proxy for `tools.hosttiva.com`.

Safety built in: only public IPs on port 443 (private, loopback and reserved ranges are refused), it connects
to the IP it validated (no DNS-rebinding window), 8s timeouts, 20 checks/min per IP, CORS limited to Hosttiva origins.

## Setup on a VPS (Ubuntu 24.04)

Any small VPS works (1 vCPU / 512 MB is plenty). Commands run as a sudo user.

### 1. Point a subdomain at the VPS
In your DNS (Cloudflare), add an **A record**: `tools` → your VPS IPv4. Proxy status: **DNS only** (grey cloud) for now.

### 2. Install Node.js and NGINX
```bash
sudo apt update && sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should print v22.x
```

### 3. Copy the service
From your Mac, in the repo root:
```bash
scp infra/ssl-check-api/{server.mjs,ssl-check-api.service,nginx-tools.hosttiva.com.conf} you@VPS_IP:/tmp/
```
On the VPS:
```bash
sudo useradd --system --no-create-home --shell /usr/sbin/nologin sslcheck
sudo mkdir -p /opt/ssl-check-api && sudo mv /tmp/server.mjs /opt/ssl-check-api/
sudo mv /tmp/ssl-check-api.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now ssl-check-api
curl -s localhost:8787/health          # {"ok":true}
curl -s "localhost:8787/ssl?host=github.com" | head -c 200
```

### 4. NGINX + HTTPS
```bash
sudo mv /tmp/nginx-tools.hosttiva.com.conf /etc/nginx/sites-available/tools.hosttiva.com
sudo ln -s /etc/nginx/sites-available/tools.hosttiva.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 'Nginx Full' && sudo ufw allow OpenSSH && sudo ufw enable
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tools.hosttiva.com
curl -s "https://tools.hosttiva.com/ssl?host=github.com" | head -c 200
```
After certbot succeeds you can switch the Cloudflare record to **Proxied** (orange cloud) if you like.

### 5. Switch the website to the live checker
In `website/src/config/site.ts`:
```ts
export const SSL_CHECK_API: string | null = 'https://tools.hosttiva.com/ssl';
```
Commit and push; the next deploy uses the live API. The tool's privacy note updates automatically.

## Operating it
- Logs: `journalctl -u ssl-check-api -f`
- Update: copy the new `server.mjs` to `/opt/ssl-check-api/`, then `sudo systemctl restart ssl-check-api`
- Change allowed origins or rate limit: edit the `Environment=` lines in the unit, then `daemon-reload` + restart.
