if (Cypress.env('API') !== 'guillotina') {
  describe('Folder Contents Tests', () => {
    beforeEach(() => {
      // given a logged in editor
      // and a folder that contains a document
      // and the folder contents view
      cy.visit('/');
      cy.autologin();
      cy.createContent('Folder', 'my-folder', 'My Folder');
      cy.createContent('Document', 'my-document', 'My Document', 'my-folder');
      cy.visit('/my-folder/contents');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
    });

    it('Renaming via folder contents view', () => {
      // when I rename a content object
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon rename"]').click();
      cy.get('input[name="0_title"]')
        .clear()
        .type('Brand new document title');
      cy.get('input[name="0_id"]')
        .clear()
        .type('brand-new-document-title');
      cy.get('.modal button[title="Save"]').click();

      // then the new document title and ID should show up in the folder contents view
      cy.get('#content-core table')
        .contains('Brand new document title')
        .should('have.attr', 'href')
        .and('eq', '/my-folder/brand-new-document-title/contents');
    });

    it.only('Adding Publication date via folder contetns view', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon properties"]').click();
      cy.get('input[name="effective"]')
        .clear()
        .type('2017-06-01T08:30');
      cy.get('.modal button[title="Save"]').click();

      // then the new publication date should show up in the folder contents
      cy.get('#content-core table')
        .contains('2017-06-01')
        .should('have.attr', 'title')
        .and('eq', 'Thursday, June 1, 2017 8:30 AM');
    });
  });
}
