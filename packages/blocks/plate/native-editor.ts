import type { PlateConfig } from '@plone/plate/types';
import { BlockEditorKit } from '@plone/plate/components/editor/block-editor-kit';
import { BlockFloatingToolbarButtons } from '@plone/plate/components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '@plone/plate/components/editor/plugins/floating-toolbar-kit';
import { PloneBlockAdapterPlugin } from '@plone/plate/components/editor/plugins/plone-block-adapter';
import { PlaywrightPlugin } from '@platejs/playwright';

import { TitleBlock } from '@plone/plate/components/editor/plugins/title';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

const native: PlateConfig = {
  plugins: [
    ...BlockEditorKit,
    TitleBlock,
    PloneBlockAdapterPlugin,
    // Include Playwright plugin only during e2e tests
    ...(typeof window !== 'undefined'
      ? [PlaywrightPlugin.configure({ enabled: true })]
      : []),
  ],
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default native;
