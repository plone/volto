describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

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
});
