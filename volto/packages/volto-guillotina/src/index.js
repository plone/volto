const applyConfig = (config) => {
  // Disabling apiExpanders, since Guillotina does not
  // have them
  config.settings.apiExpanders = [];
  return config;
};

export default applyConfig;
