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

  it('Language selector', function () {
    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.findByText('Test document');
    cy.findByText('Translate to italiano');
    cy.get(
      '.new-translation .documentFirstHeading > .public-DraftStyleDefault-block',
    ).type('My IT page');
    cy.get('.new-translation .block.inner.text .public-DraftEditor-content')
      .type('This is the italian text')
      .get('span[data-text]')
      .contains('This is the italian text')
      .type('{enter}');
    cy.get('.new-translation .ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('#toolbar-save').click();

    cy.findByLabelText('Switch to english').click();

    // The english doc should be shown
    cy.get('#page-document').findByText('Test document');
    cy.url().should('eq', Cypress.config().baseUrl + '/en/document');
  });

  it('Manage translations menu', function () {
    cy.navigate('/en');
    cy.findByLabelText('More').click();
    cy.findByText('Manage Translations').click();
    cy.findByText('Manage translations for');
    cy.findByText('/en');
    cy.findByText('/it');

    // Unlink translation for italian
    cy.findByLabelText('Unlink translation for italiano').click();
    cy.contains('/it').should('not.exist');

    // Link it again
    cy.findByLabelText('Link translation for italiano').click();
    cy.findByLabelText('Back').click();
    cy.findByLabelText('Select it').dblclick();
    cy.findByText('/it');
  });
});
