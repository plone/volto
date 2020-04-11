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
      cy.get('i[value="/my-folder/my-document"]').click();
      cy.get('i[title="Rename"]').click();
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
  });
}
