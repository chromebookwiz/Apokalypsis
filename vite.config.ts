import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'import.meta.env.CUBEKEY_API_KEY': JSON.stringify(process.env.CUBEKEY_API_KEY || ''),
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'three-core': ['three'],
                    'three-fiber': ['@react-three/fiber', '@react-three/drei'],
                    'three-postprocessing': ['@react-three/postprocessing'],
                    'animation-vendor': ['framer-motion'],
                    'analytics': ['@vercel/analytics']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
})
