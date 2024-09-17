import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import AddonConfigurationRegistry from '@plone/registry/src/addon-registry';
import createAddonsLoader from '@plone/registry/src/create-addons-loader';

const projectRootPath = path.resolve('.');
const registry = new AddonConfigurationRegistry(projectRootPath);

const addonsLoaderPath = createAddonsLoader(
  registry.getAddonDependencies(),
  registry.getAddons(),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  server: {
    port: 3000,
    proxy: {
      '/++api++/': 'http://localhost:8080/Plone',
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: '@plone/volto/config',
        replacement: path.resolve(__dirname, './src/config'),
      },
      { find: '@plone/volto', replacement: path.resolve(__dirname, './src/') },
      { find: '@root', replacement: path.resolve(__dirname, './src/') },
      {
        find: '@root/../themes',
        replacement: path.resolve(__dirname, './theme/'),
      },
      {
        find: '@plone/volto-slate',
        replacement: path.resolve(__dirname, '../volto-slate/src/'),
      },
      {
        find: '../../theme.config',
        replacement: path.resolve(__dirname, './theme/theme.config'),
      },
      { find: 'load-volto-addons', replacement: addonsLoaderPath },
      {
        find: 'volto-themes',
        replacement: path.resolve(__dirname, './theme/themes'),
      },
      // This is needed to make lodash work with Vite as lodash-es is full ESM
      {
        find: 'lodash',
        replacement: 'lodash-es',
      },
    ],
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
  },
  ssr: {
    // optimizeDeps: {
    //   include: ['lodash', 'lodash-es'],
    // },
    // external: ['lodash', 'semantic-ui-react'],
    noExternal: ['use-deep-compare-effect'],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});
