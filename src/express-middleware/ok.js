import express from 'express';
import config from '@plone/volto/registry';

const ok = function (req, res, next) {
  res.type('text/plain');
  res.send('ok');
};

export default function () {
  const middleware = express.Router();
  middleware.all(config?.settings?.okRoute || '/ok', ok);
  middleware.id = 'ok';
  return middleware;
}
