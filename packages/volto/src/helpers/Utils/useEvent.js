import { useEffect } from 'react';

/**
 * Hook to listen for an event on the document
 */
export function useEvent(event, handler) {
  useEffect(() => {
    // initiate the event handler
    document.addEventListener(event, handler);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      document.removeEventListener(event, handler);
    };
  });
}
