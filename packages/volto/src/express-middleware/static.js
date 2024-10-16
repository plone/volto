import express from 'express';
import path from 'path';
import AddonConfigurationRegistry from '@plone/registry/addon-registry';
import config from '@plone/volto/registry';

const projectRootPath = path.resolve('.');
const registry = new AddonConfigurationRegistry(projectRootPath);

const staticDirectory = () => {
  if (process.env.BUILD_DIR) {
    return path.join(process.env.BUILD_DIR, 'public');
  }
  // Only for development, when Volto detects that it's working on itself (not an
  // old fashioned Volto project), there are add-ons (so it's the new setup) then
  // point to the public folder in the root of the setup, instead of the inner Volto
  // public folder.
  if (
    process.env.NODE_ENV !== 'production' &&
    !registry.isVoltoProject &&
    registry.addonNames.length > 0
  ) {
    return path.join(projectRootPath, '../../../public');
  }
  // Is always set (Razzle does it)
  return process.env.RAZZLE_PUBLIC_DIR;
};

const staticMiddlewareFn = express.static(staticDirectory(), {
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
});

export default function staticsMiddleware() {
  const middleware = express.Router();
  middleware.all('*', staticMiddlewareFn);
  middleware.id = 'staticResourcesProcessor';
  return middleware;
}
