const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const app = express();
const port = Number(process.env.PORT) || 3000;
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const databasePath = path.join(dataDir, 'visitors.db');
const hashSalt = process.env.VISITOR_HASH_SALT || 'apttur-web2-default-salt';
const recentFingerprintWindowHours = Number(process.env.VISITOR_WINDOW_HOURS) || 24;

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS visitor_meta (
    meta_key TEXT PRIMARY KEY,
    meta_value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS visitor_registry (
    visitor_key TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    fingerprint_hash TEXT NOT NULL,
    assigned_number INTEGER NOT NULL,
    first_seen INTEGER NOT NULL,
    last_seen INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_visitor_lookup ON visitor_registry (visitor_id);
  CREATE INDEX IF NOT EXISTS idx_fingerprint_lookup ON visitor_registry (ip_hash, fingerprint_hash, last_seen);
  CREATE INDEX IF NOT EXISTS idx_assigned_number ON visitor_registry (assigned_number);
`);

const metaRow = db.prepare('SELECT meta_value FROM visitor_meta WHERE meta_key = ?').get('current_count');
if (!metaRow) {
  db.prepare('INSERT INTO visitor_meta (meta_key, meta_value) VALUES (?, ?)').run('current_count', '0');
}

const totalVisitsRow = db.prepare('SELECT meta_value FROM visitor_meta WHERE meta_key = ?').get('total_visits');
if (!totalVisitsRow) {
  const seedCount = db.prepare('SELECT meta_value FROM visitor_meta WHERE meta_key = ?').get('current_count').meta_value;
  db.prepare('INSERT INTO visitor_meta (meta_key, meta_value) VALUES (?, ?)').run('total_visits', seedCount);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress || '0.0.0.0';
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce((accumulator, entry) => {
    const separatorIndex = entry.indexOf('=');
    if (separatorIndex === -1) return accumulator;

    const key = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1).trim();
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
  }, {});
}

function buildFingerprint(req) {
  const userAgent = req.get('user-agent') || 'unknown';
  const language = req.get('accept-language') || 'unknown';
  const platform = req.get('sec-ch-ua-platform') || 'unknown';
  return sha256([userAgent, language, platform, hashSalt].join('|'));
}

function getOrCreateVisitorId(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  let visitorId = cookies.visitor_id;

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    const oneYearInSeconds = 60 * 60 * 24 * 365;
    res.setHeader('Set-Cookie', `visitor_id=${encodeURIComponent(visitorId)}; Max-Age=${oneYearInSeconds}; Path=/; HttpOnly; SameSite=Lax`);
  }

  return visitorId;
}

const resolveVisitorNumber = db.transaction((visitorId, ipHash, fingerprintHash) => {
  const now = Date.now();
  const visitorKey = sha256([visitorId, ipHash, fingerprintHash, hashSalt].join('|'));
  const cutoff = now - recentFingerprintWindowHours * 60 * 60 * 1000;
  const uniqueCount = Number(db.prepare('SELECT meta_value FROM visitor_meta WHERE meta_key = ?').get('current_count').meta_value);
  const currentTotal = Number(db.prepare('SELECT meta_value FROM visitor_meta WHERE meta_key = ?').get('total_visits').meta_value);

  const existing = db.prepare(`
    SELECT assigned_number
    FROM visitor_registry
    WHERE visitor_key = ?
  `).get(visitorKey);

  if (existing) {
    db.prepare('UPDATE visitor_registry SET last_seen = ? WHERE visitor_key = ?').run(now, visitorKey);
    return { value: existing.assigned_number, totalVisits: currentTotal, isReturning: true, dedupeSource: 'visitor_key' };
  }

  const recentMatch = db.prepare(`
    SELECT assigned_number
    FROM visitor_registry
    WHERE ip_hash = ?
      AND fingerprint_hash = ?
      AND last_seen >= ?
    ORDER BY first_seen ASC
    LIMIT 1
  `).get(ipHash, fingerprintHash, cutoff);

  if (recentMatch) {
    db.prepare(`
      INSERT INTO visitor_registry (
        visitor_key,
        visitor_id,
        ip_hash,
        fingerprint_hash,
        assigned_number,
        first_seen,
        last_seen
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(visitorKey, visitorId, ipHash, fingerprintHash, recentMatch.assigned_number, now, now);

    return { value: recentMatch.assigned_number, totalVisits: currentTotal, isReturning: true, dedupeSource: 'fingerprint_window' };
  }

  // Solo aquí, con un visitante genuinamente nuevo, se incrementan ambos contadores
  const nextCount = uniqueCount + 1;
  const nextTotal = currentTotal + 1;
  db.prepare('UPDATE visitor_meta SET meta_value = ? WHERE meta_key = ?').run(String(nextCount), 'current_count');
  db.prepare('UPDATE visitor_meta SET meta_value = ? WHERE meta_key = ?').run(String(nextTotal), 'total_visits');
  db.prepare(`
    INSERT INTO visitor_registry (
      visitor_key,
      visitor_id,
      ip_hash,
      fingerprint_hash,
      assigned_number,
      first_seen,
      last_seen
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(visitorKey, visitorId, ipHash, fingerprintHash, nextCount, now, now);

  return { value: nextCount, totalVisits: nextTotal, isReturning: false, dedupeSource: 'new_visitor' };
});

app.get('/api/visitor-counter', (req, res) => {
  try {
    const visitorId = getOrCreateVisitorId(req, res);
    const ipHash = sha256([getClientIp(req), hashSalt].join('|'));
    const fingerprintHash = buildFingerprint(req);
    const result = resolveVisitorNumber(visitorId, ipHash, fingerprintHash);

    res.setHeader('Cache-Control', 'no-store');
    res.json(result);
  } catch (error) {
    console.error('Visitor counter error:', error);
    res.status(500).json({ error: 'visitor_counter_failed' });
  }
});

app.use(express.static(rootDir, {
  extensions: ['html']
}));

app.listen(port, () => {
  console.log(`APTTUR server listening on http://localhost:${port}`);
});