import { useSelector, shallowEqual } from 'react-redux';

export function useRoot() {
  return useSelector((state) => state.breadcrumbs.root, shallowEqual);
}
