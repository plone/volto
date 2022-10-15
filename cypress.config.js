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
});
