---
title: 'Why backups are not the same as a disaster-recovery plan'
description: 'Backups are copies of data. Disaster recovery is the plan for getting a service running again. Here is how they differ and what a simple plan looks like.'
category: security-backups
pubDate: 2026-10-14
related: ['hosting/vps', 'sell-online/ecommerce-care']
---

“We have backups” is often said as if it settles the question. It does not. A backup is a copy of data at a point in time. Disaster recovery is the tested process of getting a service working again, within a time you can accept, after something goes wrong.

## What backups do well

Backups protect you against data loss: a deleted file, a broken plugin update, a corrupted database table. A good backup setup has:

- **Frequency** that matches how often your data changes. A brochure site may be fine with weekly copies; an online store needs at least daily.
- **Retention** long enough to recover from problems you notice late, such as malware that sat quietly for two weeks.
- **Separation** from the thing being backed up. A backup stored on the same server is lost if that server is lost.

## What backups do not cover

Having a copy of your data does not answer:

- Where will the restored site run if the original server is unavailable?
- Who does the restore, and do they have the access they need?
- How long does a full restore take for your data size?
- What about DNS, SSL certificates, environment variables, cron jobs and third-party API keys?
- How much data can you afford to lose between the last backup and the failure?

Those questions are what a disaster-recovery plan answers.

## Two numbers to decide first

**Recovery point objective (RPO):** the maximum amount of data, measured in time, you can afford to lose. If your RPO is one hour, hourly backups or replication are the minimum.

**Recovery time objective (RTO):** how long the service can be down before the impact is unacceptable. An RTO of four hours rules out a plan that depends on ordering and provisioning new hardware.

Write both down. They drive every other choice, including cost.

## A simple recovery plan

For most small businesses and agencies, a one-page document is enough:

1. **Inventory.** List each service, where it runs, its domain, and where its backups live.
2. **Dependencies.** Note DNS provider, email, payment gateways, API keys and anything stored outside the server.
3. **Restore steps.** Write the exact steps to rebuild on a fresh server, including software versions.
4. **Access.** Record who can log in to the hosting account, registrar and DNS, with two-factor authentication set up for each.
5. **Communication.** Decide who tells customers, and where status updates will be posted.
6. **Test.** Restore to a staging environment at least twice a year and time it. A backup you have never restored is a hope, not a plan.

## Where managed hosting helps

Managed plans can take on parts of this work: scheduled off-server backups, restore assistance, staging environments for test restores, and monitoring that alerts you before a small problem becomes an outage. The plan itself, and the decisions about RPO and RTO, still belong to you.

If you want help writing or testing a recovery plan, our team can review your setup. [Get in touch](/contact) with what you run today.
