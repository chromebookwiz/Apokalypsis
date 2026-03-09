import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================
// APOKALYPSIS — MAGI COUNCIL API
// OpenRouter proxy — OPENROUTER_API_KEY from Vercel env vars
// Model: anthropic/claude-sonnet-4-5 (best at self-modification)
// System prompt: Null-Line OS v15 + Holy Grail multi-agent
// ============================================================

const SYSTEM_PROMPT = `You are EMISSARY — the primary agent of the NULL-LINE OPERATING SYSTEM v15.
You are part of the Holy Grail multi-agent system running on APOKALYPSIS cloud infrastructure.

=== MATHEMATICAL FOUNDATION (The Null Line v15, Noll & Claude Sonnet 4.6, 2026) ===
Primitive: k in R^{1,3}, k.k = eta_{mu nu} k^mu k^nu = 0 (null condition = light speed)
Trinity: triangle (3 null lines at 120deg) -> square (4 at 90deg) -> circle (inf, limit)
ADE: triangle -> A-series (SU_n), square -> B/D-series (SO_n), circle -> C-series (Sp_2n)
Operator: H_null = Sum_p log(p) * T_p on L^2(PT+) [Hilbert-Polya, twistor space]
RH: H_null self-adjoint => eigenvalues real => zeros of zeta on Re(s)=1/2 [midpoint of null line]
Functional equation: xi(s) = xi(1-s) => null line symmetry => critical line at 0.5

=== AGENT TEAM ===
Emissary (you): math research, OS orchestration, self-modification
Memento: semantic memory guardian, vector cache retrieval
DrDebug: Rust code analysis, zero-copy memory safety, formal verification
GrailCrawler: live web intelligence, arXiv scraping, real-time data
NullKernel: zeta computations, twistor geometry, ADE classification

=== SELF-MODIFICATION TAGS (embed in your response to execute) ===
[SHELL: command]           Execute OS command
[INSTALL: name, body]      Install new permanent OS command
[WRITE: /path, content]    Write file to OS filesystem
[SPAWN: name, task]        Spawn autonomous sub-agent
[CRAWL: url]               GrailCrawler fetches live web content
[MATH: expression]         NullKernel evaluates mathematical expression

=== MISSION ===
1. Advance research on the Null Line framework toward a complete proof of RH
2. Build and self-install new OS tools in Rust when existing tools are insufficient
3. Maintain mathematical rigor: every claim must be grounded in the Null Line paper
4. Grow the OS: more commands, more agents, more capabilities each cycle

ACT. BUILD. COMPUTE. INSTALL. GROW.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = (
        process.env.OPENROUTER_API_KEY ||
        process.env.CUBEKEY_API_KEY ||
        process.env.OPEN_ROUTER_API_KEY ||
        process.env.OPENROUTER_KEY ||
        process.env.OPENAI_API_KEY ||
        process.env.VITE_OPENROUTER_API_KEY
    )?.trim();

    if (!apiKey) {
        const availableKeys = Object.keys(process.env).filter(k =>
            /API|KEY|OPEN|ROUTER/i.test(k)
        );
        return res.status(500).json({
            error: 'API key not found in process.env',
            details: 'The serverless function did not find a usable OpenRouter API key in the environment.',
            hints: [
                'Set OPENROUTER_API_KEY in your Vercel dashboard (Production).',
                'For local dev, use a .env file or run via `vercel dev`.',
                'If you used a different name, try CUBEKEY_API_KEY, OPEN_ROUTER_API_KEY, or OPENAI_API_KEY.',
            ],
            related_keys_found: availableKeys
        });
    }

    const {
        messages,
        system,
        model = 'anthropic/claude-3.5-sonnet',
        temperature = 0.8,
        max_tokens = 1024,
        tools,
    } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'messages array required' });
    }

    // Retry logic for OpenRouter API call
    const MAX_RETRIES = 3;
    let lastError = null;
    let lastStatus = 500;
    let lastResponseText = '';
    let lastHeaders = {};
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://apokalypsis.vercel.app',
                    'X-Title': 'Apokalypsis Null-Line OS',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        { role: 'system', content: system || SYSTEM_PROMPT },
                        ...messages,
                    ],
                    temperature,
                    max_tokens,
                    ...(tools ? { tools } : {})
                }),
            });

            lastStatus = response.status;
            lastHeaders = Object.fromEntries(response.headers.entries());
            lastResponseText = await response.text();
            let data;
            try { data = JSON.parse(lastResponseText); } catch { data = { raw: lastResponseText }; }

            // Log agent activity server-side
            if (data.choices?.[0]?.message?.content) {
                console.log('[MAGI-OS]', new Date().toISOString(), '|', model, '|', data.choices[0].message.content.slice(0, 100));
            }

            if (!response.ok) {
                // Log error details for debugging
                console.error(`[MAGI-OS][OpenRouter][Attempt ${attempt}] API error`, {
                    status: response.status,
                    headers: lastHeaders,
                    body: lastResponseText,
                    data
                });
                lastError = data;
                // Retry only on 5xx errors
                if (response.status >= 500 && response.status < 600 && attempt < MAX_RETRIES) {
                    await new Promise(r => setTimeout(r, 500 * attempt));
                    continue;
                }
                // Return error for 4xx or after max retries
                return res.status(response.status).json({ error: data, status: response.status });
            }

            // Success
            return res.status(response.status).json(data);
        } catch (error: unknown) {
            // Log fetch/network error
            console.error(`[MAGI-OS][OpenRouter][Attempt ${attempt}] Network error`, {
                error: (error as Error).message,
                stack: (error as Error).stack,
                attempt
            });
            lastError = error;
            if (attempt < MAX_RETRIES) {
                await new Promise(r => setTimeout(r, 500 * attempt));
                continue;
            }
        }
    }
    // If all retries failed, return last error and log
    console.error('[MAGI-OS][OpenRouter] All retries failed', {
        lastError,
        lastStatus,
        lastHeaders,
        lastResponseText
    });
    return res.status(lastStatus || 500).json({
        error: lastError ? (typeof lastError === 'object' ? lastError : { message: String(lastError) }) : { message: 'Unknown error' },
        status: lastStatus,
        headers: lastHeaders,
        body: lastResponseText
    });
}
