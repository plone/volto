import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { ObjectBrowserWidget } from '../components/ObjectBrowserWidget/ObjectBrowserWidget';

export default function install(config: ConfigType) {
  config.registerWidget({
    key: 'default',
    definition: TextField,
  });
  config.registerWidget({
    key: 'factory',
    definition: {
      'Relation List': ObjectBrowserWidget,
    },
  });

  return config;
}
