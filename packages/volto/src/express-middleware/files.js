import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = [
  'accept-ranges',
  'cache-control',
  'content-disposition',
  'content-range',
  'content-type',
  'x-sendfile',
  'x-accel-redirect',
  'x-robots-tag',
];

function filesMiddlewareFn(req, res, next) {
  getAPIResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.headers[header]) {
          res.set(header, resource.get(header));
        }
      });
      res.status(resource.statusCode);
      res.send(resource.body);
    })
    .catch(next);
}

export default function filesMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/@@download/*', '**/@@display-file/*'], filesMiddlewareFn);
  middleware.id = 'filesResourcesProcessor';
  return middleware;
}
