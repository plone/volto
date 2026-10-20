import express from 'express';
import { getPloneBackendAPIResourceWithAuth } from '@plone/volto/helpers/Api/PloneBackendAPIResourceWithAuth';

const HEADERS = [
  'content-type',
  'content-disposition',
  'cache-status',
  'cache-control',
  'x-sendfile',
  'x-accel-redirect',
  'x-robots-tag',
];

function portraitMiddlewareFn(req, res, next) {
  getPloneBackendAPIResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.headers[header]) {
          res.set(header, resource.headers[header]);
        }
      });
      res.send(resource.body);
    })
    .catch(next);
}

export default function portraitsMiddleware() {
  const middleware = express.Router();

  middleware.all(['/@portrait/*'], portraitMiddlewareFn);
  middleware.id = 'portraitResourcesProcessor';
  return middleware;
}
