import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = [
  'cache-control',
  'content-disposition',
  'content-range',
  'content-type',
];

function fileMiddleware(req, res, next) {
  getAPIResourceWithAuth(req)
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

export default function () {
  const middleware = express.Router();

  middleware.all(['**/@@download/*', '**/@@display-file/*'], fileMiddleware);
  middleware.id = 'filesResourcesProcessor';
  return middleware;
}
