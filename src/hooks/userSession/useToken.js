import { useSelector, shallowEqual } from 'react-redux';
import jwtDecode from 'jwt-decode';
export function useToken() {
  const token = useSelector((state) => state.userSession?.token, shallowEqual);
  const login = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  return { token, login };
}
