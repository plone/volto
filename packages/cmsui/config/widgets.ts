import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { ObjectBrowserWidget } from '../components/ObjectBrowserWidget/ObjectBrowserWidget';

export default function install(config: ConfigType) {
  config.widgets.default = TextField;
  config.registerWidget({
    key: 'factory',
    widget: {
      'Relation List': ObjectBrowserWidget,
    },
  });
  console.log(config);
  // config.widgets = {
  //   ...config.widgets,
  // };

  return config;
}
