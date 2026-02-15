import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

// 400 Million is physically impossible in a browser buffer (needs ~10GB VRAM).
// We set a "Safe Max" of 4,000,000 (4 Million) which is still massive.
// Or 10M. Let's do 4,000,000 for stability.
const MAX_POINTS = 4000000;

// Sieve for fast Prime Generation
const generatePrimes = (n: number) => {
    const sieve = new Uint8Array(n + 1);
    sieve[0] = 1; sieve[1] = 1;
    for (let i = 2; i * i <= n; i++) {
        if (sieve[i] === 0) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = 1;
            }
        }
    }
    return sieve;
};

export const UlamSpiral: React.FC<Props> = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, sieve } = useMemo(() => {
        const sieveData = generatePrimes(MAX_POINTS);

        const posArray = new Float32Array(MAX_POINTS * 3);
        let x = 0, y = 0;
        let dx = 0, dy = -1;

        for (let i = 1; i <= MAX_POINTS; i++) {
            posArray[(i - 1) * 3] = x;
            posArray[(i - 1) * 3 + 1] = y;
            posArray[(i - 1) * 3 + 2] = 0;

            if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
                const temp = dx;
                dx = -dy;
                dy = temp;
            }
            x += dx;
            y += dy;
        }

        return { positions: posArray, sieve: sieveData };
    }, []);

    useLayoutEffect(() => {
        if (!pointsRef.current) return;

        const colors = new Float32Array(MAX_POINTS * 3);
        const primeColor = new THREE.Color(1, 0, 0); // Red Primes
        const structureColor = new THREE.Color(0.8, 0.8, 0.8); // Light Grey for structure on White

        for (let i = 0; i < MAX_POINTS; i++) {
            const isP = sieve[i + 1] === 0;

            if (isP) {
                colors[i * 3] = primeColor.r;
                colors[i * 3 + 1] = primeColor.g;
                colors[i * 3 + 2] = primeColor.b;
            } else {
                colors[i * 3] = structureColor.r;
                colors[i * 3 + 1] = structureColor.g;
                colors[i * 3 + 2] = structureColor.b;
            }
        }

        if (pointsRef.current.geometry.attributes.color) {
            (pointsRef.current.geometry.attributes.color as THREE.BufferAttribute).array.set(colors);
            pointsRef.current.geometry.attributes.color.needsUpdate = true;
        } else {
            pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        }

    }, [sieve]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={MAX_POINTS}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={MAX_POINTS}
                    array={new Float32Array(MAX_POINTS * 3)}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.2}
                vertexColors
                sizeAttenuation={false}
            />
        </points>
    );
};
