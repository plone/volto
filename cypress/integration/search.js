if (Cypress.env('API') !== 'guillotina') {
  describe('Search', () => {
    beforeEach(() => {
      cy.autologin();
      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });
    it('As anonymous user I can see the search results ordered by search rank,', () => {
      // Given document Colorless and Color and feeding some text into it.
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
      cy.visit('/colorless/edit');
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

      // then we are searching for SearchableText=color
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );

      // we should get the first link Color
      cy.get('.summary.url:first').should('have.text', 'Color');
    });

    it('As anonymous user I can see the search results ordered alphabetically', () => {
      //Given document A Colorless and B Color and feeding some text into it.
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
      // then we are searhing for SearchableText=color and sorting it Alphabetically
      cy.visit('/search?SearchableText=color');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );

      // we should get first link `A Colorless`
      cy.get('button[name="sortable_title"]').click();
      cy.get('.summary.url:first').should('have.text', 'A Colorless');
    });

    it('As anonymous user I can see the search results ordered date(newest first)', () => {
      // Given document Colorless and Color and feeding some text into it.
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
      cy.setWorkflow({
        path: 'colorless',
        effective: '2020-08-15T15:58:24+00:00',
        expires: '2030-05-14T15:58:24+00:00',
      });
      cy.setWorkflow({
        path: 'color',
        effective: '2020-08-13T15:58:24+00:00',
        expires: '2030-05-14T15:58:24+00:00',
      });
      cy.visit('/colorless/edit');
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

      // then we are searching for SearchableText=color and sorting it with effective date
      cy.visit('/search?SearchableText=color');
      cy.url().should(
        'eq',
        Cypress.config().baseUrl + '/search?SearchableText=color',
      );

      // then the first link must be Colorless
      cy.get('button[name="effective"]').click();
      cy.get('.summary.url:first').should('have.text', 'Colorless');
    });
  });
}
