import { useSelector, shallowEqual } from 'react-redux';

export function useItems() {
  return useSelector((state) => state.breadcrumbs.items, shallowEqual);
}
