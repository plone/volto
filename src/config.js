/**
 * Config.
 * @module config
 */

require('babel-polyfill');

/**
 * Environment object.
 * @constant environment
 * @type {Object}
 */
const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

/**
 * Config object.
 * @constant
 * @type {Object}
 */
module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  app: {
    title: 'Plone',
    description: 'Plone',
    head: {
      titleTemplate: 'Plone: %s',
      meta: [
        { name: 'description', content: 'Plone' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Plone' },
        { property: 'og:image', content: 'http://localhost:8080/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Plone' },
        { property: 'og:description', content: 'Plone' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@plone' },
        { property: 'og:creator', content: '@robgietema' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
}, environment);
