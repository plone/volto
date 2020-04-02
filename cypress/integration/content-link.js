if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
    beforeEach(() => {
      // given a logged in editor and the portal root
      cy.autologin();
      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });

    it('As an editor I can add a link', function() {
      // when I add a new link
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-link').click();
      cy.get('input[name="title"]')
        .type('Link to Google')
        .should('have.value', 'Link to Google');
      cy.get('input[name="remoteUrl"]')
        .type('https://google.com')
        .should('have.value', 'https://google.com');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/link-to-google');

      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the link view should show the link
      cy.get('h1.documentFirstHeading').contains('Link to Google');
      cy.get('.ui.container span a')
        .should('have.attr', 'href')
        .and('eq', 'https://google.com');
    });
    it('As a anonymous user I am redirected when accessing a link', function() {
      cy.createContent('Link', 'my-link', 'My Link', '', 'https://google.com');
      cy.wait(2000);
      cy.visit('/');
      cy.workflow('my-link', 'publish');
      cy.visit('/my-link');
      // cy.clearCookies();
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.get('#toolbar-personal').click();
      cy.get('#toolbar-logout').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/logout');
      cy.visit('/my-link');
      cy.url().should('eq', 'https://google.com');
    });
  });
}
