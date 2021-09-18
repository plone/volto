/**
 * Api helper.
 * @module helpers/Api
 */

import superagent from 'superagent';
import cookie from 'react-cookie';
import config from '@plone/volto/registry';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * Format the url.
 * @function formatUrl
 * @param {string} path Path (or URL) to be formatted.
 * @returns {string} Formatted path.
 */
function formatUrl(path) {
  const { settings } = config;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  let apiPath = '';
  if (settings.internalApiPath && __SERVER__) {
    apiPath = settings.internalApiPath;
  } else if (config.settings.apiPath) {
    apiPath = config.settings.apiPath;
  }
  return `${apiPath}${adjustedPath}`;
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
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, { params, data, type, headers = {} } = {}) => {
        let request;
        let promise = new Promise((resolve, reject) => {
          request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          const authToken = cookie.load('auth_token');
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

          request.end((err, response) =>
            err ? reject(err) : resolve(response.body || response.text),
          );
        });
        promise.request = request;
        return promise;
      };
    });
  }
}

export default Api;
