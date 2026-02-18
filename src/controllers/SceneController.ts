import { useState, useEffect } from 'react';
import { Language } from '../data/translations';

// ... other types ...
export type GeometryType = 'TESSERACT' | 'METATRON' | 'SUPER_METATRON' | 'ULAM_SPIRAL';
export type ColorMode = 'PRIME' | 'ROOT' | 'ZOHAR' | 'GOLDEN';
// bgMode removed
export type MetatronShape = 'NONE' | 'MERKABA' | 'CUBE' | 'OCTAHEDRON' | 'ICOSAHEDRON' | 'DODECAHEDRON';
export type ViewMode = '2D' | '3D' | '4D';
export type CameraType = 'PERSPECTIVE' | 'ORTHOGRAPHIC';
export type ToneScale = 'FUNDAMENTAL' | 'TRIADIC' | 'MERKABA' | 'CELESTIAL';

// --- CAMERA ANGLES (Face, Edge, Corner) ---
// 26 Total: 6 Faces + 12 Edges + 8 Corners
export const IMPORTANT_ANGLES = [
    // 1. FACES (6) - Distance closest
    { az: 0, el: 0, label: 'FRONT' },
    { az: 90, el: 0, label: 'RIGHT' },
    { az: 180, el: 0, label: 'BACK' },
    { az: 270, el: 0, label: 'LEFT' },
    { az: 0, el: 90, label: 'TOP' },
    { az: 0, el: -90, label: 'BOTTOM' },

    // 2. EDGES (12) - Mid-distance
    // Equatorial Edges (4)
    { az: 45, el: 0, label: 'EDGE FL' },
    { az: 135, el: 0, label: 'EDGE BL' },
    { az: 225, el: 0, label: 'EDGE BR' },
    { az: 315, el: 0, label: 'EDGE FR' },
    // Top Edges (4)
    { az: 0, el: 45, label: 'EDGE TOP-F' },
    { az: 90, el: 45, label: 'EDGE TOP-R' },
    { az: 180, el: 45, label: 'EDGE TOP-B' },
    { az: 270, el: 45, label: 'EDGE TOP-L' },
    // Bottom Edges (4)
    { az: 0, el: -45, label: 'EDGE BOT-F' },
    { az: 90, el: -45, label: 'EDGE BOT-R' },
    { az: 180, el: -45, label: 'EDGE BOT-B' },
    { az: 270, el: -45, label: 'EDGE BOT-L' },

    // 3. CORNERS (8) - Furthest
    // Top Corners (4) - Isometric Elevation ~35.264
    { az: 45, el: 35.264, label: 'CORNER FL-T' },
    { az: 135, el: 35.264, label: 'CORNER BL-T' },
    { az: 225, el: 35.264, label: 'CORNER BR-T' },
    { az: 315, el: 35.264, label: 'CORNER FR-T' },
    // Bottom Corners (4)
    { az: 45, el: -35.264, label: 'CORNER FL-B' },
    { az: 135, el: -35.264, label: 'CORNER BL-B' },
    { az: 225, el: -35.264, label: 'CORNER BR-B' },
    { az: 315, el: -35.264, label: 'CORNER FR-B' },

    // 4. SECRET (1)
    { az: 0, el: 69.33, label: 'SECRET' }
];

export const useSceneController = () => {
    // --- STATE DEFINITIONS (Must be first) ---
    const [geometryType, setGeometryType] = useState<GeometryType>('METATRON');
    const [colorMode, setColorMode] = useState<ColorMode>('GOLDEN');
    // bgMode removed logic
    const [autoRotate, setAutoRotate] = useState(false);
    const [parallelLock, setParallelLock] = useState(false);
    const [toneEnabled, setToneEnabled] = useState(false);
    const [variedMode, setVariedMode] = useState(false);
    const [toneScale, setToneScale] = useState<ToneScale>('MERKABA');

    // Simple Dark Mode
    const [darkMode, setDarkMode] = useState(false);

    // Language & Library State
    const [language, setLanguage] = useState<Language>('NO');
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [currentBookId, setCurrentBookId] = useState('revelation');
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Metatron State
    const [metatronShape, setMetatronShape] = useState<MetatronShape>('NONE');
    const [viewMode, setViewMode] = useState<ViewMode>('3D');

    // Camera State
    const [cameraType, setCameraType] = useState<CameraType>('ORTHOGRAPHIC');
    const [cameraResetTrigger, setCameraResetTrigger] = useState(0);

    // 4D / 5D Projection State
    const [hyperPhase, setHyperPhase] = useState(0);

    const [metatron5D, setMetatron5D] = useState({
        xy: 0, xz: 0, xw: 0,
        yw: 0, zw: 0,
        xv: 0
    });

    const [tesseractRot, setTesseractRot] = useState({ xw: 0, yw: 0, zw: 0 });
    const [autoRotate4D, setAutoRotate4D] = useState(true);

    // Metatron Config
    const [gridSize, setGridSize] = useState<1 | 2 | 3 | 4>(3);

    // UI State
    const [isPlaying, setIsPlaying] = useState(false);
    const [rotationSpeed, setRotationSpeed] = useState(1.0); // Speed Multiplier
    const [showNumbers, setShowNumbers] = useState(true);
    // blackMode removed
    const [zoom, setZoom] = useState(40);
    const [viewAngle, setViewAngle] = useState(0); // Polar (N/S)
    const [azimuthAngle, setAzimuthAngle] = useState(0); // Azimuth (E/W)
    const [activeViewIndex, setActiveViewIndex] = useState(0); // 0=Front, 1=Iso, 2=Top...
    const [uiVisible, setUiVisible] = useState(false);

    // Speech Ref - Removed
    // const synthesis = window.speechSynthesis;

    // --- LOGIC ---
    const setTesseractPreset = (name: string) => {
        setAutoRotate4D(false);
        switch (name) {
            case 'CUBE': setTesseractRot({ xw: 0, yw: 0, zw: 0 }); break;
            case 'HEX': setTesseractRot({ xw: Math.PI / 4, yw: 0, zw: 0 }); break;
            case 'RHOMBIC': setTesseractRot({ xw: Math.PI / 4, yw: 0, zw: Math.PI / 4 }); break;
            case 'TETRA': setTesseractRot({ xw: 0.615, yw: Math.PI / 4, zw: 0 }); break;
            case 'OCTA': setTesseractRot({ xw: Math.PI / 2, yw: 0, zw: 0 }); break;
            case 'DODECA': setTesseractRot({ xw: 0.5, yw: 0.5, zw: 0.5 }); break;
            case 'ICOSA': setTesseractRot({ xw: 1, yw: 0.5, zw: 0 }); break;
        }
    };

    const toggleGeometry = (type?: GeometryType) => {
        if (type) {
            setGeometryType(type);
            if (type === 'METATRON' || type === 'ULAM_SPIRAL') {
                setAutoRotate(false);
                setViewMode('3D');
                setCameraType('ORTHOGRAPHIC');
            }
            else {
                setAutoRotate(true);
                setCameraType('PERSPECTIVE');
            }
            return;
        }
        const types: GeometryType[] = ['METATRON'];
        const idx = types.indexOf(geometryType);
        const next = types[(idx + 1) % types.length];
        setGeometryType(next);

        if (next === 'METATRON' || next === 'ULAM_SPIRAL') {
            setAutoRotate(false);
            setCameraType('ORTHOGRAPHIC');
        } else {
            setAutoRotate(true);
            setCameraType('PERSPECTIVE');
        }
    };

    // toggleBgMode removed

    const setLang = (l: Language) => {
        setLanguage(l);
        stopSpeaking(); // Stop speech on lang change
    };

    const triggerCameraReset = () => {
        setCameraResetTrigger(prev => prev + 1);
    };

    const toggleCameraType = () => {
        setCameraType(prev => prev === 'ORTHOGRAPHIC' ? 'PERSPECTIVE' : 'ORTHOGRAPHIC');
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const toggleParallelLock = () => {
        setParallelLock(prev => !prev);
    };

    const toggleTone = () => {
        setToneEnabled(prev => !prev);
    };

    const cycleToneScale = () => {
        const scales: ToneScale[] = ['FUNDAMENTAL', 'TRIADIC', 'MERKABA', 'CELESTIAL'];
        setToneScale(prev => {
            const idx = scales.indexOf(prev);
            return scales[(idx + 1) % scales.length];
        });
    };

    const toggleVariedMode = () => {
        setVariedMode(prev => !prev);
    };

    // --- SPEECH LOGIC REMOVED ---
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const speakText = (_text: string) => {
        // Speech removed per user request
    };

    const stopSpeaking = () => {
        // No-op
    };

    // --- EFFECTS ---

    // Update hyperPhase for unified slider
    useEffect(() => {
        if (autoRotate4D && geometryType === 'SUPER_METATRON') {
            // Logic for future expansion
        }
    }, [autoRotate4D, geometryType]);

    // Animation Loop for HyperPhase
    useEffect(() => {
        let frameId: number;
        const animate = () => {
            if (isPlaying && (geometryType === 'METATRON')) {
                setHyperPhase(prev => prev + 0.002 * rotationSpeed); // Apply rotationSpeed
            }
            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, [isPlaying, geometryType, rotationSpeed]); // Add rotationSpeed to dependencies



    // --- CAMERA ANGLES (Face, Edge, Corner) ---
    // 26 Total: 6 Faces + 12 Edges + 8 Corners

    useEffect(() => {
        // Sync view state with active index
        const target = IMPORTANT_ANGLES[activeViewIndex];
        if (target) {
            console.log('Camera Target:', target);
            setAzimuthAngle(target.az);
            setViewAngle(target.el);
        } else {
            console.warn('Camera Target Undefined for index:', activeViewIndex);
            setActiveViewIndex(0); // Fallback
        }
    }, [activeViewIndex]);


    return {
        // State
        geometryType,
        colorMode,
        // bgMode removed
        autoRotate,
        parallelLock,
        toneEnabled,
        variedMode,
        toneScale,
        language,
        libraryOpen,
        currentBookId,
        isSpeaking,
        metatronShape,
        viewMode,
        cameraType,
        hyperPhase,
        metatron5D,
        tesseractRot,
        autoRotate4D,
        isPlaying,
        rotationSpeed,
        showNumbers,
        // blackMode removed
        zoom,
        gridSize,
        cameraResetTrigger,

        // Setters
        setGeometryType,
        setColorMode,
        // setBgMode removed
        setAutoRotate,
        setParallelLock,
        setToneEnabled,
        setVariedMode,
        setToneScale,
        setLanguage,
        setLibraryOpen,
        setCurrentBookId,
        setIsSpeaking,
        setMetatronShape,
        setViewMode,
        setCameraType,
        setHyperPhase,
        setMetatron5D,
        setTesseractRot,
        setAutoRotate4D,
        setIsPlaying,
        setRotationSpeed,
        setShowNumbers,
        // setBlackMode removed
        setZoom,
        setGridSize,
        viewAngle,
        setViewAngle,
        uiVisible,
        setUiVisible,

        // Actions
        toggleGeometry,
        // toggleBgMode removed
        setLang,
        speakText,
        stopSpeaking,
        setTesseractPreset,
        triggerCameraReset,
        toggleCameraType,
        toggleParallelLock,
        toggleTone,
        cycleToneScale,
        toggleVariedMode,




        cycleCameraView: () => {
            setActiveViewIndex(prev => (prev + 1) % IMPORTANT_ANGLES.length);
        },
        nextCameraView: () => {
            setActiveViewIndex(prev => (prev + 1) % IMPORTANT_ANGLES.length);
        },
        prevCameraView: () => {
            setActiveViewIndex(prev => (prev - 1 + IMPORTANT_ANGLES.length) % IMPORTANT_ANGLES.length);
        },
        resetCameraView: () => {
            setActiveViewIndex(0); // Index 0 is FRONT (0,0)
        },
        activeViewIndex,
        azimuthAngle,
        setAzimuthAngle,
        darkMode,
        toggleDarkMode,
        selectNumber: (n: number) => console.log('Select:', n)
    };
};
