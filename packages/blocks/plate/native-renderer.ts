import type { PlateConfig } from '@plone/plate/types';
import { BlockBaseEditorKit } from '@plone/plate/components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '@plone/plate/components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '@plone/plate/components/editor/plugins/floating-toolbar-kit';
import { NativeBlockAdapterPlugin } from '@plone/plate/components/editor/plugins/native-block-adapter';

import { TitleBlock } from '@plone/plate/components/editor/plugins/title';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

const nativeRenderer: PlateConfig = {
  plugins: [...BlockBaseEditorKit, TitleBlock, NativeBlockAdapterPlugin],
};

export default nativeRenderer;
