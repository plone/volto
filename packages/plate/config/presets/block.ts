import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { LegacyLinkPlugin } from '../../components/editor/plugins/legacy-link-plugin';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';

const block: PlateConfig = {
  editorConfig: {
    plugins: [...LegacyLinkPlugin, ...BlockEditorKit],
  },
  rendererConfig: {
    plugins: [...LegacyLinkPlugin, ...BlockBaseEditorKit],
  },
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default block;
