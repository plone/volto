import config from '@plone/registry';
import { blocksConfig, slate } from '@plone/blocks';

const settings = {
  apiPath: 'http://localhost:8080/Plone',
  slate,
};

// @ts-ignore
config.set('settings', settings);

// @ts-ignore
config.set('blocks', { blocksConfig });

export default config;
