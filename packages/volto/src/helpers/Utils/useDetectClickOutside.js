import { useCallback, useEffect, useRef } from 'react';
import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';

/**
 * Hook used to detect clicks outside a component (or an escape key press).
 * onTriggered function is triggered on `click` or escape `keyup` event.
 */
export function useDetectClickOutside({
  onTriggered,
  disableClick,
  disableKeys,
  allowAnyKey,
  triggerKeys,
}) {
  const ref = useRef(null);

  const keyListener = useCallback((e) => {
    if (allowAnyKey) {
      onTriggered(e);
    } else if (triggerKeys) {
      if (triggerKeys.includes(e.key)) {
        onTriggered(e);
      }
    } else {
      if (e.key === 'Escape') {
        onTriggered(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickListener = useCallback(
    (e) => {
      if (ref && ref.current) {
        if (!doesNodeContainClick(ref.current, e)) {
          onTriggered(e);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current],
  );

  useEffect(() => {
    // We attach the events to `window`, since the React synthetic event system is
    // attached in there, so if we stopPropagation on `onClick` then it does not stop
    // if the event is attached in `document`
    // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/52879137#52879137
    // https://gist.github.com/ggregoire/ce7bc946212920c0a6bad8125567d001
    // https://levelup.gitconnected.com/how-exactly-does-react-handles-events-71e8b5e359f2
    !disableClick && window.addEventListener('click', clickListener);
    !disableKeys && window.addEventListener('keyup', keyListener);
    return () => {
      !disableClick && window.removeEventListener('click', clickListener);
      !disableKeys && window.removeEventListener('keyup', keyListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
