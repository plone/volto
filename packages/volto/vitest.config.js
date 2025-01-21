import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, 'src'),
      '@plone/volto-slate': path.resolve(__dirname, '../volto-slate/src'),
      '@root': path.resolve(__dirname, 'src'),
      '@plone/registry/addon-registry': path.resolve(
        __dirname,
        'src/registry.js',
      ),
    },
  },
  test: {
    snapshotFormat: { printBasicPrototype: false },
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './test-setup-globals.js',
      './test-setup-config.jsx',
      './jest-setup-afterenv.js',
    ],
    globalSetup: './global-test-setup.js',
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      '__test__/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      exclude: [
        'node_modules/**',
        '**/dist/**',
        '**/*.config.{js,ts}',
        '**/jest-*.js',
      ],
    },
    css: true,
    transform: {
      '\\.svg$': {
        transform: 'vite-plugin-svgr',
      },
    },
  },
});
