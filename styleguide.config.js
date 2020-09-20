const path = require('path');
// const autoprefixer = require('autoprefixer');
// const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
// const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const fs = require('fs');
// const { fromPairs, map, mapValues } = require('lodash');
// const glob = require('glob').sync;
// const webpack = require('webpack');
const createConfig = require('./node_modules/razzle/config/createConfig.js');
// const fileLoaderFinder = makeLoaderFinder('file-loader');
// const eslintLoaderFinder = makeLoaderFinder('eslint-loader');
// const addLessLoader = require('./less-plugin');

const projectRootPath = path.resolve('.');

const razzleConfig = require(path.join(projectRootPath, 'razzle.config.js'));
const packageJson = require(path.join(projectRootPath, 'package.json'));
const AddonConfigurationRegistry = require('./addon-registry');
const registry = new AddonConfigurationRegistry(projectRootPath);

// const BASE_CSS_LOADER = {
//   loader: 'css-loader',
//   options: {
//     importLoaders: 2,
//     sourceMap: true,
//     localIdentName: '[name]__[local]___[hash:base64:5]',
//   },
// };
//
// const POST_CSS_LOADER = {
//   loader: require.resolve('postcss-loader'),
//   options: {
//     // Necessary for external CSS imports to work
//     // https://github.com/facebookincubator/create-react-app/issues/2677
//     ident: 'postcss',
//     plugins: () => [
//       require('postcss-flexbugs-fixes'),
//       autoprefixer({
//         browsers: [
//           '>1%',
//           'last 4 versions',
//           'Firefox ESR',
//           'not ie < 9', // React doesn't support IE8 anyway
//         ],
//         flexbox: 'no-2009',
//       }),
//     ],
//   },
// };

module.exports = {
  components: 'src/components/**/*.jsx',
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  ignore: ['**/*.test.jsx', '**/Contents/Contents*jsx', '**/Tile/Tile.jsx'],
  verbose: true,
  title: 'Volto Style Guide',
  showCode: true,
  showUsage: true,
  require: [
    path.join(__dirname, 'node_modules/semantic-ui-less/semantic.less'),
    path.join(__dirname, 'theme/themes/pastanaga/extras/extras.less'),
  ],
  theme: {
    color: {
      link: 'firebrick',
      linkHover: 'salmon',
    },
  },
  sections: [
    {
      name: 'Theme',
      components: 'src/components/theme/**/*.jsx',
      content: './docs/styleguide/theme.md',
    },
    {
      name: 'Manage',
      components: 'src/components/manage/**/*.jsx',
      content: './docs/styleguide/manage.md',
    },
  ],
  webpackConfig(env) {
    // env is dev
    const baseConfig = createConfig('web', 'dev', {
      // clearConsole: false,
      modify: razzleConfig.modify,
      plugins: razzleConfig.plugins,
    });

    console.log('env', env);

    return baseConfig;
  },
};
