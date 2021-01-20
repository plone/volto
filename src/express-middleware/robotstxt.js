export default function () {
  if (
    typeof __SERVER__ !== 'undefined' &&
    __SERVER__ &&
    process.env.VOLTO_ROBOTSTXT
  ) {
    const express = require('express');
    const middleware = express.Router();

    middleware.all('**/robots.txt', function (req, res) {
      res.type('text/plain');
      res.send(process.env.VOLTO_ROBOTSTXT);
    });
    middleware.id = 'robots.txt';
    return middleware;
  }
}
