import { useSelector, shallowEqual } from 'react-redux';

export function useToken() {
  return useSelector((state) => state.userSession.token, shallowEqual);
}
