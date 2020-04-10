if (Cypress.env('API') !== 'guillotina') {
  describe('Folder Contents Tests', () => {
    beforeEach(() => {
      // given a logged in editor
      // and a folder that contains a document
      // and the folder contents view
      cy.visit('/');
      cy.autologin();
      cy.createContent('Folder', 'my-folder', 'My Folder');
      cy.createContent('Folder', 'my-folder-2', 'MY Second Folder');
      cy.createContent('Document', 'my-document', 'My Document', 'my-folder');
      cy.createContent('Document', 'my-document', 'My Document', 'my-folder-2');
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

    it('Adding Publication date via folder contetns view', () => {
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

    it('Adding Expiration date via folder content view', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon properties"]').click();
      cy.get('input[name="expires"]')
        .clear()
        .type('2017-06-20T08:30');
      cy.get('.modal button[title="Save"]').click();
      cy.get('.right.floating').click();
      cy.get('.icon.Expiration').click();

      // Then the new Expiration date should show up in the folder contents
      cy.get('#content-core table')
        .contains('2017-06-20')
        .should('have.attr', 'title')
        .and('eq', 'Tuesday, June 20, 2017 8:30 AM');
    });

    it('Copying the content in the same folder', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon copy"]').click();
      cy.get('svg[class="icon paste"]').click();
      cy.get('.icon.unchecked').should('have.length', 2);
    });

    it('Cuting the item and pasting into others', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon cut"]').click();
      cy.visit('/my-folder/my-folder-2/contents');

      cy.get('svg[class="icon paste"]').click();

      cy.get('#content-core table')
        .contains('My Document')
        .should('have.attr', 'href')
        .and('eq', '/my-folder-2/my-document/contents');
    });

    it.only('Deleting a item from a folder', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon delete"]').click();
      cy.get('.ui.primary.button').click();
      cy.get('.icon.unchecked').should('have.length', 0);
    });
  });
}
