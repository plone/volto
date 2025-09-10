import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
/*
Use ErrorToast in your ErrorBoundary of your layout. 

*** Example: ***

export function ErrorBoundary() {
  return ErrorToast(queue);
}

*** Params: ***
- queue: a ToastQueue from react-aria-components. You could istantiate your queue, or use the global basic queue from registry
*/
export default function ErrorToast(queue: ToastQueue<any>) {
  const error = useRouteError();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      queue.add({
        title: `Error: ${error.status}:`,
        description: error.statusText,
      });
    } else if (error instanceof Error) {
      queue.add(error.message || 'Error');
    } else {
      queue.add('Unknown error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return null; // No visual rendering
}
