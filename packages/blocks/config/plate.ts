import type { ConfigType } from '@plone/registry';
import blockConfig from '@plone/plate/config/presets/block';

function install(config: ConfigType) {
  // @plone/plate should be installed before @plone/blocks
  // adding a guard anyways
  if (!config.settings.plate) config.settings.plate = {};

  config.settings.plate.block = blockConfig;

  return config;
}

export default install;
