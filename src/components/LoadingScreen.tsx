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
                        <g strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M60 18 L18 92 L102 92 Z" stroke="#d62b2f" />
                        </g>
                        <g strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M60 102 L18 28 L102 28 Z" stroke="#1b6cf7" />
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