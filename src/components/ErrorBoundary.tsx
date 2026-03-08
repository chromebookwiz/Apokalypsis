import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Apokalypsis OS Error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'linear-gradient(135deg, #1a0000 0%, #330000 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    fontFamily: '"JetBrains Mono", monospace',
                    color: '#ff4444',
                    padding: '20px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '800px'
                    }}>
                        <h1 style={{
                            fontSize: '2.5rem',
                            marginBottom: '20px',
                            textShadow: '0 0 20px #ff4444'
                        }}>
                            Λ_OS ERROR
                        </h1>

                        <div style={{
                            background: 'rgba(255, 68, 68, 0.1)',
                            border: '1px solid #ff4444',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            fontSize: '1rem',
                            textAlign: 'left'
                        }}>
                            <strong>Critical System Error:</strong><br />
                            {this.state.error?.message || 'Unknown error occurred'}
                        </div>

                        <div style={{
                            fontSize: '0.9rem',
                            opacity: 0.8,
                            marginBottom: '30px'
                        }}>
                            The Null-Line OS has encountered a critical error. This may be due to:
                            <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                                <li>Memory corruption in quantum state</li>
                                <li>ADE classification instability</li>
                                <li>Twistor space coordinate overflow</li>
                                <li>Agent system deadlock</li>
                            </ul>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                background: 'linear-gradient(45deg, #ff4444, #ff8844)',
                                border: 'none',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 68, 68, 0.3)';
                            }}
                        >
                            🔄 Reinitialize System
                        </button>

                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            fontSize: '0.7rem',
                            opacity: 0.5
                        }}>
                            Null-Line OS v15 | Error Recovery Protocol
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}