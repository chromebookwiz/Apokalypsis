import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = Math.min(prev + 12.5, 100);
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 600);
                }
                return next;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [onComplete, resetKey]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'Cinzel, serif',
            color: '#000'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '140px', height: '140px', position: 'relative', cursor: 'pointer' }} onClick={() => setResetKey(k => k + 1)}>
                    <svg key={resetKey} viewBox="0 0 120 120" width="140" height="140" style={{
                        transform: 'rotate(0deg)',
                        animation: 'slow-rotate 20s linear infinite'
                    }}>
                        <circle
                            cx="60"
                            cy="60"
                            r="56"
                            fill="none"
                            stroke="#d4af37"
                            strokeWidth="4"
                            opacity="0.7"
                            style={{ animation: 'spin-cw 3.5s linear infinite' }}
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="48"
                            fill="none"
                            stroke="#d4af37"
                            strokeWidth="4"
                            opacity="0.5"
                            style={{ animation: 'spin-ccw 4.5s linear infinite' }}
                        />
                        {/* 3D-rotating 2D green cube */}
                        <g>
                            {/* Simulate 3D cube with 2D SVG: 8 points, 12 edges */}
                            {/* Cube vertices (projected for 3D effect) */}
                            {(() => {
                                // 3D cube vertices
                                const size = 32;
                                const cx = 60, cy = 60;
                                // Rotation angles (simulate 3D spin)
                                const now = Date.now();
                                const t = ((now % 4000) / 4000) * 2 * Math.PI;
                                const rx = Math.sin(t) * 0.7;
                                const ry = Math.cos(t) * 0.7;
                                const rz = Math.sin(t * 0.7) * 0.5;
                                // 3D rotation matrix
                                function rotate([x, y, z]: [number, number, number]) {
                                    // Rotate X
                                    let y1 = y * Math.cos(rx) - z * Math.sin(rx);
                                    let z1 = y * Math.sin(rx) + z * Math.cos(rx);
                                    // Rotate Y
                                    let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
                                    let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
                                    // Rotate Z
                                    let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
                                    let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
                                    return [x3, y3, z2];
                                }
                                // Cube vertices
                                const verts = [
                                    [-size, -size, -size],
                                    [ size, -size, -size],
                                    [ size,  size, -size],
                                    [-size,  size, -size],
                                    [-size, -size,  size],
                                    [ size, -size,  size],
                                    [ size,  size,  size],
                                    [-size,  size,  size],
                                ].map(([x, y, z]) => {
                                    const [xr, yr, zr] = rotate([x, y, z]);
                                    // Simple perspective
                                    const perspective = 220 / (220 - zr);
                                    return [cx + xr * perspective, cy + yr * perspective];
                                });
                                // Cube edges (pairs of vertex indices)
                                const edges = [
                                    [0,1],[1,2],[2,3],[3,0], // bottom
                                    [4,5],[5,6],[6,7],[7,4], // top
                                    [0,4],[1,5],[2,6],[3,7]  // sides
                                ];
                                return (
                                    <g>
                                        {/* Cube faces (drawn as filled polygons for a solid look) */}
                                        <polygon points={[
                                            verts[0], verts[1], verts[2], verts[3]
                                        ].map(([x,y])=>`${x},${y}`).join(' ')} fill="#00c853" opacity="0.18" />
                                        <polygon points={[
                                            verts[4], verts[5], verts[6], verts[7]
                                        ].map(([x,y])=>`${x},${y}`).join(' ')} fill="#00c853" opacity="0.22" />
                                        {/* Cube edges */}
                                        {edges.map(([a,b],i) => (
                                            <line key={i} x1={verts[a][0]} y1={verts[a][1]} x2={verts[b][0]} y2={verts[b][1]} stroke="#00c853" strokeWidth="3.2" opacity="0.95" />
                                        ))}
                                    </g>
                                );
                            })()}
                        </g>
                    </svg>
                </div>
                <div style={{ width: '260px', height: '6px', background: 'rgba(212,175,55,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(212,175,55,1), rgba(255,255,255,0.9))',
                        transition: 'width 0.4s ease'
                    }} />
                </div>
            </div>

            <style>
                {`
                    @keyframes slow-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                `}
            </style>
        </div>
    );
};