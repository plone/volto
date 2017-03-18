import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import strip from 'strip-loader';

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/client.jsx'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000' },
      { test: /^((?!config).)*\.(js|jsx)$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=2&sourceMap!postcss-loader!less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 
            'postcss-loader',
        ]),
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style', [
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]),
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  },
  progress: true,
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")({ url: 'inline', maxSize: 300, basePath: path.resolve(projectRootPath, './src') }),
      require("postcss-cssnext")()
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    // optimizations
    new CopyWebpackPlugin([{
      context: 'src/static',
      from: '**/*',
      to: './'
    }]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
};
