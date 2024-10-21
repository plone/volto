import { ploneAuth } from '../../support/constants';

describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/fallback_login');
  });
  it('Check login redirect when the login is at another root', function () {
    const user = ploneAuth[0];
    const password = ploneAuth[1];

    cy.get('#login').type(user).should('have.value', user);
    cy.get('#password').type(password).should('have.value', password);
    cy.get('#login-form-submit').click();
    cy.wait(3000);
    cy.location('pathname').should('eq', '/');
  });
});
