const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');

const path = require('path');
const projectRootPath = path.resolve('.');
const createAddonsLoader = require('../create-addons-loader');

const SVGLOADER = {
  test: /icons\/.*\.svg$/,
  use: [
    {
      loader: 'svg-loader',
    },
    {
      loader: 'svgo-loader',
      options: {
        plugins: [
          { removeTitle: true },
          { convertPathData: false },
          { removeUselessStrokeAndFill: true },
          { removeViewBox: false },
        ],
      },
    },
  ],
};

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  // webpackFinal: config => console.dir(config, { depth: null }) || config,
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(SVGLOADER);
    const fileLoader = config.module.rules.find(fileLoaderFinder);
    fileLoader.exclude = [/\.(config|variables|overrides)$/, /icons\/.*\.svg$/];

    const packageJson = require(path.join(projectRootPath, 'package.json'));
    const addonsLoaderPath = createAddonsLoader(packageJson.addons || []);

    config.resolve.alias = {
      ...config.resolve.alias,
      'load-volto-addons': addonsLoaderPath,
      '@plone/volto': `${projectRootPath}/src`,
    };
    // Return the altered config
    return config;
  },
  babel: async (options) => {
    console.log(options.plugins);
    return {
      ...options,
      plugins: [
        ...options.plugins,
        [
          '/Users/sneridagh/Development/plone/volto/node_modules/babel-plugin-root-import/build/index.js',
          {
            rootPathSuffix: './src',
          },
        ],
      ],
      // any extra options you want to set
    };
  },
};
