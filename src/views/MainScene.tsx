import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useSceneController, IMPORTANT_ANGLES } from '../controllers/SceneController';

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

    // Camera View Cycling Logic
    useEffect(() => {
        if (controlsRef.current) {
            const controls = controlsRef.current;


            // Use the imported constant for full 26-angle support
            const angle = IMPORTANT_ANGLES[controller.activeViewIndex];
            if (angle) {

                // OrbitControls uses:
                // Polar Angle: 0 (Top) to PI (Bottom). Horizon is PI/2.
                // Azimuth: Radians.

                // Convert our "Geographic" coords to Spherical Radians
                // EL: 90 (Top) -> Polar 0
                // EL: 0 (Front) -> Polar PI/2
                // EL: -90 (Bottom) -> Polar PI
                const polar = (90 - angle.el) * (Math.PI / 180);

                // AZ: 0 (Front) -> 0
                // AZ: 90 (Right/East) -> PI/2 OR -PI/2?
                // In ThreeJS default: +Z is front.
                // Let's match typical math: 0 is +Z? 
                // Let's rely on the previous switch case values to calibrate.
                // Case 0 (Front, 0,0) -> Polar PI/2, Azimuth 0. Matches.
                // Case 3 (Right, 90,0) -> Polar PI/2, Azimuth PI/2. Matches.
                // Case 5 (Left, 270 or -90) -> Azimuth -PI/2.

                const azimuth = angle.az * (Math.PI / 180);

                controls.setPolarAngle(polar);
                controls.setAzimuthalAngle(azimuth);
                controls.update();
            }
        }
    }, [controller.activeViewIndex]);

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
                        // Polar: 0 (Top) -> PI (Bottom)
                        // User view: +90 (Top), 0 (Equator), -90 (Bottom)
                        const polar = e.target.getPolarAngle();
                        const degLat = Math.round(90 - (polar * 180 / Math.PI));

                        // Azimuth: 0 (Front/Z), + (Left), - (Right)
                        // We map: 0=N, -90=E, 90=W, 180=S (Standard Compass)
                        // Actually OrbitControls default: 0 is +Z.
                        // Rotating camera left (orbit right) gives positive azimuth?
                        // Let's stick to raw degrees first, mapped to compass in UI
                        const azi = e.target.getAzimuthalAngle();
                        const degLon = Math.round(azi * 180 / Math.PI);

                        // Throttle updates
                        if (Math.abs(degLat - controller.viewAngle) > 0 || Math.abs(degLon - controller.azimuthAngle) > 0) {
                            controller.setViewAngle(degLat);
                            controller.setAzimuthAngle(degLon);
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
