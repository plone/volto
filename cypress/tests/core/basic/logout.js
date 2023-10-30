import { ploneAuth } from '../../../support/constants';

describe('Logout Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Log in').click();
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.get('#login').type(user).should('have.value', user);
    cy.get('#password').type(password).should('have.value', password);
    cy.get('#login-form-submit').click();
    cy.get('body').should('have.class', 'has-toolbar');
  });
  it('As registered user I can logout', function () {
    cy.get('#toolbar-personal').click();
    cy.get('#toolbar-logout').click();
    cy.getCookie('auth_key').should('not.exist');
  });
});
