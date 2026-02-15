import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { MainScene } from './views/MainScene';
import { UIOverlay } from './components/UIOverlay';
import { useSceneController } from './controllers/SceneController';

export default function App() {
    const controller = useSceneController();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <MainScene controller={controller} />
            <UIOverlay controller={controller} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
});
