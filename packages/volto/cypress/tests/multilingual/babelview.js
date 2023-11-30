describe('Babel View Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
      path: '/en',
    });
    cy.visit('/en');
    cy.wait('@content');

    cy.navigate('/en/document');
    cy.wait('@content');
  });

  it('Basic babel view operation', function () {
    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.wait('@schema');
    cy.url().should('eq', Cypress.config().baseUrl + '/it/add?type=Document');

    cy.get('.content-area').findByText('Test document');
    cy.findByText('Traduci in Italiano');
    cy.get('.new-translation .block.inner.title [contenteditable="true"]')
      .focus()
      .click()
      .type('My IT page', { force: true })
      .contains('My IT page');
    cy.get('.new-translation .slate-editor [contenteditable=true]')
      .focus()
      .click()
      .type('This is the italian text')
      .contains('This is the italian text')
      .type('{enter}');
    cy.get('.new-translation .ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Immagine').click();
    cy.get('#toolbar-save').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/it/my-it-page');
  });

  it('Edit with Babel view menu', function () {
    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.wait('@schema');

    cy.get('.content-area').findByText('Test document');

    cy.findByText('Traduci in Italiano');
    cy.get('.new-translation .block.inner.title [contenteditable="true"]')
      .focus()
      .click()
      .type('My IT page', { force: true })
      .contains('My IT page');
    cy.get('.new-translation .slate-editor [contenteditable=true]')
      .focus()
      .click()
      .type('This is the italian text')
      .contains('This is the italian text')
      .type('{enter}');
    cy.get('.new-translation .ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Immagine').click();
    cy.get('#toolbar-save').click();

    // Edit
    cy.findByLabelText('Modifica').click();
    cy.get('.block.inner.title [contenteditable="true"]').findByText(
      'My IT page',
    );

    // Click on the menu
    cy.findByLabelText('Confronta con').click();
    cy.findByLabelText('Confronta con english').click();

    // The babel view is there
    cy.findByText('Test document');
    cy.get(
      '.new-translation .block.inner.title [contenteditable="true"]',
    ).findByText('My IT page');
    cy.clearSlate(
      '.new-translation .block.inner.title [contenteditable="true"]',
    ).type('My IT page edited');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/it/my-it-page');
    cy.contains('My IT page edited');
  });
});
