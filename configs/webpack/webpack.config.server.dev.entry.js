// this .entry.js file simply enables ES6 language features

require('babel-register');
module.exports = require(require('path').resolve(__dirname, 'webpack.config.server.dev'));
