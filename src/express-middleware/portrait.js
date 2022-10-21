import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = ['content-type', 'content-disposition', 'cache-control'];

function portraitMiddleware(req, res, next) {
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
  if (__SERVER__) {
    const express = require('express');
    const middleware = express.Router();

    middleware.all(['/@portrait/*'], portraitMiddleware);
    middleware.id = 'portraitResourcesProcessor';
    return middleware;
  }
}
