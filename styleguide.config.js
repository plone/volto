module.exports = {
  components: 'src/components/**/*.jsx',
  ignore: ['**/*.test.jsx', '**/Contents/Contents*jsx', '**/Tile/Tile.jsx'],
  verbose: true,
  title: 'Plone React Style Guide',
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
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg|png|gif|jpg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
  },
};
