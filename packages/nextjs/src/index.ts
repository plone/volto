import { blocksConfig, slate } from '@plone/blocks';
import { type ConfigType } from '@plone/registry';
// @ts-expect-error type load-registry-addons correctly
import applyAddonConfiguration, { addonsInfo } from 'load-registry-addons'; // eslint-disable-line import/no-unresolved

export default function install(config: ConfigType): ConfigType {
  const settings: Partial<ConfigType['settings']> = {
    slate,
    addonsInfo,
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

  config.set('slots', {});

  applyAddonConfiguration(config);

  return config;
}
