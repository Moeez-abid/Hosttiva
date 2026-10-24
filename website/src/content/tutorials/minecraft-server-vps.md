---
title: 'Run a Minecraft server on a VPS'
description: 'Set up a Paper server for Java Edition with a dedicated user, a service that restarts on failure, and backups.'
pubDate: 2026-10-25
totalTime: PT30M
level: Intermediate
requirements: ['An Ubuntu 24.04 VPS with at least 4 GB RAM', 'SSH access', 'The Minecraft Java Edition EULA accepted']
related: ['hosting/game-servers']
---

Game server plans include a panel that does this for you. This guide sets it up by hand on a VPS.

## 1. Install Java

```bash
sudo apt update && sudo apt install -y openjdk-21-jre-headless screen
```

## 2. Create a dedicated user and folder

```bash
sudo adduser --disabled-password --gecos "" minecraft
sudo -u minecraft mkdir -p /home/minecraft/server
```

## 3. Download Paper

Download the latest Paper build for your Minecraft version from papermc.io into `/home/minecraft/server` as `paper.jar`, then accept the EULA:

```bash
echo "eula=true" | sudo -u minecraft tee /home/minecraft/server/eula.txt
```

## 4. Run it as a service

Create `/etc/systemd/system/minecraft.service`:

```ini
[Unit]
Description=Minecraft server
After=network.target

[Service]
User=minecraft
WorkingDirectory=/home/minecraft/server
ExecStart=/usr/bin/java -Xms2G -Xmx3G -jar paper.jar --nogui
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Leave about 1 GB of RAM for the operating system. Then:

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now minecraft
sudo ufw allow 25565/tcp
```

## 5. Back up the world

Stop the server or run `save-off` and `save-all` from the console before copying the `world` folders, so the files are consistent. Schedule this nightly and keep copies off the server.

## 6. Tune performance

Read [How to choose RAM and CPU for a Minecraft server](/blog/minecraft-server-ram-cpu) and pre-generate the world to avoid lag spikes as players explore.
