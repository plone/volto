module.exports = function() {
  return {
    presets: ['razzle/babel', 'stage-0'],
    plugins: [
      'transform-decorators-legacy',
      ['transform-class-properties', { spec: true }],
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
};
