describe('Default Tiles functionality', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');

    // Title tile is needed in every test to be able to save the tile
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
      'This is a page',
    );
  });

  it.only('Title Tile', function() {
    // Edit
    cy.get('.documentFirstHeading span[data-text]').contains('This is a page');

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'This is a page');
    } else {
      // guilhotina
      cy.contains('This is a page');
      cy.contains('This is the text');
    }
  });

  it('Description Tile', function() {
    const expectedMultiLine = [
      'This is the text',
      'line one',
      'line two',
      'line three',
    ].join('\n');

    // Edit
    cy.get('.documentDescription > .public-DraftStyleDefault-block')
      .type('This is the text')
      .type('{shift}{enter}')
      .type('line one')
      .type('{shift}{enter}')
      .type('line two')
      .type('{shift}{enter}')
      .type('line three');

    cy.get('.ui.description > .tile').should($div =>
      expect($div[0].innerText).to.equal(expectedMultiLine),
    );

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
      cy.get('.documentDescription').should($div =>
        expect($div[0].innerText).to.equal(expectedMultiLine),
      );
    } else {
      // guilhotina
    }
  });

  it('Text Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });

  it('Image Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });

  it('Video Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });

  it('Hero Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });

  it('Html Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });

  it('Hero Tile', function() {
    // Edit

    // Save
    cy.get('#toolbar-save').click();

    // View
    if (Cypress.env('API') === 'plone') {
    } else {
      // guilhotina
    }
  });
});
