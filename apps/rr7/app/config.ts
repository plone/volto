import config from '@plone/registry';
import { blocksConfig, slate } from '@plone/blocks';

const settings = {
  apiPath: 'http://localhost:3000',
  slate,
};

// @ts-expect-error We need to fix typing
config.set('settings', settings);

// @ts-expect-error We need to fix typing
config.set('blocks', { blocksConfig });

export default config;
