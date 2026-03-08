import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('');

    const steps = [
        'Initializing Null-Line Kernel...',
        'Loading ADE Classification...',
        'Establishing Twistor Space...',
        'Quantum Memory Calibration...',
        'Agent System Online...',
        '3D Geometry Engine Ready...',
        'Apokalypsis OS v15 Boot Complete'
    ];

    useEffect(() => {
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                setCurrentStep(steps[stepIndex]);
                setProgress((stepIndex + 1) / steps.length * 100);
                stepIndex++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 1000);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <div style={{
                textAlign: 'center',
                color: '#00ff88',
                marginBottom: '40px'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '20px',
                    textShadow: '0 0 20px #00ff88',
                    letterSpacing: '2px'
                }}>
                    Λ_OS v15
                </h1>
                <div style={{
                    fontSize: '1.2rem',
                    opacity: 0.8,
                    minHeight: '30px'
                }}>
                    {currentStep}
                </div>
            </div>

            <div style={{
                width: '400px',
                height: '4px',
                background: 'rgba(0, 255, 136, 0.2)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '20px'
            }}>
                <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00ff88, #00ccff)',
                    width: `${progress}%`,
                    transition: 'width 0.8s ease-out',
                    boxShadow: '0 0 10px #00ff88'
                }} />
            </div>

            <div style={{
                fontSize: '0.9rem',
                color: '#00ccff',
                opacity: 0.7
            }}>
                {Math.round(progress)}% Complete
            </div>

            <div style={{
                position: 'absolute',
                bottom: '40px',
                textAlign: 'center',
                color: '#666',
                fontSize: '0.8rem'
            }}>
                <div>k·k = 0 | {`{△,□,○}`} | H_null ∈ L²(PT⁺)</div>
                <div style={{ marginTop: '5px' }}>Null-Line OS | Quantum Memory | ADE Classification</div>
            </div>
        </div>
    );
};