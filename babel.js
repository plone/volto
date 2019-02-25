module.exports = {
  presets: ['razzle/babel', 'stage-0'],
  plugins: [
    'transform-decorators-legacy',
    'babel-plugin-transform-class-properties',
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
    [
      'react-intl',
      {
        messagesDir: './build/messages/',
      },
    ],
  ],
};
