import { useSelector, shallowEqual } from 'react-redux';

/**
 * useActions hook
 *
 * This hook returns the current actions that is stored in the Redux store in the
 * `actions` reducer, and returns it along with the related state (actions).
 *
 * @export
 * @return {{ actions }}
 */
export function useActions() {
  const actions = useSelector((state) => state.actions.actions, shallowEqual);

  return actions;
}
