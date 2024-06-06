import Cookies from 'universal-cookie';

const userSessionReset =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    switch (action.type) {
      case 'GET_CONTENT_SUCCESS':
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
        }

        break;
      default:
        return next(action);
    }
  };

export default userSessionReset;
