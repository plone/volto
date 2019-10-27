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

    it('Index Title Block', () => {
      cy.get(`.tile.title [data-contents]`)
        .clear()
        .type('Noam Chomsky');
      cy.get('#toolbar-save').click();

      cy.get('input[name="SearchableText"]')
        .clear()
        .type('Noam');
      cy.get('button[aria-label="Search"]').click();
      cy.get('#content-core').contains('Noam Chomsky');
    });
  });
}
