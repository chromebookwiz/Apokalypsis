import React, { useCallback } from 'react';
import * as THREE from 'three';
import { GeometryBase } from './GeometryBase';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: any;
}

export const CubeGeometry: React.FC<Props> = ({ controller }) => {
    const model = controller.primeModel || controller.model;

    const getVector = useCallback((n: number) => {
        // Cube corners
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
            colorMode={controller.colorMode}
            onSelect={controller.selectNumber}
            showNumbers={controller.showNumbers}
        />
    );
};
