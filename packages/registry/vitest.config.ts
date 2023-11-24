import { defineConfig } from 'vitest/config';
import { test, it } from 'vitest';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './setupTesting.ts',
    exclude: ['**/node_modules/**', '**/lib/**'],
  },
});
