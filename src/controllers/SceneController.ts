import { useState, useEffect } from 'react';
import { Language } from '../data/translations';

// ... other types ...
export type GeometryType = 'TESSERACT' | 'METATRON' | 'SUPER_METATRON' | 'ULAM_SPIRAL';
export type ColorMode = 'PRIME' | 'ROOT' | 'ZOHAR' | 'GOLDEN';
// bgMode removed
export type MetatronShape = 'NONE' | 'MERKABA' | 'CUBE' | 'OCTAHEDRON' | 'ICOSAHEDRON' | 'DODECAHEDRON';
export type ViewMode = '2D' | '3D' | '4D';
export type CameraType = 'PERSPECTIVE' | 'ORTHOGRAPHIC';

export const useSceneController = () => {
    // --- STATE DEFINITIONS (Must be first) ---
    const [geometryType, setGeometryType] = useState<GeometryType>('METATRON');
    const [colorMode, setColorMode] = useState<ColorMode>('GOLDEN');
    // bgMode removed logic
    const [autoRotate, setAutoRotate] = useState(false);

    // Simple Dark Mode
    const [darkMode, setDarkMode] = useState(false);

    // Language & Library State
    const [language, setLanguage] = useState<Language>('GR');
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

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
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


    return {
        // State
        geometryType,
        colorMode,
        // bgMode removed
        autoRotate,
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

        // Actions
        toggleGeometry,
        // toggleBgMode removed
        setLang,
        speakText,
        stopSpeaking,
        setTesseractPreset,
        triggerCameraReset,
        cycleCameraView: () => {
            setActiveViewIndex(prev => (prev + 1) % 6); // Cycle 0-5
        },
        activeViewIndex,
        azimuthAngle,
        setAzimuthAngle,
        darkMode,
        toggleDarkMode,
        selectNumber: (n: number) => console.log('Select:', n)
    };
};
