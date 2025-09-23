import type { ConfigType } from '@plone/registry';
import { EditorKit } from '@plone/plate/components/editor/editor-kit';
import { LegacyLinkPlugin } from '@plone/plate/components/editor/plugins/legacy-link-plugin';

function install(config: ConfigType) {
  config.settings.plate = {
    editorConfig: {
      plugins: [...LegacyLinkPlugin, ...EditorKit],
    },
  };

  return config;
}

export default install;
