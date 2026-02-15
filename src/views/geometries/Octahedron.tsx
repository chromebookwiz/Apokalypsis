import React, { useCallback } from 'react';
import * as THREE from 'three';
import { GeometryBase } from './GeometryBase';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: any;
}

export const OctahedronGeometry: React.FC<Props> = ({ controller }) => {
    const model = controller.primeModel || controller.model;

    const getVector = useCallback((n: number) => {
        // Octahedron: 6 vertices
        // (+-1, 0, 0), (0, +-1, 0), (0, 0, +-1)
        const i = (n - 1) % 6;
        if (i === 0) return new THREE.Vector3(1, 0, 0);
        if (i === 1) return new THREE.Vector3(-1, 0, 0);
        if (i === 2) return new THREE.Vector3(0, 1, 0);
        if (i === 3) return new THREE.Vector3(0, -1, 0);
        if (i === 4) return new THREE.Vector3(0, 0, 1);
        return new THREE.Vector3(0, 0, -1);
    }, []);

    return (
        <GeometryBase
            model={model}
            getVector={getVector}
            scaleFactor={1.5}
            colorMode={controller.colorMode}
            onSelect={controller.selectNumber}
            showNumbers={controller.showNumbers}
        />
    );
};
