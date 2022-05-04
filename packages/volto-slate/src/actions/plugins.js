import { SLATE_PLUGINS } from 'volto-slate/constants';

export function setPluginOptions(pluginId, values = {}) {
  return {
    type: SLATE_PLUGINS,
    pluginId,
    ...values,
  };
}
