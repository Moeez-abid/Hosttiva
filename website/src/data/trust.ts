// Trust Center topics (SRS §7 "Trust Center", §16 "Security Features").
// `published` topics only state what the SRS or plans.ts back up.
// `pending` topics list what will be documented; never fill them with unconfirmed claims.
import { SITE } from '../config/site';

export type TrustStatus = 'published' | 'pending';

export interface TrustTopic {
  id: string;
  title: string;
  icon: string;
  status: TrustStatus;
  summary: string;
  points: string[];
}

// Interim: the site contact inbox until security@hosttiva.com exists. Switch to `security@hosttiva.com` then.
export const SECURITY_EMAIL = SITE.email;

export const TRUST_TOPICS: TrustTopic[] = [
  {
    id: 'security', title: 'Security', icon: 'ShieldCheck', status: 'published',
    summary: 'Baseline protections included with Hosttiva plans.',
    points: [
      'SSL certificates on every hosting plan.',
      'Malware monitoring on Professional web hosting and malware checks on WP Care.',
      'Firewall configuration on managed application and VPS plans.',
      'Game servers run on infrastructure separate from web hosting.',
      'Isolated environments for shared, application and game workloads.',
    ],
  },
  {
    id: 'backups', title: 'Backups', icon: 'DatabaseBackup', status: 'published',
    summary: 'Backup frequency is listed on every plan so you know what is covered.',
    points: [
      'Weekly backups on Launch and WP Starter; daily backups on Business and WP Business.',
      'Advanced backups on Scale and Game 8GB; scheduled backups on Game 4GB.',
      'Backups and a recovery plan on managed application plans.',
      'Retention periods and restore terms will be set out in the Backup Policy.',
    ],
  },
  {
    id: 'responsible-disclosure', title: 'Responsible disclosure', icon: 'Bug', status: 'published',
    summary: 'Found a vulnerability? Tell us privately and we will work with you on a fix.',
    points: [
      `Email ${SECURITY_EMAIL} with steps to reproduce and the affected URL or service.`,
      'Please do not access customer data, run denial-of-service tests or publicly disclose before we have responded.',
      'Our machine-readable contact is published at /.well-known/security.txt.',
    ],
  },
  {
    id: 'email-compliance', title: 'Email compliance', icon: 'MailCheck', status: 'published',
    summary: 'Email marketing on Hosttiva must be permission-based.',
    points: [
      'Customers must have permission to contact subscribers.',
      'Every campaign must include an unsubscribe option.',
      'Sender information must be accurate.',
      'Applicable anti-spam and privacy requirements apply.',
    ],
  },
  {
    id: 'privacy', title: 'Privacy and data protection', icon: 'FileLock', status: 'pending',
    summary: 'How we collect, process and protect personal data.',
    points: ['Privacy Policy and Cookie Policy', 'Data Processing Addendum', 'Data retention and deletion'],
  },
  {
    id: 'compliance', title: 'Compliance', icon: 'Landmark', status: 'pending',
    summary: 'Legal and regulatory commitments, reviewed by a qualified legal professional.',
    points: ['Terms of Service and Acceptable Use Policy', 'Domain Registration Agreement', 'Third-party licence verification'],
  },
  {
    id: 'infrastructure', title: 'Infrastructure', icon: 'Server', status: 'pending',
    summary: 'Where your services run and what they run on.',
    points: ['Server locations and data centres', 'Network partners', 'CPU platforms and storage'],
  },
  {
    id: 'encryption', title: 'Encryption', icon: 'Lock', status: 'pending',
    summary: 'How data is protected in transit and at rest.',
    points: ['TLS versions and configuration', 'Encryption at rest', 'Key management'],
  },
  {
    id: 'ddos', title: 'DDoS protection', icon: 'ShieldAlert', status: 'pending',
    summary: 'Network-level protection against traffic floods.',
    points: ['Which services are covered', 'Mitigation approach', 'Customer responsibilities'],
  },
  {
    id: 'monitoring', title: 'Monitoring', icon: 'Activity', status: 'pending',
    summary: 'How we watch services and respond to alerts.',
    points: ['Public status page', 'Uptime and performance monitoring', 'Maintenance announcements'],
  },
  {
    id: 'incident-response', title: 'Incident response', icon: 'Siren', status: 'pending',
    summary: 'What happens when something goes wrong, and how you are told.',
    points: ['Incident classification and timelines', 'Customer communication', 'Post-incident reports'],
  },
  {
    id: 'business-continuity', title: 'Business continuity', icon: 'ServerCog', status: 'pending',
    summary: 'Keeping services available through larger failures.',
    points: ['Disaster recovery plan', 'Recovery objectives', 'Testing schedule'],
  },
];
