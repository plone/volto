/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import cookie from 'react-cookie';
import { toPublicURL } from '@plone/volto/helpers';
import { settings } from '~/config';

/**
 * Generate robots. Get robots from plone
 * @function generateRobots
 * @param {Object} req Request object
 * @return {string} Generated robots
 */
export const generateRobots = (req) =>
  new Promise((resolve) => {
    //const url = `${req.protocol}://${req.get('Host')}`;
    const request = superagent.get(`${settings.apiPath}/robots.txt`);
    request.set('Accept', 'text/plain');

    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }

    request.end((error, { text }) => {
      let robotstxt = toPublicURL(text); //to transform sitemap.xml.gz url

      if (error) {
        resolve(robotstxt || error);
      } else {
        resolve(robotstxt);
      }
    });
  });
