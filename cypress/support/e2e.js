import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setupGuillotina, tearDownGuillotina } from './guillotina';
import { setup, teardown } from './reset-fixture';

before(function () {
  if (Cypress.env('API') === 'guillotina') {
    tearDownGuillotina({ allowFail: true });
  }
});

beforeEach(function () {
  cy.log('Setting up API fixture');

  // avoid a mysterious test failure with upgrade to slate-react 0.91.4
  const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
  Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false;
    }
  });

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

export * from './volto-slate';
