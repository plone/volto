import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['*~'],
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
