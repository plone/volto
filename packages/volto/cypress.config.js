import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  chromeWebSecurity: false,
  projectId: 'hvviu4',
  video: true, // To remove when Test Replay is available in cypress.io
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    excludeSpecPattern: ['*~'],
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
  },
});
