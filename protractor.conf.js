require("babel-core/register")({
    presets: [
        "es2015"
    ]
});

exports.config = {
  specs: ['./src/**/*.e2e.js'],
  directConnect: true,
  chromeOnly: true,
  capabilities: {
    browserName: 'chrome',
  },
  baseUrl: 'http://localhost:8080',
  framework: 'jasmine',
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },
};
