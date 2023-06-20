import { useSelector, shallowEqual } from 'react-redux';

/**
 * useNavigation hook
 *
 * This hook returns the current navigation state that is stored in the Redux store in the
 * `navigation` reducer, and returns it along with the related state (items).
 *
 * @export
 * @return {{ items:ContentData }}
 */

export function useNavigation() {
  const items = useSelector((state) => state.navigation.items, shallowEqual);
  return items;
}
