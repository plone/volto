import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '../../components/editor/plugins/floating-toolbar-kit';
import { PlaywrightPlugin } from '@platejs/playwright';
import type { PlateConfig } from '../../types';

import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

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
