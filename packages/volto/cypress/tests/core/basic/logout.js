import { ploneAuth } from '../../../support/constants';

describe('Logout Tests', () => {
  const subpathPrefix = Cypress.env('subpathPrefix') || '';

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

  it('Clears authenticated actions and navigation when the logout landing page is private', function () {
    cy.createContent({
      contentType: 'Document',
      contentId: 'private-page',
      contentTitle: 'Private Page',
    });
    cy.visit('/private-page');
    cy.get('#navigation').contains('Private Page').should('be.visible');
    cy.window().should((win) => {
      expect(
        win.store.getState().actions.actions.user.map((action) => action.id),
      ).to.include('logout');
    });

    cy.intercept('GET', '/**/private-page?expand*', (req) => {
      if (!req.headers.authorization) {
        req.alias = 'anonymousPrivateContent';
      }
    });
    cy.intercept('POST', '/**/@logout').as('logout');
    cy.get('#toolbar-personal').click();
    cy.get('#toolbar-logout').click();
    cy.wait('@logout');
    cy.wait('@anonymousPrivateContent')
      .its('response.statusCode')
      .should('eq', 401);
    cy.location('pathname').should('eq', `${subpathPrefix}/private-page/login`);
    cy.getCookie('auth_token').should('not.exist');
    cy.get('#navigation').should('not.contain', 'Private Page');
    cy.window().should((win) => {
      const state = win.store.getState();
      expect(state.userSession.token).to.equal(null);
      expect(state.actions.actions.user).to.deep.equal([]);
      expect(state.navigation.items).to.deep.equal([]);
    });
  });
});
