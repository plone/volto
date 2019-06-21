// Cypress/integration/a11y.spec.js
describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it.only('Has no detectable a11y violations on load', () => {
    // cy.checkA11y(); // fail for a11y violations
    cy.get('.logo img.image').click();
    cy.checkA11y();
  });

  /*
  it('Has no a11y violations after button click', () => {
    cy.get('button').click();
    cy.checkA11y(); // check after a rerender
  });
  */
});
