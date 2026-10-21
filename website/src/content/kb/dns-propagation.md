---
title: 'Why DNS changes take time (and how to check them)'
description: 'What DNS propagation is, how TTL controls it, and how to check whether your change is live.'
category: domains-dns
updated: 2026-10-21
order: 1
related: ['domains-dns/dns-record-types']
---

After you change a DNS record or nameservers, some visitors may see the old result for a while. This is usually called propagation, and it is caused by caching.

## How it works

Every DNS record has a **TTL** (time to live) in seconds. Resolvers around the world cache the answer for that long. A record with a TTL of 3600 can be served from cache for up to an hour after you change it.

Nameserver changes go through the domain's registry, which also caches. These can take from minutes up to 24–48 hours.

## Check your change

Use the free [DNS checker](/domains/dns-checker). It queries a public resolver directly, so it shows the current answer rather than your computer's cache.

## Speed up future changes

Lower the TTL to 300 seconds a day before a planned change, make the change, then raise the TTL again once everything is confirmed.

## Still seeing the old site?

- Try a private browser window, or another network such as mobile data.
- Clear your computer's DNS cache.
- If the DNS checker shows the old value too, the change was not saved where your DNS is hosted.
