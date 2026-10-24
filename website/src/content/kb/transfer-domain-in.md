---
title: 'Transfer a domain to Hosttiva'
description: 'Unlock the domain, get the authorisation code, and move it without downtime.'
category: domains-dns
updated: 2026-10-25
order: 3
related: ['domains-dns/dns-propagation', 'domains-dns/dns-record-types']
---

A transfer moves the domain's registration to Hosttiva. Your website and email keep working if DNS stays the same during the move.

## Before you start

- The domain must be at least **60 days** old and not transferred in the last 60 days (registry rule for most extensions).
- The registrant email must be one you can read: approval emails go there.
- Note your current DNS records, or keep the current nameservers until the transfer completes.

## Steps

1. At your current registrar, **unlock** the domain (turn off "transfer lock").
2. Request the **authorisation code** (also called EPP or transfer code).
3. Turn off WHOIS privacy temporarily if your registrar requires it.
4. In the Hosttiva client area, start a **domain transfer** and enter the code.
5. Approve the transfer from the email you receive.

Most transfers finish in **1–7 days**. A transfer usually adds one year to the registration.

## After the transfer

Check the nameservers and DNS records with the [DNS checker](/domains/dns-checker), then turn the transfer lock back on.
