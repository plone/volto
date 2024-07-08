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
import { changeLanguage, updateUploadedFiles } from '@plone/volto/actions';
import {
  toGettextLang,
  toReactIntlLang,
  getCookieOptions,
} from '@plone/volto/helpers';
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
  } = qs.parseUrl(path, { decode: false });

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
    .reduce((acc, expand) => {
      let querystring = expand?.['querystring'];
      // The querystring accepts being a function to be able to take other
      // config parameters
      if (typeof querystring === 'function') {
        querystring = querystring(config);
      }
      return { ...acc, ...querystring };
    }, {});

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
const apiMiddlewareFactory = (api) => {
  const { dispatch, getState } = arguments[1];
  const next = arguments[2];

  const handleRequest = (request, type, isAnonymous) => {
    const { settings } = config;
    const { subrequest } = arguments[3];

    if (socket) {
      return Array.isArray(request)
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
      return Array.isArray(request)
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
                    type,
                  ),
                },
              ).then((reqres) => {
                if (subrequest === 'batch-upload') {
                  dispatch(updateUploadedFiles(++uploadedFiles));
                }
                return [...acc, reqres];
              });
            });
          }, Promise.resolve([]))
        : api[request.op](
            addExpandersToPath(request.path, type, isAnonymous),
            {
              data: request.data,
              type: request.type,
              headers: request.headers,
              params: request.params,
              checkUrl: settings.actions_raising_api_errors.includes(type),
            },
          );
    }
  };

  const handleResponse = (result, type, subrequest) => {
    const { settings } = config;
    const { intl } = getState();

    if (getState().apierror.connectionRefused) {
      dispatch({ type: RESET_APIERROR });
    }

    if (type === GET_CONTENT) {
      const lang = result?.language?.token;
      if (
        lang &&
        intl.locale !== toReactIntlLang(lang) &&
        !subrequest &&
        config.settings.supportedLanguages.includes(lang)
      ) {
        const langFileName = toGettextLang(lang);
        import(`@root/../locales/${langFileName}.json`).then((locale) => {
          dispatch(changeLanguage(lang, locale.default));
        });
      }
    }

    if (type === LOGIN && settings.websockets) {
      const cookies = new Cookies();
      const token = result.token;
      cookies.set(
        'auth_token',
        token,
        getCookieOptions({
          expires: new Date(jwtDecode(token).exp * 1000),
        }),
      );

      api.get('/@wstoken').then((res) => {
        socket = new WebSocket(
          `${settings.apiPath.replace('http', 'ws')}/@ws?ws_token=${res.token}`,
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

    try {
      return dispatch({ type: `${type}_SUCCESS`, result });
    } catch (error) {
      dispatch({ type: `${type}_FAIL`, error: { status: 500, error } });
      if (__CLIENT__) {
        throw error;
      }
    }
  };

  const handleError = (error, type, subrequest) => {
    const { settings } = config;

    if (error.code === 'ECONNREFUSED') {
      dispatch({
        type: SET_APIERROR,
        error,
        statusCode: error.code,
        connectionRefused: true,
      });
    } else if (error.crossDomain) {
      dispatch({
        type: SET_APIERROR,
        error,
        statusCode: 'CORSERROR',
        connectionRefused: false,
      });
    } else if (settings.actions_raising_api_errors.includes(type)) {
      if (error?.response?.statusCode === 504) {
        dispatch({
          type: SET_APIERROR,
          error,
          statusCode: error.code,
          connectionRefused: true,
        });
      } else if (error?.code === 301) {
        dispatch({
          type: SET_APIERROR,
          error,
          statusCode: error.code,
          connectionRefused: false,
        });
      } else if (error?.code === 408) {
        dispatch({
          type: SET_APIERROR,
          error,
          statusCode: error.code,
          connectionRefused: false,
        });
      } else if (error?.response?.statusCode === 401) {
        dispatch({
          type: SET_APIERROR,
          error,
          statusCode: error.response,
          message: error.response.body.message,
          connectionRefused: false,
        });
      }
    }

    return dispatch({ type: `${type}_FAIL`, error });
  };

  return (action) => {
    const { request, type, mode = 'parallel', ...rest } = action;
    const token = getState().userSession.token;
    let uploadedFiles = getState().content.uploadedFiles;
    let isAnonymous = true;

    if (token) {
      const tokenExpiration = jwtDecode(token).exp;
      const currentTime = new Date().getTime() / 1000;
      isAnonymous = !token || currentTime > tokenExpiration;
    }

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    dispatch({ type: `${type}_PENDING` });

    const actionPromise = handleRequest(request, type, isAnonymous, rest);

    return actionPromise.then(
      (result) => handleResponse(result, type, rest.subrequest),
      (error) => handleError(error, type, rest.subrequest),
    );
  };
};
export default apiMiddlewareFactory;