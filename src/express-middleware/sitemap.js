import express from 'express';
import { generateSitemap } from '@plone/volto/helpers';

export const sitemap = function (req, res, next) {
  generateSitemap(req).then((sitemap) => {
    res.set('Content-Type', 'application/x-gzip');
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Disposition', 'attachment; filename="sitemap.xml.gz"');
    res.send(sitemap);
  });
};

export default function () {
  const middleware = express.Router();

  middleware.all('**/sitemap.xml.gz', sitemap);
  middleware.id = 'sitemap.xml.gz';
  return middleware;
}
