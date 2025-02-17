import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';
// import { reactRouterDevTools } from 'react-router-devtools';

const prodServerName =
  process.env.PLONE_API_PATH && process.env.PLONE_API_PATH.startsWith('https')
    ? process.env.PLONE_API_PATH
    : '';

export default defineConfig({
  plugins: [
    PloneRegistryVitePlugin(),
    tailwindcss(),
    // reactRouterDevTools({ position: 'bottom-left' }),
    reactRouter(),
    tsconfigPaths(),
  ],
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
          console.log('rewritten path', path);
          return path.replace('/++api++', '');
        },
      },
    },
  },
});
