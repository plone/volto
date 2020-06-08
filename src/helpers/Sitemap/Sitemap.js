/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import { map } from 'lodash';
import cookie from 'react-cookie';
import zlib from 'zlib';

import { settings } from '~/config';

/**
 * Generate sitemap
 * @function generateSitemap
 * @param {Object} req Request object
 * @return {string} Generated sitemap
 */
export const generateSitemap = (req) =>
  new Promise((resolve) => {
    const url = `${req.protocol}://${req.get('Host')}`;
    const request = superagent.get(
      `${settings.apiPath}/@search?metadata_fields=modified&b_size=100000000`,
    );
    request.set('Accept', 'application/json');
    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.end((error, { body } = {}) => {
      if (error) {
        resolve(body || error);
      } else {
        const items = map(
          body.items,
          (item) =>
            `  <url>\n    <loc>${item['@id'].replace(
              settings.apiPath,
              url,
            )}</loc>\n    <lastmod>${item.modified}</lastmod>\n  </url>`,
        );
        const result = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${items.join(
          '\n',
        )}\n</urlset>`;
        zlib.gzip(Buffer.from(result, 'utf8'), (err, buffer) => {
          resolve(buffer);
        });
      }
    });
  });
