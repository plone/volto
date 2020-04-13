if (Cypress.env('API') !== 'guillotina') {
  describe('Listing Block Tests', () => {
    beforeEach(() => {
      // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
      cy.wait(2000);
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');
      cy.get(`.block.title [data-contents]`);
    });
    it('Add Listing block', () => {
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.createContent('Document', 'my-page-test', 'My Page Test', 'my-page');
      cy.createContent('News Item', 'my-news', 'My News', 'my-page');
      cy.createContent('Folder', 'my-folder', 'My Folder', 'my-page');

      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');

      //add listing block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Listing')
        .click();

      //verify before save
      cy.get(`.block.listing .listing-body:first-of-type`).contains(
        'My Page Test',
      );

      //save
      cy.get('#toolbar-save').click();

      //test after save
      cy.get('#page-document .listing-body:first-of-type').contains(
        'My Page Test',
      );
      cy.get('#page-document .listing-item:first-of-type a').should(
        'have.attr',
        'href',
        '/my-page/my-page-test',
      );
    });

    it('Listing block - Test Criteria: short-name', () => {
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.createContent('Document', 'my-page-test', 'My Page Test', 'my-page');
      cy.createContent('News Item', 'my-news', 'My News', 'my-page');
      cy.createContent('Folder', 'my-folder', 'My Folder', 'my-page');

      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('Listing block - Test Criteria: short-name');

      //add listing block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Listing')
        .click();

      //********  add short-name criteria filter
      cy.get('.sidebar-container .tabs-wrapper .menu .item')
        .contains('Block')
        .click();
      cy.get('.sidebar-listing-data .fields')
        .contains('Add criteria')
        .click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
      )
        .contains('Short name (id)')
        .click();
      //short-name is..
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type',
      ).click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
      )
        .contains('Is')
        .click();
      //insert short name
      cy.get('.sidebar-listing-data .fields:first-of-type > .field input')
        .clear()
        .type('my-page-test');

      //before save, vrify if in list there's a page with id my-page-test
      cy.get(`.block.listing .listing-body:first-of-type`).contains(
        'My Page Test',
      );
      //before save, verify if in list there isn't the News with title My News
      cy.get(`.block.listing .listing-body`)
        .contains('My News')
        .should('not.exist');

      //save
      cy.get('#toolbar-save').click();

      //test short-name criteria after save
      cy.get('#page-document .listing-body:first-of-type').contains(
        'My Page Test',
      );
      cy.get('#page-document .listing-item:first-of-type a').should(
        'have.attr',
        'href',
        '/my-page/my-page-test',
      );
    });

    it('Listing block - Test Criteria: Location relative', () => {
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.createContent(
        'Document',
        'document-outside-folder',
        'Document outside Folder',
        'my-page',
      );
      cy.createContent('Document', 'my-folder', 'My Folder', 'my-page');

      cy.createContent(
        'Document',
        'document-within-folder',
        'Document within Folder',
        'my-page/my-folder',
      );

      cy.visit('/my-page/my-folder/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-folder?fullobjects');

      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('Listing block - Test Criteria: Location relative');

      //add listing block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Listing')
        .click();

      //********  add location criteria filter
      cy.get('.sidebar-container .tabs-wrapper .menu .item')
        .contains('Block')
        .click();
      cy.get('.sidebar-listing-data .fields')
        .contains('Add criteria')
        .click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
      )
        .contains('Location')
        .click();
      //location relative..
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type',
      ).click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
      )
        .contains('Relative path')
        .click();

      //insert relative path
      cy.get('.sidebar-listing-data .fields:first-of-type > .field input')
        .clear()
        .type('../my-folder');

      // verify if in list there's a page with name "Document within Folder"
      cy.get(`.block.listing .listing-body:first-of-type`).contains(
        'Document within Folder',
      );
      // verify if in list there isn't page with name "Document outside Folder"
      cy.get(`.block.listing .listing-body`)
        .contains('Document outside Folder')
        .should('not.exist');

      //save
      cy.get('#toolbar-save').click();

      //test location relative criteria after save
      cy.get('#page-document .listing-body:first-of-type').contains(
        'Document within Folder',
      );
      cy.get('#page-document .listing-body:first-of-type')
        .contains('Document outside Folder')
        .should('not.exist');
    });

    it('Listing block - Test Criteria: Location absolute', () => {
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.createContent(
        'Document',
        'document-outside-folder',
        'Document outside Folder',
        'my-page',
      );
      cy.createContent('Document', 'my-folder', 'My Folder', 'my-page');

      cy.createContent(
        'Document',
        'document-within-folder',
        'Document within Folder',
        'my-page/my-folder',
      );

      cy.visit('/my-page/my-folder/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-folder?fullobjects');

      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('Listing block - Test Criteria: Location absolute');

      //add listing block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Listing')
        .click();

      //********  add location criteria filter
      cy.get('.sidebar-container .tabs-wrapper .menu .item')
        .contains('Block')
        .click();
      cy.get('.sidebar-listing-data .fields')
        .contains('Add criteria')
        .click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
      )
        .contains('Location')
        .click();
      //location absolute..
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type',
      ).click();
      cy.get(
        '.sidebar-listing-data .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
      )
        .contains('Absolute path')
        .click();

      //insert absolute path
      cy.get('.sidebar-listing-data .fields:first-of-type > .field input')
        .clear()
        .type('/my-page/my-folder');

      // verify if in list there's a page with name "Document within Folder"
      cy.get(`.block.listing .listing-body:first-of-type`).contains(
        'Document within Folder',
      );
      // verify if in list there isn't page with name "Document outside Folder"
      cy.get(`.block.listing .listing-body`)
        .contains('Document outside Folder')
        .should('not.exist');

      //save
      cy.get('#toolbar-save').click();

      //test location absolute criteria after save
      cy.get('#page-document .listing-body:first-of-type').contains(
        'Document within Folder',
      );
      cy.get('#page-document .listing-body:first-of-type')
        .contains('Document outside Folder')
        .should('not.exist');
    });
    it('Listing block - Test Criteria: Location Navigation path', () => {
      /*not implemented because Navigation ui is not yet developed in Listing Block sidebar*/
    });
  });
}
