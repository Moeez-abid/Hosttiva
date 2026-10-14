---
title: 'How to choose RAM and CPU for a Minecraft server'
description: 'How players, plugins, mods and view distance affect RAM and CPU, with starting points for small, medium and modded servers.'
category: gaming
pubDate: 2026-10-14
related: ['hosting/game-servers']
---

Minecraft servers are easy to start and easy to undersize. RAM gets the attention, but CPU speed is often what decides whether the server lags.

## What uses RAM

- **Loaded chunks.** More players spread across the world means more chunks in memory.
- **View distance.** Each step up loads many more chunks per player.
- **Plugins and mods.** Every plugin adds some memory; large modpacks can need several gigabytes before anyone joins.
- **Entities.** Farms, mobs and dropped items all live in memory.

## What uses CPU

The Minecraft server does most of its world simulation on a single main thread. It needs to complete each tick in 50 milliseconds to keep 20 ticks per second (TPS). When it cannot, the game lags for everyone.

That means **single-core speed matters more than core count** for the main game loop. Extra cores help with chunk generation, plugins that run asynchronously and the operating system.

## Starting points

These are rough starting points for Java Edition, not guarantees. Watch your server and adjust.

| Server | Players | RAM to start with |
|---|---|---|
| Private, vanilla or Paper | 1–5 | 2 GB |
| Small community with plugins | 5–20 | 4 GB |
| Larger community or light mods | 20–50 | 6–8 GB |
| Large modpacks | Any | 8 GB and up |
| Networks with several servers | Many | Separate instances per server |

## Get more from the same hardware

- **Use Paper or Purpur** instead of the vanilla server for better performance and plugin support.
- **Pre-generate the world** so chunk generation does not happen while players explore.
- **Lower the simulation distance** separately from view distance.
- **Limit entity-heavy farms** and use plugins that clear dropped items.
- **Do not over-allocate RAM.** Giving Java far more memory than it needs can make garbage-collection pauses longer.

## Signs you need more resources

- TPS regularly drops below 20 (check with `/tps` on Paper, or a profiler such as spark).
- Memory usage stays near the limit after garbage collection.
- Lag spikes line up with players exploring new areas.

If TPS is low but memory is fine, more RAM will not help. Look at CPU, plugins and entity counts instead.

## Choosing a plan

Hosttiva’s [game server plans](/hosting/game-servers) start at Game 2GB for private servers, with Game 4GB for small communities with plugins or mods and Game 8GB for growing communities. They run on infrastructure separate from web hosting, and a custom plan covers networks with multiple instances.
