import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PloneSVGRVitePlugin } from '@plone/components/vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    PloneSVGRVitePlugin() as PluginOption,
    react(),
  ],
  css: {
    transformer: 'lightningcss',
  },
});
