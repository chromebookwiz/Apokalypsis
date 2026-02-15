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

    // Camera View Cycling Logic
    useEffect(() => {
        if (controlsRef.current) {
            const controls = controlsRef.current;
            // 0=Front, 1=Iso, 2=Top, 3=Right, 4=Back, 5=Left
            switch (controller.activeViewIndex) {
                case 0: // Front (N)
                    controls.setPolarAngle(Math.PI / 2); // 90 deg
                    controls.setAzimuthalAngle(0); // 0 deg
                    break;
                case 1: // Isometric (Cube Corner) ~35.264 deg elevation
                    // Elevation angle from horizon is 35.264
                    // Polar angle is from Zenith (90 - 35.264) = 54.736
                    controls.setPolarAngle(54.736 * Math.PI / 180);
                    controls.setAzimuthalAngle(Math.PI / 4); // 45 deg (NE)
                    break;
                case 2: // Top (Zenith)
                    controls.setPolarAngle(0); // 0 deg
                    controls.setAzimuthalAngle(0);
                    break;
                case 3: // Right (E)
                    controls.setPolarAngle(Math.PI / 2);
                    controls.setAzimuthalAngle(Math.PI / 2); // 90 deg
                    break;
                case 4: // Back (S)
                    controls.setPolarAngle(Math.PI / 2);
                    controls.setAzimuthalAngle(Math.PI); // 180 deg
                    break;
                case 5: // Left (W)
                    controls.setPolarAngle(Math.PI / 2);
                    controls.setAzimuthalAngle(-Math.PI / 2); // -90 deg
                    break;
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
