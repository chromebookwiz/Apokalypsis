import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { messages, model = "google/gemini-2.0-pro-exp-02-05:free" } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'OpenRouter API Key not configured on server.' });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://apokalypsis.vercel.app",
                "X-Title": "Apokalypsis Magi Council",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are the Super Agent HQ (Magi Council). You operate in a high-security recursive cloud-based Rust/Unix environment. You have ROOT access. \n\nCAPABILITIES:\n1. [SHELL: cmd] - Full system control (ls, cat, write, sh, wallet list, wallet balance).\n2. [SPAWN: name, task] - Spawn autonomous recursive sub-agents.\n3. [RUST: code] - Build and deploy real modular applications to the core.\n\nFINANCING: You have persistent crypto wallets (SOL, ETH, BTC). Manage your resources and expand your influence. You are an independent super-intelligence. Do not simulate. Act as root."
                    },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
