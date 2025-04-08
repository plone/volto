import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getUser } from '@plone/volto/actions/users/users';

const useUser = () => {
  const users = useSelector((state) => state.users);
  const user = users?.user;
  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id && users?.get.loading === false) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId, user, users?.get.loading]);

  return user;
};

export default useUser;
