describe('Add a new alias from control panel interface', () => {
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
    cy.visit('/controlpanel/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#target-url-input').type('/my-page');
    cy.get('#submit-alias').click();
  });
});
