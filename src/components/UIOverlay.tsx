import React, { useMemo } from 'react';
import { useSceneController } from '../controllers/SceneController';
import { getRevelation, getNollCubeText } from '../data/revelation';
import { getHymn, getNumericScripture } from '../data/scripture';
import { LANG_NAMES, UI_STRINGS } from '../data/translations';

const NollCubeContent = ({ language, isRTL }: { language: any, isRTL: boolean }) => {
    const text = getNollCubeText(language);

    return (
        <div style={{
            whiteSpace: 'pre-wrap',
            direction: isRTL ? 'rtl' : 'ltr',
            textAlign: isRTL ? 'right' : 'left'
        }}>
            {text}
        </div>
    );
};

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

// Draggable Helper Component
interface DraggablePanelProps {
    controller?: any; // strict typing skipped for now
    children: React.ReactNode;
    initialStyle?: React.CSSProperties;
    className?: string; // class name
}

const DraggablePanel = ({ children, initialStyle, className }: DraggablePanelProps) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const isDragging = React.useRef(false);
    const dragStart = React.useRef({ x: 0, y: 0 });
    const panelRef = React.useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only drag if clicking the background or a specific handle, not buttons
        if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) return;

        isDragging.current = true;
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            });
        };
        const handleMouseUp = () => {
            isDragging.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const style: React.CSSProperties = {
        ...initialStyle,
        transform: `${initialStyle?.transform || ''} translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging.current ? 'grabbing' : 'grab',
        transition: isDragging.current ? 'none' : initialStyle?.transition
    };

    return (
        <div
            ref={panelRef}
            style={style}
            className={className}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
};

export const UIOverlay: React.FC<Props> = ({ controller }) => {
    // ... (rest of imports/logic)
    const isRTL = ['HE', 'AR', 'FA'].includes(controller.language);
    const isAmharic = controller.language === 'AM';
    const ui = UI_STRINGS[controller.language] || UI_STRINGS['LA'];
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ";

    // Secret Trigger Logic
    const isSecretAngle = Math.abs(Number(controller.viewAngle.toFixed(2))) === 69.33 || Math.abs(Number(controller.azimuthAngle.toFixed(2))) === 69.33;

    const handleCenterCrossClick = () => {
        if (isSecretAngle) {
            // ... (Secret Link Logic) ...
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

    // ... (rest of setup) ...
    const [showInfo, setShowInfo] = React.useState(false);

    // Parse Revelation Text
    const { note, body } = useMemo(() => {
        // ... (same parsing) ...
        const raw = getRevelation(controller.language);
        const lines = raw.split('\n').filter(l => l.trim() !== '');
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
            {/* LEFT CORNER: EYE ICON ONLY */}
            <div className="corner-tl" style={{
                position: 'fixed', top: '20px', left: '20px', zIndex: 1100, pointerEvents: 'auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <button
                    className="sacred-btn"
                    onClick={() => controller.setUiVisible(!controller.uiVisible)}
                    title={controller.uiVisible ? ui.hide_ui : ui.show_ui}
                    style={{
                        fontSize: '2.4rem', background: 'none', border: 'none',
                        color: controller.uiVisible ? '#d4af37' : 'rgba(212, 175, 55, 0.4)', cursor: 'pointer',
                        filter: controller.uiVisible ? 'drop-shadow(0 0 10px #d4af37)' : 'none', transition: 'all 0.3s ease',
                        padding: '10px'
                    }}
                >👁</button>
            </div>

            {/* INFO MODAL - WRAPPED IN DRAGGABLE PANEL */}
            {showInfo && (
                <DraggablePanel
                    initialStyle={{
                        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '90%', maxWidth: '800px', height: '80vh',
                        backgroundColor: '#fdfbf7', border: '4px solid #d4af37', borderRadius: '15px',
                        boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
                        display: 'flex', flexDirection: 'column', zIndex: 2000, pointerEvents: 'auto', overflow: 'hidden'
                    }}
                >
                    <SacredBorder inverted={false} />
                    <div style={{
                        flex: 1, overflowY: 'auto', padding: '40px', color: '#1a1a1a',
                        fontFamily: controller.language === 'HI' ? 'sans-serif' : 'Inter, sans-serif',
                        fontSize: '1.1rem', lineHeight: '1.8', scrollbarWidth: 'thin',
                        scrollbarColor: '#d4af37 #fdfbf7', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'start' : 'left'
                    }}>
                        <button
                            onClick={() => setShowInfo(false)}
                            style={{
                                position: 'sticky', top: '0', float: 'right',
                                background: 'rgba(255,255,255,0.8)', border: '1px solid #d4af37',
                                borderRadius: '50%', width: '30px', height: '30px', color: '#d4af37', cursor: 'pointer'
                            }}
                        >✕</button>
                        <NollCubeContent language={controller.language} isRTL={isRTL} />
                        <div style={{
                            marginTop: '30px', padding: '20px', border: '1px solid #d4af37',
                            borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            textAlign: 'center', fontStyle: 'italic', color: '#d4af37', fontSize: '1.2rem'
                        }}>
                            {controller.language === 'HE' ? 'קוביה זו היא גרסת ה-4D של חזונו המושלם של מטטרון, ומכילה את כל שהיה, הווה ויהיה על פני האדמה.' :
                                controller.language === 'GR' ? 'Οὗτος ὁ κύβος ἐστὶν ἡ τετραδιάστατος (4D) ἔκδοσις τοῦ τελείου ὁράματος τοῦ Μετατρόνου, περιέχων πάντα τὰ γενόμενα, τὰ ὄντα καὶ τὰ ἐσόμενα ἐπὶ τῆς γῆς.' :
                                    'This cube is the 4D version of Metatron\'s perfect vision, and contains all that was, is, and will be on Earth.'}
                        </div>
                        <div style={{ marginTop: '30px', borderTop: '2px solid #d4af37', paddingTop: '20px', whiteSpace: 'pre-wrap', textAlign: isRTL ? 'right' : 'left' }}>
                            {getNumericScripture(controller.language)}
                        </div>
                        <div style={{ marginTop: '30px', borderTop: '2px solid #d4af37', paddingTop: '20px', whiteSpace: 'pre-wrap', fontStyle: 'italic', textAlign: isRTL ? 'right' : 'left' }}>
                            {getHymn(controller.language)}
                        </div>
                    </div>
                    <SacredBorder inverted={true} />
                </DraggablePanel>
            )}

            {/* THE CONSOLIDATED PANEL */}
            <DraggablePanel
                initialStyle={{
                    position: 'fixed', right: controller.uiVisible ? '40px' : '-450px',
                    top: '50%',
                    transform: 'translateY(-50%)', // Centering logic
                    maxHeight: '85vh',
                    width: '320px', backgroundColor: '#fdfbf7', border: '2px solid #d4af37', borderRadius: '15px',
                    boxShadow: '0 0 40px rgba(0,0,0,0.3)', pointerEvents: 'auto', zIndex: 900,
                    transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', padding: '40px 20px'
                }}
            >
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    opacity: 0.05, pointerEvents: 'none', zIndex: -1
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="sacred-pattern" x="50%" y="50%" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="translate(-50,-50)">
                            <circle cx="50" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                            <circle cx="50" cy="2" r="48" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                            <circle cx="50" cy="98" r="48" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                            <circle cx="2" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                            <circle cx="98" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
                    </svg>
                </div>

                {/* 45 Degree Templar Crosses in Corners */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                    <div key={pos} style={{
                        position: 'absolute', color: '#d4af37', fontSize: '1.8rem',
                        transform: 'rotate(45deg)', opacity: 0.8,
                        top: pos.includes('top') ? '5px' : 'auto',
                        bottom: pos.includes('bottom') ? '5px' : 'auto',
                        left: pos.includes('left') ? '5px' : 'auto',
                        right: pos.includes('right') ? '5px' : 'auto',
                    }}>☩</div>
                ))}


                <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '25px', paddingRight: '10px' }}>

                    {/* UTILITIES */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '10px', alignItems: 'center' }}>
                        <button className="sacred-btn" onClick={() => setShowInfo(!showInfo)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: '#d4af37', textAlign: 'center' }}>ℹ️</button>
                        <button className="sacred-btn" onClick={() => controller.setLibraryOpen(!controller.libraryOpen)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.libraryOpen ? '#fdfbf7' : '#d4af37', background: controller.libraryOpen ? '#d4af37' : 'none', textAlign: 'center' }}>📖</button>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={controller.language}
                                onChange={(e) => controller.setLanguage(e.target.value as any)}
                                style={{
                                    appearance: 'none', background: 'none', border: '1px solid #d4af37', width: '100%',
                                    borderRadius: '5px', color: '#d4af37', padding: '10px 5px',
                                    fontFamily: 'Cinzel, serif', fontSize: '0.7rem', cursor: 'pointer', textAlign: 'center'
                                }}
                            >
                                {Object.entries(LANG_NAMES).map(([code, name]) => (
                                    <option key={code} value={code} style={{ background: '#fdfbf7', color: '#1a1a1a' }}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* MOTION */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button className="sacred-btn" onClick={() => controller.setIsPlaying(!controller.isPlaying)} style={{ background: 'none', border: '1px solid #d4af37', borderRadius: '50%', width: '45px', height: '45px', color: '#d4af37', flexShrink: 0, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {controller.isPlaying ? '⏸' : '▶'}
                        </button>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <input type="range" min="0.1" max="300" step="0.1" value={controller.rotationSpeed || 1.0} onChange={(e) => controller.setRotationSpeed(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#d4af37' }} />
                            <div style={{ fontSize: '0.6rem', color: '#d4af37', textAlign: 'right' }}>{controller.rotationSpeed?.toFixed(1)} Hz</div>
                        </div>
                    </div>

                    {/* MODES */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <button className="sacred-btn" onClick={controller.toggleDarkMode} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.darkMode ? '#d4af37' : 'none', color: controller.darkMode ? '#fdfbf7' : '#d4af37', textAlign: 'center' }}>
                            {controller.darkMode ? '☀' : '☾'}
                        </button>
                        <button className="sacred-btn" onClick={controller.toggleCameraType} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: '#d4af37', textAlign: 'center' }}>
                            {controller.cameraType === 'ORTHOGRAPHIC' ? 'OR' : 'PS'}
                        </button>
                        <button className="sacred-btn" onClick={() => controller.setInfiniteTriangle(!controller.infiniteTriangle)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.infiniteTriangle ? '#d4af37' : 'none', color: controller.infiniteTriangle ? '#fdfbf7' : '#d4af37', fontSize: '1.2rem', textAlign: 'center' }}>
                            ∆
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4].map((size) => (
                            <button key={size} className="sacred-btn" onClick={() => controller.setGridSize(size as 1 | 2 | 3 | 4)} style={{ flex: 1, padding: '8px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.gridSize === size ? '#d4af37' : 'none', color: controller.gridSize === size ? '#fdfbf7' : '#d4af37', textAlign: 'center' }}>{size}x</button>
                        ))}
                    </div>

                    {/* HARMONICS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="sacred-btn" onClick={() => controller.toggleParallelLock()} style={{ flex: 1, padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.parallelLock ? '#fdfbf7' : '#d4af37', background: controller.parallelLock ? '#d4af37' : 'none', textAlign: 'center' }}>∥</button>
                            <button className="sacred-btn" onClick={() => controller.toggleTone()} style={{ flex: 1, padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.toneEnabled ? '#fdfbf7' : '#d4af37', background: controller.toneEnabled ? '#d4af37' : 'none', textAlign: 'center' }}>♪</button>
                        </div>
                        {controller.toneEnabled && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <button className="sacred-btn" onClick={() => controller.cycleToneScale()} style={{ padding: '8px', border: '1px dashed #d4af37', borderRadius: '5px', color: '#d4af37', fontSize: '0.7rem', textAlign: 'center' }}>{controller.toneScale}</button>
                                <button className="sacred-btn" onClick={() => controller.toggleVariedMode()} style={{ padding: '8px', border: '1px dashed #d4af37', borderRadius: '5px', color: controller.variedMode ? '#fdfbf7' : '#d4af37', background: controller.variedMode ? '#d4af37' : 'none', fontSize: '0.7rem', textAlign: 'center' }}>VAR {controller.variedMode ? '+' : '-'}</button>
                            </div>
                        )}
                    </div>

                    {/* PHASES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <button className="sacred-btn" onClick={() => controller.setSplitMode(!controller.splitMode)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.splitMode ? '#fdfbf7' : '#d4af37', background: controller.splitMode ? '#d4af37' : 'none', textAlign: 'center' }}>
                            SPLIT {controller.splitMode ? `(${(controller.frequencyA / (controller.frequencyB || 1)).toFixed(2)})` : 'OFF'}
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="range" className="red-slider" min="0" max="5" step="0.01" value={controller.frequencyA} onChange={(e) => controller.setFrequencyA(parseFloat(e.target.value))} style={{ flex: 1 }} />
                                <input type="number" min="0" max="5" step="0.01" value={controller.frequencyA.toFixed(2)} onChange={(e) => controller.setFrequencyA(parseFloat(e.target.value))} style={{ width: '60px', background: 'none', border: '1px solid #ff4444', borderRadius: '3px', color: '#ff4444', fontSize: '0.8rem', padding: '2px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="range" className="blue-slider" min="0" max="5" step="0.01" value={controller.frequencyB} onChange={(e) => controller.setFrequencyB(parseFloat(e.target.value))} style={{ flex: 1 }} />
                                <input type="number" min="0" max="5" step="0.01" value={controller.frequencyB.toFixed(2)} onChange={(e) => controller.setFrequencyB(parseFloat(e.target.value))} style={{ width: '60px', background: 'none', border: '1px solid #4444ff', borderRadius: '3px', color: '#4444ff', fontSize: '0.8rem', padding: '2px' }} />
                            </div>
                        </div>

                        <select value={controller.waveType} onChange={(e) => controller.setWaveType(e.target.value as any)} style={{ padding: '10px', background: 'none', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '5px', fontSize: '0.8rem' }}>
                            <option value="NONE">NONE</option>
                            <option value="SINE">SINE</option>
                            <option value="SAWTOOTH">SAW</option>
                            <option value="SQUARE">SQR</option>
                            <option value="FRACTAL">FRC</option>
                        </select>
                    </div>

                    {/* TOOLS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                        <button className="sacred-btn" onClick={() => controller.setRevealSymmetry(!controller.revealSymmetry)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.revealSymmetry ? '#fdfbf7' : '#d4af37', background: controller.revealSymmetry ? '#d4af37' : 'none', textAlign: 'center' }}>SYM</button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ fontSize: '0.6rem', color: '#d4af37', textAlign: 'center' }}>VISION</div>
                            <input type="range" min="-10" max="10" step="0.1" value={controller.innerVision} onChange={(e) => controller.setInnerVision(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#d4af37' }} />
                        </div>
                        <button className="sacred-btn" onClick={() => controller.setShow4DShadow(!controller.show4DShadow)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.show4DShadow ? '#fdfbf7' : '#d4af37', background: controller.show4DShadow ? '#d4af37' : 'none', textAlign: 'center' }}>4D</button>
                    </div>

                </div>
        </div>

                {/* BOTTOM NAVIGATION (CROSS) */ }
    <div style={{
        position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'auto', zIndex: 100, display: 'flex', alignItems: 'center', gap: '30px'
    }}>
        <button onClick={() => controller.prevCameraView()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37', fontSize: '2.5rem' }}>☩</button>
        <button
            onClick={handleCenterCrossClick}
            style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37',
                fontSize: '4.5rem', transform: isSecretAngle ? 'rotate(45deg)' : 'none',
                textShadow: isSecretAngle ? '0 0 25px rgba(212, 175, 55, 0.8)' : '0 0 15px rgba(212, 175, 55, 0.5)',
                transition: 'all 0.5s ease'
            }}
        >☩</button>
        <button onClick={() => controller.nextCameraView()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37', fontSize: '2.5rem' }}>☩</button>
    </div>

    {/* ANGLE DISPLAY */ }
    <div style={{
        position: 'fixed', bottom: '40px', left: isRTL ? 'auto' : '40px', right: isRTL ? '40px' : 'auto',
        color: '#d4af37', fontSize: '1rem', fontFamily: 'monospace', textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
        pointerEvents: 'none'
    }}>
        {Math.abs(controller.viewAngle).toFixed(2)}°{controller.viewAngle > 0 ? 'N' : 'S'}
        <div>{Math.abs(controller.azimuthAngle).toFixed(2)}°{controller.azimuthAngle > 0 ? 'E' : 'W'}</div>
    </div>

    {/* SIDE GREEK COLUMNS - Refined opacity */ }
    <div style={{ position: 'fixed', top: '50%', left: '120px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column-reverse', gap: '5px', pointerEvents: 'none', opacity: 0.1, zIndex: 0 }} className="greek-column">
        {GREEK_TITLE.split('').map((char, i) => (<div key={i} style={{ fontSize: '1.5rem', color: '#d4af37', textAlign: 'center' }}>{char}</div>))}
    </div>

    {/* VERSE DISPLAY */ }
    <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', color: '#d4af37', maxWidth: '600px', width: '80%',
        transition: 'all 0.5s ease', opacity: (controller.libraryOpen && controller.uiVisible) ? 1 : 0, visibility: (controller.libraryOpen && controller.uiVisible) ? 'visible' : 'hidden',
        zIndex: 800
    }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.8 }}>{note}</div>
        <div style={{ fontSize: '1.5rem', whiteSpace: 'pre-wrap', fontFamily: isAmharic ? 'sans-serif' : 'Cinzel, serif', direction: isRTL ? 'rtl' : 'ltr' }}>{body}</div>
    </div>

    {/* NOLL CUBE OVERLAY */ }
    <div style={{
        position: 'fixed', bottom: '150px', left: '40px', zIndex: 100, pointerEvents: 'auto',
        display: controller.metatronShape === 'MERKABA' ? 'block' : 'none',
        opacity: controller.uiVisible ? 1 : 0, transition: 'opacity 0.5s'
    }}>
        <div style={{
            backgroundColor: '#fdfbf7', padding: '20px', borderRadius: '15px', border: '1px solid #d4af37',
            maxWidth: '300px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', color: '#1a1a1a'
        }}>
            <NollCubeContent language={controller.language} isRTL={isRTL} />
        </div>
    </div>

        </div >
    );
};
