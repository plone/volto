/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import cookie from 'react-cookie';

import { apiPath, internalApiPath, maxResponseSize } from '~/config/settings';

/**
 * Get a resource image/file with authenticated (if token exist) API headers
 * @function getAPIResourceWithAuth
 * @param {Object} req Request object
 * @return {string} The response with the image
 */
export const getAPIResourceWithAuth = (req) =>
  new Promise((resolve, reject) => {
    let resultantApiPath = '';
    if (internalApiPath && __SERVER__) {
      resultantApiPath = internalApiPath;
    } else {
      resultantApiPath = apiPath;
    }
    const request = superagent
      .get(`${resultantApiPath}${req.path}`)
      .maxResponseSize(maxResponseSize)
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
