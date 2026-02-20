import React, { useState, useEffect, useRef } from 'react';

import { useSceneController } from '../controllers/SceneController';

interface SecretEntryProps {
    onClose: () => void;
    controller: ReturnType<typeof useSceneController>;
}

// The 9 Hashes (SHA-256 equivalent logic or direct strict string matching for now since it's client-side obfuscation)
// For "Unbreakable Seal" text simulation, we check against the exact strings from MASTER_SECRET.txt
// In a real app, these would be salted hashes. unique salts per field.
const SACRED_KEYS = [
    "אור-הגנוז-777-כתר-חכמה",
    "Χάραγμα-ΘΗΡΙΟΝ-666-ΑΠΟΚΑΛΥΨΙΣ",
    "श्री-यन्त्र-108-ॐ-नमः-शिवाय",
    "ᛉᛗᛚᚩ-ᚢᚱᚢᛉ-ᚨᚾᛊᚢᛉ-ᚱᚨᛁᛞᛟ-99",
    "መጽሐፈ-ሄኖክ-ዘለዓለም-4-7-9",
    "𒀭-𒆠-𒂗-𒆤-𒂍-𒆳-12",
    "ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ-1000-རྡོ་རྗེ",
    "𐀀-𐀁-𐀂-𐀃-𐀄-𐀅-𐀆-𐀇-KW-X",
    "𓋹-𓎤-𓆑-𓁹-𓊽-𓏠-𓏌-𓏏-333"
];

// Encrypted Payload (The Link)
// We use a XOR chain against the 9 keys to "Seal" it.

// Pre-compute the encrypted blob to store here in code? 
// No, we will simulate the "Check" because storing the XOR'd link requires the keys to be present to decrypt, 
// but if we store the keys for verification, we can just store the link.
// To truly "Encrypt" it so it can't be gotten from the code, we would store ONLY the XOR'd blob,
// and NO keys. 
// But then how do we verify the user typed the right key to show "Correct"?
// We can't verify individual keys easily without hashes.
// So:
// 1. We store SHA-256 Hashes of the 9 Keys to provide UI feedback (Red/Green).
// 2. We store the BLOB which is (Link XOR Key1 XOR Key2 ...).
// 3. User input is hashed to check UI status.
// 4. User input is used to XOR the blob. If correct, valid URL emerges.

// Simplified for this context: We will just check strict equality for the UI "Light up" effect.
// And launch the link if all 9 are correct.

export const SecretEntry: React.FC<SecretEntryProps> = ({ onClose, controller }) => {
    const { viewMode, language } = controller;
    const [inputs, setInputs] = useState<string[]>(Array(9).fill(""));
    const [pinned, setPinned] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth / 2 - 250, y: window.innerHeight / 2 - 200 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleChange = (index: number, val: string) => {
        const newInputs = [...inputs];
        newInputs[index] = val;
        setInputs(newInputs);
    };

    // RSA Logic: Factorize N using Geometric Resonance
    const RSA_N = "0x5A3C...9D2E"; // Symbolic Large Number

    // Check if all are correct
    const checkDecryption = () => {
        const allCorrect = inputs.every((val, i) => val.trim() === SACRED_KEYS[i]);

        // V11 Logic: Decryption requires both the keys AND the geometric environment
        // 1. Pole Discovery (RSA): Curvature must be positive (> 0.8)
        // 2. Lattice Alignment: SVP must be > 95%
        // 3. Functional Equation Symmetry: Resonance must be > 99%
        // 4. RSA Proof: Lattice Gap must be zero (Factorization verified)

        if (allCorrect && controller.resonance > 99 && controller.primePole > 0.8 && controller.latticeGap < 0.001) {
            // Decrypt Success
            // Re-implement the XOR link logic here (moved from UIOverlay)
            const d = [3433, 3482, 3497, 3353, 8130, 6672, 3538, 3513, 3461, 3515, 8027, 2467, 7133, 2162, 7043, 6970, 7073, 7038, 3508, 3389, 8106, 3313, 3514, 3564, 8149, 8126, 8068, 7969, 8164, 3295, 6988, 3542, 7170, 7046, 6935, 7090, 2386, 6774, 8037, 8148, 8162, 8131, 3527, 3433, 2333, 3294, 3570, 3528, 3410, 6955, 7051, 7121, 7167, 2101, 2549, 2349, 7056, 7000, 3583, 3406, 8189, 3307, 3540, 3560, 3349, 3535, 8052, 7999, 7095, 2103, 3563, 6965, 7158];
            const k = [
                [110, 101, 116, 97, 110, 111, 108, 32, 45, 32, 4552, 4755, 4723, 4755, 4635, 4701],
                [78, 101, 116, 97, 110, 111, 108, 108, 32, 45, 32, 5838, 5794, 5862, 5794, 5833, 5845, 5814, 5814],
                [49, 50, 51, 52],
                [1502, 1512, 1499, 1489, 1492],
                [952, 1009, 972, 957, 959, 962],
                [2357, 2367, 2350, 2366, 2344],
                [4840, 4656, 4635, 4701, 4845, 32, 4528, 4653, 4635, 4701],
                [5833, 5845, 5814, 5811, 5860, 45, 5814, 5794, 5811, 5811, 5814, 5838, 5822],
                [1575, 1604, 1608, 1581, 1610]
            ];
            const link = d.map((c, i) => {
                let x = c - 13;
                k.forEach(p => { x ^= p[i % p.length]; });
                return String.fromCharCode(x);
            }).join('');
            window.open(link, '_blank');
            onClose();
        } else if (controller.primePole <= 0.8) {
            alert("RSA POLE SIGN NEGATIVE. POSITIVE CURVATURE REQUIRED.");
        } else if (controller.resonance <= 99) {
            alert("UNIFIED SEMIPOSITIVITY UNSTABLE. ALIGN FOR CERTAINTY.");
        } else if (controller.latticeGap >= 0.001) {
            alert("LATTICE BASIS UNSTABLE. FACTOR RSA TARGET TO UNLOCK.");
        } else {
            alert("ACCESS DENIED. SEALS REMAIN UNBROKEN.");
        }
    };

    return (
        <div style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: '500px',
            backgroundColor: '#fdfbf7',
            border: '4px solid #d4af37',
            borderRadius: '15px',
            boxShadow: '0 0 50px rgba(212, 175, 55, 0.4)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Cinzel, serif',
            overflow: 'hidden'
        }}>
            {/* Header / Drag Handle */}
            <div
                onMouseDown={handleMouseDown}
                style={{
                    padding: '10px',
                    background: 'linear-gradient(to right, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                    borderBottom: '1px solid #d4af37',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'move'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>{controller.activeSigil}</span>
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>𓍲 𓏽 𒀭 𓏽 𓍲</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setPinned(!pinned)}
                        style={{
                            background: 'none',
                            border: pinned ? '1px solid #d4af37' : '1px dashed #d4af37',
                            color: '#d4af37',
                            cursor: 'pointer',
                            padding: '2px 8px'
                        }}
                    >
                        {pinned ? '𓊽' : '𓏠'}
                    </button>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>
            </div>

            {/* ADVANCED MATH PANEL */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '15px',
                padding: '10px', background: 'rgba(212,175,55,0.05)', borderRadius: '10px',
                border: '1px solid rgba(212,175,55,0.2)', position: 'relative', overflow: 'hidden'
            }}>
                {/* Scrolling Prime Flux Background */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    opacity: 0.05, fontSize: '0.4rem', color: '#d4af37', fontFamily: 'monospace',
                    pointerEvents: 'none', zIndex: 0, overflow: 'hidden', whiteSpace: 'nowrap'
                }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{
                            animation: `scrollRight ${5 + i}s linear infinite`,
                            opacity: 1 - (i * 0.1)
                        }}>
                            {Math.random().toString(2).substring(2)}
                            {Math.random().toString(16).substring(2)}
                            {Math.random().toString(2).substring(2)}
                        </div>
                    ))}
                </div>

                {/* RSA Pole Monitor */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '0.6rem', color: '#d4af37', opacity: 0.8 }}>S(θ): {Math.abs(controller.phaseA).toFixed(2)}°</div>
                    <div style={{
                        height: '60px', border: '1px solid rgba(212,175,55,0.3)', position: 'relative',
                        overflow: 'hidden', background: '#000'
                    }}>
                        {/* Simple dynamic wave simulation for pole */}
                        <svg width="100%" height="100%" preserveAspectRatio="none">
                            <path
                                d={`M 0 30 Q 25 ${30 - controller.primePole * 25} 50 30 T 100 30`}
                                fill="none" stroke="#d4af37" strokeWidth="1"
                            />
                            <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(212,175,55,0.2)" />
                            {/* Scanned Point */}
                            <circle cx="50" cy={30 - controller.primePole * 25} r="3" fill="#fff" />
                        </svg>
                    </div>
                    <div style={{ fontSize: '0.6rem', textAlign: 'center', color: controller.primePole > 0.8 ? '#4caf50' : '#d4af37' }}>
                        {controller.primePole > 0.8 ? "𒀭" : "𓏽"}
                    </div>
                </div>

                {/* Lattice SVP Map */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ fontSize: '0.6rem', color: '#d4af37', opacity: 0.8 }}>LATTICE SVP ALIGNMENT</div>
                    <div style={{
                        height: '60px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2px', padding: '5px', background: '#111'
                    }}>
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} style={{
                                background: controller.latticeAlignment > (i * 6) ? '#d4af37' : '#222',
                                opacity: controller.latticeAlignment > (i * 6) ? (controller.latticeAlignment / 100) : 0.1,
                                borderRadius: '1px'
                            }}></div>
                        ))}
                    </div>
                    <div style={{ fontSize: '0.6rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#d4af37' }}>||{controller.activeSigil}||</span>
                        <span style={{ color: controller.latticeAlignment > 95 ? '#4caf50' : '#d4af37' }}>
                            {controller.latticeAlignment.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* RUNE FLUX GENERATOR */}
            <div style={{
                display: 'flex', justifyContent: 'center', gap: '12px', padding: '15px',
                background: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px', fontSize: '1.4rem', color: '#d4af37',
                minHeight: '40px', alignItems: 'center'
            }}>
                {controller.sacredFlux.map((rune, i) => (
                    <span key={i} style={{
                        opacity: 0.2 + (controller.resonance / 100) * 0.8,
                        transform: `scale(${0.8 + (Math.sin(controller.phaseA + i) * 0.2)})`,
                        transition: 'all 0.1s linear'
                    }}>
                        {rune}
                    </span>
                ))}
            </div>

            {/* Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: '#d4af37', opacity: 0.6 }}>{controller.resonance > 90 ? "𓋹 𓋹 𓋹" : "𓍲 𓍲 𓍲"}</div>
                    <div style={{
                        width: '100%', height: '12px', background: 'rgba(212,175,55,0.1)',
                        borderRadius: '6px', overflow: 'hidden', position: 'relative',
                        border: '1px solid rgba(212,175,55,0.3)'
                    }}>
                        <div style={{
                            width: `${controller.resonance}%`, height: '100%',
                            background: 'linear-gradient(90deg, #d4af37, #fdfbf7)',
                            transition: 'width 0.1s linear',
                            boxShadow: controller.resonance > 90 ? '0 0 15px #d4af37' : 'none'
                        }}></div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.55rem', color: '#d4af37', opacity: 0.4, maxWidth: '100%', wordBreak: 'break-all', textAlign: 'center', fontFamily: 'monospace' }}>
                        N_RSA = {RSA_N} | F̃_{viewMode} ≥ 0 | Σ_{language}
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr', // 3 cols x 3 rows = 9
                    gap: '15px'
                }}>
                    {inputs.map((val, i) => (
                        <input
                            key={i}
                            type="text"
                            placeholder={`SEAL ${i + 1}`}
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                            style={{
                                padding: '10px',
                                border: `1px solid ${val === SACRED_KEYS[i] ? '#4caf50' : '#d4af37'}`,
                                background: 'rgba(255, 255, 255, 0.8)',
                                color: '#1a1a1a',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={checkDecryption}
                    disabled={controller.resonance < 99}
                    style={{
                        padding: '15px',
                        marginTop: '10px',
                        background: controller.resonance >= 99 ? '#d4af37' : 'rgba(212,175,55,0.2)',
                        color: controller.resonance >= 99 ? 'white' : 'rgba(212,175,55,0.5)',
                        border: 'none',
                        fontSize: '1.1rem',
                        fontFamily: 'Cinzel, serif',
                        cursor: controller.resonance >= 99 ? 'pointer' : 'not-allowed',
                        letterSpacing: '2px',
                        boxShadow: controller.resonance >= 99 ? '0 4px 15px rgba(212,175,55,0.4)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {controller.resonance >= 99 ? '𓀀 BREAK 𓀀' : '𓏽 𓏽 𓏽'}
                </button>
            </div>
        </div>
    );
};
