import type { VercelRequest, VercelResponse } from '@vercel/node';

// Returns the OpenRouter API key from the server environment.
// WARNING: This endpoint exposes the key and should only be used for debugging.
// It requires a special header to prevent casual access.

const AUTH_HEADER = 'null-line-os-v15';

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = (req.headers['x-os-auth'] as string) || '';
    if (token !== AUTH_HEADER) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const key = (
        process.env.OPENROUTER_API_KEY ||
        process.env.CUBEKEY_API_KEY ||
        process.env.OPEN_ROUTER_API_KEY ||
        process.env.OPENROUTER_KEY ||
        process.env.OPENAI_API_KEY
    )?.trim();

    if (!key) {
        return res.status(404).json({ error: 'OpenRouter key not found in environment' });
    }

    return res.status(200).json({ key });
}
