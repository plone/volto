if (Cypress.env('API') !== 'guillotina') {
  describe('Block Indexing Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });

    it('Index Text Block', () => {
      // GIVEN: A page with a text block with the content 'Noam Avram Chomsky'
      cy.get('.block.inner.text .public-DraftEditor-content')
        .click()
        .type('Noam Avram Chomsky')
        .get('span[data-text]')
        .contains('Noam Avram Chomsky');
      cy.get('#toolbar-save').click();

      // WHEN: I search for Avram
      cy.get('input[name="SearchableText"]')
        .clear()
        .type('Avram');
      cy.get('button[aria-label="Search"]').click();

      // THEN: The search results should contain the page 'Noam Avram Chomsky'
      cy.get('#content-core').contains('My Page');
    });
  });
}
