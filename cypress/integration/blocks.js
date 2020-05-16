if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
    beforeEach(() => {
      // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
      cy.wait(2000);
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
      });
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');
      cy.navigate('/my-page/edit');
      cy.get(`.block.title [data-contents]`);
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
      cy.waitForResourceToLoad('my-page?fullobjects');

      // then the page view should contain the maps block
      cy.get('#page-document iframe')
        .should('have.attr', 'src')
        .and('match', /\/\/www.google.com\/maps\/embed\?pb=/);
    });

    it('Add hero block', () => {
      const block = 'hero';
      // const expectedFile = 'broccoli.jpg';
      const expectedTitle = 'Volto';
      const expectedDescription =
        'React-based front-end for the Plone and Guillotina';

      // Edit
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.blocks-chooser .hero')
        .contains('Hero')
        .click();

      // cy.fixture(expectedFile).then(fileContent => {
      //   cy.get(`.block.${block} [data-cy="dropzone]`).upload(
      //     { fileContent, expectedFile, mimeType: 'application/json' },
      //     { subjectType: 'drag-n-drop' },
      //   );
      // });
      cy.get(
        `.block.${block} .title-editor > .public-DraftStyleDefault-block`,
      ).type(`${expectedTitle}`);
      cy.get(
        `.block.${block} .description-editor > .public-DraftStyleDefault-block`,
      ).type(`${expectedDescription}`);

      // Save
      cy.get('#toolbar-save').click();

      //View
      cy.get(`.${block}-body h1`).contains(`${expectedTitle}`);
      cy.get(`.${block}-body p`).contains(`${expectedDescription}`);
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
      cy.waitForResourceToLoad('my-page?fullobjects');

      // Check if HTML is present in the page view
      cy.get('#page-document pre').should('have.text', 'This is HTML');
    });

    it('Add table block', () => {
      // Edit
      cy.get('.block.text [contenteditable]').click();
      cy.get('button.block-add-button').click();
      cy.get('.blocks-chooser .title')
        .contains('Common')
        .click();
      cy.get('.ui.buttons .button.table').click();
      cy.get('.celled.fixed.table tr th:first-child()')
        .click()
        .type('column 1 / row 1');
      cy.get('.celled.fixed.table tr th:nth-child(2)')
        .click()
        .type('column 2 / row 1');
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()')
        .click()
        .type('column 1 / row 2');
      cy.get('.celled.fixed.table tr:nth-child(2) td:nth-child(2)')
        .click()
        .type('column 2 / row 2');
      cy.get('button[title="Insert col after"]').click();
      cy.get('button[title="Insert row after"]').click();
      cy.get('button[title="Insert row before"]').click();
      cy.get('button[title="Insert col before"]').click();

      // Save
      cy.get('#toolbar-save').click();

      // View
      cy.get('.celled.fixed.table tr th:first-child()').contains(
        'column 1 / row 1',
      );
      cy.get('.celled.fixed.table tr th:nth-child(3)').contains(
        'column 2 / row 1',
      );
      cy.get('.celled.fixed.table tr:nth-child(3) td:first-child()').contains(
        'column 1 / row 2',
      );
      cy.get('.celled.fixed.table tr:nth-child(3) td:nth-child(3)').contains(
        'column 2 / row 2',
      );

      // Edit
      cy.visit('/my-page/edit');
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click();

      // without the second click the test fails. so this makes the test green.
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click();

      cy.get('button[title="Delete col"]').click();
      cy.get('.celled.fixed.table tr:first-child() th:nth-child(3)').click();
      cy.get('button[title="Delete col"]').click();
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()').click();
      cy.get('button[title="Delete row"]').click();
      cy.get('.celled.fixed.table tr:nth-child(3) td:first-child()').click();
      cy.get('button[title="Delete row"]').click();

      // Save
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

      //View
      cy.get('.celled.fixed.table tr th:first-child()').contains(
        'column 1 / row 1',
      );
      cy.get('th:nth-child(2)> p ').should('have.text', 'column 2 / row 1');
      cy.get('.celled.fixed.table tr:nth-child(2) td:first-child()').contains(
        'column 1 / row 2',
      );
      cy.get('.celled.fixed.table tr:nth-child(2) td:nth-child(2)').contains(
        'column 2 / row 2',
      );
    });

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
