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
    const internalUrl =
      config.settings.internalApiPath ?? config.settings.apiPath;
    const request = superagent.get(`${internalUrl}/robots.txt`);
    request.set('Accept', 'text/plain');
    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.use(addHeadersFactory(req));
    request.end((error, { text }) => {
      if (error) {
        resolve(text || error);
      } else {
        // It appears that express does not take the x-forwarded headers into
        // consideration, so we do it ourselves.
        const {
          'x-forwarded-proto': forwardedProto,
          'x-forwarded-host': forwardedHost,
          'x-forwarded-port': forwardedPort,
        } = req.headers;
        const proto = forwardedProto ?? req.protocol;
        const host = forwardedHost ?? req.get('Host');
        const portNum = forwardedPort ?? req.get('Port');
        const port =
          (proto === 'https' && '' + portNum === '443') ||
          (proto === 'http' && '' + portNum === '80')
            ? ''
            : `:${portNum}`;
        // Plone has probably returned the sitemap link with the internal url.
        // If so, let's replace it with the current one.
        const url = `${proto}://${host}${port}`;
        text = text.replace(internalUrl, url);
        // Replace the sitemap with the sitemap index.
        text = text.replace('sitemap.xml.gz', 'sitemap-index.xml');
        resolve(text);
      }
    });
  });
