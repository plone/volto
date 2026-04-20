import { ploneAuth } from '../../../support/constants';

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Log in').click();
  });
  it('As registered user I can login', function () {
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.get('#login').type(user).should('have.value', user);
    cy.get('#password').type(password).should('have.value', password);
    cy.get('#login-form-submit').click();
    cy.get('body').should('have.class', 'has-toolbar');
  });

  it('Shows an error when logging in with wrong credentials', function () {
    cy.reload();
    cy.get('#login').type('wrong-user');
    cy.get('#password').type('wrong-password');
    cy.get('#login-form-submit').click();

    cy.contains('.toast-inner-content h4', 'Login Failed', {
      timeout: 10000,
    }).should('be.visible');

    cy.get('#login-form-submit').should('not.have.class', 'loading');
  });
});
