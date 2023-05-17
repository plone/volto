describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('As editor can edit a contentType "News Item" using keyboard', () => {
    cy.createContent({
      contentType: 'News Item',
      contentId: 'test-news-item',
      contentTitle: 'Test News Item',
      contentDescription: 'Description for news item CT',
    });
    cy.visit('/test-news-item/edit');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.focused().tab();
    cy.focused().wait(1000).type('New content text');
    cy.focused().tab().should('have.class', 'delete-button');
  });
});
