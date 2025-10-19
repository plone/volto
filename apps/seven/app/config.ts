/**
 * This is the client side config entry point
 */
import config from '@plone/registry';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration from '../.plone/registry.loader';

export default function install() {
  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];

  applyAddonConfiguration(config);

  return config;
}
