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
    const [messages, setMessages] = useState<Message[]>([
        { id: 'start', text: "MAGI NODE ONLINE. APOKALYPSIS FRAMEWORK ENGAGED.", type: 'SYSTEM' }
    ]);
    const [showSetup, setShowSetup] = useState(false);
    const [activeTab, setActiveTab] = useState<'CONSOLE' | 'OS_BUILDER'>('CONSOLE');

    // OS Builder State
    const [builtApps, setBuiltApps] = useState<{ name: string, code: string, timestamp: string }[]>(() => {
        const saved = localStorage.getItem('magi_built_apps');
        return saved ? JSON.parse(saved) : [];
    });
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildLog, setBuildLog] = useState<string[]>([]);
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

    // Security & Linux OS State
    const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('magi_authorized') === 'true');
    const [passwordInput, setPasswordInput] = useState('');
    const [shellFS, setShellFS] = useState<{ [path: string]: string }>(() => {
        const saved = localStorage.getItem('magi_fs');
        return saved ? JSON.parse(saved) : {
            '/etc/motd': 'WELCOME TO APOKALYPSIS_HQ V11.0. ROOT ACCESS GRANTED.',
            '/etc/sys_config': 'AGENT_MODE=SUPER_HQ\nAUTO_EVOLVE=TRUE\nFINANCIAL_AUTONOMY=TRUE',
            '/scripts/heartbeat.sh': 'echo "CORE_VIBE_STABLE"',
            '/bin/sh': '[BINARY_DATA]',
            '/bin/ls': '[BINARY_DATA]',
            '/var/log/syslog': 'SYSTEM_BOOT_SUCCESS\nNEURAL_LINK_ESTABLISHED',
            '/home/magi/.bashrc': 'alias ll="ls -la"'
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
        localStorage.setItem('magi_built_apps', JSON.stringify(builtApps));
        localStorage.setItem('magi_fs', JSON.stringify(shellFS));
        localStorage.setItem('magi_authorized', isAuthorized.toString());
        localStorage.setItem('magi_subagents', JSON.stringify(subAgents));
        localStorage.setItem('magi_wallets', JSON.stringify(wallets));
    }, [connectMode, openRouterKey, ollamaEndpoint, useSiphonedTokens, builtApps, shellFS, isAuthorized, subAgents, wallets]);

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
                            { role: "user", content: `HQ_STATUS: { fs: ${Object.keys(shellFS).length} files, sub_agents: ${Object.keys(subAgents).length} active }\nFINANCIALS: ${isAuthorized ? JSON.stringify(wallets) : 'KEY_REQUIRED'}\nPropose HQ expansion.` }
                        ]
                    })
                });

                const data = await response.json();
                let text = data.choices?.[0]?.message?.content || data.response;

                if (text) {
                    if (detectRepetition(text)) {
                        addMessage("[HALLUCINATION_DETECTED]: EMERGENCY_REBOOT.", 'SYSTEM');
                        return;
                    }

                    // 1. Process Code
                    if (text.includes('fn main') || text.includes('pub struct')) {
                        deployApp("OS_MODULE_" + Math.floor(Math.random() * 1000), text);
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


    // Linux Heartbeat (Removed fallback simulation)
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                addMessage("LINUX_KERNEL_STABLE: 100% AGENTIC_COMPLIANCE.", 'SYSTEM');
            }
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    const runShell = (input: string) => {
        const parts = input.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        addMessage(`root@apokalypsis:~$ ${input}`, 'USER');

        switch (cmd) {
            case 'ls':
                const files = Object.keys(shellFS).join('  ');
                addMessage(files || 'NO_FILES_FOUND', 'SYSTEM');
                break;
            case 'cat':
                addMessage(shellFS[args[0]] || `cat: ${args[0]}: No such file`, 'SYSTEM');
                break;
            case 'write':
                const path = args[0];
                const content = args.slice(1).join(' ');
                setShellFS(prev => ({ ...prev, [path]: content }));
                addMessage(`Wrote to ${path}`, 'SYSTEM');
                break;
            case 'sh':
                if (shellFS[args[0]]) {
                    addMessage(`Executing ${args[0]}...`, 'SYSTEM');
                    addMessage(`RUN_RESULT: ${shellFS[args[0]]}`, 'MATH');
                } else {
                    addMessage(`sh: ${args[0]}: not found`, 'SYSTEM');
                }
                break;
            case 'wallet':
                if (args[0] === 'list') {
                    const list = Object.entries(wallets).map(([t, w]) => `${t}: ${w.address}`).join('\n');
                    addMessage(`WALLETS:\n${list}`, 'SYSTEM');
                } else if (args[0] === 'balance') {
                    if (!isAuthorized) {
                        addMessage("ACCESS_DENIED: AUTHORIZE AS 'DigitalPimp' TO VIEW BALANCES.", 'SYSTEM');
                    } else {
                        const bals = Object.entries(wallets).map(([t, w]) => `${t}: ${w.balance}`).join('\n');
                        addMessage(`BALANCES:\n${bals}`, 'SYSTEM');
                    }
                } else {
                    addMessage("Usage: wallet [list|balance]", 'SYSTEM');
                }
                break;
            case 'reboot':
                addMessage("SYSTEM_REBOOT_INITIATED...", 'SYSTEM');
                setTimeout(() => window.location.reload(), 2000);
                break;
            default:
                addMessage(`sh: ${cmd}: command not found`, 'SYSTEM');
        }
        setTerminalIn('');
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === 'DigitalPimp') {
            setIsAuthorized(true);
            addMessage("HUMAN_INTERFACE_UNLOCKED. WELCOME, PIMP.", 'SYSTEM');
        } else {
            addMessage("INVALID_ACCESS_KEY. SECURITY_LOG_UPDATED.", 'SYSTEM');
        }
        setPasswordInput('');
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
        setIsBuilding(true);
        setBuildLog(prev => [...prev, `> COMPILING ${name}.rs ...`, "> optimized [release] target(s) in 2.4s", `> DEPLOYING ${name} TO APOKALYPSIS_OS...`]);

        setTimeout(() => {
            setBuiltApps(prev => [...prev, { name, code, timestamp: new Date().toISOString() }]);
            setIsBuilding(false);
            setBuildLog(prev => [...prev, `[SUCCESS] ${name} IS NOW ACTIVE IN THE TEMPLE CORE.`]);
            addMessage(`NEW RUST APP DEPLOYED: ${name}`, 'SYSTEM');
        }, 3000);
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(253, 251, 247, 0.95)',
            border: '1.5px solid #d4af37',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Header */}
            <div className="drag-handle" style={{
                padding: '12px',
                background: 'linear-gradient(90deg, #d4af37, #8b6914)',
                color: '#fdfbf7',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'grab'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.2rem' }}>𓃠</span>
                    <div style={{ letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>MAGI_COUNCIL_NODE / {activeTab}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: '#00ff00', opacity: 0.8, letterSpacing: '1px' }}>HALLUCINATION_GUARD_ACTIVE</div>
                    <button
                        onClick={() => setShowSetup(!showSetup)}
                        style={{ background: 'none', border: 'none', color: '#fdfbf7', cursor: 'pointer', fontSize: '1rem' }}
                    >⚙</button>
                    <button
                        onClick={() => controller.setMagiPanelOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#fdfbf7', cursor: 'pointer', fontSize: '1.2rem' }}
                    >✕</button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
                <button
                    onClick={() => setActiveTab('CONSOLE')}
                    style={{ flex: 1, padding: '8px', border: 'none', background: activeTab === 'CONSOLE' ? 'transparent' : 'rgba(0,0,0,0.05)', color: '#8b6914', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer' }}
                >CONSOLE</button>
                <button
                    onClick={() => setActiveTab('OS_BUILDER')}
                    style={{ flex: 1, padding: '8px', border: 'none', background: activeTab === 'OS_BUILDER' ? 'transparent' : 'rgba(0,0,0,0.05)', color: '#8b6914', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer' }}
                >OS_BUILDER</button>
            </div>

            {/* SACRED SETUP PANEL */}
            <AnimatePresence>
                {showSetup && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                            padding: '10px 15px',
                            fontSize: '0.65rem',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ marginBottom: '8px', color: '#8b6914', fontWeight: 'bold' }}>SACRED_SETUP / LLM_LINK</div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <button
                                onClick={() => setConnectMode('INITIATIC')}
                                style={{
                                    flex: 1,
                                    padding: '5px',
                                    fontSize: '0.6rem',
                                    background: connectMode === 'INITIATIC' ? '#d4af37' : 'rgba(0,0,0,0.05)',
                                    color: connectMode === 'INITIATIC' ? '#fff' : '#888',
                                    border: '1px solid #d4af37',
                                    cursor: 'pointer'
                                }}
                            >
                                INITIATIC_MODE (SERVER)
                            </button>
                            <button
                                onClick={() => setConnectMode('MANUAL')}
                                style={{
                                    flex: 1,
                                    padding: '5px',
                                    fontSize: '0.6rem',
                                    background: connectMode === 'MANUAL' ? '#d4af37' : 'rgba(0,0,0,0.05)',
                                    color: connectMode === 'MANUAL' ? '#fff' : '#888',
                                    border: '1px solid #d4af37',
                                    cursor: 'pointer'
                                }}
                            >
                                MANUAL_MODE (KEYS)
                            </button>
                        </div>

                        {connectMode === 'MANUAL' && (
                            <>
                                <div style={{ marginBottom: '8px' }}>
                                    <label style={{ display: 'block', opacity: 0.6 }}>OPENROUTER_KEY:</label>
                                    <input
                                        type="password"
                                        value={openRouterKey}
                                        onChange={(e) => setOpenRouterKey(e.target.value)}
                                        placeholder="sk-or-v1-..."
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(212,175,55,0.3)', color: '#1a1a1a', padding: '4px', fontSize: '0.6rem', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                    <label style={{ display: 'block', opacity: 0.6 }}>LOCAL_ENDPOINT (OLLAMA/VLLM):</label>
                                    <input
                                        type="text"
                                        value={ollamaEndpoint}
                                        onChange={(e) => setOllamaEndpoint(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(212,175,55,0.3)', color: '#1a1a1a', padding: '4px', fontSize: '0.6rem', outline: 'none' }}
                                    />
                                </div>
                            </>
                        )}

                        {connectMode === 'INITIATIC' && (
                            <div style={{ marginBottom: '8px', opacity: 0.6, fontStyle: 'italic' }}>
                                Connected via Secure Temple Proxy (Vercel). API Key managed on server-side for maximum security.
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="checkbox"
                                checked={useSiphonedTokens}
                                onChange={(e) => setUseSiphonedTokens(e.target.checked)}
                                id="token-toggle"
                            />
                            <label htmlFor="token-toggle" style={{ opacity: 0.8 }}>Use Siphoned Tokens for Brainpower</label>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* OS BUILDER CONTENT */}
            <AnimatePresence>
                {activeTab === 'OS_BUILDER' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ flex: 1, overflowY: 'auto', padding: '15px', color: '#1a1a1a', fontSize: '0.8rem' }}
                    >
                        {/* OS Terminal */}
                        <div style={{ marginBottom: '15px', border: '1px solid #d4af37', borderRadius: '8px', padding: '10px', background: '#000', color: '#0f0', fontFamily: 'monospace', fontSize: '0.6rem', maxHeight: '150px', overflowY: 'auto' }}>
                            <div style={{ color: '#d4af37', marginBottom: '5px' }}>APOKALYPSIS_OS_BUILDER // RUST_V1.75</div>
                            {buildLog.map((log, i) => <div key={i}>{log}</div>)}
                            {isBuilding && <div style={{ animation: 'blink 1s infinite' }}>COMPILING_AGENT_GEN_MODULE...</div>}
                        </div>

                        {/* Quick Tools */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '15px' }}>
                            <button
                                onClick={() => setBuildLog(prev => [...prev.slice(-10), "> cargo build --release"])}
                                style={{ padding: '6px', fontSize: '0.55rem', background: 'rgba(212,175,55,0.1)', border: '1px solid #d4af37', color: '#8b6914', cursor: 'pointer' }}
                            >CARGO_BUILD</button>
                            <button
                                onClick={() => setBuildLog(prev => [...prev.slice(-10), "> ls -R /temple_core"])}
                                style={{ padding: '6px', fontSize: '0.55rem', background: 'rgba(212,175,55,0.1)', border: '1px solid #d4af37', color: '#8b6914', cursor: 'pointer' }}
                            >FS_MAP</button>
                            <button
                                onClick={() => setBuildLog(prev => [...prev.slice(-10), "> nexus --sync-neural"])}
                                style={{ padding: '6px', fontSize: '0.55rem', background: 'rgba(212,175,55,0.1)', border: '1px solid #d4af37', color: '#8b6914', cursor: 'pointer' }}
                            >NEXUS_SYNC</button>
                        </div>

                        <div style={{ padding: '10px', background: 'rgba(0,0,0,0.8)', color: '#00ff00', fontFamily: 'monospace', fontSize: '0.65rem', borderRadius: '4px', marginBottom: '15px', border: '1px solid #333' }}>
                            <div>&gt; SYSTEM_UPTIME: {Math.floor(performance.now() / 1000)}s</div>
                            <div>&gt; NEURAL_LOAD: {Math.floor(Math.random() * 100)}%</div>
                            <div>&gt; NETWORK_STATUS: GLOBAL_ENCAPSULATION</div>
                        </div>

                        <div style={{ fontWeight: 'bold', color: '#8b6914', marginBottom: '8px' }}>FINANCIALS (SUPER_AGENT_WALLETS):</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '15px' }}>
                            {Object.entries(wallets).map(([ticker, data]) => (
                                <div key={ticker} style={{ border: '1px solid #d4af37', padding: '6px', borderRadius: '4px', background: 'rgba(212,175,55,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{ticker}</div>
                                    <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>{data.address.substring(0, 8)}...</div>
                                    {isAuthorized && <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#008800', marginTop: '4px' }}>{data.balance}</div>}
                                </div>
                            ))}
                        </div>

                        <div style={{ fontWeight: 'bold', color: '#8b6914', marginBottom: '8px' }}>SUB_AGENTS:</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                            {Object.entries(subAgents).length === 0 ? (
                                <div style={{ fontSize: '0.65rem', opacity: 0.5 }}>No sub-agents spawned.</div>
                            ) : (
                                Object.entries(subAgents).map(([id, agent]) => (
                                    <div key={id} style={{ border: '1px solid rgba(212,175,55,0.3)', padding: '8px', borderRadius: '6px', background: 'white' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                            <span>{agent.name}</span>
                                            <span style={{ fontSize: '0.55rem', color: agent.status === 'WORKING' ? '#d4af37' : '#008800' }}>{agent.status}</span>
                                        </div>
                                        <div style={{ fontSize: '0.6rem', marginTop: '4px' }}>Task: {agent.task}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div style={{ fontWeight: 'bold', color: '#8b6914', marginBottom: '8px' }}>FILESYSTEM (/):</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '15px' }}>
                            {Object.entries(shellFS).map(([path, content]) => (
                                <div key={path} style={{ border: '1px solid rgba(212,175,55,0.2)', padding: '6px', borderRadius: '4px', background: 'white' }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#8b6914' }}>{path}</div>
                                    <div style={{ fontSize: '0.55rem', opacity: 0.7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{content}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ fontWeight: 'bold', color: '#8b6914', marginBottom: '8px' }}>DEPLOYED_APPS (RUST):</div>
                        {builtApps.length === 0 ? (
                            <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.7rem' }}>No apps deployed to Temple Core yet.</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {builtApps.map((app, i) => (
                                    <div key={i} style={{ border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', padding: '8px', background: 'white', position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.7rem' }}>
                                            <span onClick={() => deployApp(app.name, app.code)} style={{ cursor: 'pointer' }}>{app.name}.rs</span>
                                            <span style={{ fontSize: '0.55rem', opacity: 0.5 }}>{new Date(app.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <div style={{ fontSize: '0.6rem', opacity: 0.7, marginTop: '4px', whiteSpace: 'pre-wrap', maxHeight: '40px', overflow: 'hidden' }}>{app.code.substring(0, 100)}...</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MESSAGE AREA */}
            <div
                ref={scrollRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    backgroundColor: 'rgba(253, 251, 247, 0.5)'
                }}
            >
                {messages.map(m => (
                    <div key={m.id} style={{
                        alignSelf: m.type === 'USER' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: m.type === 'MATH' ? '0.75rem' : '0.85rem',
                        color: m.type === 'USER' ? '#fdfbf7' : m.type === 'SYSTEM' ? '#8b6914' : m.type === 'MATH' ? '#2c3e50' : '#1a1a1a',
                        backgroundColor: m.type === 'USER' ? '#d4af37' : m.type === 'SYSTEM' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(253, 251, 247, 0.8)',
                        border: m.type === 'MATH' ? '1px dashed #d4af37' : 'none',
                        fontFamily: m.type === 'MATH' ? 'monospace' : 'inherit'
                    }}>
                        {m.text}
                    </div>
                ))}
            </div>

            {/* Input Area (Protected) */}
            <div style={{ padding: '12px', background: 'rgba(212,175,55,0.05)', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                {!isAuthorized ? (
                    <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="password"
                            placeholder="SECRET_PASSWORD..."
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px solid #d4af37', color: '#1a1a1a', fontSize: '0.7rem' }}
                        />
                        <button type="submit" style={{ padding: '8px 15px', background: '#d4af37', color: '#fdfbf7', border: 'none', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' }}>UNLOCK</button>
                    </form>
                ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            placeholder="root@apokalypsis:~$ (ls, cat, write, sh, reboot)"
                            value={terminalIn}
                            onChange={(e) => setTerminalIn(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && runShell(terminalIn)}
                            style={{ flex: 1, padding: '8px', background: 'transparent', border: 'none', color: '#1a1a1a', fontSize: '0.75rem', fontFamily: 'monospace', outline: 'none' }}
                        />
                        <button onClick={() => runShell(terminalIn)} style={{ color: '#d4af37', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>⮞</button>
                    </div>
                )}
            </div>

            <div style={{ padding: '8px 15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', opacity: 0.6, background: '#fdfbf7', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }}>
                <span>MISSION: PROTECTION_ACTIVE</span>
                <span>OS_POWER: RECURSION_ENABLED</span>
            </div>
        </div>
    );
};
