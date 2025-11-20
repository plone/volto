import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { svgLoader } from '@plone/volto/vite-plugins/svg.mjs';

const plateDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(__dirname, '../../../../');

const storybookGlobalsPath = path.resolve(plateDir, '.storybook/globals.less');

const config: StorybookConfig = {
  // For some reason the property does not allow negation
  // https://github.com/storybookjs/storybook/issues/11181#issuecomment-1535288804
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: () => true,
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
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
        tsconfigPaths({
          projects: [path.resolve(plateDir, 'tsconfig.json')],
        }),
      ],
      resolve: {
        alias: [
          {
            find: '@plone/volto-slate',
            replacement: path.resolve(
              plateDir,
              'node_modules/@plone/volto-slate/src',
            ),
          },
          {
            find: '@plone/volto',
            replacement: path.resolve(
              repoRoot,
              'node_modules/@plone/volto/src',
            ),
          },
          {
            find: '@root',
            replacement: path.resolve(
              repoRoot,
              'node_modules/@plone/volto/src',
            ),
          },
          {
            find: 'globals.less',
            replacement: storybookGlobalsPath,
          },
        ],
      },
      define: {
        __CLIENT__: true,
      },
      build: {
        minify: false,
      },
      server: {
        fs: {
          allow: ['..', path.resolve(__dirname, '../../../../core/packages')],
        },
      },
    });
  },
};
export default config;
