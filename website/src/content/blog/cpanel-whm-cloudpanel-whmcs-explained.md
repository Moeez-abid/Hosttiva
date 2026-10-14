---
title: 'cPanel, WHM, CloudPanel, and WHMCS: what does each one do?'
description: 'Four tools that show up in every hosting conversation. Here is what each is for, who uses it, and how they fit together.'
category: agencies
pubDate: 2026-10-14
related: ['solutions/reseller', 'solutions/cloudpanel', 'agencies/white-label']
---

If you are choosing hosting, or starting to resell it, you will keep seeing the same four names. They solve different problems and sit at different layers.

## cPanel: managing one hosting account

cPanel is the control panel for a single shared-hosting account. It is what a website owner logs into to:

- Manage files and databases.
- Create email accounts and forwarders.
- Add domains and subdomains.
- Install SSL certificates.
- Install apps such as WordPress.
- Check resource usage and logs.

**Who uses it:** website owners and their developers.

## WHM: managing many cPanel accounts

WHM (WebHost Manager) sits one level above cPanel. From WHM you create and manage cPanel accounts, define hosting packages with resource limits, configure DNS, and, on reseller plans, brand the experience as your own.

**Who uses it:** hosting providers and resellers. A reseller plan gives you a WHM login with permission to create accounts for your own clients, and root WHM access gives full control of the server.

## CloudPanel: running applications on a VPS

CloudPanel is a lightweight control panel for application servers. It focuses on modern stacks rather than shared hosting:

- PHP sites with NGINX and PHP-FPM.
- Node.js and Python applications.
- Static sites and reverse proxies.
- Databases, Redis, SSL and cron jobs.

It does not include email hosting or the multi-tenant reseller features of WHM.

**Who uses it:** developers deploying applications, APIs and high-traffic sites on a VPS.

## WHMCS: billing and automation

WHMCS is not a server panel at all. It is the business layer: a client portal that handles orders, invoices, recurring payments, support tickets and domain registrations. When a customer pays, WHMCS can automatically create their cPanel account through WHM, or provision other services.

**Who uses it:** hosting businesses and agencies selling hosting to clients.

## How they fit together

```
Customer ──orders──▶ WHMCS (billing, tickets, domains)
                        │ provisions
                        ▼
                     WHM ──creates──▶ cPanel accounts (shared/reseller hosting)

Developer ─────────────▶ CloudPanel on a VPS (applications)
```

At Hosttiva, cPanel and WHM run shared and reseller hosting, CloudPanel runs suitable VPS and application products, and WHMCS ties together billing, provisioning, renewals, support and domains in the client area.

## Which do you need?

- **A website or blog:** a cPanel hosting account.
- **Several client sites under your brand:** a [reseller plan](/solutions/reseller) with WHM, plus WHMCS if you bill clients yourself.
- **A Node.js, Python or high-traffic PHP app:** [CloudPanel on a VPS](/solutions/cloudpanel).
- **A branded portal for your clients:** a [white-label client area](/agencies/white-label) built on WHMCS.
