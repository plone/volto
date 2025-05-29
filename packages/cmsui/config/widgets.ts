import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { AlignWidget } from '@plone/components/tailwind';

export default function install(config: ConfigType) {
  config.widgets.default = TextField;
  config.widgets.widget = {
    ...(config.widgets.widget ?? {}),
    align: AlignWidget,
  };

  return config;
}
