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
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    convertPathData: false,
                    removeViewBox: false,
                  },
                },
              },
              'removeTitle',
              'removeUselessStrokeAndFill',
            ],
          },
        },
      ],
    };

    config.module.rules.push(SVGLOADER);
    return config;
  },
};
