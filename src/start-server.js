/* eslint no-console: 0 */
import http from 'http';

import app from './server';

import * as Sentry from '@sentry/node';

import initSentry from './sentry';

initSentry(Sentry);

export default () => {
  const server = http.createServer(app);
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const bind_address = process.env.RAZZLE_BIND_ADDRESS || '0.0.0.0';

  let currentApp = app;

  server
    .listen(port, bind_address, () => {
      console.log(`API server (API_PATH) is set to: ${app.apiPath}`);
      if (__DEVELOPMENT__ && app.devProxyToApiPath)
        console.log(
          `Using internal proxy: http://${host}:${port}/api -> ${app.devProxyToApiPath}`,
        );
      console.log(`🎭 Volto started at http://${host}:${port} 🚀`);
    })
    .on('error', (e) => {
      console.error(e.message);
      throw e;
    });

  return () => {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
      console.log('🔁  HMR Reloading `./server`...');
      server.removeListener('request', currentApp);
      const newApp = require('./server').default; // eslint-disable-line global-require
      server.on('request', newApp);
      currentApp = newApp;
    });
  };
};
