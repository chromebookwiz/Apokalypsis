import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useSceneController } from '../controllers/SceneController';

// Only Import what we use
import { MetatronGeometry } from './geometries/Metatron';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

const CameraManager: React.FC<{ controller: any }> = ({ controller }) => {
    return (
        <>
            <PerspectiveCamera
                makeDefault={controller.cameraType === 'PERSPECTIVE'}
                position={[0, 0, 30]}
                fov={45}
            />
            <OrthographicCamera
                makeDefault={controller.cameraType === 'ORTHOGRAPHIC'}
                position={[0, 0, 100]}
                zoom={controller.zoom}
                near={-100}
                far={500}
            />
        </>
    );
};

export const MainScene: React.FC<Props> = ({ controller }) => {
    const controlsRef = useRef<any>(null);

    // Camera Reset Logic
    useEffect(() => {
        if (controller.cameraResetTrigger > 0 && controlsRef.current) {
            controlsRef.current.reset(); // Reset to initial position
            controlsRef.current.setPolarAngle(Math.PI / 2); // 90 degrees (Equator)
            controlsRef.current.setAzimuthalAngle(0); // 0 degrees
        }
    }, [controller.cameraResetTrigger]);

    // Simple Dark Mode Logic
    const bgColor = controller.darkMode ? '#000000' : '#ffffff';
    const fogColor = controller.darkMode ? '#000000' : '#ffffff';

    return (
        <Canvas
            dpr={[1, 1.5]}
            shadows={false}
            gl={{ antialias: true }}
        >
            <CameraManager controller={controller} />

            {/* Background & Fog */}
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" args={[fogColor, 20, 200]} />

            {/* Lighting - Holy / Light */}
            <ambientLight intensity={1.5} />
            <spotLight position={[50, 50, 50]} angle={0.2} penumbra={1} intensity={500} color="#d4af37" />
            <pointLight position={[-20, -20, -20]} intensity={200} color="#ffcc00" />
            <Environment preset="studio" />

            <OrbitControls
                ref={controlsRef}
                autoRotate={controller.autoRotate}
                autoRotateSpeed={0.5}
                enableDamping
                onChange={(e) => {
                    if (e?.target) {
                        // getPolarAngle returns 0 (Top) to PI (Bottom)
                        // User wants: +90 (Top), 0 (Equator), -90 (Bottom)
                        const angle = e.target.getPolarAngle();
                        const deg = Math.round(90 - (angle * 180 / Math.PI));

                        // Throttle updates
                        if (Math.abs(deg - controller.viewAngle) > 0) {
                            controller.setViewAngle(deg);
                        }
                    }
                }}
            />

            <Suspense fallback={null}>
                <group position={[0, 0, 0]}>
                    <GeometrySwitch controller={controller} />
                </group>
            </Suspense>
        </Canvas>
    );
};

const GeometrySwitch: React.FC<{ controller: any }> = ({ controller }) => {
    switch (controller.geometryType) {
        case 'METATRON': return <MetatronGeometry controller={controller} />;
        default: return <MetatronGeometry controller={controller} />;
    }
};
