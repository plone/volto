import type { ConfigType } from '@plone/registry';
import { TextField } from '../components/TextField/TextField';
import { RecurrenceWidget } from '../components/RecurrenceWidget/RecurrenceWidget';

export default function install(config: ConfigType) {
  // config.widgets.id.recurrence = RecurrenceWidget;
  config.widgets.id = {
    ...config.widgets.id,
    recurrence: RecurrenceWidget,
  };
  config.widgets.default = TextField;

  return config;
}
