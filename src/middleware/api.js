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
export default (api) => ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { request, type, mode = 'paralel', ...rest } = action;
  let actionPromise;

  if (!request) {
    return next(action);
  }

  next({ ...rest, type: `${type}_PENDING` });

  if (socket) {
    actionPromise = Array.isArray(request)
      ? Promise.all(request.map((item) => sendOnSocket({ ...item, id: type })))
      : sendOnSocket({ ...request, id: type });
  } else {
    actionPromise = Array.isArray(request)
      ? mode === 'serial'
        ? request.reduce((prevPromise, item) => {
            return prevPromise.then(() => {
              return api[item.op](item.path, {
                data: item.data,
                type: item.type,
                headers: item.headers,
              });
            });
          }, Promise.resolve())
        : Promise.all(
            request.map((item) =>
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
      (result) => {
        if (getState().apierror.connectionRefused) {
          next({
            ...rest,
            type: RESET_APIERROR,
          });
        }
        if (type === LOGIN && settings.websockets) {
          cookie.save('auth_token', result.token, {
            path: '/',
            expires: new Date(jwtDecode(result.token).exp * 1000),
          });
          api.get('/@wstoken').then((res) => {
            socket = new WebSocket(
              `${settings.apiPath.replace('http', 'ws')}/@ws?ws_token=${
                res.token
              }`,
            );
            socket.onmessage = (message) => {
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
      (error) => {
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

        // Response error is marked crossDomain if CORS error happen
        else if (error.crossDomain) {
          next({
            ...rest,
            error,
            statusCode: 'CORSERROR',
            connectionRefused: false,
            type: SET_APIERROR,
          });
        }

        // Gateway timeout
        else if (error.response.statusCode === 504) {
          next({
            ...rest,
            error,
            statusCode: error.code,
            connectionRefused: true,
            type: SET_APIERROR,
          });

          // The rest
        } else if (settings.actions_raising_api_errors.includes(action.type)) {
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
