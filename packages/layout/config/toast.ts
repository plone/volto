import { type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import type { ConfigType } from '@plone/registry';
import { UNSTABLE_ToastQueue as RACToastQueue } from 'react-aria-components';

export type Toast = {
  error: (content: ReactNode | null) => string | number;
};
// Define the type for our toast content.
export type ToastItem = {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};
export type ToastQueue = RACToastQueue<ToastItem>;

// Create a global ToastQueue.
export const toastQueue = new RACToastQueue<ToastItem>({
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
    name: 'queue',
    type: 'toast',
    method: () => toastQueue,
  });
  config.registerUtility({
    name: 'show',
    type: 'toast',
    method: (queueElement: ToastItem) => {
      toastQueue.add(queueElement, { timeout: 25000 });
    },
  });
}
