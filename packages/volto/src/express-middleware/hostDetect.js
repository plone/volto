import express from 'express';
import config from '@plone/volto/registry';

function hostDetectionFn(req, res, next) {
  res.locals.apiPath = config.settings.apiPath;
  res.locals.devProxyToApiPath = config.settings.devProxyToApiPath;
  res.locals.proxyRewriteTarget = config.settings.proxyRewriteTarget;

  if (!import.meta.env.VOLTO_API_PATH && req.headers.host) {
    res.locals.detectedHost = `${
      req.headers['x-forwarded-proto'] || req.protocol
    }://${req.headers.host}`;
  }

  next();
}

export default function hostDetectionMiddleware() {
  const middleware = express.Router();

  middleware.all(['*'], hostDetectionFn);
  middleware.id = 'hostDetection';
  return middleware;
}
