import config from '@plone/registry';
import { blocksConfig, slate } from '@plone/blocks';
import installSlots from '@plone/slots/config';

config.set('slots', {});
config.set('utilities', {});
installSlots(config);

const settings = {
  apiPath: 'http://localhost:8080/Plone',
  slate,
};

// @ts-expect-error We need to fix typing
config.set('settings', settings);

// @ts-expect-error We need to fix typing
config.set('blocks', { blocksConfig });

export default config;
