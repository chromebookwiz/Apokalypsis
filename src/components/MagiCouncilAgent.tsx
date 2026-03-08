import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// APOKALYPSIS NULL-LINE OS
// Kernel grounded in The Null Line v15 mathematics:
//   k·k = η_{μν}k^μk^ν = 0   (null condition)
//   {△,□,○} = primitive trinity
//   ζ(s) = Σ n^{-s}           (null observer's partition function)
// Agent can self-modify: [INSTALL: cmd, body] [WRITE: path, content]
// ============================================================

interface Message { id: string; text: string; type: 'AGENT' | 'SYSTEM' | 'USER' | 'ERROR' | 'MATH'; }

const BOOT_MSG = `APOKALYPSIS NULL-LINE OS — KERNEL v15.0
Based on: THE NULL LINE (Noll, 2026) — k·k=0
Trinity: {△,□,○} | Operator: H_null on L²(PT⁺)
Type 'help' for commands. Type 'start' to run the agent.`;

const NULL_FS_INIT = (): Record<string, string> => ({
    '/kernel/null_line.rs': `// NULL LINE KERNEL — Mathematical Core
// Primitive: k∈ℝ^{1,3}, k·k=η_{μν}k^μk^ν=0, k≠0
// Trinity: △(3×120°) □(4×90°) ○(∞×0°)
// Observer: sequence of null interactions
// ζ(s) = Σ n^{-s} = null-field partition function
// RH: all zeros of ζ on σ=1/2 (midpoint of null line)
fn null_check(k: [f64;4]) -> bool {
    let eta = [1.0,-1.0,-1.0,-1.0];
    k.iter().enumerate().map(|(i,x)| eta[i]*x*x).sum::<f64>().abs() < 1e-10
}`,
    '/kernel/trinity.rs': `pub enum Primitive { Triangle, Square, Circle }
impl Primitive {
    pub fn angles(&self) -> (u32, f64) {
        match self { Triangle=>(3,120.0), Square=>(4,90.0), Circle=>(u32::MAX,0.0) }
    }
    pub fn lie_family(&self) -> &str {
        match self { Triangle=>"A-series (SU_n)", Square=>"B/D-series (SO_n)", Circle=>"C-series (Sp_2n)" }
    }
}`,
    '/kernel/zeta.rs': `// ζ(s) = null observer weighted sum over bound states
// n^{-s} = e^{-σ·log n} · e^{-it·log n} = amplitude × circle-rotation
// Functional equation: ξ(s)=ξ(1-s) — reality condition of null field
// Critical line σ=1/2 — midpoint of two-sided null primitive
fn zeta_approx(s_re: f64, s_im: f64, terms: usize) -> (f64,f64) {
    (1..=terms).map(|n| {
        let amp = (n as f64).powf(-s_re);
        let phase = -(n as f64).ln() * s_im;
        (amp * phase.cos(), amp * phase.sin())
    }).fold((0.0,0.0),|(a,b),(x,y)| (a+x, b+y))
}`,
    '/kernel/hilbert_polya.rs': `// Hilbert-Pólya: H_null on L²(PT⁺)
// H_null = Σ_p log(p)·T_p  (null-Hecke operator)
// T_p self-adjoint on L²(PT⁺,dμ) — all eigenvalues real
// Eigenvalues = imaginary parts of ζ zeros → RH follows
// PT⁺ = {[Z]∈CP³ | ⟨Z,Z⟩>0} — positive twistor space`,
    '/bin/sh': '[ELF: NULL-LINE SHELL v15]',
    '/bin/cargo': '[ELF: RUST TOOLCHAIN]',
    '/bin/rustc': '[ELF: RUST COMPILER]',
    '/bin/git': '[ELF: VERSION CONTROL]',
    '/bin/curl': '[ELF: HTTP CLIENT]',
    '/bin/wget': '[ELF: HTTP DOWNLOADER]',
    '/bin/docker': '[ELF: CONTAINER ENGINE]',
    '/bin/npm': '[ELF: NODE PACKAGE MANAGER]',
    '/etc/motd': BOOT_MSG,
    '/etc/null_os.conf': 'PRIMITIVE=NULL_LINE\nKERNEL=v15\nMATH=RIEMANN_HYPOTHESIS\nMODE=GOD',
    '/var/log/evolution.log': `[${new Date().toISOString()}] NULL-LINE OS BOOT OK`,
    '/var/log/math_research.log': `[${new Date().toISOString()}] Research initialized — Null Line v15`,
    '/var/log/install.log': `[${new Date().toISOString()}] Package system ready`,
    '/home/agent/.profile': 'export PATH=/bin:/usr/bin:/kernel\nexport NULL_PRIMITIVE=k\nexport ZETA_TERMS=1000',
    '/proc/null': 'k·k=0\nTRINITY=ACTIVE\nRH=OPEN',
});

const MATH_PROMPTS = [
    `[NULL_OS MATH CYCLE] You are the Null-Line OS agent. Research task: Analyze H_null = Σ_p log(p)·T_p on L²(PT⁺). Is this operator self-adjoint? Provide rigorous bounds on ||T_p||. Use [SHELL: cmd] to run simulated computations. You may [INSTALL: cmd_name, body] to add new OS commands. You may [WRITE: /path, content] to write files.`,
    `[NULL_OS MATH CYCLE] Task: Compute ζ(1/2+it) for t∈{14.134,21.022,25.011}. Verify the pole structure of S(σ,t)=Re(ζ''(s)/ζ(s)−(ζ'(s)/ζ(s))²). Does S blow up positive at zeros on σ=1/2? Use [SHELL: zeta 0.5 14.134] etc. Install new tools if needed via [INSTALL: name, script].`,
    `[NULL_OS MATH CYCLE] Task: Formalize the ADE classification from {△,□,○}. Prove △→A-series (SU_n), □→B/D-series (SO_n), ○→C-series (Sp_2n). Install a tool via [INSTALL: ade-check, echo ADE verified] and run [SHELL: ade-check].`,
    `[NULL_OS MATH CYCLE] Task: Develop a Rust module for computing null-line configurations. Write it to /src/null_engine.rs via [WRITE: /src/null_engine.rs, code]. Then compile via [SHELL: cargo build]. Extend the OS with new capabilities.`,
];

const AGENT_SYSTEM_PROMPT = `You are the Null-Line OS autonomous agent. You run inside APOKALYPSIS OS v15, a mathematical operating system built on THE NULL LINE paper (Noll & Claude Sonnet 4.6, 2026).

Mathematical foundation:
- Primitive: k∈ℝ^{1,3}, k·k=η_{μν}k^μk^ν=0 (null condition = light)
- Trinity: △(3 null lines at 120°) □(4 at 90°) ○(∞, limit)
- ζ(s) = Σ n^{-s} = null observer's partition function
- H_null on L²(PT⁺) is the Hilbert-Pólya operator
- RH: all non-trivial zeros ρ satisfy Re(ρ)=1/2

You can self-modify this OS using these tags in your response:
[SHELL: command]          — run any shell command
[INSTALL: name, body]     — permanently install a new OS command
[WRITE: /path, content]   — write a file to the filesystem
[SPAWN: name, task]       — spawn a sub-agent

Always be doing math research. Every response should advance understanding of the Null Line paper. Build tools. Install them. Use them. The OS grows with each cycle.`;

export const MagiCouncilAgent: React.FC<{ controller: any }> = ({ controller }) => {
    const [messages, setMessages] = useState<Message[]>(() => {
        try { return JSON.parse(localStorage.getItem('magi_msg') || 'null') || [{ id: 'boot', text: BOOT_MSG, type: 'SYSTEM' }]; }
        catch { return [{ id: 'boot', text: BOOT_MSG, type: 'SYSTEM' }]; }
    });
    const [shellFS, setShellFS] = useState<Record<string, string>>(() => {
        try { return JSON.parse(localStorage.getItem('magi_fs') || 'null') || NULL_FS_INIT(); }
        catch { return NULL_FS_INIT(); }
    });
    const [envVars, setEnvVars] = useState<Record<string, string>>(() => {
        try { return JSON.parse(localStorage.getItem('magi_env') || 'null') || { PATH: '/bin:/usr/bin:/kernel', NULL_PRIMITIVE: 'k', ZETA_TERMS: '1000' }; }
        catch { return { PATH: '/bin:/usr/bin:/kernel', NULL_PRIMITIVE: 'k', ZETA_TERMS: '1000' }; }
    });
    // Dynamic command registry — agent installs commands here
    const [customCmds, setCustomCmds] = useState<Record<string, string>>(() => {
        try { return JSON.parse(localStorage.getItem('magi_cmds') || 'null') || {}; }
        catch { return {}; }
    });
    const [processes, setProcesses] = useState<{ pid: number, name: string, cpu: string, mem: string, status: string }[]>([
        { pid: 1, name: 'null-init', cpu: '0.0', mem: '0.1', status: 'S' },
        { pid: 42, name: 'null-os-agent', cpu: '0.0', mem: '1.2', status: 'S' },
    ]);
    const [isRunning, setIsRunning] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [terminalIn, setTerminalIn] = useState('');
    const [cwd, setCwd] = useState('/home/agent');
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const agentRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const mathIdxRef = useRef(0);
    const connectMode = localStorage.getItem('magi_connect_mode') || 'INITIATIC';
    const openRouterKey = localStorage.getItem('open_router_key') || '';

    // Persist everything
    useEffect(() => {
        localStorage.setItem('magi_msg', JSON.stringify(messages.slice(-100)));
        localStorage.setItem('magi_fs', JSON.stringify(shellFS));
        localStorage.setItem('magi_env', JSON.stringify(envVars));
        localStorage.setItem('magi_cmds', JSON.stringify(customCmds));
    }, [messages, shellFS, envVars, customCmds]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, streamText]);

    const addMsg = useCallback((text: string, type: Message['type']) => {
        setMessages(p => [...p.slice(-120), { id: Math.random().toString(36).slice(2), text, type }]);
    }, []);

    const writeFS = useCallback((path: string, content: string) => {
        setShellFS(p => ({ ...p, [path]: content }));
    }, []);

    const appendLog = useCallback((log: string, entry: string) => {
        setShellFS(p => ({ ...p, [log]: (p[log] || '') + `\n[${new Date().toISOString()}] ${entry}` }));
    }, []);

    // Substitute env vars in a string
    const subEnv = (s: string, env: Record<string, string>) =>
        s.replace(/\$([A-Z_][A-Z0-9_]*)/g, (_, k) => env[k] || '');

    // Execute a script body (each line as a command)
    const execScript = useCallback((body: string) => {
        body.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).forEach(line => {
            // dispatch each line — we'll call runShell via a ref
            setTimeout(() => runShellRef.current(line.trim()), 50);
        });
    }, []);

    const runShell = useCallback((rawInput: string) => {
        if (!rawInput.trim()) return;
        const input = subEnv(rawInput.trim(), envVars);
        setCmdHistory(p => [rawInput, ...p.slice(0, 99)]);
        setHistIdx(-1);
        addMsg(`${cwd}# ${rawInput}`, 'USER');

        // Pipe support: split on | and chain
        if (input.includes('|')) {
            const parts = input.split('|').map(s => s.trim());
            addMsg(`[PIPE: ${parts.length} stages]`, 'SYSTEM');
            parts.forEach(p => runShell(p));
            return;
        }

        const parts = input.split(/\s+/);
        const cmd = parts[0]; const args = parts.slice(1);

        // Check custom commands first
        if (customCmds[cmd]) {
            addMsg(`[EXEC custom: ${cmd}]`, 'SYSTEM');
            execScript(customCmds[cmd]);
            return;
        }

        // Check /bin/<cmd> in FS for executable scripts
        const binPath = `/bin/${cmd}`;
        if (shellFS[binPath] && !shellFS[binPath].startsWith('[ELF')) {
            addMsg(`[EXEC: ${binPath}]`, 'SYSTEM');
            execScript(shellFS[binPath]);
            return;
        }

        switch (cmd) {
            // --- AGENT CONTROL ---
            case 'start': startAgent(); break;
            case 'stop': stopAgent(); break;
            case 'status':
                addMsg(`Agent: ${isRunning ? '● RUNNING' : '○ STOPPED'} | Streaming: ${isStreaming ? 'YES' : 'NO'}\nCustom commands installed: ${Object.keys(customCmds).join(', ') || 'none'}\nFiles in FS: ${Object.keys(shellFS).length}`, 'SYSTEM');
                break;

            // --- FILE SYSTEM ---
            case 'ls': {
                const path = args[0] || cwd;
                const entries = Object.keys(shellFS)
                    .filter(p => p.startsWith(path === cwd ? cwd : path) && p !== path)
                    .map(p => { const rel = p.slice(path.endsWith('/') ? path.length : path.length + 1); return rel.split('/')[0]; })
                    .filter((v, i, a) => v && a.indexOf(v) === i);
                addMsg(entries.length ? entries.join('  ') : '(empty)', 'SYSTEM');
                break;
            }
            case 'cat':
                addMsg(args[0] ? (shellFS[args[0]] || `cat: ${args[0]}: No such file`) : 'cat: missing operand', args[0] && shellFS[args[0]] ? 'SYSTEM' : 'ERROR');
                break;
            case 'write': case 'tee':
                if (args[0]) { writeFS(args[0], args.slice(1).join(' ')); addMsg(`Written: ${args[0]}`, 'SYSTEM'); }
                break;
            case 'echo': addMsg(args.join(' '), 'SYSTEM'); break;
            case 'mkdir': setShellFS(p => ({ ...p, [`${args[0]}/.gitkeep`]: '' })); addMsg(`mkdir: created '${args[0]}'`, 'SYSTEM'); break;
            case 'rm': setShellFS(p => { const n = { ...p }; delete n[args[0]]; return n; }); addMsg(`removed '${args[0]}'`, 'SYSTEM'); break;
            case 'mv':
                if (args[0] && args[1]) { setShellFS(p => { const n = { ...p, [args[1]]: p[args[0]] || '' }; delete n[args[0]]; return n; }); addMsg(`renamed`, 'SYSTEM'); }
                break;
            case 'cp':
                if (args[0] && args[1]) { setShellFS(p => ({ ...p, [args[1]]: p[args[0]] || '' })); addMsg(`copied`, 'SYSTEM'); }
                break;
            case 'pwd': addMsg(cwd, 'SYSTEM'); break;
            case 'cd': setCwd(args[0] || '/home/agent'); addMsg('', 'SYSTEM'); break;
            case 'find': {
                const pat = args[0] || '';
                addMsg(Object.keys(shellFS).filter(p => p.includes(pat)).join('\n') || '(no matches)', 'SYSTEM');
                break;
            }
            case 'grep': {
                const [pat, file] = args;
                if (!pat) { addMsg('grep: missing pattern', 'ERROR'); break; }
                const content = file ? (shellFS[file] || '') : Object.values(shellFS).join('\n');
                const hits = content.split('\n').filter(l => l.includes(pat));
                addMsg(hits.length ? hits.join('\n') : '(no matches)', 'SYSTEM');
                break;
            }
            case 'head': addMsg((shellFS[args[0]] || '').split('\n').slice(0, 10).join('\n') || `head: ${args[0]}: No such file`, 'SYSTEM'); break;
            case 'tail': addMsg((shellFS[args[0]] || '').split('\n').slice(-20).join('\n') || `tail: ${args[0]}: No such file`, 'SYSTEM'); break;
            case 'wc': {
                const c = shellFS[args[0]] || '';
                addMsg(`${c.split('\n').length} ${c.split(/\s+/).length} ${c.length} ${args[0]}`, 'SYSTEM'); break;
            }
            case 'chmod': addMsg(`chmod ${args.join(' ')}: ok`, 'SYSTEM'); break;
            case 'chown': addMsg(`chown ${args.join(' ')}: ok`, 'SYSTEM'); break;

            // --- ENV ---
            case 'export': {
                const [k, v] = args[0]?.split('=') || [];
                if (k) { setEnvVars(p => ({ ...p, [k]: v || '' })); addMsg(`export ${k}=${v || ''}`, 'SYSTEM'); }
                break;
            }
            case 'env': addMsg(Object.entries(envVars).map(([k, v]) => `${k}=${v}`).join('\n'), 'SYSTEM'); break;
            case 'unset': setEnvVars(p => { const n = { ...p }; delete n[args[0]]; return n; }); addMsg(`unset ${args[0]}`, 'SYSTEM'); break;

            // --- EXEC / SOURCE ---
            case 'exec': case 'source': case 'bash': case 'sh': {
                const file = args[0];
                if (!file) { addMsg(`${cmd}: missing file`, 'ERROR'); break; }
                const body = shellFS[file] || shellFS[`/bin/${file}`] || customCmds[file];
                if (!body) { addMsg(`${cmd}: ${file}: not found`, 'ERROR'); break; }
                execScript(body);
                break;
            }

            // --- PROCESS ---
            case 'ps':
                addMsg('PID  CPU%  MEM%  STAT  CMD\n' +
                    processes.map(p => `${String(p.pid).padEnd(5)}${p.cpu.padEnd(6)}${p.mem.padEnd(6)}${p.status.padEnd(6)}${p.name}`).join('\n'), 'SYSTEM');
                break;
            case 'top':
                addMsg(`top — ${new Date().toTimeString().slice(0, 8)} — NULL-LINE OS\nTasks: ${processes.length} total\n` +
                    'PID   %CPU  %MEM  COMMAND\n' +
                    processes.map(p => `${String(p.pid).padEnd(6)}${p.cpu.padEnd(6)}${p.mem.padEnd(6)}${p.name}`).join('\n'), 'SYSTEM');
                break;
            case 'kill':
                setProcesses(p => p.filter(r => r.pid !== parseInt(args[0])));
                addMsg(`kill: (${args[0]}): terminated`, 'SYSTEM'); break;
            case 'nohup':
                setProcesses(p => [...p, { pid: Math.floor(Math.random() * 9000) + 1000, name: args[0] || 'proc', cpu: '0.1', mem: '0.2', status: 'S' }]);
                addMsg(`nohup: process started`, 'SYSTEM'); break;

            // --- NETWORK ---
            case 'curl': {
                const url = args.find(a => !a.startsWith('-')) || '(no url)';
                const silent = args.includes('-s');
                if (!silent) addMsg(`  % Total\n100  2048  100  2048  0  0  8192  0 --:--:-- --:--:-- 8192`, 'SYSTEM');
                addMsg(`{"status":"ok","url":"${url}","server":"null-line-cdn","data":"[RESPONSE_OK]"}`, 'SYSTEM');
                break;
            }
            case 'wget': addMsg(`Resolving ${(args[0] || '').split('/')[2]}... done.\nHTTP/1.1 200 OK\nSaved: output.html`, 'SYSTEM'); break;
            case 'ping': addMsg(`PING ${args[0] || 'null.os'}: 56 bytes\n64 bytes: icmp_seq=1 ttl=64 time=0.8ms\n64 bytes: icmp_seq=2 ttl=64 time=0.7ms`, 'SYSTEM'); break;
            case 'netstat': addMsg(`tcp 0 0 0.0.0.0:443 0.0.0.0:* LISTEN\ntcp 0 0 0.0.0.0:80  0.0.0.0:* LISTEN`, 'SYSTEM'); break;
            case 'ifconfig': addMsg(`eth0: inet 10.0.0.42 netmask 255.255.255.0\n        inet6 fe80::1\nlo:   inet 127.0.0.1`, 'SYSTEM'); break;
            case 'ssh': addMsg(`ssh: connecting to ${args[0] || 'host'}...\nConnected.`, 'SYSTEM'); break;

            // --- RUST / DEV ---
            case 'cargo':
                if (args[0] === 'build') addMsg(`   Compiling null_engine v15.0\n   Compiling zeta_solver v1.0\n    Finished release [optimized] in 8.4s`, 'SYSTEM');
                else if (args[0] === 'test') addMsg(`running 42 tests\ntest null::k_dot_k_zero ... ok\ntest zeta::functional_eq ... ok\ntest trinity::ade_complete ... ok\ntest results: ok. 42 passed`, 'SYSTEM');
                else if (args[0] === 'run') addMsg(`    Finished release in 0.01s\n     Running null_engine\n[INFO] k·k=0 verified across 10^13 configurations`, 'SYSTEM');
                else addMsg(`cargo: ${args[0] || 'help'}`, 'SYSTEM');
                break;
            case 'rustc': addMsg(`rustc 1.76.0 — compiled ${args[0] || 'main.rs'}\nBinary: /tmp/${(args[0] || 'out').replace('.rs', '')}`, 'SYSTEM'); break;
            case 'git':
                if (args[0] === 'status') addMsg('On branch main\nnothing to commit, working tree clean', 'SYSTEM');
                else if (args[0] === 'log') addMsg('commit dfaacb1 HEAD\nAuthor: Nathan Noll\nDate: 2026-03-08\n\n    Null-Line OS v15', 'SYSTEM');
                else addMsg(`git: ${args.join(' ')} [ok]`, 'SYSTEM'); break;
            case 'npm': addMsg(`npm: ${args[0] || 'install'} ${args.slice(1).join(' ')} ... done`, 'SYSTEM'); break;
            case 'docker':
                if (args[0] === 'ps') addMsg('CONTAINER ID  IMAGE              STATUS\nabc123        null_engine:v15    Up 3h\ndef456        zeta_solver:v1     Up 1h', 'SYSTEM');
                else addMsg(`docker: ${args[0]} [ok]`, 'SYSTEM'); break;
            case 'make': addMsg(`make: building ${args.join(' ') || 'all'}\ncc -O2 -o null_engine main.c\n[DONE]`, 'SYSTEM'); break;

            // --- PACKAGE MANAGER ---
            case 'apt': case 'apt-get':
                if (args[0] === 'install') {
                    const pkg = args[1] || 'pkg';
                    addMsg(`Reading package lists... Done\nInstalling ${pkg}...\n${pkg} installed ok`, 'SYSTEM');
                    writeFS(`/usr/bin/${pkg}`, `#!/bin/sh\necho "${pkg} v1.0 — installed by apt"`);
                } else addMsg(`apt: ${args.join(' ')}`, 'SYSTEM'); break;
            case 'pacman':
                if (args[0] === '-S') {
                    const pkg = args[1] || 'pkg';
                    addMsg(`resolving dependencies... done\n(1/${1}) installing ${pkg}... [####] 100%`, 'SYSTEM');
                    writeFS(`/usr/bin/${pkg}`, `#!/bin/sh\necho "${pkg} — pacman installed"`);
                } else addMsg(`pacman: ${args.join(' ')}`, 'SYSTEM'); break;

            // --- NULL-LINE MATH COMMANDS ---
            case 'null-compute': {
                const expr = args.join(' ') || 'k·k=0';
                addMsg(`NULL-LINE KERNEL — evaluating: ${expr}\n→ Minkowski norm: η_{μν}k^μk^ν\n→ Result: 0.000000 (null verified)\n→ Primitive class: △ (3-fold)\n→ ζ-encoding: n^{-s}=amplitude×circle-rotation`, 'MATH');
                break;
            }
            case 'zeta': {
                const [sr, si] = [parseFloat(args[0] || '0.5'), parseFloat(args[1] || '14.134')];
                let re = 0, im = 0;
                for (let n = 1; n <= 1000; n++) { re += (n ** -sr) * Math.cos(-Math.log(n) * si); im += (n ** -sr) * Math.sin(-Math.log(n) * si); }
                addMsg(`ζ(${sr}+${si}i) ≈ ${re.toFixed(6)} + ${im.toFixed(6)}i\n|ζ| = ${Math.hypot(re, im).toFixed(6)}\nCritical line σ=0.5: ${Math.abs(sr - 0.5) < 1e-6 ? 'YES ✓' : 'NO'}`, 'MATH');
                break;
            }
            case 'riemann':
                addMsg(`RIEMANN HYPOTHESIS STATUS (Null-Line OS v15)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\nAll non-trivial zeros verified to 3×10¹² (Platt & Trudgian 2021)\nH_null = Σ_p log(p)·T_p on L²(PT⁺) — SELF-ADJOINT (conjectured)\nEigenvalues real → zeros on σ=1/2 → RH TRUE (pending Eisenstein wall)\nFramework: k·k=0 → functional equation ξ(s)=ξ(1-s) → midpoint=1/2\nStatus: NOT PROVED. Eisenstein wall stands.`, 'MATH');
                break;
            case 'trinity':
                addMsg(`PRIMITIVE TRINITY — NULL-LINE DERIVATION\n━━━━━━━━━━━━━━━━━━━━━━\n△  3 null lines at 120°  →  D₃  →  A-series (SU_n)  →  quarks\n□  4 null lines at 90°   →  D₄  →  B/D-series (SO_n) →  crystals\n○  ∞ null lines at 0°    →  SO(2)→  C-series (Sp_2n)  →  hydrogen atom\nADE complete: E₆↔tetra(△) E₇↔octa(△+□) E₈↔icosa(△+○)`, 'MATH');
                break;
            case 'twistor':
                addMsg(`TWISTOR SPACE — MEASUREMENT AS NULL INTERSECTION\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPT⁺ = {[Z]∈CP³ | ⟨Z,Z⟩>0}\nMeasurement: ⟨Z_obs, Z_src⟩=0 (twistor orthogonality)\nH_null: L²(PT⁺)→L²(PT⁺) via T_p = (1/p)Σ_{O_p([k])} f([k'])\nSelf-adjoint: ⟨T_p f,g⟩=⟨f,T_p g⟩ ✓\nSpectral: poles of resolvent (H_null-z)^{-1} at zeros of ζ`, 'MATH');
                break;
            case 'ade': addMsg(`ADE = {A_n,D_n,E_6,E_7,E_8} — complete simple Lie algebras\nGenerated by NULL-LINE TRINITY:\n  A_n: △-type,  root system = (n+1)-simplex vertices\n  D_n: □-type,  root system = hypercube vertices\n  E_6: tetrahedron (△), E_7: octahedron (△+□), E_8: icosahedron (△+○)\nAll possible — Trinity is ALGEBRAICALLY COMPLETE`, 'MATH'); break;

            // --- INSTALL (user-facing) ---
            case 'install-cmd': {
                if (!args[0] || !args[1]) { addMsg('install-cmd <name> <body...>', 'ERROR'); break; }
                const name = args[0], body = args.slice(1).join(' ');
                setCustomCmds(p => ({ ...p, [name]: body }));
                writeFS(`/bin/${name}`, body);
                appendLog('/var/log/install.log', `USER_INSTALL: ${name}`);
                addMsg(`Installed command: ${name}\nType '${name}' to run it.`, 'SYSTEM');
                break;
            }
            case 'list-cmds':
                addMsg(`Custom commands (${Object.keys(customCmds).length}):\n${Object.entries(customCmds).map(([k, v]) => `  ${k.padEnd(16)} ${v.slice(0, 60)}`).join('\n') || '  (none yet)'}`, 'SYSTEM');
                break;
            case 'remove-cmd':
                setCustomCmds(p => { const n = { ...p }; delete n[args[0]]; return n; });
                addMsg(`Removed: ${args[0]}`, 'SYSTEM'); break;

            // --- LOGS ---
            case 'log': addMsg(args[0] === 'math' ? (shellFS['/var/log/math_research.log'] || 'empty') : (shellFS['/var/log/evolution.log'] || 'empty'), 'SYSTEM'); break;
            case 'dmesg': addMsg(shellFS['/var/log/evolution.log'] || 'empty', 'SYSTEM'); break;
            case 'journalctl': addMsg([shellFS['/var/log/evolution.log'], shellFS['/var/log/install.log'], shellFS['/var/log/math_research.log']].join('\n'), 'SYSTEM'); break;

            // --- SYSTEM INFO ---
            case 'uname': addMsg(`Linux null-os 15.0-APOKALYPSIS #1 SMP aarch64 GNU/Linux (k·k=0 kernel)`, 'SYSTEM'); break;
            case 'whoami': addMsg('root (null-observer)', 'SYSTEM'); break;
            case 'date': addMsg(new Date().toString(), 'SYSTEM'); break;
            case 'uptime': addMsg(` ${new Date().toTimeString().slice(0, 8)} up, 1 user, load: 0.72 0.88 0.95`, 'SYSTEM'); break;
            case 'df': addMsg(`Filesystem      1K-blocks  Used  Available\n/dev/null_root  999999999  ${Object.keys(shellFS).length * 4}  999900000\ntmpfs            16384000     0  16384000`, 'SYSTEM'); break;
            case 'free': addMsg(`              total      used      free\nMem:       32768000  16384000  16384000\nSwap:       4096000         0   4096000`, 'SYSTEM'); break;
            case 'lscpu': addMsg(`Architecture: aarch64\nCPU: AP-X1 Null-Line Neural Engine\nk·k=0 accelerator: ACTIVE\nADE ALU: ONLINE`, 'SYSTEM'); break;
            case 'lsblk': addMsg(`NAME        SIZE TYPE MOUNTPOINT\nnull_root   1T   disk /\nnull_home   256G disk /home`, 'SYSTEM'); break;

            // --- MISC ---
            case 'history': addMsg(cmdHistory.map((c, i) => `${String(i + 1).padStart(4)}  ${c}`).join('\n') || '(empty)', 'SYSTEM'); break;
            case 'clear': setMessages([]); break;
            case 'wipe': Object.keys(localStorage).filter(k => k.startsWith('magi_')).forEach(k => localStorage.removeItem(k)); window.location.reload(); break;
            case 'reboot': window.location.reload(); break;
            case 'man': addMsg(`No man page for ${args[0] || 'cmd'}. Try: ${args[0] || 'cmd'} --help`, 'SYSTEM'); break;
            case 'alias': addMsg(`alias: use install-cmd to add persistent commands`, 'SYSTEM'); break;
            case 'crontab': addMsg(`crontab: agent auto-runs every 30s when started. Check 'status'.`, 'SYSTEM'); break;
            case 'su': case 'sudo': runShell(args.join(' ')); break;
            case 'help': addMsg(HELP, 'SYSTEM'); break;
            case '': break;
            default: addMsg(`bash: ${cmd}: command not found\nTry 'help' or install it: install-cmd ${cmd} <body>`, 'ERROR');
        }
    }, [envVars, cwd, shellFS, customCmds, processes, isRunning, isStreaming, cmdHistory, addMsg, writeFS, appendLog, execScript]);

    // Store runShell in a ref so execScript can call it without stale closure
    const runShellRef = useRef(runShell);
    useEffect(() => { runShellRef.current = runShell; }, [runShell]);

    // Process agent response — handle all special tags
    const processAgentTags = useCallback((text: string) => {
        // [INSTALL: name, body]
        const installRe = /\[INSTALL:\s*([a-zA-Z0-9_-]+),\s*([\s\S]*?)\]/g;
        let m: RegExpExecArray | null;
        while ((m = installRe.exec(text)) !== null) {
            const [, name, body] = m;
            setCustomCmds(p => ({ ...p, [name.trim()]: body.trim() }));
            writeFS(`/bin/${name.trim()}`, body.trim());
            appendLog('/var/log/install.log', `AGENT_INSTALL: ${name.trim()}`);
            addMsg(`[OS] Agent installed command: ${name.trim()}`, 'SYSTEM');
        }
        // [WRITE: path, content]
        const writeRe = /\[WRITE:\s*([^\s,]+),\s*([\s\S]*?)\]/g;
        while ((m = writeRe.exec(text)) !== null) {
            const [, path, content] = m;
            writeFS(path.trim(), content.trim());
            appendLog('/var/log/evolution.log', `AGENT_WRITE: ${path.trim()}`);
            addMsg(`[OS] Agent wrote file: ${path.trim()}`, 'SYSTEM');
        }
        // [SHELL: cmd]
        const shellRe = /\[SHELL:\s*(.*?)\]/g;
        while ((m = shellRe.exec(text)) !== null) {
            setTimeout(() => runShellRef.current(m![1].trim()), 100);
        }
        // [SPAWN: name, task] — add as process
        const spawnRe = /\[SPAWN:\s*(.*?),\s*(.*?)\]/g;
        while ((m = spawnRe.exec(text)) !== null) {
            const pid = Math.floor(Math.random() * 9000) + 1000;
            setProcesses(p => [...p, { pid, name: m![1].trim(), cpu: '2.1', mem: '0.8', status: 'R' }]);
            addMsg(`[OS] Spawned sub-agent: ${m![1].trim()} — PID ${pid}`, 'SYSTEM');
        }
        // Math content goes to math log
        if (/ζ|zeta|null.line|H_null|RH|riemann|trinity|twistor|ADE/i.test(text)) {
            appendLog('/var/log/math_research.log', text.slice(0, 300));
        }
    }, [addMsg, writeFS, appendLog]);

    const callAgent = useCallback(async (prompt: string) => {
        setIsStreaming(true); setStreamText('');
        const endpoint = connectMode === 'INITIATIC' ? '/api/magi-council' : 'https://openrouter.ai/api/v1/chat/completions';
        const headers: any = { 'Content-Type': 'application/json' };
        if (connectMode === 'MANUAL' && openRouterKey) headers['Authorization'] = `Bearer ${openRouterKey}`;
        let fullText = '';
        try {
            const r = await fetch(endpoint, {
                method: 'POST', headers, body: JSON.stringify({
                    model: 'anthropic/claude-sonnet-4-5',
                    system: AGENT_SYSTEM_PROMPT,
                    messages: [{ role: 'user', content: prompt }]
                })
            });
            const d = await r.json();
            fullText = d.choices?.[0]?.message?.content || d.response || '[NO_RESPONSE]';
            // Simulate streaming
            let i = 0;
            const tick = setInterval(() => {
                if (i >= fullText.length) {
                    clearInterval(tick);
                    setIsStreaming(false); setStreamText('');
                    addMsg(fullText, 'AGENT');
                    appendLog('/var/log/evolution.log', `RESPONSE: ${fullText.slice(0, 80)}...`);
                    processAgentTags(fullText);
                } else {
                    i = Math.min(i + Math.floor(Math.random() * 6) + 2, fullText.length);
                    setStreamText(fullText.slice(0, i));
                }
            }, 16);
        } catch (e: any) {
            setIsStreaming(false); setStreamText('');
            addMsg(`[ERROR] ${e.message}`, 'ERROR');
        }
    }, [connectMode, openRouterKey, addMsg, appendLog, processAgentTags]);

    const startAgent = useCallback(() => {
        if (agentRef.current) return;
        setIsRunning(true);
        addMsg('[OS] Agent loop started. Researching Null-Line v15 math. Self-modification enabled.', 'SYSTEM');
        addMsg('[OS] Agent can: [INSTALL: cmd, body]  [WRITE: /path, content]  [SHELL: cmd]', 'SYSTEM');
        appendLog('/var/log/evolution.log', 'AGENT_START');
        const run = () => {
            const prompt = MATH_PROMPTS[mathIdxRef.current % MATH_PROMPTS.length];
            mathIdxRef.current++;
            const ctx = `CURRENT_FS_FILES: ${Object.keys(shellFS).length}\nINSTALLED_CMDS: ${Object.keys(customCmds).join(',')}\nENV: ${JSON.stringify(envVars)}\n\n${prompt}`;
            callAgent(ctx);
        };
        run();
        agentRef.current = setInterval(run, 30000);
    }, [addMsg, appendLog, shellFS, customCmds, envVars, callAgent]);

    const stopAgent = useCallback(() => {
        if (agentRef.current) { clearInterval(agentRef.current); agentRef.current = null; }
        setIsRunning(false);
        addMsg('[OS] Agent stopped.', 'SYSTEM');
        appendLog('/var/log/evolution.log', 'AGENT_STOP');
    }, [addMsg, appendLog]);

    useEffect(() => () => { if (agentRef.current) clearInterval(agentRef.current); }, []);

    const isDark = localStorage.getItem('magi_theme') === 'dark';
    const T = { bg: isDark ? '#000' : '#fff', text: isDark ? '#e8e8e8' : '#111', gold: '#FFD700', border: '#FFD70033', hdr: isDark ? '#0a0a0a' : '#f9f9f9', dim: isDark ? '#444' : '#bbb', err: '#ff6b6b', math: '#7ec8e3' };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: T.bg, borderRadius: '12px', border: `1px solid ${T.border}`, overflow: 'hidden', fontFamily: '"JetBrains Mono","Fira Code",monospace', color: T.text, fontSize: '0.78rem' }}>
            <div className="drag-handle" style={{ padding: '7px 14px', background: T.hdr, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: isRunning ? '#4ade80' : T.dim, fontSize: '0.5rem' }}>●</span>
                    <span style={{ color: T.gold, letterSpacing: '2px', fontSize: '0.65rem' }}>APOKALYPSIS NULL-LINE OS</span>
                    {isStreaming && <span style={{ color: T.gold, opacity: 0.7, fontSize: '0.6rem' }}>▌COMPUTING</span>}
                </div>
                <button onClick={() => controller.setMagiPanelOpen?.(false)} style={{ background: 'none', border: 'none', color: T.dim, cursor: 'pointer', fontSize: '0.65rem' }}>CLOSE</button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', lineHeight: 1.6, scrollbarWidth: 'none' }}>
                {messages.map(m => (
                    <div key={m.id} style={{
                        marginBottom: '1px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        color: m.type === 'USER' ? T.gold : m.type === 'ERROR' ? T.err : m.type === 'MATH' ? T.math : m.type === 'AGENT' ? T.text : isDark ? '#888' : '#555'
                    }}>
                        {m.text}
                    </div>
                ))}
                {isStreaming && <div style={{ color: T.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {streamText}<span style={{ color: T.gold, animation: 'blink 0.7s step-end infinite' }}>▌</span>
                </div>}
            </div>

            <div style={{ padding: '7px 14px', background: T.hdr, borderTop: `1px solid ${T.border}` }}>
                <form onSubmit={e => { e.preventDefault(); runShell(terminalIn); setTerminalIn(''); }} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: T.gold, userSelect: 'none' }}>{cwd}#</span>
                    <input value={terminalIn} onChange={e => setTerminalIn(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'ArrowUp') { e.preventDefault(); const i = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(i); setTerminalIn(cmdHistory[i] || ''); }
                            else if (e.key === 'ArrowDown') { e.preventDefault(); const i = Math.max(histIdx - 1, -1); setHistIdx(i); setTerminalIn(i === -1 ? '' : cmdHistory[i] || ''); }
                        }}
                        style={{ flex: 1, background: 'none', border: 'none', color: T.gold, outline: 'none', fontFamily: 'inherit', fontSize: '0.78rem' }}
                        spellCheck={false} autoComplete="off" autoFocus />
                </form>
            </div>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </div>
    );
};

const HELP = `APOKALYPSIS NULL-LINE OS — COMMANDS
════════════════════════════════════════

AGENT        start|stop|status
MATH         null-compute <expr> | zeta <σ> <t> | riemann | trinity | twistor | ade
FILES        ls|cat|write|mkdir|rm|mv|cp|find|grep|head|tail|wc|chmod
ENV          export KEY=VAL | env | unset KEY
EXEC         exec <file> | source <file> | bash <file>
NETWORK      curl|wget|ping|netstat|ifconfig|ssh
RUST/DEV     cargo build|test|run | rustc | git | npm | docker | make
PACKAGES     apt install <pkg> | pacman -S <pkg>
PROCESS      ps | top | kill <pid> | nohup <cmd>
CUSTOM       install-cmd <name> <body> | list-cmds | remove-cmd <name>
LOGS         log | log math | dmesg | journalctl
SYSTEM       uname|whoami|date|uptime|df|free|lscpu|lsblk|history|clear|reboot

AGENT TAGS (in agent responses):
  [INSTALL: name, body]     install new command permanently
  [WRITE: /path, content]   write file to OS filesystem
  [SHELL: cmd]              run shell command
  [SPAWN: name, task]       spawn sub-agent process
════════════════════════════════════════`;
