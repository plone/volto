context('Actions', () => {
  beforeEach(() => {
    cy.autologin();
  });
  it('As a site administrator I can add a page', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');

    cy.get('#toolbar-save').click();
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'This is a page');
    } else {
      cy.contains('This is a page');
    }
  });
  it('As a site administrator I can add a page with text', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');
    cy.get('.tile.inner.text .public-DraftEditor-content')
      .type('This is the text.')
      .get('span[data-text]')
      .contains('This is the text');

    cy.get('#toolbar-save').click();
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'This is a page');
    } else {
      cy.contains('This is a page');
      cy.contains('This is the text');
    }
  });
  it('As a site administrator I can add a folder', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-folder').click();

    if (Cypress.env('API') === 'guillotina') {
      cy.get('.formtabs.menu')
        .contains('default')
        .click();
    }

    cy.get('input[name="title"]')
      .type('This is a folder')
      .should('have.value', 'This is a folder');

    cy.get('#toolbar-save').click();

    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should(
        'have.text',
        'This is a folder',
      );
    } else {
      cy.contains('This is a folder');
    }
  });
  it('As a site administrator I can add a file', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();

    if (Cypress.env('API') === 'guillotina') {
      cy.get('.formtabs.menu')
        .contains('default')
        .click();
    }

    cy.get('input[name="title"]')
      .type('This is a file')
      .should('have.value', 'This is a file');

    if (Cypress.env('API') === 'guillotina') {
      // Guillotina wants the file handler instead than the base64 encoding
      cy.fixture('file.pdf').then(fileContent => {
        cy.get('#field-file').upload(
          { fileContent, fileName: 'file.pdf', mimeType: 'application/pdf' },
          { subjectType: 'input' },
        );
        cy.get('#field-file')
          .parent()
          .parent()
          .contains('file.pdf');
      });
    } else {
      cy.fixture('file.pdf', 'base64').then(fileContent => {
        cy.get('#field-file').upload(
          { fileContent, fileName: 'file.pdf', mimeType: 'application/pdf' },
          { subjectType: 'input' },
        );
        cy.get('#field-file')
          .parent()
          .parent()
          .contains('file.pdf');
      });
    }
    cy.get('#toolbar-save').click();
    cy.visit('/contents');
    cy.contains('This is a file');
  });

  it('As a site administrator I can add a new line to a text block using shift + enter', function() {
    //given a new document
    cy.visit('/add?type=Document');
    //when I select a text-block and hit shift + enter
    cy.get('.ui.drag.tile.inner.text .public-DraftEditor-content')
      .click()
      .type('{shift}{enter}');
    //then a new line should appear
    cy.get(
      '.ui.drag.tile.inner.text:nth-child(2n) .public-DraftEditor-content > div > div:nth-child(2n)',
    );
    //then the block should not be deselected
    cy.get('.ui.drag.tile.inner.text:nth-child(2n) .tile.text.selected');
    //then there should not be a new block created
    cy.get('.ui.drag.tile.inner.text:nth-child(3n)').should('not.exist');
  });

  it('As a site administrator I can add an image', function() {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    if (Cypress.env('API') === 'guillotina') {
      cy.get('.formtabs.menu')
        .contains('default')
        .click();
    }

    cy.get('input[name="title"]')
      .type('This is an image')
      .should('have.value', 'This is an image');

    if (Cypress.env('API') === 'guillotina') {
      // Guillotina wants the file handler instead than the base64 encoding
      cy.fixture('image.png').then(fileContent => {
        cy.get('#field-image').upload(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image')
          .parent()
          .parent()
          .contains('image.png');
      });
    } else {
      cy.fixture('image.png', 'base64').then(fileContent => {
        cy.get('#field-image').upload(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image')
          .parent()
          .parent()
          .contains('image.png');
      });
    }
    cy.get('#toolbar-save').click();
    cy.visit('/contents');
    cy.contains('This is an image');
  });

  // Plone only tests
  if (Cypress.env('API') === 'plone') {
    it('As a site administrator I can add a news item', function() {
      cy.visit('/');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-news-item').click();
      cy.get('input[name="title"]')
        .type('This is a news item')
        .should('have.value', 'This is a news item');

      cy.get('#toolbar-save').click();
      cy.get('.navigation .item.active').should(
        'have.text',
        'This is a news item',
      );
    });
  }
});
