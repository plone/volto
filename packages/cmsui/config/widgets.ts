import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import {
  AlignWidget,
  Checkbox,
  DateTimePicker,
  SizeWidget,
  WidthWidget,
} from '@plone/components/quanta';
import { DateField } from '@plone/components';
import { RecurrenceWidget } from '../components/RecurrenceWidget/RecurrenceWidget';

export default function install(config: ConfigType) {
  config.registerWidget({ key: 'default', definition: TextField });

  config.registerWidget({
    key: 'id',
    definition: { recurrence: RecurrenceWidget },
  });
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

  return config;
}
