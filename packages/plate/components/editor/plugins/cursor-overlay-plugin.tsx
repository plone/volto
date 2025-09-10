import { CursorOverlayPlugin } from '@udecode/plate-selection/react';

import { CursorOverlay } from '@plone/plate/components/plate-ui/cursor-overlay';

export const cursorOverlayPlugin = CursorOverlayPlugin.configure({
  render: {
    afterEditable: () => <CursorOverlay />,
  },
});
