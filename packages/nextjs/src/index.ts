import { type ConfigType } from '@plone/registry';
import applyAddonConfiguration, {
  addonsInfo,
  // @ts-expect-error Improve typings
} from '@plone/registry/addons-loader'; // eslint-disable-line import/no-unresolved

export default function install(config: ConfigType): ConfigType {
  const settings: Partial<ConfigType['settings']> = {
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

  applyAddonConfiguration(config);

  return config;
}
