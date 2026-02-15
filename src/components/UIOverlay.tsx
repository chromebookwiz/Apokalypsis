import React, { useMemo } from 'react';
import { useSceneController } from '../controllers/SceneController';
import { getRevelation } from '../data/revelation';
import { LANG_NAMES } from '../data/translations';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const UIOverlay: React.FC<Props> = ({ controller }) => {
    const isRTL = controller.language === 'HE';
    const isAmharic = controller.language === 'AM';
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ"; // Always Greek Title

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

    return (
        <div className="ui-overlay" style={{ fontFamily: 'Cinzel, serif', pointerEvents: 'none' }}>

            {/* EYE BUTTON (Toggle UI) - Always Visible */}
            <div style={{
                position: 'fixed',
                top: '40px',
                left: '40px',
                zIndex: 1000,
                pointerEvents: 'auto'
            }}>
                <button
                    className="sacred-btn"
                    onClick={() => controller.setUiVisible(!controller.uiVisible)}
                    title={controller.uiVisible ? "Hide UI" : "Show UI"}
                    style={{
                        fontSize: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: controller.uiVisible ? '#ffd700' : 'rgba(255, 215, 0, 0.5)',
                        cursor: 'pointer',
                        filter: controller.uiVisible ? 'drop-shadow(0 0 5px #ffd700)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {controller.uiVisible ? '👁' : '👁‍🗨'}
                </button>
            </div>

            {/* WRAPPER FOR TOGGLEABLE UI */}
            <div style={{
                opacity: controller.uiVisible ? 1 : 0,
                pointerEvents: controller.uiVisible ? 'auto' : 'none', // Disable interaction when hidden
                transition: 'opacity 0.5s ease',
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0
            }}>

                {/* LEFT COLUMN: GREEK TITLE (Vertical Upwards) */}
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '40px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column-reverse', // Upwards
                    gap: '5px',
                    pointerEvents: 'none',
                    opacity: 0.6
                }} className="greek-column">
                    {GREEK_TITLE.split('').map((char, i) => (
                        <div key={i} style={{
                            fontSize: '1.5rem',
                            color: '#ffd700',
                            textShadow: 'none',
                            textAlign: 'center',
                            transform: 'rotate(0deg)' // Upright
                        }}>
                            {char}
                        </div>
                    ))}
                </div>

                {/* RIGHT COLUMN: GREEK TITLE */}
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    right: '40px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    pointerEvents: 'none',
                    opacity: 0.6
                }} className="greek-column">
                    {GREEK_TITLE.split('').map((char, i) => (
                        <div key={i} style={{
                            fontSize: '1.5rem',
                            color: '#ffd700',
                            textShadow: 'none',
                            textAlign: 'center'
                        }}>
                            {char}
                        </div>
                    ))}
                </div>

                {/* CENTER TOP: Verse Display (Hidden unless Book Open) */}
                <div style={{
                    position: 'fixed',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    color: '#ffd700',
                    maxWidth: '600px',
                    width: '80%',
                    textShadow: '0 0 10px rgba(0,0,0,0.8)',
                    pointerEvents: 'none',
                    transition: 'all 0.5s ease',
                    opacity: controller.libraryOpen ? 1 : 0,
                    visibility: controller.libraryOpen ? 'visible' : 'hidden'
                }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.8 }}>{note}</div>
                    <div style={{
                        fontSize: isAmharic ? '1.5rem' : '1.5rem',
                        whiteSpace: 'pre-wrap',
                        fontFamily: isAmharic ? 'sans-serif' : 'Cinzel, serif',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                        {body}
                    </div>
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
                        title="Toggle Sacred Text"
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

                    {/* Language Dropdown (Hidden if Book Closed) */}
                    {controller.libraryOpen && (
                        <select
                            value={controller.language}
                            onChange={(e) => controller.setLang(e.target.value as any)}
                            style={{
                                fontSize: '1rem',
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid #ffd700',
                                color: '#ffd700',
                                cursor: 'pointer',
                                padding: '5px 10px',
                                fontFamily: 'Orbitron, sans-serif',
                                appearance: 'none', // Remove default arrow
                                textAlign: 'right',
                                width: '150px',
                                outline: 'none'
                            }}
                        >
                            {Object.entries(LANG_NAMES).map(([code, name]) => (
                                <option key={code} value={code} style={{ background: '#000', color: '#ffd700' }}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Dark Mode Toggle */}
                    <button
                        className="sacred-btn"
                        onClick={controller.toggleDarkMode}
                        title="Toggle Dark Mode"
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

                {/* BOTTOM CENTER: THE CROSS */}
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 100
                }}>
                    <button
                        className="sacred-text-btn"
                        onClick={() => controller.cycleCameraView()}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            color: '#ffd700',
                            textShadow: '0 0 15px rgba(255,215,0,0.5)',
                            transition: 'all 0.5s ease'
                        }}
                    >
                        <h1 style={{ margin: 0, fontSize: '4rem', lineHeight: 1 }}>☩</h1>
                    </button>
                </div>

                {/* BL: View Angle Display */}
                <div className={`corner-bl ${isRTL ? 'rtl-override-bl' : ''}`} style={{
                    bottom: '40px',
                    left: isRTL ? 'auto' : '40px',
                    right: isRTL ? '40px' : 'auto',
                    pointerEvents: 'none',
                    position: 'fixed'
                }}>
                    <div style={{
                        color: '#ffd700',
                        fontSize: '1.2rem',
                        fontFamily: 'monospace',
                        textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                    }}>
                        {Math.abs(controller.viewAngle)}° {controller.viewAngle > 0 ? 'N' : (controller.viewAngle < 0 ? 'S' : 'EQ')}
                        <div>
                            {Math.abs(controller.azimuthAngle)}° {controller.azimuthAngle > 0 ? 'E' : (controller.azimuthAngle < 0 ? 'W' : 'Z')}
                        </div>
                    </div>
                </div>

                {/* BR: Controls (Desktop: All, Mobile: Grid/Speed Only) */}
                <div className={`corner-br ${isRTL ? 'rtl-override-br' : ''}`} style={{
                    bottom: '40px',
                    left: isRTL ? '40px' : 'auto',
                    right: isRTL ? 'auto' : '40px',
                    pointerEvents: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '15px'
                }}>
                    {/* Dark Mode Toggle (Desktop Only) */}
                    <button
                        className="sacred-btn desktop-only"
                        onClick={controller.toggleDarkMode}
                        title="Toggle Dark Mode"
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

                    {/* Language Dropdown (Desktop Only, Hidden if Book Closed) */}
                    {controller.libraryOpen && (
                        <select
                            className="desktop-only"
                            value={controller.language}
                            onChange={(e) => controller.setLang(e.target.value as any)}
                            style={{
                                fontSize: '1rem',
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid #ffd700',
                                color: '#ffd700',
                                cursor: 'pointer',
                                padding: '5px 10px',
                                fontFamily: 'Orbitron, sans-serif',
                                appearance: 'none', // Remove default arrow
                                textAlign: 'right',
                                width: '150px',
                                outline: 'none'
                            }}
                        >
                            {Object.entries(LANG_NAMES).map(([code, name]) => (
                                <option key={code} value={code} style={{ background: '#000', color: '#ffd700' }}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Golden Book Icon (Desktop Only) */}
                    <button
                        className="sacred-btn desktop-only"
                        onClick={() => controller.setLibraryOpen(!controller.libraryOpen)}
                        title="Toggle Sacred Text"
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

                    {/* GRID SIZE CONTROLS */}
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4].map((size) => (
                            <button
                                key={size}
                                className={`sacred-btn ${controller.gridSize === size ? 'active' : ''}`}
                                style={{
                                    flex: 1, padding: '5px 10px', fontSize: '0.8rem', minWidth: '30px',
                                    border: controller.gridSize === size ? '1px solid #ffd700' : '1px solid #333',
                                    color: controller.gridSize === size ? '#ffd700' : '#555',
                                    boxShadow: controller.gridSize === size ? '0 0 15px rgba(255,215,0,0.2)' : 'none',
                                    textShadow: controller.gridSize === size ? '0 0 8px #ffd700' : 'none'
                                }}
                                onClick={() => controller.setGridSize(size as 1 | 2 | 3 | 4)}
                            >
                                {size}x
                            </button>
                        ))}
                    </div>

                    {/* SPEED & PLAY CONTROLS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="range"
                                min="0.1"
                                max="300"
                                step="0.1"
                                value={controller.rotationSpeed || 1.0}
                                onChange={(e) => controller.setRotationSpeed(parseFloat(e.target.value))}
                                style={{
                                    width: '100%',
                                    accentColor: '#ffd700',
                                    height: '10px',
                                    cursor: 'pointer',
                                    border: '1px solid #ffd700',
                                    borderRadius: '5px',
                                    background: 'rgba(255,215,0,0.1)'
                                }}
                                title={`Speed: ${controller.rotationSpeed?.toFixed(1) || 1.0}`}
                            />
                        </div>

                        <button
                            onClick={() => controller.setIsPlaying(!controller.isPlaying)}
                            style={{
                                background: 'none',
                                border: '1px solid #ffd700',
                                borderRadius: '50%', width: '40px', height: '40px',
                                color: '#ffd700',
                                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                boxShadow: controller.isPlaying ? '0 0 10px #ffd700' : 'none'
                            }}
                        >
                            {controller.isPlaying ? '⏸' : '▶'}
                        </button>
                    </div>
                </div>

            </div> {/* END WRAPPER */}

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
        </div>
    );
};
