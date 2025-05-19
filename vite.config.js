import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      exportAs: 'named',
    }),
    react()
  ],
  build:{
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'image-builder.js',
        chunkFileNames: '[name].js',
        assetFileNames: 'image-builder.[ext]',
      },
    },
  }
})
