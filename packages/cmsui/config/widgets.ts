import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { DateTimePicker } from '@plone/components/tailwind';
import { DateField } from '@plone/components';
import { RecurrenceWidget } from '../components/RecurrenceWidget/RecurrenceWidget';

export default function install(config: ConfigType) {
  config.registerWidget({ key: 'default', definition: TextField });
  config.registerWidget({
    key: 'id',
    definition: { recurrence: RecurrenceWidget },
  });

  config.widgets.widget = {
    ...(config.widgets.widget ?? {}),
    datetime: DateTimePicker,
    date: DateField,
  };

  return config;
}
