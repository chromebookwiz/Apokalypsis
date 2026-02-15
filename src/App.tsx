import { } from 'react';
import { MainScene } from './views/MainScene';
import { UIOverlay } from './components/UIOverlay';
import { useSceneController } from './controllers/SceneController';

function App() {
    const controller = useSceneController();



    return (
        <>
            <MainScene controller={controller} />
            <UIOverlay controller={controller} />
        </>
    );
}

export default App;
