context('Listing block tests', () => {
  describe('Listing block variation', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });

      cy.createContent({
        contentType: 'Document',
        contentId: 'newsdoc1',
        contentTitle: 'News 1',
        path: '/document',
      });

      cy.visit('/');
      cy.wait('@content');

      cy.navigate('/document/newsdoc1');
      cy.wait('@content');

      cy.navigate('/document/newsdoc1/edit');
      cy.wait('@schema');

      // Add text block to news document
      cy.getSlateEditorAndType('Aenean lacinia bibendum.');
      cy.get('#toolbar-save').click();
      cy.wait('@content');
    });

    it('Selecting a variation without option "fullobjects" and rendering blocks of items I do not see blocks of listing block items.', function () {
      cy.visit('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      // Add listing block
      cy.addNewBlock('listing');

      // select variation
      cy.get('#field-variation')
        .click()
        .type('listingBlockVariationWithFullobjectsAndData{enter}');

      // Add Type criteria filter to force a call of getQueryStringResults
      cy.get('.querystring-widget .fields').contains('Add criteria').click();
      cy.get(
        '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
      )
        .contains('Type')
        .click();
      cy.get('.querystring-widget .fields:first-of-type > .field').click();
      cy.get(
        '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
      )
        .contains('Page')
        .click();

      cy.get('#toolbar-save').click();
      cy.wait('@content');

      // Test after save
      // Text of listing block is visible
      cy.get('#page-document .block.listing').contains(
        'Aenean lacinia bibendum.',
      );
    });

    it('Selecting a variation with option "fullobjects" and rendering blocks of items I see blocks of listing block items.', function () {
      cy.visit('/document');
      cy.wait('@content');

      cy.navigate('/document/edit');
      cy.wait('@schema');

      // Add listing block
      cy.addNewBlock('listing');
      cy.getSlate().click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title').contains('Common').click();
      cy.get('.blocks-chooser .common')
        .contains('Listing')
        .click({ force: true });

      // select variation
      cy.get('#field-variation')
        .click()
        .type('listingBlockVariationWithFullobjectsButNoData{enter}');

      // Add Type criteria filter to force a call of getQueryStringResults
      cy.get('.querystring-widget .fields').contains('Add criteria').click();
      cy.get(
        '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
      )
        .contains('Type')
        .click();
      cy.get('.querystring-widget .fields:first-of-type > .field').click();
      cy.get(
        '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
      )
        .contains('Page')
        .click();

      cy.get('#toolbar-save').click();
      cy.wait('@content');

      // Test after save
      // Text of listing block is visible
      cy.get('#page-document .block.listing')
        .contains('Aenean lacinia bibendum.')
        .should('not.exist');
    });
  });
});
