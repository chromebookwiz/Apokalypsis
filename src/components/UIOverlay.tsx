import React, { useMemo, useState } from 'react';
import { useSceneController } from '../controllers/SceneController';
import { getRevelation, getNollCubeText } from '../data/revelation';
import { connectAudioSource, getAudioCtx } from '../views/geometries/Metatron';
import { getHymn, getNumericScripture } from '../data/scripture';
import { LANG_NAMES, UI_STRINGS } from '../data/translations';
import { SecretEntry } from './SecretEntry';
import { v12Solver } from '../models/V12CurvatureSolver';

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

// Copy Button Component
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            title="Copy to Clipboard"
            style={{
                background: 'none', border: '1px solid #d4af37', borderRadius: '5px',
                color: copied ? '#fdfbf7' : '#d4af37',
                backgroundColor: copied ? '#d4af37' : 'transparent',
                cursor: 'pointer', padding: '5px 10px', fontSize: '0.8rem',
                marginLeft: '10px', transition: 'all 0.3s ease'
            }}
        >
            {copied ? '𐄂' : '⧉'}
        </button>
    );
};

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
        // Only drag if clicking the header (marked with class 'drag-handle')
        if (!(e.target as HTMLElement).closest('.drag-handle')) return;

        // Prevent default text selection during drag
        e.preventDefault();

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
        cursor: 'default',
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

// --- DIVINE CORNERS COMPONENT ---
const DivineCorners: React.FC = () => {
    const cornerStyle: React.CSSProperties = {
        position: 'fixed',
        width: '200px',
        height: '200px',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: 0.15,
        color: '#d4af37'
    };

    const renderCorner = (style: React.CSSProperties, rotation: string) => (
        <div style={{ ...cornerStyle, ...style, transform: rotation }}>
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                {/* Sacred Geometry: Concentric circles representing the Noll Cube structure */}
                <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <circle cx="0" cy="0" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <circle cx="0" cy="0" r="75" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="0" cy="0" r="90" fill="none" stroke="currentColor" strokeWidth="0.2" />

                {/* Radial lines: 24 meridians (representing 2T group) */}
                {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <line
                            key={i}
                            x1="0"
                            y1="0"
                            x2={200 * Math.cos(rad)}
                            y2={200 * Math.sin(rad)}
                            stroke="currentColor"
                            strokeWidth={i % 6 === 0 ? "0.3" : "0.1"}
                            opacity={i % 6 === 0 ? 0.8 : 0.4}
                        />
                    );
                })}

                {/* Parallel circles: 12 parallels (representing A4 group) */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                    const radius = (i * 15);
                    return (
                        <circle
                            key={i}
                            cx="0"
                            cy="0"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={i % 3 === 0 ? "0.2" : "0.1"}
                            opacity={i % 3 === 0 ? 0.6 : 0.3}
                        />
                    );
                })}

                {/* Sacred intersection points (288 cells = 24×12) */}
                {Array.from({ length: 12 }).map((_, j) => {
                    const radius = (j + 1) * 15;
                    return Array.from({ length: 24 }).map((_, i) => {
                        const angle = (i * 360) / 24;
                        const rad = (angle * Math.PI) / 180;
                        const x = radius * Math.cos(rad);
                        const y = radius * Math.sin(rad);
                        return (
                            <circle
                                key={`${i}-${j}`}
                                cx={x}
                                cy={y}
                                r="0.8"
                                fill="currentColor"
                                opacity={0.4}
                            />
                        );
                    });
                })}

                {/* Corner quadrant lines */}
                <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" strokeWidth="0.3" />
                <line x1="0" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="0.3" />
            </svg>
        </div>
    );

    return (
        <>
            {renderCorner({ top: 0, left: 0 }, 'none')}
            {renderCorner({ top: 0, right: 0 }, 'rotate(90deg)')}
            {renderCorner({ bottom: 0, right: 0 }, 'rotate(180deg)')}
            {renderCorner({ bottom: 0, left: 0 }, 'rotate(270deg)')}
        </>
    );
};

export const UIOverlay: React.FC<Props> = ({ controller }) => {
    // ... (rest of imports/logic)
    const isRTL = ['HE', 'AR', 'FA'].includes(controller.language);
    const isAmharic = controller.language === 'AM';
    const ui = UI_STRINGS[controller.language] || UI_STRINGS['LA'];
    const GREEK_TITLE = "ΑΠΟΚΑΛΥΨΙΣ";

    // Secret Trigger Logic removed - center cross button removed per user request

    // ... (rest of setup) ...
    const [showInfo, setShowInfo] = React.useState(false);
    const [secretFlash, setSecretFlash] = useState(false);
    const [introUnlocked, _setIntroUnlocked] = useState(false);
    const [introOpen, setIntroOpen] = useState(false);
    const [labTab, setLabTab] = useState<'TOOLS' | 'LAB'>('TOOLS');
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [songs, setSongs] = React.useState<Array<{
        title: string;
        filename: string;
        url?: string;
        rotationSpeed?: number;
        frequencyA?: number;
        frequencyB?: number;
        toneScale?: string;
        varied?: boolean;
        blobUrl?: string;
    }>>([]);
    const [currentSong, setCurrentSong] = React.useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
    const [songsPanelOpen, setSongsPanelOpen] = React.useState(false);
    const [showSongsButton, setShowSongsButton] = React.useState(false);

    // Audio Sync Effect for Intro
    React.useEffect(() => {
        if (introOpen && audioRef.current) {
            getAudioCtx().resume().then(() => {
                connectAudioSource(audioRef.current!);
                controller.setAudioSync(true);
            });
        } else if (!introOpen) {
            controller.setAudioSync(false);
        }
    }, [introOpen]);

    // Load songs manifest in the background (non-blocking) on component mount
    // This ensures site loads first, then songs are fetched asynchronously
    React.useEffect(() => {
        let isMounted = true;
        
        // Defer loading to allow initial render to complete
        const loadTimer = setTimeout(async () => {
            try {
                const resp = await fetch('/ai-songs.json', { cache: 'default' });
                if (!resp.ok) throw new Error('Failed to fetch songs');
                
                const list = await resp.json() as any[];
                if (!isMounted || !Array.isArray(list)) return;
                
                const items = list.map(i => ({
                    title: i.title || 'Unknown',
                    filename: i.filename || '',
                    url: '/' + encodeURIComponent(i.filename || ''),
                    rotationSpeed: typeof i.rotationSpeed === 'number' ? i.rotationSpeed : undefined,
                    frequencyA: typeof i.frequencyA === 'number' ? i.frequencyA : undefined,
                    frequencyB: typeof i.frequencyB === 'number' ? i.frequencyB : undefined,
                    toneScale: typeof i.toneScale === 'string' ? i.toneScale : undefined,
                    varied: typeof i.varied === 'boolean' ? i.varied : undefined,
                    blobUrl: undefined
                }));
                setSongs(items);
                // Prefetch first track in background
                if (items.length && typeof prefetchAudioBlob === 'function') {
                    setTimeout(() => prefetchAudioBlob(items, 0), 100);
                }
            } catch (err) {
                if (!isMounted) return;
                console.warn('[Songs] Failed to load manifest, using fallback');
                // Fallback: derive from known public files
                const fallback = [
                    "1. A PIMP'S BEGINNINGS.wav",
                    '25. CHRIS PIMP.wav', '31. FRANKENHOE.wav', '33. MATADOR PIMP.wav', "34. THE PIMP'S ENVY.wav",
                    '38. THE HISTORY OF ISRAEL.wav', '39. ASCENT AND AWEKENING.wav', "40. A PIMP'S DECLARATION.wav",
                    '41. THE SECRETS OF A PIMP.wav', '42. SKY BULL.wav', '51. HELL ON EARTH.wav'
                ].map(f => {
                    const clean = f.replace(/^\d+\.\s*/, '').replace(/\.wav$/i, '');
                    return { 
                        title: clean, 
                        filename: f, 
                        url: '/' + encodeURIComponent(f),
                        rotationSpeed: 0.2,
                        frequencyA: 440,
                        frequencyB: 660,
                        toneScale: 'MERKABA',
                        varied: false,
                    };
                });
                setSongs(fallback);
            }
        }, 500); // 500ms delay to prioritize initial page render
        
        return () => {
            isMounted = false;
            clearTimeout(loadTimer);
        };
    }, []); // Run once on mount only

    const playAbortControllers = React.useRef<Map<number, AbortController>>(new Map());

    const playSong = async (s: any, index: number, retryCount = 0): Promise<void> => {
        if (!s) return;
        
        // Cancel any previous request for this track
        const prevCtrl = playAbortControllers.current.get(index);
        if (prevCtrl) prevCtrl.abort();
        
        const abortCtrl = new AbortController();
        playAbortControllers.current.set(index, abortCtrl);
        
        try {
            // Prefer blob URL, fallback to cached URL, then to direct fetch
            const url = s.blobUrl || s.url || ('/' + encodeURIComponent(s.filename));
            setCurrentIndex(index);
            setCurrentSong(url);
            
            const ctx = getAudioCtx();
            await ctx.resume();
            
            if (audioRef.current && !abortCtrl.signal.aborted) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current.src = url;
                connectAudioSource(audioRef.current);
                audioRef.current.currentTime = 0;
                
                // Play with timeout to catch hangs
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    await Promise.race([
                        playPromise,
                        new Promise<void>((_, reject) =>
                            setTimeout(() => reject(new Error('PLAY_TIMEOUT')), 8000)
                        )
                    ]);
                }
                
                controller.setAudioSync(true);
                if (typeof s.rotationSpeed === 'number') controller.setRotationSpeed(s.rotationSpeed);
                if (typeof s.frequencyA === 'number') controller.setFrequencyA(s.frequencyA);
                if (typeof s.frequencyB === 'number') controller.setFrequencyB(s.frequencyB);
                if (typeof s.toneScale === 'string') controller.setToneScale(s.toneScale as any);
                if (typeof s.varied === 'boolean') controller.setVariedMode(s.varied);
                controller.setToneEnabled(true);
            }
        } catch (e) {
            // Abort signal means user stopped playback or new song was queued
            if (e instanceof DOMException && e.name === 'NotAllowedError') {
                console.warn(`[Audio] Playback not allowed (context suspended or user stopped)`, s.filename);
                return;
            }
            
            // Retry logic for network/timeout errors (but not on blob URLs which are local)
            if (retryCount < 2 && !s.blobUrl && (e instanceof Error && /timeout|abort|fetch/i.test(e.message))) {
                const delay = 300 * Math.pow(2, retryCount); // exponential backoff
                console.warn(`[Audio] Retry ${retryCount + 1} for ${s.filename} in ${delay}ms`);
                await new Promise(r => setTimeout(r, delay));
                return playSong(s, index, retryCount + 1);
            }
            
            console.warn(`[Audio] playSong failed for ${s.filename}:`, e instanceof Error ? e.message : String(e));
        } finally {
            playAbortControllers.current.delete(index);
        }
    };

    // Helper: fetch audio as blob and store object URL on songs state (with retry)
    const prefetchAudioBlob = async (items: any[], index: number, retryCount = 0) => {
        if (!items || !items[index]) return;
        
        const src = items[index].url || ('/' + encodeURIComponent(items[index].filename));
        try {
            const resp = await fetch(src, { 
                cache: 'default',  // Allow browser to use cache or network
                signal: AbortSignal.timeout(10000)  // 10s timeout
            });
            if (!resp.ok) {
                console.warn(`[Prefetch] HTTP ${resp.status} for ${items[index].filename}`);
                return;
            }
            
            const blob = await resp.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            // Update state with blob URL
            setSongs(prev => {
                const copy = prev.slice();
                if (copy[index]) copy[index] = { ...copy[index], blobUrl };
                return copy;
            });
            
            // Schedule background prefetch for next few tracks (staggered)
            for (let i = index + 1; i < Math.min(items.length, index + 3); i++) {
                setTimeout(() => prefetchAudioBlob(items, i), 400 * (i - index));
            }
        } catch (e) {
            // Silently ignore prefetch errors; playback will use network fallback
            if (e instanceof Error && e.name !== 'AbortError') {
                // Retry once on network failure (not on abort)
                if (retryCount < 1) {
                    setTimeout(() => prefetchAudioBlob(items, index, retryCount + 1), 1000);
                }
            }
        }
    };

    // Revoke any blob URLs when songs list changes/unmount
    React.useEffect(() => {
        return () => {
            songs.forEach(s => {
                if (s.blobUrl) try { URL.revokeObjectURL(s.blobUrl); } catch (_) { }
            });
        };
    }, [songs]);

    const handleDigitClick = (char: string) => {
        if (char === '3' && !controller.theoryUnlocked) {
            controller.setTheoryUnlocked(true);
            setSecretFlash(true);
            setTimeout(() => setSecretFlash(false), 600);
            return;
        }
        if (char === '6') {
            // toggle hymns panel; show music button affordance
            setSongsPanelOpen(open => !open);
            setShowSongsButton(true);
        }
    };

    // Render angle text with clickable digits
    const renderClickableAngle = (text: string) => {
        return text.split('').map((char, i) => {
            const isClickable = char === '6' || char === '3';
            if (!isClickable) return <span key={i}>{char}</span>;

            return (
                <span
                    key={i}
                    onClick={() => handleDigitClick(char)}
                    style={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-block', // Pixel precise hitbox
                        minWidth: '0.6em',
                        textAlign: 'center',
                        userSelect: 'none',
                        ...(secretFlash ? { color: '#fff', textShadow: '0 0 20px #ffd700, 0 0 40px #ffd700' } : {})
                    }}
                >
                    {char}
                </span>
            );
        });
    };

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
            {/* SUBTLE HOLY OVERLAY */}
            <DivineCorners />

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
                >𓁹</button>
                <button
                    className="sacred-btn"
                    onClick={() => controller.setPracticalPanelOpen(!controller.practicalPanelOpen)}
                    title="Practical Engineering"
                    style={{
                        fontSize: '2.4rem', background: 'none', border: 'none',
                        color: controller.practicalPanelOpen ? '#d4af37' : 'rgba(212, 175, 55, 0.4)', cursor: 'pointer',
                        filter: controller.practicalPanelOpen ? 'drop-shadow(0 0 10px #d4af37)' : 'none', transition: 'all 0.3s ease',
                        padding: '10px'
                    }}
                >𓁧</button>
            </div>

            {/* INFO MODAL - WRAPPED IN DRAGGABLE PANEL */}
            {showInfo && controller.uiVisible && (
                <DraggablePanel
                    initialStyle={{
                        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '90%', maxWidth: '800px', height: '80vh',
                        backgroundColor: '#fdfbf7', border: '4px solid #d4af37', borderRadius: '15px',
                        boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
                        display: 'flex', flexDirection: 'column', zIndex: 2000, pointerEvents: 'auto', overflow: 'hidden'
                    }}
                >
                    <div className="drag-handle" style={{
                        padding: '15px', background: 'rgba(212, 175, 55, 0.05)', borderBottom: '1px solid #d4af37',
                        cursor: 'grab', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <span style={{ fontFamily: 'Cinzel, serif', color: '#d4af37', fontWeight: 'bold' }}></span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <CopyButton text={getNollCubeText(controller.language) + "\n\n" + getNumericScripture(controller.language) + "\n\n" + getHymn(controller.language)} />
                            <button
                                onClick={() => setShowInfo(false)}
                                style={{
                                    background: 'none', border: '1px solid #d4af37', borderRadius: '50%',
                                    width: '30px', height: '30px', color: '#d4af37', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >✕</button>
                        </div>
                    </div>
                    <SacredBorder inverted={false} />
                    <div style={{
                        flex: 1, overflowY: 'auto', padding: '40px', color: '#1a1a1a',
                        fontFamily: controller.language === 'HI' ? 'sans-serif' : 'Inter, sans-serif',
                        fontSize: '1.1rem', lineHeight: '1.8', scrollbarWidth: 'thin',
                        scrollbarColor: '#d4af37 #fdfbf7', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'start' : 'left'
                    }}>
                        <NollCubeContent language={controller.language} isRTL={isRTL} />
                        <div style={{
                            marginTop: '30px', padding: '20px', border: '1px solid #d4af37',
                            borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            textAlign: 'center', fontStyle: 'italic', color: '#d4af37', fontSize: '1.2rem'
                        }}>
                            {controller.language === 'HE' ? 'קוביה זו היא גרסת ה-4D של חזונו המושלם של מטטרון, ומכילה את כל שהיה, הווה ויהיה על פני האדמה.' :
                                controller.language === 'GR' ? 'Οὗτος ὁ κύβος ἐστὶν ἡ τετραδιάστατος (4D) ἔκδοσις τοῦ τελείου ὁράματος τοῦ Μετατρόνου, περιέχων πάντα τὰ γενόμενα, τὰ ὄντα καὶ τὰ ἐσόμενα ἐπὶ τῆς γῆς.' :
                                    '∞ ◈ 4D ◈ ∞'}
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
            )
            }

            {/* PRACTICAL ENGINEERING PANEL - TOP CENTER */}
            {controller.practicalPanelOpen && controller.uiVisible && (
                <DraggablePanel
                    initialStyle={{
                        position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
                        width: '90%', maxWidth: '900px', backgroundColor: '#fdfbf7', border: '2px solid #d4af37',
                        borderRadius: '15px', boxShadow: '0 0 40px rgba(0,0,0,0.5)', zIndex: 1200,
                        display: 'flex', flexDirection: 'column', pointerEvents: 'auto', overflow: 'hidden'
                    }}
                >
                    <div className="drag-handle" style={{
                        padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderBottom: '1px solid #d4af37',
                        cursor: 'grab', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                            [ GA_ENGINE_V12.0 // REAL-TIME_LITERAL_SOLVER ]
                        </span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => setLabTab('TOOLS')}
                                style={{ background: labTab === 'TOOLS' ? '#d4af37' : 'none', border: '1px solid #d4af37', color: labTab === 'TOOLS' ? '#000' : '#d4af37', fontSize: '0.6rem', padding: '2px 10px', cursor: 'pointer' }}
                            >TOOLS</button>
                            <button
                                onClick={() => setLabTab('LAB')}
                                style={{ background: labTab === 'LAB' ? '#d4af37' : 'none', border: '1px solid #d4af37', color: labTab === 'LAB' ? '#000' : '#d4af37', fontSize: '0.6rem', padding: '2px 10px', cursor: 'pointer' }}
                            >ENC_LAB</button>
                            <button onClick={() => controller.setPracticalPanelOpen(false)} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer' }}>✕</button>
                        </div>
                    </div>

                    {labTab === 'TOOLS' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', padding: '20px' }}>
                            {/* RSA BREAKER */}
                            <div style={{ border: '1px solid #d4af37', padding: '15px', borderRadius: '10px', background: controller.rsaToolActive ? 'rgba(212,175,55,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>𓋹</span>
                                    <button
                                        onClick={() => controller.setRsaToolActive(!controller.rsaToolActive)}
                                        style={{ background: controller.rsaToolActive ? '#d4af37' : 'none', border: '1px solid #d4af37', borderRadius: '5px', color: controller.rsaToolActive ? '#fff' : '#d4af37', padding: '2px 8px', cursor: 'pointer' }}
                                    >
                                        {controller.rsaToolActive ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>RSA_LATTICE_SVP</div>
                                <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>
                                    GAP: {controller.rsaToolActive ? controller.latticeGap.toFixed(6) : "---"}
                                </div>

                                {/* Literal Factorization readout */}
                                {controller.rsaToolActive && (
                                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', marginTop: '10px', paddingTop: '10px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>TARGET_N: 62615533</div>
                                        <div style={{ fontSize: '0.9rem', color: '#d4af37', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                            P: {controller.rsaFactorP}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#d4af37', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                            Q: {controller.rsaFactorQ}
                                        </div>
                                        {controller.rsaSolved && (
                                            <div style={{ color: '#00ff00', fontSize: '0.65rem', marginTop: '5px', animation: 'blink 1s infinite' }}>
                                                [ FACTORIZATION_SUCCESS ]
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* LATTICE SVP TOOL */}
                            <div style={{ border: '1px solid #d4af37', padding: '15px', borderRadius: '10px', background: controller.latticeToolActive ? 'rgba(212,175,55,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>𓍲</span>
                                    <button
                                        onClick={() => controller.setLatticeToolActive(!controller.latticeToolActive)}
                                        style={{ background: controller.latticeToolActive ? '#d4af37' : 'none', border: '1px solid #d4af37', borderRadius: '5px', color: controller.latticeToolActive ? '#fff' : '#d4af37', padding: '2px 8px', cursor: 'pointer' }}
                                    >
                                        {controller.latticeToolActive ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>LATTICE_SVP_RESONANCE</div>
                                <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>
                                    GAP: {controller.latticeToolActive ? controller.latticeSvpGap.toFixed(4) : "---"}
                                </div>
                                {controller.latticeToolActive && (
                                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', marginTop: '10px', paddingTop: '10px' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888' }}>SVP_SOLVE_STATUS</div>
                                        {controller.latticeSvpSolved ? (
                                            <div style={{ color: '#00ff00', fontSize: '0.65rem', marginTop: '5px', animation: 'blink 1s infinite' }}>
                                                [ RESONANCE_LOCKED ]
                                            </div>
                                        ) : (
                                            <div style={{ color: '#d4af37', fontSize: '0.6rem', opacity: 0.6 }}>ALIGN 4D BASIS...</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* SIGNAL PURIFIER */}
                            <div style={{ border: '1px solid #d4af37', padding: '15px', borderRadius: '10px', background: controller.signalToolActive ? 'rgba(212,175,55,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>𓏽</span>
                                    <button
                                        onClick={() => controller.setSignalToolActive(!controller.signalToolActive)}
                                        style={{ background: controller.signalToolActive ? '#d4af37' : 'none', border: '1px solid #d4af37', borderRadius: '5px', color: controller.signalToolActive ? '#fff' : '#d4af37', padding: '2px 8px', cursor: 'pointer' }}
                                    >
                                        {controller.signalToolActive ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>SU(2)_HOLONOMY</div>
                                <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>
                                    PURITY: {controller.signalToolActive ? controller.filterPurity.toFixed(2) : "---"}%
                                </div>
                            </div>

                            {/* HOLOGRAPHIC COMPRESSION */}
                            <div style={{ border: '1px solid #d4af37', padding: '15px', borderRadius: '10px', background: controller.compressionToolActive ? 'rgba(212,175,55,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>𒀭</span>
                                    <button
                                        onClick={() => controller.setCompressionToolActive(!controller.compressionToolActive)}
                                        style={{ background: controller.compressionToolActive ? '#d4af37' : 'none', border: '1px solid #d4af37', borderRadius: '5px', color: controller.compressionToolActive ? '#fff' : '#d4af37', padding: '2px 8px', cursor: 'pointer' }}
                                    >
                                        {controller.compressionToolActive ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>4D_PROJECT_MAP</div>
                                <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>
                                    LOSS: {controller.compressionToolActive ? controller.compressionLoss.toExponential(2) : "---"}
                                </div>
                            </div>

                            {/* MORPHOGENESIS */}
                            <div style={{ border: '1px solid #d4af37', padding: '15px', borderRadius: '10px', background: controller.morphToolActive ? 'rgba(212,175,55,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>𓍲</span>
                                    <button
                                        onClick={() => controller.setMorphToolActive(!controller.morphToolActive)}
                                        style={{ background: controller.morphToolActive ? '#d4af37' : 'none', border: '1px solid #d4af37', borderRadius: '5px', color: controller.morphToolActive ? '#fff' : '#d4af37', padding: '2px 8px', cursor: 'pointer' }}
                                    >
                                        {controller.morphToolActive ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>CELL_GROWTH_GA</div>
                                <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>
                                    ΔE: {controller.morphToolActive ? controller.morphEnergy.toFixed(4) : "---"}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ENCRYPTION LAB TAB */
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ marginBottom: '5px', fontSize: '0.75rem', color: '#555' }}>
                                <span style={{ fontWeight: 'bold', color: '#d4af37' }}>How this lab works:</span>{' '}
                                1) Choose a file or type some text. 2) Press ENCRYPT to transform it. 3) Press DECRYPT to recover what you put in.
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {/* Left Side: Controls */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ color: '#d4af37', fontSize: '0.8rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '5px' }}>𓋹_FILE_IN</div>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (re) => {
                                                    if (re.target?.result) {
                                                        controller.setLabBuffer(new Uint8Array(re.target.result as ArrayBuffer));
                                                    }
                                                };
                                                reader.readAsArrayBuffer(file);
                                            }
                                        }}
                                        style={{ fontSize: '0.7rem', color: '#d4af37' }}
                                    />
                                    <div style={{ padding: '15px', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '5px' }}>DIRECT_STRING_INPUT [V12_LITERAL]</div>
                                        <textarea
                                            value={controller.labString}
                                            onChange={(e) => controller.setLabString(e.target.value)}
                                            placeholder="Enter sacred text to encrypt..."
                                            style={{
                                                width: '100%', height: '60px', background: 'rgba(0,0,0,0.4)',
                                                border: '1px solid rgba(212,175,55,0.3)', color: '#d4af37',
                                                fontSize: '0.8rem', padding: '10px', borderRadius: '5px',
                                                fontFamily: 'Orbitron, sans-serif'
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                                        {/* Row 1: Lattice */}
                                        <button
                                            onClick={controller.latticeEncrypt}
                                            title="LATTICE_SVP_ENCRYPT (4D Basis Projection)"
                                            style={{ padding: '10px', background: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <span>𓍲</span>
                                            <span style={{ fontSize: '0.4rem', opacity: 0.8 }}>ENCRYPT</span>
                                        </button>
                                        <button
                                            onClick={controller.latticeDecrypt}
                                            disabled={!controller.processedBuffer || controller.labStatus !== 'IDLE'}
                                            title="LATTICE_SVP_DECRYPT (4D Basis Reduction)"
                                            style={{ padding: '10px', background: controller.latticeSvpSolved ? '#d4af37' : 'rgba(212,175,55,0.2)', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <span>𓍲</span>
                                            <span style={{ fontSize: '0.4rem', opacity: 0.8 }}>DECRYPT</span>
                                        </button>

                                        {/* Row 2: RSA */}
                                        <button
                                            onClick={controller.rsaEncrypt}
                                            disabled={!controller.labBuffer || controller.labStatus !== 'IDLE'}
                                            title="RSA_LATTICE_ENCRYPT (Modular Exponentiation)"
                                            style={{ padding: '10px', background: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <span>𓋹</span>
                                            <span style={{ fontSize: '0.4rem', opacity: 0.8 }}>ENCRYPT</span>
                                        </button>
                                        <button
                                            onClick={controller.rsaDecrypt}
                                            disabled={!controller.processedBuffer || controller.labStatus !== 'IDLE'}
                                            title="GA_GEOMETRIC_DECRYPT (Factorization via Gap Alignment)"
                                            style={{ padding: '10px', background: controller.rsaSolved ? '#d4af37' : 'rgba(212,175,55,0.2)', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <span>𓏽</span>
                                            <span style={{ fontSize: '0.4rem', opacity: 0.8 }}>DECRYPT</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={async () => {
                                            const N = BigInt(controller.labN || "62615533");
                                            console.log(`[V12] Attempting factorization of N = ${N}...`);
                                            const result = await v12Solver.factorViaCurvature(N);
                                            if (result) {
                                                alert(`[V12] FACTORIZATION SUCCESS:\nP = ${result.p}\nQ = ${result.q}\nN = ${result.p * result.q}\n\nFactors will be displayed when RSA tool is active.`);
                                            } else {
                                                alert(`[V12] FACTORIZATION FAILED. N may be prime or too large for curvature method.\n\nTry:\n- Smaller N (< 10^8)\n- Known composite numbers\n- Enable RSA tool and use DECRYPT button`);
                                            }
                                        }}
                                        style={{ marginTop: '10px', padding: '8px', background: '#d4af37', border: '1px solid #d4af37', color: '#000', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                                    >⚡ V12_CURVATURE_FACTORIZE</button>

                                    <button
                                        onClick={() => {
                                            controller.setLabBuffer(null);
                                            controller.setProcessedBuffer(null);
                                            controller.setLabString("");
                                        }}
                                        style={{ marginTop: '10px', padding: '5px', background: 'none', border: '1px solid rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.6)', cursor: 'pointer', fontSize: '0.6rem' }}
                                    >𓎂_CLEAR_V12_LAB</button>

                                    <div style={{ fontSize: '0.6rem', color: '#888', fontStyle: 'italic', marginTop: '5px' }}>
                                        * V12 CURVATURE METHOD: Uses S(σ,t) = Re(ζ''/ζ - (ζ'/ζ)²) pole structure
                                    </div>
                                </div>

                                {/* Right Side: Hex Viewer */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div
                                        title="STREAM_INSPECTION_POINT (Hexadecimal View)"
                                        style={{ color: '#d4af37', fontSize: '0.8rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '5px', cursor: 'help' }}
                                    >
                                        𓏽_STREAM_OUT
                                    </div>
                                    <div style={{
                                        background: '#0a0a0a', color: '#d4af37', fontFamily: 'monospace', fontSize: '0.6rem',
                                        height: '150px', overflowY: 'auto', padding: '10px', border: '1px solid #d4af37',
                                        lineHeight: '1.2'
                                    }}>
                                        {controller.processedBuffer || controller.labBuffer ? (
                                            Array.from((controller.processedBuffer || controller.labBuffer)!.slice(0, 256)).map((b, i) => (
                                                <span key={i} style={{ marginRight: '5px', opacity: b === 0 ? 0.2 : 1 }}>
                                                    {b.toString(16).padStart(2, '0')}
                                                    {(i + 1) % 8 === 0 ? <br /> : null}
                                                </span>
                                            ))
                                        ) : (
                                            "[ NO_DATA_SACRIFICED ]"
                                        )}
                                    </div>
                                    {controller.processedBuffer && (
                                        <div style={{ marginTop: '15px' }}>
                                            <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: '5px' }}>PROCESSED_RESULT [HEX_VIEW]</div>
                                            <div
                                                className="custom-scrollbar"
                                                style={{
                                                    maxHeight: '100px', overflowY: 'auto', background: 'rgba(0,0,0,0.5)',
                                                    padding: '10px', borderRadius: '5px', wordBreak: 'break-all',
                                                    fontFamily: 'monospace', fontSize: '0.7rem', color: '#d4af37',
                                                    border: '1px solid rgba(212,175,55,0.2)'
                                                }}
                                            >
                                                {Array.from(controller.processedBuffer).map(b => b.toString(16).padStart(2, '0')).join(' ')}
                                            </div>
                                            <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                                <button
                                                    onClick={() => {
                                                        const blob = new Blob([controller.processedBuffer as any], { type: 'application/octet-stream' });
                                                        const url = URL.createObjectURL(blob);
                                                        const a = document.createElement('a');
                                                        a.href = url;
                                                        a.download = 'sacred_result.bin';
                                                        a.click();
                                                    }}
                                                    title="DOWNLOAD_RESULT"
                                                    style={{ flex: 1, background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '5px', cursor: 'pointer', fontSize: '0.65rem' }}
                                                >⤓ DOWNLOAD</button>

                                                <button
                                                    onClick={() => {
                                                        const text = new TextDecoder().decode(controller.processedBuffer!);
                                                        navigator.clipboard.writeText(text);
                                                        alert("RESULT_COPIED_TO_CLIPBOARD [GA_SYNC_COMPLETE]");
                                                    }}
                                                    title="COPY_TO_CLIPBOARD (Decoded Text)"
                                                    style={{ flex: 1, background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '5px', cursor: 'pointer', fontSize: '0.65rem' }}
                                                >⎙ COPY_TEXT</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DraggablePanel>
            )}

            {/* THE CONSOLIDATED PANEL (was formerly floating) */}
            <DraggablePanel
                initialStyle={{
                    position: 'fixed', right: controller.uiVisible ? '40px' : '-450px',
                    top: '50%',
                    transform: 'translateY(-50%)', // Centering logic
                    maxHeight: '85vh',
                    width: '320px', backgroundColor: '#fdfbf7', border: '2px solid #d4af37', borderRadius: '15px',
                    boxShadow: '0 0 40px rgba(0,0,0,0.3)', pointerEvents: 'auto', zIndex: 900,
                    transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: controller.uiVisible ? 'flex' : 'none',
                    flexDirection: 'column',
                    overflow: 'hidden', padding: '0'
                }}
            >
                {/* Drag Handle Header */}
                <div className="drag-handle" style={{
                    padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderBottom: '1px solid #d4af37',
                    cursor: 'grab', textAlign: 'center', color: '#d4af37', fontFamily: 'Cinzel, serif', fontSize: '0.8rem',
                    letterSpacing: '2px', zIndex: 10
                }}>

                </div>
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


                <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px' }}>

                    {/* UTILITIES */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '10px', alignItems: 'center' }}>
                        <button className="sacred-btn" onClick={() => setShowInfo(!showInfo)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: '#d4af37', textAlign: 'center' }}>𝖎</button>
                        <button className="sacred-btn" onClick={() => controller.setLibraryOpen(!controller.libraryOpen)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.libraryOpen ? '#fdfbf7' : '#d4af37', background: controller.libraryOpen ? '#d4af37' : 'none', textAlign: 'center', fontSize: '1.2rem' }}>𝕬</button>
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
                            {controller.isPlaying ? '‖' : '►'}
                        </button>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <input type="range" min="0.1" max="300" step="0.1" value={controller.rotationSpeed || 1.0} onChange={(e) => controller.setRotationSpeed(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#d4af37' }} />
                            <div style={{ fontSize: '0.6rem', color: '#d4af37', textAlign: 'right' }}>{controller.rotationSpeed?.toFixed(1)} Hz</div>
                        </div>
                    </div>

                    {/* MODES */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <button className="sacred-btn" onClick={controller.toggleDarkMode} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.darkMode ? '#d4af37' : 'none', color: controller.darkMode ? '#fdfbf7' : '#d4af37', textAlign: 'center' }}>
                            {controller.darkMode ? '☼' : '☽'}
                        </button>
                        <button className="sacred-btn" onClick={controller.toggleCameraType} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: '#d4af37', textAlign: 'center', fontSize: '1.2rem' }}>
                            {controller.cameraType === 'ORTHOGRAPHIC' ? '◻' : '◈'}
                        </button>
                        <button className="sacred-btn" onClick={() => controller.setInfiniteTriangle(!controller.infiniteTriangle)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.infiniteTriangle ? '#d4af37' : 'none', color: controller.infiniteTriangle ? '#fdfbf7' : '#d4af37', fontSize: '1.2rem', textAlign: 'center' }}>
                            𝝙
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4].map((size) => (
                            <button key={size} className="sacred-btn" onClick={() => controller.setGridSize(size as 1 | 2 | 3 | 4)} style={{ flex: 1, padding: '8px', border: '1px solid #d4af37', borderRadius: '5px', background: controller.gridSize === size ? '#d4af37' : 'none', color: controller.gridSize === size ? '#fdfbf7' : '#d4af37', textAlign: 'center' }}>{size}</button>
                        ))}
                    </div>

                    {/* HARMONICS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="sacred-btn" onClick={() => controller.toggleParallelLock()} style={{ flex: 1, padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.parallelLock ? '#fdfbf7' : '#d4af37', background: controller.parallelLock ? '#d4af37' : 'none', textAlign: 'center' }}>∥</button>
                            <button className="sacred-btn" onClick={() => controller.toggleTone()} style={{ flex: 1, padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.toneEnabled ? '#fdfbf7' : '#d4af37', background: controller.toneEnabled ? '#d4af37' : 'none', textAlign: 'center' }}>𝝨</button>
                        </div>
                        {controller.toneEnabled && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <button className="sacred-btn" onClick={() => controller.cycleToneScale()} style={{ padding: '8px', border: '1px dashed #d4af37', borderRadius: '5px', color: '#d4af37', fontSize: '0.9rem', textAlign: 'center' }}>♯</button>
                                <button className="sacred-btn" onClick={() => controller.toggleVariedMode()} style={{ padding: '8px', border: '1px dashed #d4af37', borderRadius: '5px', color: controller.variedMode ? '#fdfbf7' : '#d4af37', background: controller.variedMode ? '#d4af37' : 'none', fontSize: '1rem', textAlign: 'center' }}>≋</button>
                            </div>
                        )}
                    </div>

                    {/* PHASES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <button className="sacred-btn" onClick={() => controller.setSplitMode(!controller.splitMode)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.splitMode ? '#fdfbf7' : '#d4af37', background: controller.splitMode ? '#d4af37' : 'none', textAlign: 'center', fontSize: '1.2rem' }}>
                            {controller.splitMode ? `⫽ ${(controller.frequencyA / (controller.frequencyB || 1)).toFixed(2)}` : '⫽'}
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

                        <select value={controller.waveType} onChange={(e) => controller.setWaveType(e.target.value as any)} style={{ padding: '10px', background: 'none', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '5px', fontSize: '1rem' }}>
                            <option value="NONE">∅</option>
                            <option value="SINE">∿</option>
                            <option value="SAWTOOTH">⩘</option>
                            <option value="SQUARE">⊞</option>
                            <option value="FRACTAL">✳</option>
                        </select>
                    </div>

                    {/* TOOLS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                        <button className="sacred-btn" onClick={() => controller.setRevealSymmetry(!controller.revealSymmetry)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.revealSymmetry ? '#fdfbf7' : '#d4af37', background: controller.revealSymmetry ? '#d4af37' : 'none', textAlign: 'center', fontSize: '1.2rem' }}>⬡</button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input type="range" min="-10" max="10" step="0.1" value={controller.innerVision} onChange={(e) => controller.setInnerVision(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#d4af37' }} />
                        </div>
                        <button className="sacred-btn" onClick={() => controller.setShow4DShadow(!controller.show4DShadow)} style={{ padding: '10px', border: '1px solid #d4af37', borderRadius: '5px', color: controller.show4DShadow ? '#fdfbf7' : '#d4af37', background: controller.show4DShadow ? '#d4af37' : 'none', textAlign: 'center' }}>4D</button>
                    </div>

                </div>
            </DraggablePanel>

            {/* BOTTOM NAVIGATION - Camera controls with central reset cross */}
            <div style={{
                position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                pointerEvents: 'auto', zIndex: 100, display: controller.uiVisible ? 'flex' : 'none', alignItems: 'center', gap: '30px'
            }}>
                {/* Step backward */}
                <button
                    onClick={() => controller.prevCameraView()}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37', fontSize: '2.5rem' }}
                >
                    ☩
                </button>

                {/* Central cross: resets view to 0,0 (Front) */}
                <button
                    onClick={() => controller.resetCameraView()}
                    title="Return to 0° / 0° (Front)"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#d4af37',
                        fontSize: '4.5rem',
                        textShadow: '0 0 18px rgba(212, 175, 55, 0.7)',
                        transition: 'transform 0.3s ease, text-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.textShadow = '0 0 26px rgba(212, 175, 55, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.textShadow = '0 0 18px rgba(212, 175, 55, 0.7)';
                    }}
                >
                    ☩
                </button>

                {/* Step forward */}
                <button
                    onClick={() => controller.nextCameraView()}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37', fontSize: '2.5rem' }}
                >
                    ☩
                </button>
            </div>

            {/* ANGLE DISPLAY */}
            <div style={{
                position: 'fixed', bottom: '40px', left: isRTL ? 'auto' : '40px', right: isRTL ? '40px' : 'auto',
                color: '#d4af37', fontSize: '1rem', fontFamily: 'monospace', textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
                pointerEvents: 'auto', display: controller.uiVisible ? 'block' : 'none'
            }}>
                {renderClickableAngle(`${Math.abs(controller.viewAngle).toFixed(2)}°${controller.viewAngle > 0 ? 'N' : 'S'}`)}
                <div>{renderClickableAngle(`${Math.abs(controller.azimuthAngle).toFixed(2)}°${controller.azimuthAngle > 0 ? 'E' : 'W'}`)}</div>
            </div>

            {/* SECRET THEORY UNLOCK BUTTON */}
            {controller.theoryUnlocked && (
                <button
                    onClick={() => controller.setTheoryOpen(true)}
                    style={{
                        position: 'fixed', left: 'clamp(10px, 4vw, 40px)', top: '50%', transform: 'translateY(-110%)',
                        background: 'none', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%',
                        width: '48px', height: '48px', cursor: 'pointer', color: '#d4af37',
                        fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'fadeIn 1s ease', pointerEvents: 'auto', zIndex: 900,
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.5)'; e.currentTarget.style.borderColor = '#d4af37'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'; }}
                >Ω</button>
            )}

            {/* Songs/Hymns panel toggled by music button or '6' digit */}
            {controller.uiVisible && songsPanelOpen && (
                <DraggablePanel
                    initialStyle={{
                        position: 'fixed', left: '80px', top: '120px', zIndex: 20005,
                        width: '360px', maxHeight: '60vh', overflow: 'auto', background: '#fdfbf7', border: '2px solid #d4af37',
                        borderRadius: '12px', padding: '10px', pointerEvents: 'auto'
                    }}
                >
                    <div className="drag-handle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                        <strong style={{ color: '#d4af37' }}>Hidden Hymns</strong>
                        <button onClick={() => { setSongs([]); setCurrentSong(null); }} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#111' }}>
                        <div style={{ marginBottom: '8px' }}>
                            <audio
                                ref={audioRef}
                                controls
                                autoPlay
                                preload="auto"
                                style={{ width: '100%' }}
                                src={currentSong || undefined}
                                onLoadedMetadata={() => {
                                    console.log(`[Audio] Loaded metadata for track ${currentIndex}`);
                                }}
                                onError={(e) => {
                                    const err = e.currentTarget.error;
                                    if (err) {
                                        console.error(`[Audio] Error code ${err.code}: ${err.message} (track ${currentIndex})`);
                                        // Retry if it's a network error
                                        if (err.code === 4 && currentIndex >= 0 && songs[currentIndex]) {
                                            console.warn(`[Audio] Retrying failed track...`);
                                            setTimeout(() => playSong(songs[currentIndex], currentIndex), 1000);
                                        }
                                    }
                                }}
                                onEnded={() => {
                                    if (songs.length === 0) return;
                                    const next = (currentIndex + 1) % songs.length;
                                    const s = songs[next];
                                    if (s) playSong(s, next);
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {songs.length === 0 ? (
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Loading...</div>
                            ) : (
                                songs.map((s, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', border: '1px solid rgba(212,175,55,0.12)', padding: '6px 8px', borderRadius: '8px' }}>
                                        <div style={{ flex: 1, textAlign: 'left', fontSize: '0.9rem', color: '#111' }}>{s.title}</div>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <button onClick={() => playSong(s, i)} style={{ background: 'none', border: '1px solid #d4af37', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#d4af37' }}>▶</button>
                                            <a href={s.url || ('/' + encodeURIComponent(s.filename))} download={s.filename} style={{ background: 'none', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '6px', padding: '6px', textDecoration: 'none', color: '#d4af37', fontSize: '0.9rem' }}>⤓</a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(212,175,55,0.2)', fontSize: '0.7rem', color: '#d4af37', textAlign: 'center' }}>
                            *This is an incomplete collection of the 54 Hymns.
                        </div>
                    </div>
                </DraggablePanel>
            )}

            {/* MUSIC TOGGLE BUTTON (visible after pressing '6') */}
            {controller.uiVisible && showSongsButton && (
                <button
                    onClick={() => setSongsPanelOpen(prev => !prev)}
                    title={songsPanelOpen ? 'Hide Hymns' : 'Show Hymns'}
                    style={{
                        position: 'fixed', left: 'clamp(60px, 6vw, 80px)', top: '50%', transform: 'translateY(-20%)',
                        background: 'none', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%',
                        width: '44px', height: '44px', cursor: 'pointer', color: '#d4af37',
                        fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'auto', zIndex: 900
                    }}
                >♪</button>
            )}

            {/* INTRO PIMPING BUTTON */}
            {introUnlocked && (
                <button
                    onClick={() => setIntroOpen(true)}
                    style={{
                        position: 'fixed', left: 'clamp(10px, 4vw, 40px)', top: '50%', transform: 'translateY(10%)',
                        background: 'none', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%',
                        width: '48px', height: '48px', cursor: 'pointer', color: '#d4af37',
                        fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: 'fadeIn 1s ease', pointerEvents: 'auto', zIndex: 900,
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.5)'; e.currentTarget.style.borderColor = '#d4af37'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'; }}
                >♫</button>
            )}

            {/* INTRO POPUP - NOW DRAGGABLE PLAYER */}
            {introOpen && (
                <DraggablePanel
                    initialStyle={{
                        position: 'fixed', top: '150px', left: '150px', zIndex: 20002,
                        width: '320px', background: '#fdfbf7', border: '2px solid #d4af37',
                        borderRadius: '15px', padding: '0', textAlign: 'center', pointerEvents: 'auto',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)', overflow: 'hidden'
                    }}
                >
                    {/* Sacred Geometry Backdrop */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        opacity: 0.04, pointerEvents: 'none', width: '250px', height: '250px', zIndex: 0
                    }}>
                        <svg viewBox="0 0 100 100" width="100%" height="100%" stroke="#d4af37" fill="none">
                            <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="15" strokeWidth="0.5" />
                            {[0, 60, 120, 180, 240, 300].map(angle => {
                                const rad = angle * Math.PI / 180;
                                return <circle key={angle} cx={50 + 15 * Math.cos(rad)} cy={50 + 15 * Math.sin(rad)} r="15" strokeWidth="0.5" />;
                            })}
                            <path d="M50 5 L93.3 30 L93.3 70 L50 95 L6.7 70 L6.7 30 Z" strokeWidth="0.5" />
                            <path d="M50 5 L50 95 M6.7 30 L93.3 70 M93.3 30 L6.7 70" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="drag-handle" style={{
                        padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderBottom: '1px solid #d4af37',
                        cursor: 'grab', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        position: 'relative', zIndex: 1
                    }}>
                        <span style={{ fontSize: '1.2rem', color: '#d4af37', fontWeight: 'bold', marginLeft: '10px' }}>𒀭 𒀭</span>
                        <button
                            onClick={() => setIntroOpen(false)}
                            style={{
                                background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer',
                                fontSize: '1.2rem', padding: '5px 10px'
                            }}
                        >✕</button>
                    </div>
                    <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
                        <div style={{ margin: '10px 0' }}>
                            <audio ref={audioRef} controls autoPlay style={{ width: '100%', height: '35px' }}>
                                <source src="/INTRODUCTORY%20PIMPING.wav" type="audio/wav" />
                                𒀭
                            </audio>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <a
                                href="/INTRODUCTORY%20PIMPING.wav"
                                download="𒀭.wav"
                                style={{
                                    color: '#d4af37', textDecoration: 'none', fontSize: '1rem',
                                    border: '1px solid rgba(212,175,55,0.3)', padding: '5px 25px',
                                    borderRadius: '20px', transition: 'all 0.3s ease',
                                    backgroundColor: 'rgba(212,175,55,0.05)', display: 'flex',
                                    alignItems: 'center', gap: '10px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)'}
                            >
                                <span style={{ fontSize: '1.5rem' }}>𓍲</span> 𓏽 ⤓ 𓏽
                            </a>
                        </div>
                        <p style={{ color: '#1a1a1a', fontSize: '1rem', margin: '15px 0 0 0', opacity: 0.8, letterSpacing: '4px' }}>𒀭 𓋹 𒀭 𓍲 𒀭</p>
                    </div>
                </DraggablePanel>
            )}

            {/* THEORY ARTICLE OVERLAY */}
            {controller.theoryOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(0, 0, 0, 0.92)',
                    display: 'flex', flexDirection: 'column', pointerEvents: 'auto',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <div style={{
                        display: 'flex', justifyContent: 'flex-end', padding: '20px 30px',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
                    }}>
                        <button
                            onClick={() => controller.setTheoryOpen(false)}
                            style={{
                                background: 'none', border: 'none', color: '#d4af37',
                                fontSize: '2.5rem', cursor: 'pointer', lineHeight: 1,
                                padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >✕</button>
                    </div>
                    <div
                        className="custom-scrollbar"
                        style={{
                            flex: 1, overflowY: 'auto', padding: 'clamp(20px, 5vw, 40px) clamp(10px, 8vw, 60px)',
                            color: '#e8dcc8', fontFamily: 'Cinzel, serif', fontSize: '1rem',
                            lineHeight: 1.8, maxWidth: '900px', margin: '0 auto', width: '100%'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: document.getElementById('theory-article')?.innerHTML || '<p>No theory found.</p>'
                        }}
                    />
                </div>
            )}

            {/* SIDE GREEK COLUMNS - Refined opacity */}
            <div style={{ position: 'fixed', top: '50%', left: '0px', transform: 'translateY(-50%)', display: (!controller.uiVisible || window.innerWidth < 768) ? 'none' : 'flex', flexDirection: 'column-reverse', gap: '5px', pointerEvents: 'none', opacity: 0.1, zIndex: 0, paddingLeft: '20px' }} className="greek-column-left">
                {GREEK_TITLE.split('').map((char, i) => (<div key={i} style={{ fontSize: '1.5rem', color: '#d4af37', textAlign: 'center' }}>{char}</div>))}
            </div>
            <div style={{ position: 'fixed', top: '50%', right: '0px', transform: 'translateY(-50%)', display: (!controller.uiVisible || window.innerWidth < 768) ? 'none' : 'flex', flexDirection: 'column-reverse', gap: '5px', pointerEvents: 'none', opacity: 0.1, zIndex: 0, paddingRight: '20px' }} className="greek-column-right">
                {GREEK_TITLE.split('').map((char, i) => (<div key={i} style={{ fontSize: '1.5rem', color: '#d4af37', textAlign: 'center' }}>{char}</div>))}
            </div>

            {/* VERSE DISPLAY */}
            <div style={{
                position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center', color: '#d4af37', maxWidth: '600px', width: '80%',
                transition: 'all 0.5s ease', opacity: (controller.libraryOpen && controller.uiVisible) ? 1 : 0, visibility: (controller.libraryOpen && controller.uiVisible) ? 'visible' : 'hidden',
                zIndex: 800
            }}>
                <div style={{ fontSize: '1.5rem', whiteSpace: 'pre-wrap', fontFamily: isAmharic ? 'sans-serif' : 'Cinzel, serif', direction: isRTL ? 'rtl' : 'ltr' }}>
                    {body}
                    <div style={{ marginTop: '10px', opacity: 0.5, transform: 'scale(0.8)' }}>
                        <CopyButton text={note + "\n\n" + body} />
                    </div>
                </div>
            </div>

            {/* NOLL CUBE OVERLAY */}
            <div style={{
                position: 'fixed', bottom: '150px', left: '40px', zIndex: 100, pointerEvents: 'auto',
                display: (controller.metatronShape === 'MERKABA' && controller.uiVisible) ? 'block' : 'none',
                opacity: 1, transition: 'opacity 0.5s'
            }}>
                <div style={{
                    backgroundColor: '#fdfbf7', padding: '20px', borderRadius: '15px', border: '1px solid #d4af37',
                    maxWidth: '300px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', color: '#1a1a1a'
                }}>
                    <NollCubeContent language={controller.language} isRTL={isRTL} />
                </div>
            </div>

            {/* THEORY PAPER BUTTON - Invisible in top-right corner (hidden link to paper) */}
            <button
                className="sacred-btn"
                onClick={() => controller.setTheoryOpen(!controller.theoryOpen)}
                title="Unified Theory V12"
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    fontSize: '1.8rem',
                    background: 'none',
                    border: 'none',
                    color: 'transparent',
                    cursor: 'pointer',
                    filter: 'none',
                    transition: 'all 0.3s ease',
                    zIndex: 1100,
                    pointerEvents: 'auto',
                    opacity: 0,
                    width: '40px',
                    height: '40px'
                }}
            >𓊈𓊉</button>

            {/* SECRET ENTRY PANEL */}
            {controller.secretEntryOpen && (
                <SecretEntry onClose={() => controller.setSecretEntryOpen(false)} controller={controller} />
            )}

        </div >
    );
};

// Force Rebuild: Unified V11 Integration Verified
