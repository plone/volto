import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, PluginOption } from 'vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';
import { PloneSVGRVitePlugin } from '@plone/components/vite-plugin-svgr';
import babel from 'vite-plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ isSsrBuild }) => {
  const analyze = process.env.ANALYZE === 'true';
  const target = isSsrBuild ? 'server' : 'client';

  return {
    plugins: [
      PloneSVGRVitePlugin(),
      PloneRegistryVitePlugin(),
      tailwindcss(),
      reactRouterDevTools(),
      reactRouter(),
      babel({
        filter: /app\/.*\.tsx?$/,
        babelConfig: {
          presets: ['@babel/preset-typescript'],
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      tsconfigPaths(),
      ...(analyze
        ? [
            visualizer({
              filename: `stats-${target}.html`,
              template: 'treemap',
              gzipSize: true,
              brotliSize: true,
            }),
            visualizer({
              filename: `stats-${target}.json`,
              template: 'raw-data',
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ] as PluginOption[],
    server: {
      port: 3000,
      fs: {
        // Allow serving files from one level up to the project root
        // (required by the Cookieplone setup)
        allow: ['../../../.'],
      },
    },
  };
});
