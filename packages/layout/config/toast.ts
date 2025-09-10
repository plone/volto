import { type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import type { ConfigType } from '@plone/registry';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
export type Toast = {
  error: (content: ReactNode | null) => string | number;
};
// Define the type for your toast content.
export type ToastItem = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

// Create a global ToastQueue.
export const toastQueue = new ToastQueue<ToastItem>({
  // Wrap state updates in a CSS view transition.
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'toastQueue',
    type: 'factory',
    method: () => toastQueue,
  });
}
