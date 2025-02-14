/**
 * Robots helper.
 * @module helpers/Robots
 */

import superagent from 'superagent';

import config from '@plone/volto/registry';
import { formatUrl } from '@plone/volto/helpers/Api/Api';
import { addHeadersFactory } from '@plone/volto/helpers/Proxy/Proxy';

/**
 * Generate robots. Get robots from plone
 * @function generateRobots
 * @param {Object} req Request object
 * @return {string} Generated robots
 */
export const generateRobots = (req) =>
  new Promise((resolve) => {
    const request = superagent.get(formatUrl('@site'));
    request.set('Accept', 'application/json');
    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.use(addHeadersFactory(req));
    request.end((error, { text, body }) => {
      if (error) {
        resolve(text || error);
      } else {
        resolve(
          body['plone.robots_txt']
            .replace('{portal_url}', config.settings.publicURL)
            .replace('sitemap.xml.gz', 'sitemap-index.xml'),
        );
      }
    });
  });
