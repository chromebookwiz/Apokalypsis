import React, { useCallback } from 'react';
import * as THREE from 'three';
import { GeometryBase } from './GeometryBase';
import { PrimeModel } from '../../models/PrimeModel';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const TorusGeometry: React.FC<Props> = ({ controller }) => {
    // Torus Parametric:
    // x = (R + r cos v) cos u
    // y = (R + r cos v) sin u
    // z = r sin v
    const R = 3; // Major radius
    const r = 1; // Minor radius

    const getVector = useCallback((n: number) => {
        // Map n to angles u, v
        // To create a spiral, u and v should grow with n.
        // Golden ratio spiral?
        const u = n * 0.1;
        const v = n * 0.05;

        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);

        // Return actual position (GeometryBase with scaleFactor=1 will use this if length is not ~1)
        // Actually GeometryBase logic: if length ~1, it scales by Dist.
        // Here we want Fixed Torus Shape, not exploding shell.
        // So we return the position.
        // GeometryBase needs adjustment? 
        // My Logic in GeometryBase:
        // if (vec.lengthSq() > 0.9 && ... ) -> multiplyScalar(dist)
        // else -> multiplyScale(scaleFactor).

        // This vector length varies. (R-r) to (R+r). 2 to 4.
        // It will hit "else" branch and be scaled by ScaleFactor.
        // Perfect.
        return new THREE.Vector3(x, y, z);
    }, []);

    return (
        <GeometryBase
            model={controller.primeModel}
            getVector={getVector}
            scaleFactor={1.0}
            colorMode={controller.colorMode}
            onSelect={controller.selectNumber}
        />
    );
};
