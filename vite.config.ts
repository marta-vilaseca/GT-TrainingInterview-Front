// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createServer } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [
          // ...
        ],
      },
    },
  },
});
