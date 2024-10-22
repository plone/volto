describe('Add a new alias from control panel interface', () => {
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
  });
  it('adds a new alias', () => {
    cy.visit('/controlpanel/aliases');
    cy.get('#add-alt-url').click();
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#target-url-input').type('/my-page');
    cy.get('#submit-alias').click();
    cy.get('.toast-inner-content').contains('Alias has been added');
  });
});
