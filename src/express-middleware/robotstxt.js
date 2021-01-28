import express from 'express';

export default function () {
  if (process.env.VOLTO_ROBOTSTXT) {
    const middleware = express.Router();

    middleware.all('**/robots.txt', function (req, res) {
      res.type('text/plain');
      res.send(process.env.VOLTO_ROBOTSTXT);
    });
    middleware.id = 'robots.txt';

    return middleware;
  }
}
