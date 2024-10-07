import superagent from 'superagent';
import config from '@plone/volto/registry';
import { addHeadersFactory } from '@plone/volto/helpers/Proxy/Proxy';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import express from 'express';
import bodyparser from 'body-parser';

const HEADERS = [
  'accept',
  'connection',
  'content-type',
  'content-disposition',
  'cache-control',
  'tus-extension',
  'tus-resumable',
  'tus-version',
  'upload-length',
  'upload-metadata',
  'upload-offset',
  'location',
];

/**
 * Get a resource image/file with authenticated (if token exist) API headers
 * @function getAPIResourceWithAuth
 * @param {Object} req Request object
 * @return {string} The response with the image
 */
export const getResourceWithAuth = (req) =>
  new Promise((resolve, reject) => {
    const { settings } = config;

    let apiPath = '';
    if (settings.internalApiPath && __SERVER__) {
      apiPath = settings.internalApiPath;
    } else if (__DEVELOPMENT__ && settings.devProxyToApiPath) {
      apiPath = settings.devProxyToApiPath;
    } else {
      apiPath = settings.apiPath;
    }
    const method = req.method;

    // Use VirtualHostMonster to ensure urls returned by the backend are
    // accessible to the client. Important if there are event handlers in Plone
    // that need to make use of the public url, such as email links to content.
    let apiURL = new URL(apiPath);
    let apiSite = apiURL.pathname ? `${apiURL.pathname}` : '/';
    let path = `${apiURL.protocol}//${apiURL.hostname}:${apiURL.port}/VirtualHostBase/${req.protocol}/${req.get('host')}${apiSite}/VirtualHostRoot${req.path}`;
    const request = superagent(method, path)
      .maxResponseSize(settings.maxResponseSize)
      .responseType('json');

    if (method === 'PATCH') {
      request.send(req.body);
    }

    const authToken = req.universalCookies.get('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }

    //request.set('Accept', 'application/json');
    //request.set('Authorization', 'Basic YWRtaW46YWRtaW4=');
    request.use(addHeadersFactory(req));
    HEADERS.forEach((header) => {
      if (req.headers[header]) {
        if (header === 'accept' && req.headers[header] === '*/*') {
          request.set('Accept', 'application/json');
        } else {
          request.set(header, req.headers[header]);
        }
      }
    });
    request.then(resolve).catch(reject);
  });

function uploadMiddleware(req, res, next) {
  getResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.headers[header]) {
          if (header === 'location') {
            res.set(header, flattenToAppURL(resource.headers[header]));
          } else {
            res.set(header, resource.headers[header]);
          }
        }
      });
      res.status(resource.statusCode).send(resource.body);
    })
    .catch(next);
}

export default function createUploadMiddleware() {
  if (__SERVER__) {
    const middleware = express.Router();
    middleware.use(bodyparser.raw());
    middleware.all(
      ['**/@tus-upload/:location'],
      bodyparser.raw({ type: 'application/*', limit: '60mb' }),
      uploadMiddleware,
    );
    middleware.all(['**/@tus-upload'], uploadMiddleware);
    middleware.id = 'uploadResourcesProcessor';
    return middleware;
  }
}
