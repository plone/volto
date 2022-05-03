context('Search action tests', () => {
  describe('Search action with array', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Folder',
        contentId: 'folder1',
        contentTitle: 'Test folder',
      });

      cy.visit('/folder1');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('folder1');

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
      // because of lazyloading wait for the element to reach an actionable state
      cy.wait(2000);
      cy.get('#field-subjects').click().wait(1000).type('garden{enter}');
      cy.get('#toolbar-save').click();

      cy.visit('/folder1');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('folder1');
    });

    it('Search result contains news item with subject', function () {
      cy.get('.content-area').contains('Breaking');
      cy.get('.content-area').contains('garden');
    });
  });
});
