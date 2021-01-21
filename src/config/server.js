import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';

const settings = {
  expressMiddleware: [
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    sitemapMiddleware(),
  ],
  criticalCssPath: 'public/critical.css',
  readCriticalCss: null, // so it will be defaultReadCriticalCss
};

export default settings;
