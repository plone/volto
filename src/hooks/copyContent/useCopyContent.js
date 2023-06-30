import { useSelector, shallowEqual } from 'react-redux';

/**
 * useCopyContent hook
 *
 * This hook returns the current clipboard state that is stored in the Redux store in the
 * `clipboard` reducer, and returns it along with the related state (action/source).
 *
 * @export
 * @return {{ action,source }}
 */

export function useCopyContent() {
  const action = useSelector((state) => state.clipboard.action);
  const source = useSelector((state) => state.clipboard.source, shallowEqual);

  return { action, source };
}
