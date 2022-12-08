import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';
import staticsMiddleware from '@plone/volto/express-middleware/static';
import devProxyMiddleware from '@plone/volto/express-middleware/devproxy';
import prefixPathMiddleware from '@plone/volto/express-middleware/prefixPath';

const settings = {
  expressMiddleware: [
    devProxyMiddleware(),
    prefixPathMiddleware(),
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    sitemapMiddleware(),
    staticsMiddleware(),
  ],
  criticalCssPath: 'public/critical.css',
  readCriticalCss: null, // so it will be defaultReadCriticalCss
  extractScripts: { errorPages: false },
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
