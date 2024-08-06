module.exports = {
  addons: [],
  webpack: (config, { env }) => {
    if (env === 'development') {
      config.resolve.alias['@adobe/react-spectrum'] = '@adobe/react-spectrum/dist/main.js';
    }
    return config;
  },
  razzleOptions: {
    cssModulesExclude: [/@adobe\/react-spectrum/],
  },
};
