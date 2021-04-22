describe('Babel View Tests', () => {
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

  it('Basic babel view operation', function () {
    // Create translation
    cy.get('#toolbar-add').click();
    cy.findByText('Translate to italiano').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/it/add?type=Document');
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

    cy.url().should('eq', Cypress.config().baseUrl + '/it/my-it-page');
  });

  it('Edit with Babel view menu', function () {
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

    // Edit
    cy.findByLabelText('Edit').click();
    cy.get(
      '.documentFirstHeading > .public-DraftStyleDefault-block',
    ).findByText('My IT page');

    // Click on the menu
    cy.findByLabelText('Compare to language').click();
    cy.findByLabelText('Compare to language English').click();

    // The babel view is there
    cy.findByText('Test document');
    cy.get(
      '.new-translation .documentFirstHeading > .public-DraftStyleDefault-block',
    ).findByText('My IT page');
    cy.get(
      '.new-translation .documentFirstHeading > .public-DraftStyleDefault-block',
    )
      .clear()
      .type('My IT page edited');

    cy.get('#toolbar-save').click();
  });
});
