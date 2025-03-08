import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { PloneSVGRVitePlugin } from './vite-plugin-svgr';

export default defineConfig({
  plugins: [PloneSVGRVitePlugin(), react()],
  css: {
    transformer: 'lightningcss',
  },
});
