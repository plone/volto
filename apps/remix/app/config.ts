import config from '@plone/registry';
import applyAddonConfiguration from '@plone/registry/addons-loader';

applyAddonConfiguration(config);

config.settings.apiPath = 'http://localhost:3000';

export default config;
