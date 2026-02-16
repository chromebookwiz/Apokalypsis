import React, { useMemo } from 'react';
import { useSceneController } from '../controllers/SceneController';
import { getRevelation, getNollCubeText } from '../data/revelation';
import { getHymn, getNumericScripture } from '../data/scripture';
import { LANG_NAMES } from '../data/translations';

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
    const isRTL = controller.language === 'HE';
    const isAmharic = controller.language === 'AM';
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ"; // Always Greek Title

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
                    title={controller.uiVisible ? "Hide UI" : "Show UI"}
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
                            title="The Noll Cube Info"
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

            {/* NOLL CUBE TABLET MODAL (White & Gold Theme) */}
            {showInfo && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '800px',
                    height: '80vh',
                    backgroundColor: controller.darkMode ? '#000000' : '#fdfbf7', // Dark Mode: Black
                    border: '4px solid #d4af37', // Gold Border
                    borderRadius: '15px',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 2000,
                    pointerEvents: 'auto',
                    overflow: 'hidden'
                }}>
                    {/* Top Decoration */}
                    <SacredBorder inverted={false} />

                    {/* Content Area */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '40px',
                        color: controller.darkMode ? '#ffd700' : '#1a1a1a', // Dark Mode: Gold Text
                        fontFamily: controller.language === 'HI' ? 'sans-serif' : 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#d4af37 #fdfbf7'
                    }}>
                        {/* Close Button */}
                        <button
                            onClick={() => setShowInfo(false)}
                            style={{
                                position: 'sticky',
                                top: '0',
                                float: 'right',
                                background: controller.darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                                border: '1px solid #d4af37',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                color: '#d4af37',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            ✕
                        </button>

                        <NollCubeContent language={controller.language} />

                        {/* Numeric Scripture */}
                        <div style={{
                            marginTop: '30px',
                            borderTop: '2px solid #d4af37',
                            paddingTop: '20px',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {getNumericScripture(controller.language)}
                        </div>

                        {/* Hymn of the Bull */}
                        <div style={{
                            marginTop: '30px',
                            borderTop: '2px solid #d4af37',
                            paddingTop: '20px',
                            whiteSpace: 'pre-wrap',
                            fontStyle: 'italic'
                        }}>
                            {getHymn(controller.language)}
                        </div>
                    </div>

                    {/* Bottom Decoration */}
                    <SacredBorder inverted={true} />
                </div>
            )}

            {/* WRAPPER FOR TOGGLEABLE UI */}
            <div style={{
                opacity: controller.uiVisible ? 1 : 0,
                pointerEvents: 'none',
                visibility: controller.uiVisible ? 'visible' : 'hidden',
                transition: 'opacity 0.5s ease, visibility 0.5s ease',
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0
            }}>

                {/* TOP CENTER: PARALLEL LOCK BUTTON */}
                <div style={{
                    position: 'fixed',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 100
                }}>
                    <button
                        onClick={() => controller.toggleParallelLock()}
                        title={controller.parallelLock ? 'Unlock Parallel Lines' : 'Lock Parallel Lines'}
                        style={{
                            background: controller.parallelLock ? 'rgba(255, 215, 0, 0.15)' : 'none',
                            border: controller.parallelLock ? '2px solid #ffd700' : '2px solid rgba(255, 215, 0, 0.4)',
                            borderRadius: '10px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            color: controller.parallelLock ? '#ffd700' : 'rgba(255, 215, 0, 0.6)',
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            textShadow: controller.parallelLock ? '0 0 15px rgba(255,215,0,0.8)' : 'none',
                            boxShadow: controller.parallelLock ? '0 0 20px rgba(255,215,0,0.3), inset 0 0 10px rgba(255,215,0,0.1)' : 'none',
                            transition: 'all 0.3s ease',
                            fontFamily: 'monospace',
                            lineHeight: 1
                        }}
                    >
                        ∥
                    </button>
                </div>

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
                    textShadow: controller.darkMode ? '0 0 10px rgba(0,0,0,0.8)' : 'none',
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

                {/* BOTTOM CENTER: THE CROSS NAVIGATION */}
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    {/* PREV CROSS (Small) */}
                    <button
                        className="sacred-text-btn"
                        onClick={() => controller.prevCameraView()}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            color: 'rgba(255, 215, 0, 0.7)',
                            textShadow: '0 0 10px rgba(255,215,0,0.3)',
                            marginTop: '10px' // Align visual center
                        }}
                        title="Previous Angle"
                    >
                        <h1 style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1 }}>☩</h1>
                    </button>

                    {/* CENTER CROSS (Big - Reset) */}
                    <button
                        className="sacred-text-btn"
                        onClick={() => controller.resetCameraView()}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            color: '#ffd700',
                            textShadow: '0 0 15px rgba(255,215,0,0.5)',
                            transition: 'all 0.5s ease',
                            transform: 'scale(1.2)'
                        }}
                        title="Reset to Front"
                    >
                        <h1 style={{ margin: 0, fontSize: '4rem', lineHeight: 1 }}>☩</h1>
                    </button>

                    {/* NEXT CROSS (Small) */}
                    <button
                        className="sacred-text-btn"
                        onClick={() => controller.nextCameraView()}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            color: 'rgba(255, 215, 0, 0.7)',
                            textShadow: '0 0 10px rgba(255,215,0,0.3)',
                            marginTop: '10px'
                        }}
                        title="Next Angle"
                    >
                        <h1 style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1 }}>☩</h1>
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
