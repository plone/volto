const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
const postcssLoadConfig = require('postcss-load-config');

const hasPostCssConfig = () => {
  try {
    return !!postcssLoadConfig.sync();
  } catch (_error) {
    return false;
  }
};

const defaultOptions = {
  postcss: {
    development: {
      sourceMap: true,
      ident: 'postcss',
    },
    production: {
      sourceMap: false,
      ident: 'postcss',
    },
    plugins: [
      PostCssFlexBugFixes,
      autoprefixer({
        flexbox: 'no-2009',
      }),
    ],
  },
  less: {
    development: {
      sourceMap: true,
    },
    production: {
      sourceMap: true,
    },
  },
  css: {
    development: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        auto: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    production: {
      sourceMap: false,
      importLoaders: 1,
      modules: {
        auto: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
  },
  style: {},
};

module.exports = (config) => {
  const options = defaultOptions;
  const constantEnv = config.mode; // development
  const dev = constantEnv === 'development';
  const isServer = false;

  const styleLoader = {
    loader: require.resolve('style-loader'),
    options: options.style,
  };

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: options.css[constantEnv],
  };

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
        path.resolve('./src'),
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
            lessLoader,
          ],
    },
  ];

  return config;
};
