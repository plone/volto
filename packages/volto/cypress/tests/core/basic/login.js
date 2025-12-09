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

  it('Should stop loader and show error on 401 login failure', function () {
    // Intercept login request and return 401
    cy.intercept('POST', '**/@login', {
      statusCode: 401,
      body: {
        error: {
          message: 'Invalid credentials',
        },
      },
    }).as('loginFailed');

    // Fill in wrong credentials
    cy.get('#login').type('wronguser');
    cy.get('#password').type('wrongpassword');

    // Click submit button
    cy.get('#login-form-submit').click();

    // Wait for the failed login request
    cy.wait('@loginFailed');

    // Verify loader stops (button should not have loading class)
    cy.get('#login-form-submit').should('not.have.class', 'loading');

    // Verify error toast is displayed
    cy.contains('Login Failed').should('be.visible');
    cy.contains('Both email address and password are case sensitive').should(
      'be.visible',
    );
  });
});
