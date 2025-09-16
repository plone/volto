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
import { ObjectBrowserWidget } from '../components/ObjectBrowserWidget/ObjectBrowserWidget';

export default function install(config: ConfigType) {
  //config.registerDefaultWidget(TextField); //commented because broken
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
    definition: {
      'Relation List': ObjectBrowserWidget,
    },
  });
  config.registerWidget({
    key: 'widget',
    definition: {
      object_browser: ObjectBrowserWidget,
    },
  });
  config.registerWidget({
    key: 'vocabulary',
    definition: {
      'plone.app.vocabularies.Catalog': ObjectBrowserWidget,
    },
  });

  return config;
}
