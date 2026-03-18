import * as React from 'react';

// Debugging helper to log prop changes between renders.
export function useWhyDidYouUpdate<T extends Record<string, any>>(
  name: string,
  props: T,
) {
  const previousProps = React.useRef<T>();

  React.useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj: Record<string, { from: any; to: any }> = {};
      allKeys.forEach((key) => {
        if (previousProps.current?.[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length > 0) {
        // eslint-disable-next-line no-console
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}
