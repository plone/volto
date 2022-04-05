/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import config from '@plone/volto/registry';
import { addHeadersFactory } from '@plone/volto/helpers/Proxy/Proxy';

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
    request.set('x-forwarded-for', req.headers['x-forwarded-for']);
    request.set('x-forwarded-host', req.headers['x-forwarded-host']);

    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.use(addHeadersFactory(req));
    request.end((error, { text }) => {
      if (error) {
        resolve(text || error);
      } else {
        resolve(text);
      }
    });
  });
