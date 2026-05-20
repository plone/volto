import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PloneSVGRVitePlugin } from './vite-plugin-svgr';

export default defineConfig({
  plugins: [tailwindcss(), PloneSVGRVitePlugin(), react()],
  resolve: {
    tsconfigPaths: true,
  },
});
