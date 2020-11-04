module.exports = function (api) {
  api.cache(true);
  const presets = ['razzle/babel'];
  const plugins = [
    'lodash',
    '@babel/plugin-proposal-export-default-from', // Stage 1
    '@babel/plugin-syntax-export-namespace-from', // Stage 4
    '@babel/plugin-proposal-json-strings', // ? - deprecate?
    '@babel/plugin-proposal-throw-expressions', // Stage 2
    '@babel/plugin-syntax-import-meta', // deprecate?
    [
      '@babel/plugin-proposal-decorators', // deprecated -> deprecate (we are no longer using it)?
      {
        legacy: true,
      },
    ],
    [
      'babel-plugin-root-import', // Required for the ~ imports to work
      {
        rootPathSuffix: 'src',
      },
    ],
    [
      'react-intl', // React Intl extractor, required for the whole i18n infrastructure to work
      {
        messagesDir: './build/messages/',
      },
    ],
    '@loadable/babel-plugin', // Required by the @loadable plugin
  ];

  return {
    plugins,
    presets,
  };
};
