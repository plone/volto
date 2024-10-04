import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VoltoVitePlugin } from './vite-plugins/volto';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VoltoVitePlugin(),
    nodePolyfills(),
    react(),
    (() => {
      return {
        name: 'debug',
        enforce: 'post',
        configResolved: (resolvedConfig) => {
          console.log(resolvedConfig.resolve.alias);
        },
      };
    })(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/++api++/':
        'http://localhost:8080/VirtualHostBase/http/localhost:3000/Plone/++api++/VirtualHostRoot',
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
  },
});
