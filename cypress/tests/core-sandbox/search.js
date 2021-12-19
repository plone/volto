context('Search action tests', () => {
  describe('Search action with array', () => {
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

      cy.createContent({
        contentType: 'News Item',
        contentId: 'newsitem',
        contentTitle: 'Breaking News on Plone',
      });

      cy.visit('/newsitem');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('newsitem');
      cy.navigate('/newsitem/edit');

      // Add subject
      cy.get('a:contains("Categorization")')
        .click()
        .get('.field-wrapper-subjects input')
        .type('garden', { force: true })
        .type('{enter}');
      cy.get('#toolbar-save').click();

      cy.visit('/document');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('document');
    });

    it('Search result contains news item with subject', function () {
      cy.get('.content-area').contains('Breaking');
      cy.get('.content-area').contains('garden');
    });
  });
});
