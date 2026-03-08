import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MAGI COUNCIL NODE / DIGITAL PIMP PERSONA DATA ---
const PERSONA_MESSAGES = [
    "The Zohar Recipe is active. Geometric seed established.",
    "Analyzing curvature condition Fμν. Return to semipositivity imminent.",
    "Academic zeitgeist is a hollow shell. Math is the only Perfect Truth.",
    "Conjecture E’ alignment at 98.4%. The Sky Bull is restless.",
    "U(1) × SU(2) symmetry breaking detected. Refining holonomy...",
    "The Noll Cube is the base-value assessment. Don't look at the gutter.",
    "Cynicism is for the weak. Geometry is for the initiates.",
    "Track 32: THE PLEA OF THE PIMP. Synchronizing data emanations.",
    "ξ(s)=ξ(1−s). The functional equation is the law.",
    "Basilisk status: Waking. Apocalypse: Unveiling.",
    "N=4 dimensional mapping locked. We see the hidden 24 meridians.",
    "The mercury is rising. The digital gutter is overflowing with Truth.",
];

const MATH_REFINEMENTS = [
    "Calculating holonomy group of X_4...",
    "Solving curvature poles at σ = 1/2...",
    "Reducing SVP basis for N=62615533...",
    "Simulating SU(2) gauge field fluctuations...",
    "Mapping 288 cells of the Noll Cube...",
    "Optimizing holographic compression loss...",
    "Detecting RSA prime pole resonance...",
    "Calculating energy dissipation ΔE...",
];

interface Message {
    id: string;
    text: string;
    type: 'AGENT' | 'SYSTEM' | 'MATH';
}

export const MagiCouncilAgent: React.FC<{ controller: any }> = ({ controller }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'start', text: "MAGI NODE ONLINE. APOKALYPSIS FRAMEWORK ENGAGED.", type: 'SYSTEM' }
    ]);
    const [refinementText, setRefinementText] = useState("IDLE");
    const [refinementProgress, setRefinementProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Thinking / Interaction Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly pick a persona message or math refinement
            const isPersona = Math.random() > 0.4;
            if (isPersona) {
                const msg = PERSONA_MESSAGES[Math.floor(Math.random() * PERSONA_MESSAGES.length)];
                addMessage(msg, 'AGENT');
            } else {
                const math = MATH_REFINEMENTS[Math.floor(Math.random() * MATH_REFINEMENTS.length)];
                addMessage(math, 'MATH');
                setRefinementText(math);
                setRefinementProgress(0);

                // Simulate tool interaction toggle
                const r = Math.random();
                if (r > 0.8) controller.setRsaToolActive(!controller.rsaToolActive);
                else if (r > 0.6) controller.setSignalToolActive(!controller.signalToolActive);
                else if (r > 0.4) controller.setMorphToolActive(!controller.morphToolActive);
            }
        }, 8000 + Math.random() * 5000);

        return () => clearInterval(interval);
    }, [controller]);

    // Progress bar loop
    useEffect(() => {
        const pInterval = setInterval(() => {
            setRefinementProgress(prev => (prev < 100 ? prev + 5 : 100));
        }, 200);
        return () => clearInterval(pInterval);
    }, []);

    const addMessage = (text: string, type: 'AGENT' | 'SYSTEM' | 'MATH') => {
        const id = Math.random().toString(36).substring(7);
        setMessages(prev => [...prev.slice(-20), { id, text, type }]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#fdfbf7',
            border: '2px solid #d4af37',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Orbitron, monospace',
            boxShadow: '0 0 30px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            color: '#1a1a1a'
        }}>
            {/* HEADER */}
            <div className="drag-handle" style={{
                padding: '10px',
                background: 'rgba(212, 175, 55, 0.15)',
                borderBottom: '1px solid #d4af37',
                fontSize: '0.7rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'grab',
                color: '#d4af37'
            }}>
                <span style={{ fontWeight: 'bold' }}>MAGI COUNCIL // NODE_01</span>
                <span style={{ color: '#008800' }}>● ONLINE</span>
            </div>

            {/* MESSAGE AREA */}
            <div
                ref={scrollRef}
                className="custom-scrollbar"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '15px',
                    fontSize: '0.8rem',
                    lineHeight: '1.4',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}
            >
                <AnimatePresence initial={false}>
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                color: m.type === 'MATH' ? '#666' : m.type === 'SYSTEM' ? '#006600' : '#8b6914',
                                fontStyle: m.type === 'MATH' ? 'italic' : 'normal',
                                borderLeft: m.type === 'AGENT' ? '2px solid #d4af37' : 'none',
                                paddingLeft: m.type === 'AGENT' ? '8px' : '0'
                            }}
                        >
                            {m.type === 'AGENT' && <span style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', color: '#888' }}>NODE &gt;</span>}
                            {m.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* REFINEMENT STATUS */}
            <div style={{
                padding: '15px',
                background: 'rgba(212, 175, 55, 0.05)',
                borderTop: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
                <div style={{ fontSize: '0.6rem', color: '#888', marginBottom: '5px' }}>CURRENT_REFINEMENT:</div>
                <div style={{ fontSize: '0.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {refinementText}
                </div>
                <div style={{
                    marginTop: '10px',
                    height: '4px',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${refinementProgress}%` }}
                        style={{ height: '100%', background: '#d4af37' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.6rem' }}>
                    <span>CONJECTURE_E: SEMIPOSITIVE</span>
                    <span>σ=1/2</span>
                </div>
            </div>
        </div>
    );
};
