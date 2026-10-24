---
title: 'Set up private nameservers for your agency'
description: 'Use ns1.youragency.com and ns2.youragency.com so clients see your brand, not ours.'
category: domains-dns
updated: 2026-10-25
order: 5
related: ['domains-dns/dns-record-types', 'domains-dns/dns-propagation']
---

Private (or "vanity") nameservers let reseller and agency customers give clients nameservers on their own domain.

## What you need

- A reseller or agency plan.
- The IP addresses for your nameservers, from your welcome email or the client area.

## 1. Register the nameserver hostnames

At the registrar of your agency domain, find **Child nameservers** (sometimes called "glue records" or "register nameservers") and create:

| Hostname | IP address |
|---|---|
| `ns1.youragency.com` | first nameserver IP |
| `ns2.youragency.com` | second nameserver IP |

## 2. Add matching A records

In your agency domain's DNS, add A records for `ns1` and `ns2` with the same IPs.

## 3. Use them

Set client domains to `ns1.youragency.com` and `ns2.youragency.com`. Check the result with the [DNS checker](/domains/dns-checker) (record type NS).
