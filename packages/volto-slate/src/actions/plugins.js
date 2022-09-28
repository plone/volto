import { SLATE_PLUGINS } from '@plone/volto-slate/constants';

export function setPluginOptions(pluginId, values = {}) {
  return {
    type: SLATE_PLUGINS,
    pluginId,
    ...values,
  };
}
