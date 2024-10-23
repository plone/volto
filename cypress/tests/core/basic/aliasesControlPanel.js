describe('URL Management control panel', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');

    cy.visit('/controlpanel/aliases');
    cy.get('#add-alt-url').click();
    cy.get('#field-altUrlPath').type('/alturl');
    cy.get('#field-targetUrlPath').type('/my-page');
    cy.get('button[aria-label="Save"]').click();
  });
  it('adds a new alias', () => {
    cy.get('.toast-inner-content').contains('Alias has been added');
  });
  it('edits an existing new alias', () => {
    cy.visit('/controlpanel/aliases');
    cy.get('button[aria-label="Edit Alternative URL"]').click();
    cy.get('#field-altUrlPath').clear().type('/alturl2');
    cy.get('#field-targetUrlPath').clear().type('/my-page');
    cy.get('button[aria-label="Save"]').click();
    cy.get('.toast-inner-content').contains('Alias has been added');
  });
  it('removes an alias', () => {
    cy.visit('/controlpanel/aliases');
    cy.get('input[type="checkbox"][value="/alturl"]').click({ force: true });
    cy.get('#remove-alt-urls').click();
    cy.get('.toast-inner-content').contains('Aliases have been removed');
  });
});
