import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '../../ui/floating-toolbar';
import { FloatingToolbarButtons as DefaultFloatingToolbarButtons } from '../../ui/floating-toolbar-buttons';
import plateBlockConfig from '../../../config/presets/block';

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => {
        const FloatingToolbarButtons =
          plateBlockConfig.floatingToolbarButtons ||
          DefaultFloatingToolbarButtons;
        return (
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        );
      },
    },
  }),
];
