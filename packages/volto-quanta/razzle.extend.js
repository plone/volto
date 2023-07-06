const plugins = (defaultPlugins) => {
  return defaultPlugins.concat(['scss']);
};
const modify = (config, { target, dev }, webpack) => {
  return config;
};

module.exports = {
  plugins,
  modify,
};
