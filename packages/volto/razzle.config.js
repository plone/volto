/* eslint no-console: 0 */
const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const fs = require('fs');
const RootResolverPlugin = require('./webpack-plugins/webpack-root-resolver');
const RelativeResolverPlugin = require('./webpack-plugins/webpack-relative-resolver');
const { poToJson } = require('@plone/scripts/i18n.cjs');
const createAddonsLoader = require('@plone/registry/src/create-addons-loader');
const createThemeAddonsLoader = require('@plone/registry/src/create-theme-addons-loader');
const AddonConfigurationRegistry = require('@plone/registry/src/addon-registry');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const AfterBuildPlugin = require('@fiverr/afterbuild-webpack-plugin');

const fileLoaderFinder = makeLoaderFinder('file-loader');

const projectRootPath = path.resolve('.');
const languages = require('./src/constants/Languages.cjs');

const packageJson = require(path.join(projectRootPath, 'package.json'));

const registry = new AddonConfigurationRegistry(projectRootPath);

const defaultModify = ({
  env: { target, dev },
  webpackConfig: config,
  webpackObject: webpack,
  options,
  paths,
}) => {
  // Compile language JSON files from po files
  poToJson({ registry, addonMode: false });

  if (dev) {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
      }),
    );
  } else {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        __DEVELOPMENT__: false,
      }),
    );
  }

  if (target === 'web') {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
      }),
    );

    config.plugins.push(
      new LoadablePlugin({
        outputAsset: false,
        writeToDisk: { filename: path.resolve(`${projectRootPath}/build`) },
      }),
    );

    if (dev && process.env.DEBUG_CIRCULAR) {
      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          // `onStart` is called before the cycle detection starts
          onStart({ compilation }) {
            console.log('start detecting webpack modules cycles');
          },
          failOnError: false,
          // `onDetected` is called for each module that is cyclical
          onDetected({ module: webpackModuleRecord, paths, compilation }) {
            // `paths` will be an Array of the relative module paths that make up the cycle
            // `module` will be the module record generated by webpack that caused the cycle
            compilation.warnings.push(new Error(paths.join(' -> ')));
          },
          // `onEnd` is called before the cycle detection ends
          onEnd({ compilation }) {
            console.log(
              `Detected ${compilation.warnings.length} circular dependencies`,
            );
            compilation.warnings.forEach((item) => {
              if (item.message.includes('config')) {
                console.log(item.message);
              }
            });
          },
        }),
      );
    }

    config.output.filename = dev
      ? 'static/js/[name].js'
      : 'static/js/[name].[chunkhash:8].js';

    config.optimization = Object.assign({}, config.optimization, {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // We reset the default values set by webpack
          // So the chunks have all proper names (no random numbers)
          // The CSS gets bundled in one CSS chunk and it's consistent with
          // the `style-loader` load order, so no difference between
          // local (project CSS) and `node_modules` ones.
          default: false,
          defaultVendors: false,
        },
      },
    });

    // This is needed to override Razzle use of the unmaintained CleanCSS
    // which does not have support for recently CSS features (container queries).
    // Using the default provided (cssnano) by css-minimizer-webpack-plugin
    // should be enough see:
    // (https://github.com/clean-css/clean-css/discussions/1209)
    delete options.webpackOptions.terserPluginOptions?.sourceMap;
    if (!dev) {
      config.optimization = Object.assign({}, config.optimization, {
        minimizer: [
          new TerserPlugin(options.webpackOptions.terserPluginOptions),
          new CssMinimizerPlugin({
            sourceMap: options.razzleOptions.enableSourceMaps,
            minimizerOptions: {
              sourceMap: options.razzleOptions.enableSourceMaps,
            },
          }),
        ],
      });
    }

    config.plugins.unshift(
      // restrict moment.js locales to supported languages
      // see https://momentjs.com/docs/#/use-it/webpack/ for details
      new MomentLocalesPlugin({ localesToKeep: Object.keys(languages) }),
      new LodashModuleReplacementPlugin({
        shorthands: true,
        cloning: true,
        currying: true,
        caching: true,
        collections: true,
        exotics: true,
        guards: true,
        metadata: true,
        deburring: true,
        unicode: true,
        chaining: true,
        memoizing: true,
        coercions: true,
        flattening: true,
        paths: true,
        placeholders: true,
      }),
    );

    // This copies the publicPath files set in voltoConfigJS with the local `public`
    // directory at build time
    config.plugins.push(
      new AfterBuildPlugin(() => {
        const mergeDirectories = (sourceDir, targetDir) => {
          const files = fs.readdirSync(sourceDir);
          files.forEach((file) => {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            const isDirectory = fs.statSync(sourcePath).isDirectory();
            if (isDirectory) {
              fs.mkdirSync(targetPath, { recursive: true });
              mergeDirectories(sourcePath, targetPath);
            } else {
              fs.copyFileSync(sourcePath, targetPath);
            }
          });
        };

        // If we are in development mode, we copy the public directory to the
        // public directory of the setup root, so the files are available
        if (dev && !registry.isVoltoProject && registry.addonNames.length > 0) {
          const devPublicPath = `${projectRootPath}/../../../public`;
          if (!fs.existsSync(devPublicPath)) {
            fs.mkdirSync(devPublicPath);
          }
          mergeDirectories(
            path.join(projectRootPath, 'public'),
            `${projectRootPath}/../../../public`,
          );
        }

        registry.getAddonDependencies().forEach((addonDep) => {
          // What comes from getAddonDependencies is in the form of `@package/addon:profile`
          const addon = addonDep.split(':')[0];
          // Check if the addon is available in the registry, just in case
          if (registry.packages[addon]) {
            const p = fs.realpathSync(
              `${registry.packages[addon].modulePath}/../.`,
            );
            if (fs.existsSync(path.join(p, 'public'))) {
              if (!dev) {
                mergeDirectories(path.join(p, 'public'), paths.appBuildPublic);
              }
              if (
                dev &&
                !registry.isVoltoProject &&
                registry.addonNames.length > 0
              ) {
                mergeDirectories(
                  path.join(p, 'public'),
                  `${projectRootPath}/../../../public`,
                );
              }
            }
          }
        });
      }),
    );
  }

  if (target === 'node') {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true,
      }),
    );

    // Make the TerserPlugin accept ESNext features, since we are in 2024
    // If this is not true, libraries already compiled for using only ESNext features
    // won't work (eg. using a chaining operator)
    config.optimization = Object.assign({}, config.optimization, {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 'ESNext' },
          },
        }),
      ],
    });

    // Razzle sets some of its basic env vars in the default config injecting them (for
    // the client use, mainly) in a `DefinePlugin` instance. However, this also ends in
    // the server build, removing the ability of the server node process to read from
    // the system's (or process') env vars. In this case, in the server build, we hunt
    // down the instance of the `DefinePlugin` defined by Razzle and remove the
    // `process.env.PORT` so it can be overridable in runtime
    const idxArr = config.plugins
      .map((plugin, idx) =>
        plugin.constructor.name === 'DefinePlugin' ? idx : '',
      )
      .filter(String);
    idxArr.forEach((index) => {
      const { definitions } = config.plugins[index];
      if (definitions['process.env.PORT']) {
        const newDefs = Object.assign({}, definitions);
        // Transforms the stock RAZZLE_PUBLIC_DIR into relative path,
        // so one can move the build around
        newDefs['process.env.RAZZLE_PUBLIC_DIR'] = newDefs[
          'process.env.RAZZLE_PUBLIC_DIR'
        ].replace(projectRootPath, '.');
        // Handles the PORT, so it takes the real PORT from the runtime environment var,
        // but keeps the one from build time, if different from 3000 (by not deleting it)
        // So build time one takes precedence, do not set it in build time if you want
        // to control it always via runtime (assuming 3000 === not set in build time)
        if (newDefs['process.env.PORT'] === '3000') {
          delete newDefs['process.env.PORT'];
        }
        config.plugins[index] = new webpack.DefinePlugin(newDefs);
      }
    });
  }

  // Don't load config|variables|overrides) files with file-loader
  // Don't load SVGs from ./src/icons with file-loader
  const fileLoader = config.module.rules.find(fileLoaderFinder);
  fileLoader.exclude = [
    /\.(config|variables|overrides)$/,
    /icons\/.*\.svg$/,
    ...fileLoader.exclude,
  ];

  let addonsFromEnvVar = [];
  if (process.env.ADDONS) {
    addonsFromEnvVar = process.env.ADDONS.split(';');
  }

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
  );

  config.resolve.plugins = [
    new RelativeResolverPlugin(registry),
    new RootResolverPlugin(),
  ];

  config.resolve.alias = {
    ...registry.getAddonCustomizationPaths(),
    ...registry.getAddonsFromEnvVarCustomizationPaths(),
    ...registry.getProjectCustomizationPaths(),
    ...config.resolve.alias,
    '../../theme.config$': `${projectRootPath}/theme/theme.config`,
    'volto-themes': `${registry.voltoPath}/theme/themes`,
    'load-volto-addons': addonsLoaderPath,
    ...registry.getResolveAliases(),
    '@plone/volto': `${registry.voltoPath}/src`,
    // to be able to reference path uncustomized by webpack
    '@plone/volto-original': `${registry.voltoPath}/src`,
    // be able to reference current package from customized package
    '@package': `${projectRootPath}/src`,
    '@root': `${projectRootPath}/src`,
    // we're incorporating redux-connect
    'redux-connect': `${registry.voltoPath}/src/helpers/AsyncConnect`,
    // avoids including lodash multiple times.
    // semantic-ui-react uses lodash-es, everything else uses lodash
    'lodash-es': path.dirname(require.resolve('lodash')),
  };

  const [addonsThemeLoaderVariablesPath, addonsThemeLoaderMainPath] =
    createThemeAddonsLoader(registry.getCustomThemeAddons());

  // Automatic Theme Loading
  if (registry.theme) {
    // The themes should be located in `src/theme`
    const themePath = registry.packages[registry.theme].modulePath;
    const themeConfigPath = `${themePath}/theme/theme.config`;
    config.resolve.alias['../../theme.config$'] = themeConfigPath;
    config.resolve.alias['../../theme.config'] = themeConfigPath;

    // We create an alias for each custom theme insertion point (variables, main)
    config.resolve.alias['addonsThemeCustomizationsVariables'] =
      addonsThemeLoaderVariablesPath;
    config.resolve.alias['addonsThemeCustomizationsMain'] =
      addonsThemeLoaderMainPath;
  }

  config.performance = {
    maxAssetSize: 10000000,
    maxEntrypointSize: 10000000,
  };

  let addonsAsExternals = [];

  const { include } = options.webpackOptions.babelRule;
  if (packageJson.name !== '@plone/volto') {
    include.push(fs.realpathSync(`${registry.voltoPath}/src`));
  }

  // Add babel support external (ie. node_modules npm published packages)
  const packagesNames = Object.keys(registry.packages);
  if (registry.packages && packagesNames.length > 0) {
    packagesNames.forEach((addon) => {
      const p = fs.realpathSync(registry.packages[addon].modulePath);
      if (include.indexOf(p) === -1) {
        include.push(p);
      }
    });
    addonsAsExternals = packagesNames.map((addon) => new RegExp(addon));
  }

  if (process.env.ADDONS) {
    addonsFromEnvVar.forEach((addon) => {
      const normalizedAddonName = addon.split(':')[0];
      const p = fs.realpathSync(
        registry.packages[normalizedAddonName].modulePath,
      );
      if (include.indexOf(p) === -1) {
        include.push(p);
      }
      addonsAsExternals = [
        ...addonsAsExternals,
        ...packagesNames.map(
          (normalizedAddonName) => new RegExp(normalizedAddonName),
        ),
      ];
    });
  }

  // write a .dot file with the graph
  // convert it to svg with: `dot addon-dependency-graph.dot -Tsvg -o out.svg`
  if (process.env.DEBUG_ADDONS_LOADER && target === 'node') {
    const addonsDepGraphPath = path.join(
      process.cwd(),
      'addon-dependency-graph.dot',
    );
    const graph = registry.getDotDependencyGraph();
    fs.writeFileSync(addonsDepGraphPath, new Buffer.from(graph));
  }

  config.externals =
    target === 'node'
      ? [
          nodeExternals({
            allowlist: [
              dev ? 'webpack/hot/poll?300' : null,
              /\.(eot|woff|woff2|ttf|otf)$/,
              /\.(svg|png|jpg|jpeg|gif|ico)$/,
              /\.(mp4|mp3|ogg|swf|webp)$/,
              /\.(css|scss|sass|sss|less)$/,
              // Add support for addons to include externals (ie. node_modules npm published packages)
              ...addonsAsExternals,
              /^@plone\/volto/,
              /^@plone\/components/,
              /^@plone\/client/,
              /^@plone\/providers/,
            ].filter(Boolean),
          }),
        ]
      : [];

  if (config.devServer) {
    config.devServer.static.watch.ignored = /node_modules\/(?!@plone\/volto)/;
    config.snapshot = {
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/](?!(@plone[\\/]volto))(@.+?[\\/])?.+?)[\\/]/,
      ],
    };
  }

  return config;
};

const addonExtenders = registry.getAddonExtenders().map((m) => require(m));

const defaultPlugins = [
  { object: require('./webpack-plugins/webpack-less-plugin')({ registry }) },
  { object: require('./webpack-plugins/webpack-svg-plugin') },
  { object: require('./webpack-plugins/webpack-bundle-analyze-plugin') },
  { object: require('./jest-extender-plugin') },
  'scss',
];

const plugins = addonExtenders.reduce(
  (acc, extender) => extender.plugins(acc),
  defaultPlugins,
);

module.exports = {
  plugins,
  modifyJestConfig: ({ jestConfig }) => {
    jestConfig.testEnvironment = 'jsdom';
    return jestConfig;
  },
  modifyWebpackConfig: ({
    env: { target, dev },
    webpackConfig,
    webpackObject,
    options,
    paths,
  }) => {
    const defaultConfig = defaultModify({
      env: { target, dev },
      webpackConfig,
      webpackObject,
      options,
      paths,
    });

    const res = addonExtenders.reduce(
      (acc, extender) => extender.modify(acc, { target, dev }, webpackConfig),
      defaultConfig,
    );
    return res;
  },
  options: {
    enableReactRefresh: true,
  },
};
