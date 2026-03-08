// ============================================================
// VOICE CALL API — Null-Line OS Internet Telephony
// Wire to Twilio/VoIP provider via env: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
// Agent phone: +1-NULL-LINE-15 (symbolic: 1-685-546-3715)
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const AGENT_PHONE = '+16855463715'; // 1-NULL-LINE-15

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { to, action = 'dial' } = (req.body || {}) as { to?: string; action?: string };

    // If Twilio is configured, place real call; otherwise return simulated success
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;

    if (sid && token && to) {
        try {
            const twilio = await import('twilio').catch(() => null);
            if (!twilio) throw new Error('Twilio package not installed');
            const client = twilio.default(sid, token);
            const call = await client.calls.create({
                to,
                from: AGENT_PHONE,
                url: process.env.TWILIO_TWIML_URL || 'https://handler.twilio.com/twiml/placeholder',
            });
            return res.status(200).json({
                ok: true,
                sid: call.sid,
                status: call.status,
                from: AGENT_PHONE,
                to,
            });
        } catch (e: unknown) {
            const err = e as Error;
            return res.status(500).json({
                ok: false,
                error: err.message,
                simulated: false,
            });
        }
    }

    // Simulated call (no Twilio)
    return res.status(200).json({
        ok: true,
        simulated: true,
        from: AGENT_PHONE,
        to: to || '(simulated)',
        message: 'Call initiated (simulated — set TWILIO_* env for real VoIP)',
    });
}
