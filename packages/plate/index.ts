import type { ConfigType } from '@plone/registry';
import installBlock from './config/blocks';

import { EditorKit } from './components/editor/editor-kit';
import { BaseEditorKit } from './components/editor/editor-base-kit';
import { LegacyLinkPlugin } from './components/editor/plugins/legacy-link-plugin';

export default function install(config: ConfigType) {
  if (!config.settings.plate) config.settings.plate = {};

  config.settings.plate.presets = {
    full: {
      editorConfig: {
        plugins: [...LegacyLinkPlugin, ...EditorKit],
      },
      rendererConfig: {
        plugins: [...LegacyLinkPlugin, ...BaseEditorKit],
      },
    },
  };

  installBlock(config);

  return config;
}
