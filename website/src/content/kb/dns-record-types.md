---
title: 'DNS record types explained'
description: 'A, AAAA, CNAME, MX, TXT, NS and CAA records: what each one does and when you need it.'
category: domains-dns
updated: 2026-10-21
order: 2
related: ['domains-dns/dns-propagation', 'email/deliverability-records']
---

| Record | What it does | Example |
|---|---|---|
| **A** | Points a name to an IPv4 address | `@ → 203.0.113.24` |
| **AAAA** | Points a name to an IPv6 address | `@ → 2001:db8::24` |
| **CNAME** | Makes one name an alias of another | `www → yourbrand.com` |
| **MX** | Says which servers receive email for the domain | `@ → mail.yourbrand.com (priority 10)` |
| **TXT** | Holds text, used for SPF, DKIM, DMARC and verifications | `v=spf1 include:… ~all` |
| **NS** | Delegates the domain (or a subdomain) to nameservers | `ns1.example.net` |
| **CAA** | Limits which certificate authorities may issue SSL for the domain | `0 issue "letsencrypt.org"` |

## Rules worth knowing

- A name with a **CNAME** cannot have other records. That is why the bare domain (`@`) usually uses an **A** record.
- Keep **one SPF record** per domain. Combine services into it instead of adding a second.
- If you add a **CAA** record, include every certificate authority you use, or certificate renewals will fail.

Check any domain's records with the [DNS checker](/domains/dns-checker).
