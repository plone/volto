if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
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
      cy.waitForResourceToLoad('?fullobjects');
      cy.get(`.block.title [data-contents]`);
    });

    it('Add text block', () => {
      // when I add a text block
      cy.get('.block.inner.text .public-DraftEditor-content')
        .click()
        .type('My text')
        .get('span[data-text]')
        .contains('My text');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the page view should contain the text block
      cy.get('#page-document p').contains('My text');
    });

    it('Add maps block', () => {
      // when I add a maps block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Maps')
        .click();
      cy.get(`.block.maps .toolbar-inner .ui.input input`)
        .type(
          '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
        )
        .type('{enter}');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the page view should contain the maps block
      cy.get('#page-document iframe')
        .should('have.attr', 'src')
        .and('match', /\/\/www.google.com\/maps\/embed\?pb=/);
    });

    it('Add Listing block', () => {
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      cy.createContent('Document', 'my-page-test', 'My Page Test', 'my-page');
      cy.createContent('News Item', 'my-news', 'My News', 'my-page');
      cy.createContent('Folder', 'my-folder', 'My Folder', 'my-page');

      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

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
      cy.waitForResourceToLoad('?fullobjects');

      cy.createContent('Document', 'my-page-test', 'My Page Test', 'my-page');
      cy.createContent('News Item', 'my-news', 'My News', 'my-page');
      cy.createContent('Folder', 'my-folder', 'My Folder', 'my-page');

      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

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
      cy.waitForResourceToLoad('?fullobjects');

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
      cy.waitForResourceToLoad('?fullobjects');

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
      cy.waitForResourceToLoad('?fullobjects');

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
      cy.waitForResourceToLoad('?fullobjects');

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

    // it('Add hero block', () => {
    //   // TODO: Implement react dropzone for this block to test the image

    //   const block = 'hero';
    //   // const expectedFile = 'broccoli.jpg';
    //   const expectedTitle = 'Volto';
    //   const expectedDescription =
    //     'React-based front-end for the Plone and Guillotina';

    //   // Edit
    //   cy.get('.block.text [contenteditable]').click();
    //   cy.get('button.block-add-button').click();
    //   cy.get('button.show-hidden-blocks').click();
    //   cy.get(`button.add-${block}-block`).click();

    //   // cy.fixture(expectedFile).then(fileContent => {
    //   //   cy.get(`.block.${block} [data-cy="dropzone]`).upload(
    //   //     { fileContent, expectedFile, mimeType: 'application/json' },
    //   //     { subjectType: 'drag-n-drop' },
    //   //   );
    //   // });
    //   cy.get(
    //     `.block.${block} .title-editor > .public-DraftStyleDefault-block`,
    //   ).type(expectedTitle);
    //   cy.get(
    //     `.block.${block} .description-editor > .public-DraftStyleDefault-block`,
    //   ).type(expectedDescription);

    //   cy.get(
    //     `.block.${block} .title-editor > .public-DraftStyleDefault-block`,
    //   ).contains(expectedTitle);
    //   cy.get(
    //     `.block.${block} .description-editor > .public-DraftStyleDefault-block`,
    //   ).contains(expectedDescription);

    //   // Save
    //   // cy.get('#toolbar-save').click();

    //   // View
    //   if (Cypress.env('API') === 'plone') {
    //     // cy.get('#page-document h1').should('have.text', expected);
    //   } else {
    //     // guillotina
    //     // cy.contains(expected);
    //   }
    // });

    it('Add HTML block', () => {
      // when I add a maps block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('HTML')
        .click();
      cy.get(`.block.html .npm__react-simple-code-editor__textarea`).type(
        `<pre>This is HTML</pre>`,
      );
      cy.get(`.block.html [aria-label="Preview"]`).click();
      cy.get(`.block.html pre`).contains('This is HTML');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // Check if HTML is present in the page view
      cy.get('#page-document pre').should('have.text', 'This is HTML');
    });

    // it('Add table block', () => {
    //   // TODO: Figure out why there is an erro when add this block in cypress

    //   // const block = 'table';
    //   // const expected = 'This is the html';

    //   // Edit
    //   cy.get('.block.text [contenteditable]').click();
    //   cy.get('button.block-add-button').click();
    //   cy.get('button.show-hidden-blocks').click();
    //   // cy.get(`button.add-${block}-block`).click();
    //   // cy.get(`.block.${block} .npm__react-simple-code-editor__textarea`).type(
    //   //   `<h3>${expected}</h3>`,
    //   // );
    //   // cy.get(`.block.${block} [aria-label="Preview"]`).click();
    //   // cy.get(`.block.${block} h3`).contains(expected);

    //   // // Save
    //   // cy.get('#toolbar-save').click();

    //   // // View
    //   // if (Cypress.env('API') === 'plone') {
    //   //   cy.get('#page-document h3').should('have.text', expected);
    //   // } else {
    //   //   // guillotina
    //   //   cy.contains(expected);
    //   // }
    // });

    it('Add Table of Contents block', () => {
      // given a text block with a H2 headline
      cy.get('.block.inner.text .public-DraftEditor-content')
        .type('This is a H2 Headline')
        .setSelection('This is a H2 Headline');
      cy.get(
        '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(5)',
      ).click();
      cy.get('.block.inner.text .public-DraftEditor-content')
        .click()
        .type(' {enter}');

      // when I add a ToC block
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.title')
        .contains('Common')
        .click();
      cy.get('.ui.basic.icon.button.toc')
        .contains('Table of Contents')
        .click();
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the ToC block should contain the H2 headline
      cy.get('.block.table-of-contents .ui.list a').contains(
        'This is a H2 Headline',
      );
      cy.get('.block.table-of-contents .ui.list div').should(
        'have.class',
        'header-two',
      );
    });
  });
}
