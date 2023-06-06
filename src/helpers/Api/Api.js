/**
 * Api helper.
 * @module helpers/Api
 */

import superagent from 'superagent';
import Cookies from 'universal-cookie';
import config from '@plone/volto/registry';
import { addHeadersFactory } from '@plone/volto/helpers/Proxy/Proxy';
import { stripQuerystring } from '@plone/volto/helpers';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * Format the url.
 * @function formatUrl
 * @param {string} path Path (or URL) to be formatted.
 * @returns {string} Formatted path.
 */
function formatUrl(path) {
  const { settings } = config;
  const APISUFIX = settings.legacyTraverse ? '' : '/++api++';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  let apiPath = '';
  if (settings.internalApiPath && __SERVER__) {
    apiPath = settings.internalApiPath;
  } else if (settings.apiPath) {
    apiPath = settings.apiPath;
  }

  return `${apiPath}${APISUFIX}${adjustedPath}`;
}

/**
 * Api class.
 * @class Api
 */
class Api {
  /**
   * Constructor
   * @method constructor
   * @constructs Api
   */
  constructor(req) {
    const cookies = new Cookies();

    methods.forEach((method) => {
      this[method] = (
        path,
        { params, data, type, headers = {}, checkUrl = false } = {},
      ) => {
        let request;
        let promise = new Promise((resolve, reject) => {
          request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          let authToken;
          if (req) {
            // We are in SSR
            authToken = req.universalCookies.get('auth_token');
            request.use(addHeadersFactory(req));
          } else {
            authToken = cookies.get('auth_token');
          }
          if (authToken) {
            request.set('Authorization', `Bearer ${authToken}`);
          }

          request.set('Accept', 'application/json');

          if (type) {
            request.type(type);
          }

          Object.keys(headers).forEach((key) => request.set(key, headers[key]));

          if (data) {
            request.send(data);
          }

          request.end((err, response) => {
            if (
              checkUrl &&
              request.url &&
              request.xhr &&
              encodeURI(stripQuerystring(request.url)) !==
                stripQuerystring(request.xhr.responseURL)
            ) {
              if (request.xhr.responseURL?.length === 0) {
                return reject({
                  code: 408,
                  status: 408,
                  url: request.xhr.responseURL,
                });
              }
              return reject({
                code: 301,
                url: request.xhr.responseURL,
              });
            }
            return err ? reject(err) : resolve(response.body || response.text);
          });
        });
        promise.request = request;
        return promise;
      };
    });
  }
}

export default Api;
