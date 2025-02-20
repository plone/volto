import config from '@plone/registry';
import type { ConfigType } from '@plone/registry';
import { slate } from '@plone/blocks/config/slate';
import { blocksConfig } from '@plone/blocks/config';

const settings: Partial<ConfigType['settings']> = {
  slate,
};

if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  // This app is at Vercel
  if (process.env.NEXT_PRODUCTION_URL) {
    // This app is in a production deployment, so set the apiPath to the production URL
    settings.apiPath = process.env.NEXT_PRODUCTION_URL;
  } else {
    // This app is in a preview deployment, so set the apiPath to the Vercel URL
    settings.apiPath = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
} else {
  // This app is in development, so set the apiPath to localhost
  settings.apiPath = 'http://localhost:3000/';
}

// @ts-expect-error Improve typings
config.set('settings', settings);

// @ts-expect-error Improve typings
config.set('blocks', { blocksConfig });

export default config;
