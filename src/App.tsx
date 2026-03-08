import { useState } from 'react';
import { MainScene } from './views/MainScene';
import { UIOverlay } from './components/UIOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSceneController } from './controllers/SceneController';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const controller = useSceneController();

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    return (
        <ErrorBoundary>
            <MainScene controller={controller} />
            <UIOverlay controller={controller} />
        </ErrorBoundary>
    );
}

export default App;
