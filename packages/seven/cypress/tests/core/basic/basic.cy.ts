describe('Basic Cypress Test', () => {
  it('should visit the root URL', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Welcome to Plone 6');
  });
});
