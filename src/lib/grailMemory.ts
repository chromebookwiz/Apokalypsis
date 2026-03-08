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

export interface GrailMemory {
    entries: MemoryEntry[];
    projects: { id: string; name: string; code: string; url?: string; quality: number }[];
    agents: { name: string; role: string; lastActive: string; tasksCompleted: number }[];
    crawlCache: { url: string; content: string; timestamp: string }[];
    version: number;
}

const MEMORY_KEY = 'grail_memory';
// --- VECTOR CACHE (TF-IDF over simple term space) ---

const VOCAB = [
    'null', 'line', 'zeta', 'riemann', 'hypothesis', 'prime', 'zeros', 'critical',
    'trinity', 'triangle', 'square', 'circle', 'kernel', 'operator', 'hilbert',
    'polya', 'twistor', 'ade', 'classification', 'rust', 'cargo', 'agent', 'memory',
    'install', 'script', 'web', 'crawl', 'debug', 'code', 'function', 'error',
    'research', 'math', 'compute', 'spectrum', 'eigenvalue', 'selfadjoint', 'wave',
    'observer', 'light', 'photon', 'spacetime', 'minkowski', 'lorentz', 'clifford',
    'complex', 'analysis', 'fourier', 'series', 'convergence', 'proof', 'theorem',
    'conjecture', 'invariant', 'symmetry', 'group', 'algebra', 'geometry', 'topology',
    'deploy', 'netlify', 'api', 'fetch', 'http', 'curl', 'git', 'build', 'test'
];

export const textToVector = (text: string): number[] => {
    const words = text.toLowerCase().split(/\W+/);
    const tf: Record<string, number> = {};
    words.forEach(w => { tf[w] = (tf[w] || 0) + 1; });
    return VOCAB.map(term => (tf[term] || 0) / (words.length || 1));
};

export const cosineSim = (a: number[], b: number[]): number => {
    const dot = a.reduce((s, x, i) => s + x * (b[i] || 0), 0);
    const na = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
    const nb = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
    return na && nb ? dot / (na * nb) : 0;
};

// --- MEMORY STORE ---

export const loadMemory = (): GrailMemory => {
    try {
        const saved = localStorage.getItem(MEMORY_KEY);
        if (saved) return JSON.parse(saved);
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
        vector: textToVector(content),
        quality: 0.5,
    };
    const entries = [...mem.entries, entry].slice(-500); // keep last 500
    return { ...mem, entries };
};

// Memento: semantic search
export const semanticSearch = (mem: GrailMemory, query: string, topK = 5): MemoryEntry[] => {
    const qv = textToVector(query);
    return [...mem.entries]
        .map(e => ({ entry: e, score: e.vector ? cosineSim(qv, e.vector) : 0 }))
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
