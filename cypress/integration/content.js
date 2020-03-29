describe('Add Content Tests', () => {
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
    cy.get('.block.inner.text .public-DraftEditor-content')
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
      });
      cy.get('#field-file')
        .parent()
        .parent()
        .contains('file.pdf');
    }
    cy.get('#toolbar-save').click();
    cy.visit('/contents');
    cy.contains('This is a file');
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
    it('As a site administrator I can add a folder', function() {
      cy.visit('/');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-folder').click();

      cy.get('input[name="title"]')
        .type('This is a folder')
        .should('have.value', 'This is a folder');

      cy.get('#toolbar-save').click();

      cy.get('.navigation .item.active').should(
        'have.text',
        'This is a folder',
      );
    });
  }

  // Guillotina only tests
  if (Cypress.env('API') === 'guillotina') {
    describe('Actions', () => {
      beforeEach(() => {
        cy.autologin();
      });
      it('As a site administrator I can add a Guillotina folder', function() {
        cy.visit('/');
        cy.get('#toolbar-add').click();
        cy.get('#toolbar-add-cmsfolder').click();
        cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
          .type('This is a guillotina folder')
          .get('.documentFirstHeading span[data-text]')
          .contains('This is a guillotina folder');

        cy.get('#toolbar-save').click();

        cy.contains('This is a guillotina folder');
      });
    });
  }
});

// // TODO: occasional timeout problem while testing: click on invisible node "sort on id ascending"
// // click, hover, click is difficult to test.
// describe('Contents', () => {
//   beforeEach(() => {
//     cy.autologin();
//     if (Cypress.env('API') === 'guillotina') {
//       cy.createContent('CMSFolder', 'blog', 'Blog');
//       cy.createContent('CMSFolder', 'january', 'January', '/blog');
//       cy.createContent('CMSFolder', 'february', 'February', '/blog');
//     } else {
//       cy.createContent('Document', 'blog', 'Blog');
//       cy.createContent('Document', 'january', 'January', '/blog');
//       cy.createContent('Document', 'february', 'February', '/blog');
//     };
//   });
//   it('is sortable', function() {
//     cy.visit('/blog/contents');
//     // January is first item
//     cy.get('a[href^="/blog/"]')
//       .first()
//       .should(($a) => {
//         expect($a).to.contain('January')
//       });
//     cy
//       .get('div.sort-icon')
//       .click()
//       .get('div.item.sort_id')
//       .should('be.visible')
//       .trigger('mousover')
//       .get('div.item.sort_id_ascending')
//       .should('be.visible')
//       .click({force: true})
//       // Now February is first item
//       .get('a[href^="/blog/"]')
//       .first()
//       .should(($a) => {
//         expect($a).to.contain('February')
//       });
//   });
// });
