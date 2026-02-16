import React, { useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { SNAP_ANGLE_RAD } from '../../data/scripture';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneController } from '../../controllers/SceneController';
import { Edges } from '@react-three/drei';

interface Props {
    controller: ReturnType<typeof useSceneController>;
}

// --- SHARED AUDIO CONTEXT (singleton — all cherubim share one) ---
let sharedAudioCtx: AudioContext | null = null;
const getAudioCtx = (): AudioContext => {
    if (!sharedAudioCtx) sharedAudioCtx = new AudioContext();
    if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
    return sharedAudioCtx;
};

const BASE_HZ = 110; // A2 — root vibration at speed 1.0

const SCALE_HARMONICS: Record<string, number[]> = {
    'FUNDAMENTAL': [1],
    'TRIADIC': [1, 3],
    'MERKABA': [1, 2, 3, 6],
    'CELESTIAL': [1, 1.5, 2, 3, 4],
};

// --- GEOMETRY HELPERS ---

const createMerkabaGeometries = (radius: number) => {
    const rBase = Math.sqrt(8 / 9) * radius;
    const yBase = -radius / 3;

    const a1 = 0;
    const a2 = (2 * Math.PI) / 3;
    const a3 = (4 * Math.PI) / 3;

    const vUp = [
        new THREE.Vector3(0, radius, 0),
        new THREE.Vector3(rBase * Math.cos(a1), yBase, rBase * Math.sin(a1)),
        new THREE.Vector3(rBase * Math.cos(a2), yBase, rBase * Math.sin(a2)),
        new THREE.Vector3(rBase * Math.cos(a3), yBase, rBase * Math.sin(a3))
    ];

    const vDown = vUp.map(v => v.clone().multiplyScalar(-1));

    const indices = [0, 1, 2, 0, 2, 3, 0, 3, 1, 2, 1, 3];

    const geoUp = new THREE.BufferGeometry().setFromPoints(vUp);
    geoUp.setIndex(indices);
    geoUp.computeVertexNormals();

    const geoDown = new THREE.BufferGeometry().setFromPoints(vDown);
    geoDown.setIndex(indices);
    geoDown.computeVertexNormals();

    return { tetraUp: geoUp, tetraDown: geoDown };
};

// --- CHERUBIM NODE (each one sings its own detuned tone) ---
const CherubimNode: React.FC<{
    position: THREE.Vector3;
    color: string;
    controller: any;
    nodeIndex: number;
    totalNodes: number;
}> = ({ position, color, controller, nodeIndex, totalNodes }) => {

    const { tetraUp, tetraDown } = useMemo(() => createMerkabaGeometries(2.0), []);
    const sphereGeo = useMemo(() => new THREE.SphereGeometry(2.0, 24, 24), []);

    const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false
    }), [color]);

    const invisibleMat = useMemo(() => new THREE.MeshBasicMaterial({ visible: false }), []);

    // Rotation refs
    const upRef = useRef<THREE.Mesh>(null);
    const downRef = useRef<THREE.Mesh>(null);
    const rawAngle = useRef(0);

    // --- CHOIR TONE (per-node) ---
    const oscillatorsRef = useRef<OscillatorNode[]>([]);
    const gainNodeRef = useRef<GainNode | null>(null);
    const prevToneState = useRef({ enabled: false, scale: '', speed: 0 });

    // Each cherubim gets a unique detune: spread evenly across ±3% of base
    const detuneRatio = useMemo(() => {
        if (totalNodes <= 1) return 1;
        const spread = 0.03; // ±3% — creates a rich choir shimmer
        return 1 + (nodeIndex / (totalNodes - 1) - 0.5) * 2 * spread;
    }, [nodeIndex, totalNodes]);

    const startTone = (speed: number, scale: string) => {
        stopTone();
        const ctx = getAudioCtx();

        const masterGain = ctx.createGain();
        // Scale volume by number of nodes so choir doesn't clip
        masterGain.gain.value = 0.06 / Math.sqrt(totalNodes);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const harmonics = SCALE_HARMONICS[scale] || [1];
        const baseFreq = Math.max(20, Math.min(speed * BASE_HZ * detuneRatio, 4000));
        const oscs: OscillatorNode[] = [];

        harmonics.forEach((ratio, i) => {
            const osc = ctx.createOscillator();
            const harmGain = ctx.createGain();
            osc.type = i === 0 ? 'sine' : 'triangle';
            osc.frequency.value = baseFreq * ratio;
            harmGain.gain.value = 1 / (i + 1);
            osc.connect(harmGain);
            harmGain.connect(masterGain);
            osc.start();
            oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
    };

    const stopTone = () => {
        oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (_) { /* already stopped */ }
        });
        oscillatorsRef.current = [];
        if (gainNodeRef.current) {
            gainNodeRef.current.disconnect();
            gainNodeRef.current = null;
        }
    };

    const updateFrequency = (speed: number, scale: string) => {
        const baseFreq = Math.max(20, Math.min(speed * BASE_HZ * detuneRatio, 4000));
        const harmonics = SCALE_HARMONICS[scale] || [1];
        oscillatorsRef.current.forEach((osc, i) => {
            if (i < harmonics.length) {
                osc.frequency.value = baseFreq * harmonics[i];
            }
        });
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => { stopTone(); };
    }, []);

    useFrame((_, delta) => {
        // Rotation
        if (controller.isPlaying && upRef.current && downRef.current) {
            const speed = delta * 0.5 * (controller.rotationSpeed || 1.0);
            rawAngle.current += speed;

            const display = controller.parallelLock
                ? Math.round(rawAngle.current / SNAP_ANGLE_RAD) * SNAP_ANGLE_RAD
                : rawAngle.current;

            upRef.current.rotation.y = -display;
            downRef.current.rotation.y = display;
        }

        // Tone management
        const rotSpeed = controller.rotationSpeed || 1.0;
        const shouldPlay = controller.toneEnabled && controller.isPlaying;
        const prev = prevToneState.current;

        if (shouldPlay && !prev.enabled) {
            startTone(rotSpeed, controller.toneScale);
        } else if (!shouldPlay && prev.enabled) {
            stopTone();
        } else if (shouldPlay) {
            if (Math.abs(rotSpeed - prev.speed) > 0.01) {
                updateFrequency(rotSpeed, controller.toneScale);
            }
            if (controller.toneScale !== prev.scale) {
                startTone(rotSpeed, controller.toneScale);
            }
        }

        prevToneState.current = {
            enabled: shouldPlay,
            scale: controller.toneScale,
            speed: rotSpeed
        };
    });

    return (
        <group position={position}>
            <mesh geometry={sphereGeo} material={wireMat} />
            <mesh ref={upRef} geometry={tetraUp} material={invisibleMat}>
                <Edges threshold={15} color="#ff0000" linewidth={2} transparent opacity={0.8} />
            </mesh>
            <mesh ref={downRef} geometry={tetraDown} material={invisibleMat}>
                <Edges threshold={15} color="#0000ff" linewidth={2} transparent opacity={0.8} />
            </mesh>
        </group>
    );
};


export const MetatronGeometry: React.FC<Props> = ({ controller }) => {
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

    const cylinderGeo = useMemo(() => new THREE.CylinderGeometry(0.008, 0.008, 1, 8, 1), []);

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
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [nodes, connections]);

    // --- 3. COLORS ---
    const sphereColor = "#b8860b";
    const gridColor = "#ffd700";

    return (
        <group key={`metatron-${size}`}>
            {nodes.map((pos, i) => (
                <CherubimNode
                    key={i}
                    position={pos}
                    color={sphereColor}
                    controller={controller}
                    nodeIndex={i}
                    totalNodes={nodes.length}
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
