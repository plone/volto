const applyConfig = (config) => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'es'];

  return {
    ...config,
    blocks: {
      ...config.blocks,
      blocksConfig: {
        ...config.blocks.blocksConfig,
      },
    },
  };
};

export default applyConfig;
