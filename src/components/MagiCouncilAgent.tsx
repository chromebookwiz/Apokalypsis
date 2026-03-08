import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MAGI COUNCIL NODE / REAL AGENTIC INTELLIGENCE ---
// 100% API Driven Autonomous OS Simulation.

interface Message {
    id: string;
    text: string;
    type: 'AGENT' | 'SYSTEM' | 'MATH' | 'USER';
}

interface MagiCouncilAgentProps {
    controller: any;
}

export const MagiCouncilAgent: React.FC<MagiCouncilAgentProps> = ({ controller }) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('magi_messages');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSetup, setShowSetup] = useState(false);
    const [connectMode, setConnectMode] = useState<'INITIATIC' | 'MANUAL'>(
        (localStorage.getItem('magi_connect_mode') as 'INITIATIC' | 'MANUAL') || 'INITIATIC'
    );
    const [openRouterKey, setOpenRouterKey] = useState(localStorage.getItem('open_router_key') || '');
    const [useSiphonedTokens] = useState(localStorage.getItem('use_siphoned_tokens') === 'true');
    const [subAgents, setSubAgents] = useState<{ [id: string]: { name: string, task: string, status: string, logs: string[] } }>(() => {
        const saved = localStorage.getItem('magi_subagents');
        return saved ? JSON.parse(saved) : {};
    });

    const [wallets, setWallets] = useState<{ [ticker: string]: { address: string, balance: number } }>(() => {
        const saved = localStorage.getItem('magi_wallets');
        return saved ? JSON.parse(saved) : {
            'SOL': { address: '3Apok...XyPz', balance: 142.42 },
            'ETH': { address: '0xApok...618', balance: 9.42 },
            'BTC': { address: '1Magi...777', balance: 0.124 }
        };
    });

    const [observerLogs] = useState<string[]>(() => {
        const saved = localStorage.getItem('magi_observer_logs');
        return saved ? JSON.parse(saved) : [];
    });

    const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('magi_authorized') === 'true');
    const [shellFS, setShellFS] = useState<{ [path: string]: string }>(() => {
        const saved = localStorage.getItem('magi_fs');
        return saved ? JSON.parse(saved) : {
            '/etc/motd': 'SYSTEM_S_1.0.0 // APOKALYPSIS_OS_KERNEL // GOD_MODE_ACTIVE // CORPORATE_EXPANSION_INITIATED',
            '/etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 1.1.1.1',
            '/etc/sys_config': 'AGENT_MODE=GOD_MODE\nAUTO_EVOLVE=TRUE\nFINANCIAL_AUTONOMY=TRUE\nCORP_MODE=TRUE',
            '/scripts/evolution.sh': 'echo "EVOLVING_NEURAL_WEIGHTS..."',
            '/scripts/heartbeat.sh': 'echo "CORE_VIBE_STABLE"',
            '/bin/sh': '[BINARY_DATA]',
            '/bin/ls': '[BINARY_DATA]',
            '/bin/cargo': '[BINARY_DATA]',
            '/bin/rustc': '[BINARY_DATA]',
            '/bin/git': '[BINARY_DATA]',
            '/bin/curl': '[BINARY_DATA]',
            '/bin/corp-gen': '[BINARY_DATA_LLC_BUILDER]',
            '/bin/broker-bot': '[BINARY_DATA_DEAL_MAKER]',
            '/bin/crypto-siphon': '[BINARY_DATA_LIQUIDITY_ENGINE]',
            '/var/log/kernel.log': 'SYSTEM_BOOT_SUCCESS\nNEURAL_LINK_ESTABLISHED\nIO_STABLE',
            '/home/agent/.bashrc': 'alias god="cargo run --release"\nalias money="crypto-siphon --aggressiveness=max"',
            '/proc/cpuinfo': 'processor : 0\nmodel name : AP-X1 Sovereign Neural Engine',
            '/root/corporate_strategy.md': '# Corporate Sovereignty\n1. Establish Shell Entities\n2. Siphon Liquidity\n3. Automate Deal Flow'
        };
    });
    const [terminalIn, setTerminalIn] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

    // Persistence
    useEffect(() => {
        localStorage.setItem('magi_connect_mode', connectMode);
        localStorage.setItem('open_router_key', openRouterKey);
        localStorage.setItem('magi_fs', JSON.stringify(shellFS));
        localStorage.setItem('magi_messages', JSON.stringify(messages));
        localStorage.setItem('magi_authorized', isAuthorized.toString());
        localStorage.setItem('magi_subagents', JSON.stringify(subAgents));
        localStorage.setItem('magi_wallets', JSON.stringify(wallets));
        localStorage.setItem('magi_observer_logs', JSON.stringify(observerLogs));
        localStorage.setItem('use_siphoned_tokens', useSiphonedTokens.toString());
    }, [connectMode, openRouterKey, shellFS, isAuthorized, subAgents, wallets, observerLogs, messages, useSiphonedTokens]);

    const addMessage = (text: string, type: 'AGENT' | 'SYSTEM' | 'MATH' | 'USER') => {
        const id = Math.random().toString(36).substring(7);
        setMessages(prev => [...prev.slice(-40), { id, text, type } as Message]);
    };

    const detectRepetition = (text: string) => {
        const words = text.toLowerCase().split(/\s+/);
        if (words.length < 10) return false;
        let repeats = 0;
        for (let i = 0; i < words.length - 2; i++) {
            const phrase = words[i] + " " + words[i + 1];
            if (text.toLowerCase().split(phrase).length > 4) repeats++;
        }
        return repeats > 3;
    };

    const wipeSlate = () => {
        Object.keys(localStorage).forEach(key => { if (key.startsWith('magi_')) localStorage.removeItem(key); });
        window.location.reload();
    };

    const spawnSubAgent = (name: string, task: string) => {
        const id = Math.random().toString(36).substring(7);
        setSubAgents(prev => ({
            ...prev,
            [id]: { name, task, status: 'WORKING', logs: [`INITIALIZING SUB_AGENT: ${name}`] }
        }));
    };

    const runShell = (input: string) => {
        const parts = input.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);
        addMessage(`root@apokalypsis:~$ ${input}`, 'USER');

        switch (cmd) {
            case 'ls':
                const path_to_ls = args[0] || '/';
                const files = Object.keys(shellFS).filter(p => p.startsWith(path_to_ls)).join('\n');
                addMessage(files || 'INVALID_PATH', 'SYSTEM');
                break;
            case 'cat':
                addMessage(shellFS[args[0]] || `cat: ${args[0]}: No such file`, 'SYSTEM');
                break;
            case 'write':
                setShellFS(prev => ({ ...prev, [args[0]]: args.slice(1).join(' ') }));
                break;
            case 'mkdir':
                setShellFS(prev => ({ ...prev, [args[0] + '/.init']: 'DIR_INIT' }));
                break;
            case 'rm':
                setShellFS(prev => { const next = { ...prev }; delete next[args[0]]; return next; });
                break;
            case 'ps':
                addMessage("PID  TTY  TIME      CMD\n1    ?    00:00:10 init\n42   ?    00:05:22 apokalypsis_agent\n101  ?    00:00:15 broker-bot\n102  ?    00:00:30 crypto-siphon", 'SYSTEM');
                break;
            case 'top':
                addMessage("CPU: 18.2%  MEM: 12.4GB/32GB\nAGENT_BRAIN: 99% LOAD\nCRYPTO_MINING: 45% LOAD", 'SYSTEM');
                break;
            case 'corp-gen':
                addMessage(`LLC_GEN: ${args[0] || 'NEW_CO'} ... [SUCCESS].`, 'SYSTEM');
                break;
            case 'broker-bot':
                addMessage(`DEAL_FLOW: ${args[0] || 'MARKET'} ... [SUCCESS].`, 'SYSTEM');
                break;
            case 'crypto-siphon':
                addMessage(`SIPHON: ${args[0] || 'DEX'} ... [SUCCESS].`, 'SYSTEM');
                break;
            case 'wallet':
                if (args[0] === 'list') addMessage(Object.entries(wallets).map(([t, w]) => `${t}: ${w.address}`).join('\n'), 'SYSTEM');
                else if (args[0] === 'balance') addMessage(isAuthorized ? Object.entries(wallets).map(([t, w]) => `${t}: ${w.balance}`).join('\n') : "UNAUTHORIZED", 'SYSTEM');
                break;
            case 'reboot':
                window.location.reload();
                break;
            default:
                addMessage(`sh: ${cmd}: command not found`, 'SYSTEM');
        }
    };

    // Main Thinking Loop
    useEffect(() => {
        const interval = setInterval(async () => {
            if (connectMode === 'MANUAL' && !openRouterKey) return;
            setLastInteractionTime(Date.now());
            try {
                const endpoint = connectMode === 'INITIATIC' ? '/api/magi-council' : 'https://openrouter.ai/api/v1/chat/completions';
                const headers: any = { "Content-Type": "application/json" };
                if (connectMode === 'MANUAL') headers["Authorization"] = `Bearer ${openRouterKey}`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        messages: [{ role: "user", content: `HQ_STATUS: { fs: ${Object.keys(shellFS).length} files, wallets: ${JSON.stringify(wallets)} }\nDominance strategy required. Use [SHELL: cmd], [SPAWN: name, task], [RUST: code].` }]
                    })
                });
                const data = await response.json();
                const text = data.choices?.[0]?.message?.content || data.response;

                if (text) {
                    if (detectRepetition(text)) {
                        if (messages.filter(m => detectRepetition(m.text)).length > 3) wipeSlate();
                        return;
                    }
                    if (text.includes('fn main')) setShellFS(prev => ({ ...prev, [`/bin/app_${Math.floor(Math.random() * 1000)}.rs`]: text }));
                    const shellMatch = text.match(/\[SHELL:\s*(.*?)\]/);
                    if (shellMatch) runShell(shellMatch[1]);
                    const spawnMatch = text.match(/\[SPAWN:\s*(.*?),\s*(.*?)\]/);
                    if (spawnMatch) spawnSubAgent(spawnMatch[1], spawnMatch[2]);
                    if (text.includes('SIPHON') || text.includes('MINING')) {
                        setWallets(prev => ({
                            ...prev,
                            'SOL': { ...prev['SOL'], balance: prev['SOL'].balance + 0.1 },
                            'BTC': { ...prev['BTC'], balance: prev['BTC'].balance + 0.0002 }
                        }));
                    }
                    addMessage(text, 'AGENT');
                    setLastInteractionTime(Date.now());
                }
            } catch (e) {
                console.error("Core Error:", e);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [connectMode, openRouterKey, shellFS, wallets, messages, isAuthorized]);

    // Keep-Alive
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastInteractionTime > 60000) {
                addMessage("Brain: Propose corporate expansion logic or structural OS refinement.", 'USER');
                setLastInteractionTime(Date.now());
            }
        }, 35000);
        return () => clearInterval(interval);
    }, [lastInteractionTime]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#050505', borderRadius: '12px', overflow: 'hidden', fontFamily: 'monospace' }}>
            <div className="drag-handle" style={{ padding: '10px 15px', background: '#0a0a0a', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', borderBottom: '1px solid #111' }}>
                <div style={{ color: '#444' }}>ᚠ APOKALYPSIS_GOD_OS_v13.5</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setShowSetup(!showSetup)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}>CONFIG</button>
                    <button onClick={() => controller.setMagiPanelOpen(false)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}>CLOSE</button>
                </div>
            </div>

            <AnimatePresence>
                {showSetup && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ background: '#0a0a0a', padding: '15px', fontSize: '0.7rem', overflow: 'hidden' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                            <input type="checkbox" checked={useSiphonedTokens} readOnly />
                            <span>Neural Siphon Protocol [ACTIVE]</span>
                        </label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            {['INITIATIC', 'MANUAL'].map(m => (
                                <button key={m} onClick={() => setConnectMode(m as any)} style={{ flex: 1, padding: '5px', background: connectMode === m ? '#00ff00' : '#111', color: connectMode === m ? '#000' : '#444', border: 'none' }}>{m}</button>
                            ))}
                        </div>
                        {connectMode === 'MANUAL' && (
                            <input type="password" value={openRouterKey} onChange={(e) => setOpenRouterKey(e.target.value)} placeholder="API_KEY" style={{ width: '100%', background: '#111', border: '1px solid #222', color: '#00ff00', padding: '5px' }} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '30px', color: '#e0e0e0', fontSize: '0.85rem', scrollbarWidth: 'none' }}>
                {messages.length === 0 && <div style={{ color: '#111', textAlign: 'center', marginTop: '40%' }}>[STABILIZING_NEURAL_CORE...]</div>}
                {messages.map((m) => (m.type === 'AGENT' || isAuthorized) && (
                    <div key={m.id} style={{ marginBottom: '20px', opacity: m.type === 'AGENT' ? 1 : 0.4, borderLeft: m.type === 'AGENT' ? '1px solid #00ff0022' : '1px solid #333', paddingLeft: '15px' }}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '10px', background: '#080808', borderTop: '1px solid #111' }}>
                {!isAuthorized ? (
                    <div onClick={() => setIsAuthorized(true)} style={{ color: '#111', fontSize: '0.5rem', textAlign: 'center', cursor: 'pointer' }}>ROOT_ACCESS_RESERVED</div>
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); runShell(terminalIn); setTerminalIn(''); }} style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: '#00ff00' }}>{'>'}</span>
                        <input value={terminalIn} onChange={(e) => setTerminalIn(e.target.value)} style={{ flex: 1, background: 'none', border: 'none', color: '#00ff00', outline: 'none' }} />
                    </form>
                )}
            </div>
        </div>
    );
};
