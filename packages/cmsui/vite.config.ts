import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PloneSVGRVitePlugin } from '@plone/components/vite-plugin-svgr';

export default defineConfig({
  plugins: [tailwindcss(), PloneSVGRVitePlugin() as PluginOption, react()],
  css: {
    transformer: 'lightningcss',
  },
  resolve: {
    tsconfigPaths: true,
  },
});
