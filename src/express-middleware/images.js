import { getAPIResourceWithAuth } from '@plone/volto/helpers';

function imageMiddleware(req, res, next) {
  const { errorHandler } = req.app.locals;
  getAPIResourceWithAuth(req)
    .then((resource) => {
      function forwardHeaders(headers) {
        headers.forEach((header) => {
          if (resource.headers[header]) {
            res.set(header, resource.headers[header]);
          }
        });
      }
      // Just forward the headers that we need
      forwardHeaders(['content-type', 'content-disposition', 'cache-control']);
      res.send(resource.body);
    }, errorHandler)
    .catch(errorHandler);
}

export default function () {
  if (typeof __SERVER__ !== 'undefined' && __SERVER__) {
    const express = require('express');
    const middleware = express.Router();

    middleware.all(['**/@@images/*', '**/@@download/*'], imageMiddleware);
    middleware.id = 'staticResourcesProcessor';
    return middleware;
  }
}
