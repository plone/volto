describe('Basic multilingual Tests', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.visit('/en');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
      path: '/en',
    });
    cy.visit('/en/document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('document');
  });

  it('Language selector in literals', function () {
    cy.navigate('/en');
    cy.findByText('Site Map');
    cy.findByLabelText('Switch to italiano').click();

    cy.findByText('Mappa del sito');
    cy.url().should('eq', Cypress.config().baseUrl + '/it');
  });

  it('Language coming from SSR', function () {
    cy.visit('/it');

    cy.findByText('Mappa del sito');
    cy.get('.language-selector .selected').contains('Italiano');
    cy.getCookie('I18N_LANGUAGE').should('have.property', 'value', 'it');
  });

  it('Language selector in content', function () {
    cy.intercept('POST', '/**/it').as('create');
    cy.intercept('GET', '/**/en/document?expand*').as('content');
    cy.intercept('GET', '/**/it/my-it-page?expand*').as('content-it');

    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.findByText('Test document');
    cy.findByText('Traduci in Italiano');
    cy.get('.new-translation .block.inner.title [contenteditable="true"]')
      .focus()
      .click()
      .type('My IT page');
    cy.get('.new-translation .slate-editor [contenteditable=true]')
      .focus()
      .click()
      .type('This is the italian text')
      .contains('This is the italian text')
      .type('{enter}');
    cy.get('.new-translation .ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Immagine').click();
    cy.get('#toolbar-save').click();

    cy.wait('@create');
    cy.wait('@content-it');

    cy.findByLabelText('Vai a english').click();

    // The english doc should be shown
    cy.wait('@content');

    cy.get('#page-document').should('contain', 'Test document');
    cy.url().should('eq', Cypress.config().baseUrl + '/en/document');
  });

  it('Manage translations menu', function () {
    cy.intercept('POST', '/**/it').as('create');
    cy.intercept('GET', '/**/en/document?expand*').as('content');
    cy.intercept('GET', '/**/it/my-it-page?expand*').as('content-it');

    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.findByText('Test document');
    cy.findByText('Traduci in Italiano');
    cy.get('.new-translation .block.inner.title [contenteditable="true"]')
      .focus()
      .click()
      .type('My IT page');
    cy.get('.new-translation .slate-editor [contenteditable=true]')
      .focus()
      .click()
      .type('This is the italian text')
      .contains('This is the italian text')
      .type('{enter}');
    cy.get('.new-translation .ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Immagine').click();
    cy.get('#toolbar-save').click();

    cy.wait('@create');
    cy.wait('@content-it');

    cy.findByLabelText('Vai a english').click();

    // The english doc should be shown
    cy.get('#page-document').should('contain', 'Test document');

    cy.findByLabelText('More').click();
    cy.findByText('Manage Translations').click();
    cy.findByText('Manage translations for');
    cy.findByText('/en/document');
    cy.findByText('/it/my-it-page');

    // Unlink translation for italian
    cy.findByLabelText('Unlink translation for italiano').click();
    cy.contains('/it/my-it-page').should('not.exist');

    // Link it again
    cy.findByLabelText('Link translation for italiano').click();
    cy.findByLabelText('Back').click();
    cy.findByLabelText('Browse Italiano').click();
    cy.findByLabelText('Select My IT page').dblclick();
    cy.findByText('/it/my-it-page');
  });
});
