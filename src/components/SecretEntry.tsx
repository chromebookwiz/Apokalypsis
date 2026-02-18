import React, { useState, useEffect, useRef } from 'react';

interface SecretEntryProps {
    onClose: () => void;
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
// Target Link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" (Placeholder? Or Real Secret?)
// Let's use a real placeholder that implies a secret.
const TARGET_LINK = "https://github.com/chromebookwiz/Apokalypsis/secret-download"; // Example

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

export const SecretEntry: React.FC<SecretEntryProps> = ({ onClose }) => {
    const [inputs, setInputs] = useState<string[]>(Array(9).fill(""));
    const [pinned, setPinned] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth / 2 - 250, y: window.innerHeight / 2 - 200 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // 3x3 Pixel Rotating Square Logic
    const [rot, setRot] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setRot(r => (r + 5) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

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

    // Check if all are correct
    const checkDecryption = () => {
        const allCorrect = inputs.every((val, i) => val.trim() === SACRED_KEYS[i]);
        if (allCorrect) {
            // Decrypt Success
            window.open(TARGET_LINK, '_blank');
            onClose();
        } else {
            // visual shake/error?
            alert("ACCESS DENIED. The Seal Remains Unbroken.");
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
                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>☩</span> {/* Sideways Cross */}
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>THE NINE SEALS</span>
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
                        {pinned ? 'PINNED' : 'PIN'}
                    </button>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    {/* Secret 3x3 Pixel Rotating Square */}
                    <div style={{
                        width: '9px',
                        height: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `rotate(${rot}deg)`,
                        transition: 'transform 0.05s linear'
                    }}>
                        <div style={{ width: '3px', height: '3px', background: '#d4af37' }}></div>
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
                    style={{
                        padding: '15px',
                        marginTop: '10px',
                        background: '#d4af37',
                        color: 'white',
                        border: 'none',
                        fontSize: '1.1rem',
                        fontFamily: 'Cinzel, serif',
                        cursor: 'pointer',
                        letterSpacing: '2px',
                        boxShadow: '0 4px 15px rgba(212,175,55,0.4)'
                    }}
                >
                    BREAK SEAL
                </button>
            </div>
        </div>
    );
};
