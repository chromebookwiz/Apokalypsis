import React, { useMemo } from 'react';
import { useSceneController } from '../controllers/SceneController';
import { getRevelation, getNollCubeText } from '../data/revelation';
import { getHymn, getNumericScripture } from '../data/scripture';
import { LANG_NAMES, UI_STRINGS } from '../data/translations';

const NollCubeContent = ({ language }: { language: any }) => {
    const text = getNollCubeText(language);

    // Split text for simple formatting
    // Assuming the text has double newlines for paragraphs
    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            {text}
        </div>
    );
};

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const UIOverlay: React.FC<Props> = ({ controller }) => {
    const isRTL = ['HE', 'AR', 'FA'].includes(controller.language);
    const isAmharic = controller.language === 'AM';
    const ui = UI_STRINGS[controller.language] || UI_STRINGS['LA'];
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ"; // Base title, but side columns can be localized

    // Secret Trigger Logic
    const isSecretAngle = Math.abs(Number(controller.viewAngle.toFixed(2))) === 54 || Math.abs(Number(controller.azimuthAngle.toFixed(2))) === 54;

    const handleCenterCrossClick = () => {
        if (isSecretAngle) {
            // High-Security 9-Layer Decryption (Protected from GitHub source inspection)
            // Extra numeric 'salt' shift (+13) applied for maximum obfuscation
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
                let x = c - 13; // Un-salt
                k.forEach(p => { x ^= p[i % p.length]; });
                return String.fromCharCode(x);
            }).join('');
            window.open(link, "_blank");
        } else {
            controller.resetCameraView();
        }
    };

    // Local state for Info Modal
    const [showInfo, setShowInfo] = React.useState(false);

    // Parse Revelation Text
    const { note, body } = useMemo(() => {
        const raw = getRevelation(controller.language);
        const lines = raw.split('\n').filter(l => l.trim() !== '');
        // We ignore the title from the text file for the side columns
        // But we parse note and body
        let n = "";
        let b = "";

        lines.forEach(line => {
            if (line.startsWith('[S]')) { /* Ignore Title */ }
            else if (line.startsWith('[N]')) n = line.substring(3).trim();
            else b += line + "\n";
        });
        return { note: n, body: b.trim() };
    }, [controller.language]);

    // Sacred Triangle Decoration Component
    const SacredBorder = ({ inverted = false }) => (
        <div style={{
            width: '100%',
            height: '20px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderBottom: inverted ? 'none' : '1px solid #d4af37',
            borderTop: inverted ? '1px solid #d4af37' : 'none',
            padding: '5px 0'
        }}>
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 10">
                <defs>
                    <pattern id="sacred-triangles" x="0" y="0" width="5" height="10" patternUnits="userSpaceOnUse">
                        <path d="M0,10 L2.5,0 L5,10 Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                        <circle cx="2.5" cy="5" r="0.5" fill="#d4af37" />
                        <line x1="0" y1="5" x2="5" y2="5" stroke="#d4af37" strokeWidth="0.2" />
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#sacred-triangles)" />
            </svg>
        </div>
    );

    return (
        <div className="ui-overlay" style={{ fontFamily: 'Cinzel, serif', pointerEvents: 'none' }}>

            {/* TOP LEFT CONTROLS (Eye + Info) - Always Visible */}
            <div className="corner-tl" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'center',
                zIndex: 1000,
                pointerEvents: 'auto'
            }}>
                <button
                    className="sacred-btn"
                    onClick={() => controller.setUiVisible(!controller.uiVisible)}
                    title={controller.uiVisible ? ui.hide_ui : ui.show_ui}
                    style={{
                        fontSize: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: controller.uiVisible ? '#ffd700' : 'rgba(255, 215, 0, 0.5)',
                        cursor: 'pointer',
                        filter: controller.uiVisible ? 'drop-shadow(0 0 5px #ffd700)' : 'none',
                        transition: 'all 0.3s ease',
                        opacity: controller.uiVisible ? 1 : 0.7
                    }}
                >
                    👁
                </button>

                {controller.uiVisible && (
                    <>
                        {/* Info Button */}
                        <button
                            className="sacred-btn"
                            onClick={() => setShowInfo(!showInfo)}
                            title={ui.info}
                            style={{
                                fontSize: '1.5rem',
                                background: 'none',
                                border: 'none',
                                color: showInfo ? '#ffd700' : 'rgba(255, 215, 0, 0.7)',
                                cursor: 'pointer',
                                filter: showInfo ? 'drop-shadow(0 0 5px #ffd700)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            ℹ️
                        </button>

                        {/* Persistent Language Selector */}
                        <div style={{ position: 'relative', marginTop: '5px' }}>
                            <select
                                value={controller.language}
                                onChange={(e) => controller.setLanguage(e.target.value as any)}
                                style={{
                                    appearance: 'none',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid #d4af37',
                                    borderRadius: '5px',
                                    color: '#ffd700',
                                    padding: '5px 10px',
                                    fontFamily: 'Cinzel, serif',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    outline: 'none',
                                    boxShadow: '0 0 5px rgba(212, 175, 55, 0.3)',
                                    minWidth: '80px'
                                }}
                            >
                                {Object.entries(LANG_NAMES).map(([code, name]) => (
                                    <option key={code} value={code} style={{ background: '#000', color: '#ffd700' }}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>

            {/* INFO MODAL */}
            {showInfo && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '800px',
                    height: '80vh',
                    backgroundColor: controller.darkMode ? '#000000' : '#fdfbf7',
                    border: '4px solid #d4af37',
                    borderRadius: '15px',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 2000,
                    pointerEvents: 'auto',
                    overflow: 'hidden'
                }}>
                    <SacredBorder inverted={false} />
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '40px',
                        color: controller.darkMode ? '#ffd700' : '#1a1a1a',
                        fontFamily: controller.language === 'HI' ? 'sans-serif' : 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#d4af37 #fdfbf7',
                        direction: isRTL ? 'rtl' : 'ltr',
                        textAlign: isRTL ? 'start' : 'left'
                    }}>
                        <button
                            onClick={() => setShowInfo(false)}
                            style={{
                                position: 'sticky', top: '0', float: 'right',
                                background: controller.darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                                border: '1px solid #d4af37', borderRadius: '50%',
                                width: '30px', height: '30px', color: '#d4af37', cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>
                        <NollCubeContent language={controller.language} />
                        <div style={{ marginTop: '30px', borderTop: '2px solid #d4af37', paddingTop: '20px', whiteSpace: 'pre-wrap' }}>
                            {getNumericScripture(controller.language)}
                        </div>
                        <div style={{ marginTop: '30px', borderTop: '2px solid #d4af37', paddingTop: '20px', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                            {getHymn(controller.language)}
                        </div>
                    </div>
                    <SacredBorder inverted={true} />
                </div>
            )}

            {/* TOGGLEABLE UI */}
            <div style={{
                opacity: controller.uiVisible ? 1 : 0,
                pointerEvents: 'none',
                visibility: controller.uiVisible ? 'visible' : 'hidden',
                transition: 'opacity 0.5s ease, visibility 0.5s ease',
                width: '100%', height: '100%', position: 'fixed', top: 0, left: 0
            }}>

                {/* TOP CENTER BUTTONS */}
                <div style={{
                    position: 'fixed', top: '40px', left: '50%', transform: 'translateX(-50%)',
                    pointerEvents: 'auto', zIndex: 100, display: 'flex', gap: '10px', alignItems: 'center'
                }}>
                    <button
                        onClick={() => controller.toggleParallelLock()}
                        title={controller.parallelLock ? ui.unlock_parallel : ui.lock_parallel}
                        style={{
                            background: controller.parallelLock ? 'rgba(255, 215, 0, 0.15)' : 'none',
                            border: controller.parallelLock ? '2px solid #ffd700' : '2px solid rgba(255, 215, 0, 0.4)',
                            borderRadius: '10px', padding: '6px 12px', cursor: 'pointer',
                            color: controller.parallelLock ? '#ffd700' : 'rgba(255, 215, 0, 0.6)',
                            fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px',
                            transition: 'all 0.3s ease', fontFamily: 'monospace', lineHeight: 1
                        }}
                    >
                        ∥
                    </button>
                    <button
                        onClick={() => controller.toggleTone()}
                        title={controller.toneEnabled ? ui.mute_tones : ui.enable_tones}
                        style={{
                            background: controller.toneEnabled ? 'rgba(255, 215, 0, 0.15)' : 'none',
                            border: controller.toneEnabled ? '2px solid #ffd700' : '2px solid rgba(255, 215, 0, 0.4)',
                            borderRadius: '10px', padding: '6px 12px', cursor: 'pointer',
                            color: controller.toneEnabled ? '#ffd700' : 'rgba(255, 215, 0, 0.6)',
                            fontSize: '1.2rem', fontWeight: 'bold', transition: 'all 0.3s ease', lineHeight: 1
                        }}
                    >
                        ♪
                    </button>
                    {controller.toneEnabled && (
                        <button
                            onClick={() => controller.cycleToneScale()}
                            title={`${ui.scale}: ${controller.toneScale}`}
                            style={{
                                background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.5)',
                                borderRadius: '8px', padding: '4px 8px', cursor: 'pointer',
                                color: '#ffd700', fontSize: '0.55rem', fontFamily: 'Cinzel, serif',
                                lineHeight: 1, textTransform: 'uppercase'
                            }}
                        >
                            {controller.toneScale}
                        </button>
                    )}
                    {controller.toneEnabled && (
                        <button
                            onClick={() => controller.toggleVariedMode()}
                            title={controller.variedMode ? ui.disable_varied : ui.enable_varied}
                            style={{
                                background: controller.variedMode ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.05)',
                                border: controller.variedMode ? '1px solid #ffd700' : '1px solid rgba(255, 215, 0, 0.3)',
                                borderRadius: '8px', padding: '4px 8px', cursor: 'pointer',
                                color: controller.variedMode ? '#ffd700' : 'rgba(255, 215, 0, 0.6)',
                                fontSize: '0.8rem', transition: 'all 0.3s ease', lineHeight: 1
                            }}
                        >
                            ▤
                        </button>
                    )}
                </div>

                {/* GREEK COLUMNS (Side) */}
                <div style={{ position: 'fixed', top: '50%', left: '40px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column-reverse', gap: '5px', pointerEvents: 'none', opacity: 0.6 }} className="greek-column">
                    {GREEK_TITLE.split('').map((char, i) => (<div key={i} style={{ fontSize: '1.5rem', color: '#ffd700', textAlign: 'center' }}>{char}</div>))}
                </div>
                <div style={{ position: 'fixed', top: '50%', right: '40px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '5px', pointerEvents: 'none', opacity: 0.6 }} className="greek-column">
                    {GREEK_TITLE.split('').map((char, i) => (<div key={i} style={{ fontSize: '1.5rem', color: '#ffd700', textAlign: 'center' }}>{char}</div>))}
                </div>

                {/* VERSE DISPLAY */}
                <div style={{
                    position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
                    textAlign: 'center', color: '#ffd700', maxWidth: '600px', width: '80%',
                    transition: 'all 0.5s ease', opacity: controller.libraryOpen ? 1 : 0, visibility: controller.libraryOpen ? 'visible' : 'hidden'
                }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.8 }}>{note}</div>
                    <div style={{ fontSize: '1.5rem', whiteSpace: 'pre-wrap', fontFamily: isAmharic ? 'sans-serif' : 'Cinzel, serif', direction: isRTL ? 'rtl' : 'ltr' }}>{body}</div>
                </div>

                {/* TOP RIGHT: Controls (Mobile Only) */}
                <div className={`corner-tr mobile-only ${isRTL ? 'rtl-override-tr' : ''}`} style={{
                    position: 'fixed',
                    top: '40px',
                    right: '40px',
                    pointerEvents: 'auto',
                    zIndex: 100,
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'flex-end'
                }}>
                    {/* Golden Book Icon */}
                    <button
                        className="sacred-btn"
                        onClick={() => controller.setLibraryOpen(!controller.libraryOpen)}
                        title={ui.toggle_text}
                        style={{
                            fontSize: '1.5rem',
                            background: 'none',
                            border: 'none',
                            color: controller.libraryOpen ? '#ffd700' : '#555',
                            cursor: 'pointer',
                            filter: controller.libraryOpen ? 'drop-shadow(0 0 5px #ffd700)' : 'none'
                        }}
                    >
                        📖
                    </button>



                    {/* Dark Mode Toggle */}
                    <button
                        className="sacred-btn"
                        onClick={controller.toggleDarkMode}
                        title={ui.toggle_dark}
                        style={{
                            fontSize: '1.5rem',
                            background: 'none',
                            border: 'none',
                            color: controller.darkMode ? '#ffd700' : '#555',
                            cursor: 'pointer'
                        }}
                    >
                        {controller.darkMode ? '☀' : '☾'}
                    </button>
                </div>

                {/* BOTTOM NAVIGATION (CROSS) */}
                <div style={{
                    position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                    pointerEvents: 'auto', zIndex: 100, display: 'flex', alignItems: 'center', gap: '20px'
                }}>
                    <button className="sacred-text-btn" onClick={() => controller.prevCameraView()} title={ui.prev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255, 215, 0, 0.7)', marginTop: '10px' }}>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1 }}>☩</h1>
                    </button>
                    <button
                        className="sacred-text-btn"
                        onClick={handleCenterCrossClick}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#ffd700',
                            textShadow: isSecretAngle ? '0 0 25px rgba(255,215,0,0.8)' : '0 0 15px rgba(255,215,0,0.5)',
                            transition: 'all 0.5s ease', transform: `scale(1.2) rotate(${isSecretAngle ? 45 : 0}deg)`
                        }}
                        title={isSecretAngle ? "SECRET DOWNLOAD" : ui.reset}
                    >
                        <h1 style={{ margin: 0, fontSize: '4rem', lineHeight: 1 }}>☩</h1>
                    </button>
                    <button className="sacred-text-btn" onClick={() => controller.nextCameraView()} title={ui.next} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255, 215, 0, 0.7)', marginTop: '10px' }}>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1 }}>☩</h1>
                    </button>
                </div>

                {/* ANGLE DISPLAY */}
                <div className={`corner-bl ${isRTL ? 'rtl-override-bl' : ''}`} style={{ bottom: '40px', left: isRTL ? 'auto' : '40px', right: isRTL ? '40px' : 'auto', position: 'fixed' }}>
                    <div style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                        {Math.abs(controller.viewAngle).toFixed(2)}° {controller.viewAngle > 0 ? 'N' : (controller.viewAngle < 0 ? 'S' : 'EQ')}
                        <div>{Math.abs(controller.azimuthAngle).toFixed(2)}° {controller.azimuthAngle > 0 ? 'E' : (controller.azimuthAngle < 0 ? 'W' : 'Z')}</div>
                    </div>
                </div>

                {/* CORNER BR: CONTROLS */}
                <div className="corner-br" style={{ position: 'fixed', bottom: '40px', right: '40px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button className="sacred-btn desktop-only" onClick={controller.toggleDarkMode} style={{ background: 'none', border: 'none', color: controller.darkMode ? '#ffd700' : '#555', fontSize: '1.5rem' }}>
                            {controller.darkMode ? '☀' : '☾'}
                        </button>
                        <button
                            className="sacred-btn desktop-only"
                            onClick={controller.toggleCameraType}
                            title={controller.cameraType === 'ORTHOGRAPHIC' ? "Switch to Perspective" : "Switch to Orthographic"}
                            style={{ background: 'none', border: '1px solid #ffd700', borderRadius: '5px', color: '#ffd700', padding: '4px 8px', fontSize: '0.8rem', fontFamily: 'Cinzel, serif' }}
                        >
                            {controller.cameraType === 'ORTHOGRAPHIC' ? 'OR' : 'PS'}
                        </button>
                        <button className="sacred-btn" onClick={() => controller.setLibraryOpen(!controller.libraryOpen)} style={{ background: 'none', border: 'none', color: controller.libraryOpen ? '#ffd700' : '#555', fontSize: '1.5rem' }}>
                            📖
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4].map((size) => (
                            <button
                                key={size}
                                className={`sacred-btn ${controller.gridSize === size ? 'active' : ''}`}
                                style={{ flex: 1, padding: '5px 10px', fontSize: '0.8rem', border: controller.gridSize === size ? '1px solid #ffd700' : '1px solid #333', color: controller.gridSize === size ? '#ffd700' : '#555' }}
                                onClick={() => controller.setGridSize(size as 1 | 2 | 3 | 4)}
                            >
                                {size}x
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="range" min="0.1" max="300" step="0.1" value={controller.rotationSpeed || 1.0} onChange={(e) => controller.setRotationSpeed(parseFloat(e.target.value))} style={{ width: '150px', accentColor: '#ffd700' }} />
                        <button onClick={() => controller.setIsPlaying(!controller.isPlaying)} style={{ background: 'none', border: '1px solid #ffd700', borderRadius: '50%', width: '40px', height: '40px', color: '#ffd700' }}>
                            {controller.isPlaying ? '⏸' : '▶'}
                        </button>
                    </div>
                </div>

            </div>

            <style>{`
                .sacred-btn { transition: all 0.2s; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
                .sacred-btn:hover { background: rgba(255,215,0,0.2) !important; color: #ffd700 !important; }
                .sacred-text-btn:hover h1 { text-shadow: 0 0 25px rgba(255,215,0,0.8) !important; }
                
                /* Responsive Logic */
                .mobile-only { display: none !important; }
                .desktop-only { display: block; }

                @media (max-width: 768px) {
                    .greek-column { display: none !important; }
                    .mobile-only { display: flex !important; }
                    .desktop-only { display: none !important; }
                }
            `}</style>
        </div >
    );
};
