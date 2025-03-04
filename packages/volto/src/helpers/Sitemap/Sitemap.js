/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import { map } from 'lodash';
import zlib from 'zlib';
import { toPublicURL } from '@plone/volto/helpers';
import { addHeadersFactory } from '@plone/volto/helpers/Proxy/Proxy';

import config from '@plone/volto/registry';

export const SITEMAP_BATCH_SIZE = 5000;

/**
 * Generate sitemap
 * @function generateSitemap
 * @param {Object} _req Request object
 * @return {string} Generated sitemap
 */
export const generateSitemap = (_req, start = 0, size = undefined) =>
  new Promise((resolve) => {
    const { settings } = config;
    const APISUFIX = settings.legacyTraverse ? '' : '/++api++';
    const apiPath = settings.internalApiPath ?? settings.apiPath;
    const request = superagent.get(
      `${apiPath}${APISUFIX}/@search?metadata_fields=modified&b_start=${start}&b_size=${
        size !== undefined ? size : 100000000
      }&use_site_search_settings=1`,
    );
    request.set('Accept', 'application/json');
    request.use(addHeadersFactory(_req));
    const authToken = _req.universalCookies.get('auth_token');
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
            `  <url>\n    <loc>${toPublicURL(item['@id'])}</loc>\n
            <lastmod>${item.modified}</lastmod>\n  </url>`,
        );
        const result = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${items.join(
          '\n',
        )}\n</urlset>`;
        zlib.gzip(Buffer.from(result, 'utf8'), (_err, buffer) => {
          resolve(buffer);
        });
      }
    });
  });

/**
 * Generate sitemap
 * @function generateSitemapIndex
 * @param {Object} _req Request object
 * @return {string} Generated sitemap index
 */
export const generateSitemapIndex = (_req) =>
  new Promise((resolve) => {
    const { settings } = config;
    const APISUFIX = settings.legacyTraverse ? '' : '/++api++';
    const apiPath = settings.internalApiPath ?? settings.apiPath;
    const request = superagent.get(
      `${apiPath}${APISUFIX}/@search?metadata_fields=modified&b_size=0&use_site_search_settings=1`,
    );
    request.set('Accept', 'application/json');
    const authToken = _req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.end((error, { body } = {}) => {
      if (error) {
        resolve(body || error);
      } else {
        const items = Array.from(
          { length: Math.ceil(body.items_total / SITEMAP_BATCH_SIZE) },
          (_, i) =>
            `  <sitemap>
    <loc>${toPublicURL('/sitemap' + (i + 1) + '.xml.gz')}</loc>
  </sitemap>`,
        );
        const result = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}\n</sitemapindex>`;
        resolve(result);
      }
    });
  });
