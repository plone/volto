import type { PlateConfig } from '@plone/types';

import { EditorKit } from '../../components/editor/editor-kit';
import { BaseEditorKit } from '../../components/editor/editor-base-kit';
import { LegacyLinkPlugin } from '../../components/editor/plugins/legacy-link-plugin';

const full: PlateConfig = {
  editorConfig: {
    plugins: [...LegacyLinkPlugin, ...EditorKit],
  },
  rendererConfig: {
    plugins: [...LegacyLinkPlugin, ...BaseEditorKit],
  },
};

export default full;
