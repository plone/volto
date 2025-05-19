export default (config) => {
  const settings = {
    nonContentRoutes: [],
    supportedLanguages: ['en'],
    navDepth: 1,
  };

  config.settings = {
    ...config.settings,
    ...settings,
  };

  return config;
};
