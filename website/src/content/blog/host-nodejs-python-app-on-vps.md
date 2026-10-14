---
title: 'How to host a Node.js or Python application on a VPS'
description: 'From a fresh Linux VPS to a running app behind NGINX with HTTPS, a process manager and automatic restarts.'
category: cloud-vps
pubDate: 2026-10-14
related: ['hosting/vps', 'solutions/cloudpanel', 'hosting/web-apps']
---

Running your own application on a VPS gives you full control over runtimes and background processes. This guide covers the common path for a Node.js or Python web app on Ubuntu. Commands assume you are logged in as a user with `sudo`.

## 1. Secure the server first

```bash
sudo apt update && sudo apt upgrade -y
sudo adduser deploy && sudo usermod -aG sudo deploy
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

Then set up SSH keys for the `deploy` user and disable password logins in `/etc/ssh/sshd_config` (`PasswordAuthentication no`).

## 2. Install the runtime

**Node.js:** use the version your app targets. A version manager such as `nvm` makes upgrades easy:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install --lts
```

**Python:** use the system Python with a virtual environment per app:

```bash
sudo apt install -y python3-venv
python3 -m venv /srv/myapp/.venv
```

## 3. Get your code onto the server

```bash
git clone https://github.com/you/myapp.git /srv/myapp
cd /srv/myapp
npm ci --omit=dev        # Node.js
# or
.venv/bin/pip install -r requirements.txt   # Python
```

Keep secrets in an `.env` file or environment variables, never in the repository.

## 4. Run it with a process manager

Your app should start on boot and restart if it crashes. `systemd` is built in and works for both runtimes. Create `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My app
After=network.target

[Service]
User=deploy
WorkingDirectory=/srv/myapp
EnvironmentFile=/srv/myapp/.env
ExecStart=/usr/bin/node server.js
# Python example:
# ExecStart=/srv/myapp/.venv/bin/gunicorn -w 3 -b 127.0.0.1:8000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
```

Bind the app to `127.0.0.1` only, so it is not exposed directly to the internet.

## 5. Put NGINX in front

```nginx
server {
    server_name app.example.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

The `Upgrade` headers keep websockets working.

## 6. Add HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d app.example.com
```

Certbot installs a renewal timer automatically.

## 7. Before you call it done

- **Backups:** database dumps plus uploaded files, stored off the server.
- **Monitoring:** an uptime check and disk-space alerts.
- **Logs:** `journalctl -u myapp -f` shows your app’s output.
- **Deploys:** a script or CI job that pulls, installs, migrates and restarts.

## Prefer not to manage this yourself?

A control panel such as [CloudPanel](/solutions/cloudpanel) handles NGINX, SSL and site setup through a web interface, and Hosttiva’s [managed application plans](/hosting/web-apps) include deployment assistance, firewall setup and backups.
