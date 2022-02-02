const webpack = require('webpack');
const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRootPath = path.resolve('.');
const createAddonsLoader = require('../create-addons-loader');
const lessPlugin = require('../webpack-less-plugin');

const createConfig = require('../node_modules/razzle/config/createConfigAsync.js');
const razzleConfig = require(path.join(projectRootPath, 'razzle.config.js'));

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
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    let baseConfig;
    baseConfig = await createConfig(
      'node',
      'prod',
      {
        // clearConsole: false,
        modifyWebpackConfig: razzleConfig.modifyWebpackConfig,
      },
      webpack,
      // undefined,
      // undefined,
      // undefined,
      // razzleConfig.plugins.map((o) => [o.object, {}]),
      // undefined,
    );
    const AddonConfigurationRegistry = require('../addon-registry');

    const registry = new AddonConfigurationRegistry(projectRootPath);

    config = lessPlugin({ registry }).modifyWebpackConfig({
      env: { target: 'node', dev: false},
      webpackConfig: config,
      webpackObject: webpack,
      options: {},
    });

    // putting SVG loader on top, fix the fileloader manually (Volto plugin does not
    // work) since it needs to go first
    config.module.rules.unshift(SVGLOADER);
    const fileLoader = config.module.rules.find(fileLoaderFinder);
    fileLoader.exclude = [/\.(config|variables|overrides)$/, /icons\/.*\.svg$/];

    config.plugins.unshift(
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __CLIENT__: true,
        __SERVER__: false,
      }),
    );

    const razzleOptions = {
      cssPrefix: 'cssPrefix',
    };
    const experimental = {};

    const miniPlugin = new MiniCssExtractPlugin({
      filename: `${razzleOptions.cssPrefix}/bundle.[${
              experimental.newContentHash ? 'contenthash' : 'chunkhash'
            }:8].css`,
      chunkFilename: `${razzleOptions.cssPrefix}/[name].[${
              experimental.newContentHash ? 'contenthash' : 'chunkhash'
            }:8].chunk.css`,
    });

    config.plugins.unshift(miniPlugin);


    const resultConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: { ...config.resolve.alias, ...baseConfig.resolve.alias },
      },
    };

    // console.dir(resultConfig, { depth: null });

    return resultConfig;
  },
  babel: async (options) => {
    return {
      ...options,
      plugins: [
        ...options.plugins,
        [
          './node_modules/babel-plugin-root-import/build/index.js',
          {
            rootPathSuffix: './src',
          },
        ],
      ],
      // any extra options you want to set
    };
  },
};
