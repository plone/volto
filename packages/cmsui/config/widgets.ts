import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { DateTimePicker } from '@plone/components/tailwind';
import { DateField } from '@plone/components';

export default function install(config: ConfigType) {
  config.widgets.default = TextField;
  config.widgets.widget = {
    ...(config.widgets.widget ?? {}),
    datetime: DateTimePicker,
    date: DateField,
  };

  return config;
}
