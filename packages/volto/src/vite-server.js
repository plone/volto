import fs from 'node:fs/promises';
import express from 'express';
import getPort, { portNumbers } from 'get-port';
import dns from 'dns';
import cookiesMiddleware from 'universal-cookie-express';
import { serverSettings } from './express-middleware/server.js';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

// If DNS returns both ipv4 and ipv6 addresses, prefer ipv4

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  dns.setDefaultResultOrder('ipv4first');
  const app = express();

  const prodIndexHtml = isProd
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : '';

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
    app.use(cookiesMiddleware());
  } else {
    const sirv = (await import('sirv')).default;
    app.use((await import('compression')).default());
    app.use('/', sirv('./dist/client', { extensions: [] }));
  }

  // This is the loader of the former "Seamless" mode parameters from the headers
  app.all('*', function NetworkParamsDetection(req, res, next) {
    if (!process.env.VITE_API_PATH && req.headers.host) {
      res.locals.detectedHost = `${
        req.headers['x-forwarded-proto'] || req.protocol
      }://${req.headers.host}`;
      // config.settings.apiPath = res.locals.detectedHost;
      // config.settings.publicURL = res.locals.detectedHost;
    }

    next();
  });

  // Loads the Express server middleware from the settings.
  // We no longer load them in the server file, since it's an Express-only config
  // we avoid to have to exclude it explicitly from the build (and all the deps do
  // not get in the server build either)
  const middleware = (serverSettings.expressMiddleware || []).filter((m) => m);
  if (middleware.length) app.use('/', middleware);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      if (url.includes('.')) {
        console.warn(`${url} is not valid router path`);
        res.status(404);
        res.end(`${url} is not valid router path`);
        return;
      }

      // Extract the head from vite's index transformation hook
      let viteHead = !isProd
        ? await vite.transformIndexHtml(
            url,
            `<html><head></head><body></body></html>`,
          )
        : prodIndexHtml;

      viteHead = viteHead.substring(
        viteHead.indexOf('<head>') + 6,
        viteHead.indexOf('</head>'),
      );

      const entry = await (async () => {
        if (!isProd) {
          return vite.ssrLoadModule('/src/entry-server.tsx');
        } else {
          return import('./dist/server/entry-server.js');
        }
      })();

      console.log('Rendering: ', url, '...');
      entry.render({
        req,
        res,
        url,
        head: isProd ? viteHead : '',
      });
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(async ({ app }) =>
    app.listen(
      await getPort({ port: portNumbers(3000, 3100) }),
      '0.0.0.0',
      () => {
        console.log('Client Server: http://localhost:3000');
      },
    ),
  );
}
