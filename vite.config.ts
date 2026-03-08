import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {},

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'three-core': ['three'],
                    'three-fiber': ['@react-three/fiber', '@react-three/drei'],
                    'three-postprocessing': ['@react-three/postprocessing'],
                    'animation-vendor': ['framer-motion']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
})
