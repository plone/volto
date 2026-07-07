import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';
import staticsMiddleware from '@plone/volto/express-middleware/static';
import devProxyMiddleware from '@plone/volto/express-middleware/devproxy';

const devSource = __DEVELOPMENT__
  ? ` http://localhost:${parseInt(process.env.PORT || '3000') + 1}`
  : '';

const settings = {
  expressMiddleware: [
    devProxyMiddleware(),
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    sitemapMiddleware(),
    staticsMiddleware(),
  ],
  criticalCssPath: 'public/critical.css',
  csp: {
    'script-src': `'self' {nonce}${devSource}`,
  },
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
