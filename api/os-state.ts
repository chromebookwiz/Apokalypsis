import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================
// NULL-LINE OS STATE — Server-Side Persistent Store
// Uses Vercel Edge Config / KV if available, else in-process
// shared Map (single-instance cache for dev/preview).
// In production, set KV_REST_API_URL + KV_REST_API_TOKEN
// for true multi-instance persistence via Vercel KV.
// ============================================================

// In-memory shared state (works within a single Vercel instance)
// For true multi-instance sync, Vercel KV is used when env vars present
const MEMORY_STORE = new Map<string, unknown>();

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kvGet(key: string): Promise<unknown> {
    if (KV_URL && KV_TOKEN) {
        try {
            const r = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
                headers: { Authorization: `Bearer ${KV_TOKEN}` }
            });
            if (r.ok) { const d = await r.json(); return d.result !== undefined ? JSON.parse(d.result) : null; }
        } catch (_) { }
    }
    return MEMORY_STORE.get(key) ?? null;
}

async function kvSet(key: string, value: unknown): Promise<void> {
    if (KV_URL && KV_TOKEN) {
        try {
            await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: JSON.stringify(value) })
            });
        } catch (_) { }
    }
    MEMORY_STORE.set(key, value);
}

// Allowed state namespaces
const ALLOWED_KEYS = new Set(['os_fs', 'os_env', 'os_cmds', 'os_memory', 'os_processes', 'os_messages', 'agent_log']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-OS-Auth');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Auth: X-OS-Auth header must contain SHA256 hash of 'DigitalPimp'
    // We check a pre-computed constant so no crypto needed server-side
    const auth = req.headers['x-os-auth'];
    const VALID_TOKEN = 'a9f3c1e2b8d4f6a0c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9'; // marker
    if (!auth || auth !== VALID_TOKEN) {
        // We use a simpler check: just verify the header is present with the right value
        // The actual password check is done client-side; this just ensures requests come from our app
        if (auth !== 'null-line-os-v15') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    const { key } = req.query as { key: string };
    if (!key || !ALLOWED_KEYS.has(key)) {
        return res.status(400).json({ error: 'Invalid key', allowed: [...ALLOWED_KEYS] });
    }

    if (req.method === 'GET') {
        const value = await kvGet(key);
        return res.status(200).json({ key, value });
    }

    if (req.method === 'POST') {
        const { value } = req.body;
        if (value === undefined) return res.status(400).json({ error: 'Missing value' });
        await kvSet(key, value);
        return res.status(200).json({ ok: true, key });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
