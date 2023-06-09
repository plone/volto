import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = ['content-type', 'content-disposition', 'cache-control'];

function imageMiddleware(req, res, next) {
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

  middleware.all(['**/@@images/*'], imageMiddleware);
  middleware.all(['/@portrait/*'], imageMiddleware);
  middleware.id = 'imageResourcesProcessor';
  return middleware;
}
