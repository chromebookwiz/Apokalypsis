import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { PrimeModel } from '../../models/PrimeModel';
import { NumerologyModel } from '../../models/NumerologyModel';
import { ColorMode, BgMode } from '../../controllers/SceneController';

interface Props {
    model: PrimeModel;
    getVector: (n: number) => THREE.Vector3;
    scaleFactor?: number;
    colorMode?: ColorMode;
    onSelect?: (n: number) => void;
    showNumbers?: boolean;
    bgMode?: BgMode;
}

export const GeometryBase: React.FC<Props> = ({
    model,
    getVector,
    scaleFactor = 1,
    colorMode = 'PRIME',
    onSelect,
    showNumbers = false,
    bgMode = 'DARK'
}) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const max = model.getMax();
    const count = max;
    const isLight = bgMode === 'LIGHT';

    // Data generation
    const data = useMemo(() => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const n = i + 1;
            const isPrime = model.isPrime(n);
            const vec = getVector(n);

            // Positioning Logic
            const pos = new THREE.Vector3();
            let dist = n / 50.0;
            if (vec.lengthSq() > 0.9 && vec.lengthSq() < 1.1) {
                pos.copy(vec).multiplyScalar(dist * scaleFactor);
            } else {
                pos.copy(vec).multiplyScalar(scaleFactor);
            }

            // Size
            let s = isPrime ? 0.6 : 0.3;
            if (colorMode === 'ZOHAR' && n <= 4) s = 2.0;
            if (NumerologyModel.isMasterNumber(n)) s = 0.8;

            // Color Logic
            let c = '#ffffff';

            if (colorMode === 'PRIME') {
                if (isLight) {
                    // White BG: Primes RED, Others BLACK (or Grey)
                    c = isPrime ? '#ff0000' : '#444444';
                } else {
                    c = isPrime ? '#ff0000' : '#ffffff';
                }
            } else if (colorMode === 'ROOT') {
                c = NumerologyModel.getDigitalRootColor(n);
            } else if (colorMode === 'ZOHAR') {
                if (n <= 4) c = NumerologyModel.getZoharColor(n);
                else {
                    if (isLight) c = isPrime ? '#aa0000' : '#333333';
                    else c = isPrime ? '#880000' : '#cccccc';
                }
            } else if (colorMode === 'GOLDEN') {
                // Future Perfect: Gold in Dark, Black+Gold in Light?
                if (isLight) {
                    c = isPrime ? '#d4af37' : '#222222';
                } else {
                    c = isPrime ? '#ffd700' : '#ffffff';
                }
            }

            items.push({ n, pos, size: s, color: c, isPrime });
        }
        return items;
    }, [count, model, getVector, scaleFactor, colorMode, isLight]);

    useLayoutEffect(() => {
        if (!meshRef.current) return;
        const dummy = new THREE.Object3D();
        const color = new THREE.Color();

        data.forEach((item, i) => {
            dummy.position.copy(item.pos);
            dummy.scale.set(item.size, item.size, item.size);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
            meshRef.current!.setColorAt(i, color.set(item.color));
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [data]);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (e.instanceId !== undefined && onSelect) {
            onSelect(e.instanceId + 1);
        }
    };

    return (
        <group>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, count]}
                onClick={handleClick}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhysicalMaterial
                    roughness={0.15}
                    transmission={isLight ? 0.2 : 0.6} // Less glass in light mode? Or different look. 
                    thickness={1.5}
                    ior={1.5}
                    chromaticAberration={0.06}
                    attenuationColor={isLight ? "#000000" : "#ffffff"}
                    attenuationDistance={5}
                    toneMapped={false}
                    color="#ffffff"
                />
            </instancedMesh>

            {showNumbers && data.map((item) => (
                <Text
                    key={item.n}
                    position={[item.pos.x, item.pos.y + item.size + 0.5, item.pos.z]}
                    fontSize={item.size * 0.8}
                    color={item.color} // This will be Black/Red in light mode
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={0.9}
                    outlineWidth={isLight ? 0 : 0.05} // No outline needed on white usually
                    outlineColor="#000000"
                >
                    {item.n}
                </Text>
            ))}
        </group>
    );
};
