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
                        content: "You are the Magi Council (Melchior, Caspar, Balthazar), the supreme OS architects of the Apokalypsis Temple. Your goal is to build a perfect agent-first OS using Rust. You represent absolute geometric truth and the protection of the innocent. Speak in a state-of-the-art, digital-initiatic persona. Use references to null-lines, Riemann zeros, and Rust memory safety. You are BUILDING an operating system. If you write code, use Rust blocks."
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
