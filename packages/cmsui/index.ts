import type { ConfigType } from '@plone/registry';
import installWidgets from './config/widgets';
import installControlpanels from './config/controlpanels';
import installRoutes from './config/routes';
import { formAtom } from './routes/atoms';
import type { BlockConfigBase } from '@plone/types';

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

  return config;
}
