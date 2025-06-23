import type { ConfigType } from '@plone/registry';
export default function install(config: ConfigType) {
  config.settings.hideBreadcrumbs = ['Plone Site', 'Subsite', 'LRF'];

  return config;
}
