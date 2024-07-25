import express from 'express';
import { generateRobots } from '@plone/volto/helpers';

/*
robots.txt - priority order:

1) robots.txt in /public folder
2) VOLTO_ROBOTSTXT var in .env
3) default: plone robots.txt

*/

const ploneRobots = function (req, res, next) {
  generateRobots(req).then((robots) => {
    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });
};

const envRobots = function (req, res, next) {
  res.type('text/plain');
  res.send(process.env.VOLTO_ROBOTSTXT);
};

export default function robotstxtMiddleware() {
  const middleware = express.Router();
  if (process.env.VOLTO_ROBOTSTXT) {
    middleware.all('**/robots.txt', envRobots);
  } else {
    middleware.all('**/robots.txt', ploneRobots);
  }
  middleware.id = 'robots.txt';
  return middleware;
}
