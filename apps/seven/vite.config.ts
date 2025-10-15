import { unstable_reactRouterRSC as reactRouterRSC } from '@react-router/dev/vite';
import rsc from '@vitejs/plugin-rsc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';
import { PloneSVGRVitePlugin } from '@plone/components/vite-plugin-svgr';
import babel from 'vite-plugin-babel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    PloneSVGRVitePlugin(),
    PloneRegistryVitePlugin(),
    tailwindcss(),
    reactRouterDevTools(),
    reactRouterRSC(),
    rsc(),
    babel({
      filter: /app\/.*\.tsx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up to the project root
      // (required by the Cookieplone setup)
      allow: ['../../../.'],
    },
  },
});
