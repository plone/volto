/**
 * Api middleware.
 * @module middleware/api
 */

import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import union from 'lodash/union';
import { matchPath } from 'react-router';
import qs from 'query-string';

import config from '@plone/volto/registry';

import {
  GET_CONTENT,
  LOGIN,
  RESET_APIERROR,
  SET_APIERROR,
} from '@plone/volto/constants/ActionTypes';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { updateUploadedFiles } from '@plone/volto/actions/content/content';
import {
  toGettextLang,
  toReactIntlLang,
} from '@plone/volto/helpers/Utils/Utils';
import { getCookieOptions } from '@plone/volto/helpers/Cookies/cookies';
let socket = null;

/**
 *
 * Add configured expanders to an api call for an action
 * Requirements:
 *
 * - It should add the expanders set in the config settings
 * - It should preserve any query if present
 * - It should preserve (and add) any expand parameter (if present)
 * - It should take use the correct codification for arrays in querystring (repeated parameter for each member of the array)
 *
 * @function addExpandersToPath
 * @param {string} path The url/path including the querystring
 * @param {*} type The action type
 * @returns {string} The url/path with the configured expanders added to the query string
 */
export function addExpandersToPath(path, type, isAnonymous, isMultilingual) {
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
  ).filter(
    // Remove types for anonymous, translations unless multilingual
    (item) =>
      !(
        (item === 'types' && isAnonymous) ||
        (item === 'translations' && !isMultilingual)
      ),
  );

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
        querystring = querystring(config, acc);
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
let isHydrating = __CLIENT__ ? true : false;

const apiMiddlewareFactory =
  (api) =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { settings } = config;

    const state = getState();
    const token = state.userSession.token;
    let uploadedFiles = state.content.uploadedFiles;
    const isMultilingual = state.site.data.features?.multilingual;
    let isAnonymous = true;
    if (token) {
      const tokenExpiration = jwtDecode(token).exp;
      const currentTime = new Date().getTime() / 1000;
      isAnonymous = !token || currentTime > tokenExpiration;
    }
    const hasExistingError = state.content.get?.error;

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
                path: addExpandersToPath(
                  item.path,
                  type,
                  isAnonymous,
                  isMultilingual,
                ),
                id: type,
              }),
            ),
          )
        : sendOnSocket({
            ...request,
            path: addExpandersToPath(
              request.path,
              type,
              isAnonymous,
              isMultilingual,
            ),
            id: type,
          });
    } else {
      actionPromise = Array.isArray(request)
        ? mode === 'serial'
          ? request.reduce((prevPromise, item) => {
              return prevPromise.then((acc) => {
                return api[item.op](
                  addExpandersToPath(
                    item.path,
                    type,
                    isAnonymous,
                    isMultilingual,
                  ),
                  {
                    data: item.data,
                    type: item.type,
                    headers: item.headers,
                    params: request.params,
                    checkUrl: settings.actions_raising_api_errors.includes(
                      action.type,
                    ),
                    attach: item.attach,
                  },
                ).then((reqres) => {
                  if (action.subrequest === 'batch-upload') {
                    dispatch(updateUploadedFiles(++uploadedFiles));
                  }
                  return [...acc, reqres];
                });
              });
            }, Promise.resolve([]))
          : Promise.all(
              request.map((item) =>
                api[item.op](
                  addExpandersToPath(
                    item.path,
                    type,
                    isAnonymous,
                    isMultilingual,
                  ),
                  {
                    data: item.data,
                    type: item.type,
                    headers: item.headers,
                    params: request.params,
                    checkUrl: settings.actions_raising_api_errors.includes(
                      action.type,
                    ),
                    attach: item.attach,
                  },
                ),
              ),
            )
        : api[request.op](
            addExpandersToPath(request.path, type, isAnonymous, isMultilingual),
            {
              data: request.data,
              type: request.type,
              headers: request.headers,
              params: request.params,
              checkUrl: settings.actions_raising_api_errors.includes(
                action.type,
              ),
              attach: request.attach,
            },
          );
      actionPromise.then(
        (result) => {
          isHydrating = false;
          if (uploadedFiles !== 0) {
            dispatch(updateUploadedFiles(0));
          }

          const { settings } = config;
          const state = getState();
          if (state.apierror.connectionRefused) {
            next({
              ...rest,
              type: RESET_APIERROR,
            });
          }
          if (type === GET_CONTENT) {
            const lang = result?.language?.token;
            if (
              lang &&
              state.intl.locale !== toReactIntlLang(lang) &&
              !subrequest &&
              config.settings.supportedLanguages.includes(lang)
            ) {
              const langFileName = toGettextLang(lang);
              import(
                /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
              ).then((locale) => {
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
          try {
            return next({ ...rest, result, type: `${type}_SUCCESS` });
          } catch (error) {
            // There was an exception while processing reducers or downstream middleware.
            next({
              ...rest,
              error: { status: 500, error },
              type: `${type}_FAIL`,
            });
            // Rethrow the original exception on the client side only,
            // so it doesn't fall through to express on the server.
            if (__CLIENT__) throw error;
          }
        },
        (error) => {
          // Make sure an error during hydration
          // (for example when serving an archived page)
          // doesn't hide the SSR content.
          if (isHydrating && !hasExistingError) {
            isHydrating = false;
            return;
          }

          // Only SSR can set ECONNREFUSED
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
