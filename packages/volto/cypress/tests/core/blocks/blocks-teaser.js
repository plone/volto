context('Blocks Acceptance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.viewport('macbook-16');
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');
  });

  it('As editor I can add a (standalone) Teaser block', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchidees
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchidees',
      contentTitle: 'Blue Orchidees',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/document',
    });
    cy.visit('/document/edit');
    cy.wait('@schema');

    // WHEN I create a Teaser block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchidees"]').dblclick();
    cy.wait(500);
    cy.get('.align-buttons .ui.buttons button[aria-label="Center"]').click();
    cy.get('#toolbar-save').click();

    // THEN I can see the Teaser block
    cy.visit('/document');
    cy.get('.block.teaser').should('have.class', 'has--align--center');
    cy.get('.block.teaser .image-wrapper img')
      .should('have.attr', 'src')
      .and('include', '/document/blue-orchidees/@@images/preview_image-');
    cy.get('.block.teaser .content h2').contains('Blue Orchidees');
    cy.get('.block.teaser .content p').contains(
      'are growing on the mountain tops',
    );
  });

  it('As editor I can add a (standalone) Teaser block that always fetches the live data', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchidees
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchidees',
      contentTitle: 'Blue Orchidees',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/document',
    });
    cy.visit('/document/edit');
    // WHEN I create a Teaser block and change the data of the referenced object
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchidees"]').dblclick();
    cy.wait(500);
    cy.get('#toolbar-save').click();
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchidees');
    cy.get('.block.teaser .content p').contains(
      'are growing on the mountain tops',
    );
    cy.visit('/document/blue-orchidees/edit');
    cy.get('.documentFirstHeading').type(' and Tulips');
    cy.get('#toolbar-save').click();
    cy.visit('/document/blue-orchidees');
    cy.get('.documentFirstHeading').contains('Blue Orchidees and Tulips');
    // THEN I can see the updated content in the teaser
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchidees and Tulips');
    cy.get('.block.teaser .content p').contains(
      'are beautifully growing on the mountain tops',
    );
  });

  it('As editor I can create a Teaser block and overwrite the data which is is not updated when the target is changed', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchidees
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchidees',
      contentTitle: 'Blue Orchidees',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/document',
    });
    cy.visit('/document/edit');
    // WHEN I create a Teaser block and change the data of the referenced object
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchidees"]').dblclick();
    cy.wait(500);
    cy.get('label[for="field-overwrite"]').click();
    cy.get('#sidebar-properties #field-title').type(' and Tulips');
    cy.get('#toolbar-save').click();
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchidees and Tulips');

    cy.visit('/document/blue-orchidees/edit');
    cy.get('.documentFirstHeading').type(' but no Tulips');
    cy.get('#toolbar-save').click();
    cy.visit('/document/blue-orchidees');
    cy.get('.documentFirstHeading').contains('Blue Orchidees but no Tulips');
    // THEN I still see the overwritten content in the teaser
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchidees and Tulips');
  });
});
