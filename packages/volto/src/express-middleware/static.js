import express from 'express';
import path from 'path';
import AddonConfigurationRegistry from '@plone/registry/src/addon-registry';
import config from '@plone/volto/registry';

const projectRootPath = path.resolve('.');
const registry = new AddonConfigurationRegistry(projectRootPath);

const staticMiddlewareFn = express.static(
  // Looks if voltoConfigJS has a publicPath, if not, uses RAZZLE_PUBLIC_DIR (which
  // the default is `./public` from RAZZLE itself
  process.env.BUILD_DIR
    ? path.join(process.env.BUILD_DIR, 'public')
    : registry.voltoConfigJS.publicPath || process.env.RAZZLE_PUBLIC_DIR,
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

export default function staticsMiddleware() {
  const middleware = express.Router();
  middleware.all('*', staticMiddlewareFn);
  middleware.id = 'staticResourcesProcessor';
  return middleware;
}
