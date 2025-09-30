import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  if (!config.settings.plate) config.settings.plate = {};

  return config;
}
