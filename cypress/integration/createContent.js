if (Cypress.env('API') !== 'guillotina') {
  context('createContent Acceptance Tests', () => {
    beforeEach(() => {
      cy.setCookie('confirm_privacy', 'confirmed');
    });

    it('Create document', function() {
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page');
      cy.get('.documentFirstHeading').should('have.text', 'My Page');
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    });
    it('Create document with path', function() {
      cy.autologin();
      cy.createContent('Document', 'container', 'My Container');
      cy.createContent('Document', 'child', 'My Child', '/container');
      cy.visit('/container/child');
      cy.get('.documentFirstHeading').should('have.text', 'My Child');
    });
    it('Create document with custom id', function() {
      cy.autologin();
      cy.createContent('Document', 'my-custom-id', 'My Page');
      cy.visit('/my-custom-id');
      cy.get('.documentFirstHeading').should('have.text', 'My Page');
    });
    it('Create folder', function() {
      cy.autologin();
      cy.createContent('Folder', 'my-folder', 'My Folder');
      cy.visit('/my-folder');
      cy.get('.documentFirstHeading').should('have.text', 'My Folder');
    });
  });
}
