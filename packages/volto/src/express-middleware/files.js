import express from 'express';
import { defaultHttpProxyOptions } from '@plone/volto/helpers';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import config from '@plone/volto/registry';

const filesMiddlewareFn = createProxyMiddleware({
  ...defaultHttpProxyOptions,
  // ...config.settings.serverConfig?.httpProxyOptions,
  // ...config.settings.serverConfig?.httpProxyOptionsFiles,
});

export default function filesMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/@@download/*', '**/@@display-file/*'], filesMiddlewareFn);
  middleware.id = 'filesResourcesProcessor';
  return middleware;
}
