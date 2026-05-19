import type { ComponentType } from 'react';
import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '../../ui/floating-toolbar';
import { FloatingToolbarButtons as DefaultFloatingToolbarButtons } from '../../ui/floating-toolbar-buttons';

type FloatingToolbarButtonsComponent = ComponentType;

let floatingToolbarButtonsOverride: FloatingToolbarButtonsComponent | null =
  null;

export const setFloatingToolbarButtons = (
  component: FloatingToolbarButtonsComponent | null,
) => {
  floatingToolbarButtonsOverride = component;
};

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => {
        const FloatingToolbarButtons =
          floatingToolbarButtonsOverride ?? DefaultFloatingToolbarButtons;
        return (
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        );
      },
    },
  }),
];
