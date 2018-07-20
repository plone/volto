/**
 * Api middleware.
 * @module middleware/api
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

import { LOGIN } from '../constants/ActionTypes';
import config from '../config';

let socket = null;

/**
 * Wait for a connection to the backend.
 * @function waitForConnection
 * @param {Object} socket Websocket object.
 * @returns {Promise} established and open websocket connection
 */
function waitForConnection(socket) {
  return new Promise((resolve, reject) => {
    switch (socket.readyState) {
      case socket.CONNECTING:
        socket.addEventListener('open', () => resolve(socket));
        socket.addEventListener('error', reject);
        break;
      case socket.OPEN:
        resolve(socket);
        break;
      default:
        reject();
        break;
    }
  });
}

/**
 * Api middleware.
 * @function
 * @param {Object} api Api object.
 * @returns {Promise} Action promise.
 */
export default api => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { request, type, ...rest } = action;
  let actionPromise;

  if (!request) {
    return next(action);
  }

  next({ ...rest, type: `${type}_PENDING` });

  if (socket) {
  } else {
    actionPromise = Array.isArray(request)
      ? Promise.all(
          request.map(item => api[item.op](item.path, { data: item.data })),
        )
      : api[request.op](request.path, { data: request.data });
    actionPromise.then(
      result => {
        if (type === LOGIN && config.websockets) {
          cookie.save('auth_token', result.token, {
            path: '/',
            expires: new Date(jwtDecode(result.token).exp * 1000),
          });
          api.get('/@wstoken').then(res => {
            socket = new WebSocket(
              `${config.apiPath.replace('http', 'ws')}/@ws?ws_token=${
                res.token
              }`,
            );
            socket.onmessage = msg => console.log(msg);
            socket.onopen = () => console.log('open');
            socket.onclose = () => console.log('close');
            socket.onerror = e => console.log(e);
          });
        }
        return next({ ...rest, result, type: `${type}_SUCCESS` });
      },
      error => next({ ...rest, error, type: `${type}_FAIL` }),
    );
  }

  return actionPromise;
};
