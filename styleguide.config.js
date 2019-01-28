const path = require('path');
const autoprefixer = require('autoprefixer');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const { fromPairs, map, mapValues } = require('lodash');
const glob = require('glob').sync;
const webpack = require('webpack');
const fileLoaderFinder = makeLoaderFinder('file-loader');
const eslintLoaderFinder = makeLoaderFinder('eslint-loader');

const projectRootPath = path.resolve('.');

const packageJson = require(path.join(projectRootPath, 'package.json'));

const BASE_CSS_LOADER = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
};

const POST_CSS_LOADER = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};

module.exports = {
  components: 'src/components/**/*.jsx',
  ignore: ['**/*.test.jsx', '**/Contents/Contents*jsx', '**/Tile/Tile.jsx'],
  verbose: true,
  title: 'Volto Style Guide',
  showCode: true,
  showUsage: true,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Theme',
      components: 'src/components/theme/**/*.jsx',
      content: 'docs/theme.md',
    },
    {
      name: 'Manage',
      components: 'src/components/manage/**/*.jsx',
      content: 'docs/manage.md',
    },
    {
      name: 'Mosaic',
      components: 'src/components/mosaic/**/*.jsx',
      content: 'docs/mosaic.md',
    },
  ],
  webpackConfig: Object.assign({},require('./node_modules/razzle/config/createConfig.js'),{
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        
          {
            exclude: [
              /\.html$/,
              /\.(js|jsx|mjs)$/,
              /\.(ts|tsx)$/,
              /\.(vue)$/,
              /\.(less)$/,
              /\.(re)$/,
              /\.(s?css|sass)$/,
              /\.json$/,
              /\.bmp$/,
              /\.gif$/,
              /\.jpe?g$/,
              /\.png$/,
              /\.(config|variables|overrides)$/,
      /icons\/.*\.svg$/,
            ],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: true,
            },
  },
        
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
      include: [path.resolve('./theme'), /node_modules\/semantic-ui-less/],
      use: true
        ? [
            {
              loader: 'style-loader',
            },
            BASE_CSS_LOADER,
            POST_CSS_LOADER,
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
              },
            },
          ]
        : [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: false,
                minimize: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            POST_CSS_LOADER,
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
              },
            },
          ],
    },
    {
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
    },

        {
          test: /\.(woff|woff2|ttf|eot|png|gif|jpg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      alias: {
        'webpack/hot/poll': require.resolve('webpack/hot/poll'),
        '../../theme.config$': `${projectRootPath}/theme/theme.config`,
      '@plone/volto':
        packageJson.name === '@plone/volto'
          ? `${projectRootPath}/src/`
          : `${projectRootPath}/node_modules/@plone/volto/src/`,
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
      })
    ],
    performance: {
      maxAssetSize: 10000000,
      maxEntrypointSize: 10000000,
    }
  }),
};
