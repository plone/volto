import config from '@plone/registry';
import type { ConfigType } from '@plone/registry';
import { slate } from '@plone/blocks';
import { blocksConfig } from '@plone/blocks';

const settings: Partial<ConfigType['settings']> = {
  slate,
};

if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  // If we are in Vercel
  if (process.env.NEXT_PRODUCTION_URL) {
    // We are in production deployment, we set the apiPath to the production URL
    settings.apiPath = process.env.NEXT_PRODUCTION_URL;
  } else {
    // We are in preview deployment, we set the apiPath to the Vercel URL
    settings.apiPath = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
} else {
  // We are in development, we set the apiPath to localhost
  settings.apiPath = 'http://localhost:3000/';
}

// @ts-expect-error Improve typings
config.set('settings', settings);

// @ts-expect-error Improve typings
config.set('blocks', { blocksConfig });

export default config;
