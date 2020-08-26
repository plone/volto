if (Cypress.env('API') !== 'guillotina') {
  describe('Folder Contents Tests', () => {
    beforeEach(() => {
      // given a logged in editor
      // and a folder that contains a document
      // and the folder contents view
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Folder',
        contentId: 'my-folder',
        contentTitle: 'My Folder',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-document',
        contentTitle: 'My Document',
        path: 'my-folder',
      });
      cy.visit('/my-folder/my-document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
    });

    it('Should render Image gallery listing view', () => {
      // when inserting image and selecting image gallery listing
      cy.createContent({
        contentType: 'Image',
        path: '/my-folder/my-document',
        contentId: 'my-image',
        contentTitle: 'My Image',
      });

      cy.visit('/my-folder/my-document');
      cy.get('.edit').click();
      cy.get('svg[class="icon block-add-button"]').click({ force: true });
      cy.get(
        '[style="transition: opacity 500ms ease 0ms;"] > :nth-child(2) > .ui',
      ).click();
      cy.get('#select-listingblock-template')
        .click()
        .type('imageGallery{enter}');
      cy.get('#toolbar-save').click();
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/my-folder/my-document',
      );

      // then we should have a slide play or pause button
      cy.get('.image-gallery-play-button')
        .should('have.attr', 'aria-label')
        .and('eq', 'Play or Pause Slideshow');
    });

    it('Should render image gallery in edit mode', () => {
      // when inserting image and selecting image gallery listing
      cy.createContent({
        contentType: 'Image',
        path: '/my-folder/my-document',
        contentId: 'my-image',
        contentTitle: 'My Image',
      });

      cy.visit('/my-folder/my-document');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-document').click();
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.ui.basic.icon.button.listing').contains('Listing').click();
      cy.get('#select-listingblock-template')
        .click()
        .type('imageGallery{enter}');
      // then we should have a slide play or pause button
      cy.get('.image-gallery-play-button')
        .should('have.attr', 'aria-label')
        .and('eq', 'Play or Pause Slideshow');
    });
  });
}
