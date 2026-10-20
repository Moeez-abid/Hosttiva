# Status page (status.hosttiva.com)

SRS §8 Status Center: current status, scheduled maintenance, past incidents, uptime, and per-service status
(website, client area, API, email, DNS). Runs [Uptime Kuma](https://github.com/louislam/uptime-kuma) behind
Caddy, which gets and renews the HTTPS certificate automatically.

The website's `/status` page links here and also lists maintenance notices from `website/src/data/status.ts`.

## 1. Pick a server

Use a small VPS (1 vCPU, 1 GB RAM) in a **different provider or region** from the servers you monitor.
A status page that goes down with your infrastructure cannot report the outage.

## 2. DNS

Add an **A record**: `status` → the VPS IPv4 address. In Cloudflare, set it to **DNS only** (grey cloud) so
Caddy can obtain its certificate.

## 3. Install Docker (Ubuntu 24.04)

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
```

## 4. Start the stack

From your Mac, in the repo root:
```bash
scp -r infra/status-page you@VPS_IP:~/status-page
```
On the VPS:
```bash
cd ~/status-page
cp .env.example .env && nano .env      # set ACME_EMAIL
sudo ufw allow 80,443/tcp && sudo ufw allow 443/udp && sudo ufw allow OpenSSH && sudo ufw enable
docker compose up -d
docker compose logs -f caddy            # wait for "certificate obtained"
```
Open `https://status.hosttiva.com` and create the admin account immediately. The first visitor becomes admin.

## 5. Add monitors

Suggested monitors (Uptime Kuma → **Add New Monitor**):

| Name | Type | Target |
|---|---|---|
| Website | HTTP(s) | `https://hosttiva.com` |
| Client area | HTTP(s) – Keyword | `https://client.hosttiva.com/index.php`, keyword: a word on the login page |
| Shared hosting server | HTTP(s) | a test site hosted on each cPanel server |
| DNS | DNS | `hosttiva.com`, record `A`, resolver `1.1.1.1` |
| Email (SMTP) | TCP Port | mail server host, port `465` |
| Email (IMAP) | TCP Port | mail server host, port `993` |
| API | HTTP(s) | the WHMCS API or SSL check API health URL (`https://tools.hosttiva.com/health`) |
| Game cluster | TCP Port / Ping | game node host |

Set **Heartbeat interval** to 60s and **Retries** to 2 to avoid false alarms. Under **Settings → Notifications**,
add email, Telegram or Slack so the team hears about problems before customers do.

## 6. Publish the status page

**Status Pages → New Status Page**, slug `hosttiva`, then:
- Group monitors: *Website & client area*, *Hosting*, *Email*, *DNS*, *API*, *Game servers*.
- Under **Custom Domain**, add `status.hosttiva.com`.
- Add your logo and a footer link back to `https://hosttiva.com`.
- Use **Maintenance** (left menu) for scheduled work; it shows on the page automatically.

## 7. Connect the website

In `website/src/config/site.ts` set:
```ts
export const STATUS_URL: string | null = 'https://status.hosttiva.com';
```
Commit and push. The site's `/status` page then shows the live link instead of the "launching soon" notice.

## Operating

- Update: `docker compose pull && docker compose up -d`
- Backup: `docker run --rm -v status-page_kuma-data:/d -v $PWD:/b alpine tar czf /b/kuma-$(date +%F).tgz -C /d .`
- Post incidents on the status page as they happen; add a short summary to `website/src/data/status.ts` afterwards.
