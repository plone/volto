import type { ConfigType } from '@plone/registry';
import installSlots from './config/slots';
import installSettings from './config/settings';
import installToast from './config/toast';
import DefaultView from './views/DefaultView';
import EventView from './views/EventView';

export default function install(config: ConfigType) {
  // Translation factory
  config.registerUtility({
    name: 'translation',
    type: 'factory',
    method: (id: string) => id,
  });

  config.views.defaultView = DefaultView;
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    Event: EventView,
  };

  config.views.layoutViews = { ...config.views.layoutViews };

  installSettings(config);
  installSlots(config);
  installToast(config);

  return config;
}
