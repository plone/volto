import type { ConfigType } from '@plone/registry';
import installSlots from './config/slots';
import installSettings from './config/settings';
import installToast from './config/toast';

export { Image, flattenScales } from './components/Image/Image';
export type { ImageProps } from './components/Image/Image';

export default function install(config: ConfigType) {
  // Translation factory
  config.registerUtility({
    name: 'translation',
    type: 'factory',
    method: (id: string) => id,
  });

  installSettings(config);
  installSlots(config);
  installToast(config);

  return config;
}
