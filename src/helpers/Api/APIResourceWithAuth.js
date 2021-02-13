/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import cookie from 'react-cookie';
import config from '@plone/volto/registry';

/**
 * Get a resource image/file with authenticated (if token exist) API headers
 * @function getAPIResourceWithAuth
 * @param {Object} req Request object
 * @return {string} The response with the image
 */
export const getAPIResourceWithAuth = (req) =>
  new Promise((resolve, reject) => {
    const { settings } = config;
    let apiPath = '';
    if (settings.internalApiPath && __SERVER__) {
      apiPath = settings.internalApiPath;
    } else {
      apiPath = settings.apiPath;
    }
    const request = superagent
      .get(`${apiPath}${req.path}`)
      .maxResponseSize(settings.maxResponseSize)
      .responseType('blob');
    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.end((error, res = {}) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
