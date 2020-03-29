/**
 * Api middleware.
 * @module middleware/api
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

import { settings } from '~/config';

import {
  LOGIN,
  RESET_APIERROR,
  SET_APIERROR,
} from '@plone/volto/constants/ActionTypes';

const ACTIONS_RAISING_ERRORS = ['GET_CONTENT', 'UPDATE_CONTENT'];

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
        // result has statusCode and headers for future feature implementations
        const { body } = result;

        if (getState().apierror.connectionRefused) {
          next({
            ...rest,
            type: RESET_APIERROR,
          });
        }
        if (type === LOGIN && settings.websockets) {
          cookie.save('auth_token', body.token, {
            path: '/',
            expires: new Date(jwtDecode(body.token).exp * 1000),
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
        return next({ ...rest, result: body, type: `${type}_SUCCESS` });
      },
      error => {
        // Response error is marked crossDomain if CORS error happen
        if (error.crossDomain) {
          next({
            ...rest,
            error,
            statusCode: 'CORSERROR',
            connectionRefused: false,
            type: SET_APIERROR,
          });
        }

        // Only SRR can set ECONNREFUSED
        if (error.code === 'ECONNREFUSED') {
          next({
            ...rest,
            error,
            statusCode: error.code,
            connectionRefused: true,
            type: SET_APIERROR,
          });
        }

        if (ACTIONS_RAISING_ERRORS.includes(action.type)) {
          if (error.response.statusCode === 401) {
            next({
              ...rest,
              error,
              statusCode: error.response,
              message: error.response.body.message,
              connectionRefused: false,
              type: SET_APIERROR,
            });
          }
        }
        return next({ ...rest, error, type: `${type}_FAIL` });
      },
    );
  }

  return actionPromise;
};
