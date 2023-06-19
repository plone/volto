import { useSelector, shallowEqual } from 'react-redux';

/**
 * useToken hook
 *
 * This hook returns the current token that is stored in the Redux store in the
 * `userSession` reducer, and returns it along with the related state (token).
 *
 * @export
 * @return {{ token }}
 */
export function useToken() {
  return useSelector((state) => state.userSession.token, shallowEqual);
}
