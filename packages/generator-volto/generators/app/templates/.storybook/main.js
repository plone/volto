const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');

const projectRootPath = path.resolve('.');
const lessPlugin = require('@plone/volto/webpack-plugins/webpack-less-plugin');

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

const defaultRazzleOptions = {
  verbose: false,
  debug: {},
  buildType: 'iso',
  cssPrefix: 'static/css',
  jsPrefix: 'static/js',
  enableSourceMaps: true,
  enableReactRefresh: true,
  enableTargetBabelrc: false,
  enableBabelCache: true,
  forceRuntimeEnvVars: [],
  mediaPrefix: 'static/media',
  staticCssInDev: false,
  emitOnErrors: false,
  disableWebpackbar: false,
  browserslist: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie 11',
    'not dead',
  ],
};

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/preset-scss',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    let baseConfig;
    baseConfig = await createConfig(
      'web',
      'dev',
      {
        // clearConsole: false,
        modifyWebpackConfig: razzleConfig.modifyWebpackConfig,
        plugins: razzleConfig.plugins,
      },
      webpack,
      false,
      undefined,
      [],
      defaultRazzleOptions,
    );
    const AddonConfigurationRegistry = require('@plone/volto/addon-registry');

    const registry = new AddonConfigurationRegistry(projectRootPath);

    config = lessPlugin({ registry }).modifyWebpackConfig({
      env: { target: 'web', dev: 'dev' },
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

    const resultConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: { ...config.resolve.alias, ...baseConfig.resolve.alias },
      },
    };

    // Addons have to be loaded with babel
    const addonPaths = registry.addonNames.map((addon) =>
      fs.realpathSync(registry.packages[addon].modulePath),
    );
    resultConfig.module.rules[1].exclude = (input) =>
      // exclude every input from node_modules except from @plone/volto
      /node_modules\/(?!(@plone\/volto)\/)/.test(input) &&
      // If input is in an addon, DON'T exclude it
      !addonPaths.some((p) => input.includes(p));

    const addonExtenders = registry.getAddonExtenders().map((m) => require(m));

    const extendedConfig = addonExtenders.reduce(
      (acc, extender) =>
        extender.modify(acc, { target: 'web', dev: 'dev' }, config),
      resultConfig,
    );

    // Note: we don't actually support razzle plugins, which are also a feature
    // of the razzle.extend.js addons file. Those features are probably
    // provided in a different manner by Storybook plugins (for example scss
    // loaders).

    return extendedConfig;
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
