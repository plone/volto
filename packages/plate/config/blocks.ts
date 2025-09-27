import type { ConfigType } from '@plone/registry';
import { BlockEditorKit } from '../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../components/editor/block-editor-base-kit';
import { LegacyLinkPlugin } from '../components/editor/plugins/legacy-link-plugin';
import { BlockFloatingToolbarButtons } from '../components/ui/preset-block-floating-toolbar-buttons';

export default function install(config: ConfigType) {
  if (!config.settings.plate) config.settings.plate = {};

  config.settings.plate.presets.block = {
    editorConfig: {
      plugins: [...LegacyLinkPlugin, ...BlockEditorKit],
    },
    rendererConfig: {
      plugins: [...LegacyLinkPlugin, ...BlockBaseEditorKit],
    },
    floatingToolbarButtons: BlockFloatingToolbarButtons,
  };

  return config;
}
