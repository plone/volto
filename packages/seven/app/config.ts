/**
 * This is the client side config entry point
 */
import config from '@plone/registry';
import applyAddonConfiguration from '../registry.loader';

export default function install() {
  applyAddonConfiguration(config);
  return config;
}
