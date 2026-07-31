module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@plone/razzle/babel',
      {
        '@babel/preset-react': { runtime: 'automatic' },
      },
    ],
  ];
  const plugins = [
    'lodash',
    '@babel/plugin-proposal-export-default-from', // Stage 1
    '@babel/plugin-proposal-throw-expressions', // Stage 2
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
