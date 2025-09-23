import type { ConfigType } from '@plone/registry';
import cloneDeep from 'lodash.clonedeep';

function install(config: ConfigType) {
  // @plone/plate should be installed before @plone/blocks
  // adding a guard anyways
  if (!config.settings.plate) config.settings.plate = {};

  config.settings.plate.block = cloneDeep(config.settings.plate.presets.block);

  return config;
}

export default install;
