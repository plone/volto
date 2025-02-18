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
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchids
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
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
    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.wait(500);
    cy.get('.align-buttons .ui.buttons button[aria-label="Center"]').click();
    cy.get('#toolbar-save').click();

    // THEN I can see the Teaser block
    cy.visit('/document');
    cy.get('.block.teaser').should('have.class', 'has--align--center');
    cy.get('.block.teaser .image-wrapper img')
      .should('have.attr', 'src')
      .and('include', '/document/blue-orchids/@@images/preview_image-');
    cy.get('.block.teaser .content h2').contains('Blue Orchids');
    cy.get('.block.teaser .content p').contains(
      'are growing on the mountain tops',
    );
  });

  it('As editor I can add a (standalone) Teaser block that always fetches the live data', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchids
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/document',
    });

    cy.navigate('/document/edit');
    // WHEN I create a Teaser block and change the data of the referenced object
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.wait(500);
    cy.get('#toolbar-save').click();

    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchids');
    cy.get('.block.teaser .content p').contains(
      'are growing on the mountain tops',
    );
    cy.navigate('/document/blue-orchids/edit');
    cy.wait('@schema');
    cy.getSlateTitle().type(' and Tulips');
    cy.get('#field-description')
      .clear()
      .type('are beautifully growing on the mountain tops');
    cy.get('#toolbar-save').click();

    cy.get('.documentFirstHeading').contains('Blue Orchids and Tulips');
    // THEN I can see the updated content in the teaser
    cy.navigate('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchids and Tulips');
    cy.get('.block.teaser .content p').contains(
      'are beautifully growing on the mountain tops',
    );
  });

  it('As editor I can create a Teaser block and overwrite the data which is is not updated when the target is changed', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchids
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
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
    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.wait(500);
    cy.get('label[for="field-overwrite"]').click();
    cy.get('#sidebar-properties #field-title').type(' and Tulips');
    cy.get('#toolbar-save').click();
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchids and Tulips');

    cy.visit('/document/blue-orchids/edit');
    cy.get('.documentFirstHeading').type(' but no Tulips');
    cy.get('#toolbar-save').click();
    cy.visit('/document/blue-orchids');
    cy.get('.documentFirstHeading').contains('Blue Orchids but no Tulips');
    // THEN I still see the overwritten content in the teaser
    cy.visit('/document');
    cy.get('.block.teaser .content h2').contains('Blue Orchids and Tulips');
  });

  it('As editor I can add a Teaser block and override the data with an external image ', () => {
    // GIVEN a Document with the title document and a Document to reference with the title Blue Orchids
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/document',
    });

    cy.navigate('/document/edit');
    // WHEN I create a Teaser block and change the data of the referenced object
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.wait(500);
    cy.get('input[name="field-overwrite"]').check({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-preview_image"]',
    )
      .click()
      .type(
        `https://github.com/plone/volto/raw/main/logos/volto-colorful.png{enter}`,
      );
    cy.get('#toolbar-save').click();
    cy.get('.image-wrapper > img')
      .should('have.attr', 'src')
      .and(
        'include',
        'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
      );
    cy.get('.block.teaser .content h2').contains('Blue Orchids');
  });
});
