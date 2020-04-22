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

    it('Copying the content in the same folder', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon copy"]').click();
      cy.get('svg[class="icon paste"]').click();
      cy.get('.icon.unchecked').should('have.length', 2);
    });

    it('Cuting the item and pasting into others', () => {
      cy.createContent('Document', 'child', 'My Child', 'my-folder');
      cy.visit('my-folder/contents');
      cy.get('tbody>tr:nth-child(2) .unchecked').click();
      cy.get('svg[class="icon cut"]').click();
      cy.get('tbody>tr:nth-child(1) .iconAlign > span').click();
      cy.get('svg[class="icon paste"]').click();

      //then their should be a My child
      cy.get('#content-core table').contains('My Child');
    });

    it('Deleting a item from a folder', () => {
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon delete"]').click();
      cy.get('.ui.primary.button').click();

      // then the folder content must be empty
      cy.get('.icon.unchecked').should('have.length', 0);
    });

    it('Changing Content State', () => {
      // when changing the state from private to publish
      cy.createContent(
        'Document',
        'child',
        'My Child',
        'my-folder/my-document',
      );
      cy.get('svg[class="icon unchecked"]').click();
      cy.get('svg[class="icon semaphore"]').click();
      cy.get('#field-state')
        .click()
        .type('Publish{enter}');
      cy.get('.fitted.checkbox').click();
      cy.get('button[title="Save"]').click();

      // then the content must change its state from private to publish
      // and its child also
      cy.get('#content-core table').contains('Published');
      cy.visit('/my-folder/my-document/contents');
      cy.get('#content-core table').contains('Published');
    });
  });
}
