import express from 'express';
import { generateSitemap } from '@plone/volto/helpers';

export const sitemap = function (req, res, next) {
  generateSitemap(req).then((sitemap) => {
    if (Buffer.isBuffer(sitemap)) {
      res.set('Content-Type', 'application/x-gzip');
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Disposition', 'attachment; filename="sitemap.xml.gz"');
      res.send(sitemap);
    } else {
      // {"errno":-111, "code":"ECONNREFUSED", "host": ...}
      res.status(500);
      // Some data, such as the internal API address, may be sensitive to be published
      res.send(`Sitemap generation error: ${sitemap.code ?? '-'}`);
    }
  });
};

export default function () {
  const middleware = express.Router();

  middleware.all('**/sitemap.xml.gz', sitemap);
  middleware.id = 'sitemap.xml.gz';
  return middleware;
}
