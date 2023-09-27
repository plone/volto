const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  chromeWebSecurity: false,
  projectId: 'hvviu4',
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['*~'],
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
  },
  setupNodeEvents(on, config) {
    on('before:browser:launch', (browser, launchOptions) => {
      if (browser.name === 'chrome' && browser.isHeadless) {
        launchOptions.args = launchOptions.args.map((arg) => {
          if (arg === '--headless') {
            return '--headless=new';
          }

          return arg;
        });
      }

      return launchOptions;
    });
  },
});
