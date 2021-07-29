/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import cookie from 'react-cookie';
import config from '@plone/volto/registry';

/**
 * Generate robots. Get robots from plone
 * @function generateRobots
 * @param {Object} req Request object
 * @return {string} Generated robots
 */
export const generateRobots = (req) =>
  new Promise((resolve) => {
    //const url = `${req.protocol}://${req.get('Host')}`;
    const request = superagent.get(
      `${
        config.settings.internalApiPath ?? config.settings.apiPath
      }/robots.txt`,
    );
    request.set('Accept', 'text/plain');

    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }

    request.end((error, { text }) => {
      if (error) {
        resolve(text || error);
      } else {
        resolve(text);
      }
    });
  });
