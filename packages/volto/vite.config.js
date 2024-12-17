import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VoltoVitePlugin } from './vite-plugins/volto';

// TODO: improve deployment settings
const prodServerName =
  process.env.PLONE_API_PATH && process.env.PLONE_API_PATH.startsWith('https')
    ? process.env.PLONE_API_PATH
    : '';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VoltoVitePlugin(), nodePolyfills(), react()],
  server: {
    port: 3000,
    proxy: {
      '^/\\+\\+api\\+\\+($$|/.*)': {
        target: prodServerName
          ? prodServerName
          : 'http://localhost:8080/VirtualHostBase/http/localhost:3000/Plone/++api++/VirtualHostRoot',
        ...(prodServerName && {
          changeOrigin: true,
          secure: false,
        }),
        rewrite: (path) => {
          console.log(path);
          return path.replace('/++api++', '');
        },
      },
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
