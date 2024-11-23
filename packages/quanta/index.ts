import { type ConfigType } from '@plone/registry';

import { ContentTypeCondition } from '@plone/slots/src/helpers';
import Event from './views/Event/Event';
import Page from './views/Page/Page';

export default function install(config: ConfigType): ConfigType {
  config.registerSlotComponent({
    slot: 'main',
    name: 'view',
    component: Page,
    predicates: [ContentTypeCondition(['Document', 'Plone Site'])],
  });

  config.registerSlotComponent({
    slot: 'main',
    name: 'view',
    component: Event,
    predicates: [ContentTypeCondition(['Event'])],
  });

  return config;
}
