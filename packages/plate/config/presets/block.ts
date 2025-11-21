import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';

const block: PlateConfig = {
  editorConfig: {
    plugins: [...BlockEditorKit],
  },
  rendererConfig: {
    plugins: [...BlockBaseEditorKit],
  },
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default block;
