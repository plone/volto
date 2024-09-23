import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getUser } from '@plone/volto/actions';

const useFetchUser = () => {
  const user = useSelector((state) => state.users?.user);
  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId, user]);

  return user;
};

export default useFetchUser;
