describe('Add new alias for object test', () => {
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
    cy.visit('/my-page/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#submit-alias').click();
  });
});
