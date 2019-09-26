describe('Test Tiles Functionality', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent('Document', 'my-page', 'My Page');
    cy.visit('/my-page/edit');
  });

  it('As an adminstrator I can edit the title block of a page', () => {
    const tile = 'title';
    const expected = 'This is page with a new title';

    // When I edit the content of the title block...
    cy.get(`.tile.${tile} [data-contents]`)
      .clear()
      .type(expected);

    // ...and hit the save button
    cy.get('#toolbar-save').click();

    // the title of the page should be the new one
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document').should('have.text', expected);
    } else {
      // guillotina
      cy.contains(expected);
    }
  });

  it('As an adminstrator I can add text to a text block', () => {
    const tile = 'text';
    const textLine = 'This is the text';
    const el = cy.get(`.tile.${tile} .public-DraftStyleDefault-block`);

    // When I type some text into a text block...
    el.type(textLine);
    //...it should appear inside that block.
    cy.get(`.tile.${tile} [data-contents]`).should($el =>
      expect($el[0].innerText).to.include(textLine),
    );

    // And I hit save...
    cy.get('#toolbar-save').click();

    // ...the text sholud be included on the page
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document').should($el =>
        expect($el[0].innerText).to.include(textLine),
      );
    } else {
      // guillotina
      cy.contains(textLine);
    }
  });

  // Image Block
  it('As an adminstrator I can add an external image to an image block', () => {
    const tile = 'image';
    const expected =
      'https://github.com/plone/volto/raw/master/docs/logos/volto-colorful.png';

    // Add image Block
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('.tiles-chooser .title')
      .contains('media')
      .click();
    cy.get('.content.active.tiles-list .ui.buttons:first-child').click();

    // TODO: Fix tests for Guillotina
    if (Cypress.env('API') === 'guillotina') {
      return;
    } else {
      //Type in external image URL
      cy.get(`.tile.${tile} center input`)
        .click()
        .type(`${expected}{enter}`);
    }

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document img').should('have.attr', 'src', expected);
    } else {
      // guillotina
      cy.contains(expected);
    }
  });

  //### Need help with the image upload.

  // it('As an adminstrator I can upload an image to an image block with drag and drop', () => {
  //   const tile = 'image';

  //   // Add image Block
  //   cy.get('.tile.text [contenteditable]').click();
  //   cy.get('button.tile-add-button').click();
  //   cy.get('.tiles-chooser .title')
  //     .contains('media')
  //     .click();
  //   cy.get('.content.active.tiles-list .ui.buttons:first-child button').click();

  //   // TODO: Fix tests for Guillotina
  //   if (Cypress.env('API') === 'guillotina') {
  //     return;
  //   } else {
  //     const fileName = 'image.png';
  //     cy.fixture(fileName).then(fileContent => {
  //       cy.get(`.ui.tile.${tile} .dropzone`).upload(
  //         {
  //           fileContent,
  //           fileName,
  //           mimeType: 'application/png',
  //         },
  //         { subjectType: 'drag-n-drop' },
  //       );
  //     });
  //   }
  // });

  it.only('As an administrator I can add a Video Block with a YouTube video', () => {
    const tile = 'video';
    const expected = 'https://www.youtube.com/watch?v=QmkD2vLGA6Y';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('.tiles-chooser .title')
      .contains('media')
      .click();
    cy.get('.content.active.tiles-list .ui.buttons:nth-child(2)').click();
    cy.get(`.tile.${tile} .toolbar .ui.input input`)
      .type(expected)
      .type('{enter}');

    // TODO: Fix tests for Guillotina
    if (Cypress.env('API') === 'guillotina') {
      return;
    }

    cy.get(`.tile.${tile} iframe`)
      .should('have.attr', 'src')
      .should('include', 'youtube');

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document iframe')
        .should('have.attr', 'src')
        .should('include', 'youtube');
    } else {
      // guillotina
      cy.contains(expected);
    }
  });

  it('Hero Tile', () => {
    // TODO: Implement react dropzone for this tile to test the image

    const tile = 'hero';
    // const expectedFile = 'broccoli.jpg';
    const expectedTitle = 'Volto';
    const expectedDescription =
      'React-based front-end for the Plone and Guillotina';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('button.show-hidden-tiles').click();
    cy.get(`button.add-${tile}-tile`).click();

    // cy.fixture(expectedFile).then(fileContent => {
    //   cy.get(`.tile.${tile} [data-cy="dropzone]`).upload(
    //     { fileContent, expectedFile, mimeType: 'application/json' },
    //     { subjectType: 'drag-n-drop' },
    //   );
    // });
    cy.get(
      `.tile.${tile} .title-editor > .public-DraftStyleDefault-block`,
    ).type(expectedTitle);
    cy.get(
      `.tile.${tile} .description-editor > .public-DraftStyleDefault-block`,
    ).type(expectedDescription);

    cy.get(
      `.tile.${tile} .title-editor > .public-DraftStyleDefault-block`,
    ).contains(expectedTitle);
    cy.get(
      `.tile.${tile} .description-editor > .public-DraftStyleDefault-block`,
    ).contains(expectedDescription);

    // Save
    // cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      // cy.get('#page-document h1').should('have.text', expected);
    } else {
      // guillotina
      // cy.contains(expected);
    }
  });

  it('Maps Tile', () => {
    const tile = 'maps';
    const expected =
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('button.show-hidden-tiles').click();
    cy.get(`button.add-${tile}-tile`).click();
    cy.get(`.tile.${tile} .toolbar .ui.input input`)
      .type(expected)
      .type('{enter}');

    // TODO: Fix tests for Guillotina
    if (Cypress.env('API') === 'guillotina') {
      return;
    }

    cy.get(`.tile.${tile} iframe`)
      .should('have.attr', 'src')
      .should('include', 'maps');

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document iframe')
        .should('have.attr', 'src')
        .should('include', 'maps');
    } else {
      // guillotina
      cy.contains(expected);
    }
  });

  it('Html Tile', () => {
    const tile = 'html';
    const expected = 'This is the html';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('button.show-hidden-tiles').click();
    cy.get(`button.add-${tile}-tile`).click();
    cy.get(`.tile.${tile} .npm__react-simple-code-editor__textarea`).type(
      `<h3>${expected}</h3>`,
    );
    cy.get(`.tile.${tile} [aria-label="Preview"]`).click();
    cy.get(`.tile.${tile} h3`).contains(expected);

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document h3').should('have.text', expected);
    } else {
      // guillotina
      cy.contains(expected);
    }
  });

  it('Table Tile', () => {
    // TODO: Figure out why there is an erro when add this tile in cypress

    // const tile = 'table';
    // const expected = 'This is the html';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get('button.show-hidden-tiles').click();
    // cy.get(`button.add-${tile}-tile`).click();
    // cy.get(`.tile.${tile} .npm__react-simple-code-editor__textarea`).type(
    //   `<h3>${expected}</h3>`,
    // );
    // cy.get(`.tile.${tile} [aria-label="Preview"]`).click();
    // cy.get(`.tile.${tile} h3`).contains(expected);

    // // Save
    // cy.get('#toolbar-save').click();

    // // View
    // if (Cypress.env('API') === 'plone') {
    //   cy.get('#page-document h3').should('have.text', expected);
    // } else {
    //   // guillotina
    //   cy.contains(expected);
    // }
  });
});
