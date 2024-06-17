import config from '@plone/registry';
import { slate } from '@plone/blocks';
import { blocksConfig } from '@plone/blocks';

const settings = {
  apiPath: process.env.NEXT_PUBLIC_VERCEL_URL
    ? // Vercel does not prepend the schema to the NEXT_PUBLIC_VERCEL_URL automatic env var
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',
  slate,
};

//@ts-ignore
config.set('settings', settings);

//@ts-ignore
config.set('blocks', { blocksConfig });

export default config;
