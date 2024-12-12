import ploneClient from '@plone/client';
import config from '@plone/registry';

const cli = ploneClient.initialize({
  apiPath: config.settings.internalApiPath || config.settings.apiPath,
});

export { cli as ploneClient };
