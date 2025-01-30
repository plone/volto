/**
 * This is the server side config entry point
 */
import config from '@plone/registry';
import ploneClient from '@plone/client';
import applyAddonConfiguration from '../registry.loader';

export default function install() {
  applyAddonConfiguration(config);

  config.settings.apiPath =
    process.env.PLONE_API_PATH || 'http://localhost:8080/Plone';

  const cli = ploneClient.initialize({
    apiPath: config.settings.apiPath,
  });

  config.registerUtility({
    name: 'ploneClient',
    type: 'client',
    method: () => cli,
  });

  console.log('API_PATH is:', config.settings.apiPath);

  return config;
}
