'use strict';

const createPloneReact = require('./lib');
const messages = require('./lib/messages');

module.exports = {
  messages: messages,
  createPloneApp: createPloneReact,
};
