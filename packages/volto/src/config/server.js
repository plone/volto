import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import okMiddleware from '@plone/volto/express-middleware/ok';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';
import staticsMiddleware from '@plone/volto/express-middleware/static';
import devProxyMiddleware from '@plone/volto/express-middleware/devproxy';

const settings = {
  expressMiddleware: [
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    okMiddleware(),
    sitemapMiddleware(),
    staticsMiddleware(),
  ],
  expressMiddlewareDev: [devProxyMiddleware()],
  criticalCssPath: 'public/critical.css',
  readCriticalCss: null, // so it will be defaultReadCriticalCss
  staticFiles: [
    {
      id: 'root_static',
      match: /^\/static\/.*/,
      headers: {
        // stable resources never change. 31536000 seconds == 365 days
        'Cache-Control': 'public, max-age=31536000',
      },
    },
    {
      id: 'all',
      match: /.*/,
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    },
  ],
};

export default settings;
