---
title: 'Point your domain to your hosting'
description: 'Connect a domain registered anywhere to your Hosttiva hosting, using either nameservers or an A record, and confirm it worked.'
pubDate: 2026-10-20
totalTime: PT15M
level: Beginner
requirements: ['Access to your domain registrar account', 'Your hosting welcome email (nameservers and server IP)']
related: ['domains/transfer', 'domains/dns-checker', 'hosting/web']
---

There are two ways to connect a domain to hosting. Pick one:

- **Change nameservers** if you want your hosting account to manage all DNS records, including email. This is the simplest option for most websites.
- **Add an A record** if you want to keep DNS where it is today, for example because other services already depend on it.

Your hosting welcome email in the client area lists both the nameservers and the server IP address.

## 1. Lower the TTL (optional)

If the domain already points somewhere else and you want the switch to be quick, lower the TTL on its existing records to 300 seconds a day in advance. Skip this step for a new domain.

## 2. Change the nameservers

Use this step **or** step 3, not both.

1. Sign in to the registrar where the domain is registered.
2. Open the domain’s settings and find **Nameservers** (sometimes called DNS servers).
3. Choose **custom nameservers** and replace the existing entries with the ones from your welcome email.
4. Save.

Nameserver changes can take from a few minutes to 24 hours to be seen everywhere, because the domain’s registry and resolvers cache them.

## 3. Or add an A record

1. Open the DNS management page wherever your DNS is hosted today.
2. Edit the existing **A** record for `@` (the bare domain), or add one, with your server IP as the value.
3. Add or edit a record for `www`: either a **CNAME** pointing to your bare domain, or an **A** record with the same IP.
4. If you are moving email too, update the **MX** records. Leave them alone if email stays with another provider.

## 4. Check the result

Look up the domain with the [DNS checker](/domains/dns-checker?q=example.com):

- **A** should show your server IP.
- **NS** should show the new nameservers if you used step 2.

Then open the domain in a private browser window. If you still see the old site, wait a little longer; your own computer may be caching the old answer.

## 5. Issue the SSL certificate

Once the domain resolves to your hosting, the certificate can be issued. On cPanel hosting this usually happens automatically within a few hours; you can also start it yourself, as shown in [Issue a free SSL certificate in cPanel](/tutorials/free-ssl-cpanel-autossl).

## Troubleshooting

- **The registrar rejects the nameservers.** Check for typos and trailing dots. Some registrars need at least two nameservers.
- **Email stopped working.** You probably changed nameservers without recreating MX and TXT records at the new DNS host. Add them back, or ask support to help.
- **Still the old site after 24 hours.** Run the DNS checker again. If it shows the old IP, the change was not saved at the registrar.
