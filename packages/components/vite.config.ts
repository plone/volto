import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PloneSVGRVitePlugin } from './vite-plugin-svgr';

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), PloneSVGRVitePlugin(), react()],
  css: {
    transformer: 'lightningcss',
  },
});
