import config from '@plone/volto/registry';

/**
 * Create a function that add X-Forwarded Headers to superagent requests
 * @function addHeadersFactory
 * @param {Object} req Original request object
 * @return {function} Superagent request function
 */

export const addHeadersFactory = (orig) => {
  return (request) => {
    const x_forwarded_host = orig.headers['x-forwarded-host'] || orig.hostname;
    const x_forwarded_for = orig.headers['x-forwarded-for'];
    const remote_host = orig.connection.remoteAddress;
    if (x_forwarded_for && remote_host) {
      request.set('x-forwarded-for', x_forwarded_for + ', ' + remote_host);
    } else if (remote_host) {
      request.set('x-forwarded-for', remote_host);
    } else if (x_forwarded_for) {
      request.set('x-forwarded-for', x_forwarded_for);
    }
    x_forwarded_host && request.set('x-forwarded-host', x_forwarded_host);
  };
};

export const defaultHttpProxyOptions = {
  // we don't need/want that for proxying binary
  // pathRewrite: (path, req) => {
  //   return `${config.settings.legacyTraverse ? '' : '/++api++'}${path}`;
  // },
  router: (req) => {
    if (config.settings.internalApiPath && __SERVER__) {
      return config.settings.internalApiPath;
    } else if (__DEVELOPMENT__ && config.settings.devProxyToApiPath) {
      return config.settings.devProxyToApiPath;
    } else {
      return config.settings.apiPath;
    }
  },
  onProxyReq: (proxyReq, req, res) => {
    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      proxyReq.setHeader('Authorization', `Bearer ${authToken}`);
    }
  },
  xfwd: true,
};
