import superagent from 'superagent';
import config from '@plone/volto/registry';

/**
 * Get a resource image/file with authenticated (if token exist) API headers WITHOUT API
 * @function getAPIResourceWithAuth
 * @param {Object} req Request object
 * @return {string} The response with the image
 */
export const getNonAPIResourceWithAuth = (req) =>
  new Promise((resolve, reject) => {
    const { settings } = config;
    // Set APISUFFIX to empty string
    // const APISUFIX = settings.legacyTraverse ? '' : '/++api++';
    const APISUFIX = '';

    let apiPath = '';
    if (settings.internalApiPath && __SERVER__) {
      apiPath = settings.internalApiPath;
    } else if (__DEVELOPMENT__ && settings.devProxyToApiPath) {
      apiPath = settings.devProxyToApiPath;
    } else {
      apiPath = settings.apiPath;
    }

    const request = superagent
      .get(`${apiPath}${APISUFIX}${req.path}`)
      .maxResponseSize(settings.maxResponseSize)
      .responseType('blob');
    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.then(resolve).catch(reject);
  });
