import type { PlateConfig } from '../../types';

import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';

const blockRenderer: PlateConfig = {
  plugins: [...BlockBaseEditorKit],
};

export default blockRenderer;
