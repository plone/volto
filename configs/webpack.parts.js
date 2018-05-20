import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
import eslintFormatter from 'react-dev-utils/eslintFormatter';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: 'babel-loader', // I think should use require.resolve() on all loaders instead?
      }, // configure eslinter
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')],
              },
              ignore: false,
              useEslintrc: false,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve(__dirname, './src'), // only for src files
        exclude: [/[/\\\\]node_modules[/\\\\]/],
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: path.resolve(__dirname, './src'),
        exclude: [/[/\\\\]node_modules[/\\\\]/],
        use: [
          // This loader parallelizes code compilation, it is optional but
          // improves compile time on larger projects
          require.resolve('thread-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')],
              plugins: [require.resolve('babel-plugin-named-asset-import')],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              highlightCode: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          // This loader parallelizes code compilation, it is optional but
          // improves compile time on larger projects
          require.resolve('thread-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              compact: false,
              presets: [require.resolve('babel-preset-react-app/dependencies')],
              cacheDirectory: true,
              highlightCode: true,
            },
          },
        ],
      },
    ],
  },
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: false,
  },
});

exports.loadDevCss = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        include,
        exclude: [/\.module\.(scss|sass)$/, exclude],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options,
          },
          'sass-loader',
        ],
      },
      {
        test: /\.module\.(scss|sass)$/, // Adds support for CSS Modules, but using SASS
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options,
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
            },
          },
          {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        ],
      },
      {
        test: /\.less$/,
        include,
        exclude,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options,
          },
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
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.module\.css$/, // add spport for css-modules
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        ],
      },
    ],
  },
});
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff2)$/,
        include,
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, exclude], // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        use: [
          {
            loader: 'url-loader',
            options,
          },
          {
            loader: 'file-loader?name=[name].[ext]?[hash]',
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
      },
    ],
  },
});

exports.generateSourceMaps = () => ({
  devtool: 'eval',
});

exports.setEnvVariables = obj => {
  return {
    plugins: [new webpack.DefinePlugin(obj)],
  };
};
exports.plugins = () => ({
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(path.resolve(__dirname, './src'), [
      path.resolve(__dirname, './package.json'),
    ]),
    /* new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '/src'),
    }), */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(
      path.resolve(__dirname, './node_modules'),
    ),
    new webpack.IgnorePlugin(/^\.\/locales$/, /moment$/),
  ],
});

exports.loadResolver = () => ({
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      ['node_modules'].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
    ],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, '../theme/site/theme.config'),
      '@babel/runtime': path.dirname(
        require.resolve('@babel/runtime/package.json'),
      ),
    },
  },
});
