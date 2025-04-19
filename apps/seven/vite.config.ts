import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, PluginOption } from 'vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';
import { PloneSVGRVitePlugin } from '@plone/components/vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

const prodServerName =
  process.env.PLONE_API_PATH && process.env.PLONE_API_PATH.startsWith('https')
    ? process.env.PLONE_API_PATH
    : '';

export default defineConfig({
  plugins: [
    PloneSVGRVitePlugin() as PluginOption[],
    PloneRegistryVitePlugin(),
    tailwindcss(),
    reactRouterDevTools(),
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['katex', '@udecode/plate-math', 'react-tweet'],
  },
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up to the project root
      // (required by the Cookieplone setup)
      allow: ['../../../.'],
    },
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
