// Hosttiva SSL check API — reads the certificate a host actually serves on port 443.
// Zero dependencies (Node 20+). Run behind NGINX; see README.md.
//
//   GET /ssl?host=example.com  →  JSON (shape consumed by website/src/components/tools/SslTool.astro)
//
// Safety: only public IPs on port 443, per-IP rate limit, short timeouts, CORS locked to ALLOWED_ORIGINS.
import http from 'node:http';
import tls from 'node:tls';
import dns from 'node:dns/promises';
import net from 'node:net';

const PORT = Number(process.env.PORT ?? 8787);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'https://hosttiva.com,https://www.hosttiva.com,https://hosttiva.pages.dev')
  .split(',').map((s) => s.trim()).filter(Boolean);
const RATE_LIMIT = Number(process.env.RATE_LIMIT_PER_MIN ?? 20);
const DOMAIN_RE = /^(?=.{1,253}$)(?!-)([a-z0-9-]{1,63}(?<!-)\.)+[a-z]{2,63}$/i;

// ── SSRF guard: refuse private, loopback, link-local, CGNAT, multicast and reserved ranges ──
const blocked = new net.BlockList();
for (const [addr, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['224.0.0.0', 3],
]) blocked.addSubnet(addr, prefix, 'ipv4');
for (const [addr, prefix] of [['::', 128], ['::1', 128], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8]])
  blocked.addSubnet(addr, prefix, 'ipv6');

// IPv4-mapped IPv6 (::ffff:a.b.c.d) is checked via its IPv4 part. (A ::ffff:0:0/96 subnet would
// make BlockList match every IPv4 address.)
const isBlocked = ({ address, family }) => {
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(address);
  if (mapped) return blocked.check(mapped[1], 'ipv4');
  return blocked.check(address, family === 6 ? 'ipv6' : 'ipv4');
};

async function resolvePublic(host) {
  const addrs = await dns.lookup(host, { all: true });
  const ok = addrs.find((a) => !isBlocked(a));
  if (!ok || addrs.some(isBlocked)) {
    throw Object.assign(new Error('Host resolves to a private or reserved address.'), { status: 400 });
  }
  return ok.address;
}

// ── Rate limit (in memory, per client IP) ──
const hits = new Map();
setInterval(() => hits.clear(), 60_000).unref();
const limited = (ip) => (hits.set(ip, (hits.get(ip) ?? 0) + 1), hits.get(ip) > RATE_LIMIT);

const dn = (o = {}) => o.CN ?? o.O ?? Object.values(o).join(', ');

function inspect(host, ip) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: ip, port: 443, servername: host, rejectUnauthorized: false, timeout: 8000 }, () => {
      const cert = socket.getPeerCertificate(true);
      if (!cert || !cert.valid_to) return socket.destroy(), reject(Object.assign(new Error('No certificate presented.'), { status: 502 }));
      const chain = [];
      for (let c = cert, i = 0; c && i < 6; c = c.issuerCertificate === c ? null : c.issuerCertificate, i++) {
        chain.push({ subject: dn(c.subject), issuer: dn(c.issuer), validTo: new Date(c.valid_to).toISOString() });
      }
      const validTo = new Date(cert.valid_to);
      resolve({
        host,
        authorized: socket.authorized,
        authorizationError: socket.authorizationError ? String(socket.authorizationError) : undefined,
        subject: dn(cert.subject),
        issuer: dn(cert.issuer),
        validFrom: new Date(cert.valid_from).toISOString(),
        validTo: validTo.toISOString(),
        daysRemaining: Math.floor((validTo - Date.now()) / 864e5),
        san: (cert.subjectaltname ?? '').split(', ').filter(Boolean).map((s) => s.replace(/^DNS:/, '')),
        protocol: socket.getProtocol(),
        chain,
      });
      socket.end();
    });
    socket.on('timeout', () => socket.destroy(Object.assign(new Error('Connection timed out.'), { status: 504 })));
    socket.on('error', (e) => reject(Object.assign(e, { status: e.status ?? 502 })));
  });
}

function send(res, status, body, origin) {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  if (origin && ALLOWED_ORIGINS.includes(origin)) Object.assign(headers, { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' });
  res.writeHead(status, headers).end(JSON.stringify(body));
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const origin = req.headers.origin;
  const ip = req.headers['x-real-ip'] ?? req.socket.remoteAddress;
  if (url.pathname === '/health') return send(res, 200, { ok: true });
  if (req.method !== 'GET' || url.pathname !== '/ssl') return send(res, 404, { error: 'Not found.' }, origin);
  if (limited(ip)) return send(res, 429, { error: 'Too many checks. Please wait a minute.' }, origin);

  const host = (url.searchParams.get('host') ?? '').trim().toLowerCase().replace(/\.$/, '');
  if (!DOMAIN_RE.test(host)) return send(res, 400, { error: 'Enter a valid domain, for example example.com.' }, origin);
  try {
    send(res, 200, await inspect(host, await resolvePublic(host)), origin);
  } catch (e) {
    const msg = e.code === 'ENOTFOUND' ? 'Domain does not resolve.' : e.code === 'ECONNREFUSED' ? 'Nothing is listening on port 443.' : e.message;
    send(res, e.status ?? 502, { error: msg }, origin);
  }
}).listen(PORT, '127.0.0.1', () => console.log(`ssl-check-api on 127.0.0.1:${PORT}`));
