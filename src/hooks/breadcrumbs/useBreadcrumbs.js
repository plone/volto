import { useSelector, shallowEqual } from 'react-redux';

/**
 * useBreadcrumbs hook
 *
 * This hook returns the current breadcrumbs data that is stored in the Redux store in the
 * `breadcrumbs` reducer, and returns it along with the related state (items/root).
 *
 * @export
 * @return {{ items,root }}
 */
export function useBreadcrumbs() {
  const items = useSelector((state) => state.breadcrumbs.items, shallowEqual);
  const root = useSelector((state) => state.breadcrumbs.root);

  return { items, root };
}
