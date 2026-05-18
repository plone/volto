import type { PlateConfig } from '../../types';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { setFloatingToolbarButtons } from '../../components/editor/plugins/floating-toolbar-kit';
import { PloneBlockAdapterRendererPlugin } from '../../components/editor/plugins/plone-block-adapter-renderer';

import { TitleRendererBlock } from '../../components/editor/plugins/title-renderer';

setFloatingToolbarButtons(BlockFloatingToolbarButtons);

const nativeRenderer: PlateConfig = {
  readOnly: true,
  plugins: [
    ...BlockBaseEditorKit,
    TitleRendererBlock,
    PloneBlockAdapterRendererPlugin,
  ],
};

export default nativeRenderer;
