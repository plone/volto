import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { Checkbox, DateTimePicker } from '@plone/components/tailwind';
import { DateField } from '@plone/components';

export default function install(config: ConfigType) {
  config.registerWidget({ key: 'default', definition: TextField });

  config.widgets.widget = {
    ...(config.widgets.widget ?? {}),
    datetime: DateTimePicker,
    date: DateField,
    boolean: Checkbox,
  };

  return config;
}
