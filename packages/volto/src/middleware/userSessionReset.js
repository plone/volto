import Cookies from 'universal-cookie';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const userSessionReset =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    switch (action.type) {
      case LOCATION_CHANGE:
        if (action.request?.subrequest || __SERVER__) {
          return next(action);
        }

        const cookies = new Cookies();
        const token = cookies.get('auth_token');
        const state = getState();

        if (token && !state.userSession?.token) {
          const loginAction = {
            type: 'LOGIN_SUCCESS',
            result: {
              token,
            },
          };
          dispatch(loginAction);
        } else if (!token && state.userSession?.token) {
          const logoutAction = {
            type: 'LOGOUT_SUCCESS',
            result: {
              token,
            },
          };
          dispatch(logoutAction);
        }
        return next(action);
      default:
        return next(action);
    }
  };

export default userSessionReset;
