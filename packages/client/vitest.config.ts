import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTesting.ts',
    fileParallelism: false,
    pool: 'forks',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    environmentOptions: {
      jsdom: {
        /*
          We need to set the url parameter below to the url of the API server
          to avoid CORS issue.

          This is because JSDom environment sets the
          origin header (axios cannot control it on its own, just like in a
          browser) automatically to the url specified here.

          If this url is not provided then vitest sets the default value as
          localhost:3000 which causes CORS error with the test server.
        */
        url: 'http://localhost:55001',
      },
    },
  },
});
