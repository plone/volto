import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setupGuillotina, tearDownGuillotina } from './guillotina';
import { setup, teardown } from './reset-fixture';

Cypress.on('uncaught:exception', (err) => {
  // We are getting this error in Cypress tests but we don't use ResizeObserver ourselves
  if (/ResizeObserver loop/.test(err.message)) {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  }
});

before(function () {
  if (Cypress.env('API') === 'guillotina') {
    tearDownGuillotina({ allowFail: true });
  }
});

beforeEach(function () {
  cy.log('Setting up API fixture');
  if (Cypress.env('API') === 'guillotina') {
    setupGuillotina();
  } else {
    setup();
  }
});

afterEach(function () {
  cy.log('Tearing down API fixture');
  if (Cypress.env('API') === 'guillotina') {
    cy.clearCookies();
    tearDownGuillotina();
  } else {
    teardown();
  }
});
