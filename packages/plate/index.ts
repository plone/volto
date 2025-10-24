import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  // TODO: do not add things to the registry
  if (!config.settings.plate) config.settings.plate = {};

  return config;
}
