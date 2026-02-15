import React, { useCallback } from 'react';
import * as THREE from 'three';
import { GeometryBase } from './GeometryBase';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: ReturnType<typeof useSceneController> | { model: any }; // Backward compat or strict
}

export const MerkabaGeometry: React.FC<Props> = ({ controller }) => {
    // Handling both full controller or just model property if passed legacy
    const model = 'primeModel' in controller ? controller.primeModel : controller.model;
    const ctl = 'primeModel' in controller ? controller : undefined;

    const getVector = useCallback((n: number) => {
        // Merkaba: Star Tetrahedron (2 intersecting tetrahedrons)
        // 8 Vertices
        // (+-1, +-1, +-1)
        const i = (n - 1) % 8;
        const x = (i & 1) ? 1 : -1;
        const y = (i & 2) ? 1 : -1;
        const z = (i & 4) ? 1 : -1;
        return new THREE.Vector3(x, y, z).normalize();
    }, []);

    return (
        <GeometryBase
            model={model}
            getVector={getVector}
            scaleFactor={1.5}
            colorMode={ctl?.colorMode}
            onSelect={ctl?.selectNumber}
            showNumbers={ctl?.showNumbers}
        />
    );
};
