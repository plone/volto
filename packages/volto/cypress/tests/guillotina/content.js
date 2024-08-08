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
  it('As editor I can add a page', function () {
    // when I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');

    // then I a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.contains('My Page');
  });
  it('As editor I can add a page with a text block', function () {
    // when I add a page with a text block
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');
    cy.getSlateEditorAndType('This is the text').contains('This is the text');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then a new page with a text block has been added
    cy.contains('My Page');
    cy.contains('This is the text');
  });
  it('As editor I can add a file', function () {
    // when I add a file
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();

    cy.get('.formtabs.menu').contains('default').click();

    cy.get('input[name="title"]')
      .type('My File')
      .should('have.value', 'My File');

    // Guillotina wants the file handler instead than the base64 encoding
    cy.fixture('file.pdf').then((fileContent) => {
      cy.get('#field-file').attachFile(
        { fileContent, fileName: 'file.pdf', mimeType: 'application/pdf' },
        { subjectType: 'input' },
      );
    });

    cy.get('#toolbar-save').focus().click();

    // then a new file should have been created
    cy.url().should('eq', Cypress.config().baseUrl + '/my-file');
    cy.contains('My File');
  });

  it('As editor I can add an image', function () {
    // when I add an image
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    cy.get('.formtabs.menu').contains('default').click();

    cy.get('input[name="title"]')
      .type('My image')
      .should('have.value', 'My image');

    // Guillotina wants the file handler instead than the base64 encoding
    cy.fixture('image.png')
      .then((fc) => {
        return Cypress.Blob.base64StringToBlob(fc);
      })
      .then((fileContent) => {
        cy.get('#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image-image').parent().parent().contains('image.png');
      });

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-image');
    cy.contains('My image');
  });

  describe('Actions', () => {
    beforeEach(() => {
      cy.autologin();
    });
    it('As editor I can add a Guillotina folder', function () {
      cy.visit('/');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-cmsfolder').click();
      cy.getSlateTitle()
        .focus()
        .click()
        .type('This is a guillotina folder')
        .contains('This is a guillotina folder');

      cy.get('#toolbar-save').click();

      cy.contains('This is a guillotina folder');
    });
  });
});
