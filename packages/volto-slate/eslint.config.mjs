import rootConfig from '../../eslint.config.mjs';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';

export default [
  ...rootConfig,
  // reactPlugin.configs.flat['jsx-runtime'],
  // pluginReactHooks.configs.flat,
  // {
  //   rules: {
  //     'react/prop-types': 0,
  //     'react/no-unescaped-entities': 0,
  //   },
  // },
];
