import express from 'express';
import {
  generateSitemap,
  generateSitemapIndex,
  SITEMAP_BATCH_SIZE,
} from '@plone/volto/helpers/Sitemap/Sitemap';

export const sitemap = function (req, res, next) {
  let start = 0;
  let size = undefined;
  const { batch: batchStr } = req.params;
  if (batchStr !== undefined) {
    const batch = parseInt(batchStr);
    if (isNaN(batch) || batch === 0 || '' + batch !== batchStr) {
      res.status(404);
      // Some data, such as the internal API address, may be sensitive to be published
      res.send(
        `Invalid sitemap name, use sitemap.xml.gz, or batched sitemapN.xml.gz where N is a positive integer.`,
      );
      return;
    }
    start = SITEMAP_BATCH_SIZE * (batch - 1);
    size = SITEMAP_BATCH_SIZE;
  }
  generateSitemap(req, start, size).then((sitemap) => {
    if (Buffer.isBuffer(sitemap)) {
      res.set('Content-Type', 'application/x-gzip');
      res.set(
        'Content-Disposition',
        `attachment; filename="sitemap${batchStr || ''}.xml.gz"`,
      );
      res.send(sitemap);
    } else {
      // {"errno":-111, "code":"ECONNREFUSED", "host": ...}
      res.status(500);
      // Some data, such as the internal API address, may be sensitive to be published
      res.send(`Sitemap generation error: ${sitemap.code ?? '-'}`);
    }
  });
};

export const sitemapIndex = function (req, res, next) {
  generateSitemapIndex(req).then((sitemapIndex) => {
    res.set('Content-Type', 'application/xml');
    res.set('Content-Disposition', 'attachment; filename="sitemap-index.xml"');
    res.send(sitemapIndex);
  });
};

export const sitemapIndexCompatibility = function (req, res, next) {
  generateSitemapIndex(req, true).then((sitemapIndex) => {
    res.set('Content-Type', 'application/x-gzip');
    res.set('Content-Disposition', 'attachment; filename="sitemap.xml.gz"');
    res.send(sitemapIndex);
  });
};

export default function sitemapMiddleware() {
  const middleware = express.Router();

  // For backwards compatibility, and allow a graceful transition for
  // sites that are already set up on the Google Search Console, we continue delivering
  // the new batched sitemap under the old sitemap.xml.gz name.
  middleware.all('**/sitemap.xml.gz', sitemapIndexCompatibility);
  middleware.all('**/sitemap:batch.xml.gz', sitemap);
  // For new setups, `sitemap-index.xml` should be added to the
  // Google Search Console.
  middleware.all('**/sitemap-index.xml', sitemapIndex);
  middleware.id = 'sitemap.xml.gz';
  return middleware;
}
