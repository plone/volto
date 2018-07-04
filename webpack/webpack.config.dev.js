import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import autoprefixer from 'autoprefixer';
import paths from '../configs/paths';

const projectRootPath = path.resolve(__dirname, '../');

const assetsPath = path.resolve(__dirname, '../dist');
const host = 'localhost';
const port = process.env.PORT || 4301;

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

const babelrcObjectDevelopment =
  (babelrcObject.env && babelrcObject.env.development) || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign(
  {},
  babelrcObjectDevelopment,
  babelrcObject,
  { plugins: combinedPlugins },
);
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled
// on the server, we have to add the babel plugin react-transform-hmr manually
// here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
let reactTransform = null;
for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  const plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module'],
});

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
  mode: 'development',
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`, // Not sure it's needed 
    'webpack/hot/only-dev-server',
    paths.appClientIndexJs,
  ],
  output: {
    path: paths.appBuild,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelLoaderQuery,
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
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
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          BASE_CSS_LOADER,
          POST_CSS_LOADER,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: paths.appBuild,
        use: [
          {
            loader: 'style-loader',
          },
          BASE_CSS_LOADER,
          POST_CSS_LOADER,
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules', paths.appNodeModules],
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, '../theme/site/theme.config'),
    },
  },
  resolveLoader: {
    modules: [paths.appNodeModules, paths.ownNodeModules],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        context: 'src/static',
        from: '**/*',
        to: './',
      },
    ]),
  ],
};
