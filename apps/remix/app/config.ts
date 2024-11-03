import config from '@plone/registry';
import applyAddonConfiguration from 'load-plone-registry-addons';

applyAddonConfiguration(config);

config.settings.apiPath = 'http://localhost:3000';

export default config;
