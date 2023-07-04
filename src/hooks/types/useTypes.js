import { filter } from 'lodash';
import { useSelector, shallowEqual } from 'react-redux';

/**
 * useActions hook
 *
 * This hook returns the current actions that is stored in the Redux store in the
 * `actions` reducer, and returns it along with the related state (actions).
 *
 * @export
 * @return {{ type }}
 */
export function useTypes() {
  const type = useSelector((state) => state.types.types, shallowEqual);
  const types = filter(type, 'addable');
  return types;
}
