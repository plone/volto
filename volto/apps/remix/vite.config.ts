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
      routes: async (defineRoutes) => {
        // If you need to do async work, do it before calling `defineRoutes`, we use
        // the call stack of `route` inside to set nesting.

        return defineRoutes((route) => {
          route('/', 'content.tsx', { id: 'index' });
          route('*', 'content.tsx', { id: 'splat' });
          // A common use for this is catchall routes.
          // - The first argument is the React Router path to match against
          // - The second is the relative filename of the route handler
          // route("/some/path/*", "catchall.tsx");

          // if you want to nest routes, use the optional callback argument
          // route("some/:path", "some/route/file.js", () => {
          //   // - path is relative to parent path
          //   // - filenames are still relative to the app directory
          //   route("relative/path", "some/other/file");
          // });
        });
      },
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
