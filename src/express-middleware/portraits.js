import express from 'express';
import { getNonAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = ['content-type', 'content-disposition', 'cache-control'];

function portraitMiddleware(req, res, next) {
  getNonAPIResourceWithAuth(req)
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

  middleware.all(['**/portal_memberdata/portraits/*'], portraitMiddleware);
  middleware.id = 'portraitResourcesProcessor';
  return middleware;
}
