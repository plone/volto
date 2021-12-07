context('Special fields Acceptance Tests', () => {
  describe('ObjectListWidget', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.visit('/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');
      cy.navigate('/document/edit');
      cy.get(`.block.title [data-contents]`);
    });

    it('I want to see blocks of listingblock items.', function () {
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('body');
    });
  });
});
