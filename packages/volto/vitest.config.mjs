import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { svgLoader } from './vite-plugins/svg.mjs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);

export default defineConfig({
  plugins: [
    react(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                convertPathData: false,
                removeViewBox: false,
              },
            },
          },
          'removeTitle',
          'removeUselessStrokeAndFill',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, 'src'),
      '@plone/volto-slate': path.resolve(__dirname, '../volto-slate/src'),
      '@root': path.resolve(__dirname, 'src'),
      '@plone/components': path.resolve(__dirname, '../components/src'),
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
      `${projectRoot}/test-setup-globals.js`,
      `${projectRoot}/test-setup-config.jsx`,
      `${projectRoot}/test-addons-loader.js`,
      `${projectRoot}/global-test-setup.js`
    ],
    globalSetup: `${projectRoot}/global-test-setup.js`,
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
      ],
    },
    css: true,
  },
});
