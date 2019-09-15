import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setupGuillotina, tearDownGuillotina } from './guillotina';

beforeEach(function() {
  cy.log('Setting up API fixture');
  if (Cypress.env('API') === 'plone') {
    cy.exec('yarn cy:test:fixture:setup');
  } else {
    setupGuillotina();
  }
});

afterEach(function() {
  cy.log('Tearing down API fixture');
  if (Cypress.env('API') === 'plone') {
    cy.exec('yarn cy:test:fixture:teardown');
  } else {
    cy.clearCookies();
    tearDownGuillotina();
  }
});
