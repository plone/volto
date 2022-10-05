const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  chromeWebSecurity: false,
  projectId: 'hvviu4',
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['*~'],
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    // To be used inside Cypress only, does not affect the build
    apiBaseURL: 'http://localhost:55001/plone',
  },
});
