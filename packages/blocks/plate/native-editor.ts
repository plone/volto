import type { PlateConfig } from '@plone/plate/types';
import { BlockEditorKit } from '@plone/plate/components/editor/block-editor-kit';
import { BlockFloatingToolbarButtons } from '@plone/plate/components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '@plone/plate/components/editor/plugins/floating-toolbar-kit';
import { PlaywrightPlugin } from '@platejs/playwright';

import { TitleBlock } from '@plone/plate/components/editor/plugins/title';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

// Include Playwright plugin only during e2e tests
if (typeof window !== 'undefined') {
  // @ts-ignore
  BlockEditorKit.push(PlaywrightPlugin.configure({ enabled: true }));
}

const native: PlateConfig = {
  plugins: [...BlockEditorKit, TitleBlock],
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default native;
