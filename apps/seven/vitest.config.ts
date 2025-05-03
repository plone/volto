import { coverageConfigDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    // css: true,
    exclude: ['**/node_modules/**', '**/lib/**'],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        'packages/**',
        'build/**',
        '*.config.ts',
        'registry.loader.js',
        'app/entry.server.tsx',
        'app/entry.client.tsx',
        'app/i18next.server.ts',
        'app/i18n.ts',
        'app/routes.ts',
      ],
    },
  },
});
