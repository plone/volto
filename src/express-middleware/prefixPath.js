import express from 'express';
import config from '@plone/volto/registry';

export const prefixPath = function (req, res, next) {
  // Re-direct to /prefix-path for all root calls
  if (config.settings.prefixPath) {
    res.redirect(config.settings.prefixPath);
  } else {
    next();
  }
};

export default function () {
  const middleware = express.Router({ strict: true });

  middleware.get('/', prefixPath);
  middleware.id = 'prefixPath';
  return middleware;
}
