import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import {
  AlignWidget,
  Checkbox,
  DateTimePicker,
  SizeWidget,
  WidthWidget,
  SelectWidget,
} from '@plone/components/quanta';
import { DateField } from '@plone/components';

export default function install(config: ConfigType) {
  config.registerDefaultWidget(TextField);
  config.registerWidget({ key: 'widget', definition: { date: DateField } });
  config.registerWidget({
    key: 'widget',
    definition: { datetime: DateTimePicker },
  });
  config.registerWidget({ key: 'widget', definition: { boolean: Checkbox } });
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

  config.registerWidget({
    key: 'factory',
    definition: { Choice: SelectWidget },
  });
  //console.log(config.widgets);

  return config;
}
