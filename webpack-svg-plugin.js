module.exports = {
  modifyWebpackConfig({
    env: { target, dev },
    webpackConfig: config,
    webpackObject,
    options: { pluginOptions, razzleOptions, webpackOptions },
    paths,
  }) {
    const SVGLOADER = {
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
    };

    config.module.rules.push(SVGLOADER);
    return config;
  },
};
