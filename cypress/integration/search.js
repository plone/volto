if (Cypress.env('API') !== 'guillotina') {
  describe('Search', () => {
    beforeEach(() => {
      cy.autologin();
      cy.visit('/');
      cy.createContent({
        contentType: 'Document',
        contentId: 'colorless',
        contentTitle: 'Colorless',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'color',
        contentTitle: 'Color',
      });
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });
    it('As anonymous user I can see the search results ordered by search rank,', () => {
      cy.visit('/colorless/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.url().should('eq', Cypress.config().baseUrl + '/colorless/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/colorless');
      cy.visit('/color/edit');
      cy.url().should('eq', Cypress.config().baseUrl + '/color/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/color');
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.visit('/search?SearchableText=color');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );
      cy.get('.items_total').should('have.text', '2 results');
      cy.get('.summary.url:first').should('have.text', 'Color');
    });

    it('As anonymous user I can see the search results ordered alphabetically', () => {
      cy.createContent({
        contentType: 'Document',
        contentId: 'acolorless',
        contentTitle: 'A Colorless',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'bcolor',
        contentTitle: 'B Color',
      });
      cy.visit('/acolorless/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.url().should('eq', Cypress.config().baseUrl + '/acolorless/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/acolorless');
      cy.visit('/bcolor/edit');
      cy.url().should('eq', Cypress.config().baseUrl + '/bcolor/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/bcolor');
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.visit('/search?SearchableText=color');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );
      cy.get('button[name="sortable_title"]').click();
      cy.get('.summary.url:first').should('have.text', 'A Colorless');
    });

    it('As anonymous user I can see the search results ordered date(newest first)', () => {
      cy.visit('/colorless/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.url().should('eq', Cypress.config().baseUrl + '/colorless/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/colorless');
      cy.visit('/color/edit');
      cy.url().should('eq', Cypress.config().baseUrl + '/color/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').type(
        'This is the text.',
      );
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/color');
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.visit('/search?SearchableText=color');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );
      cy.get('.items_total').should('have.text', '2 results');
      cy.get('button[name="effective"]').click();
      cy.get('.summary.url:first').should('have.text', 'Colorless');
    });
  });
}
