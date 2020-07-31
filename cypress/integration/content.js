describe('Add Content Tests', () => {
  beforeEach(() => {
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('?fullobjects');
  });
  it('As editor I can add a page', function () {
    // when I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('My Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Page');

    // then I a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'My Page');
    } else {
      cy.contains('My Page');
    }
  });
  it('As editor I can add a page with a text block', function () {
    // when I add a page with a text block
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('My Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Page');
    cy.get('.block.inner.text .public-DraftEditor-content')
      .type('This is the text.')
      .get('span[data-text]')
      .contains('This is the text');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then a new page with a text block has been added
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'My Page');
    } else {
      cy.contains('My Page');
      cy.contains('This is the text');
    }
  });
  it('As editor I can add a file', function () {
    // when I add a file
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();

    if (Cypress.env('API') === 'guillotina') {
      cy.get('.formtabs.menu').contains('default').click();
    }

    cy.get('input[name="title"]')
      .type('My File')
      .should('have.value', 'My File');

    if (Cypress.env('API') === 'guillotina') {
      // Guillotina wants the file handler instead than the base64 encoding
      cy.fixture('file.pdf').then((fileContent) => {
        cy.get('#field-file').attachFile(
          { fileContent, fileName: 'file.pdf', mimeType: 'application/pdf' },
          { subjectType: 'input' },
        );
        cy.get('#field-file').parent().parent().contains('file.pdf');
      });
    } else {
      cy.fixture('file.pdf', 'base64').then((fileContent) => {
        cy.get('input#field-file').attachFile(
          { fileContent, fileName: 'file.pdf', mimeType: 'application/pdf' },
          { subjectType: 'input' },
        );
      });
      cy.get('#field-file').parent().parent().contains('file.pdf');
    }
    cy.get('#toolbar-save').click();

    // then a new file should have been created
    if (Cypress.env('API') === 'guillotina') {
      cy.url().should('eq', Cypress.config().baseUrl + '/my-file');
    } else {
      cy.url().should('eq', Cypress.config().baseUrl + '/file.pdf');
    }
    cy.contains('My File');
  });

  it('As editor I can add an image', function () {
    // when I add an image
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    if (Cypress.env('API') === 'guillotina') {
      cy.get('.formtabs.menu').contains('default').click();
    }

    cy.get('input[name="title"]')
      .type('My image')
      .should('have.value', 'My image');

    if (Cypress.env('API') === 'guillotina') {
      // Guillotina wants the file handler instead than the base64 encoding
      cy.fixture('image.png').then((fileContent) => {
        cy.get('#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image').parent().parent().contains('image.png');
      });
    } else {
      cy.fixture('image.png', 'base64').then((fileContent) => {
        cy.get('input#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image').parent().parent().contains('image.png');
      });
    }
    cy.get('#toolbar-save').click();
    if (Cypress.env('API') === 'guillotina') {
      cy.url().should('eq', Cypress.config().baseUrl + '/my-image');
    } else {
      cy.url().should('eq', Cypress.config().baseUrl + '/image.png');
    }
    cy.contains('My image');
  });

  // Plone only tests
  if (Cypress.env('API') === 'plone') {
    it('As editor I can add a news item', function () {
      // when I add a news item
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-news-item').click();
      cy.get('input[name="title"]')
        .type('My News Item')
        .should('have.value', 'My News Item');
      cy.get('#toolbar-save').click();

      // then a new news item should have been created
      cy.url().should('eq', Cypress.config().baseUrl + '/my-news-item');
      cy.get('.navigation .item.active').should('have.text', 'My News Item');
    });
    it('As editor I can add a folder', function () {
      // when I add a folder
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-folder').click();
      cy.get('input[name="title"]')
        .type('My Folder')
        .should('have.value', 'My Folder');
      cy.get('#toolbar-save').click();

      // then a new folder should have been created
      cy.url().should('eq', Cypress.config().baseUrl + '/my-folder');
      cy.get('.navigation .item.active').should('have.text', 'My Folder');
    });
  }

  // Guillotina only tests
  if (Cypress.env('API') === 'guillotina') {
    describe('Actions', () => {
      beforeEach(() => {
        cy.autologin();
      });
      it('As editor I can add a Guillotina folder', function () {
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
