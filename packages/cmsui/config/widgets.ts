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
  config.registerWidget({ key: 'widget', definition: { date: DateField } });
  config.registerWidget({
    key: 'widget',
    definition: { datetime: DateTimePicker },
  });
  config.registerWidget({
    key: 'widget',
    definition: { align: AlignWidget },
  });
  config.registerWidget({
    key: 'widget',
    definition: { size: SizeWidget },
  });
  config.registerWidget({
    key: 'widget',
    definition: { width: WidthWidget },
  });
  console.log(config.widgets);
  // config.widgets.widget = {
  //   ...(config.widgets.widget ?? {}),
  //   align: AlignWidget,
  //   size: SizeWidget,
  //   width: WidthWidget,
  //   datetime: DateTimePicker,
  //   date: DateField,
  // };

  return config;
}
