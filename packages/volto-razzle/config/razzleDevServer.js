#! /usr/bin/env node
'use strict';

const devServer = require('webpack-dev-server');

class razzleDevServer extends devServer {
  constructor(compiler, options = {}, _log) {
    const verbose = options.verbose || false;
    delete options['verbose'];
    super(options, compiler, _log);
    this.verbose = verbose;
  }

  showStatus() {
    if (this.verbose) {
      super.showStatus();
    }
  }
}

module.exports = razzleDevServer;
