import { PlaywrightPlugin } from '@platejs/playwright';
import type { PlateConfig } from '../../types';

import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';

// Include Playwright plugin only during e2e tests
if (typeof window !== 'undefined') {
  // @ts-ignore
  BlockEditorKit.push(PlaywrightPlugin.configure({ enabled: true }));
}

const blockEditor: PlateConfig = {
  plugins: [...BlockEditorKit],
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default blockEditor;
