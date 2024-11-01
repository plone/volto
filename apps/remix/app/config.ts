import config from '@plone/registry';
import installBlocks from '@plone/blocks';
import installSlots from '@plone/slots';

config.set('slots', {});
config.set('utilities', {});
installBlocks(config);
installSlots(config);

config.settings.apiPath = 'http://localhost:8080/Plone';

export default config;
