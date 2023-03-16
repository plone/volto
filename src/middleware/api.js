/**
 * Api middleware.
 * @module middleware/api
 */

import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { compact, flatten, union } from 'lodash';
import { matchPath } from 'react-router';
import qs from 'query-string';

import config from '@plone/volto/registry';

import {
  GET_CONTENT,
  LOGIN,
  RESET_APIERROR,
  SET_APIERROR,
} from '@plone/volto/constants/ActionTypes';
import { changeLanguage } from '@plone/volto/actions';
import { normalizeLanguageName, getCookieOptions } from '@plone/volto/helpers';
let socket = null;

/**
 *
 * Add configured expanders to an api call for an action
 * Requirements:
 *
 * - It should add the expanders set in the config settings
 * - It should preserve any query if present
 * - It should preserve (and add) any expand parameter (if present) e.g. translations
 * - It should take use the correct codification for arrays in querystring (repeated parameter for each member of the array)
 *
 * @function addExpandersToPath
 * @param {string} path The url/path including the querystring
 * @param {*} type The action type
 * @returns {string} The url/path with the configured expanders added to the query string
 */
export function addExpandersToPath(path, type, isAnonymous) {
  const { settings } = config;
  const { apiExpanders = [] } = settings;

  const {
    url,
    query: { expand, ...query },
  } = qs.parseUrl(path);

  const expandersFromConfig = apiExpanders
    .filter((expand) => matchPath(url, expand.match) && expand[type])
    .map((expand) => expand[type]);

  const expandMerge = compact(
    union([expand, ...flatten(expandersFromConfig)]),
  ).filter((item) => !(item === 'types' && isAnonymous)); // Remove types expander if isAnonymous

  const stringifiedExpand = qs.stringify(
    { expand: expandMerge },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  const querystringFromConfig = apiExpanders
    .filter((expand) => matchPath(url, expand.match) && expand[type])
    .reduce((acc, expand) => ({ ...acc, ...expand?.['querystring'] }), {});

  const queryMerge = { ...query, ...querystringFromConfig };

  const stringifiedQuery = qs.stringify(queryMerge, {
    encode: false,
  });

  if (stringifiedQuery && stringifiedExpand) {
    return `${url}?${stringifiedExpand}&${stringifiedQuery}`;
  } else if (!stringifiedQuery && stringifiedExpand) {
    return `${url}?${stringifiedExpand}`;
  } else if (stringifiedQuery && !stringifiedExpand) {
    return `${url}?${stringifiedQuery}`;
  } else {
    return url;
  }
}

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
const apiMiddlewareFactory = (api) => ({ dispatch, getState }) => (next) => (
  action,
) => {
  const { settings } = config;

  const isAnonymous = !getState().userSession.token;

  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { request, type, mode = 'parallel', ...rest } = action;
  const { subrequest } = action; // We want subrequest remains in `...rest` above

  let actionPromise;

  if (!request) {
    return next(action);
  }

  next({ ...rest, type: `${type}_PENDING` });

  if (socket) {
    actionPromise = Array.isArray(request)
      ? Promise.all(
          request.map((item) =>
            sendOnSocket({
              ...item,
              path: addExpandersToPath(item.path, type, isAnonymous),
              id: type,
            }),
          ),
        )
      : sendOnSocket({
          ...request,
          path: addExpandersToPath(request.path, type, isAnonymous),
          id: type,
        });
  } else {
    actionPromise = Array.isArray(request)
      ? mode === 'serial'
        ? request.reduce((prevPromise, item) => {
            return prevPromise.then((acc) => {
              return api[item.op](
                addExpandersToPath(item.path, type, isAnonymous),
                {
                  data: item.data,
                  type: item.type,
                  headers: item.headers,
                  params: request.params,
                  checkUrl: settings.actions_raising_api_errors.includes(
                    action.type,
                  ),
                },
              ).then((reqres) => {
                return [...acc, reqres];
              });
            });
          }, Promise.resolve([]))
        : Promise.all(
            request.map((item) =>
              api[item.op](addExpandersToPath(item.path, type, isAnonymous), {
                data: item.data,
                type: item.type,
                headers: item.headers,
                params: request.params,
                checkUrl: settings.actions_raising_api_errors.includes(
                  action.type,
                ),
              }),
            ),
          )
      : api[request.op](addExpandersToPath(request.path, type, isAnonymous), {
          data: request.data,
          type: request.type,
          headers: request.headers,
          params: request.params,
          checkUrl: settings.actions_raising_api_errors.includes(action.type),
        });
    actionPromise.then(
      (result) => {
        const { settings } = config;
        if (getState().apierror.connectionRefused) {
          next({
            ...rest,
            type: RESET_APIERROR,
          });
        }
        if (type === GET_CONTENT) {
          const lang = result?.language?.token;
          if (
            lang &&
            getState().intl.language !== lang &&
            !subrequest &&
            config.settings.supportedLanguages.includes(lang)
          ) {
            const langFileName = normalizeLanguageName(lang);
            import('~/../locales/' + langFileName + '.json').then((locale) => {
              dispatch(changeLanguage(lang, locale.default));
            });
          }
        }
        if (type === LOGIN && settings.websockets) {
          const cookies = new Cookies();
          cookies.set(
            'auth_token',
            result.token,
            getCookieOptions({
              expires: new Date(jwtDecode(result.token).exp * 1000),
            }),
          );
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

        // Check for actions who can raise api errors
        if (settings.actions_raising_api_errors.includes(action.type)) {
          // Gateway timeout
          if (error?.response?.statusCode === 504) {
            next({
              ...rest,
              error,
              statusCode: error.code,
              connectionRefused: true,
              type: SET_APIERROR,
            });
          }

          // Redirect
          else if (error?.code === 301) {
            next({
              ...rest,
              error,
              statusCode: error.code,
              connectionRefused: false,
              type: SET_APIERROR,
            });
          }

          // Redirect
          else if (error?.code === 408) {
            next({
              ...rest,
              error,
              statusCode: error.code,
              connectionRefused: false,
              type: SET_APIERROR,
            });
          }

          // Unauthorized
          else if (error?.response?.statusCode === 401) {
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

export default apiMiddlewareFactory;
