describe('Add new alias for object test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');
  });
  it('adds a new alias', () => {
    cy.visit('/my-page/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#submit-alias').click();
  });
});
