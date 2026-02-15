import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneController } from '../../controllers/SceneController';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

export const TesseractGeometry: React.FC<Props> = ({ controller }) => {
    const isLight = controller.bgMode === 'LIGHT';
    const angleRef = useRef(0);

    // Geometry Refs
    const lineGeoRef = useRef<THREE.BufferGeometry>(null);
    const pointsRef = useRef<THREE.Points>(null);

    // 1. Define 16 Vertices of Hypercube (0..15)
    // 2. Define 32 Edges (Pairs of indices where bit difference is 1)
    const { edges, baseVertices } = useMemo(() => {
        const verts: number[][] = [];
        for (let i = 0; i < 16; i++) {
            // Map bits to -1, 1
            const x = (i & 1) ? 1 : -1;
            const y = (i & 2) ? 1 : -1;
            const z = (i & 4) ? 1 : -1;
            const w = (i & 8) ? 1 : -1;
            verts.push([x, y, z, w]);
        }

        const e: number[] = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                // Check if Hamming distance is 1 (Power of 2 difference)
                const diff = i ^ j;
                if ((diff & (diff - 1)) === 0) {
                    e.push(i, j); // Add pair
                }
            }
        }
        return { edges: e, baseVertices: verts };
    }, []);

    // Initial Positions for Line Segments (32 edges * 2 points * 3 coords)
    const linePositions = useMemo(() => new Float32Array(edges.length * 3), [edges]);

    const projectedVerts = useMemo(() => {
        return new Array(16).fill(0).map(() => new THREE.Vector3());
    }, []);

    useFrame((state, delta) => {
        if (!lineGeoRef.current) return;

        // Auto Rotation
        if (controller.autoRotate4D) {
            angleRef.current += delta * 0.2;
        }
        const auto = angleRef.current;
        const rotXW = controller.tesseractRot.xw + auto;
        const rotYW = controller.tesseractRot.yw + (controller.autoRotate4D ? auto * 0.5 : 0);
        const rotZW = controller.tesseractRot.zw;

        const cxw = Math.cos(rotXW), sxw = Math.sin(rotXW);
        const cyw = Math.cos(rotYW), syw = Math.sin(rotYW);
        const czw = Math.cos(rotZW), szw = Math.sin(rotZW);

        // 1. Rotate & Project All 16 Vertices
        for (let i = 0; i < 16; i++) {
            const [x, y, z, w] = baseVertices[i];

            // XW Rotation
            let x1 = x * cxw - w * sxw;
            let w1 = x * sxw + w * cxw;
            let y1 = y;
            let z1 = z;

            // YW Rotation
            let y2 = y1 * cyw - w1 * syw;
            let w2 = y1 * syw + w1 * cyw;
            let x2 = x1;
            let z2 = z1;

            // ZW Rotation
            let z3 = z2 * czw - w2 * szw;
            let w3 = z2 * szw + w2 * czw;
            let x3 = x2;
            let y3 = y2;

            // Projection (Stereographic)
            // Camera dist ~ 3
            let factor = 3 / (4 - w3);

            projectedVerts[i].set(x3 * factor, y3 * factor, z3 * factor);
        }

        // 2. Update Line Geometry Positions
        const posAttr = lineGeoRef.current.attributes.position as THREE.BufferAttribute;
        // edges array contains indices [0, 1, 0, 2, ...]
        for (let i = 0; i < edges.length; i++) {
            const vertIdx = edges[i];
            const v = projectedVerts[vertIdx];
            posAttr.setXYZ(i, v.x * 2.5, v.y * 2.5, v.z * 2.5); // Scale up slightly for presence
        }
        posAttr.needsUpdate = true;

        // 3. Update Points
        if (pointsRef.current) {
            const pointsPos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
            for (let i = 0; i < 16; i++) {
                const v = projectedVerts[i];
                pointsPos.setXYZ(i, v.x * 2.5, v.y * 2.5, v.z * 2.5);
            }
            pointsPos.needsUpdate = true;
        }

    });

    return (
        <group>
            {/* The Wireframe */}
            <lineSegments>
                <bufferGeometry ref={lineGeoRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={edges.length}
                        array={linePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={isLight ? "#000000" : "#ffffff"}
                    linewidth={3}
                    opacity={1}
                />
            </lineSegments>

            {/* The Nodes (Vertices) */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={16}
                        array={new Float32Array(16 * 3)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial color={isLight ? "#ff0000" : "#ffd700"} size={0.3} sizeAttenuation={true} />
            </points>
        </group>
    );
};
