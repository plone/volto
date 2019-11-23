if (Cypress.env('API') !== 'guillotina') {
  describe('createContent Tests', () => {
    beforeEach(() => {
      cy.autologin();
    });

    it('Create document', function() {
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page');
      cy.get('.documentFirstHeading').should('have.text', 'My Page');
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    });
    it('Create document with path', function() {
      cy.createContent('Document', 'container', 'My Container');
      cy.createContent('Document', 'child', 'My Child', '/container');
      cy.visit('/container/child');
      cy.get('.documentFirstHeading').should('have.text', 'My Child');
    });
    it('Create document with custom id', function() {
      cy.createContent('Document', 'my-custom-id', 'My Page');
      cy.visit('/my-custom-id');
      cy.get('.documentFirstHeading').should('have.text', 'My Page');
    });
    it('Create News Item', function() {
      cy.createContent('News Item', 'my-news-item', 'My News Item');
      cy.visit('/my-news-item');
      cy.get('.documentFirstHeading').should('have.text', 'My News Item');
    });
    it('Create File', function() {
      cy.createContent('File', 'my-file', 'My File');
      cy.visit('/my-file');
      cy.get('.documentFirstHeading').should('have.text', 'My File');
      cy.get('.view-wrapper a').should(
        'have.attr',
        'href',
        '/my-file/@@download/file',
      );
      // cy.get('.view-wrapper a').click();
    });
    it('Create Image', function() {
      cy.createContent('Image', 'my-image', 'My Image');
      cy.visit('/my-image');
      cy.get('.documentFirstHeading').should('have.text', 'My Image');
      cy.get('.view-wrapper img')
        .should('have.attr', 'src')
        .and('include', '/my-image/@@images/');
      cy.get('.view-wrapper img').should('have.attr', 'alt', 'My Image');
      // cy.get('.view-wrapper a').click();
    });
  });
}
