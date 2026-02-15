import React, { useCallback } from 'react';
import * as THREE from 'three';
import { GeometryBase } from './GeometryBase';
import { PrimeModel } from '../../models/PrimeModel';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const TetractysGeometry: React.FC<Props> = ({ controller }) => {
    // 3D Tetractys / Tetrahedron Pyramid
    // Layer 1: 1 point (Top)
    // Layer 2: 3 points
    // Layer 3: 6 points
    // Layer 4: 10 points
    // ...
    // n mapping?
    // User wants "Zohar 1-2-3-4"
    // Let's explicitly place 1, 2, 3, 4.
    // 1 at top. 2,3,4 forming the base? 
    // Or 1 -> 2,3 -> 4,5,6 -> 7,8,9,10

    const getVector = useCallback((n: number) => {
        // Recursive pyramid layout?
        // Simple mapping to tetrahedron vertices via Modulo 4?

        // Zohar 1-2-3-4 logic:
        // 1: Apex (0, 1, 0)
        // 2,3,4: Base triangle

        if (n === 1) return new THREE.Vector3(0, 1, 0);
        if (n === 2) return new THREE.Vector3(1, -1, 1).normalize();
        if (n === 3) return new THREE.Vector3(-1, -1, 1).normalize();
        if (n === 4) return new THREE.Vector3(0, -1, -1).normalize();

        // For n > 4, what do we do?
        // Spiral them down?
        // Let's spiral them around the 1-2-3-4 axis.
        const angle = n * 0.5;
        const y = 1 - (n * 0.05);
        const r = n * 0.05;
        return new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
    }, []);

    return (
        <GeometryBase
            model={controller.primeModel}
            getVector={getVector}
            scaleFactor={4.0}
            colorMode={controller.colorMode}
            onSelect={controller.selectNumber}
        />
    );
};
