import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '^/\\+\\+api\\+\\+($$|/.*)': {
        target:
          'http://localhost:8080/VirtualHostBase/http/localhost:3000/Plone/++api++/VirtualHostRoot',
        rewrite: (path) => {
          console.log(path);
          return path.replace('/++api++', '');
        },
      },
    },
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    PloneRegistryVitePlugin(),
  ],
});
