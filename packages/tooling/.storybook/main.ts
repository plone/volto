import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  // For some reason the property does not allow negation
  // https://github.com/storybookjs/storybook/issues/11181#issuecomment-1535288804
  stories: ['../../../stories/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: {
    components: {
      title: '@plone/components',
      url: 'https://plone-components.readthedocs.io/latest/',
      expanded: true, // Optional, true by default,
    },
    // componentsTailwind: {
    //   title: '@plone/components Tailwind',
    //   url: 'http://localhost:6002',
    // },
    // slots: {
    //   title: '@plone/slots',
    //   url: 'http://localhost:6003',
    // },
    // publicui: {
    //   title: '@plone/publicui',
    //   url: 'http://localhost:6004',
    // },
    // cmsui: {
    //   title: '@plone/cmsui',
    //   url: 'http://localhost:6005',
    // },
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
      plugins: [],
      build: {
        minify: false,
      },
    });
  },
};
export default config;
