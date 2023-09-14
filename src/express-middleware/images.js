import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = [
  'accept-ranges',
  'age',
  'cache-control',
  'content-disposition',
  'content-range',
  'content-type',
  'expires',
  'last-modified',
  'x-accel-redirect',
  'x-sendfile', // collective.sendfile
  'x-ids-involved', // collective.purgebyid
];

function imageMiddlewareFn(req, res, next) {
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

export default function imagesMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/@@images/*'], imageMiddlewareFn);
  middleware.all(['/@portrait/*'], imageMiddlewareFn);
  middleware.all(['/@@site-logo/*'], imageMiddlewareFn);
  middleware.id = 'imageResourcesProcessor';
  return middleware;
}
