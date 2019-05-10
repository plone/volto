/* eslint-disable no-console */
import http from 'http';

import app from './server';

export default () => {
  const server = http.createServer(app);

  let currentApp = app;

  server.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.log(error);
    }

    console.log('🚀 started');
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
