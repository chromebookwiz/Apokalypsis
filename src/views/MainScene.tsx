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
    // -------------------------------------------------------------------------
    // CAMERA PERSISTENCE FIX
    // -------------------------------------------------------------------------
    // We want to ensure that if we switch cameras, we don't lose the approximate
    // "Polar" and "Azimuth" angles.
    // However, OrbitControls ultimately dictates where the camera is.
    // When the camera instance changes (Persp <-> Ortho), OrbitControls
    // might re-evaluate.
    // The key is that we are feeding OrbitControls through `controlsRef` in MainScene.
    // We need to make sure the *new* camera picks up the position or the controls
    // re-orient it.

    // Actually, simply mounting the new camera at the *same* position might work
    // if the radius is similar.
    // But Ortho Zoom is different from Persp Distance.

    return (
        <>
            <PerspectiveCamera
                makeDefault={controller.cameraType === 'PERSPECTIVE'}
                position={[0, 0, 30]} // Standard distance
                fov={45}
            />
            <OrthographicCamera
                makeDefault={controller.cameraType === 'ORTHOGRAPHIC'}
                position={[0, 0, 100]} // Further out for Ortho to avoid clipping
                zoom={controller.zoom}
                near={-100}
                far={500}
            />
        </>
    );
};

export const MainScene: React.FC<Props> = ({ controller }) => {
    const controlsRef = useRef<any>(null);

    // Sync Controls when Camera Type Changes
    // We want to FORCE the controls to the last known angles
    useEffect(() => {
        if (controlsRef.current) {
            const controls = controlsRef.current;
            // Calculate Radians from our degrees
            // Polar: 90 is Equator (PI/2), 0 is Top (0), 180 is Bottom (PI)
            // viewAngle (Lat): 90 (Top) ... 0 ... -90 (Bottom)
            // Polar = (90 - Lat) * degToRad
            const polar = (90 - controller.viewAngle) * (Math.PI / 180);

            // Azimuth (Lon):
            // 0 => 0
            // Azimuth = Lon * degToRad
            const azimuth = controller.azimuthAngle * (Math.PI / 180);

            controls.setPolarAngle(polar);
            controls.setAzimuthalAngle(azimuth);
            controls.update();
        }
    }, [controller.cameraType]); // Trigger on Camera Swap


    // Camera View Cycling Logic (Existing)
    useEffect(() => {
        if (controlsRef.current && controller.activeViewIndex !== 0) {
            // ... (Same as before, but only if NOT just manual movement)
            // Actually, activeViewIndex triggers this.
            const angle = IMPORTANT_ANGLES[controller.activeViewIndex];
            if (angle) {
                const polar = (90 - angle.el) * (Math.PI / 180);
                const azimuth = angle.az * (Math.PI / 180);
                controlsRef.current.setPolarAngle(polar);
                controlsRef.current.setAzimuthalAngle(azimuth);
                controlsRef.current.update();
            }
        }
    }, [controller.activeViewIndex]);

    // ...

    return (
        <Canvas
            dpr={[1, 1.5]}
            shadows={false}
            gl={{ antialias: true }}
        >
            <CameraManager controller={controller} />

            {/* Background & Fog */}
            <color attach="background" args={[controller.darkMode ? '#000000' : '#ffffff']} />
            <fog attach="fog" args={[controller.darkMode ? '#000000' : '#ffffff', 20, 200]} />

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
                        const polar = e.target.getPolarAngle();
                        const degLat = Number((90 - (polar * 180 / Math.PI)).toFixed(2));

                        const azi = e.target.getAzimuthalAngle();
                        const degLon = Number((azi * 180 / Math.PI).toFixed(2));

                        // Only update if changed visually
                        if (Math.abs(degLat - controller.viewAngle) > 0.01 || Math.abs(degLon - controller.azimuthAngle) > 0.01) {
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
