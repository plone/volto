describe('Add Content Tests', () => {
  beforeEach(() => {
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });

  it('As editor I can add a file', function () {
    // when I add a file
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();

    cy.get('input[name="title"]')
      .type('My File')
      .should('have.value', 'My File');

    cy.get('input[id="field-file"]').attachFile('file.pdf', {
      subjectType: 'input',
    });
    cy.wait(2000);

    cy.get('#toolbar-save').focus().click();
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('file.pdf');

    // then a new file should have been created
    cy.url().should('eq', Cypress.config().baseUrl + '/file.pdf');
    cy.findByLabelText('Edit');
    cy.contains('My File');
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

    cy.get('.navigation .item.active').should('have.text', 'My Page');
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

    cy.get('.navigation .item.active').should('have.text', 'My Page');
  });

  it('As editor I can add an image', function () {
    // when I add an image
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    cy.get('input[name="title"]')
      .type('My image')
      .should('have.value', 'My image');

    cy.fixture('image.png', 'base64')
      .then((fc) => {
        return Cypress.Blob.base64StringToBlob(fc);
      })
      .then((fileContent) => {
        cy.get('input#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image-image').parent().parent().contains('image.png');
      });

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/image.png');

    cy.contains('My image');
  });

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
});
