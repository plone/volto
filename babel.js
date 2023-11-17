const transformModulesMapper = require('./webpack-plugins/babel-transform-modules');

module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      'razzle/babel',
      {
        '@babel/preset-react': { runtime: 'automatic' },
      },
    ],
  ];
  const plugins = [
    'lodash',
    '@babel/plugin-proposal-export-default-from', // Stage 1
    '@babel/plugin-syntax-export-namespace-from', // Stage 4
    '@babel/plugin-proposal-throw-expressions', // Stage 2
    '@babel/plugin-proposal-nullish-coalescing-operator', // Stage 4
    [
      'babel-plugin-root-import', // Required for the ~ imports to work
      {
        rootPathSuffix: 'src',
      },
    ],
    // this transform-imports config is read by jest and breaks webpack
    [
      'transform-imports',
      {
        '@plone/volto/components': {
          transform: (importName) => {
            const voltoTransforms =
              transformModulesMapper['@plone/volto/components'];
            if (voltoTransforms[importName]) {
              return voltoTransforms[importName];
            }
            return '@plone/volto/components';
          },
        },
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
