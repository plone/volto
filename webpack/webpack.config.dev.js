import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';

const projectRootPath = path.resolve(__dirname, '../');

const assetsPath = path.resolve(__dirname, '../static/dist');
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

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

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
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});


const BASE_CSS_LOADER = 'css?sourceMap&-minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]';

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
    'webpack/hot/only-dev-server',
    './src/client.jsx',
  ],
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /^((?!config).)*\.(js|jsx)$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      // Process JS with Babel.
      {
        test: /^((?!config).)*\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery)], // react-hot
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less-loader?outputStyle=expanded&sourceMap' },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          BASE_CSS_LOADER,
          'postcss-loader',
          'sass?sourceMap',
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          BASE_CSS_LOADER,
          'postcss-loader',
        ]
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?mimetype=image/png' },
    ],
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")({ url: 'inline', maxSize: 300, basePath: path.resolve(projectRootPath, './src') }),
      require("postcss-cssnext")()
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([{
      context: 'src/static',
      from: '**/*',
      to: './'
    }])
  ],
};
