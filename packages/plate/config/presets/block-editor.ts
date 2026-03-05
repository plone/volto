import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '../../components/editor/plugins/floating-toolbar-kit';
import { PlaywrightPlugin } from '@platejs/playwright';
import type { PlateConfig } from '../../types';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

const blockEditor: PlateConfig = {
  plugins: [
    ...BlockEditorKit,
    // Include Playwright plugin only during e2e tests
    ...(typeof window !== 'undefined'
      ? [PlaywrightPlugin.configure({ enabled: true })]
      : []),
  ],
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default blockEditor;
