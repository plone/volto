import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '../../components/editor/plugins/floating-toolbar-kit';
import { PlaywrightPlugin } from '@platejs/playwright';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

// Include Playwright plugin only during e2e tests
if (typeof window !== 'undefined') {
  // @ts-ignore
  BlockEditorKit.push(PlaywrightPlugin.configure({ enabled: true }));
}

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
