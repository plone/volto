import { parse as parseUrl } from 'url';
const __DEVELOPMENT__ = true;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const apiPath =
  process.env.VITE_API_PATH ||
  (__DEVELOPMENT__ ? `http://${host}:${port}` : '');

const getServerURL = (url) => {
  if (!url) return;
  const apiPathURL = parseUrl(url);
  return `${apiPathURL.protocol}//${apiPathURL.hostname}${
    apiPathURL.port ? `:${apiPathURL.port}` : ''
  }`;
};

// Sensible defaults for publicURL
// if VITE_PUBLIC_URL is present, use it
// if in DEV, use the host/port combination by default
// if in PROD, assume it's VITE_API_PATH server name (no /api or alikes) or fallback
// to DEV settings if VITE_API_PATH is not present
const publicURL =
  process.env.VITE_PUBLIC_URL ||
  (__DEVELOPMENT__
    ? `http://${host}:${port}`
    : getServerURL(process.env.VITE_API_PATH) || `http://${host}:${port}`);

const networking = {
  host,
  port,
  apiPath,
  publicURL,
  // Internal proxy to bypass CORS *while developing*. NOT intended for production use.
  // In production is recommended you use a Seamless mode deployment using a web server in
  // front of both the frontend and the backend so you can bypass CORS safely.
  // https://6.docs.plone.org/volto/deploying/seamless-mode.html
  devProxyToApiPath:
    process.env.VITE_DEV_PROXY_API_PATH ||
    process.env.VITE_INTERNAL_API_PATH ||
    process.env.VITE_API_PATH ||
    'http://localhost:8080/Plone', // Set it to '' for disabling the proxy
  // proxyRewriteTarget Set it for set a custom target for the proxy or override the internal VHM rewrite
  // proxyRewriteTarget: '/VirtualHostBase/http/localhost:8080/Plone/VirtualHostRoot/_vh_api'
  // proxyRewriteTarget: 'https://myvoltositeinproduction.com'
  proxyRewriteTarget: process.env.VITE_PROXY_REWRITE_TARGET || undefined,
};

export default networking;
