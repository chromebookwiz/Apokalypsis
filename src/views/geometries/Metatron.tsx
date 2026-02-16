import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { SNAP_ANGLE_RAD } from '../../data/scripture';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneController } from '../../controllers/SceneController';
import { Edges } from '@react-three/drei';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

// --- GEOMETRY HELPERS ---


// Manual Star Tetrahedron Geometry (Apex Up/Down)
const createMerkabaGeometries = (radius: number) => {
    // Helper to create tetra vertices
    // Apex: (0, 1, 0) * R
    // Base: circle at y = -1/3 * R
    // Base Radius: sqrt(8/9) * R = 0.9428 * R
    const rBase = Math.sqrt(8 / 9) * radius;
    const yBase = -radius / 3;

    // Angles for base (0, 120, 240 degrees)
    const a1 = 0;
    const a2 = (2 * Math.PI) / 3;
    const a3 = (4 * Math.PI) / 3;

    // Up Vertices (Apex Up)
    const vUp = [
        new THREE.Vector3(0, radius, 0), // Apex
        new THREE.Vector3(rBase * Math.cos(a1), yBase, rBase * Math.sin(a1)),
        new THREE.Vector3(rBase * Math.cos(a2), yBase, rBase * Math.sin(a2)),
        new THREE.Vector3(rBase * Math.cos(a3), yBase, rBase * Math.sin(a3))
    ];

    // Down Vertices (Inverted)
    const vDown = vUp.map(v => v.clone().multiplyScalar(-1));

    // Indices for Tetrahedron (4 faces)
    // 0-1-2, 0-2-3, 0-3-1, 1-3-2 (Base is 1-2-3, winding)
    const indices = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 1,
        2, 1, 3
    ];

    const geoUp = new THREE.BufferGeometry().setFromPoints(vUp);
    geoUp.setIndex(indices);
    geoUp.computeVertexNormals();

    const geoDown = new THREE.BufferGeometry().setFromPoints(vDown);
    geoDown.setIndex(indices);
    geoDown.computeVertexNormals();

    return { tetraUp: geoUp, tetraDown: geoDown };
};

// --- CHERUBIM NODE (Small Merkaba) ---
const CherubimNode: React.FC<{
    position: THREE.Vector3;
    color: string;
    controller: any;
}> = ({ position, color, controller }) => {

    // Geometry
    const { tetraUp, tetraDown } = useMemo(() => createMerkabaGeometries(2.0), []);
    const sphereGeo = useMemo(() => new THREE.SphereGeometry(2.0, 24, 24), []);

    // Materials
    // A. Spheres: More transparent (User request: "surrounding spheres need to be more transparent")
    // opacity reduced from 0.4 to 0.08 for very faint "Holy" wireframe
    const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false
    }), [color]);

    // B. Tangible Triangles (User request: "seen very well", "tiny bit thicker")
    // We use an invisible material for the mesh faces, and render <Edges /> for thickened wireframe.
    const invisibleMat = useMemo(() => new THREE.MeshBasicMaterial({ visible: false }), []);

    // Refs for Rotation
    const upRef = useRef<THREE.Mesh>(null);
    const downRef = useRef<THREE.Mesh>(null);
    const rawAngle = useRef(0);

    useFrame((_, delta) => {
        if (controller.isPlaying && upRef.current && downRef.current) {
            const speed = delta * 0.5 * (controller.rotationSpeed || 1.0);
            rawAngle.current += speed;

            // When parallelLock is ON, snap to nearest π/6 (30°)
            const display = controller.parallelLock
                ? Math.round(rawAngle.current / SNAP_ANGLE_RAD) * SNAP_ANGLE_RAD
                : rawAngle.current;

            // Top -> Right (Negative Y), Bottom -> Left (Positive Y)
            upRef.current.rotation.y = -display;
            downRef.current.rotation.y = display;
        }
    });

    return (
        <group position={position}>
            {/* Sphere (Faint Wireframe) */}
            <mesh geometry={sphereGeo} material={wireMat} />

            {/* Merkaba - Thicker Lines via Edges */}
            {/* Upper Tetra (Fire/Red) */}
            <mesh ref={upRef} geometry={tetraUp} material={invisibleMat}>
                <Edges threshold={15} color="#ff0000" linewidth={2} transparent opacity={0.8} />
            </mesh>

            {/* Lower Tetra (Water/Blue) */}
            <mesh ref={downRef} geometry={tetraDown} material={invisibleMat}>
                <Edges threshold={15} color="#0000ff" linewidth={2} transparent opacity={0.8} />
            </mesh>
        </group>
    );
};


export const MetatronGeometry: React.FC<Props> = ({ controller }) => {
    // const isLight = controller.bgMode === 'LIGHT'; // REMOVED
    // const blackMode = controller.blackMode; // REMOVED
    const spacing = 4.0;
    const size = controller.gridSize || 3;

    // --- 1. DYNAMIC GRID ---
    const { nodes, connections } = useMemo(() => {
        const _nodes: THREE.Vector3[] = [];
        const offset = (size - 1) / 2;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    const px = (x - offset) * spacing;
                    const py = (y - offset) * spacing;
                    const pz = (z - offset) * spacing;
                    _nodes.push(new THREE.Vector3(px, py, pz));
                }
            }
        }

        const _conns: [number, number][] = [];
        for (let i = 0; i < _nodes.length; i++) {
            for (let j = i + 1; j < _nodes.length; j++) {
                _conns.push([i, j]);
            }
        }

        return { nodes: _nodes, connections: _conns };
    }, [size]);

    // --- 2. INSTANCED LINES ---
    const meshRef = useRef<THREE.InstancedMesh>(null);
    // const glowRef = useRef<THREE.InstancedMesh>(null); // REMOVED glow ref for simplification or keep it? 
    // User didn't explicitly ask to remove glow lines, but standardizing. 
    // Let's keep the lines simple.

    // 24 vertical segments (radial) and 8 horizontal segments (height)
    const cylinderGeo = useMemo(() => new THREE.CylinderGeometry(0.008, 0.008, 1, 8, 1), []);
    // Glow geometry - thicker but less segments needed - REMOVED for clean film look

    useLayoutEffect(() => {
        if (!meshRef.current) return;

        const tempObj = new THREE.Object3D();
        const vecA = new THREE.Vector3();
        const vecB = new THREE.Vector3();

        connections.forEach((pair, i) => {
            const nodeA = nodes[pair[0]];
            const nodeB = nodes[pair[1]];

            vecA.copy(nodeA);
            vecB.copy(nodeB);

            const mid = new THREE.Vector3().addVectors(vecA, vecB).multiplyScalar(0.5);
            const dist = vecA.distanceTo(vecB);

            tempObj.position.copy(mid);
            tempObj.lookAt(vecB);
            tempObj.rotateX(Math.PI / 2);

            tempObj.scale.set(1, dist, 1);
            tempObj.updateMatrix();

            meshRef.current!.setMatrixAt(i, tempObj.matrix);
            // if (glowRef.current) glowRef.current.setMatrixAt(i, tempObj.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        // if (glowRef.current) glowRef.current.instanceMatrix.needsUpdate = true;
    }, [nodes, connections]);

    // --- 3. COLORS ---
    // Holy Artifact Mode: All Gold/Light
    const sphereColor = "#b8860b"; // Darker Gold for visibility
    const gridColor = "#ffd700"; // Bright Gold lines

    return (
        <group key={`metatron-${size}`}>
            {nodes.map((pos, i) => (
                <CherubimNode
                    key={i}
                    position={pos}
                    color={sphereColor}
                    controller={controller}
                />
            ))}

            <instancedMesh ref={meshRef} args={[cylinderGeo, undefined, connections.length]}>
                <meshBasicMaterial
                    color={gridColor}
                    transparent
                    opacity={0.6}
                />
            </instancedMesh>
        </group>
    );
};
