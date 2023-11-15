import express from 'express';
import { defaultHttpProxyOptions } from '@plone/volto/helpers';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import config from '@plone/volto/registry';

const imageMiddlewareFn = createProxyMiddleware({
  ...defaultHttpProxyOptions,
  // ...config.settings.serverConfig?.httpProxyOptions,
  // ...config.settings.serverConfig?.httpProxyOptionsImages,
});

export default function imagesMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/@@images/*'], imageMiddlewareFn);
  middleware.all(['/@portrait/*'], imageMiddlewareFn);
  middleware.all(['/@@site-logo/*'], imageMiddlewareFn);
  middleware.id = 'imageResourcesProcessor';
  return middleware;
}
