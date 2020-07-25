const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
// const paths = require('razzle/config/paths');
const path = require('path');
const postcssLoadConfig = require('postcss-load-config');

// const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
// const cssLoaderFinder = makeLoaderFinder('css-loader');
// const postCssLoaderFinder = makeLoaderFinder('postcss-loader');
// const resolveUrlLoaderFinder = makeLoaderFinder('resolve-url-loader');
// const lessLoaderFinder = makeLoaderFinder('less-loader');
// const styleLoaderFinder = makeLoaderFinder('style-loader');
// module.exports = {
//   cssLoaderFinder,
//   postCssLoaderFinder,
//   resolveUrlLoaderFinder,
//   lessLoaderFinder,
//   styleLoaderFinder,
// };

const hasPostCssConfig = () => {
  try {
    return !!postcssLoadConfig.sync();
  } catch (_error) {
    return false;
  }
};

const defaultOptions = {
  postcss: {
    dev: {
      sourceMap: true,
      ident: 'postcss',
    },
    prod: {
      sourceMap: false,
      ident: 'postcss',
    },
    plugins: [
      PostCssFlexBugFixes,
      autoprefixer({
        // browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
  less: {
    dev: {
      sourceMap: true,
      // includePaths: [paths.appNodeModules],
    },
    prod: {
      // XXX Source maps are required for the resolve-url-loader to properly
      // function. Disable them in later stages if you do not want source maps.
      sourceMap: true,
      // sourceMapContents: false,
      // includePaths: [paths.appNodeModules],
    },
  },
  css: {
    dev: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        auto: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    prod: {
      sourceMap: false,
      importLoaders: 1,
      modules: {
        auto: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
  },
  style: {},
  resolveUrl: {
    dev: {},
    prod: {},
  },
};

module.exports = (
  defaultConfig,
  { target, dev },
  webpack,
  userOptions = {},
) => {
  const isServer = target !== 'web';
  const constantEnv = dev ? 'dev' : 'prod';

  const config = Object.assign({}, defaultConfig);

  const options = Object.assign({}, defaultOptions, userOptions);

  const styleLoader = {
    loader: require.resolve('style-loader'),
    options: options.style,
  };

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: options.css[constantEnv],
  };

  // const resolveUrlLoader = {
  //   loader: require.resolve('resolve-url-loader'),
  //   options: options.resolveUrl[constantEnv],
  // };

  const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: hasPostCssConfig()
      ? undefined
      : Object.assign({}, options.postcss[constantEnv], {
          plugins: () => options.postcss.plugins,
        }),
  };

  const lessLoader = {
    loader: require.resolve('less-loader'),
    options: Object.assign({}, options.less[constantEnv]),
  };

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.less$/,
      include: [
        path.resolve('./theme'),
        /node_modules\/@plone\/volto\/theme/,
        /plone\.volto\/theme/,
        /node_modules\/semantic-ui-less/,
      ],
      use: isServer
        ? [
            {
              loader: require.resolve('css-loader'),
              options: Object.assign({}, options.css[constantEnv], {
                onlyLocals: true,
              }),
            },
            // resolveUrlLoader,
            postCssLoader,
            lessLoader,
          ]
        : [
            dev ? styleLoader : MiniCssExtractPlugin.loader,
            cssLoader,
            postCssLoader,
            // resolveUrlLoader,
            lessLoader,
          ],
    },
  ];

  return config;
};
