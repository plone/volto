/**
 * Config.
 * @module config
 */
const _ = require('lodash');

module.exports = _.defaults({},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_APTH,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8080/Plone',
  });
