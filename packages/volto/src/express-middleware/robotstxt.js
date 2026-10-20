import express from 'express';
import { generateRobots } from '@plone/volto/helpers/Robots/Robots';

/*
robots.txt - priority order:

1) VOLTO_ROBOTSTXT var in .env
2) robots.txt setting in the site control panel

*/

const siteRobots = function (req, res, next) {
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
    middleware.all('**/robots.txt', siteRobots);
  }
  middleware.id = 'robots.txt';
  return middleware;
}
