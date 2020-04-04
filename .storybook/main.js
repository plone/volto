const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');

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
  stories: ['../src/**/*.stories.mdx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-viewport/register'],
  // webpackFinal: config => console.dir(config, { depth: null }) || config,
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(SVGLOADER);
    const fileLoader = config.module.rules.find(fileLoaderFinder);
    console.log(fileLoader);
    fileLoader.exclude = [/\.(config|variables|overrides)$/, /icons\/.*\.svg$/];

    // Return the altered config
    return config;
  },
};
