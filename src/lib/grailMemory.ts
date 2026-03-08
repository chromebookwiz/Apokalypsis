// ============================================================
// HOLY GRAIL MEMORY SYSTEM — Null-Line OS Integration
// Based on: https://github.com/dakotalock/holygrailopensource
//
// Implements:
//   1. Persistent JSON memory (context_memory.json analog)
//   2. Semantic vector cache (TF-IDF cosine similarity)
//   3. Multi-agent: Emissary, Memento, DrDebug, GrailCrawler
//   4. GrailCrawler: web intelligence via curl/fetch
//   5. Memory search, learning, closed-loop feedback
// ============================================================

export interface MemoryEntry {
    id: string;
    timestamp: string;
    type: 'INTERACTION' | 'PROJECT' | 'DEBUG' | 'RESEARCH' | 'INSTALL' | 'CRAWL';
    content: string;
    tags: string[];
    vector?: number[];  // TF-IDF embedding
    quality?: number;   // 0-1 quality score
}

export interface WalletAccount {
    id: string;
    name: string;
    address: string;
    balance: number;
    createdAt: string;
}

export type WalletTxKind = 'MINT' | 'TRANSFER' | 'REWARD';

export interface WalletTx {
    id: string;
    from: string | null;
    to: string;
    amount: number;
    timestamp: string;
    memo?: string;
    kind: WalletTxKind;
}

export interface GrailMemory {
    entries: MemoryEntry[];
    projects: { id: string; name: string; code: string; url?: string; quality: number }[];
    agents: { name: string; role: string; lastActive: string; tasksCompleted: number }[];
    crawlCache: { url: string; content: string; timestamp: string }[];
    version: number;
    wallets: WalletAccount[];
    walletTxs: WalletTx[];
}

const MEMORY_KEY = 'grail_memory';
// --- NULL-LINE TWISTOR CACHE (Minkowski Spacetime Embedding) ---
// Enforces fundamental Null-Line rule: k·k = 0 (t^2 - x^2 - y^2 - z^2 = 0)
const MINKOWSKI_DIM = 4; // [t, x, y, z]

export const nullLineEncode = (text: string): number[] => {
    const vec = new Array(MINKOWSKI_DIM - 1).fill(0); // [x, y, z] spatial components
    const normalized = text.toLowerCase();

    // 1. Map string into spatial vector directions (x, y, z)
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i);
        vec[0] += Math.sin(char * i) * 1.5; // x
        vec[1] += Math.cos(char * i * 3) * 1.5; // y
        vec[2] += Math.sin(char * i * 5) * 1.5; // z
    }

    // 2. Compute Euclidean norm of spatial vector: r = sqrt(x^2 + y^2 + z^2)
    const r = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]) || 1;

    // 3. To satisfy k·k = 0, time component t must equal spatial radius r
    // Thus creating a light-like (null) vector on the future light cone
    return [r, vec[0], vec[1], vec[2]];
};

// Compute similarity using the Lorentzian Inner Product
export const lorentzianSim = (a: number[], b: number[]): number => {
    // Lorentzian inner product defined as n(a,b) = a_t*b_t - a_x*b_x - a_y*b_y - a_z*b_z
    // However, for semantic ranking, we map spatial angles (cosine similarity on the 3D unit sphere)
    // Because all null vectors project onto the Riemann sphere (S2)
    const dotSpace = (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]);
    const magA = Math.sqrt(a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
    const magB = Math.sqrt(b[1] * b[1] + b[2] * b[2] + b[3] * b[3]);
    return magA && magB ? dotSpace / (magA * magB) : 0;
};

// --- MEMORY STORE ---

export const loadMemory = (): GrailMemory => {
    try {
        const saved = localStorage.getItem(MEMORY_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) as GrailMemory & {
                wallets?: WalletAccount[];
                walletTxs?: WalletTx[];
            };
            return {
                ...parsed,
                wallets: parsed.wallets || [],
                walletTxs: parsed.walletTxs || [],
            };
        }
    } catch (_) { }
    return {
        entries: [],
        projects: [],
        agents: [
            { name: 'Emissary', role: 'Primary interface & task orchestration', lastActive: new Date().toISOString(), tasksCompleted: 0 },
            { name: 'Memento', role: 'Memory guardian & semantic retrieval', lastActive: new Date().toISOString(), tasksCompleted: 0 },
            { name: 'DrDebug', role: 'Code analysis, debugging, refactoring', lastActive: new Date().toISOString(), tasksCompleted: 0 },
            { name: 'GrailCrawler', role: 'Web intelligence & live data extraction', lastActive: new Date().toISOString(), tasksCompleted: 0 },
            { name: 'NullKernel', role: 'Null-Line math research & computation', lastActive: new Date().toISOString(), tasksCompleted: 0 },
        ],
        crawlCache: [],
        version: 1,
        wallets: [],
        walletTxs: [],
    };
};

export const saveMemory = (mem: GrailMemory): void => {
    try {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(mem));
    } catch (_) { }
};

export const addMemoryEntry = (
    mem: GrailMemory,
    type: MemoryEntry['type'],
    content: string,
    tags: string[] = []
): GrailMemory => {
    const entry: MemoryEntry = {
        id: Math.random().toString(36).slice(2),
        timestamp: new Date().toISOString(),
        type,
        content: content.slice(0, 2000),
        tags,
        vector: nullLineEncode(content),
        quality: 0.5,
    };
    const entries = [...mem.entries, entry].slice(-500); // keep last 500
    return { ...mem, entries };
};

// Memento: semantic search
export const semanticSearch = (mem: GrailMemory, query: string, topK = 5): MemoryEntry[] => {
    const qv = nullLineEncode(query);
    return [...mem.entries]
        .map(e => ({ entry: e, score: e.vector ? lorentzianSim(qv, e.vector) : 0 }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .filter(r => r.score > 0.01)
        .map(r => r.entry);
};

// Format memory context for agent prompt
export const buildMemoryContext = (mem: GrailMemory, query: string): string => {
    const relevant = semanticSearch(mem, query, 5);
    if (!relevant.length) return '[MEMENTO: No relevant memories found]';
    return `[MEMENTO CONTEXT — ${relevant.length} relevant memories]\n` +
        relevant.map((e, i) =>
            `${i + 1}. [${e.type}|${e.timestamp.slice(0, 10)}] ${e.content.slice(0, 200)}`
        ).join('\n');
};

// GrailCrawler: fetch a URL and return text
export const grailCrawl = async (url: string): Promise<string> => {
    try {
        const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        const text = (d.contents as string || '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 3000);
        return text || '[CRAWL: empty response]';
    } catch (e: any) {
        return `[CRAWL ERROR: ${e.message}]`;
    }
};

// Quality evaluator (simple heuristic)
export const evaluateQuality = (content: string): number => {
    let score = 0.3;
    if (content.length > 200) score += 0.2;
    if (/fn |impl |struct |pub |use |mod /.test(content)) score += 0.2;  // Rust code
    if (/ζ|null.line|RH|k·k|H_null|twistor|ADE/i.test(content)) score += 0.2; // Math
    if (!/error|failed|not found|undefined/i.test(content)) score += 0.1;
    return Math.min(score, 1.0);
};

// --- Crypto wallet (symbolic Null-Line currency) ---

const TOKEN_SYMBOL = 'NOLL';

const withWalletDefaults = (mem: GrailMemory): GrailMemory => ({
    ...mem,
    wallets: mem.wallets || [],
    walletTxs: mem.walletTxs || [],
});

export const ensureDefaultWallet = (mem: GrailMemory): GrailMemory => {
    const base = withWalletDefaults(mem);
    if (base.wallets.length) return base;
    const now = new Date().toISOString();
    const root: WalletAccount = {
        id: Math.random().toString(36).slice(2),
        name: 'Root',
        address: `NULL-ROOT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        balance: 0,
        createdAt: now,
    };
    return { ...base, wallets: [root] };
};

export const createWallet = (mem: GrailMemory, name: string): { mem: GrailMemory; wallet: WalletAccount } => {
    const base = ensureDefaultWallet(mem);
    const now = new Date().toISOString();
    const wallet: WalletAccount = {
        id: Math.random().toString(36).slice(2),
        name: name || `Wallet-${base.wallets.length + 1}`,
        address: `NULL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        balance: 0,
        createdAt: now,
    };
    const wallets = [...base.wallets, wallet];
    return { mem: { ...base, wallets }, wallet };
};

const findWalletIndex = (wallets: WalletAccount[], key: string | null): number => {
    if (!wallets.length) return -1;
    if (!key) return 0;
    return wallets.findIndex(
        w => w.id === key || w.name === key || w.address === key,
    );
};

export const mintToWallet = (
    mem: GrailMemory,
    targetKey: string | null,
    amount: number,
    memo?: string,
    kind: WalletTxKind = 'MINT',
): GrailMemory => {
    if (!Number.isFinite(amount) || amount <= 0) return mem;
    const base = ensureDefaultWallet(withWalletDefaults(mem));
    const wallets = [...base.wallets];
    const idx = findWalletIndex(wallets, targetKey);
    if (idx < 0) return base;
    const target = wallets[idx];
    const updated: WalletAccount = { ...target, balance: (target.balance || 0) + amount };
    wallets[idx] = updated;
    const tx: WalletTx = {
        id: Math.random().toString(36).slice(2),
        from: null,
        to: updated.address,
        amount,
        timestamp: new Date().toISOString(),
        memo,
        kind,
    };
    const walletTxs = [...(base.walletTxs || []), tx].slice(-500);
    return { ...base, wallets, walletTxs };
};

export const transferWallet = (
    mem: GrailMemory,
    fromKey: string,
    toKey: string,
    amount: number,
    memo?: string,
): GrailMemory => {
    if (!Number.isFinite(amount) || amount <= 0) return mem;
    const base = ensureDefaultWallet(withWalletDefaults(mem));
    const wallets = [...base.wallets];
    const fromIdx = findWalletIndex(wallets, fromKey);
    const toIdx = findWalletIndex(wallets, toKey);
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return base;
    const from = wallets[fromIdx];
    const to = wallets[toIdx];
    if ((from.balance || 0) < amount) return base;
    wallets[fromIdx] = { ...from, balance: (from.balance || 0) - amount };
    wallets[toIdx] = { ...to, balance: (to.balance || 0) + amount };
    const tx: WalletTx = {
        id: Math.random().toString(36).slice(2),
        from: from.address,
        to: to.address,
        amount,
        timestamp: new Date().toISOString(),
        memo,
        kind: 'TRANSFER',
    };
    const walletTxs = [...(base.walletTxs || []), tx].slice(-500);
    return { ...base, wallets, walletTxs };
};

export const formatWalletSummary = (mem: GrailMemory): string => {
    const base = ensureDefaultWallet(withWalletDefaults(mem));
    const wallets = base.wallets;
    if (!wallets.length) return '[Wallet] No accounts. Use "wallet-new <name>" to create one.';
    const total = wallets.reduce((s, w) => s + (w.balance || 0), 0);
    const header = `[Wallet — ${wallets.length} account${wallets.length === 1 ? '' : 's'}, total ${total.toFixed(4)} ${TOKEN_SYMBOL}]\n`;
    const lines = wallets.map(
        w => `- ${w.name}  ${w.address}  balance:${(w.balance || 0).toFixed(4)} ${TOKEN_SYMBOL}`,
    ).join('\n');
    return header + lines;
};

export const formatWalletHistory = (mem: GrailMemory, limit = 10): string => {
    const base = withWalletDefaults(mem);
    const txs = base.walletTxs || [];
    if (!txs.length) return '[Wallet] No transactions yet.';
    const last = txs.slice(-limit);
    const header = `[Wallet History — last ${last.length}]\n`;
    const lines = last.map(t => {
        const dir = t.from ? (t.kind === 'TRANSFER' ? 'XFER' : t.kind) : t.kind;
        return `${t.timestamp.slice(0, 19)}  [${dir}]  ${t.amount.toFixed(4)} ${TOKEN_SYMBOL}  ${t.from || '∅'} → ${t.to}${t.memo ? `  "${t.memo.slice(0, 60)}"` : ''}`;
    }).join('\n');
    return header + lines;
};

// Format agent roster
export const formatAgents = (mem: GrailMemory): string => {
    return mem.agents.map(a =>
        `  ${a.name.padEnd(14)} ${a.role.padEnd(42)} tasks:${a.tasksCompleted}`
    ).join('\n');
};

// Update agent stats
export const agentTaskDone = (mem: GrailMemory, agentName: string): GrailMemory => ({
    ...mem,
    agents: mem.agents.map(a =>
        a.name === agentName
            ? { ...a, lastActive: new Date().toISOString(), tasksCompleted: a.tasksCompleted + 1 }
            : a
    )
});
