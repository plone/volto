import { useSelector, shallowEqual } from 'react-redux';

export function useContent() {
  return useSelector((state) => state.content.data, shallowEqual);
}
