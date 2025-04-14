import { ploneAuth } from '../../../tooling/cypress/support/constants';

describe('Login Route Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Sign in');
  });

  it('As registered user I can login', function () {
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.wait(300); // Something is wrong and the field is not there yet :( further investigate this behavior in the future
    cy.findByLabelText('username').type(user, { force: true });
    cy.findByLabelText('password').type(password, { force: true });
    cy.findByRole('button', { name: /Sign in/i }).click();
    cy.getCookie('auth_seven').should('exist');
  });

  it('As a registered user I can logout', function () {
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.wait(300); // Something is wrong and the field is not there yet :( further investigate this behavior in the future
    cy.findByLabelText('username').type(user, { force: true });
    cy.findByLabelText('password').type(password, { force: true });
    cy.findByRole('button', { name: /Sign in/i }).click();
    cy.getCookie('auth_seven').should('exist');
    cy.visit('/logout');
    cy.getCookie('auth_seven').should('not.exist');
  });
});
