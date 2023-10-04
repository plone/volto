/* eslint no-console: 0 */
import dns from 'dns';
import http from 'http';

import app from './server';
import debug from 'debug';

export default function server() {
  // If DNS returns both ipv4 and ipv6 addresses, prefer ipv4
  dns.setDefaultResultOrder('ipv4first');

  const server = http.createServer(app);
  // const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const bind_address = process.env.RAZZLE_BIND_ADDRESS || '0.0.0.0';

  let currentApp = app;

  server
    .listen(port, bind_address, () => {
      if (app.apiPath === app.publicURL || !app.apiPath) {
        console.log(`Volto is running in SEAMLESS mode`);
      } else {
        console.log(`API server (API_PATH) is set to: ${app.apiPath}`);
      }
      if (app.devProxyToApiPath)
        console.log(
          `Proxying API requests from ${app.publicURL}/++api++ to ${
            app.devProxyToApiPath
          }${app.proxyRewriteTarget || ''}`,
        );
      console.log(`🎭 Volto started at ${bind_address}:${port} 🚀`);

      if (!process.env.RAZZLE_PUBLIC_URL)
        debug('config')(`Current public URL: ${app.publicURL}`);
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
}
