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
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  // it('Add hero block', () => {
  //   // TODO: Implement react dropzone for this block to test the image

  //   const block = 'hero';
  //   // const expectedFile = 'broccoli.jpg';
  //   const expectedTitle = 'Volto';
  //   const expectedDescription =
  //     'React-based front-end for the Plone and Guillotina';

  //   // Edit
  //   cy.getSlate().click();
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
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.blocks-chooser .common').contains('HTML').click();
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
    cy.waitForResourceToLoad('my-page');

    // Check if HTML is present in the page view
    cy.get('#page-document pre').should('have.text', 'This is HTML');
  });

  it('Add table block', () => {
    cy.intercept('PATCH', '*').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    // Edit
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.ui.buttons .button.slateTable').click();
    cy.wait(2000);
    cy.get(
      '.celled.fixed.table thead tr th:first-child() [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 1 / row 1');
    cy.get(
      '.celled.fixed.table thead tr th:nth-child(2) [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 2 / row 1');
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:first-child() [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 1 / row 2');
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:nth-child(2) [contenteditable="true"]',
    )
      .focus()
      .click()
      .type('column 2 / row 2');
    cy.get('button[title="Insert col after"]').click();
    cy.get('button[title="Insert row after"]').click();
    cy.get('button[title="Insert row before"]').click();
    cy.get('button[title="Insert col before"]').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    // View
    cy.get('.celled.fixed.table thead tr th:first-child()').contains(
      'column 1 / row 1',
    );
    cy.get('.celled.fixed.table thead tr th:nth-child(3)').contains(
      'column 2 / row 1',
    );
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(2) td:first-child()',
    ).contains('column 1 / row 2');
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(2) td:nth-child(3)',
    ).contains('column 2 / row 2');

    // Edit
    cy.visit('/my-page/edit');
    cy.waitForResourceToLoad('my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('#toolbar-save').should('be.visible');
    cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').should(
      'be.visible',
    );

    cy.get('.celled.fixed.table tr:first-child() th:nth-child(2)').click({
      waitForAnimations: false,
    });

    // without the second click the test fails. so this makes the test green.
    cy.get(
      '.celled.fixed.table thead tr:first-child() th:nth-child(2)',
    ).click();

    cy.get('button[title="Delete col"]').click();
    cy.get(
      '.celled.fixed.table thead tr:first-child() th:nth-child(3)',
    ).click();
    cy.get('button[title="Delete col"]').click();
    cy.get(
      '.celled.fixed.table tbody tr:first-child() td:first-child()',
    ).click();
    cy.get('button[title="Delete row"]').click();
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(2) td:first-child()',
    ).click();
    cy.get('button[title="Delete row"]').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    // View
    cy.get('.celled.fixed.table thead tr th:first-child()').should(
      'contain',
      'column 1 / row 1',
    );
    cy.get('.celled.fixed.table thead tr th:nth-child(2)> p ').should(
      'have.text',
      'column 2 / row 1',
    );
    cy.get(
      '.celled.fixed.table tbody tr:first-child() td:first-child()',
    ).contains('column 1 / row 2');
    cy.get(
      '.celled.fixed.table tbody tr:first-child() td:nth-child(2)',
    ).contains('column 2 / row 2');
  });

  // TODO: use ToC from volto-block-toc
  // it('Add Table of Contents block', () => {
  //   // given a text block with a H2 headline
  //   cy.getSlate()
  //     .focus()
  //     .click()
  //     .type('This is a H2 Headline')
  //     .setSlateSelection('This is a H2 Headline');
  //   cy.clickSlateButton('Subtitle');
  //   cy.getSlate().focus().click().type(' {enter}');

  //   // when I add a ToC block
  //   cy.get('.ui.basic.icon.button.block-add-button').click();
  //   cy.get('.title').contains('Common').click();
  //   cy.get('.ui.basic.icon.button.toc').contains('Table of Contents').click();
  //   cy.get('#toolbar-save').click();
  //   cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
  //   cy.waitForResourceToLoad('@navigation');
  //   cy.waitForResourceToLoad('@breadcrumbs');
  //   cy.waitForResourceToLoad('@actions');
  //   cy.waitForResourceToLoad('@types');
  //   cy.waitForResourceToLoad('');

  //   // then the ToC block should contain the H2 headline
  //   cy.get('.block.table-of-contents .ui.list a').contains(
  //     'This is a H2 Headline',
  //   );
  //   cy.get('.block.table-of-contents .ui.list div').should(
  //     'have.class',
  //     'header-two',
  //   );
  // });

  it('Handles unknown blocks', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'test-doc',
      contentTitle: 'my test document',
      bodyModifier(body) {
        body.blocks['abc'] = { '@type': 'missing' };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/test-doc');
    cy.get('#page-document div').should('have.text', 'Unknown Block missing');
  });
});
