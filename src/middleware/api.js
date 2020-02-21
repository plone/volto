/**
 * Api middleware.
 * @module middleware/api
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

import { settings } from '~/config';

import { LOGIN } from '@plone/volto/constants/ActionTypes';

let socket = null;

/**
 * Send a message on a websocket.
 * @function sendOnSocket
 * @param {Object} request Request object.
 * @returns {Promise} message is send
 */
function sendOnSocket(request) {
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
  }).then(() => {
    socket.send(JSON.stringify(request));
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
    actionPromise = Array.isArray(request)
      ? Promise.all(request.map(item => sendOnSocket({ ...item, id: type })))
      : sendOnSocket({ ...request, id: type });
  } else {
    actionPromise = Array.isArray(request)
      ? Promise.all(
          request.map(item =>
            api[item.op](item.path, {
              data: item.data,
              type: item.type,
              headers: item.headers,
            }),
          ),
        )
      : api[request.op](request.path, {
          data: request.data,
          type: request.type,
          headers: request.headers,
        });
    actionPromise.then(
      result => {
        if (type === LOGIN && settings.websockets) {
          cookie.save('auth_token', result.token, {
            path: '/',
            expires: new Date(jwtDecode(result.token).exp * 1000),
          });
          api.get('/@wstoken').then(res => {
            socket = new WebSocket(
              `${settings.apiPath.replace('http', 'ws')}/@ws?ws_token=${
                res.token
              }`,
            );
            socket.onmessage = message => {
              const packet = JSON.parse(message.data);
              if (packet.error) {
                dispatch({
                  type: `${packet.id}_FAIL`,
                  error: packet.error,
                });
              } else {
                dispatch({
                  type: `${packet.id}_SUCCESS`,
                  result: JSON.parse(packet.data),
                });
              }
            };
          });
        }
        return next({ ...rest, result, type: `${type}_SUCCESS` });
      },
      error => next({ ...rest, error, type: `${type}_FAIL` }),
    );
  }

  return actionPromise;
};
