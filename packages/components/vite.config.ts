import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { PloneSGVRVitePlugin } from './vite-plugin-sgvr';

export default defineConfig({
  plugins: [PloneSGVRVitePlugin(), react()],
  css: {
    transformer: 'lightningcss',
  },
});
