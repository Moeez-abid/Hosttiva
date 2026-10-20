// Status notices for /status (SRS §8). Live up/down state comes ONLY from the status page (STATUS_URL);
// this file holds human-written maintenance notices and incident summaries. Never add an entry that didn't happen.

export type Service = 'Website' | 'Client area' | 'Shared hosting' | 'VPS & cloud' | 'Email' | 'DNS' | 'API' | 'Game servers';

export interface Maintenance {
  title: string;
  /** ISO 8601 with timezone, e.g. 2026-11-02T22:00:00+05:00 */
  start: string;
  end: string;
  services: Service[];
  detail: string;
}

export interface Incident {
  title: string;
  date: string; // ISO date
  services: Service[];
  impact: 'minor' | 'major' | 'outage';
  summary: string;
  resolvedAt?: string;
}

/** Services monitored on the status page (SRS §8: network health, uptime, API, email, DNS). */
export const MONITORED: { name: Service; what: string; icon: string }[] = [
  { name: 'Website', what: 'hosttiva.com and its free tools', icon: 'Globe' },
  { name: 'Client area', what: 'Ordering, billing, domains and tickets', icon: 'LayoutDashboard' },
  { name: 'Shared hosting', what: 'cPanel web and WordPress servers', icon: 'Server' },
  { name: 'VPS & cloud', what: 'Application and VPS nodes', icon: 'Cloud' },
  { name: 'Email', what: 'Incoming (IMAP) and outgoing (SMTP) mail', icon: 'Mail' },
  { name: 'DNS', what: 'Nameservers and DNS resolution', icon: 'Network' },
  { name: 'API', what: 'Provisioning and tools APIs', icon: 'Code' },
  { name: 'Game servers', what: 'Game cluster nodes and panel', icon: 'Gamepad2' },
];

export const MAINTENANCE: Maintenance[] = [];
export const INCIDENTS: Incident[] = [];
