import React from 'react';

/**
 * Hook used to "cache" the "previous" value of a prop or a computed variable.
 */
export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
