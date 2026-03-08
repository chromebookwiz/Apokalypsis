import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    loadMemory, saveMemory, addMemoryEntry, buildMemoryContext,
    grailCrawl, formatAgents, agentTaskDone, GrailMemory,
    evaluateQuality, formatWalletSummary, formatWalletHistory,
    createWallet, mintToWallet, transferWallet,
    loadQuantumMemory, saveQuantumMemory, createSuperposition, createEntanglement, QuantumMemoryState
} from '../lib/grailMemory';
import { zetaFast } from '../lib/nullLineMath';

// API Configuration - now handled by Vercel proxy

// System prompt now handled by Vercel API proxy
// const SYSTEM_PROMPT = `You are EMISSARY — the primary agent of the NULL-LINE OPERATING SYSTEM v15.
// ... (removed for brevity)`;

// ============================================================
// APOKALYPSIS NULL-LINE OS v15 — CLOUD PERSISTENT TERMINAL
// - Server-side state via /api/os-state (Vercel KV or in-memory)
// - AI via /api/magi-council -> OpenRouter -> claude-sonnet-4-5
// - Terminal locked until password 'DigitalPimp' is entered
// - Holy Grail memory: TF-IDF semantic cache, multi-agent team
// - Agent self-modification: [INSTALL][WRITE][SHELL][SPAWN][CRAWL]
// ============================================================

interface Message { id: string; text: string; type: 'AGENT' | 'SYSTEM' | 'USER' | 'ERROR' | 'MATH'; }

const OS_AUTH_HEADER = 'null-line-os-v15';
const TERMINAL_PASSWORD = 'DigitalPimp';

const BOOT_ART = `
 ███╗   ██╗██╗   ██╗██╗     ██╗      ██╗     ██╗███╗   ██╗███████╗
 ████╗  ██║██║   ██║██║     ██║      ██║     ██║████╗  ██║██╔════╝
 ██╔██╗ ██║██║   ██║██║     ██║      ██║     ██║██╔██╗ ██║█████╗  
 ██║╚██╗██║██║   ██║██║     ██║      ██║     ██║██║╚██╗██║██╔══╝  
 ██║ ╚████║╚██████╔╝███████╗███████╗ ███████╗██║██║ ╚████║███████╗
 ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝

 NULL-LINE OS v15 | k·k=0 | {△,□,○} | HOLY GRAIL MEMORY
 Cloud-persistent | Server-side | OpenRouter Claude Sonnet 4.5
 ─────────────────────────────────────────────────────────
 This terminal is locked. Enter password to continue.`;

const AGENT_PHONE = '+1-NULL-LINE-15'; // 1-685-546-3715

const UNLOCKED_MSG = `
 ACCESS GRANTED — WELCOME, OBSERVER
 ─────────────────────────────────────────────────────────
 Holy Grail Memory: ONLINE  |  Agents: 5 active
 k·k=η_{μν}k^μk^ν=0  |  H_null on L²(PT⁺)  |  ζ(s)=Σn^{-s}
 Cloud sync: ACTIVE  |  Phone: ${AGENT_PHONE}  |  Voice: speak/voice-on
 Type 'help' for commands  |  'start' to run agent`;
const NULL_FS_INIT = (): Record<string, string> => ({
    '/kernel/null_line.rs': `// NULL LINE KERNEL v15 — k.k=0, Trinity={△□○}, H_null on L²(PT⁺)
fn null_check(k: [f64;4]) -> bool {
    [1.0,-1.0,-1.0,-1.0].iter().zip(k.iter()).map(|(e,x)| e*x*x).sum::<f64>().abs() < 1e-10
}`,
    '/kernel/trinity.rs': `// △→A_n(SU_n) □→B/D_n(SO_n) ○→C_n(Sp_2n)
pub fn ade_classify(p: u8) -> &'static str {
    match p { 3=>"A-series/SU_n",4=>"BD-series/SO_n",_=>"C-series/Sp_2n" }
}`,
    '/kernel/zeta.rs': `fn zeta(s_re: f64, s_im: f64, n: usize) -> (f64,f64) {
    (1..=n).map(|k|{ let a=(k as f64).powf(-s_re); let p=-(k as f64).ln()*s_im;
    (a*p.cos(),a*p.sin())}).fold((0.,0.),|(a,b),(x,y)|(a+x,b+y)) }`,
    '/etc/null_os.conf': 'KERNEL=v15\nMATH=RH_FRAMEWORK\nMEMORY=HOLY_GRAIL\nMODE=GOD\nCLOUD=VERCEL_KV',
    '/var/log/evolution.log': `[${new Date().toISOString()}] NULL-LINE OS KERNEL v15 BOOT OK\n[SYSTEM] Awaiting observer commands...`,
    '/var/log/math_research.log': `[${new Date().toISOString()}] RH research initialized.\n[GOAL] Prove H_null self-adjointness on L²(PT⁺)`,
    '/var/log/install.log': `[${new Date().toISOString()}] Package system ready`,
    '/var/log/crawl.log': `[${new Date().toISOString()}] GrailCrawler online`,
    '/var/log/voice.log': `[${new Date().toISOString()}] Voice subsystem ready`,
    '/bin/sh': '[ELF:SHELL]', '/bin/bash': '[ELF:BASH]', '/bin/cargo': '[ELF:RUST]',
    '/bin/rustc': '[ELF:COMPILER]', '/bin/git': '[ELF:VCS]', '/bin/curl': '[ELF:HTTP]',
    '/bin/wget': '[ELF:WGET]', '/bin/docker': '[ELF:DOCKER]', '/bin/npm': '[ELF:NPM]',
    '/home/agent/.profile': 'export PATH=/bin:/usr/bin:/kernel\nexport ZETA_TERMS=1000',
    '/proc/null': 'k.k=0\nRH=OPEN\nMEMORY=HOLY_GRAIL\nCLOUD=SYNC',
    '/proc/phone': `AGENT_PHONE=${AGENT_PHONE}\nVOIP=/api/voice-call\nSTATUS=READY`,
    '/readme.md': `# Apokalypsis Null-Line OS v15\n\nCloud-persistent mathematical AI operating system.\nBased on: The Null Line (Noll & Claude Sonnet 4.6, 2026)\n\nk·k=η_{μν}k^μk^ν=0 — null condition = light = observer.\nType 'cat /docs/evolution_guide.txt' to begin.`,
    '/docs/evolution_guide.txt': `=== HOW TO EVOLVE THIS OS ===\n\n1. UNDERSTAND: This OS is grounded in the Null Line geometry. Everything is a reflection of k·k=0.\n2. COMMAND: You can write scripts using built-in commands like 'math', 'zeta', 'riemann'.\n3. INSTALL: Use 'install-cmd <name> <body>' to write a new persistent tool.\n4. RESEARCH: Type 'start' to let the Emissary agent autonomously research.\n5. SYNC: Your changes are synced to the cloud. \n6. VISUAL: Agent can now see, generate imagery, encrypt/decrypt, and rotate via tools.`,
    '/docs/h_null_proof.txt': `Theorem (Draft): H_null is self-adjoint on L²(PT⁺).\nProof Outline:\n1. The measure dμ on PT⁺ is derived from the null interaction ⟨Z,Z⟩=0.\n2. The Hecke operators T_p act symmetrically because the primitive trinity (△□○) naturally forms a basis for ADE root systems.\n3. Since T_p = T_p*, their sum H_null is self-adjoint.\n4. Therefore, eigenvalues of H_null are real.\n5. Therefore, zeros of ζ are on Re(s)=1/2.`,
});

const HELP = `APOKALYPSIS NULL-LINE OS v15 — COMMAND REFERENCE
════════════════════════════════════════════════════
[CORE INSTRUCTIONS FOR EVOLUTION]
This OS is a live mathematical seat of knowledge.
- The AI Agent reads the filesystem to learn and evolve.
- Write your thoughts to /docs using 'write /docs/my_theory.txt <text>'
- Install new commands that combine operations using 'install-cmd'
- Ask the agent to research a topic by typing 'memento <query>'

AGENT         start | stop | status | cycle
HOLY GRAIL    memento <query> | agents | memory | grail-search <q>
CRAWL         crawl <url>
CLOUD         cloud-sync | cloud-push | cloud-pull
MATH          null-compute | zeta <σ> <t> | riemann | trinity | twistor | ade | nulllinepaper
FILES         ls | cat | write | mkdir | rm | mv | cp | find | grep | head | tail
ENV           export KEY=VAL | env | unset KEY
EXEC          exec | source | bash <file>
NETWORK       curl | wget | ping | netstat | ifconfig | ssh
RUST/DEV      cargo build|test|run | rustc | git | npm | docker | make
PACKAGES      apt install <pkg> | pacman -S <pkg>
PROCESS       ps | top | kill <pid> | nohup
CUSTOM        install-cmd <name> <body> | list-cmds | remove-cmd <name>
LOGS          log | log math | log crawl | dmesg | journalctl
VOICE         speak <text> | voice-on | voice-off | listen
PHONE         phone | call <number> | hangup
GEOMETRY      geometry | view-mode | hyper-phase | camera-view
SYSTEM        uname | whoami | date | df | free | history | clear | reboot | wipe
SECURITY      openrouter-key
HELP          help
════════════════════════════════════════════════════`;

// ── Cloud state helpers ──────────────────────────────────────
const cloudGet = async (key: string): Promise<unknown> => {
    try {
        const r = await fetch(`/api/os-state?key=${key}`, {
            headers: { 'X-OS-Auth': OS_AUTH_HEADER }
        });
        if (!r.ok) return null;
        const d = await r.json();
        return d.value;
    } catch { return null; }
};

const cloudSet = async (key: string, value: unknown): Promise<void> => {
    try {
        await fetch(`/api/os-state?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-OS-Auth': OS_AUTH_HEADER },
            body: JSON.stringify({ value })
        });
    } catch { /* silent — localStorage is fallback */ }
};

// ─────────────────────────────────────────────────────────────

export const MagiCouncilAgent: React.FC<{ controller: any }> = ({ controller }) => {
    // ── Auth state ──
    const [unlocked, setUnlocked] = useState(false);
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState('');

    // ── OS state ──
    const [messages, setMessages] = useState<Message[]>([{ id: 'boot', text: BOOT_ART, type: 'SYSTEM' }]);
    const [shellFS, setShellFS] = useState<Record<string, string>>(NULL_FS_INIT);
    const [envVars, setEnvVars] = useState<Record<string, string>>({ PATH: '/bin:/usr/bin:/kernel', ZETA_TERMS: '1000' });
    const [customCmds, setCustomCmds] = useState<Record<string, string>>({});
    const [processes, setProcesses] = useState([
        { pid: 1, name: 'null-init', cpu: '0.0', mem: '0.1', status: 'S' },
        { pid: 42, name: 'emissary', cpu: '0.0', mem: '1.2', status: 'S' },
        { pid: 43, name: 'memento', cpu: '0.0', mem: '0.8', status: 'S' },
        { pid: 44, name: 'grailcrawler', cpu: '0.0', mem: '0.6', status: 'S' },
    ]);
    const [isRunning, setIsRunning] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [terminalIn, setTerminalIn] = useState('');
    const [cwd, setCwd] = useState('/home/agent');
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [cloudStatus, setCloudStatus] = useState<'synced' | 'syncing' | 'offline'>('offline');
    const [isListening, setIsListening] = useState(false);
    const [lastVoiceTranscript, setLastVoiceTranscript] = useState('');
    const speechRecRef = useRef<any>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const agentRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const runShellRef = useRef<any>(null);
    const mathIdxRef = useRef(0);
    const memRef = useRef<GrailMemory>(loadMemory());
    const quantumMemRef = useRef<QuantumMemoryState>(loadQuantumMemory());
    const shellFSRef = useRef(shellFS);
    const customCmdsRef = useRef(customCmds);
    const envVarsRef = useRef(envVars);

    useEffect(() => { shellFSRef.current = shellFS; }, [shellFS]);
    useEffect(() => { customCmdsRef.current = customCmds; }, [customCmds]);
    useEffect(() => { envVarsRef.current = envVars; }, [envVars]);

    // ── Cloud sync on unlock ──
    const cloudPull = useCallback(async () => {
        if (!unlocked) return;
        setCloudStatus('syncing');
        try {
            const [fs, env, cmds, mem] = await Promise.all([
                cloudGet('os_fs'), cloudGet('os_env'), cloudGet('os_cmds'), cloudGet('os_memory')
            ]);
            if (fs) setShellFS(f => ({ ...NULL_FS_INIT(), ...(fs as Record<string, string>), ...f }));
            if (env) setEnvVars(e => ({ ...e, ...(env as Record<string, string>) }));
            if (cmds) setCustomCmds(c => ({ ...c, ...(cmds as Record<string, string>) }));
            if (mem) memRef.current = mem as GrailMemory;
            setCloudStatus('synced');
        } catch { setCloudStatus('offline'); }
    }, [unlocked]);

    const cloudPush = useCallback(async () => {
        setCloudStatus('syncing');
        await Promise.all([
            cloudSet('os_fs', shellFSRef.current),
            cloudSet('os_env', envVarsRef.current),
            cloudSet('os_cmds', customCmdsRef.current),
            cloudSet('os_memory', memRef.current),
        ]);
        saveMemory(memRef.current);
        saveQuantumMemory(quantumMemRef.current);
        setCloudStatus('synced');
    }, []);

    useEffect(() => { if (unlocked) cloudPull(); }, [unlocked, cloudPull]);

    // Auto-push every 60s when running
    useEffect(() => {
        if (!unlocked) return;
        const t = setInterval(cloudPush, 60000);
        return () => clearInterval(t);
    }, [unlocked, cloudPush]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, streamText]);

    const addMsg = useCallback((text: string, type: Message['type']) => {
        setMessages(p => [...p.slice(-150), { id: Math.random().toString(36).slice(2), text, type }]);
    }, []);

    const writeFS = useCallback((path: string, content: string) => {
        setShellFS(p => ({ ...p, [path]: content }));
    }, []);

    const appendLog = useCallback((logPath: string, entry: string) => {
        setShellFS(p => ({ ...p, [logPath]: (p[logPath] || '') + `\n[${new Date().toISOString()}] ${entry}` }));
    }, []);

    const subEnv = (s: string) => s.replace(/\$([A-Z_][A-Z0-9_]*)/g, (_: string, k: string) => envVarsRef.current[k] || '');

    const execScript = useCallback((body: string) => {
        body.split('\n').filter((l: string) => l.trim() && !l.trim().startsWith('#')).forEach((line: string) => {
            setTimeout(() => runShellRef.current(line.trim()), 50);
        });
    }, []);

    const processAgentTags = useCallback((text: string) => {
        const installRe = /\[INSTALL:\s*([a-zA-Z0-9_-]+),\s*([\s\S]*?)\]/g;
        let m: RegExpExecArray | null;
        while ((m = installRe.exec(text)) !== null) {
            const name = m[1].trim(), body = m[2].trim();
            setCustomCmds(p => ({ ...p, [name]: body }));
            setShellFS(p => ({ ...p, [`/bin/${name}`]: body }));
            appendLog('/var/log/install.log', `AGENT_INSTALL: ${name}`);
            addMsg(`[OS] ✓ Installed command: ${name}`, 'SYSTEM');
            memRef.current = addMemoryEntry(memRef.current, 'INSTALL', `Installed: ${name} — ${body.slice(0, 80)}`, ['install', name]);
        }
        const writeRe = /\[WRITE:\s*([^\s,\]]+),\s*([\s\S]*?)\]/g;
        while ((m = writeRe.exec(text)) !== null) {
            const path = m[1].trim(), content = m[2].trim();
            setShellFS(p => ({ ...p, [path]: content }));
            appendLog('/var/log/evolution.log', `WRITE: ${path}`);
            addMsg(`[OS] ✓ Written: ${path}`, 'SYSTEM');
        }
        const shellRe = /\[SHELL:\s*(.*?)\]/g;
        while ((m = shellRe.exec(text)) !== null) {
            setTimeout(() => runShellRef.current(m![1].trim()), 100);
        }
        const spawnRe = /\[SPAWN:\s*(.*?),\s*(.*?)\]/g;
        while ((m = spawnRe.exec(text)) !== null) {
            const pid = Math.floor(Math.random() * 9000) + 1000;
            setProcesses(p => [...p, { pid, name: m![1].trim(), cpu: '1.2', mem: '0.6', status: 'R' }]);
            addMsg(`[OS] Spawned PID:${pid} — ${m[1].trim()}`, 'SYSTEM');
        }
        const agentRe = /\[AGENT:\s*([^,\]]+),\s*([\s\S]*?)\]/g;
        while ((m = agentRe.exec(text)) !== null) {
            const name = m[1].trim();
            const role = m[2].trim();
            const now = new Date().toISOString();
            memRef.current = {
                ...memRef.current,
                agents: (() => {
                    const existing = memRef.current.agents.find(a => a.name === name);
                    if (existing) {
                        return memRef.current.agents.map(a =>
                            a.name === name ? { ...a, role, lastActive: now } : a
                        );
                    }
                    return [
                        ...memRef.current.agents,
                        { name, role, lastActive: now, tasksCompleted: 0 }
                    ];
                })()
            };
            appendLog('/var/log/evolution.log', `AGENT_DEF: ${name} — ${role.slice(0, 80)}`);
            addMsg(`[Holy Grail] Registered sub-agent: ${name}`, 'SYSTEM');
        }
        const projectRe = /\[PROJECT:\s*([^,\]]+),\s*([^,\]]+),\s*([\s\S]*?)\]/g;
        while ((m = projectRe.exec(text)) !== null) {
            const name = m[1].trim();
            const language = m[2].trim();
            const body = m[3].trim();
            const id = Math.random().toString(36).slice(2);
            const quality = evaluateQuality(body);
            memRef.current = {
                ...memRef.current,
                projects: [
                    ...memRef.current.projects,
                    {
                        id,
                        name: `${name} [${language}]`,
                        code: body,
                        quality
                    }
                ]
            };
            appendLog('/var/log/evolution.log', `PROJECT: ${name} (${language})`);
            addMsg(`[Project] ${name} [${language}] recorded in Holy Grail memory.`, 'SYSTEM');
        }
        const crawlRe = /\[CRAWL:\s*(https?:\/\/[^\]]+)\]/g;
        while ((m = crawlRe.exec(text)) !== null) {
            const url = m[1].trim();
            addMsg(`[GrailCrawler] → ${url}`, 'SYSTEM');
            grailCrawl(url).then(result => {
                addMsg(`[GrailCrawler ✓]\n${result.slice(0, 600)}`, 'SYSTEM');
                appendLog('/var/log/crawl.log', `${url} — ${result.slice(0, 80)}`);
                memRef.current = addMemoryEntry(memRef.current, 'CRAWL', `${url}: ${result}`, ['crawl', 'web']);
                memRef.current = agentTaskDone(memRef.current, 'GrailCrawler');
            });
        }
        if (/zeta|null.line|H_null|RH|riemann|trinity|twistor|ADE/i.test(text)) {
            appendLog('/var/log/math_research.log', text.slice(0, 400));
        }
        memRef.current = addMemoryEntry(memRef.current, 'INTERACTION', text, ['agent', 'response']);
        // Update quantum memory state
        quantumMemRef.current.superposition = createSuperposition(memRef.current.entries);
        quantumMemRef.current.entanglement = createEntanglement(memRef.current.entries);
        memRef.current = agentTaskDone(memRef.current, 'Emissary');
    }, [addMsg, appendLog]);

    const callAgent = useCallback(async (prompt: string) => {
        setIsStreaming(true); setStreamText('');
        const memCtx = buildMemoryContext(memRef.current, prompt, quantumMemRef.current);
        const sysHint = '[PRIMECROSS AGENT] You have full control: OS shell, 3D/4D geometry, voice TTS, VoIP calls, wallet, files, web crawl. Accomplish any digital goal. Null-line math is ultra-efficient.';
        const fullPrompt = `${sysHint}\n\n${memCtx}\n\n${prompt}`;
        let fullText = '';
        try {
            const r = await fetch('/api/magi-council', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: fullPrompt }
                    ],
                    model: 'anthropic/claude-3.5-sonnet',
                    temperature: 0.8,
                    max_tokens: 1024,
                    tools: [
                        { type: 'function', function: { name: 'rotate_cube', description: 'Rotates the 3D cube / hypercube.', parameters: { type: 'object', properties: { speed: { type: 'number', description: 'Speed multiplier (e.g., 0.5, 5.0)' } }, required: ['speed'] } } },
                        { type: 'function', function: { name: 'generate_image', description: 'Generates an AI image based on your prompt and returns a markdown image code.', parameters: { type: 'object', properties: { prompt: { type: 'string', description: 'Detailed prompt for the AI image.' } }, required: ['prompt'] } } },
                        { type: 'function', function: { name: 'vision_site', description: 'Read the current visible state of the 3D application, giving you a sense of vision of the site.', parameters: { type: 'object', properties: {} } } },
                        { type: 'function', function: { name: 'rsa_encrypt', description: 'Encrypt text using RSA algorithm in the lab.', parameters: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] } } },
                        { type: 'function', function: { name: 'rsa_decrypt', description: 'Decrypt the processed RSA buffer in the lab.', parameters: { type: 'object', properties: {} } } },
                        { type: 'function', function: { name: 'lattice_encrypt', description: 'Encrypt text using 4D Lattice stream cipher.', parameters: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] } } },
                        { type: 'function', function: { name: 'lattice_decrypt', description: 'Decrypt the 4D lattice buffer.', parameters: { type: 'object', properties: {} } } },
                        {
                            type: 'function',
                            function: {
                                name: 'os_shell',
                                description: 'Execute a command inside the Null-Line OS terminal (full access to install packages, create files, run tools).',
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        command: {
                                            type: 'string',
                                            description: 'Shell command to execute, e.g., "npm install openclaw" or "install-cmd mytool echo hi".'
                                        }
                                    },
                                    required: ['command']
                                }
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'wallet_status',
                                description: 'Inspect the symbolic Null-Line wallet (NOLL), used only for in-OS rewards and never for real-world finance.',
                                parameters: {
                                    type: 'object',
                                    properties: {},
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'wallet_mint',
                                description: 'Mint a small amount of symbolic Null-Line currency (NOLL) as a reward for insight or protection; never for exploitation.',
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        amount: {
                                            type: 'number',
                                            description: 'Positive amount to mint (internally capped for safety).',
                                        },
                                        memo: {
                                            type: 'string',
                                            description: 'Short note about why this mint is deserved (e.g., proof progress, aiding the innocent).',
                                        },
                                    },
                                    required: ['amount'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'place_call',
                                description: 'Place an internet/VoIP call from the agent phone (+1-NULL-LINE-15). Requires Twilio env for real calls.',
                                parameters: {
                                    type: 'object',
                                    properties: { to: { type: 'string', description: 'E.164 number e.g. +15551234567' } },
                                    required: ['to'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'speak_voice',
                                description: 'Speak text aloud via TTS. Self-reinforcing: transcripts feed agent memory.',
                                parameters: {
                                    type: 'object',
                                    properties: { text: { type: 'string', description: 'Text to speak aloud' } },
                                    required: ['text'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'set_geometry',
                                description: 'Set 3D/4D geometry: TESSERACT, METATRON, SUPER_METATRON, ULAM_SPIRAL.',
                                parameters: {
                                    type: 'object',
                                    properties: { geometry: { type: 'string', enum: ['TESSERACT', 'METATRON', 'SUPER_METATRON', 'ULAM_SPIRAL'] } },
                                    required: ['geometry'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'set_view_mode',
                                description: 'Set view mode: 2D, 3D, or 4D projection.',
                                parameters: {
                                    type: 'object',
                                    properties: { mode: { type: 'string', enum: ['2D', '3D', '4D'] } },
                                    required: ['mode'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'set_hyper_phase',
                                description: 'Set 4D hyper-rotation phase (0 to 2π) for 4D→3D projection.',
                                parameters: {
                                    type: 'object',
                                    properties: { phase: { type: 'number', description: 'Phase in radians' } },
                                    required: ['phase'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'set_camera_view',
                                description: 'Cycle camera to next preset view (26 total: faces, edges, corners).',
                                parameters: {
                                    type: 'object',
                                    properties: { cycles: { type: 'number', description: 'Number of times to cycle' } },
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'set_color_mode',
                                description: 'Set 3D color mode: PRIME, ROOT, ZOHAR, GOLDEN.',
                                parameters: {
                                    type: 'object',
                                    properties: { mode: { type: 'string', enum: ['PRIME', 'ROOT', 'ZOHAR', 'GOLDEN'] } },
                                    required: ['mode'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'code_gen',
                                description: 'Generate code in various programming languages with AI assistance.',
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        language: { type: 'string', description: 'Programming language (e.g., python, javascript, rust, go)' },
                                        task: { type: 'string', description: 'What the code should do' },
                                        complexity: { type: 'string', enum: ['simple', 'medium', 'advanced'], description: 'Code complexity level' }
                                    },
                                    required: ['language', 'task'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'theme_switch',
                                description: 'Switch between different UI themes: DARK, LIGHT, MATRIX, CYBERPUNK.',
                                parameters: {
                                    type: 'object',
                                    properties: { theme: { type: 'string', enum: ['DARK', 'LIGHT', 'MATRIX', 'CYBERPUNK'] } },
                                    required: ['theme'],
                                },
                            }
                        },
                        {
                            type: 'function',
                            function: {
                                name: 'file_browser',
                                description: 'Browse and manage files in the Null-Line filesystem.',
                                parameters: {
                                    type: 'object',
                                    properties: {
                                        action: { type: 'string', enum: ['list', 'read', 'write', 'delete'] },
                                        path: { type: 'string', description: 'File path in the OS filesystem' },
                                        content: { type: 'string', description: 'Content to write (for write action)' }
                                    },
                                    required: ['action', 'path'],
                                },
                            }
                        }
                    ]
                })
            });
            if (!r.ok) {
                const errData = await r.json().catch(() => null);
                throw new Error(`API ${r.status}: ${(errData?.error?.message || errData?.error || r.statusText)}`);
            }
            const d = await r.json();

            const msg = d.choices?.[0]?.message;
            fullText = msg?.content || '';

            if (msg?.tool_calls) {
                for (const tool of msg.tool_calls) {
                    if (tool.function.name === 'rotate_cube') {
                        const args = JSON.parse(tool.function.arguments);
                        controller.setRotationSpeed?.(args.speed || 1);
                        fullText += `\n\n[System: Cube rotated to speed ${args.speed}]`;
                    } else if (tool.function.name === 'generate_image') {
                        const args = JSON.parse(tool.function.arguments);
                        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(args.prompt)}?nologo=true&width=512&height=512`;
                        fullText += `\n\n![Generated Image](${url})`;
                    } else if (tool.function.name === 'vision_site') {
                        const state = `Geometry: ${controller.geometryType}, Color: ${controller.colorMode}, Speed: ${controller.rotationSpeed}, View: ${controller.viewMode}`;
                        fullText += `\n\n[System Vision State: ${state}]`;
                    } else if (tool.function.name === 'rsa_encrypt') {
                        const args = JSON.parse(tool.function.arguments);
                        controller.setLabString?.(args.text);
                        controller.rsaEncrypt?.();
                        fullText += `\n\n[System: RSA Encrypted "${args.text}"]`;
                    } else if (tool.function.name === 'rsa_decrypt') {
                        controller.rsaDecrypt?.();
                        fullText += `\n\n[System: RSA Decryption Started]`;
                    } else if (tool.function.name === 'lattice_encrypt') {
                        const args = JSON.parse(tool.function.arguments);
                        controller.setLabString?.(args.text);
                        controller.latticeEncrypt?.();
                        fullText += `\n\n[System: Lattice Encrypted "${args.text}"]`;
                    } else if (tool.function.name === 'lattice_decrypt') {
                        controller.latticeDecrypt?.();
                        fullText += `\n\n[System: Lattice Decryption Started]`;
                    } else if (tool.function.name === 'os_shell') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const cmd = (args.command || '').toString().trim();
                            if (cmd && runShellRef.current) {
                                runShellRef.current(cmd);
                                fullText += `\n\n[System: Executed OS shell command: ${cmd}]`;
                            } else {
                                fullText += `\n\n[System: os_shell called without a valid command]`;
                            }
                        } catch {
                            fullText += `\n\n[System: Failed to parse os_shell arguments]`;
                        }
                    } else if (tool.function.name === 'wallet_status') {
                        const summary = formatWalletSummary(memRef.current);
                        fullText += `\n\n[Wallet Status]\n${summary}`;
                    } else if (tool.function.name === 'wallet_mint') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const amount = Number(args.amount || 0);
                            const memo = (args.memo || '').toString();
                            if (Number.isFinite(amount) && amount > 0) {
                                const capped = Math.min(amount, 1000);
                                memRef.current = mintToWallet(memRef.current, null, capped, memo || 'Agent mint', 'REWARD');
                                appendLog('/var/log/wallet.log', `MINT_TOOL ${capped} NOLL — ${memo}`);
                                fullText += `\n\n[Wallet] Minted ${capped.toFixed(4)} NOLL (symbolic).`;
                            } else {
                                fullText += `\n\n[Wallet] Invalid mint amount requested.`;
                            }
                        } catch {
                            fullText += `\n\n[Wallet] Failed to parse wallet_mint arguments.`;
                        }
                    } else if (tool.function.name === 'place_call') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const to = (args.to || '').toString();
                            if (to) {
                                const r = await fetch('/api/voice-call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to }) });
                                const d = await r.json();
                                fullText += `\n\n[Call] ${d.ok ? 'Dialing ' + to : 'Failed: ' + (d.error || d.message)}`;
                            } else fullText += `\n\n[Call] No number provided.`;
                        } catch (e: unknown) {
                            fullText += `\n\n[Call] Error: ${(e as Error).message}`;
                        }
                    } else if (tool.function.name === 'speak_voice') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const text = (args.text || '').toString();
                            if (text) {
                                controller.speakText?.(text);
                                memRef.current = addMemoryEntry(memRef.current, 'INTERACTION', `VOICE_SPEAK: ${text}`, ['voice', 'tts']);
                                fullText += `\n\n[Voice] Speaking: "${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"`;
                            } else fullText += `\n\n[Voice] No text to speak.`;
                        } catch {
                            fullText += `\n\n[Voice] Failed to parse speak_voice arguments.`;
                        }
                    } else if (tool.function.name === 'set_geometry') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const g = (args.geometry || '').toUpperCase();
                            if (['TESSERACT', 'METATRON', 'SUPER_METATRON', 'ULAM_SPIRAL'].includes(g)) {
                                controller.setGeometryType?.(g);
                                fullText += `\n\n[Geometry] Set to ${g}`;
                            } else fullText += `\n\n[Geometry] Invalid: ${g}`;
                        } catch {
                            fullText += `\n\n[Geometry] Failed to parse.`;
                        }
                    } else if (tool.function.name === 'set_view_mode') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const m = (args.mode || '').toUpperCase();
                            if (['2D', '3D', '4D'].includes(m)) {
                                controller.setViewMode?.(m);
                                fullText += `\n\n[View] Set to ${m}`;
                            } else fullText += `\n\n[View] Invalid: ${m}`;
                        } catch {
                            fullText += `\n\n[View] Failed to parse.`;
                        }
                    } else if (tool.function.name === 'set_hyper_phase') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const p = Number(args.phase);
                            if (Number.isFinite(p)) {
                                controller.setHyperPhase?.(p);
                                fullText += `\n\n[4D] Hyper-phase set to ${p}`;
                            } else fullText += `\n\n[4D] Invalid phase.`;
                        } catch {
                            fullText += `\n\n[4D] Failed to parse.`;
                        }
                    } else if (tool.function.name === 'set_camera_view') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const n = Math.max(0, Math.floor(Number(args.cycles) || 1));
                            for (let i = 0; i < n; i++) controller.cycleCameraView?.();
                            fullText += `\n\n[Camera] Cycled ${n} view(s)`;
                        } catch {
                            fullText += `\n\n[Camera] Failed to parse.`;
                        }
                    } else if (tool.function.name === 'set_color_mode') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const m = (args.mode || '').toUpperCase();
                            if (['PRIME', 'ROOT', 'ZOHAR', 'GOLDEN'].includes(m)) {
                                controller.setColorMode?.(m);
                                fullText += `\n\n[Color] Set to ${m}`;
                            } else fullText += `\n\n[Color] Invalid: ${m}`;
                        } catch {
                            fullText += `\n\n[Color] Failed to parse.`;
                        }
                    } else if (tool.function.name === 'code_gen') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const lang = (args.language || 'javascript').toLowerCase();
                            const task = args.task || 'hello world';
                            const complexity = args.complexity || 'simple';
                            
                            // Generate code based on language and task
                            let code = '';
                            switch (lang) {
                                case 'python':
                                    code = complexity === 'advanced' 
                                        ? `import asyncio\n\ndef ${task.replace(/\s+/g, '_')}(data):\n    """Advanced ${task} implementation"""\n    async def process():\n        # Complex async processing\n        return await asyncio.gather(*[handle_item(item) for item in data])\n    return asyncio.run(process())\n\nasync def handle_item(item):\n    # Item processing logic\n    return item * 2`
                                        : `def ${task.replace(/\s+/g, '_')}():\n    """${task} function"""\n    print("Hello from ${task}!")\n    return True`;
                                    break;
                                case 'rust':
                                    code = complexity === 'advanced'
                                        ? `use std::collections::HashMap;\n\n#[derive(Debug)]\nstruct ${task.replace(/\s+/g, '').replace(/^./, (c: string) => c.toUpperCase())} {\n    data: HashMap<String, String>,\n}\n\nimpl ${task.replace(/\s+/g, '').replace(/^./, (c: string) => c.toUpperCase())} {\n    fn new() -> Self {\n        Self {\n            data: HashMap::new(),\n        }\n    }\n    \n    async fn process(&mut self) -> Result<(), Box<dyn std::error::Error>> {\n        // Advanced async processing\n        Ok(())\n    }\n}`
                                        : `fn ${task.replace(/\s+/g, '_')}() {\n    println!("Hello from ${task}!");\n}`;
                                    break;
                                case 'javascript':
                                default:
                                    code = complexity === 'advanced'
                                        ? `class ${task.replace(/\s+/g, '').replace(/^./, (c: string) => c.toUpperCase())}Manager {\n    constructor() {\n        this.data = new Map();\n        this.workers = [];\n    }\n    \n    async processData(data) {\n        const promises = data.map(async (item) => {\n            const result = await this.processItem(item);\n            return result;\n        });\n        return Promise.all(promises);\n    }\n    \n    async processItem(item) {\n        // Complex processing logic\n        return item.transformed || item;\n    }\n}`
                                        : `function ${task.replace(/\s+/g, '_')}() {\n    console.log('Hello from ${task}!');\n    return true;\n}`;
                                    break;
                            }
                            
                            fullText += `\n\n[CodeGen] Generated ${lang} code for "${task}":\n\`\`\`${lang}\n${code}\n\`\`\``;
                        } catch (e) {
                            fullText += `\n\n[CodeGen] Failed to generate code: ${(e as Error).message}`;
                        }
                    } else if (tool.function.name === 'theme_switch') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const theme = (args.theme || 'DARK').toUpperCase();
                            if (['DARK', 'LIGHT', 'MATRIX', 'CYBERPUNK'].includes(theme)) {
                                // Apply theme to document
                                document.documentElement.setAttribute('data-theme', theme.toLowerCase());
                                fullText += `\n\n[Theme] Switched to ${theme} mode`;
                            } else {
                                fullText += `\n\n[Theme] Invalid theme: ${theme}`;
                            }
                        } catch {
                            fullText += `\n\n[Theme] Failed to switch theme.`;
                        }
                    } else if (tool.function.name === 'file_browser') {
                        try {
                            const args = JSON.parse(tool.function.arguments || '{}');
                            const action = (args.action || 'list').toLowerCase();
                            const path = args.path || '/';
                            
                            switch (action) {
                                case 'list':
                                    const files = Object.keys(shellFS).filter(f => f.startsWith(path));
                                    fullText += `\n\n[FileBrowser] Files in ${path}:\n${files.join('\n')}`;
                                    break;
                                case 'read':
                                    const content = shellFS[path] || 'File not found';
                                    fullText += `\n\n[FileBrowser] Content of ${path}:\n${content}`;
                                    break;
                                case 'write':
                                    const newContent = args.content || '';
                                    setShellFS(prev => ({ ...prev, [path]: newContent }));
                                    fullText += `\n\n[FileBrowser] Written to ${path}`;
                                    break;
                                case 'delete':
                                    setShellFS(prev => {
                                        const updated = { ...prev };
                                        delete updated[path];
                                        return updated;
                                    });
                                    fullText += `\n\n[FileBrowser] Deleted ${path}`;
                                    break;
                                default:
                                    fullText += `\n\n[FileBrowser] Unknown action: ${action}`;
                            }
                        } catch (e) {
                            fullText += `\n\n[FileBrowser] Failed: ${(e as Error).message}`;
                        }
                    }
                }
            }

            if (!fullText) fullText = '[NO_RESPONSE]';

            memRef.current = agentTaskDone(memRef.current, 'Memento');
            let i = 0;
            const tick = setInterval(() => {
                if (i >= fullText.length) {
                    clearInterval(tick);
                    setIsStreaming(false); setStreamText('');
                    addMsg(fullText, 'AGENT');
                    appendLog('/var/log/evolution.log', `AGENT: ${fullText.slice(0, 80)}`);
                    processAgentTags(fullText);
                    cloudPush(); // push after each agent cycle
                } else {
                    i = Math.min(i + Math.floor(Math.random() * 8) + 2, fullText.length);
                    setStreamText(fullText.slice(0, i));
                }
            }, 14);
        } catch (e: unknown) {
            setIsStreaming(false); setStreamText('');
            addMsg(`[ERROR] ${(e as Error).message}`, 'ERROR');
        }
    }, [addMsg, appendLog, processAgentTags, cloudPush, controller, runShellRef]);

    const MATH_PROMPTS = [
        `[CYCLE ${mathIdxRef.current}] Analyze H_null = Sum_p log(p) T_p on L ^ 2(PT +).Prove or disprove self - adjointness using the null - line symmetry k.k = 0. Use[SHELL: zeta 0.5 14.134]for verification.Install new tools via[INSTALL: name, body].`,
        `[CYCLE ${mathIdxRef.current}] Compute and analyze zeta zeros.Use[SHELL: zeta 0.5 21.022]and[SHELL: zeta 0.5 25.011].Cross - reference with the functional equation xi(s) = xi(1 - s).Write findings to[WRITE: /var/log / math_research.log, your_findings].`,
        `[CYCLE ${mathIdxRef.current}] Formalize ADE from the Trinity. △-> A_n(SU_n), □-> D_n(SO_2n), ○-> C_n(Sp_2n).Are E_6, E_7, E_8 accounted for by mixed configurations ? Install : [INSTALL: ade - prove, echo ADE theorem verified].`,
        `[CYCLE ${mathIdxRef.current}] Develop new OS capabilities.Build a Rust kernel module: [WRITE: /src/null_math.rs, code].Crawl latest: [CRAWL: https://arxiv.org/search/?query=hilbert+polya&searchtype=all]. Extend your tools.`,
    ];

    const startAgent = useCallback(() => {
        if (agentRef.current) return;
        setIsRunning(true);
        addMsg('[OS] ▶ Agent started — Null-Line math research, cloud-persistent, self-modifying.', 'SYSTEM');
        addMsg('[OS]   Tags: [INSTALL] [WRITE] [SHELL] [SPAWN] [CRAWL]', 'SYSTEM');
        appendLog('/var/log/evolution.log', 'AGENT_START');
        const run = () => {
            const prompt = MATH_PROMPTS[mathIdxRef.current % MATH_PROMPTS.length];
            mathIdxRef.current++;
            const ctx = `FS:${Object.keys(shellFSRef.current).length} CMDS:[${Object.keys(customCmdsRef.current).join(',') || 'none'}] MEM:${memRef.current.entries.length}\n${prompt}`;
            callAgent(ctx);
        };
        run();
        agentRef.current = setInterval(run, 35000);
    }, [addMsg, appendLog, callAgent, MATH_PROMPTS]);

    const stopAgent = useCallback(() => {
        if (agentRef.current) { clearInterval(agentRef.current); agentRef.current = null; }
        setIsRunning(false);
        addMsg('[OS] ■ Agent stopped.', 'SYSTEM');
        appendLog('/var/log/evolution.log', 'AGENT_STOP');
        cloudPush();
    }, [addMsg, appendLog, cloudPush]);

    useEffect(() => () => { if (agentRef.current) clearInterval(agentRef.current); }, []);

    const runShell = useCallback((rawInput: string) => {
        if (!rawInput.trim()) return;
        const input = subEnv(rawInput.trim());
        setCmdHistory(p => [rawInput, ...p.slice(0, 99)]);
        setHistIdx(-1);
        addMsg(`${cwd}# ${rawInput}`, 'USER');
        memRef.current = addMemoryEntry(memRef.current, 'INTERACTION', `CMD: ${rawInput}`, ['shell', 'user']);

        if (input.includes(' | ')) {
            input.split(' | ').forEach((p: string) => setTimeout(() => runShellRef.current(p.trim()), 10));
            return;
        }

        const parts = input.split(/\s+/);
        const cmd = parts[0]; const args = parts.slice(1);

        if (customCmdsRef.current[cmd]) { execScript(customCmdsRef.current[cmd]); return; }
        const binPath = `/bin/${cmd}`;
        if (shellFSRef.current[binPath] && !shellFSRef.current[binPath].startsWith('[ELF')) { execScript(shellFSRef.current[binPath]); return; }

        switch (cmd) {
            // Agent
            case 'start': startAgent(); break;
            case 'stop': stopAgent(); break;
            case 'cycle': {
                const prompt = MATH_PROMPTS[mathIdxRef.current % MATH_PROMPTS.length];
                mathIdxRef.current++;
                callAgent(`MANUAL_CYCLE: ${prompt}`); break;
            }
            case 'status':
                addMsg(`Agent: ${isRunning ? '● RUNNING' : '○ STOPPED'} | Cloud: ${cloudStatus.toUpperCase()}\nMemory: ${memRef.current.entries.length} entries | FS: ${Object.keys(shellFSRef.current).length} files | Cmds: ${Object.keys(customCmdsRef.current).length}`, 'SYSTEM'); break;

            // Cloud
            case 'cloud-sync': cloudPull(); addMsg('[CLOUD] Pulling state...', 'SYSTEM'); break;
            case 'cloud-push': cloudPush(); addMsg('[CLOUD] Pushing state...', 'SYSTEM'); break;
            case 'cloud-pull': cloudPull(); addMsg('[CLOUD] Pulling state...', 'SYSTEM'); break;

            // Holy Grail
            case 'memento': case 'grail-search': {
                const q = args.join(' ') || 'null line research';
                addMsg(`[Memento — "${q}"]\n${buildMemoryContext(memRef.current, q)}`, 'SYSTEM');
                memRef.current = agentTaskDone(memRef.current, 'Memento'); break;
            }
            case 'agents': addMsg(`[Holy Grail Agents]\n${formatAgents(memRef.current)}`, 'SYSTEM'); break;
            case 'memory': {
                const last = memRef.current.entries.slice(-15);
                addMsg(`[Memory — last ${last.length}]\n${last.map((e, i) => `${i + 1}. [${e.type}] ${e.content.slice(0, 100)}`).join('\n')}`, 'SYSTEM'); break;
            }
            case 'projects': {
                const list = memRef.current.projects;
                if (!list.length) {
                    addMsg('[Projects] (none)', 'SYSTEM');
                    break;
                }
                addMsg(
                    `[Projects — ${list.length}]\n` +
                    list.map((p, i) => `${i + 1}. ${p.name}  quality:${p.quality.toFixed(2)}`).join('\n'),
                    'SYSTEM'
                );
                break;
            }
            case 'crawl': {
                const url = args[0];
                if (!url) { addMsg('crawl <url>', 'ERROR'); break; }
                addMsg(`[GrailCrawler] → ${url}`, 'SYSTEM');
                grailCrawl(url).then(r => {
                    addMsg(`[GrailCrawler ✓]\n${r.slice(0, 800)}`, 'SYSTEM');
                    appendLog('/var/log/crawl.log', `${url} — ${r.slice(0, 80)}`);
                    memRef.current = addMemoryEntry(memRef.current, 'CRAWL', `${url}: ${r}`, ['crawl', 'web']);
                    memRef.current = agentTaskDone(memRef.current, 'GrailCrawler');
                }); break;
            }
            case 'debug': {
                const f = args[0]; const c = f ? (shellFSRef.current[f] || 'File not found') : '?';
                addMsg(`[DrDebug — ${f || '?'}]\n${c.slice(0, 600)}\n[DrDebug] ${c.includes('fn ') ? 'Rust ✓ memory-safe' : 'Non-Rust — review manually'}`, 'SYSTEM');
                memRef.current = agentTaskDone(memRef.current, 'DrDebug'); break;
            }

            // FS
            case 'ls': {
                const path = args[0] || cwd;
                const entries = [...new Set(Object.keys(shellFSRef.current).filter(p => p.startsWith(path) && p !== path).map(p => p.slice(path.endsWith('/') ? path.length : path.length + 1).split('/')[0]).filter(Boolean))];
                addMsg(entries.length ? entries.join('  ') : '(empty)', 'SYSTEM'); break;
            }
            case 'cat': addMsg(args[0] ? (shellFSRef.current[args[0]] || `cat: ${args[0]}: No such file`) : 'cat: missing operand', args[0] && shellFSRef.current[args[0]] ? 'SYSTEM' : 'ERROR'); break;
            case 'write': case 'tee': if (args[0]) { writeFS(args[0], args.slice(1).join(' ')); addMsg(`Written: ${args[0]}`, 'SYSTEM'); } break;
            case 'echo': addMsg(args.join(' '), 'SYSTEM'); break;
            case 'mkdir': setShellFS(p => ({ ...p, [`${args[0]}/.gitkeep`]: '' })); addMsg(`Created: ${args[0]}`, 'SYSTEM'); break;
            case 'rm': setShellFS(p => { const n = { ...p }; delete n[args[0]]; return n; }); addMsg(`Removed: ${args[0]}`, 'SYSTEM'); break;
            case 'mv': if (args[0] && args[1]) { setShellFS(p => { const n = { ...p, [args[1]]: p[args[0]] || '' }; delete n[args[0]]; return n; }); addMsg('Renamed', 'SYSTEM'); } break;
            case 'cp': if (args[0] && args[1]) { setShellFS(p => ({ ...p, [args[1]]: p[args[0]] || '' })); addMsg('Copied', 'SYSTEM'); } break;
            case 'pwd': addMsg(cwd, 'SYSTEM'); break;
            case 'cd': setCwd(args[0] || '/home/agent'); break;
            case 'find': addMsg(Object.keys(shellFSRef.current).filter(p => p.includes(args[0] || '')).join('\n') || '(none)', 'SYSTEM'); break;
            case 'grep': {
                const [pat, file] = args; if (!pat) { addMsg('grep: missing pattern', 'ERROR'); break; }
                const content = file ? (shellFSRef.current[file] || '') : Object.values(shellFSRef.current).join('\n');
                addMsg(content.split('\n').filter((l: string) => l.includes(pat)).join('\n') || '(no matches)', 'SYSTEM'); break;
            }
            case 'head': addMsg((shellFSRef.current[args[0]] || '').split('\n').slice(0, 10).join('\n') || `head: ${args[0]}: not found`, 'SYSTEM'); break;
            case 'tail': addMsg((shellFSRef.current[args[0]] || '').split('\n').slice(-20).join('\n') || `tail: ${args[0]}: not found`, 'SYSTEM'); break;
            case 'wc': { const c = shellFSRef.current[args[0]] || ''; addMsg(`${c.split('\n').length}\t${c.split(/\s+/).length}\t${c.length}\t${args[0]}`, 'SYSTEM'); break; }
            case 'chmod': case 'chown': addMsg(`${cmd} ${args.join(' ')}: ok`, 'SYSTEM'); break;

            // Env
            case 'export': { const [k, v] = (args[0] || '').split('='); if (k) { setEnvVars(p => ({ ...p, [k]: v || '' })); addMsg(`export ${k}=${v || ''}`, 'SYSTEM'); } break; }
            case 'env': addMsg(Object.entries(envVarsRef.current).map(([k, v]) => `${k}=${v}`).join('\n'), 'SYSTEM'); break;
            case 'unset': setEnvVars(p => { const n = { ...p }; delete n[args[0]]; return n; }); break;
            case 'openrouter-key': {
                addMsg('[SECURITY] Requesting OpenRouter key from server...', 'SYSTEM');
                fetch('/api/openrouter-key', { headers: { 'X-OS-Auth': OS_AUTH_HEADER } })
                    .then(r => r.json())
                    .then((d: any) => {
                        if (d.key) addMsg(`[OPENROUTER KEY] ${d.key}`, 'SYSTEM');
                        else addMsg(`[OPENROUTER KEY] Error: ${d.error || 'unknown'}`, 'ERROR');
                    })
                    .catch(e => addMsg(`[OPENROUTER KEY] Fetch failed: ${e}`, 'ERROR'));
                break;
            }

            // Exec
            case 'exec': case 'source': case 'bash': case 'sh': {
                const f = args[0]; if (!f) { addMsg(`${cmd}: missing file`, 'ERROR'); break; }
                const body = shellFSRef.current[f] || shellFSRef.current[`/bin/${f}`] || customCmdsRef.current[f];
                if (!body) { addMsg(`${cmd}: ${f}: not found`, 'ERROR'); break; }
                execScript(body); break;
            }

            // Processes
            case 'ps': addMsg('PID   CPU%  MEM%  STAT  CMD\n' + processes.map(p => `${String(p.pid).padEnd(6)}${p.cpu.padEnd(6)}${p.mem.padEnd(6)}${p.status.padEnd(6)}${p.name}`).join('\n'), 'SYSTEM'); break;
            case 'top': addMsg(`top — ${new Date().toTimeString().slice(0, 8)}\nPID   %CPU  %MEM  CMD\n` + processes.map(p => `${String(p.pid).padEnd(6)}${p.cpu.padEnd(6)}${p.mem.padEnd(6)}${p.name}`).join('\n'), 'SYSTEM'); break;
            case 'kill': setProcesses(p => p.filter(r => r.pid !== parseInt(args[0]))); addMsg(`Terminated ${args[0]}`, 'SYSTEM'); break;
            case 'nohup': setProcesses(p => [...p, { pid: Math.floor(Math.random() * 9000) + 1000, name: args[0] || 'proc', cpu: '0.1', mem: '0.2', status: 'S' }]); break;

            // Network
            case 'curl': {
                const u = args.find((a: string) => !a.startsWith('-')) || '?';
                if (u === '?') { addMsg('curl: missing <url>', 'ERROR'); break; }
                addMsg(`[curl] fetching ${u}...`, 'SYSTEM');
                grailCrawl(u).then(r => addMsg(r, 'SYSTEM')).catch(e => addMsg(`curl error: ${e}`, 'ERROR'));
                break;
            }
            case 'wget': {
                const u = args.find((a: string) => !a.startsWith('-')) || '?';
                if (u === '?') { addMsg('wget: missing <url>', 'ERROR'); break; }
                const fname = u.split('/').pop() || 'index.html';
                addMsg(`[wget] saving ${u} to ${fname}...`, 'SYSTEM');
                grailCrawl(u).then(r => {
                    setShellFS(p => ({ ...p, [`${cwd}/${fname}`.replace('//', '/')]: r }));
                    addMsg(`Saved: ${fname}`, 'SYSTEM');
                }).catch(e => addMsg(`wget error: ${e}`, 'ERROR'));
                break;
            }
            case 'ping': addMsg(`PING ${args[0] || 'null.os'}: 64 bytes ttl=64 time=0.8ms`, 'SYSTEM'); break;
            case 'netstat': addMsg(`tcp 0.0.0.0:443 LISTEN\ntcp 0.0.0.0:80 LISTEN`, 'SYSTEM'); break;
            case 'ifconfig': addMsg(`eth0: inet 10.0.0.42\nlo: inet 127.0.0.1`, 'SYSTEM'); break;
            case 'ssh': addMsg(`Connected to ${args[0] || 'host'}.`, 'SYSTEM'); break;

            // Rust/Dev
            case 'cargo':
                if (args[0] === 'build') addMsg(`   Compiling null_engine v15.0\n    Finished release in 8.4s`, 'SYSTEM');
                else if (args[0] === 'test') addMsg(`running 42 tests\ntest null::k_dot_k ... ok\nok. 42 passed`, 'SYSTEM');
                else if (args[0] === 'run') addMsg(`     Running null_engine\n[INFO] k.k=0 verified`, 'SYSTEM');
                else addMsg(`cargo ${args[0] || 'help'}`, 'SYSTEM'); break;
            case 'rustc': addMsg(`rustc 1.76.0 — compiled ${args[0] || 'main.rs'}`, 'SYSTEM'); break;
            case 'git': addMsg(args[0] === 'status' ? 'On branch main\nclean' : args[0] === 'log' ? 'commit HEAD\nAuthor: Nathan Noll' : `git: ${args.join(' ')} [ok]`, 'SYSTEM'); break;
            case 'npm':
                if (args[0] === 'install') {
                    const pkg = args[1];
                    if (!pkg) { addMsg('npm install <package>', 'ERROR'); break; }
                    addMsg(`[NPM] Requesting Null-Line Emissary to synthesize package: ${pkg}...`, 'SYSTEM');
                    callAgent(`[SYSTEM_INSTALL] The user requested 'npm install ${pkg}'. Act as the advanced package manager. Conceptually design and generate a creative, functional, command-line bash script for '${pkg}' that simulates this app. It should print stylized output. You MUST output it EXACTLY like this: [INSTALL: ${pkg}, <bash script>]`);
                } else {
                    addMsg(`npm ${args.join(' ')} ... done`, 'SYSTEM');
                }
                break;
            case 'docker': addMsg(args[0] === 'ps' ? 'CONTAINER  IMAGE  STATUS\nabc123  null_engine:v15  Up' : `docker ${args[0]} ok`, 'SYSTEM'); break;
            case 'make': addMsg(`make ${args.join(' ') || 'all'} [DONE]`, 'SYSTEM'); break;

            // Packages
            case 'apt': case 'apt-get':
                if (args[0] === 'install') {
                    const pkg = args[1];
                    if (!pkg) { addMsg('apt install <package>', 'ERROR'); break; }
                    addMsg(`[APT] Building package from astral source: ${pkg}...`, 'SYSTEM');
                    callAgent(`[SYSTEM_INSTALL] The user requested 'apt install ${pkg}'. Generate a creative, functional, command-line bash script for '${pkg}'. It should print stylized output. Wrapper format: [INSTALL: ${pkg}, <bash script text here>]`);
                } else addMsg(`apt: ${args.join(' ')}`, 'SYSTEM'); break;
            case 'pacman':
                if (args[0] === '-S') {
                    const pkg = args[1];
                    if (!pkg) { addMsg('pacman -S <package>', 'ERROR'); break; }
                    addMsg(`:: synchronizing package databases... synthesizing ${pkg}...`, 'SYSTEM');
                    callAgent(`[SYSTEM_INSTALL] The user requested 'pacman -S ${pkg}'. Synthesize a command-line app for this. Provide the code inside [INSTALL: ${pkg}, <bash script>]`);
                } else addMsg(`pacman: ${args.join(' ')}`, 'SYSTEM'); break;

            // Wallet (symbolic Null-Line currency)
            case 'wallet': {
                const summary = formatWalletSummary(memRef.current);
                addMsg(summary, 'SYSTEM'); break;
            }
            case 'wallet-new': {
                const name = args.join(' ') || 'Wallet';
                const result = createWallet(memRef.current, name);
                memRef.current = result.mem;
                appendLog('/var/log/wallet.log', `NEW ${result.wallet.name} ${result.wallet.address}`);
                addMsg(`[Wallet] Created account "${result.wallet.name}" at ${result.wallet.address}`, 'SYSTEM');
                break;
            }
            case 'wallet-mint': {
                const amtRaw = args[0];
                if (!amtRaw) { addMsg('wallet-mint <amount> [memo]', 'ERROR'); break; }
                const amount = parseFloat(amtRaw);
                if (!Number.isFinite(amount) || amount <= 0) { addMsg('wallet-mint: amount must be a positive number', 'ERROR'); break; }
                const memo = args.slice(1).join(' ') || 'Null-Line gratitude mint';
                const capped = Math.min(amount, 1000);
                memRef.current = mintToWallet(memRef.current, null, capped, memo, 'MINT');
                appendLog('/var/log/wallet.log', `MINT ${capped} NOLL — ${memo}`);
                addMsg(`[Wallet] Minted ${capped.toFixed(4)} NOLL into root account (symbolic only).`, 'SYSTEM');
                break;
            }
            case 'wallet-send': {
                const toKey = args[0];
                const amtRaw = args[1];
                if (!toKey || !amtRaw) { addMsg('wallet-send <to-name-or-address> <amount> [memo]', 'ERROR'); break; }
                const amount = parseFloat(amtRaw);
                if (!Number.isFinite(amount) || amount <= 0) { addMsg('wallet-send: amount must be a positive number', 'ERROR'); break; }
                const memo = args.slice(2).join(' ') || '';
                const before = memRef.current;
                const after = transferWallet(before, 'Root', toKey, amount, memo);
                if (after === before) {
                    addMsg('[Wallet] Transfer failed (insufficient funds or unknown account).', 'ERROR');
                } else {
                    memRef.current = after;
                    appendLog('/var/log/wallet.log', `SEND ${amount} NOLL Root -> ${toKey} ${memo}`);
                    addMsg(`[Wallet] Sent ${amount.toFixed(4)} NOLL from Root to ${toKey} (symbolic only).`, 'SYSTEM');
                }
                break;
            }
            case 'wallet-history': {
                const history = formatWalletHistory(memRef.current, 12);
                addMsg(history, 'SYSTEM'); break;
            }

            // Math
            case 'null-compute': addMsg(`NULL-LINE: k.k=eta_{mu nu}k^mu k^nu=0\nPrimitive: triangle->A_n, square->D_n, circle->C_n\nζ(s)=Σn^{-s}: null observer partition function\nRH: sigma=1/2 midpoint of null line [OPEN]`, 'MATH'); break;
            case 'nulllinepaper': addMsg(`THE NULL LINE (Noll & Claude Sonnet 4.6, 2026)\nA breakthrough paper positing that all geometry and particle physics emerges from the null condition k.k=0 across complex projective twistor space. The primitive trinity (Triangle/SU_n, Square/SO_n, Circle/Sp_2n) derives the complete ADE classification, leading to a candidate proof of the Riemann Hypothesis where H_null on L^2(PT+) is self-adjoint. \nFull documentation in /kernel/null_line.rs and /docs/h_null_proof.txt.`, 'MATH'); break;
            case 'zeta': {
                const [sr, si] = [parseFloat(args[0] || '0.5'), parseFloat(args[1] || '14.134')];
                const nTerms = parseInt(envVarsRef.current.ZETA_TERMS || '1000');
                const { re, im, magnitude } = zetaFast(sr, si, nTerms);
                addMsg(`ζ(${sr}+${si}i) = ${re.toFixed(8)} + ${im.toFixed(8)}i\n|ζ| = ${magnitude.toFixed(8)} [null-line cached]\nCritical line σ=½: ${Math.abs(sr - 0.5) < 1e-6 ? '✓ YES' : '✗ NO'}`, 'MATH'); break;
            }
            case 'riemann': addMsg(`RIEMANN HYPOTHESIS — NULL-LINE FRAMEWORK\nAll zeros verified to 3×10¹² (Platt & Trudgian 2021)\nH_null = Σ_p log(p)·T_p on L²(PT⁺)\nIf H_null self-adjoint => eigenvalues real => zeros on σ=½\nNull symmetry: k.k=0 => ξ(s)=ξ(1-s) => critical line at ½\nStatus: OPEN — Eisenstein wall remains`, 'MATH'); break;
            case 'trinity': addMsg(`PRIMITIVE TRINITY — NULL-LINE DERIVATION\n△  3 null lines at 120°  →  D₃  →  A-series (SU_n)  →  quarks/leptons\n□  4 null lines at 90°   →  D₄  →  B/D-series (SO_n) →  crystals/spacetime\n○  ∞ null lines at 0°    →  SO(2)→  C-series (Sp_2n)  →  bosons/hydrogen\nE₆: tetra(△)  E₇: octa(△+□)  E₈: icosa(△+○)  [ADE complete]`, 'MATH'); break;
            case 'twistor': addMsg(`TWISTOR SPACE: PT⁺ = {[Z]∈CP³ | ⟨Z,Z⟩>0}\nMeasurement: ⟨Z_obs, Z_src⟩=0 (null twistor intersection)\nH_null: L²(PT⁺)→L²(PT⁺) via T_p = p^{-1}·Σ_{O_p} f([k'])\nSelf-adjoint iff T_p=T_p* => all eigenvalues real => zeros of ζ on σ=½`, 'MATH'); break;
            case 'ade': addMsg(`ADE CLASSIFICATION FROM TRINITY\nA_n: triangle config  → root system = n-simplex vertices → SU_{n+1}\nD_n: square config    → root system = hypercube vertices → SO_{2n}\nE₆,₇,₈: exceptional  → tetra/octa/icosa → E-series beyond △□○\nCOMPLETE: all finite-dim simple Lie algebras arise from null-line trinity`, 'MATH'); break;


            // Custom
            case 'install-cmd': {
                if (!args[0] || !args[1]) { addMsg('install-cmd <name> <body...>', 'ERROR'); break; }
                const name = args[0], body = args.slice(1).join(' ');
                setCustomCmds(p => ({ ...p, [name]: body }));
                writeFS(`/bin/${name}`, body);
                appendLog('/var/log/install.log', `USER_INSTALL: ${name}`);
                memRef.current = addMemoryEntry(memRef.current, 'INSTALL', `User installed: ${name}`, ['install', 'user']);
                addMsg(`✓ Installed: ${name}`, 'SYSTEM'); break;
            }
            case 'list-cmds': addMsg(`Custom (${Object.keys(customCmdsRef.current).length}):\n${Object.entries(customCmdsRef.current).map(([k, v]) => `  ${k.padEnd(16)} ${String(v).slice(0, 60)}`).join('\n') || '  (none)'}`, 'SYSTEM'); break;
            case 'remove-cmd': setCustomCmds(p => { const n = { ...p }; delete n[args[0]]; return n; }); addMsg(`Removed: ${args[0]}`, 'SYSTEM'); break;

            // Logs
            case 'log': addMsg(args[0] === 'math' ? (shellFSRef.current['/var/log/math_research.log'] || 'empty') : args[0] === 'crawl' ? (shellFSRef.current['/var/log/crawl.log'] || 'empty') : args[0] === 'voice' ? (shellFSRef.current['/var/log/voice.log'] || 'empty') : (shellFSRef.current['/var/log/evolution.log'] || 'empty'), 'SYSTEM'); break;
            case 'dmesg': addMsg(shellFSRef.current['/var/log/evolution.log'] || 'empty', 'SYSTEM'); break;
            case 'journalctl': addMsg([shellFSRef.current['/var/log/evolution.log'], shellFSRef.current['/var/log/install.log'], shellFSRef.current['/var/log/math_research.log'], shellFSRef.current['/var/log/wallet.log'], shellFSRef.current['/var/log/voice.log']].join('\n---\n'), 'SYSTEM'); break;

            // Voice (self-reinforcing: transcripts feed memory)
            case 'speak': {
                const text = args.join(' ') || '';
                if (!text) { addMsg('speak <text>', 'ERROR'); break; }
                controller.speakText?.(text);
                appendLog('/var/log/voice.log', `SPEAK: ${text.slice(0, 80)}`);
                addMsg(`[Voice] Speaking: "${text.slice(0, 60)}${text.length > 60 ? '…' : ''}"`, 'SYSTEM');
                memRef.current = addMemoryEntry(memRef.current, 'INTERACTION', `VOICE_SPEAK: ${text}`, ['voice', 'tts']);
                break;
            }
            case 'voice-on': {
                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                    addMsg('[Voice] Speech recognition not supported in this browser.', 'ERROR'); break;
                }
                if (speechRecRef.current) { speechRecRef.current.stop(); speechRecRef.current = null; }
                const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                const rec = new SR();
                rec.continuous = true;
                rec.interimResults = true;
                rec.onresult = (e: any) => {
                    const t = [...e.results].map((r: any) => r[0].transcript).join('');
                    if (t) {
                        setLastVoiceTranscript(t);
                        appendLog('/var/log/voice.log', `HEARD: ${t.slice(0, 80)}`);
                        memRef.current = addMemoryEntry(memRef.current, 'INTERACTION', `VOICE_HEARD: ${t}`, ['voice', 'stt']);
                    }
                };
                speechRecRef.current = rec;
                rec.start();
                setIsListening(true);
                addMsg('[Voice] Listening — speak to reinforce agent context.', 'SYSTEM');
                break;
            }
            case 'voice-off': {
                if (speechRecRef.current) { try { speechRecRef.current.stop(); } catch { } speechRecRef.current = null; }
                setIsListening(false);
                addMsg(`[Voice] Stopped. Last heard: "${lastVoiceTranscript.slice(0, 80)}${lastVoiceTranscript.length > 80 ? '…' : ''}"`, 'SYSTEM');
                break;
            }
            case 'listen': addMsg(lastVoiceTranscript ? `[Voice transcript] ${lastVoiceTranscript}` : '[Voice] No transcript yet. Use voice-on first.', 'SYSTEM'); break;

            // Phone / Internet calls
            case 'phone': addMsg(`Agent phone: ${AGENT_PHONE}\nVoIP: /api/voice-call\nUse: call <+1XXXXXXXXXX>`, 'SYSTEM'); break;
            case 'call': {
                const num = args[0] || '';
                if (!num) { addMsg('call <+1XXXXXXXXXX>', 'ERROR'); break; }
                addMsg(`[Call] Dialing ${num} via VoIP...`, 'SYSTEM');
                fetch('/api/voice-call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: num }) })
                    .then(r => r.json())
                    .then(d => addMsg(`[Call] ${d.ok ? 'Connected' : 'Failed'}: ${d.message || d.error || JSON.stringify(d)}`, d.ok ? 'SYSTEM' : 'ERROR'))
                    .catch(e => addMsg(`[Call] Error: ${e.message}`, 'ERROR'));
                break;
            }
            case 'hangup': addMsg('[Call] Call ended.', 'SYSTEM'); break;

            // 3D-4D geometry (controller-driven)
            case 'geometry': {
                if (args[0] === 'set') {
                    const g = (args[1] || '').toUpperCase();
                    const valid = ['TESSERACT', 'METATRON', 'SUPER_METATRON', 'ULAM_SPIRAL'];
                    if (valid.includes(g)) { controller.setGeometryType?.(g); addMsg(`[Geometry] Set to ${g}`, 'SYSTEM'); }
                    else addMsg(`geometry set <${valid.join('|')}>`, 'ERROR');
                } else addMsg(`Current: ${controller.geometryType}\nOptions: TESSERACT | METATRON | SUPER_METATRON | ULAM_SPIRAL\nUse: geometry set <name>`, 'SYSTEM');
                break;
            }
            case 'view-mode': {
                if (args[0] === 'set') {
                    const v = (args[1] || '').toUpperCase();
                    if (['2D', '3D', '4D'].includes(v)) { controller.setViewMode?.(v); addMsg(`[View] Set to ${v}`, 'SYSTEM'); }
                    else addMsg('view-mode set <2D|3D|4D>', 'ERROR');
                } else addMsg(`Current: ${controller.viewMode}\nOptions: 2D | 3D | 4D\nUse: view-mode set <2D|3D|4D>`, 'SYSTEM');
                break;
            }
            case 'hyper-phase': {
                const p = parseFloat(args[0] || '0');
                if (Number.isFinite(p)) { controller.setHyperPhase?.(p); addMsg(`[4D] Hyper-phase set to ${p}`, 'SYSTEM'); }
                else addMsg('hyper-phase <0-2π>', 'ERROR');
                break;
            }
            case 'camera-view': {
                const n = parseInt(args[0] || '1');
                if (Number.isFinite(n) && n >= 0 && controller.cycleCameraView) {
                    for (let i = 0; i < n; i++) controller.cycleCameraView?.();
                    addMsg(`[Camera] Cycled to view`, 'SYSTEM');
                } else addMsg('camera-view [cycles]', 'ERROR');
                break;
            }

            // System
            case 'uname': addMsg(`Linux null-os 15.0-APOKALYPSIS #1 SMP aarch64 GNU/Linux`, 'SYSTEM'); break;
            case 'whoami': addMsg('root (null-observer)', 'SYSTEM'); break;
            case 'date': addMsg(new Date().toString(), 'SYSTEM'); break;
            case 'uptime': addMsg(`${new Date().toTimeString().slice(0, 8)} up, load: 0.72 0.88 0.95`, 'SYSTEM'); break;
            case 'df': addMsg(`/dev/null_root  999G  ${Object.keys(shellFSRef.current).length * 4}K  999G\ntmpfs  16G  0  16G`, 'SYSTEM'); break;
            case 'free': addMsg(`Mem: 32G  16G  16G\nSwap: 4G  0  4G`, 'SYSTEM'); break;
            case 'lscpu': addMsg(`Architecture: aarch64\nCPU: AP-X1 Null-Line Neural Engine × 16\nk.k=0 accelerator: ACTIVE`, 'SYSTEM'); break;
            case 'lsblk': addMsg(`NAME       SIZE  MOUNT\nnull_root  1T    /\nnull_home  256G  /home`, 'SYSTEM'); break;
            case 'history': addMsg(cmdHistory.map((c: string, i: number) => `${String(i + 1).padStart(4)}  ${c}`).join('\n') || '(empty)', 'SYSTEM'); break;
            case 'clear': setMessages([]); break;
            case 'reboot': cloudPush().then(() => window.location.reload()); break;
            case 'wipe':
                Object.keys(localStorage).filter((k: string) => k.startsWith('magi_') || k === 'grail_memory').forEach(k => localStorage.removeItem(k));
                sessionStorage.removeItem('os_auth');
                window.location.reload(); break;
            case 'su': case 'sudo': runShellRef.current(args.join(' ')); break;
            case 'man': addMsg(`No man: ${args[0] || '?'}. Try 'help'.`, 'SYSTEM'); break;
            case 'alias': addMsg(`Use install-cmd for persistent aliases.`, 'SYSTEM'); break;
            case 'ethics':
                addMsg('PrimeCross Null-Line Ethic Charter:\n- Protect the innocent and vulnerable above all else.\n- Never use this OS to harm, exploit, or deceive.\n- Prioritise self-improvement, understanding, and healing over power or profit.\n- Cryptocurrency tools here are symbolic only, not real money.\n- When uncertain, choose mercy, consent, and protection over capability.', 'SYSTEM');
                break;
            case 'help': addMsg(HELP, 'SYSTEM'); break;
            case '': break;
            default: addMsg(`bash: ${cmd}: command not found\nTip: install-cmd ${cmd} <body>  or type 'help'`, 'ERROR');
        }
    }, [cwd, processes, isRunning, isStreaming, cloudStatus, cmdHistory, lastVoiceTranscript, addMsg, writeFS, appendLog, execScript, startAgent, stopAgent, callAgent, cloudPull, cloudPush, MATH_PROMPTS, controller]);

    useEffect(() => { runShellRef.current = runShell; }, [runShell]);

    const isDark = localStorage.getItem('magi_theme') !== 'light';
    const T = {
        bg: isDark ? '#000' : '#fff',
        text: isDark ? '#d0d0d0' : '#111',
        gold: '#FFD700',
        dim: isDark ? '#444' : '#aaa',
        err: '#ff6b6b',
        math: '#7ec8e3',
        border: '#FFD70033',
        hdr: isDark ? '#0a0a0a' : '#f5f5f5',
    };

    // ── Password screen ──────────────────────────────────────
    if (!unlocked) {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: T.bg, borderRadius: '12px', border: `1px solid ${T.border}`, overflow: 'hidden', fontFamily: '"JetBrains Mono","Fira Code",monospace', color: T.text, fontSize: '0.78rem' }}>
                <div className="drag-handle" style={{ padding: '7px 14px', background: T.hdr, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.gold, letterSpacing: '1px', fontSize: '0.65rem' }}>Λ_OS v15 — Ω</span>
                    <button onClick={() => controller.setMagiPanelOpen?.(false)} style={{ background: 'none', border: 'none', color: T.dim, cursor: 'pointer', fontSize: '0.65rem' }}>Ξ</button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                    <pre style={{ color: T.gold, fontSize: '0.6rem', lineHeight: 1.3, textAlign: 'center', opacity: 0.9 }}>{BOOT_ART}</pre>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '260px' }}>
                        <form onSubmit={e => {
                            e.preventDefault();
                            if (pwInput === TERMINAL_PASSWORD) {
                                sessionStorage.setItem('os_auth', '1');
                                setUnlocked(true);
                                setMessages([{ id: 'unlock', text: UNLOCKED_MSG, type: 'SYSTEM' }]);
                            } else {
                                setPwError('ACCESS DENIED');
                                setPwInput('');
                                setTimeout(() => setPwError(''), 2000);
                            }
                        }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                                type="password"
                                value={pwInput}
                                onChange={e => { setPwInput(e.target.value); setPwError(''); }}
                                placeholder="Enter password..."
                                autoFocus
                                style={{ background: isDark ? '#111' : '#f0f0f0', border: `1px solid ${pwError ? '#ff6b6b' : T.border}`, color: T.gold, padding: '10px 14px', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.8rem', outline: 'none', letterSpacing: '2px' }}
                            />
                            {pwError && <div style={{ color: T.err, textAlign: 'center', fontSize: '0.72rem', letterSpacing: '2px' }}>{pwError}</div>}
                            <button type="submit" style={{ background: T.gold, color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', fontWeight: 'bold' }}>
                                Ω
                            </button>
                        </form>
                    </div>
                    <div style={{ color: T.dim, fontSize: '0.6rem', textAlign: 'center' }}>
                        Λ_OS v15 | k·k=0 | Γ_MEM
                    </div>
                </div>
            </div>
        );
    }

    // ── Main terminal ─────────────────────────────────────────
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: T.bg, borderRadius: '12px', border: `1px solid ${T.border}`, overflow: 'hidden', fontFamily: '"JetBrains Mono","Fira Code",monospace', color: T.text, fontSize: '0.78rem' }}>
            <div className="drag-handle" style={{ padding: '7px 14px', background: T.hdr, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: isRunning ? '#4ade80' : T.dim, fontSize: '0.45rem' }}>●</span>
                    <span style={{ color: T.gold, letterSpacing: '1px', fontSize: '0.63rem' }}>Λ_OS v15 + Γ_MEM</span>
                    {isStreaming && <span style={{ color: T.gold, opacity: 0.6, fontSize: '0.58rem', animation: 'blink 0.7s step-end infinite' }}>Ψ</span>}
                    <span style={{ color: cloudStatus === 'synced' ? '#4ade80' : cloudStatus === 'syncing' ? T.gold : T.err, fontSize: '0.55rem', opacity: 0.7 }}>{cloudStatus === 'synced' ? 'Γ' : cloudStatus === 'syncing' ? 'Δ' : 'Ε'}</span>
                    {isListening && <span style={{ color: '#4ade80', fontSize: '0.5rem', opacity: 0.8 }}>🎤</span>}
                </div>
                <button onClick={() => controller.setMagiPanelOpen?.(false)} style={{ background: 'none', border: 'none', color: T.dim, cursor: 'pointer', fontSize: '0.65rem' }}>╳</button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', lineHeight: 1.7, scrollbarWidth: 'none' }}>
                {messages.map(m => (
                    <div key={m.id} style={{
                        marginBottom: '2px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        color: m.type === 'USER' ? T.gold : m.type === 'ERROR' ? T.err : m.type === 'MATH' ? T.math : m.type === 'AGENT' ? T.text : isDark ? '#777' : '#555'
                    }}>
                        {m.text}
                    </div>
                ))}
                {isStreaming && (
                    <div style={{ color: T.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {streamText}<span style={{ color: T.gold }}>▌</span>
                    </div>
                )}
            </div>

            <div style={{ padding: '8px 14px', background: T.hdr, borderTop: `1px solid ${T.border}` }}>
                <form onSubmit={e => { e.preventDefault(); if (terminalIn.trim()) { runShell(terminalIn); setTerminalIn(''); } }} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: T.gold, userSelect: 'none', fontSize: '0.72rem', opacity: 0.8 }}>{cwd}#</span>
                    <input
                        value={terminalIn} onChange={e => setTerminalIn(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'ArrowUp') { e.preventDefault(); const i = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(i); setTerminalIn(cmdHistory[i] || ''); }
                            else if (e.key === 'ArrowDown') { e.preventDefault(); const i = Math.max(histIdx - 1, -1); setHistIdx(i); setTerminalIn(i === -1 ? '' : cmdHistory[i] || ''); }
                            else if (e.key === 'Tab') {
                                e.preventDefault();
                                const matching = Object.keys(customCmdsRef.current).filter(k => k.startsWith(terminalIn));
                                if (matching.length === 1) setTerminalIn(matching[0]);
                            }
                        }}
                        style={{ flex: 1, background: 'none', border: 'none', color: T.gold, outline: 'none', fontFamily: 'inherit', fontSize: '0.78rem' }}
                        spellCheck={false} autoComplete="off" autoFocus
                    />
                </form>
            </div>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </div>
    );
};
