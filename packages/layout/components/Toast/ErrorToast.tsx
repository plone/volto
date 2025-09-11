import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { type ToastQueue } from '../../config/toast';
/*
Use ErrorToast in your ErrorBoundary of your layout. 

*** Example: ***

export function ErrorBoundary() {
  return ErrorToast(queue);
}

*** Params: ***
- queue: a ToastQueue from react-aria-components. You could istantiate your queue, or use the global basic queue from registry
*/
export default function ErrorToast(queue: ToastQueue) {
  const error = useRouteError();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      queue.add({
        title: `Error: ${error.status}:`,
        description: error.statusText,
        className: 'error',
      });
    } else if (error instanceof Error) {
      queue.add({ title: error.message || 'Error', className: 'error' });
    } else {
      queue.add({ title: 'Unknown error', className: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return null; // No visual rendering
}
