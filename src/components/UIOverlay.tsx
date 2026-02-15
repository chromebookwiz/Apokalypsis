import React from 'react';
import { useSceneController } from '../controllers/SceneController';


interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const UIOverlay: React.FC<Props> = ({ controller }) => {
    const isRTL = controller.language === 'HE' || controller.language === 'AR';

    // Vertical Text Constants
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ"; // Apokalypsis

    return (
        <div className="ui-overlay" style={{ fontFamily: 'Cinzel, serif', pointerEvents: 'none' }}>

            {/* LEFT COLUMN: GREEK INVERTED */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '40px',
                transform: 'translateY(-50%) rotate(180deg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                pointerEvents: 'none',
                opacity: 0.6
            }}>
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

            {/* RIGHT COLUMN: GREEK */}
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
            }}>
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

            {/* TOP RIGHT: Dark Mode Toggle */}
            <div className={`corner-tr ${isRTL ? 'rtl-override-tr' : ''}`} style={{
                position: 'fixed',
                top: '40px',
                right: '40px',
                pointerEvents: 'auto',
                zIndex: 100
            }}>
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
                    onClick={() => controller.triggerCameraReset()}
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
                </div>
            </div>

            {/* BR: Controls */}
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
                            title={`c: ${controller.rotationSpeed?.toFixed(1) || 1.0}`}
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

            <style>{`
                .sacred-btn { transition: all 0.2s; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
                .sacred-btn:hover { background: rgba(255,215,0,0.2) !important; }
                .sacred-text-btn:hover h1 { text-shadow: 0 0 25px rgba(255,215,0,0.8) !important; }
            `}</style>
        </div>
    );
};
