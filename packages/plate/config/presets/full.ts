import type { PlateConfig } from '../../types';

import { EditorKit } from '../../components/editor/editor-kit';
import { LegacyLinkPlugin } from '../../components/editor/plugins/legacy-link-plugin';

const full: PlateConfig = {
  plugins: [...LegacyLinkPlugin, ...EditorKit],
};

export default full;
