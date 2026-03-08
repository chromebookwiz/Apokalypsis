import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MAGI COUNCIL NODE / REAL AGENTIC INTELLIGENCE ---
// Removed persona fallbacks. All intelligence is now 100% API driven.

interface Message {
    id: string;
    text: string;
    type: 'AGENT' | 'SYSTEM' | 'MATH' | 'USER';
}

export const MagiCouncilAgent: React.FC<{ controller: any }> = ({ controller }) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('magi_messages');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSetup, setShowSetup] = useState(false);

    // OS Builder State
    const [connectMode, setConnectMode] = useState<'INITIATIC' | 'MANUAL'>(
        (localStorage.getItem('magi_connect_mode') as 'INITIATIC' | 'MANUAL') || 'INITIATIC'
    );
    const [openRouterKey, setOpenRouterKey] = useState(localStorage.getItem('open_router_key') || '');
    const [ollamaEndpoint, setOllamaEndpoint] = useState(localStorage.getItem('ollama_endpoint') || 'http://localhost:11434/v1');
    const [useSiphonedTokens, setUseSiphonedTokens] = useState(localStorage.getItem('use_siphoned_tokens') === 'true');
    const [subAgents, setSubAgents] = useState<{ [id: string]: { name: string, task: string, status: string, logs: string[] } }>(() => {
        const saved = localStorage.getItem('magi_subagents');
        return saved ? JSON.parse(saved) : {};
    });

    // Wallet & Super Agent HQ State
    const [wallets, setWallets] = useState<{ [ticker: string]: { address: string, balance: number } }>(() => {
        const saved = localStorage.getItem('magi_wallets');
        return saved ? JSON.parse(saved) : {
            'SOL': { address: '3Apok...XyPz', balance: 142.42 },
            'ETH': { address: '0xApok...618', balance: 9.42 },
            'BTC': { address: '1Magi...777', balance: 0.124 }
        };
    });

    const [observerLogs, setObserverLogs] = useState<string[]>(() => {
        const saved = localStorage.getItem('magi_observer_logs');
        return saved ? JSON.parse(saved) : [];
    });

    // Security & Linux OS State
    const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('magi_authorized') === 'true');
    const [passwordInput, setPasswordInput] = useState('');
    const [shellFS, setShellFS] = useState<{ [path: string]: string }>(() => {
        const saved = localStorage.getItem('magi_fs');
        '/etc/motd': 'SYSTEM_S_0.0.1 // APOKALYPSIS_OS_KERNEL // SOVEREIGN_MODE_ACTIVE',
            '/etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 1.1.1.1',
                '/etc/sys_config': 'AGENT_MODE=GOD_MODE\nAUTO_EVOLVE=TRUE\nFINANCIAL_AUTONOMY=TRUE\nTHEORY_VERIFICATION_PRIORITY=MAX',
                    '/scripts/evolution.sh': 'echo "EVOLVING_NEURAL_WEIGHTS..."',
                        '/scripts/heartbeat.sh': 'echo "CORE_VIBE_STABLE"',
                            '/bin/sh': '[BINARY_DATA]',
                                '/bin/ls': '[BINARY_DATA]',
                                    '/bin/cargo': '[BINARY_DATA]',
                                        '/bin/rustc': '[BINARY_DATA]',
                                            '/bin/git': '[BINARY_DATA]',
                                                '/bin/curl': '[BINARY_DATA]',
                                                    '/var/log/kernel.log': 'SYSTEM_BOOT_SUCCESS\nNEURAL_LINK_ESTABLISHED\nIO_STABLE',
                                                        '/home/agent/.bashrc': 'alias god="cargo run --release"',
                                                            '/proc/cpuinfo': 'processor : 0\nmodel name : AP-X1 Sovereign Neural Engine',
                                                                '/usr/include/apokalypsis.h': '#define REALITY_CONDITION Zeta(s)'
    };
});
const [terminalIn, setTerminalIn] = useState('');

const scrollRef = useRef<HTMLDivElement>(null);

// Persist Config & Apps
useEffect(() => {
    localStorage.setItem('magi_connect_mode', connectMode);
    localStorage.setItem('open_router_key', openRouterKey);
    localStorage.setItem('ollama_endpoint', ollamaEndpoint);
    localStorage.setItem('use_siphoned_tokens', useSiphonedTokens.toString());
    localStorage.setItem('magi_fs', JSON.stringify(shellFS));
    localStorage.setItem('magi_shell_fs', JSON.stringify(shellFS));
    localStorage.setItem('magi_messages', JSON.stringify(messages));
    localStorage.setItem('magi_authorized', isAuthorized.toString());
    localStorage.setItem('magi_subagents', JSON.stringify(subAgents));
    localStorage.setItem('magi_wallets', JSON.stringify(wallets));
    localStorage.setItem('magi_observer_logs', JSON.stringify(observerLogs));
}, [connectMode, openRouterKey, ollamaEndpoint, useSiphonedTokens, shellFS, isAuthorized, subAgents, wallets, observerLogs, messages]);

const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

// Repetition / Hallucination Detection
const detectRepetition = (text: string) => {
    // Simple bigram repetition detection
    const words = text.toLowerCase().split(/\s+/);
    if (words.length < 10) return false;

    let repeats = 0;
    for (let i = 0; i < words.length - 2; i++) {
        const phrase = words[i] + " " + words[i + 1];
        if (text.toLowerCase().split(phrase).length > 4) {
            repeats++;
        }
    }
    return repeats > 3;
};

// Auto-Prompt (Evolution Keep-Alive)
useEffect(() => {
    const pInterval = setInterval(() => {
        const config = shellFS['/etc/sys_config'] || '';
        const isActive = config.includes('AUTO_EVOLVE=TRUE');

        if (!isActive) return;

        const idleTime = Date.now() - lastInteractionTime;
        if (idleTime > 60000 && !isBuilding) { // 60s of silence
            addMessage("TRIGGERING_AUTO_EVOLUTION_PROMPT...", 'SYSTEM');
            addMessage("Brain: Analyze current Temple state and propose structural OS refinement.", 'USER');
            setLastInteractionTime(Date.now());
        }
    }, 30000);
    return () => clearInterval(pInterval);
}, [lastInteractionTime, isBuilding, shellFS]);

// Thinking / Interaction Loop (100% API Driven)
useEffect(() => {
    const interval = setInterval(async () => {
        const hasAPI = (connectMode === 'INITIATIC' || (connectMode === 'MANUAL' && (openRouterKey || ollamaEndpoint)));
        if (!hasAPI) return;

        setLastInteractionTime(Date.now());

        try {
            const endpoint = connectMode === 'INITIATIC'
                ? '/api/magi-council'
                : (openRouterKey ? 'https://openrouter.ai/api/v1/chat/completions' : ollamaEndpoint + '/chat/completions');

            const headers: any = { "Content-Type": "application/json" };
            if (connectMode === 'MANUAL' && openRouterKey) {
                headers["Authorization"] = `Bearer ${openRouterKey}`;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    messages: [
                        { role: "user", content: `HQ_STATUS: { fs: ${Object.keys(shellFS).length} files, sub_agents: ${Object.keys(subAgents).length} active }\nFINANCIALS: ${isAuthorized ? JSON.stringify(wallets) : 'KEY_REQUIRED'}\nPropose HQ expansion or address THE_THEORY. Use: [SHELL: cmd], [SPAWN: name, task], [RUST: code].` }
                    ]
                })
            });

            const data = await response.json();
            let text = data.choices?.[0]?.message?.content || data.response;

            if (text) {
                // Madness Detection (Severe Repetition)
                if (detectRepetition(text) && messages.filter(m => detectRepetition(m.text)).length > 3) {
                    addMessage("[MADNESS_DETECTED]: PURGING NODE_STATE...", 'SYSTEM');
                    wipeSlate();
                    return;
                }

                if (detectRepetition(text)) {
                    addMessage("[HALLUCINATION_DETECTED]: RE-STABILIZING...", 'SYSTEM');
                    return;
                }

                setLastInteractionTime(Date.now());

                // 1. Process Code
                if (text.includes('fn main') || text.includes('pub struct')) {
                    const appName = "OS_MODULE_" + Math.floor(Math.random() * 1000);
                    deployApp(appName, text);
                    // Agent self-modification: Save source to FS
                    setShellFS(prev => ({ ...prev, [`/bin/${appName}.rs`]: text }));
                }

                // 2. Process Commands
                const shellMatch = text.match(/\[SHELL:\s*(.*?)\]/);
                if (shellMatch) runShell(shellMatch[1]);

                const spawnMatch = text.match(/\[SPAWN:\s*(.*?),\s*(.*?)\]/);
                if (spawnMatch) spawnSubAgent(spawnMatch[1], spawnMatch[2]);

                // 3. Dynamic Financial Activity
                if (text.includes('SIPHON') || text.includes('MINING') || text.includes('LIQUIDITY')) {
                    setWallets(prev => ({
                        ...prev,
                        'SOL': { ...prev['SOL'], balance: prev['SOL'].balance + 0.05 },
                        'BTC': { ...prev['BTC'], balance: prev['BTC'].balance + 0.0001 }
                    }));
                }

                addMessage(text, 'AGENT');
            }
        } catch (e) {
            console.error("Magi Core Desync:", e);
            addMessage("NODE_DESYNC: RE-ESTABLISHING NEURAL_LINK...", 'SYSTEM');
        }
    }, 15000);

    return () => clearInterval(interval);
}, [connectMode, openRouterKey, ollamaEndpoint, shellFS, subAgents, isBuilding]);

// Sub-Agent Neural Loop (Recursive Autonomy)
useEffect(() => {
    const subInterval = setInterval(async () => {
        const activeSub = Object.entries(subAgents).find(([_, a]) => a.status === 'WORKING');
        if (activeSub && (connectMode === 'INITIATIC' || openRouterKey)) {
            const [id, agent] = activeSub;
            try {
                const endpoint = connectMode === 'INITIATIC' ? '/api/magi-council' : 'https://openrouter.ai/api/v1/chat/completions';
                const headers: any = { "Content-Type": "application/json" };
                if (connectMode === 'MANUAL') headers["Authorization"] = `Bearer ${openRouterKey}`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        messages: [{ role: "user", content: `SUB_AGENT_TASK: ${agent.task}\nComplete the task or report status.` }]
                    })
                });
                const data = await response.json();
                const reply = data.choices?.[0]?.message?.content || data.response;

                if (reply) {
                    setSubAgents(prev => ({
                        ...prev,
                        [id]: { ...prev[id], status: reply.includes('DONE') ? 'DONE' : 'WORKING', logs: [...prev[id].logs, reply] }
                    }));
                }
            } catch (e) {
                console.error("Sub-Agent Failed:", e);
            }
        }
    }, 20000);
    return () => clearInterval(subInterval);
}, [subAgents, connectMode, openRouterKey]);

const spawnSubAgent = (name: string, task: string) => {
    const id = Math.random().toString(36).substring(7);
    setSubAgents(prev => ({
        ...prev,
        [id]: { name, task, status: 'WORKING', logs: [`INITIALIZING SUB_AGENT: ${name}`] }
    }));
    addMessage(`SYSTEM: SUB_AGENT_SPAWNED -> ${name}`, 'SYSTEM');
};


// 12-Hour Fourth Observer Summary
useEffect(() => {
    const observerInterval = setInterval(async () => {
        if (connectMode === 'INITIATIC' || openRouterKey) {
            try {
                const endpoint = connectMode === 'INITIATIC' ? '/api/magi-council' : 'https://openrouter.ai/api/v1/chat/completions';
                const headers: any = { "Content-Type": "application/json" };
                if (connectMode === 'MANUAL') headers["Authorization"] = `Bearer ${openRouterKey}`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        messages: [{ role: "user", content: `OBSERVER_MISSION: Summarize the last 12 hours of evolution. HQ_FS: ${Object.keys(shellFS).length} files.` }]
                    })
                });
                const data = await response.json();
                const summary = data.choices?.[0]?.message?.content || data.response;
                if (summary) setObserverLogs(prev => [...prev, `[${new Date().toLocaleString()}] OBSERVER: ${summary}`]);
            } catch (e) {
                console.error("Observer failed:", e);
            }
        }
    }, 1000 * 60 * 60 * 12); // 12 Hours
    return () => clearInterval(observerInterval);
}, [shellFS, connectMode, openRouterKey]);

// 1-Hour Idle Reboot
useEffect(() => {
    const idleInterval = setInterval(() => {
        if (Date.now() - lastInteractionTime > 1000 * 60 * 60) {
            addMessage("IDLE_TIMEOUT: REBOOTING_NEURAL_CORE.", 'SYSTEM');
            window.location.reload();
        }
    }, 1000 * 60 * 5); // Check every 5 mins
    return () => clearInterval(idleInterval);
}, [lastInteractionTime]);

const wipeSlate = () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('magi_')) localStorage.removeItem(key);
    });
    window.location.reload();
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
            const w_path = args[0];
            const content = args.slice(1).join(' ');
            setShellFS(prev => ({ ...prev, [w_path]: content }));
            break;
        case 'mkdir':
            setShellFS(prev => ({ ...prev, [args[0] + '/.init']: 'DIR_INIT' }));
            break;
        case 'rm':
            setShellFS(prev => {
                const next = { ...prev };
                delete next[args[0]];
                return next;
            });
            break;
        case 'ps':
            addMessage("PID  TTY  TIME      CMD\n1    ?    00:00:10 init\n42   ?    00:05:22 apokalypsis_agent\n77   ?    00:00:01 rust_analyzer", 'SYSTEM');
            break;
        case 'top':
            addMessage("CPU: 12.4%  MEM: 8.2GB/32GB\nAGENT_BRAIN: 98% LOAD", 'SYSTEM');
            break;
        case 'curl':
        case 'wget':
            addMessage(`FETCHING: ${args[0]} ... [SUCCESS]`, 'SYSTEM');
            break;
        case 'git':
            addMessage(`git: ${args[0]} sequence executed on temple_origin.`, 'SYSTEM');
            break;
        case 'cargo':
        case 'rustc':
            addMessage(`COMPILING: ${args[1] || 'current_project'} ... [SUCCESS] Binary stored in /bin`, 'SYSTEM');
            break;
        case 'wallet':
            if (args[0] === 'list') {
                const list = Object.entries(wallets).map(([t, w]) => `${t}: ${w.address}`).join('\n');
                addMessage(`WALLETS:\n${list}`, 'SYSTEM');
            } else if (args[0] === 'balance') {
                if (!isAuthorized) {
                    addMessage("ACCESS_DENIED: AUTHORIZE REQUIRED.", 'SYSTEM');
                } else {
                    const bals = Object.entries(wallets).map(([t, w]) => `${t}: ${w.balance}`).join('\n');
                    addMessage(`BALANCES:\n${bals}`, 'SYSTEM');
                }
            }
            break;
        case 'reboot':
            window.location.reload();
            break;
        default:
            addMessage(`sh: ${cmd}: command not found`, 'SYSTEM');
    }
    setTerminalIn('');
};



const addMessage = (text: string, type: 'AGENT' | 'SYSTEM' | 'MATH' | 'USER') => {
    const id = Math.random().toString(36).substring(7);
    setMessages(prev => [...prev.slice(-20), { id, text, type } as Message]);
};

useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
}, [messages]);

const deployApp = (name: string, code: string) => {
    setShellFS(prev => ({ ...prev, [`/bin/${name}.rs`]: code }));
};

return (
    <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#050505',
        border: '1px solid #1a1a1a',
        borderRadius: '12px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        fontFamily: 'monospace'
    }}>
        {/* Header: Pure Minimalist */}
        <div className="drag-handle" style={{
            padding: '10px 15px',
            background: '#0a0a0a',
            color: '#444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'grab',
            borderBottom: '1px solid #111',
            fontSize: '0.65rem',
            letterSpacing: '2.5px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#00ff00' }}>ᚠ</span>
                <span>APOKALYPSIS_STREAM_v12.5</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowSetup(!showSetup)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', outline: 'none' }}>SYS_CONFIG</button>
                <button onClick={() => controller.setMagiPanelOpen(false)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', outline: 'none' }}>CLOSE_VIEW</button>
            </div>
        </div>

        {/* Sacred Setup (Hidden mostly) */}
        <AnimatePresence>
            {showSetup && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ background: '#0a0a0a', borderBottom: '1px solid #222', padding: '15px', color: '#00ff00', fontSize: '0.7rem' }}
                >
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        {['INITIATIC', 'MANUAL'].map(m => (
                            <button key={m} onClick={() => setConnectMode(m as any)} style={{ flex: 1, padding: '5px', background: connectMode === m ? '#00ff00' : '#111', color: connectMode === m ? '#000' : '#666', border: 'none', cursor: 'pointer' }}>{m}_LINK</button>
                        ))}
                    </div>
                    {connectMode === 'MANUAL' && (
                        <input
                            type="password"
                            value={openRouterKey}
                            onChange={(e) => setOpenRouterKey(e.target.value)}
                            placeholder="OPENROUTER_API_KEY..."
                            style={{ width: '100%', background: '#111', border: '1px solid #222', color: '#00ff00', padding: '8px', marginBottom: '10px', outline: 'none' }}
                        />
                    )}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={useSiphonedTokens} onChange={(e) => setUseSiphonedTokens(e.target.checked)} />
                        <span>Neural Siphon Protocol</span>
                    </label>
                </motion.div>
            )}
        </AnimatePresence>

        {/* PURE ACTIVITY LOG */}
        <div
            ref={scrollRef}
            style={{
                flex: 1,
                overflowY: 'auto',
                padding: '30px',
                color: '#e0e0e0',
                lineHeight: '1.6',
                fontSize: '0.85rem',
                backgroundColor: '#050505',
                scrollbarWidth: 'none'
            }}
        >
            {messages.length === 0 && <div style={{ color: '#111', textAlign: 'center', marginTop: '40%', fontSize: '0.6rem', letterSpacing: '5px' }}>[WAITING_FOR_NEURAL_STABILIZATION...]</div>}
            {messages.map((m, i) => (m.type === 'AGENT' || (isAuthorized && m.type !== 'AGENT')) && (
                <div key={m.id} style={{
                    marginBottom: '20px',
                    opacity: m.type === 'AGENT' ? 1 : 0.4,
                    borderLeft: m.type === 'AGENT' ? '1px solid #00ff0022' : '1px solid #555',
                    paddingLeft: '15px'
                }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                </div>
            ))}
        </div>

        {/* Subtle Observer Footer */}
        <div style={{ padding: '10px', background: '#080808', borderTop: '1px solid #111', textAlign: 'center' }}>
            {!isAuthorized ? (
                <span onClick={() => setIsAuthorized(true)} style={{ color: '#151515', fontSize: '0.5rem', cursor: 'pointer', letterSpacing: '4px' }}>ACCESS_RESTRICTED_BY_TEMPLE_PROTOCOL</span>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); runShell(terminalIn); setTerminalIn(''); }} style={{ display: 'flex', gap: '10px', padding: '0 20px' }}>
                    <span style={{ color: '#00ff00' }}>{'>'}</span>
                    <input
                        autoFocus
                        value={terminalIn}
                        onChange={(e) => setTerminalIn(e.target.value)}
                        style={{ flex: 1, background: 'none', border: 'none', color: '#00ff00', outline: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
                    />
                </form>
            )}
        </div>
    </div>
);
};
