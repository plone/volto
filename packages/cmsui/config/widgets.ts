import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import {
  AlignWidget,
  DateTimePicker,
  SizeWidget,
  WidthWidget,
} from '@plone/components/quanta';
import { DateField } from '@plone/components';

export default function install(config: ConfigType) {
  config.registerWidget({ key: 'default', definition: TextField });

  config.widgets.widget = {
    ...(config.widgets.widget ?? {}),
    align: AlignWidget,
    size: SizeWidget,
    width: WidthWidget,
    datetime: DateTimePicker,
    date: DateField,
  };

  return config;
}
