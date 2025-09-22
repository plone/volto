import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  // For some reason the property does not allow negation
  // https://github.com/storybookjs/storybook/issues/11181#issuecomment-1535288804
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  features: {
    actions: false, // 👈 disable the actions feature
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['./public'],
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: (prop) => {
        // In production (storybook build), keep all props so docs are complete
        if (process.env.NODE_ENV === 'production') return true;

        // In dev mode, skip RAC/node_modules props to keep it snappy
        if (!prop.parent || !prop.parent.fileName) return true;
        const file = prop.parent.fileName;
        return (
          /packages[\\/]components[\\/]src/.test(file) &&
          !/node_modules/.test(file)
        );
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      build: {
        minify: false,
      },
    });
  },
};
export default config;
