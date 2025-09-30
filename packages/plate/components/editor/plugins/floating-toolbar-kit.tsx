import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '../../ui/floating-toolbar';
import { FloatingToolbarButtons as DefaultFloatingToolbarButtons } from '../../ui/floating-toolbar-buttons';

import config from '@plone/registry';

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => {
        const FloatingToolbarButtons =
          config.settings.plate?.block?.floatingToolbarButtons ||
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
