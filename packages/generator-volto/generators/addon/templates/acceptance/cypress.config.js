const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/*.cy.{js,jsx}',
  },
});
