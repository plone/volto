import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import okMiddleware from '@plone/volto/express-middleware/ok';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';
import devProxyMiddleware from '@plone/volto/express-middleware/devproxy';

const settings = {
  expressMiddleware: [
    devProxyMiddleware(),
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    okMiddleware(),
    sitemapMiddleware(),
  ],
  criticalCssPath: 'public/critical.css',
  readCriticalCss: null, // so it will be defaultReadCriticalCss
  extractScripts: { errorPages: false },
};

export default settings;
