describe('Default Tiles functionality', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');

    // Title tile is needed in every test to be able to save the tile
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('#sidebar .ui.button.trigger').click();
    cy.get('.tile.title .public-DraftStyleDefault-block').type(
      'This is a page',
    );
  });

  it('Title Tile', () => {
    const tile = 'title';
    const expected = 'This is a page';

    // Edit
    cy.get(`.tile.${tile} [data-contents]`).contains(expected);

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document').should('have.text', expected);
    } else {
      // guilhotina
      cy.contains(expected);
    }
  });

  it('Description Tile', () => {
    const tile = 'description';
    const expected = 'This is the description';

    // Edit
    cy.get(`.tile.${tile} .public-DraftStyleDefault-block`).type(expected);
    cy.get(`.tile.${tile} [data-contents]`).contains(expected);

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('.documentDescription').should('have.text', expected);
    } else {
      // guilhotina
      cy.contains(expected);
    }
  });

  it('Text Tile', () => {
    const tile = 'text';
    const lines = ['This is the text', 'line one', 'line two', 'line three'];

    // Edit
    const el = cy.get(`.tile.${tile} .public-DraftStyleDefault-block`);
    el.type(lines.join('{shift}{enter}'));

    cy.get(`.tile.${tile} [data-contents]`).should($el =>
      expect($el[0].innerText.trim()).to.equal(lines.join('\n')),
    );

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document').should($el =>
        expect($el[0].innerText).to.include(lines.join('\n\n')),
      );
    } else {
      // guilhotina
      lines.map(line => cy.contains(line));
    }
  });

  it('Image Tile', () => {
    const tile = 'image';
    const expected =
      'https://github.com/plone/volto/raw/master/docs/logos/volto-colorful.png';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get(`button.add-${tile}-tile`).click();
    cy.get(`.tile.${tile} .toolbar .ui.input input`)
      .type(expected)
      .type('{enter}');

    cy.get(`.tile.${tile} img`).should('have.attr', 'src', expected);

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('#page-document img').should('have.attr', 'src', expected);
    } else {
      // guilhotina
      cy.contains(expected);
    }
  });

  it('Video Tile', () => {
    const tile = 'video';
    const expected = 'https://www.youtube.com/watch?v=QmkD2vLGA6Y';

    // Edit
    cy.get('.tile.text [contenteditable]').click();
    cy.get('button.tile-add-button').click();
    cy.get(`button.add-${tile}-tile`).click();
    cy.get(`.tile.${tile} .toolbar .ui.input input`)
      .type(expected)
      .type('{enter}');

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
      // guilhotina
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
      // guilhotina
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
      // guilhotina
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
      // guilhotina
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
    //   // guilhotina
    //   cy.contains(expected);
    // }
  });
});
