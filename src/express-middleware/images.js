import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = ['content-type', 'content-disposition', 'cache-control'];

function imageMiddleware(req, res, next) {
  const { errorHandler } = req.app.locals;
  getAPIResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.headers[header]) {
          res.set(header, resource.headers[header]);
        }
      });

      res.send(resource.body);
    }, errorHandler)
    .catch(errorHandler);
}

export default function () {
  const middleware = express.Router();

  middleware.all(['**/@@images/*'], imageMiddleware);
  middleware.id = 'imageResourcesProcessor';
  return middleware;
}
