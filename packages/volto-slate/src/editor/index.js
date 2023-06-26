import * as slateConfig from './config';
import installDefaultPlugins from './plugins';
export { default as SlateEditor } from './SlateEditor';
export { default as EditorReference } from './EditorReference';

export default function applyConfig(config) {
  config.settings.slate = {
    ...slateConfig,
    // showExpandedToolbar: false,
    enableExpandedToolbar: false,
  };
  config = installDefaultPlugins(config);
  return config;
}
