import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setup, teardown } from './reset-fixture';

beforeEach(function () {
  cy.log('Setting up API fixture');
  setup();
});

afterEach(function () {
  cy.log('Tearing down API fixture');
  teardown();
});
