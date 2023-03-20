import express from 'express';
import path from 'path';
import config from '@plone/volto/registry';

const staticMiddleware = express.static(
  process.env.BUILD_DIR
    ? path.join(process.env.BUILD_DIR, 'public')
    : process.env.RAZZLE_PUBLIC_DIR,
  {
    setHeaders: function (res, path) {
      const pathLib = require('path');
      const base = pathLib.resolve(process.env.RAZZLE_PUBLIC_DIR);
      const relpath = path.substr(base.length);
      config.settings.serverConfig.staticFiles.some((elem) => {
        if (relpath.match(elem.match)) {
          for (const name in elem.headers) {
            res.setHeader(name, elem.headers[name] || 'undefined');
          }
          return true;
        }
        return false;
      });
    },
  },
);

export default function () {
  const middleware = express.Router();
  middleware.all('*', staticMiddleware);
  middleware.id = 'staticResourcesProcessor';
  return middleware;
}
