if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
    beforeEach(() => {
      // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
      cy.wait(2000);
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });

    it('Add text block', () => {
      // fill text block
      cy.get('.block.inner.text .public-DraftEditor-content')
        .click()
        .type('My text')
        .get('span[data-text]')
        .contains('My text');

      // save
      cy.get('#toolbar-save').click();

      // check if view contains text block
      cy.get('#page-document p').contains('My text');
    });

    it('Add Video Block with YouTube Video', () => {
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.title')
        .contains('Media')
        .click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://youtu.be/T6J3d35oIAY')
        .type('{enter}');
      cy.get('#toolbar-save').click();
      cy.get('.block.video');
    });

    it('Add Video Block with Vimeo Video', () => {
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.title')
        .contains('Media')
        .click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://vimeo.com/85804536')
        .type('{enter}');
      cy.get('#toolbar-save').click();
      cy.get('.block.video');
    });

    it('Add Video Block with MP4 Video', () => {
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.title')
        .contains('Media')
        .click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://1.videolyser.de/videos/1714848/11745228_hd.mp4')
        .type('{enter}');
      cy.get('#toolbar-save').click();

      cy.get('.block.video video').should(
        'have.attr',
        'src',
        'https://1.videolyser.de/videos/1714848/11745228_hd.mp4',
      );

      cy.visit('/my-page/edit');
    });

    it('Add maps block', () => {
      // Add maps block
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .common')
        .contains('Maps')
        .click();

      // Fill maps block
      cy.get(`.block.maps .toolbar-inner .ui.input input`)
        .type(
          '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
        )
        .type('{enter}');

      // Save
      cy.get('#toolbar-save').click();

      // Check if Google maps shows up in the page view
      cy.get('#page-document iframe')
        .should('have.attr', 'src')
        .should('include', 'maps');
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

    // it('Add image block', () => {
    //   // Add image block
    //   cy.get('.block.text [contenteditable]').click();
    //   cy.get('button.block-add-button').click();
    //   cy.get('.blocks-chooser .title')
    //     .contains('media')
    //     .click();
    //   cy.get('.blocks-chooser .media')
    //     .contains('image')
    //     .click();

    //   //Type in external image URL
    //   cy.get(`.block.image center input`)
    //     .click()
    //     .type(
    //       `https://github.com/plone/volto/raw/master/docs/logos/volto-colorful.png{enter}`,
    //     );

    //   cy.get('#toolbar-save').click();

    //   cy.get('#page-document img').should(
    //     'have.attr',
    //     'src',
    //     'https://github.com/plone/volto/raw/master/docs/logos/volto-colorful.png',
    //   );
    // });

    // it('Add image via drag and drop', () => {
    //   const block = 'image';

    //   // Add image Block
    //   cy.get('.block.text [contenteditable]').click();
    //   cy.get('button.block-add-button').click();
    //   cy.get('.blocks-chooser .title')
    //     .contains('media')
    //     .click();
    //   cy.get(
    //     '.content.active.blocks-list .ui.buttons:first-child button',
    //   ).click();

    //   const fileName = 'image.png';
    //   cy.fixture(fileName).then(fileContent => {
    //     cy.get(`.ui.block.${block} .dropzone`).upload(
    //       {
    //         fileContent,
    //         fileName,
    //         mimeType: 'application/png',
    //       },
    //       { subjectType: 'drag-n-drop' },
    //     );
    //   });
    // });

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

    // it('Add HTML block', () => {
    //   // Add HTML block
    //   cy.get('.block.text [contenteditable]').click();
    //   cy.get('button.block-add-button').click();
    //   cy.get('.blocks-chooser .title')
    //     .contains('common')
    //     .click();
    //   cy.get('.blocks-chooser .common')
    //     .contains('html')
    //     .click();

    //   // Add HTML
    //   cy.get(`.block.html .npm__react-simple-code-editor__textarea`).type(
    //     `<pre>This is html</pre>`,
    //   );
    //   cy.get(`.block.html [aria-label="Preview"]`).click();
    //   cy.get(`.block.html pre`).contains('This is html');

    //   // Save
    //   cy.get('#toolbar-save').click();

    //   // Check if HTML is present in the page view
    //   cy.get('#page-document pre').should('have.text', 'This is html');
    // });

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
  });
}
