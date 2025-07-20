import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.settings.cssLayers = [
    'theme',
    'base',
    'components',
    'plone-components',
    'utilities',
    'custom',
  ];
  return config;
}
