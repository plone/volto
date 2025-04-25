import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { svgLoader } from './vite-plugins/svg.js';

export default defineConfig({
  plugins: [
    react(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    }) as any,
  ],
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, 'src'),
      '@plone/volto-slate': path.resolve(__dirname, '../volto-slate/src'),
      '@root': path.resolve(__dirname, 'src'),
      'promise-file-reader': require.resolve('promise-file-reader'),
      'react-dropzone': require.resolve('react-dropzone'),
      'prop-types': require.resolve('prop-types'),
    },
  },
  test: {
    isolate: true,
    deps: {
      moduleDirectories: ['node_modules'],
    },
    snapshotFormat: { printBasicPrototype: false },
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './test-setup-globals-vitest.js',
      './test-setup-config.jsx',
      './jest-setup-afterenv.js',
      './jest-addons-loader.js',
    ],
    globalSetup: './global-test-setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
        '__test__/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      exclude: [
        'node_modules/**',
        '**/dist/**',
        '**/*.config.{js,ts}',
        '**/jest-*.js',
      ],
    },
    css: true,
  },
});
