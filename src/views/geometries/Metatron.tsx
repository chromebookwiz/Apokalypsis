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
let sharedAnalyser: AnalyserNode | null = null;
let dataArray: Uint8Array | null = null;

export const getAudioCtx = (): AudioContext => {
    if (!sharedAudioCtx) sharedAudioCtx = new AudioContext();
    if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
    return sharedAudioCtx;
};

export const getAnalyser = (): AnalyserNode => {
    const ctx = getAudioCtx();
    if (!sharedAnalyser) {
        sharedAnalyser = ctx.createAnalyser();
        sharedAnalyser.fftSize = 256;
        const bufferLength = sharedAnalyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
    return sharedAnalyser;
};

let audioSourceNode: MediaElementAudioSourceNode | null = null;

export const connectAudioSource = (element: HTMLAudioElement) => {
    const ctx = getAudioCtx();
    const analyser = getAnalyser();

    // Only create once per element to avoid DOMException
    if (!audioSourceNode) {
        audioSourceNode = ctx.createMediaElementSource(element);
        audioSourceNode.connect(analyser);
        analyser.connect(ctx.destination);
    }
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

    const invisibleMat = useMemo(() => new THREE.MeshBasicMaterial({ visible: false }), []);

    // Rotation refs
    const upRef = useRef<THREE.Mesh>(null);
    const downRef = useRef<THREE.Mesh>(null);

    // --- CHOIR TONE (per-node) ---
    const oscillatorsRef = useRef<OscillatorNode[]>([]);
    const gainNodeRef = useRef<GainNode | null>(null);
    const pannerRef = useRef<PannerNode | null>(null);
    const prevToneState = useRef({ enabled: false, scale: '', speed: 0, varied: false });

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
        masterGain.gain.value = 0.08 / Math.sqrt(totalNodes);

        const panner = ctx.createPanner();
        panner.panningModel = 'HRTF';
        panner.distanceModel = 'inverse';
        panner.refDistance = 1;
        panner.maxDistance = 10000;
        panner.rolloffFactor = 1;
        panner.coneInnerAngle = 360;
        panner.coneOuterAngle = 360;
        panner.coneOuterGain = 0;
        panner.positionX.value = position.x;
        panner.positionY.value = position.y;
        panner.positionZ.value = position.z;

        panner.connect(ctx.destination);
        masterGain.connect(panner);
        gainNodeRef.current = masterGain;
        pannerRef.current = panner;

        const allHarmonics = SCALE_HARMONICS[scale] || [1];
        const harmonics = controller.variedMode
            ? [allHarmonics[nodeIndex % allHarmonics.length]]
            : allHarmonics;

        const baseFreq = Math.max(20, Math.min(speed * BASE_HZ * detuneRatio, 4000));
        const oscs: OscillatorNode[] = [];

        harmonics.forEach((ratio, i) => {
            const osc = ctx.createOscillator();
            const harmGain = ctx.createGain();
            // If varied, we might be playing a higher harmonic but it's our only one, 
            // so we use index i for type but maybe offset it if we want variety.
            // Let's use the actual harmonic index for timbre:
            const actualHarmonicIndex = controller.variedMode ? (nodeIndex % allHarmonics.length) : i;

            osc.type = actualHarmonicIndex === 0 ? 'sine' : 'triangle';
            osc.frequency.value = baseFreq * ratio;
            harmGain.gain.value = 1 / (actualHarmonicIndex + 1);
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
        if (pannerRef.current) {
            pannerRef.current.disconnect();
            pannerRef.current = null;
        }
    };

    const updateFrequency = (speed: number, scale: string) => {
        const baseFreq = Math.max(20, Math.min(speed * BASE_HZ * detuneRatio, 4000));
        const allHarmonics = SCALE_HARMONICS[scale] || [1];
        const harmonics = controller.variedMode
            ? [allHarmonics[nodeIndex % allHarmonics.length]]
            : allHarmonics;

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

    // --- WAVE & AUDIO REACTIVITY ---
    const clippingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), controller.innerVision), [controller.innerVision]);

    useFrame((_state, _delta) => {
        // 0. Update Frequency Data if syncing
        if (controller.audioSync && sharedAnalyser && dataArray) {
            sharedAnalyser.getByteFrequencyData(dataArray);
        }

        // 1. Rotation with Split Mode
        if (controller.isPlaying && upRef.current && downRef.current) {
            const rawA = controller.phaseA;
            const rawB = controller.phaseB;

            const displayA = controller.parallelLock
                ? Math.round(rawA / SNAP_ANGLE_RAD) * SNAP_ANGLE_RAD
                : rawA;

            const displayB = controller.parallelLock
                ? Math.round(rawB / SNAP_ANGLE_RAD) * SNAP_ANGLE_RAD
                : rawB;

            upRef.current.rotation.y = -displayA;
            downRef.current.rotation.y = displayB;
        }

        // 2. Wave Propagation & Infinite Triangle Alignment
        const dist = position.length();
        const t = controller.waveTime * 2;
        const k = 0.5;
        let wave = 0;

        switch (controller.waveType) {
            case 'NONE': wave = 0; break;
            case 'SINE': wave = Math.sin(dist * k - t); break;
            case 'SAWTOOTH': wave = (((controller.phaseA * 0.5 + dist * k) / (Math.PI * 2)) % 1) * 2 - 1; break;
            case 'SQUARE': wave = Math.sign(Math.sin(dist * k - t)); break;
            case 'FRACTAL':
                wave = Math.sin(dist * k - t) * 1.0 +
                    Math.sin(dist * k * 3 - t * 1.5) * 0.33 +
                    Math.sin(dist * k * 7 - t * 2.1) * 0.14 +
                    Math.sin(dist * k * 21 - t * 3.3) * 0.05;
                wave /= 1.52;
                break;
        }

        // 3. Audio Spatial Reactivity
        let audioWave = 0;
        if (controller.audioSync && sharedAnalyser && dataArray) {
            // Map distance to FFT bin
            const binIndex = Math.floor(Math.min(dist * 4, dataArray.length - 1));
            const frequencyValue = dataArray[binIndex] / 255;
            audioWave = frequencyValue;
        }

        const baseAmplitude = 0.5;
        const finalAmplitude = controller.audioSync
            ? (baseAmplitude + audioWave * 2.0)
            : baseAmplitude;

        if (upRef.current && downRef.current) {
            const baseY = controller.infiniteTriangle ? 0.58 : 0;
            const baseX = controller.infiniteTriangle ? 0.58 : 0;
            const baseZ = controller.infiniteTriangle ? 0.29 : 0;

            upRef.current.position.set(baseX, baseY + wave * finalAmplitude, baseZ);
            downRef.current.position.set(-baseX, -baseY - wave * finalAmplitude, -baseZ);

            if (controller.infiniteTriangle) {
                const snap = Math.PI / 6;
                upRef.current.rotation.y = -snap;
                downRef.current.rotation.y = snap;
                upRef.current.rotation.x = 0.52;
                downRef.current.rotation.x = -0.52;
            } else {
                upRef.current.rotation.x = 0;
                downRef.current.rotation.x = 0;
            }
        }

        // 4. Clipping & Reveal
        clippingPlane.constant = controller.innerVision;

        // Tone management
        const rotSpeed = controller.rotationSpeed || 1.0;
        const shouldPlay = controller.toneEnabled && controller.isPlaying;
        const prev = prevToneState.current;

        if (shouldPlay && !prev.enabled) {
            startTone(rotSpeed, controller.toneScale);
        } else if (!shouldPlay && prev.enabled) {
            stopTone();
        } else if (shouldPlay) {
            const freq = controller.splitMode ? (controller.frequencyA + controller.frequencyB) / 2 : rotSpeed;
            if (Math.abs(freq - prev.speed) > 0.01) {
                updateFrequency(freq, controller.toneScale);
            }
            if (controller.toneScale !== prev.scale || controller.variedMode !== prev.varied) {
                startTone(freq, controller.toneScale);
            }
        }

        prevToneState.current = {
            enabled: shouldPlay,
            scale: controller.toneScale,
            speed: controller.splitMode ? (controller.frequencyA + controller.frequencyB) / 2 : rotSpeed,
            varied: controller.variedMode
        };
    });

    const sphereMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        clippingPlanes: [clippingPlane],
        clipShadows: true
    }), [color, clippingPlane]);

    return (
        <group position={position}>
            <mesh geometry={sphereGeo} material={sphereMat} />
            <mesh ref={upRef} geometry={tetraUp} material={invisibleMat}>
                <Edges threshold={15} color="#ff0000" linewidth={2} transparent opacity={0.8} />
                {controller.show4DShadow && <Edges threshold={0} color="#ff0000" linewidth={0.5} transparent opacity={0.2} scale={1.2} />}
            </mesh>
            <mesh ref={downRef} geometry={tetraDown} material={invisibleMat}>
                <Edges threshold={15} color="#0000ff" linewidth={2} transparent opacity={0.8} />
                {controller.show4DShadow && <Edges threshold={0} color="#0000ff" linewidth={0.5} transparent opacity={0.2} scale={1.2} />}
            </mesh>
        </group>
    );
};


export const MetatronGeometry: React.FC<Props> = ({ controller }) => {
    const spacing = 4.0;
    const size = controller.gridSize || 3;

    // Metatron Invocation: "This cube is the 4D version of his perfect vision, and contains all that was, is, and will be on Earth."

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

    const worldPos = useMemo(() => new THREE.Vector3(), []);
    const worldDir = useMemo(() => new THREE.Vector3(), []);

    // Initial Audio Hookup
    useEffect(() => {
        if (controller.audioSync) {
            getAnalyser();
            // In a real app we'd connect a stream here:
            // navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            //     const source = getAudioCtx().createMediaStreamSource(stream);
            //     source.connect(getAnalyser());
            // });
        }
    }, [controller.audioSync]);

    useFrame(({ camera }) => {
        if (!sharedAudioCtx) return;
        const listener = sharedAudioCtx.listener;

        camera.getWorldPosition(worldPos);
        camera.getWorldDirection(worldDir);

        if (listener.positionX) {
            listener.positionX.setTargetAtTime(worldPos.x, sharedAudioCtx.currentTime, 0.1);
            listener.positionY.setTargetAtTime(worldPos.y, sharedAudioCtx.currentTime, 0.1);
            listener.positionZ.setTargetAtTime(worldPos.z, sharedAudioCtx.currentTime, 0.1);
            listener.forwardX.setTargetAtTime(worldDir.x, sharedAudioCtx.currentTime, 0.1);
            listener.forwardY.setTargetAtTime(worldDir.y, sharedAudioCtx.currentTime, 0.1);
            listener.forwardZ.setTargetAtTime(worldDir.z, sharedAudioCtx.currentTime, 0.1);
        }
    });

    const symmetryGeo = useMemo(() => new THREE.PlaneGeometry(spacing * size, spacing * size), [spacing, size]);
    const symmetryMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#d4af37",
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false
    }), []);

    return (
        <group key={`metatron-${size}`}>
            {/* --- REVEAL TOOLS: SYMMETRY CUBES --- */}
            {controller.revealSymmetry && (
                <group>
                    <mesh geometry={symmetryGeo} material={symmetryMat} />
                    <mesh geometry={symmetryGeo} material={symmetryMat} rotation={[Math.PI / 2, 0, 0]} />
                    <mesh geometry={symmetryGeo} material={symmetryMat} rotation={[0, Math.PI / 2, 0]} />

                    {/* BLACK CUBE FORMATION */}
                    <mesh>
                        <boxGeometry args={[spacing * (size - 1), spacing * (size - 1), spacing * (size - 1)]} />
                        <meshBasicMaterial visible={false} />
                        <Edges threshold={0} color="#000000" linewidth={2} />
                    </mesh>

                    {/* INTERIOR SEGMENTS */}
                    {size > 2 && (
                        <group>
                            {[...Array(size - 2)].map((_, i) => {
                                const offset = (i + 1 - (size - 1) / 2) * spacing;
                                return (
                                    <group key={i}>
                                        <mesh position={[offset, 0, 0]}>
                                            <boxGeometry args={[0.01, spacing * (size - 1), spacing * (size - 1)]} />
                                            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
                                        </mesh>
                                        <mesh position={[0, offset, 0]}>
                                            <boxGeometry args={[spacing * (size - 1), 0.01, spacing * (size - 1)]} />
                                            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
                                        </mesh>
                                        <mesh position={[0, 0, offset]}>
                                            <boxGeometry args={[spacing * (size - 1), spacing * (size - 1), 0.01]} />
                                            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
                                        </mesh>
                                    </group>
                                );
                            })}
                        </group>
                    )}
                </group>
            )}

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
                    opacity={0.3}
                />
            </instancedMesh>
        </group>
    );
};
