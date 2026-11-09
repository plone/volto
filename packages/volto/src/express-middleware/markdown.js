// Proxies content requests to the backend when the Accept header prefers
// text/markdown, so that plone.rest can answer via content negotiation.

import express from 'express';
import config from '@plone/volto/registry';
import { createProxyMiddleware } from 'http-proxy-middleware';

const filter = function (pathname, req) {
  if (!pathname) return false;
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;

  // /++api++ is handled by the dev proxy (or the reverse proxy in production)
  if (pathname.startsWith(`${config.settings.subpathPrefix ?? ''}/++api++`)) {
    return false;
  }

  // req.accepts honors q-values and order. `*/*` resolves to the first
  // candidate (text/html), so browsers keep getting html.
  return req.accepts(['text/html', 'text/markdown']) === 'text/markdown';
};

let _env = null;

// the config is not available at the middleware creation time, so it needs to
// read/cache the global configuration on first request.
function getEnv() {
  if (_env) return _env;

  const { apiPath, internalApiPath, devProxyToApiPath } = config.settings;

  // public URL, used for the VirtualHostBase so the backend generates
  // correct URLs.
  const apiPathURL = new URL(apiPath);
  // where Node can actually reach the backend: the internal URL in
  // production, the dev proxy target in development.
  const backendURL = new URL(internalApiPath ?? devProxyToApiPath ?? apiPath);

  _env = {
    apiPathURL,
    serverURL: `${backendURL.protocol}//${backendURL.host}`,
    instancePath: backendURL.pathname.replace(/\/$/, ''),
  };
  return _env;
}

export default function markdownProxyMiddleware() {
  const middleware = express.Router();

  const markdownProxy = createProxyMiddleware(filter, {
    router: () => getEnv().serverURL,
    pathRewrite: (path, req) => {
      const { apiPathURL, instancePath } = getEnv();
      const { subpathPrefix } = config.settings;

      const vhSubpath = subpathPrefix
        ? subpathPrefix
            .split('/')
            .filter(Boolean)
            .map((part) => '/_vh_' + part)
            .join('')
        : '';
      const port =
        apiPathURL.port || (apiPathURL.protocol === 'https:' ? 443 : 80);

      const target = `/VirtualHostBase/${apiPathURL.protocol.slice(0, -1)}/${
        apiPathURL.hostname
      }:${port}${instancePath}/VirtualHostRoot${vhSubpath}`;

      return `${target}${
        subpathPrefix && path.startsWith(subpathPrefix)
          ? path.slice(subpathPrefix.length)
          : path
      }`;
    },
    changeOrigin: true,
    logLevel: process.env.DEBUG_HPM ? 'debug' : 'silent',
    ...(process.env.RAZZLE_DEV_PROXY_INSECURE && { secure: false }),
  });

  // the filter can't set headers, so Vary is set before the proxy.
  // it persists on the html fall-through too.
  middleware.use((req, res, next) => {
    res.vary('Accept');
    next();
  });
  middleware.all('*', markdownProxy);
  middleware.id = 'markdownProxy';

  return middleware;
}
