if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
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

    it.only('check type criterions of listing block', () => {
      //Given I am logged in as site owner
      //   And a document  Test Document
      //   And a news_item  Test News Item
      //  When I set listin block's type criterion to  News Item
      //  Then the listing block should contain  Test News Item
      //   And the listing block should not contain  Test Document

      cy.createContent('Document', 'test-document', 'Test Document');
      cy.createContent('News Item', 'test-news-item', 'Test News Item');

      cy.visit('/my-page/edit');

      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('Test Document');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.title')
        .contains('common')
        .click();
      cy.get('.ui.basic.icon.button.listing')
        .contains('Listing')
        .click();
      cy.get('.css-hnwiky.react-select__control')
        .contains('Add criteria')
        .click()
        .type('Type{enter}');
      cy.get('.css-hnwiky.react-select__control')
        .first()

        .click({ force: true })
        .type('News Item{enter}');

      cy.get('#toolbar-save').click();
      cy.get('.listing-item > a').should(
        'have.attr',
        'href',
        '/test-news-item',
      );
    });

    it('test review state criterion of listing block', () => {
      //Given
      // I am logged in as site owner
      // And a published document  Published Document
      // And a private document  Private Document
      // And a listing block
      // When I set the listing block's review state criterion to  private
      // Then the collection should contain  Private Document
      // And the collection should not contain  Published Document
    });
  });
}
