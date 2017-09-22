module.exports = {
  components: 'src/components/**/*.jsx',
  ignore: [
    "**/*.test.jsx",
    "**/Contents/Contents*jsx",
    "**/Tile/Tile.jsx",
  ],
  verbose: true,
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
            limit: 10000
          }
        },
      ],
    },
  },
};
