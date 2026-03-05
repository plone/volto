import type { PlateConfig } from '../../types';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '../../components/editor/plugins/floating-toolbar-kit';
import { PloneBlockAdapterPlugin } from '../../components/editor/plugins/plone-block-adapter';

import { TitleBlock } from '../../components/editor/plugins/title';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

const nativeRenderer: PlateConfig = {
  plugins: [...BlockBaseEditorKit, TitleBlock, PloneBlockAdapterPlugin],
};

export default nativeRenderer;
