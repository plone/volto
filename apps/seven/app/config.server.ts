/**
 * This is the server side config entry point
 */
import config from '@plone/registry';
import PloneClient from '@plone/client';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration from '../registry.loader';
// eslint-disable-next-line import/no-unresolved
import applyServerAddonConfiguration from '../registry.loader.server';

export default function install() {
  config.settings.apiPath =
    process.env.PLONE_API_PATH || 'http://localhost:8080/Plone';

  const cli = PloneClient.initialize({
    apiPath: config.settings.apiPath,
  });

  config.registerUtility({
    name: 'ploneClient',
    type: 'client',
    method: () => cli,
  });

  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];

  applyAddonConfiguration(config);
  applyServerAddonConfiguration(config);

  // eslint-disable-next-line no-console
  // console.log('API_PATH is:', config.settings.apiPath);

  return config;
}
