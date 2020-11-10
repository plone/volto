const svgPlugin = (config) => {
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
};

module.exports = { svgPlugin };
