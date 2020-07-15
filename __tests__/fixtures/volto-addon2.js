export default (config) => {
  const settings = {
    nonContentRoutes: [],
    supportedLanguages: ['en', 'de'],
    navDepth: 3,
  };

  config.settings = {
    ...config.settings,
    ...settings,
  };

  return config;
};

const additionalConfig = (config) => {
  const settings = {
    navDepth: 6,
  };

  config.settings = {
    ...config.settings,
    ...settings,
  };

  return config;
};

export { additionalConfig };
