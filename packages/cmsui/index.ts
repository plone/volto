import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  // Create the routes for the CMS UI via @plone/registry
  // in order to make it work as an add-on
  // Not sure if in the final shape of the architecture this will be necessary
  return config;
}
