import type { ConfigType } from '@plone/registry';
import installWidgets from './config/widgets';
import installControlpanels from './config/controlpanels';
import installRoutes from './config/routes';
import { formAtom } from './routes/atoms';
import type { BlockConfigBase } from '@plone/types';
import { ToolbarSettings } from './components/Toolbar/ToolbarSettings';
import { RouteCondition } from '@plone/layout/helpers';
import { ToolbarCancel } from './components/Toolbar/ToolbarCancel';
import { ToolbarSave } from './components/Toolbar/ToolbarSave';

declare module '@plone/types' {
  export interface BlocksConfigData {
    __somersault__: BlockConfigBase;
  }
}

export default function install(config: ConfigType) {
  config.settings.cssLayers = [...(config.settings.cssLayers || []), 'cmsui'];

  // This registers the `formAtom` so it can be accessed from all the packages
  // via config.getUtility({ name: 'formAtom', type: 'atom' })
  // without needing to import it directly from cmsui
  config.registerUtility({
    name: 'formAtom',
    type: 'atom',
    method: () => formAtom,
  });

  installWidgets(config);
  installControlpanels(config);
  installRoutes(config);

  config.registerSlotComponent({
    name: 'toolbarSettings',
    slot: 'toolbarBottom',
    component: ToolbarSettings,
    predicates: [RouteCondition('@@edit/*')],
  });

  config.registerSlotComponent({
    name: 'toolbarSave',
    slot: 'toolbarTop',
    component: ToolbarSave,
    predicates: [RouteCondition('@@edit/*')],
  });

  config.registerSlotComponent({
    name: 'toolbarCancel',
    slot: 'toolbarTop',
    component: ToolbarCancel,
    predicates: [RouteCondition('@@edit/*')],
  });

  return config;
}
