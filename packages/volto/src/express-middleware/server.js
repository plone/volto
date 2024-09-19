// import imagesMiddleware from './images.js';
// import filesMiddleware from './files.js';
// import robotstxtMiddleware from './robotstxt.js';
// import okMiddleware from './ok.js';
// import sitemapMiddleware from './sitemap.js';
// import staticsMiddleware from './static.js';
import devProxyMiddleware from './devproxy.js';

const settings = {
  expressMiddleware: [
    devProxyMiddleware(),
    // filesMiddleware(),
    // imagesMiddleware(),
    // robotstxtMiddleware(),
    // okMiddleware(),
    // sitemapMiddleware(),
    // staticsMiddleware(),
  ],
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

export { settings as serverSettings };
export default settings;
